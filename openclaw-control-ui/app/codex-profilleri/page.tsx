import { CodexProfileDashboard } from '@/components/codex-dashboard/CodexProfileDashboard'
import { getDashboardStatus, readDashboardState } from '@/lib/codex-dashboard/store'

export const dynamic = 'force-dynamic'

export default async function CodexProfilleriPage() {
  const [state, status] = await Promise.all([
    readDashboardState(),
    getDashboardStatus(),
  ])

  return <CodexProfileDashboard initialStatus={status} initialAuthSession={state.authSession} />
}
