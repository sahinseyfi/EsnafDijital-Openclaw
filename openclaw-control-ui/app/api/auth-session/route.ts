import { execFile } from 'child_process'
import { promisify } from 'util'
import { NextResponse } from 'next/server'
import { readDashboardState, updateDashboardState } from '@/lib/codex-dashboard/store'
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
    await updateDashboardState((current) => ({
      ...current,
      authSession: null,
      settings: {
        ...current.settings,
        currentSessionProfileId: merged.status === 'completed' && profileId ? profileId : current.settings.currentSessionProfileId,
      },
      profiles: merged.status === 'completed' && profileId
        ? current.profiles.map((profile) =>
            profile.profileId === profileId
              ? {
                  ...profile,
                  displayName: merged.displayName?.trim() || profile.displayName,
                  note: merged.note?.trim() || profile.note,
                }
              : profile,
          )
        : current.profiles,
    }))
  }

  return NextResponse.json({ authSession: merged, terminal })
}
