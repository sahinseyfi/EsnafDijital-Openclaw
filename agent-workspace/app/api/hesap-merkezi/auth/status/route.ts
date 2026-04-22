import { execFile } from 'child_process'
import { promisify } from 'util'
import { NextResponse } from 'next/server'
import { getAccountCenterState } from '@/lib/account-center/service'
import { materializeOperatorAuthProfile } from '@/lib/codex-dashboard/auth-store'
import { clearDiscoveryCache, readDashboardState, removeProfileArtifacts, updateDashboardState } from '@/lib/codex-dashboard/store'
import type { AuthSessionState, CodexProfile } from '@/lib/codex-dashboard/types'

const execFileAsync = promisify(execFile)
const AUTH_HELPER = '/usr/local/bin/esnafdijital-openclaw-auth'

function extractProfileId(result?: string | null) {
  if (!result) return null
  const match = result.match(/Auth profile:\s+([^\s]+)/)
  return match?.[1] || null
}

async function readHelperStatus(sessionId: string) {
  try {
    const { stdout } = await execFileAsync(AUTH_HELPER, ['status', sessionId])
    return JSON.parse(stdout) as Partial<AuthSessionState>
  } catch {
    return null
  }
}

function buildFallbackProfile(params: {
  profileId: string
  agentId: string
  displayName: string
  note: string
  workspace?: string | null
  email?: string | null
  accountId?: string | null
}): CodexProfile {
  return {
    profileId: params.profileId,
    displayName: params.displayName,
    note: params.note,
    email: params.email || '—',
    accountId: params.accountId || 'bilinmiyor',
    planType: 'OAuth',
    agentId: params.agentId,
    workspace: params.workspace || null,
    provider: 'openai-codex',
    mode: 'oauth',
    kind: 'authProfile',
    recentSessionCount: 0,
    lastUsedAt: null,
    usage: { fiveHourPct: 0, weekPct: 0, fiveHourResetAt: null, weekResetAt: null },
    probe: { status: 'idle', lastOkAt: null, lastError: null },
    duplicateAccount: false,
    recommended: false,
    isCurrentProfile: false,
    health: 'idle',
  }
}

export async function GET() {
  const state = await readDashboardState()
  if (!state.authSession?.sessionId) {
    const nextState = await getAccountCenterState()
    return NextResponse.json({ state: nextState, authSession: null, terminal: true })
  }

  const helper = await readHelperStatus(state.authSession.sessionId)
  const merged: AuthSessionState = {
    ...state.authSession,
    ...(helper || {}),
  }

  const rawProfileId = extractProfileId(merged.result)
  if (rawProfileId) {
    merged.profileId = rawProfileId
  }

  const terminal = merged.status === 'completed' || merged.status === 'error' || merged.status === 'cancelled'
  if (terminal) {
    let rawProfileIdToCleanup: string | null = null

    await updateDashboardState(async (current) => {
      let nextProfiles = current.profiles
      let nextCurrentProfileId = current.settings.currentSessionProfileId

      if (merged.status === 'completed' && rawProfileId) {
        const displayName = merged.displayName?.trim() || ''
        const note = merged.note?.trim() || ''
        const workspace = merged.workspace?.trim() || ''
        const rawProfile = current.profiles.find((profile) => profile.profileId === rawProfileId)
        const sourceAgentId = rawProfile?.agentId || current.settings.activeAgentId || 'main'
        const materialized = await materializeOperatorAuthProfile({
          agentId: sourceAgentId,
          profileId: rawProfileId,
          displayName,
          workspace,
        })

        clearDiscoveryCache()
        rawProfileIdToCleanup = materialized.previousProfileId !== materialized.targetProfileId ? materialized.previousProfileId : null

        const targetDisplayName = displayName || workspace || rawProfile?.displayName || materialized.email || materialized.targetProfileId
        const targetNote = note || rawProfile?.note || `Gerçek kimlik doğrulama profili, ajan=${sourceAgentId}, kip=oauth`
        const targetWorkspace = workspace || rawProfile?.workspace || null
        const existingTarget = current.profiles.find((profile) => profile.profileId === materialized.targetProfileId)

        nextProfiles = [
          ...current.profiles.filter((profile) => profile.profileId !== rawProfileId && profile.profileId !== materialized.targetProfileId),
          {
            ...(existingTarget || rawProfile || buildFallbackProfile({
              profileId: materialized.targetProfileId,
              agentId: sourceAgentId,
              displayName: targetDisplayName,
              note: targetNote,
              workspace: targetWorkspace,
              email: materialized.email,
              accountId: materialized.accountId,
            })),
            profileId: materialized.targetProfileId,
            accountId: materialized.accountId || existingTarget?.accountId || rawProfile?.accountId || 'bilinmiyor',
            email: materialized.email || existingTarget?.email || rawProfile?.email || '—',
            workspace: targetWorkspace,
            displayName: targetDisplayName,
            note: targetNote,
            isCurrentProfile: true,
            recommended: false,
          },
        ]
        nextCurrentProfileId = materialized.targetProfileId
        merged.profileId = materialized.targetProfileId
        merged.canonicalAction = materialized.createdAdditionalRecord ? 'saved_separately' : 'created'
      }

      return {
        ...current,
        authSession: null,
        settings: {
          ...current.settings,
          currentSessionProfileId: nextCurrentProfileId,
        },
        profiles: nextProfiles,
      }
    })

    if (rawProfileIdToCleanup) {
      await removeProfileArtifacts(rawProfileIdToCleanup)
    }
  }

  const nextState = await getAccountCenterState()
  return NextResponse.json({ state: nextState, authSession: merged, terminal })
}
