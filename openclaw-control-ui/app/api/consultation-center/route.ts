import { NextRequest, NextResponse } from 'next/server'
import { createMockConsultation, getConsultationCenterPayload } from '@/lib/consultation-center/mock'

export async function GET(request: NextRequest) {
  const selectedId = request.nextUrl.searchParams.get('selectedId') || undefined
  return NextResponse.json(getConsultationCenterPayload(selectedId))
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({})) as { title?: string; type?: string; note?: string }
  const created = createMockConsultation(body)
  return NextResponse.json({ ok: true, created, payload: getConsultationCenterPayload(created.id) })
}
