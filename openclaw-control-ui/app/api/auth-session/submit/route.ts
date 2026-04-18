import { execFile } from 'child_process'
import { promisify } from 'util'
import { NextRequest, NextResponse } from 'next/server'
import { readDashboardState, updateDashboardState } from '@/lib/codex-dashboard/store'
import type { AuthSessionState } from '@/lib/codex-dashboard/types'

const execFileAsync = promisify(execFile)
const AUTH_HELPER = '/usr/local/bin/esnafdijital-openclaw-auth'

type HelperSubmitResult = Partial<AuthSessionState>

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}))
  const sessionId = typeof body.sessionId === 'string' ? body.sessionId : ''
  const callbackValue = typeof body.callbackValue === 'string' ? body.callbackValue.trim() : ''
  const displayName = typeof body.displayName === 'string' ? body.displayName.trim() : ''
  const note = typeof body.note === 'string' ? body.note.trim() : ''
  const workspace = typeof body.workspace === 'string' ? body.workspace.trim() : ''

  if (!sessionId || !callbackValue) {
    return NextResponse.json({ ok: false, message: 'sessionId ve callback/code zorunlu' }, { status: 400 })
  }

  const current = await readDashboardState().catch((error: Error) => error)
  if (current instanceof Error) {
    return NextResponse.json({ ok: false, message: current.message }, { status: 400 })
  }
  if (!current.authSession || current.authSession.sessionId !== sessionId) {
    return NextResponse.json({ ok: false, message: 'Aktif auth session bulunamadı' }, { status: 400 })
  }

  let helper: HelperSubmitResult
  try {
    const { stdout } = await execFileAsync(AUTH_HELPER, ['submit', sessionId, callbackValue], { maxBuffer: 1024 * 1024 })
    helper = JSON.parse(stdout) as HelperSubmitResult
  } catch (error: any) {
    return NextResponse.json(
      {
        ok: false,
        message: 'OpenClaw openai-codex auth doğrulaması başlatılamadı',
        error: error?.stderr || error?.message || 'unknown error',
      },
      { status: 500 },
    )
  }

  const nextState = await updateDashboardState((state) => ({
    ...state,
    authSession: {
      ...state.authSession!,
      status: helper.status || 'verifying',
      error: helper.error || null,
      result: helper.result || null,
      displayName: displayName || state.authSession?.displayName || null,
      note: note || state.authSession?.note || null,
      workspace: workspace || state.authSession?.workspace || null,
    },
  }))

  return NextResponse.json({
    ok: true,
    message: workspace
      ? 'Auth doğrulaması başlatıldı. Bu doğrulama tamamlanınca workspace için ayrı auth profili açılacak.'
      : 'Auth doğrulaması başlatıldı. Workspace girmezsen mevcut auth profili güncellenir.',
    authSession: nextState.authSession,
    profiles: nextState.profiles,
  })
}
