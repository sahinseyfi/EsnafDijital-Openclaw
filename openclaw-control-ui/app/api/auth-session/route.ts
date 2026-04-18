import { execFile } from 'child_process'
import { promisify } from 'util'
import { NextResponse } from 'next/server'
import { buildWorkspaceAuthProfileId, cloneAuthProfile } from '@/lib/codex-dashboard/auth-store'
import { clearDiscoveryCache, readDashboardState, updateDashboardState } from '@/lib/codex-dashboard/store'
import type { AuthSessionState } from '@/lib/codex-dashboard/types'

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

        if (sourceProfile) {
          if (workspace) {
            const workspaceProfileId = buildWorkspaceAuthProfileId(profileId, workspace, displayName || sourceProfile.displayName)
            await cloneAuthProfile({
              agentId: sourceProfile.agentId,
              sourceProfileId: profileId,
              targetProfileId: workspaceProfileId,
            })
            clearDiscoveryCache()
            nextProfiles = [
              ...current.profiles.filter((profile) => profile.profileId !== workspaceProfileId),
              {
                ...sourceProfile,
                profileId: workspaceProfileId,
                workspace,
                displayName: displayName || workspace || sourceProfile.displayName,
                note: note || sourceProfile.note,
                isCurrentProfile: true,
                recommended: false,
              },
            ]
            nextCurrentProfileId = workspaceProfileId
            merged.profileId = workspaceProfileId
          } else {
            nextProfiles = current.profiles.map((profile) =>
              profile.profileId === profileId
                ? {
                    ...profile,
                    displayName: displayName || profile.displayName,
                    note: note || profile.note,
                  }
                : profile,
            )
            nextCurrentProfileId = profileId
          }
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
