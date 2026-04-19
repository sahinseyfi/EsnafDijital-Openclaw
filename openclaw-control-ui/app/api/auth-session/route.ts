import { execFile } from 'child_process'
import { promisify } from 'util'
import { NextResponse } from 'next/server'
import { canonicalizeAuthProfile } from '@/lib/codex-dashboard/auth-store'
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
    usage: {
      fiveHourPct: 0,
      weekPct: 0,
      fiveHourResetAt: null,
      weekResetAt: null,
    },
    probe: {
      status: 'idle',
      lastOkAt: null,
      lastError: null,
    },
    duplicateAccount: false,
    recommended: false,
    isCurrentProfile: false,
    health: 'idle',
  }
}

export async function GET() {
  const state = await readDashboardState()
  if (!state.authSession?.sessionId) {
    return NextResponse.json({ authSession: null })
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
        const canonical = await canonicalizeAuthProfile({
          agentId: sourceAgentId,
          profileId: rawProfileId,
        })

        clearDiscoveryCache()
        rawProfileIdToCleanup = canonical.previousProfileId !== canonical.canonicalProfileId ? canonical.previousProfileId : null

        const canonicalDisplayName = displayName || workspace || rawProfile?.displayName || canonical.email || canonical.canonicalProfileId
        const canonicalNote = note || rawProfile?.note || `Gerçek auth profile, agent=${sourceAgentId}, mode=oauth`
        const canonicalWorkspace = workspace || rawProfile?.workspace || null
        const existingCanonical = current.profiles.find((profile) => profile.profileId === canonical.canonicalProfileId)

        nextProfiles = [
          ...current.profiles.filter((profile) => profile.profileId !== rawProfileId && profile.profileId !== canonical.canonicalProfileId),
          {
            ...(existingCanonical || rawProfile || buildFallbackProfile({
              profileId: canonical.canonicalProfileId,
              agentId: sourceAgentId,
              displayName: canonicalDisplayName,
              note: canonicalNote,
              workspace: canonicalWorkspace,
              email: canonical.email,
              accountId: canonical.accountId,
            })),
            profileId: canonical.canonicalProfileId,
            accountId: canonical.accountId || existingCanonical?.accountId || rawProfile?.accountId || 'bilinmiyor',
            email: canonical.email || existingCanonical?.email || rawProfile?.email || '—',
            workspace: canonicalWorkspace,
            displayName: canonicalDisplayName,
            note: canonicalNote,
            isCurrentProfile: true,
            recommended: false,
          },
        ]
        nextCurrentProfileId = canonical.canonicalProfileId
        merged.profileId = canonical.canonicalProfileId
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

  return NextResponse.json({ authSession: merged, terminal })
}
