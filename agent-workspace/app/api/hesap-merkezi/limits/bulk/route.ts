import { NextRequest, NextResponse } from 'next/server'
import { getAccountCenterProfileLimitsBatch } from '@/lib/account-center/service'

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}))
  const profileIds = Array.isArray(body.profileIds)
    ? body.profileIds.map((value: unknown) => (typeof value === 'string' ? value.trim() : '')).filter(Boolean)
    : []

  if (profileIds.length === 0) {
    return NextResponse.json({ ok: false, message: 'profileIds zorunlu' }, { status: 400 })
  }

  try {
    const limitsByProfileId = await getAccountCenterProfileLimitsBatch(profileIds)
    return NextResponse.json({ ok: true, limitsByProfileId })
  } catch (error: any) {
    return NextResponse.json({ ok: false, message: error?.message || 'Limit verileri alınamadı' }, { status: 500 })
  }
}
