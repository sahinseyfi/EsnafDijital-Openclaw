import type { AccountCenterState } from '@/lib/account-center/types'

export function AccountCenter({ state }: { state: AccountCenterState }) {
  return (
    <>
      <section className="hero">
        <div>
          <p className="eyebrow">Yeni sistem / V2</p>
          <h1>Hesap Merkezi</h1>
          <p className="muted">
            Bu ekran sadece auth hesabı, teknik kimlik ve operatör adı ilişkisini net göstermek için kuruldu.
            Eski ekranın kopyası değil.
          </p>
        </div>
      </section>

      <section className="stats-grid" style={{ marginTop: 24 }}>
        <article className="card stat-card">
          <strong>{state.totalProfiles}</strong>
          <p className="muted">kayıtlı gerçek auth profili</p>
        </article>
        <article className="card stat-card">
          <strong>{state.currentDisplayName || 'Yok'}</strong>
          <p className="muted">bu oturumda aktif profil</p>
        </article>
      </section>

      <section className="card" style={{ marginTop: 24 }}>
        <h3>Sistem kuralı</h3>
        <ul className="list">
          <li>Bir satır = gerçek auth kaydı</li>
          <li>Operatör adı, not ve workspace etiketi teknik kimlikten ayrıdır</li>
          <li>Bu V2 ekranı önce görünürlüğü düzeltiyor, sonra aksiyonları eklenecek</li>
        </ul>
      </section>

      <section className="card" style={{ marginTop: 24 }}>
        <h3>Kayıtlı profiller</h3>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Görünen ad</th>
                <th>Current</th>
                <th>Email</th>
                <th>Account ID</th>
                <th>Workspace etiketi</th>
                <th>Plan</th>
                <th>Profil ID</th>
              </tr>
            </thead>
            <tbody>
              {state.profiles.map((profile) => (
                <tr key={profile.profileId}>
                  <td>
                    <strong>{profile.displayName}</strong>
                    <div className="muted" style={{ marginTop: 6 }}>{profile.note}</div>
                  </td>
                  <td>{profile.current ? <span className="badge">Aktif</span> : '—'}</td>
                  <td>{profile.email || '—'}</td>
                  <td>{profile.accountId || '—'}</td>
                  <td>{profile.workspaceLabel || '—'}</td>
                  <td>{profile.planType || '—'}</td>
                  <td><code>{profile.profileId}</code></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}
