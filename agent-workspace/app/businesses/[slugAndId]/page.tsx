import Link from 'next/link'
import { notFound, permanentRedirect } from 'next/navigation'

import { AdminShell } from '@/components/admin/AdminShell'
import { buildBusinessDetailHref, parseBusinessSlugAndId } from '@/lib/businesses/route'
import { deriveProjectOsOverview } from '@/lib/project-os/derived'
import { getOfferAddons, getOfferPackageByName } from '@/lib/project-os/offer-packages'
import { getProjectOsDataset } from '@/lib/project-os/service'

export const dynamic = 'force-dynamic'

const segmentLabels = {
  berber: 'Berber',
  guzellik: 'Güzellik salonu',
  'kafe-restoran': 'Kafe / Restoran',
  diger: 'Diğer',
} as const

const businessStatusLabels = {
  lead: 'Aday',
  active: 'Aktif',
  paused: 'Beklemede',
} as const

const auditStatusLabels = {
  new: 'Yeni',
  reviewed: 'İncelendi',
  offered: 'Teklife taşındı',
} as const

const offerStatusLabels = {
  draft: 'Taslak',
  sent: 'Gönderildi',
  approved: 'Onaylandı',
} as const

const deliveryStatusLabels = {
  kickoff: 'Başlangıç',
  building: 'Yapım',
  live: 'Yayında',
  maintenance: 'Bakım',
} as const

export default async function BusinessDetailPage({
  params,
}: {
  params: Promise<{ slugAndId: string }>
}) {
  const { slugAndId } = await params
  const { id } = parseBusinessSlugAndId(decodeURIComponent(slugAndId))

  if (!id) {
    notFound()
  }

  const dataset = await getProjectOsDataset()
  const business = dataset.businesses.find((item) => item.id === id)

  if (!business) {
    notFound()
  }

  const canonicalHref = buildBusinessDetailHref(business)

  if (canonicalHref !== `/businesses/${decodeURIComponent(slugAndId)}`) {
    permanentRedirect(canonicalHref)
  }

  const audits = dataset.audits.filter((item) => item.businessId === business.id)
  const offers = dataset.offers.filter((item) => item.businessId === business.id)
  const deliveryProjects = dataset.deliveryProjects.filter((item) => item.businessId === business.id)
  const overview = deriveProjectOsOverview(dataset)
  const queueItem = overview.queue.find((item) => item.businessId === business.id) || null
  const latestOffer = offers[0] || null
  const latestDelivery = deliveryProjects[0] || null

  return (
    <AdminShell
      title="İşletme profili"
      description="Seçili işletmenin kanonik profil yüzeyi. Kim olduğu, hangi aşamada olduğu ve sıradaki iş tek yerde görünür."
    >
      <section className="card stack-sm">
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
          <div>
            <p className="eyebrow">İşletme detay</p>
            <h3>{business.name}</h3>
            <p className="muted">{segmentLabels[business.segment]} · {business.district} · İşletme sahibi: {business.ownerName}</p>
          </div>
          <div className="page-header-actions">
            <Link href={`/project-os?businessId=${business.id}#records`} className="button-secondary">İş Takibinde aç</Link>
            <Link href="/consultation-center" className="ghost-link">Danışma</Link>
            <Link href="/context-center" className="ghost-link">Bağlam</Link>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          <span className="badge">Durum: {businessStatusLabels[business.status]}</span>
          {queueItem ? <span className="badge">Aşama: {queueItem.stageLabel}</span> : null}
          {audits[0] ? <span className="badge">Audit: {auditStatusLabels[audits[0].status]}</span> : <span className="badge">Audit açılmadı</span>}
          {latestOffer ? <span className="badge">Teklif: {offerStatusLabels[latestOffer.status]}</span> : <span className="badge">Teklif yok</span>}
          {latestDelivery ? <span className="badge">Teslimat: {deliveryStatusLabels[latestDelivery.status]}</span> : <span className="badge">Teslimat yok</span>}
        </div>
      </section>

      <section className="stats-grid">
        <article className="card stat-card">
          <strong>{audits.length}</strong>
          <p className="muted">audit kaydı</p>
        </article>
        <article className="card stat-card">
          <strong>{offers.length}</strong>
          <p className="muted">teklif kaydı</p>
        </article>
        <article className="card stat-card">
          <strong>{deliveryProjects.length}</strong>
          <p className="muted">teslimat / bakım kaydı</p>
        </article>
      </section>

      <section className="grid-2" style={{ alignItems: 'start' }}>
        <article className="card stack-sm">
          <div>
            <p className="eyebrow">Temel profil</p>
            <h3>Kanonik işletme bilgisi</h3>
          </div>
          <dl className="stack-sm">
            <div>
              <dt className="eyebrow">İşletme adı</dt>
              <dd>{business.name}</dd>
            </div>
            <div>
              <dt className="eyebrow">Tür / segment</dt>
              <dd>{segmentLabels[business.segment]}</dd>
            </div>
            <div>
              <dt className="eyebrow">İlçe</dt>
              <dd>{business.district}</dd>
            </div>
            <div>
              <dt className="eyebrow">İşletme sahibi</dt>
              <dd>{business.ownerName}</dd>
            </div>
            <div>
              <dt className="eyebrow">Kayıt durumu</dt>
              <dd>{businessStatusLabels[business.status]}</dd>
            </div>
            <div>
              <dt className="eyebrow">Kanonik route</dt>
              <dd><code>{canonicalHref}</code></dd>
            </div>
          </dl>
        </article>

        <article className="card stack-sm">
          <div>
            <p className="eyebrow">Operasyon özeti</p>
            <h3>Şimdi ne hareket etmeli?</h3>
          </div>
          {queueItem ? (
            <>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                <span className="badge">{queueItem.stageLabel}</span>
                <span className="badge">{queueItem.statusLabel}</span>
              </div>
              <div className="stack-xs">
                <p><strong>Sıradaki adım:</strong> {queueItem.nextAction}</p>
                <p className="muted">{queueItem.summary}</p>
              </div>
            </>
          ) : (
            <p className="muted">Bu işletme henüz ana operasyon kuyruğunda görünmüyor.</p>
          )}

          <div className="stack-xs">
            <p><strong>Son audit:</strong> {audits[0] ? `${auditStatusLabels[audits[0].status]} · ${audits[0].summary}` : 'Henüz audit yok'}</p>
            <p><strong>Son teklif:</strong> {latestOffer ? `${latestOffer.packageName} · ${offerStatusLabels[latestOffer.status]}` : 'Henüz teklif yok'}</p>
            <p><strong>Son teslimat:</strong> {latestDelivery ? deliveryStatusLabels[latestDelivery.status] : 'Henüz teslimat yok'}</p>
          </div>
        </article>
      </section>

      <section className="grid-2" style={{ alignItems: 'start' }}>
        <article className="card stack-sm">
          <div>
            <p className="eyebrow">Son teklif kartı</p>
            <h3>Teklif ve kapsam sinyali</h3>
          </div>
          {latestOffer ? (() => {
            const packageInfo = getOfferPackageByName(latestOffer.packageName)
            const addonLabels = getOfferAddons(latestOffer.addonKeys).map((item) => item.label)

            return (
              <div className="stack-sm">
                <p><strong>{latestOffer.packageName}</strong> · {latestOffer.amountTry.toLocaleString('tr-TR')} ₺</p>
                {packageInfo ? <p className="muted">{packageInfo.description}</p> : null}
                <p className="muted">{latestOffer.domainPreference === 'custom-domain' ? `Özel alan adı${latestOffer.customDomain ? `: ${latestOffer.customDomain}` : ''}` : 'Alt alan adı ile kurulacak'}</p>
                {addonLabels.length > 0 ? <p className="muted">Ekler: {addonLabels.join(', ')}</p> : null}
              </div>
            )
          })() : (
            <p className="muted">Bu bölüm son teklif kaydı açıldığında dolacak.</p>
          )}
        </article>

        <article className="card stack-sm">
          <div>
            <p className="eyebrow">Son teslimat kartı</p>
            <h3>Yapım ve bakım görünümü</h3>
          </div>
          {latestDelivery ? (
            <div className="stack-sm">
              <span className="badge">{deliveryStatusLabels[latestDelivery.status]}</span>
              <p className="muted" style={{ whiteSpace: 'pre-wrap' }}>{latestDelivery.scope}</p>
            </div>
          ) : (
            <p className="muted">Bu bölüm teslimat veya bakım kaydı açıldığında dolacak.</p>
          )}
        </article>
      </section>

      <section className="stack-sm">
        <div>
          <p className="eyebrow">Alt kayıtlar</p>
          <h3>Bu işletmeye bağlı operasyon geçmişi</h3>
        </div>

        <div className="grid-2">
          <article className="card">
            <h3>Audit kayıtları</h3>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Durum</th>
                    <th>Hazırlık</th>
                    <th>Özet</th>
                  </tr>
                </thead>
                <tbody>
                  {audits.length > 0 ? audits.map((audit) => (
                    <tr key={audit.id}>
                      <td>{auditStatusLabels[audit.status]}</td>
                      <td>{audit.channelReadiness}</td>
                      <td>{audit.summary}</td>
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

          <article className="card">
            <h3>Teklif kayıtları</h3>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Paket</th>
                    <th>Tutar</th>
                    <th>Durum</th>
                  </tr>
                </thead>
                <tbody>
                  {offers.length > 0 ? offers.map((offer) => (
                    <tr key={offer.id}>
                      <td>{offer.packageName}</td>
                      <td>{offer.amountTry.toLocaleString('tr-TR')} ₺</td>
                      <td>{offerStatusLabels[offer.status]}</td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={3} className="muted">Henüz teklif kaydı yok.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </article>
        </div>

        <article className="card">
          <h3>Teslimat ve bakım kayıtları</h3>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Durum</th>
                  <th>Kapsam</th>
                </tr>
              </thead>
              <tbody>
                {deliveryProjects.length > 0 ? deliveryProjects.map((project) => (
                  <tr key={project.id}>
                    <td>{deliveryStatusLabels[project.status]}</td>
                    <td>{project.scope}</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={2} className="muted">Henüz teslimat veya bakım kaydı yok.</td>
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
