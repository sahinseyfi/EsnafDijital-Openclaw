import { NextRequest, NextResponse } from 'next/server'
import { createOffer, getProjectOsDataset } from '@/lib/project-os/service'

export async function GET() {
  const dataset = await getProjectOsDataset()
  return NextResponse.json({ ok: true, offers: dataset.offers })
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({})) as {
    businessId?: string
    status?: 'draft' | 'sent' | 'approved'
    packageName?: string
    amountTry?: number
  }

  try {
    const dataset = await createOffer(body)
    return NextResponse.json({ ok: true, offers: dataset.offers })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Teklif kaydı açılamadı'
    return NextResponse.json({ ok: false, message }, { status: 400 })
  }
}
