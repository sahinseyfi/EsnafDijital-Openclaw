import { AdminShell } from '@/components/admin/AdminShell'
import { BusinessCreateForm } from '@/components/project-os/BusinessCreateForm'
import { getProjectOsDataset } from '@/lib/project-os/service'

const segmentLabels = {
  berber: 'Berber',
  guzellik: 'Güzellik',
  'kafe-restoran': 'Kafe / Restoran',
  diger: 'Diğer',
} as const

export default async function ProjectOsPage() {
  const dataset = await getProjectOsDataset()
  const businessNames = Object.fromEntries(dataset.businesses.map((business) => [business.id, business.name]))

  const stats = {
    businesses: dataset.businesses.length,
    audits: dataset.audits.length,
    offers: dataset.offers.length,
    deliveryProjects: dataset.deliveryProjects.length,
  }

  return (
    <AdminShell
      title="Project OS"
      description="Audit → teklif → teslimat → bakım hattını sakin, okunur ve operasyon odaklı bir yüzeyde görünür başlatan çekirdek ekran."
    >
      <section className="hero">
        <div>
          <p className="eyebrow">Operasyon akışı</p>
          <h1>Tek akış, net görünürlük</h1>
          <p className="muted">Bu alan genel CRM gibi büyümek için değil, EsnafDigital’in gerçek teslimat hattını açık tutmak için var.</p>
        </div>
      </section>

      <section className="grid-2" style={{ alignItems: 'start' }}>
        <BusinessCreateForm />
        <article className="card stack-sm">
          <div>
            <p className="eyebrow">Veri akışı</p>
            <h3>Project OS artık kayıt kabul ediyor</h3>
          </div>
          <ul className="list">
            <li>İşletme kaydı önce açılır, audit, teklif ve teslimat aynı omurgaya bağlanır</li>
            <li>Veritabanı varsa gerçek kayıt, yoksa `.data/project-os-mock.json` üstünden mock kalıcılık kullanılır</li>
            <li>Bu fazda amaç geniş CRM değil, teslimat hattını tek yerde görünür başlatmak</li>
          </ul>
        </article>
      </section>

      <section className="stats-grid">
        <article className="card stat-card">
          <strong>{stats.businesses}</strong>
          <p className="muted">işletme kaydı</p>
        </article>
        <article className="card stat-card">
          <strong>{stats.audits}</strong>
          <p className="muted">audit hazırlığı</p>
        </article>
        <article className="card stat-card">
          <strong>{stats.offers}</strong>
          <p className="muted">teklif nesnesi</p>
        </article>
        <article className="card stat-card">
          <strong>{stats.deliveryProjects}</strong>
          <p className="muted">teslimat ve bakım kaydı</p>
        </article>
      </section>

      <section className="grid-2">
        <article className="card">
          <h3>Çekirdek veri modeli</h3>
          <ul className="list">
            <li>businesses, işletme ve segment bilgisini taşır</li>
            <li>audits, teklif öncesi somut durum analizini tutar</li>
            <li>offers, satılabilir teklif nesnesini netleştirir</li>
            <li>delivery_projects, yayına alma ve bakım takibini taşır</li>
          </ul>
        </article>
        <article className="card">
          <h3>Karar çizgisi</h3>
          <ul className="list">
            <li>Genel CRM değil, operasyon görünürlüğü</li>
            <li>Önce çalışan akış, sonra veri tabanı derinliği</li>
            <li>Grafik yerine sayı, durum ve tablo önceliği</li>
            <li>Sonraki teknik adım Prisma şeması ve gerçek kayıt katmanı</li>
          </ul>
        </article>
      </section>

      <section className="grid-2">
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
                {dataset.businesses.length > 0 ? dataset.businesses.map((business) => (
                  <tr key={business.id}>
                    <td>{business.name}</td>
                    <td>{segmentLabels[business.segment]}</td>
                    <td>{business.district}</td>
                    <td>{business.status}</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={4} className="muted">Henüz işletme kaydı yok.</td>
                  </tr>
                )}
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
                {dataset.audits.length > 0 ? dataset.audits.map((audit) => (
                  <tr key={audit.id}>
                    <td>{businessNames[audit.businessId] || '—'}</td>
                    <td>{audit.channelReadiness}</td>
                    <td>{audit.status}</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={3} className="muted">Henüz audit kaydı yok.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </article>
      </section>

      <section className="grid-2">
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
                {dataset.offers.length > 0 ? dataset.offers.map((offer) => (
                  <tr key={offer.id}>
                    <td>{businessNames[offer.businessId] || '—'}</td>
                    <td>{offer.packageName}</td>
                    <td>{offer.amountTry.toLocaleString('tr-TR')} ₺</td>
                    <td>{offer.status}</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={4} className="muted">Henüz teklif kaydı yok.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </article>

        <article className="card">
          <h3>Teslimat ve bakım</h3>
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
                {dataset.deliveryProjects.length > 0 ? dataset.deliveryProjects.map((project) => (
                  <tr key={project.id}>
                    <td>{businessNames[project.businessId] || '—'}</td>
                    <td>{project.scope}</td>
                    <td>{project.status}</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={3} className="muted">Henüz teslimat veya bakım kaydı yok.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </article>
      </section>
    </AdminShell>
  )
}
