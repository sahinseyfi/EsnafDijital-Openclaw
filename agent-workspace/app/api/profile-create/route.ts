import { NextResponse } from 'next/server'

export async function POST() {
  return NextResponse.json(
    {
      ok: false,
      message: 'Bu akış kapatıldı. Yeni çalışma alanı veya işletme profili için kimlik doğrulamayı yeniden başlatıp gerçek hesapla kaydedin.',
    },
    { status: 400 },
  )
}
