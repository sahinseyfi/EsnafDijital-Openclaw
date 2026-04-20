import { NextRequest, NextResponse } from 'next/server'
import { updateDeliveryProject } from '@/lib/project-os/service'

export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params
  const body = await request.json().catch(() => ({})) as {
    businessId?: string
    status?: 'kickoff' | 'building' | 'live' | 'maintenance'
    scope?: string
  }

  const dataset = await updateDeliveryProject(id, body)

  if (!dataset) {
    return NextResponse.json({ ok: false, message: 'Teslimat kaydı bulunamadı' }, { status: 404 })
  }

  return NextResponse.json({ ok: true, deliveryProjects: dataset.deliveryProjects })
}
