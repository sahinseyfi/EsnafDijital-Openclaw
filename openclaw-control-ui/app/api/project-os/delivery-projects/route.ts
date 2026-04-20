import { NextRequest, NextResponse } from 'next/server'
import { createDeliveryProject, getProjectOsDataset } from '@/lib/project-os/service'

export async function GET() {
  const dataset = await getProjectOsDataset()
  return NextResponse.json({ ok: true, deliveryProjects: dataset.deliveryProjects })
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({})) as {
    businessId?: string
    status?: 'kickoff' | 'building' | 'live' | 'maintenance'
    scope?: string
  }

  try {
    const dataset = await createDeliveryProject(body)
    return NextResponse.json({ ok: true, deliveryProjects: dataset.deliveryProjects })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Teslimat kaydı açılamadı'
    return NextResponse.json({ ok: false, message }, { status: 400 })
  }
}
