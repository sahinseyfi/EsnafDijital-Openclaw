import { NextRequest, NextResponse } from 'next/server'
import type { CodexProfile } from '@/lib/codex-dashboard/types'
import { updateDashboardState } from '@/lib/codex-dashboard/store'

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48) || 'workspace'
}

function buildManagedProfileId(sourceProfileId: string, workspace: string, displayName?: string | null) {
  return `managed:${sourceProfileId}:${slugify(workspace || displayName || 'workspace')}`
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}))
  const sourceProfileId = typeof body.sourceProfileId === 'string' ? body.sourceProfileId : ''
  const displayName = typeof body.displayName === 'string' ? body.displayName.trim() : ''
  const note = typeof body.note === 'string' ? body.note.trim() : ''
  const workspace = typeof body.workspace === 'string' ? body.workspace.trim() : ''

  if (!sourceProfileId || !workspace) {
    return NextResponse.json({ ok: false, message: 'sourceProfileId ve workspace zorunlu' }, { status: 400 })
  }

  const nextState = await updateDashboardState((state) => {
    const sourceProfile = state.profiles.find((profile) => profile.profileId === sourceProfileId)
    if (!sourceProfile) {
      throw new Error('Kaynak auth profili bulunamadı')
    }

    const managedProfileId = buildManagedProfileId(sourceProfileId, workspace, displayName || sourceProfile.displayName)
    const managedProfile: CodexProfile = {
      ...sourceProfile,
      profileId: managedProfileId,
      kind: 'managed',
      sourceProfileId,
      workspace,
      displayName: displayName || workspace || sourceProfile.displayName,
      note: note || sourceProfile.note,
      recommended: false,
      isCurrentProfile: true,
    }

    return {
      ...state,
      settings: {
        ...state.settings,
        currentSessionProfileId: managedProfileId,
      },
      profiles: [...state.profiles.filter((profile) => profile.profileId !== managedProfileId), managedProfile],
    }
  }).catch((error: Error) => error)

  if (nextState instanceof Error) {
    return NextResponse.json({ ok: false, message: nextState.message }, { status: 400 })
  }

  return NextResponse.json({
    ok: true,
    message: 'Business/workspace profili kaydedildi',
    settings: nextState.settings,
    profiles: nextState.profiles,
  })
}
