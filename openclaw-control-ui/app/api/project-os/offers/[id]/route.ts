import { NextRequest, NextResponse } from 'next/server'
import { updateOffer } from '@/lib/project-os/service'

export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params
  const body = await request.json().catch(() => ({})) as {
    businessId?: string
    status?: 'draft' | 'sent' | 'approved'
    packageName?: string
    amountTry?: number
  }

  const dataset = await updateOffer(id, body)

  if (!dataset) {
    return NextResponse.json({ ok: false, message: 'Teklif kaydı bulunamadı' }, { status: 404 })
  }

  return NextResponse.json({ ok: true, offers: dataset.offers })
}
