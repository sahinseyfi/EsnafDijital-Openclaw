import { NextRequest, NextResponse } from 'next/server'
import { updateDashboardState } from '@/lib/codex-dashboard/store'

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}))

  const nextState = await updateDashboardState((state) => ({
    ...state,
    settings: {
      ...state.settings,
      autoRouteEnabled: typeof body.autoRouteEnabled === 'boolean' ? body.autoRouteEnabled : state.settings.autoRouteEnabled,
      routingThreshold: typeof body.routingThreshold === 'number' ? body.routingThreshold : state.settings.routingThreshold,
      activeAgentId: typeof body.activeAgentId === 'string' && body.activeAgentId ? body.activeAgentId : state.settings.activeAgentId,
    },
  }))

  return NextResponse.json({ ok: true, message: 'Routing ayarı güncellendi', settings: nextState.settings })
}
