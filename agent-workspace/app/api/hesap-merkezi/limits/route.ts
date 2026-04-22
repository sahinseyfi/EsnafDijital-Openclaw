import { NextRequest, NextResponse } from 'next/server'
import { getAccountCenterProfileLimits } from '@/lib/account-center/service'

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}))
  const profileId = typeof body.profileId === 'string' ? body.profileId.trim() : ''

  if (!profileId) {
    return NextResponse.json({ ok: false, message: 'profileId zorunlu' }, { status: 400 })
  }

  try {
    const limits = await getAccountCenterProfileLimits(profileId)
    return NextResponse.json({ ok: true, profileId, limits })
  } catch (error: any) {
    return NextResponse.json({ ok: false, message: error?.message || 'Limit verisi alınamadı' }, { status: 500 })
  }
}
