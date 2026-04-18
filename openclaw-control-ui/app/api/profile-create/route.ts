import { NextRequest, NextResponse } from 'next/server'
import { buildUniqueWorkspaceAuthProfileId, cloneAuthProfile } from '@/lib/codex-dashboard/auth-store'
import { clearDiscoveryCache, updateDashboardState } from '@/lib/codex-dashboard/store'

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}))
  const sourceProfileId = typeof body.sourceProfileId === 'string' ? body.sourceProfileId : ''
  const displayName = typeof body.displayName === 'string' ? body.displayName.trim() : ''
  const note = typeof body.note === 'string' ? body.note.trim() : ''
  const workspace = typeof body.workspace === 'string' ? body.workspace.trim() : ''

  if (!sourceProfileId || !workspace) {
    return NextResponse.json({ ok: false, message: 'sourceProfileId ve workspace zorunlu' }, { status: 400 })
  }

  const nextState = await updateDashboardState(async (state) => {
    const sourceProfile = state.profiles.find((profile) => profile.profileId === sourceProfileId)
    if (!sourceProfile || sourceProfile.kind !== 'authProfile') {
      throw new Error('Kaynak gerçek auth profili bulunamadı')
    }

    const targetProfileId = await buildUniqueWorkspaceAuthProfileId({
      agentId: sourceProfile.agentId,
      sourceProfileId,
      workspace,
      displayName: displayName || sourceProfile.displayName,
    })

    await cloneAuthProfile({
      agentId: sourceProfile.agentId,
      sourceProfileId,
      targetProfileId,
    })
    clearDiscoveryCache()

    return {
      ...state,
      settings: {
        ...state.settings,
        currentSessionProfileId: targetProfileId,
      },
      profiles: [
        ...state.profiles.filter((profile) => profile.profileId !== targetProfileId),
        {
          ...sourceProfile,
          profileId: targetProfileId,
          workspace,
          displayName: displayName || workspace || sourceProfile.displayName,
          note: note || sourceProfile.note,
          isCurrentProfile: true,
          recommended: false,
        },
      ],
    }
  }).catch((error: Error) => error)

  if (nextState instanceof Error) {
    return NextResponse.json({ ok: false, message: nextState.message }, { status: 400 })
  }

  return NextResponse.json({
    ok: true,
    message: 'Ayrı auth profili kaydedildi',
    settings: nextState.settings,
    profiles: nextState.profiles,
  })
}
