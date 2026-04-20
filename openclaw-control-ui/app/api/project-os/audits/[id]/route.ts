import { NextRequest, NextResponse } from 'next/server'
import { updateAudit } from '@/lib/project-os/service'

export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params
  const body = await request.json().catch(() => ({})) as {
    businessId?: string
    status?: 'new' | 'reviewed' | 'offered'
    channelReadiness?: 'dusuk' | 'orta' | 'iyi'
    summary?: string
  }

  const dataset = await updateAudit(id, body)

  if (!dataset) {
    return NextResponse.json({ ok: false, message: 'Audit kaydı bulunamadı' }, { status: 404 })
  }

  return NextResponse.json({ ok: true, audits: dataset.audits })
}
