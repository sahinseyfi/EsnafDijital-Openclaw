import { NextRequest, NextResponse } from 'next/server'
import { getAccountCenterPayload } from '@/lib/account-center/service'
import { updateDashboardState } from '@/lib/codex-dashboard/store'

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}))
  const profileId = typeof body.profileId === 'string' ? body.profileId.trim() : ''
  const displayName = typeof body.displayName === 'string' ? body.displayName.trim() : ''
  const note = typeof body.note === 'string' ? body.note.trim() : ''

  if (!profileId) {
    return NextResponse.json({ ok: false, message: 'profileId zorunlu' }, { status: 400 })
  }

  try {
    await updateDashboardState((state) => ({
      ...state,
      profiles: state.profiles.map((profile) => (
        profile.profileId === profileId
          ? {
              ...profile,
              displayName: displayName || profile.displayName,
              note,
            }
          : profile
      )),
    }))
    const payload = await getAccountCenterPayload()
    return NextResponse.json({ ok: true, message: 'Profil adı güncellendi', ...payload })
  } catch (error: any) {
    return NextResponse.json({ ok: false, message: error?.message || 'Profil güncellenemedi' }, { status: 400 })
  }
}
