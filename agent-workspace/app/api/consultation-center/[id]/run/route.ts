import { NextRequest, NextResponse } from 'next/server'
import { addConsultationRun } from '@/lib/consultation-center/service'

export async function POST(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params
  const body = await request.json().catch(() => ({})) as {
    modelName?: 'gpt-5' | 'gpt-5-pro'
    promptText?: string
    responseSummary?: string
  }

  const result = await addConsultationRun(id, body)

  if (!result) {
    return NextResponse.json({ ok: false, message: 'Consultation bulunamadı' }, { status: 404 })
  }

  return NextResponse.json({ ok: true, updated: result.updated, payload: result.payload })
}
