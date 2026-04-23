import { NextRequest, NextResponse } from 'next/server'
import { generateConsultationBriefWithAgent } from '@/lib/consultation-center/agent'
import { acquireConsultationPromptLock, hasConsultationPromptLock, releaseConsultationPromptLock } from '@/lib/consultation-center/prompt-lock'
import { humanizeConsultationMessage } from '@/lib/consultation-center/messages'
import { getConsultationDetail, updateConsultation } from '@/lib/consultation-center/service'

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
