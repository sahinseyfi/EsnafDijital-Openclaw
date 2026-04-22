import { NextRequest, NextResponse } from 'next/server'
import { deleteAuthProfile } from '@/lib/codex-dashboard/auth-store'
import { clearDiscoveryCache, getDashboardStatus, hideProfile, readDashboardState, removeProfileArtifacts } from '@/lib/codex-dashboard/store'

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}))
  const profileId = typeof body.profileId === 'string' ? body.profileId : ''

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

  if (target.kind !== 'authProfile') {
    const nextState = await hideProfile(profileId).catch((error: Error) => error)
    if (nextState instanceof Error) {
      return NextResponse.json({ ok: false, message: nextState.message }, { status: 400 })
    }
    return NextResponse.json({ ok: true, message: 'Agent satırı panelden kaldırıldı', profiles: nextState.profiles, settings: nextState.settings })
  }

  const deleted = await deleteAuthProfile({ agentId: target.agentId, profileId }).catch((error: Error) => error)
  if (deleted instanceof Error) {
    return NextResponse.json({ ok: false, message: deleted.message }, { status: 400 })
  }

  await removeProfileArtifacts(profileId)
  clearDiscoveryCache()
  const nextStatus = await getDashboardStatus()

  return NextResponse.json({ ok: true, message: 'Profil gerçekten silindi', profiles: nextStatus.profiles, settings: nextStatus.settings })
}
