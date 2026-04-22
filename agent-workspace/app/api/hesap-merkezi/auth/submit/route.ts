import { execFile } from 'child_process'
import { promisify } from 'util'
import { NextRequest, NextResponse } from 'next/server'
import { getAccountCenterPayload } from '@/lib/account-center/service'
import { readDashboardState, updateDashboardState } from '@/lib/codex-dashboard/store'
import type { AuthSessionState } from '@/lib/codex-dashboard/types'

const execFileAsync = promisify(execFile)
const AUTH_HELPER = '/usr/local/bin/esnafdijital-openclaw-auth'

type HelperSubmitResult = Partial<AuthSessionState>

function getExecErrorMessage(error: unknown) {
  if (typeof error === 'object' && error !== null) {
    const maybeError = error as { stderr?: string; message?: string }
    return maybeError.stderr || maybeError.message || 'unknown error'
  }
  return 'unknown error'
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}))
  const sessionId = typeof body.sessionId === 'string' ? body.sessionId : ''
  const callbackValue = typeof body.callbackValue === 'string' ? body.callbackValue.trim() : ''
  const displayName = typeof body.displayName === 'string' ? body.displayName.trim() : ''
  const note = typeof body.note === 'string' ? body.note.trim() : ''
  const workspace = typeof body.workspace === 'string' ? body.workspace.trim() : ''

  if (!sessionId || !callbackValue) {
    return NextResponse.json({ ok: false, message: 'Oturum kimliği ile dönen bağlantı veya kod zorunlu' }, { status: 400 })
  }

  if (!displayName && !workspace) {
    return NextResponse.json({ ok: false, message: 'Profil adı zorunlu' }, { status: 400 })
  }

  const current = await readDashboardState().catch((error: Error) => error)
  if (current instanceof Error) {
    return NextResponse.json({ ok: false, message: current.message }, { status: 400 })
  }
  if (!current.authSession || current.authSession.sessionId !== sessionId) {
    return NextResponse.json({ ok: false, message: 'Aktif doğrulama oturumu bulunamadı' }, { status: 400 })
  }

  let helper: HelperSubmitResult
  try {
    const { stdout } = await execFileAsync(AUTH_HELPER, ['submit', sessionId, callbackValue], { maxBuffer: 1024 * 1024 })
    helper = JSON.parse(stdout) as HelperSubmitResult
  } catch (error: unknown) {
    return NextResponse.json(
      { ok: false, message: 'Kimlik doğrulama başlatılamadı', error: getExecErrorMessage(error) },
      { status: 500 },
    )
  }

  await updateDashboardState((state) => ({
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

  const payload = await getAccountCenterPayload()
  return NextResponse.json({ ok: true, message: 'Kimlik doğrulama başlatıldı', ...payload })
}
