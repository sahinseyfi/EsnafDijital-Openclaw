import { NextRequest, NextResponse } from 'next/server'
import { getAccountCenterPayload } from '@/lib/account-center/service'
import { deleteAuthProfile } from '@/lib/codex-dashboard/auth-store'
import { clearDiscoveryCache, readDashboardState, removeProfileArtifacts } from '@/lib/codex-dashboard/store'

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}))
  const profileId = typeof body.profileId === 'string' ? body.profileId.trim() : ''

  if (!profileId) {
    return NextResponse.json({ ok: false, message: 'profileId zorunlu' }, { status: 400 })
  }

  const current = await readDashboardState().catch((error: Error) => error)
  if (current instanceof Error) {
    return NextResponse.json({ ok: false, message: current.message }, { status: 400 })
  }

  const target = current.profiles.find((profile) => profile.profileId === profileId)
  if (!target) {
    return NextResponse.json({ ok: false, message: 'Profil bulunamadı' }, { status: 404 })
  }

  if (target.isCurrentProfile) {
    return NextResponse.json({ ok: false, message: 'Aktif profil silinemez. Önce başka profile geç.' }, { status: 400 })
  }

  try {
    await deleteAuthProfile({ agentId: target.agentId, profileId })
    await removeProfileArtifacts(profileId)
    clearDiscoveryCache()
    const payload = await getAccountCenterPayload()
    return NextResponse.json({ ok: true, message: 'Profil silindi', ...payload })
  } catch (error: any) {
    return NextResponse.json({ ok: false, message: error?.message || 'Profil silinemedi' }, { status: 400 })
  }
}
