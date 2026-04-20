import { AdminShell } from '@/components/admin/AdminShell'
import { CodexProfileDashboard } from '@/components/codex-dashboard/CodexProfileDashboard'
import { getDashboardStatus, readDashboardState } from '@/lib/codex-dashboard/store'

export const dynamic = 'force-dynamic'

export default async function CodexProfilleriPage() {
  const [state, status] = await Promise.all([
    readDashboardState(),
    getDashboardStatus(),
  ])

  return (
    <AdminShell
      title="Codex Profilleri"
      description="Eski operator ekranı da yeni tasarım diliyle aynı açık yüzey, net tipografi ve sade aksiyon mantığına taşındı."
    >
      <CodexProfileDashboard initialStatus={status} initialAuthSession={state.authSession} />
    </AdminShell>
  )
}
