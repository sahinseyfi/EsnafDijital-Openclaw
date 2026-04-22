import { execFile } from 'child_process'
import { promisify } from 'util'
import { NextRequest, NextResponse } from 'next/server'
import { updateDashboardState } from '@/lib/codex-dashboard/store'

const execFileAsync = promisify(execFile)
const CURRENT_SESSION_SWITCH_HELPER = '/usr/local/bin/esnafdijital-openclaw-session-switch'

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}))
  const profileId = typeof body.profileId === 'string' ? body.profileId : ''
  const scope = typeof body.scope === 'string' ? body.scope : 'current-session'

  if (!profileId) {
    return NextResponse.json({ ok: false, message: 'profileId zorunlu' }, { status: 400 })
  }

  const nextState = await updateDashboardState(async (state) => {
    const selected = state.profiles.find((profile) => profile.profileId === profileId)
    if (!selected) {
      throw new Error('Profil bulunamadı')
    }

    if (scope === 'all-sessions') {
      if (selected.kind !== 'authProfile' || selected.provider !== 'openai-codex') {
        throw new Error('Sadece gerçek openai-codex kimlik profilleri ajan varsayılanı yapılabilir')
      }

      const orderedProfiles = state.profiles
        .filter((profile) => profile.kind === 'authProfile' && profile.agentId === selected.agentId && profile.provider === 'openai-codex')
        .map((profile) => profile.profileId)

      const profileOrder = [selected.profileId, ...orderedProfiles.filter((id) => id !== selected.profileId)]
      await execFileAsync('openclaw', ['models', 'auth', 'order', 'set', '--agent', selected.agentId, '--provider', 'openai-codex', ...profileOrder])
    }

    if (scope === 'current-session') {
      const sessionKey = `agent:${selected.agentId}:${selected.agentId}`

      if (selected.kind === 'authProfile' && selected.provider === 'openai-codex') {
        await execFileAsync(CURRENT_SESSION_SWITCH_HELPER, [selected.agentId, selected.profileId, sessionKey])
      } else if (selected.kind === 'agent') {
        await execFileAsync(CURRENT_SESSION_SWITCH_HELPER, [selected.agentId, '--clear', sessionKey])
      } else {
        throw new Error('Bu oturumda sadece ajan veya gerçek openai-codex kimlik profili seçilebilir')
      }
    }

    return {
      ...state,
      systemNotice: null,
      settings: {
        ...state.settings,
        activeAgentId: selected.agentId,
        workspace: selected.workspace || state.settings.workspace,
        currentSessionProfileId: profileId,
        globalProfileId: scope === 'all-sessions' ? profileId : state.settings.globalProfileId,
      },
    }
  }).catch((error: Error) => error)

  if (nextState instanceof Error) {
    return NextResponse.json({ ok: false, message: nextState.message }, { status: 400 })
  }

  return NextResponse.json({
    ok: true,
    message: scope === 'all-sessions' ? 'Gerçek profil sırası ajan üzerinde güncellendi' : 'Bu oturumun gerçek profil seçimi değiştirildi',
    settings: nextState.settings,
    profiles: nextState.profiles,
  })
}
