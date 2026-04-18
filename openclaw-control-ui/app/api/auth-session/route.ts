import { execFile } from 'child_process'
import { promisify } from 'util'
import { NextResponse } from 'next/server'
import { readDashboardState, updateDashboardState } from '@/lib/codex-dashboard/store'
import type { AuthSessionState } from '@/lib/codex-dashboard/types'

const execFileAsync = promisify(execFile)
const AUTH_HELPER = '/usr/local/bin/esnafdijital-openclaw-auth'

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

  const terminal = merged.status === 'completed' || merged.status === 'error' || merged.status === 'cancelled'
  if (terminal) {
    await updateDashboardState((current) => ({ ...current, authSession: null }))
  }

  return NextResponse.json({ authSession: merged, terminal })
}
