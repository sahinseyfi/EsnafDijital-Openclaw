import { execFile } from 'child_process'
import { promisify } from 'util'
import { NextRequest, NextResponse } from 'next/server'
import { getAccountCenterPayload } from '@/lib/account-center/service'
import { updateDashboardState } from '@/lib/codex-dashboard/store'

const execFileAsync = promisify(execFile)
const CURRENT_SESSION_SWITCH_HELPER = '/usr/local/bin/esnafdijital-openclaw-session-switch'

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}))
  const profileId = typeof body.profileId === 'string' ? body.profileId.trim() : ''

  if (!profileId) {
    return NextResponse.json({ ok: false, message: 'profileId zorunlu' }, { status: 400 })
  }

  try {
    await execFileAsync(CURRENT_SESSION_SWITCH_HELPER, ['main', profileId, 'agent:main:main'])
    const now = new Date().toISOString()
    await updateDashboardState((state) => ({
      ...state,
      systemNotice: null,
      profiles: state.profiles.map((profile) => (
        profile.profileId === profileId
          ? { ...profile, lastUsedAt: now }
          : profile
      )),
    }))
    const payload = await getAccountCenterPayload()
    return NextResponse.json({ ok: true, message: 'Bu oturumun profili değiştirildi', ...payload })
  } catch (error: any) {
    return NextResponse.json({ ok: false, message: error?.stderr || error?.message || 'Profil değiştirilemedi' }, { status: 400 })
  }
}
