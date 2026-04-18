import { NextRequest, NextResponse } from 'next/server'
import { hideProfile } from '@/lib/codex-dashboard/store'

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}))
  const profileId = typeof body.profileId === 'string' ? body.profileId : ''

  if (!profileId) {
    return NextResponse.json({ ok: false, message: 'profileId zorunlu' }, { status: 400 })
  }

  const nextState = await hideProfile(profileId).catch((error: Error) => error)
  if (nextState instanceof Error) {
    return NextResponse.json({ ok: false, message: nextState.message }, { status: 400 })
  }

  return NextResponse.json({ ok: true, message: 'Profil listeden gizlendi', profiles: nextState.profiles, settings: nextState.settings })
}
