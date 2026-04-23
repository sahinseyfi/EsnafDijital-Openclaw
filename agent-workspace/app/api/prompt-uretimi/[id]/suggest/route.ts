import { NextRequest, NextResponse } from 'next/server'
import { generateConsultationBriefWithAgent } from '@/lib/prompt-uretimi/agent'
import { acquireConsultationPromptLock, hasConsultationPromptLock, releaseConsultationPromptLock } from '@/lib/prompt-uretimi/prompt-lock'
import { humanizeConsultationMessage } from '@/lib/prompt-uretimi/messages'
import { getConsultationDetail, updateConsultation } from '@/lib/prompt-uretimi/service'

function normalizeLine(value: string) {
  return value
    .toLocaleLowerCase('tr-TR')
    .replace(/\s+/g, ' ')
    .trim()
}

function findPromptLeak(promptText: string, items: string[]) {
  const normalizedPrompt = normalizeLine(promptText)

  return items.find((item) => {
    const normalizedItem = normalizeLine(item)
    return normalizedItem.length >= 16 && normalizedPrompt.includes(normalizedItem)
  })
}

function validateSuggestion(suggestion: Awaited<ReturnType<typeof generateConsultationBriefWithAgent>>) {
  const primaryTask = suggestion.primaryTask?.trim()

  if (!primaryTask) {
    throw new Error('Prompt guard: ana gorev cikarilmadi.')
  }

  const promptText = suggestion.finalPromptText?.trim()
  if (!promptText) {
    throw new Error('Prompt guard: hazir prompt bos dondu.')
  }

  const leakCandidate = findPromptLeak(promptText, [
    ...(suggestion.secondaryTasks || []),
    ...(suggestion.parkedQuestions || []),
  ])

  if (leakCandidate) {
    throw new Error(`Prompt guard: park edilen baslik prompta sizdi (${leakCandidate}).`)
  }
}

export async function POST(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params

  if (hasConsultationPromptLock(id)) {
    return NextResponse.json({ ok: false, message: 'Bu kayıt için prompt hazırlama zaten sürüyor.' }, { status: 409 })
  }

  const current = await getConsultationDetail(id)

  if (!current) {
    return NextResponse.json({ ok: false, message: 'Danışma kaydı bulunamadı' }, { status: 404 })
  }

  if (!acquireConsultationPromptLock(id)) {
    return NextResponse.json({ ok: false, message: 'Bu kayıt için prompt hazırlama zaten sürüyor.' }, { status: 409 })
  }

  const body = await request.json().catch(() => ({})) as {
    title?: string
    summary?: string
    targetModel?: 'gpt-5' | 'gpt-5-pro'
    changeRequest?: string
  }

  const workingCopy = {
    ...current,
    title: body.title?.trim() || current.title,
    summary: body.summary?.trim() || current.summary,
  }

  await updateConsultation(id, {
    title: workingCopy.title,
    summary: workingCopy.summary,
    targetModel: body.targetModel,
    sharedBrief: {
      ...(current.sharedBrief || {}),
      promptStatus: 'preparing',
      promptError: null,
      preparedPromptText: '',
    },
  })

  try {
    const changeRequest = body.changeRequest?.trim() || undefined
    const suggestion = await generateConsultationBriefWithAgent(workingCopy, { changeRequest })
    validateSuggestion(suggestion)
    const targetModel = body.targetModel || workingCopy.promptRun.modelName || 'gpt-5-pro'
    const nextSharedBrief = {
      ...(workingCopy.sharedBrief || {}),
      ...(suggestion.sharedBrief || {}),
      targetModel,
      promptStatus: 'ready',
      promptError: null,
      promptRevisionRequest: changeRequest || null,
    }

    const result = await updateConsultation(id, {
      title: suggestion.title || workingCopy.title,
      summary: suggestion.summary || workingCopy.summary,
      decisionQuestion: suggestion.decisionQuestion,
      whyNow: suggestion.whyNow,
      desiredOutput: suggestion.desiredOutput,
      businessBrief: suggestion.businessBrief,
      technicalBrief: suggestion.technicalBrief,
      sharedBrief: {
        ...nextSharedBrief,
        preparedPromptText: suggestion.finalPromptText,
        promptPreparedAt: new Date().toISOString(),
      },
      contextRefs: suggestion.contextRefs,
      targetModel: body.targetModel,
    })

    if (!result) {
      return NextResponse.json({ ok: false, message: 'Danışma kaydı güncellenemedi' }, { status: 500 })
    }

    return NextResponse.json({ ok: true, updated: result.updated, payload: result.payload })
  } catch (error: unknown) {
    const message = humanizeConsultationMessage(error, 'Prompt hazırlanamadı')
    await updateConsultation(id, {
      title: workingCopy.title,
      summary: workingCopy.summary,
      targetModel: body.targetModel,
      sharedBrief: {
        ...(current.sharedBrief || {}),
        promptStatus: 'error',
        promptError: message,
        preparedPromptText: '',
      },
    })

    return NextResponse.json({ ok: false, message }, { status: 500 })
  } finally {
    releaseConsultationPromptLock(id)
  }
}
