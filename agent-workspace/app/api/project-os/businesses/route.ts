import { NextRequest, NextResponse } from 'next/server'
import { createBusiness, getProjectOsDataset } from '@/lib/project-os/service'

export async function GET() {
  const dataset = await getProjectOsDataset()
  return NextResponse.json({ ok: true, businesses: dataset.businesses })
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({})) as {
    name?: string
    segment?: 'berber' | 'guzellik' | 'kafe-restoran' | 'diger'
    district?: string
    ownerName?: string
    status?: 'lead' | 'active' | 'paused'
  }

  try {
    const dataset = await createBusiness(body)
    return NextResponse.json({ ok: true, businesses: dataset.businesses })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'İşletme kaydı açılamadı'
    return NextResponse.json({ ok: false, message }, { status: 400 })
  }
}
