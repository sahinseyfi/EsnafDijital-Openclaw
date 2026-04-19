import { NextRequest, NextResponse } from 'next/server'
import { getConsultationDetail } from '@/lib/consultation-center/mock'

export async function GET(_request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params
  const consultation = getConsultationDetail(id)

  if (!consultation) {
    return NextResponse.json({ ok: false, message: 'Consultation bulunamadı' }, { status: 404 })
  }

  return NextResponse.json({ ok: true, consultation })
}
