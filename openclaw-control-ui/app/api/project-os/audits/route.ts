import { NextRequest, NextResponse } from 'next/server'
import { createAudit, getProjectOsDataset } from '@/lib/project-os/service'

export async function GET() {
  const dataset = await getProjectOsDataset()
  return NextResponse.json({ ok: true, audits: dataset.audits })
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({})) as {
    businessId?: string
    status?: 'new' | 'reviewed' | 'offered'
    channelReadiness?: 'dusuk' | 'orta' | 'iyi'
    summary?: string
  }

  try {
    const dataset = await createAudit(body)
    return NextResponse.json({ ok: true, audits: dataset.audits })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Audit kaydı açılamadı'
    return NextResponse.json({ ok: false, message }, { status: 400 })
  }
}
