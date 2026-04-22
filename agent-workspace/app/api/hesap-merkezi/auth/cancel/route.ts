import { execFile } from 'child_process'
import { promisify } from 'util'
import { NextRequest, NextResponse } from 'next/server'
import { getAccountCenterPayload } from '@/lib/account-center/service'
import { updateDashboardState } from '@/lib/codex-dashboard/store'

const execFileAsync = promisify(execFile)
const AUTH_HELPER = '/usr/local/bin/esnafdijital-openclaw-auth'

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}))
  const sessionId = typeof body.sessionId === 'string' ? body.sessionId : ''

  const nextState = await updateDashboardState(async (state) => {
    if (sessionId && state.authSession && state.authSession.sessionId !== sessionId) {
      throw new Error('Farklı bir doğrulama oturumu aktif')
    }
    if (state.authSession?.sessionId) {
      try {
        await execFileAsync(AUTH_HELPER, ['cancel', state.authSession.sessionId])
      } catch {
        // best effort
      }
    }
    return {
      ...state,
      authSession: null,
    }
  }).catch((error: Error) => error)

  if (nextState instanceof Error) {
    return NextResponse.json({ ok: false, message: nextState.message }, { status: 400 })
  }

  const payload = await getAccountCenterPayload()
  return NextResponse.json({ ok: true, message: 'Doğrulama oturumu iptal edildi', ...payload })
}
