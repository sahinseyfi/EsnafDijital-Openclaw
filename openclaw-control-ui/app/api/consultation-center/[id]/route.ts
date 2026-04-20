import { NextRequest, NextResponse } from 'next/server'
import { deleteConsultation, getConsultationDetail, updateConsultation } from '@/lib/consultation-center/service'

export async function GET(_request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params
  const consultation = await getConsultationDetail(id)

  if (!consultation) {
    return NextResponse.json({ ok: false, message: 'Consultation bulunamadı' }, { status: 404 })
  }

  return NextResponse.json({ ok: true, consultation })
}

export async function DELETE(_request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params
  const result = await deleteConsultation(id)

  if (!result) {
    return NextResponse.json({ ok: false, message: 'Consultation bulunamadı' }, { status: 404 })
  }

  return NextResponse.json({ ok: true, payload: result.payload })
}

export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params
  const body = await request.json().catch(() => ({})) as {
    title?: string
    decisionQuestion?: string
    whyNow?: string
    desiredOutput?: string
    summary?: string
    stage?: 'draft' | 'clarifying' | 'goal_set' | 'context_ready' | 'blocked' | 'internal' | 'external' | 'ready_to_send' | 'answered' | 'actioned'
    dueAt?: string | null
    businessBrief?: Record<string, string | string[] | null>
    technicalBrief?: Record<string, string | string[] | null>
    sharedBrief?: Record<string, string | string[] | null>
    contextRefs?: Array<{ kind: 'heartbeat' | 'decision' | 'project' | 'roadmap'; title: string; ref: string }>
  }

  const result = await updateConsultation(id, body)

  if (!result) {
    return NextResponse.json({ ok: false, message: 'Consultation bulunamadı' }, { status: 404 })
  }

  return NextResponse.json({ ok: true, updated: result.updated, payload: result.payload })
}
