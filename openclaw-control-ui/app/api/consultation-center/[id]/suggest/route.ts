import { NextRequest, NextResponse } from 'next/server'
import { getConsultationDetail, updateConsultation } from '@/lib/consultation-center/service'
import { suggestConsultationBrief } from '@/lib/consultation-center/suggestions'

export async function POST(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params
  const current = await getConsultationDetail(id)

  if (!current) {
    return NextResponse.json({ ok: false, message: 'Consultation bulunamadı' }, { status: 404 })
  }

  const body = await request.json().catch(() => ({})) as {
    title?: string
    summary?: string
  }

  const suggestion = suggestConsultationBrief({
    title: body.title || current.title,
    note: body.summary || current.summary,
    type: current.type,
  })

  const result = await updateConsultation(id, {
    title: suggestion.title,
    summary: suggestion.summary,
    decisionQuestion: suggestion.decisionQuestion,
    whyNow: suggestion.whyNow,
    desiredOutput: suggestion.desiredOutput,
    businessBrief: suggestion.businessBrief,
    technicalBrief: suggestion.technicalBrief,
    sharedBrief: suggestion.sharedBrief,
    contextRefs: suggestion.contextRefs,
  })

  if (!result) {
    return NextResponse.json({ ok: false, message: 'Consultation güncellenemedi' }, { status: 500 })
  }

  return NextResponse.json({ ok: true, updated: result.updated, payload: result.payload })
}
