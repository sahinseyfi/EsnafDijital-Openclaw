import { CodexProfileDashboard } from '@/components/codex-dashboard/CodexProfileDashboard'
import { buildSummary, readDashboardState } from '@/lib/codex-dashboard/store'

export const dynamic = 'force-dynamic'

export default async function CodexProfilleriPage() {
  const state = await readDashboardState()
  const status = {
    lastRefreshedAt: new Date().toISOString(),
    summary: buildSummary(state),
    profiles: state.profiles,
    settings: state.settings,
  }

  return <CodexProfileDashboard initialStatus={status} initialAuthSession={state.authSession} />
}
