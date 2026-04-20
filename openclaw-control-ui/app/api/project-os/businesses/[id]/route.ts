import { NextRequest, NextResponse } from 'next/server'
import { updateBusiness } from '@/lib/project-os/service'

export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params
  const body = await request.json().catch(() => ({})) as {
    name?: string
    segment?: 'berber' | 'guzellik' | 'kafe-restoran' | 'diger'
    district?: string
    ownerName?: string
    status?: 'lead' | 'active' | 'paused'
  }

  const dataset = await updateBusiness(id, body)

  if (!dataset) {
    return NextResponse.json({ ok: false, message: 'İşletme kaydı bulunamadı' }, { status: 404 })
  }

  return NextResponse.json({ ok: true, businesses: dataset.businesses })
}
