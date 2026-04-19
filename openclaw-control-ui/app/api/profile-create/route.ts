import { NextRequest, NextResponse } from 'next/server'

export async function POST(_request: NextRequest) {
  return NextResponse.json(
    {
      ok: false,
      message: 'Bu akış kapatıldı. Yeni workspace/business profili için yeniden auth başlatıp gerçek hesap bağlamıyla kaydet.',
    },
    { status: 400 },
  )
}
