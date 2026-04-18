import { AdminShell } from '@/components/admin/AdminShell'
import { projectOsMockData } from '@/lib/project-os/mock-data'

const segmentLabels = {
  berber: 'Berber',
  guzellik: 'Güzellik',
  'kafe-restoran': 'Kafe / Restoran',
  diger: 'Diğer',
} as const

const businessNames = Object.fromEntries(projectOsMockData.businesses.map((business) => [business.id, business.name]))

const stats = {
  businesses: projectOsMockData.businesses.length,
  audits: projectOsMockData.audits.length,
  offers: projectOsMockData.offers.length,
  deliveryProjects: projectOsMockData.deliveryProjects.length,
}

export default function ProjectOsPage() {
  return (
    <AdminShell
      title="Project OS"
      description="Audit → teklif → teslimat → bakım akışını ilk typed operasyon veri modeliyle görünür başlatan ekran."
    >
      <section className="stats-grid">
        <article className="card stat-card">
          <strong>{stats.businesses}</strong>
          <p className="muted">businesses çekirdeği</p>
        </article>
        <article className="card stat-card">
          <strong>{stats.audits}</strong>
          <p className="muted">audit kaydı</p>
        </article>
        <article className="card stat-card">
          <strong>{stats.offers}</strong>
          <p className="muted">teklif nesnesi</p>
        </article>
        <article className="card stat-card">
          <strong>{stats.deliveryProjects}</strong>
          <p className="muted">teslimat / bakım kaydı</p>
        </article>
      </section>

      <section className="grid-2" style={{ marginTop: 24 }}>
        <article className="card">
          <h3>Çekirdek veri modeli</h3>
          <ul className="list">
            <li>businesses: işletme ve segment kaydı</li>
            <li>audits: ilk durum analizi ve teklif hazırlık zemini</li>
            <li>offers: satılabilir teklif nesnesi</li>
            <li>delivery_projects: yayına alma ve bakım takibi</li>
          </ul>
        </article>
        <article className="card">
          <h3>Karar çizgisi</h3>
          <ul className="list">
            <li>Tek akış: audit → teklif → teslimat → bakım</li>
            <li>Genel CRM değil, operasyon görünürlüğü</li>
            <li>İlk ekranlar dosya tabanlı örnek veriyle başladı</li>
            <li>Sonraki adım: Prisma şeması + gerçek kayıt tabanı</li>
          </ul>
        </article>
      </section>

      <section className="grid-2" style={{ marginTop: 24 }}>
        <article className="card">
          <h3>İşletmeler</h3>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>İşletme</th>
                  <th>Segment</th>
                  <th>İlçe</th>
                  <th>Durum</th>
                </tr>
              </thead>
              <tbody>
                {projectOsMockData.businesses.map((business) => (
                  <tr key={business.id}>
                    <td>{business.name}</td>
                    <td>{segmentLabels[business.segment]}</td>
                    <td>{business.district}</td>
                    <td>{business.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="card">
          <h3>Audit hattı</h3>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>İşletme</th>
                  <th>Hazırlık</th>
                  <th>Durum</th>
                </tr>
              </thead>
              <tbody>
                {projectOsMockData.audits.map((audit) => (
                  <tr key={audit.id}>
                    <td>{businessNames[audit.businessId]}</td>
                    <td>{audit.channelReadiness}</td>
                    <td>{audit.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      </section>

      <section className="grid-2" style={{ marginTop: 24 }}>
        <article className="card">
          <h3>Teklifler</h3>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>İşletme</th>
                  <th>Paket</th>
                  <th>Tutar</th>
                  <th>Durum</th>
                </tr>
              </thead>
              <tbody>
                {projectOsMockData.offers.map((offer) => (
                  <tr key={offer.id}>
                    <td>{businessNames[offer.businessId]}</td>
                    <td>{offer.packageName}</td>
                    <td>{offer.amountTry.toLocaleString('tr-TR')} ₺</td>
                    <td>{offer.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="card">
          <h3>Teslimat / bakım</h3>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>İşletme</th>
                  <th>Kapsam</th>
                  <th>Durum</th>
                </tr>
              </thead>
              <tbody>
                {projectOsMockData.deliveryProjects.map((project) => (
                  <tr key={project.id}>
                    <td>{businessNames[project.businessId]}</td>
                    <td>{project.scope}</td>
                    <td>{project.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      </section>
    </AdminShell>
  )
}
