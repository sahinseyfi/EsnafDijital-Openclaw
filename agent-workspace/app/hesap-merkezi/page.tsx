import { AdminShell } from '@/components/admin/AdminShell'
import { AccountCenter } from '@/components/account-center/AccountCenter'
import { getAccountCenterPayload } from '@/lib/account-center/service'

export const dynamic = 'force-dynamic'

export default async function HesapMerkeziPage() {
  const payload = await getAccountCenterPayload()

  return (
    <AdminShell
      title="Hesap Merkezi"
      description="Yeni kimlik doğrulama ve profil sisteminin sade başlangıç ekranı. Burada sadece gerçek hesap kaydı ve görünen operatör adı ilişkisi var."
    >
      <AccountCenter initialPayload={payload} />
    </AdminShell>
  )
}
