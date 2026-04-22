import Link from 'next/link'
import { AdminShell } from '@/components/admin/AdminShell'
import { AuditCreateForm } from '@/components/project-os/AuditCreateForm'
import { BusinessCreateForm } from '@/components/project-os/BusinessCreateForm'
import { DeliveryProjectCreateForm } from '@/components/project-os/DeliveryProjectCreateForm'
import { OfferCreateForm } from '@/components/project-os/OfferCreateForm'
import { getConsultationCenterPayload } from '@/lib/consultation-center/service'
import { getProjectOsDataset } from '@/lib/project-os/service'

const segmentLabels = {
  berber: 'Berber',
  guzellik: 'Güzellik',
  'kafe-restoran': 'Kafe / Restoran',
  diger: 'Diğer',
} as const

function getHotStage(input: {
  businesses: number
  pendingAudits: number
  pendingOffers: number
  activeDeliveries: number
  maintenanceProjects: number
}) {
  if (input.businesses === 0) {
    return 'Henüz işletme yok. Önce işletme kaydı açıp hattı gerçek veriyle başlat.'
  }

  if (input.pendingAudits > 0) {
    return `${input.pendingAudits} audit kaydı teklif öncesi netleşmeyi bekliyor.`
  }

  if (input.pendingOffers > 0) {
    return `${input.pendingOffers} teklif kaydı kapanmayı bekliyor.`
  }

  if (input.activeDeliveries > 0) {
    return `${input.activeDeliveries} teslimat kaydı canlı takip istiyor.`
  }

  return `${input.maintenanceProjects} bakım kaydı var. Hat sakin ama kapanmış değil.`
}

export default async function ProjectOsPage() {
  const [dataset, consultationPayload] = await Promise.all([
    getProjectOsDataset(),
    getConsultationCenterPayload(),
  ])
  const businessNames = Object.fromEntries(dataset.businesses.map((business) => [business.id, business.name]))

  const stats = {
    businesses: dataset.businesses.length,
    audits: dataset.audits.length,
    offers: dataset.offers.length,
    deliveryProjects: dataset.deliveryProjects.length,
    pendingAudits: dataset.audits.filter((audit) => audit.status === 'new' || audit.status === 'reviewed').length,
    pendingOffers: dataset.offers.filter((offer) => offer.status === 'draft' || offer.status === 'sent').length,
    activeDeliveries: dataset.deliveryProjects.filter((project) => project.status === 'kickoff' || project.status === 'building' || project.status === 'live').length,
    maintenanceProjects: dataset.deliveryProjects.filter((project) => project.status === 'maintenance').length,
  }

  const hotStage = getHotStage({
    businesses: stats.businesses,
    pendingAudits: stats.pendingAudits,
    pendingOffers: stats.pendingOffers,
    activeDeliveries: stats.activeDeliveries,
    maintenanceProjects: stats.maintenanceProjects,
  })

  const consultationStats = {
    blocked: consultationPayload.inbox.filter((item) => item.route === 'blocked').length,
    ready: consultationPayload.inbox.filter((item) => item.stage === 'ready_to_send').length,
    gptRecommended: consultationPayload.inbox.filter((item) => item.gptRecommended).length,
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
        <article className="card stack-sm">
          <div>
            <p className="eyebrow">Şimdi sıcak</p>
            <h3>Hangi aşama dikkat istiyor?</h3>
          </div>
          <p className="muted">{hotStage}</p>
          <ul className="list">
            <li>İşletme kaydı audit hattının giriş kapısıdır.</li>
            <li>Audit kapanmadan teklif tarafı sağlıklı ilerlemez.</li>
            <li>Teslimat ve bakım aynı kayıt zincirinde izlenir.</li>
          </ul>
        </article>

        <article className="card stack-sm">
          <div>
            <p className="eyebrow">Veri akışı</p>
            <h3>Hat uçtan uca açıldı</h3>
          </div>
          <ul className="list">
            <li>Önce işletme, sonra audit, sonra teklif, sonra teslimat aynı omurgaya bağlanır</li>
            <li>Tüm kayıtlar doğrudan veritabanı omurgasına yazılır ve aynı zincirde izlenir</li>
            <li>Bu fazda amaç geniş CRM değil, teslimat hattını tek yerde görünür başlatmak</li>
          </ul>
        </article>
      </section>

      <section className="stats-grid">
        <article className="card stat-card">
          <strong>{stats.pendingAudits}</strong>
          <p className="muted">audit aşamasında bekleyen iş</p>
        </article>
        <article className="card stat-card">
          <strong>{stats.pendingOffers}</strong>
          <p className="muted">teklif aşamasında açık iş</p>
        </article>
        <article className="card stat-card">
          <strong>{stats.activeDeliveries}</strong>
          <p className="muted">teslimat aşamasında aktif iş</p>
        </article>
        <article className="card stat-card">
          <strong>{stats.maintenanceProjects}</strong>
          <p className="muted">bakım aşamasında yaşayan kayıt</p>
        </article>
      </section>

      <section className="grid-2" style={{ alignItems: 'start' }}>
        <BusinessCreateForm />
        <AuditCreateForm businesses={dataset.businesses} />
      </section>

      <section className="grid-2" style={{ alignItems: 'start' }}>
        <OfferCreateForm businesses={dataset.businesses} />
        <DeliveryProjectCreateForm businesses={dataset.businesses} />
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

      <section className="grid-2" style={{ alignItems: 'start' }}>
        <article className="card stack-sm">
          <div>
            <p className="eyebrow">El sıkışma</p>
            <h3>Consultation ve Context ne zaman devreye girer?</h3>
          </div>
          <ul className="list">
            <li>{consultationStats.blocked} consultation kaydı önce içeride netleşmeyi bekliyor.</li>
            <li>{consultationStats.ready} consultation kaydı gönderime hazır görünüyor.</li>
            <li>{consultationStats.gptRecommended} kayıt için GPT Pro hattı mantıklı duruyor.</li>
          </ul>
          <p className="muted">Project OS uygulama hattıdır. Karar bulanıklaşınca Consultation, sabit referans seçimi gerektiğinde Context devreye girer.</p>
          <div className="hero-actions">
            <Link href="/consultation-center" className="ghost-link">Consultation Centera git</Link>
            <Link href="/context-center" className="ghost-link">Context Centera git</Link>
          </div>
        </article>

        <article className="card stack-sm">
          <div>
            <p className="eyebrow">Geçiş kuralı</p>
            <h3>Bu ekrandan ne zaman çıkılır?</h3>
          </div>
          <ul className="list">
            <li>Karar sorusu net değilse Consultation Centera geç.</li>
            <li>Hangi sabit dosya referans alınacak belirsizse Context Centera geç.</li>
            <li>İş artık uygulanacak kadar netse tekrar Project OS hattına dön.</li>
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
