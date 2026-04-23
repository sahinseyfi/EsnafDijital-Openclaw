import { NextRequest, NextResponse } from 'next/server'
import { addConsultationAction } from '@/lib/prompt-uretimi/service'

export async function POST(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params
  const body = await request.json().catch(() => ({})) as {
    title?: string
    ownerRole?: 'user' | 'tech_agent' | 'shared'
    linkedEntityType?: 'project_os' | 'context_center'
    linkedEntityId?: string
  }

  const result = await addConsultationAction(id, body)

  if (!result) {
    return NextResponse.json({ ok: false, message: 'Danışma kaydı bulunamadı' }, { status: 404 })
  }

  return NextResponse.json({ ok: true, updated: result.updated, payload: result.payload })
}
