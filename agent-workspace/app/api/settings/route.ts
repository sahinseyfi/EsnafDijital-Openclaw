import { NextRequest, NextResponse } from 'next/server'
import { buildSummary, readDashboardState, updateDashboardState } from '@/lib/codex-dashboard/store'

export async function GET() {
  const state = await readDashboardState()
  return NextResponse.json({ settings: state.settings })
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}))

  const nextState = await updateDashboardState((state) => ({
    ...state,
    settings: {
      ...state.settings,
      autoRouteEnabled: typeof body.autoRouteEnabled === 'boolean' ? body.autoRouteEnabled : state.settings.autoRouteEnabled,
      routingThreshold: typeof body.routingThreshold === 'number' ? body.routingThreshold : state.settings.routingThreshold,
      activeAgentId: typeof body.activeAgentId === 'string' && body.activeAgentId ? body.activeAgentId : state.settings.activeAgentId,
      activeAgentStatus: typeof body.activeAgentStatus === 'string' ? body.activeAgentStatus : state.settings.activeAgentStatus,
      workspace: typeof body.workspace === 'string' && body.workspace ? body.workspace : state.settings.workspace,
      currentModel: typeof body.currentModel === 'string' && body.currentModel ? body.currentModel : state.settings.currentModel,
      autoRefreshSeconds: typeof body.autoRefreshSeconds === 'number' ? body.autoRefreshSeconds : state.settings.autoRefreshSeconds,
      viewFilter: typeof body.viewFilter === 'string' ? body.viewFilter : state.settings.viewFilter,
    },
  }))

  return NextResponse.json({ ok: true, message: 'Ayarlar güncellendi', settings: nextState.settings, summary: buildSummary(nextState) })
}
