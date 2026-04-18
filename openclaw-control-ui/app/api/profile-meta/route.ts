import { NextRequest, NextResponse } from 'next/server'
import { updateDashboardState } from '@/lib/codex-dashboard/store'

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}))
  const profileId = typeof body.profileId === 'string' ? body.profileId : ''

  if (!profileId) {
    return NextResponse.json({ ok: false, message: 'profileId zorunlu' }, { status: 400 })
  }

  const nextState = await updateDashboardState((state) => ({
    ...state,
    profiles: state.profiles.map((profile) =>
      profile.profileId === profileId
        ? {
            ...profile,
            displayName: typeof body.displayName === 'string' && body.displayName.trim() ? body.displayName.trim() : profile.displayName,
            note: typeof body.note === 'string' ? body.note.trim() : profile.note,
          }
        : profile,
    ),
  }))

  return NextResponse.json({ ok: true, message: 'Profil metadata güncellendi', profiles: nextState.profiles })
}
