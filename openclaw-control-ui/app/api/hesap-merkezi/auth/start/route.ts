import { execFile } from 'child_process'
import { promisify } from 'util'
import { NextResponse } from 'next/server'
import { getAccountCenterPayload } from '@/lib/account-center/service'
import { updateDashboardState } from '@/lib/codex-dashboard/store'

const execFileAsync = promisify(execFile)
const AUTH_HELPER = '/usr/local/bin/esnafdijital-openclaw-auth'

type HelperStartResult = {
  sessionId: string
  startedAt: string
  authUrl: string
  status?: 'starting' | 'running' | 'awaiting_callback' | 'verifying' | 'completed' | 'error' | 'cancelled'
  error?: string | null
  result?: string | null
}

export async function POST() {
  let helper: HelperStartResult
  try {
    const { stdout } = await execFileAsync(AUTH_HELPER, ['start'])
    helper = JSON.parse(stdout) as HelperStartResult
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, message: 'Gerçek OpenClaw auth akışı başlatılamadı', error: error?.stderr || error?.message || 'unknown error' },
      { status: 500 },
    )
  }

  await updateDashboardState((state) => ({
    ...state,
    authSession: {
      sessionId: helper.sessionId,
      authUrl: helper.authUrl,
      startedAt: helper.startedAt,
      status: helper.status,
      error: helper.error || null,
      result: helper.result || null,
    },
  }))

  const payload = await getAccountCenterPayload()
  return NextResponse.json({ ok: true, message: 'Gerçek auth linki üretildi', ...payload })
}
