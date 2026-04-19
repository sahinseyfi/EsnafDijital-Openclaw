import { AdminShell } from '@/components/admin/AdminShell'
import { AccountCenter } from '@/components/account-center/AccountCenter'
import { getAccountCenterState } from '@/lib/account-center/service'

export const dynamic = 'force-dynamic'

export default async function HesapMerkeziPage() {
  const state = await getAccountCenterState()

  return (
    <AdminShell
      title="Hesap Merkezi"
      description="Yeni auth/profil sisteminin temiz başlangıç ekranı. Burada sadece gerçek hesap kaydı ve görünen operatör adı ilişkisi var."
    >
      <AccountCenter state={state} />
    </AdminShell>
  )
}
