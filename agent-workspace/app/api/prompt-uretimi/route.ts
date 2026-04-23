import { NextRequest, NextResponse } from 'next/server'
import { createConsultation, getConsultationCenterPayload } from '@/lib/consultation-center/service'

export async function GET(request: NextRequest) {
  const selectedId = request.nextUrl.searchParams.get('selectedId') || undefined
  return NextResponse.json(await getConsultationCenterPayload(selectedId))
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({})) as {
    title?: string
    type?: string
    note?: string
    workMode?: string
    targetSurface?: string
    outputType?: string
    targetModel?: 'gpt-5' | 'gpt-5-pro'
  }
  const result = await createConsultation(body)
  return NextResponse.json({ ok: true, created: result.created, payload: result.payload })
}
