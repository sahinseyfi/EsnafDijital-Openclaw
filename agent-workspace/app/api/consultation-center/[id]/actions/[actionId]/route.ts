import { NextRequest, NextResponse } from 'next/server'
import { updateConsultationActionStatus } from '@/lib/consultation-center/service'

export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string; actionId: string }> }) {
  const { id, actionId } = await context.params
  const body = await request.json().catch(() => ({})) as {
    status?: 'open' | 'done'
  }

  const result = await updateConsultationActionStatus(id, actionId, {
    status: body.status === 'done' ? 'done' : 'open',
  })

  if (!result) {
    return NextResponse.json({ ok: false, message: 'Consultation veya action bulunamadı' }, { status: 404 })
  }

  return NextResponse.json({ ok: true, updated: result.updated, payload: result.payload })
}
