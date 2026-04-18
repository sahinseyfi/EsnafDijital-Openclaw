import { execFile } from 'child_process'
import { promisify } from 'util'
import { NextResponse } from 'next/server'
import { buildUniqueWorkspaceAuthProfileId, cloneAuthProfile } from '@/lib/codex-dashboard/auth-store'
import { clearDiscoveryCache, readDashboardState, updateDashboardState } from '@/lib/codex-dashboard/store'
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
}): CodexProfile {
  return {
    profileId: params.profileId,
    displayName: params.displayName,
    note: params.note,
    email: '—',
    accountId: 'bilinmiyor',
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

  const profileId = extractProfileId(merged.result)
  if (profileId) {
    merged.profileId = profileId
  }

  const terminal = merged.status === 'completed' || merged.status === 'error' || merged.status === 'cancelled'
  if (terminal) {
    await updateDashboardState(async (current) => {
      let nextProfiles = current.profiles
      let nextCurrentProfileId = current.settings.currentSessionProfileId

      if (merged.status === 'completed' && profileId) {
        const displayName = merged.displayName?.trim() || ''
        const note = merged.note?.trim() || ''
        const workspace = merged.workspace?.trim() || ''
        const sourceProfile = current.profiles.find((profile) => profile.profileId === profileId)
        const sourceAgentId = sourceProfile?.agentId || current.settings.activeAgentId || 'main'
        const sourceDisplayName = sourceProfile?.displayName || displayName || workspace || profileId
        const sourceNote = sourceProfile?.note || note || `Gerçek auth profile, agent=${sourceAgentId}, mode=oauth`
        const cloneKey = workspace || displayName

        if (cloneKey) {
          const workspaceProfileId = await buildUniqueWorkspaceAuthProfileId({
            agentId: sourceAgentId,
            sourceProfileId: profileId,
            workspace: cloneKey,
            displayName: displayName || sourceDisplayName,
          })
          await cloneAuthProfile({
            agentId: sourceAgentId,
            sourceProfileId: profileId,
            targetProfileId: workspaceProfileId,
          })
          clearDiscoveryCache()
          nextProfiles = [
            ...current.profiles.filter((profile) => profile.profileId !== workspaceProfileId),
            {
              ...(sourceProfile || buildFallbackProfile({
                profileId: workspaceProfileId,
                agentId: sourceAgentId,
                displayName: displayName || workspace || sourceDisplayName,
                note: note || sourceNote,
                workspace: workspace || displayName || null,
              })),
              profileId: workspaceProfileId,
              workspace: workspace || displayName || sourceProfile?.workspace || null,
              displayName: displayName || workspace || sourceDisplayName,
              note: note || sourceNote,
              isCurrentProfile: true,
              recommended: false,
            },
          ]
          nextCurrentProfileId = workspaceProfileId
          merged.profileId = workspaceProfileId
        } else {
          const updated = current.profiles.map((profile) =>
            profile.profileId === profileId
              ? {
                  ...profile,
                  displayName: displayName || profile.displayName,
                  note: note || profile.note,
                }
              : profile,
          )
          nextProfiles = updated.some((profile) => profile.profileId === profileId)
            ? updated
            : [
                ...updated,
                buildFallbackProfile({
                  profileId,
                  agentId: sourceAgentId,
                  displayName: displayName || sourceDisplayName,
                  note: note || sourceNote,
                  workspace: workspace || sourceProfile?.workspace || null,
                }),
              ]
          nextCurrentProfileId = profileId
        }
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
  }

  return NextResponse.json({ authSession: merged, terminal })
}
