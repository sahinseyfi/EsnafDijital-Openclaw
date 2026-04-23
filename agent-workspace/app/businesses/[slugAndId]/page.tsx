import Link from 'next/link'
import { notFound, permanentRedirect } from 'next/navigation'

import { AdminShell } from '@/components/admin/AdminShell'
import { BusinessDiscoveryRefreshButton } from '@/components/businesses/BusinessDiscoveryRefreshButton'
import { ProjectOsAdvanceButton } from '@/components/project-os/ProjectOsAdvanceButton'
import { getBusinessDiscoverySnapshot, getBusinessRefreshHistory } from '@/lib/businesses/discovery'
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

function formatTimelineDate(value: string) {
  return new Intl.DateTimeFormat('tr-TR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value))
}

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
  const latestAudit = audits[0] || null
  const discoverySnapshot = await getBusinessDiscoverySnapshot({ id: business.id, name: business.name, district: business.district })
  const refreshHistory = await getBusinessRefreshHistory(business.id)
  const auditSnapshotReasons = discoverySnapshot?.scoring.reasons?.slice(0, 4) || []
  const activityTimeline = [
    {
      id: `business-created-${business.id}`,
      occurredAt: business.createdAt,
      title: 'İşletme kaydı açıldı',
      text: `${business.name} işletmesi ${segmentLabels[business.segment]} segmentiyle kayda alındı.`,
    },
    ...audits.flatMap((audit) => {
      const createdItem = {
        id: `audit-created-${audit.id}`,
        occurredAt: audit.createdAt,
        title: 'Audit kaydı açıldı',
        text: `${audit.channelReadiness} hazırlık sinyali ile audit başlatıldı. ${audit.summary}`,
      }

      const updatedItem = audit.updatedAt !== audit.createdAt
        ? {
            id: `audit-updated-${audit.id}`,
            occurredAt: audit.updatedAt,
            title: 'Audit durumu güncellendi',
            text: `Audit durumu ${auditStatusLabels[audit.status]} seviyesine taşındı.`,
          }
        : null

      return updatedItem ? [createdItem, updatedItem] : [createdItem]
    }),
    ...offers.flatMap((offer) => {
      const createdItem = {
        id: `offer-created-${offer.id}`,
        occurredAt: offer.createdAt,
        title: 'Teklif kaydı açıldı',
        text: `${offer.packageName} paketi ${offer.amountTry.toLocaleString('tr-TR')} ₺ ile kaydedildi.`,
      }

      const updatedItem = offer.updatedAt !== offer.createdAt
        ? {
            id: `offer-updated-${offer.id}`,
            occurredAt: offer.updatedAt,
            title: 'Teklif durumu güncellendi',
            text: `Teklif durumu ${offerStatusLabels[offer.status]} olarak güncellendi.`,
          }
        : null

      return updatedItem ? [createdItem, updatedItem] : [createdItem]
    }),
    ...deliveryProjects.flatMap((project) => {
      const createdItem = {
        id: `delivery-created-${project.id}`,
        occurredAt: project.createdAt,
        title: 'Teslimat kaydı açıldı',
        text: `${deliveryStatusLabels[project.status]} durumunda teslimat zinciri başlatıldı.`,
      }

      const updatedItem = project.updatedAt !== project.createdAt
        ? {
            id: `delivery-updated-${project.id}`,
            occurredAt: project.updatedAt,
            title: 'Teslimat durumu güncellendi',
            text: `Teslimat durumu ${deliveryStatusLabels[project.status]} olarak güncellendi.`,
          }
        : null

      return updatedItem ? [createdItem, updatedItem] : [createdItem]
    }),
    ...refreshHistory.map((entry, index) => ({
      id: `refresh-discovery-${business.id}-${index}`,
      occurredAt: entry.candidate.capturedAt || entry.source.collectedAt,
      title: 'Dış veri snapshot yenilendi',
      text: [
        entry.source.matchedSearchTerms.length > 0
          ? `${entry.source.matchedSearchTerms.join(', ')} aramasıyla eşleşme bulundu`
          : 'Manuel yenileme çalıştı',
        entry.candidate.reviewsCount > 0
          ? `${entry.candidate.reviewsCount} yorum${typeof entry.candidate.rating === 'number' ? ` · ${entry.candidate.rating.toLocaleString('tr-TR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} puan` : ''}`
          : 'yorum sinyali görünmedi',
        entry.candidate.hasWebsite ? 'website sinyali var' : 'website sinyali yok',
      ].join(' · '),
    })),
  ].sort((left, right) => new Date(right.occurredAt).getTime() - new Date(left.occurredAt).getTime())

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

      <section>
        <article className="card stack-sm" style={{ borderColor: 'var(--brand-200)', background: 'linear-gradient(180deg, rgba(239, 246, 255, 0.96), rgba(255, 255, 255, 1))' }}>
          <div>
            <p className="eyebrow">Next step</p>
            <h3>Bu kayıtta sıradaki mantıklı hareket</h3>
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
              <div className="hero-actions">
                {queueItem.advanceAction ? <ProjectOsAdvanceButton action={queueItem.advanceAction} businessId={business.id} redirectHref={canonicalHref} /> : null}
                <Link href={`/project-os?businessId=${business.id}#records`} className="ghost-link">Tüm hattı aç</Link>
                <Link href="/consultation-center" className="ghost-link">Karar gerekiyorsa danışma aç</Link>
              </div>
            </>
          ) : (
            <div className="stack-xs">
              <p className="muted">Bu işletme için henüz türetilmiş bir sonraki adım görünmüyor.</p>
              <div className="hero-actions">
                <Link href={`/project-os?businessId=${business.id}#records`} className="ghost-link">İş Takibinde aç</Link>
              </div>
            </div>
          )}
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
            <h3>Şu anki kısa durum</h3>
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
            <p><strong>Son audit:</strong> {latestAudit ? `${auditStatusLabels[latestAudit.status]} · ${latestAudit.summary}` : 'Henüz audit yok'}</p>
            <p><strong>Son teklif:</strong> {latestOffer ? `${latestOffer.packageName} · ${offerStatusLabels[latestOffer.status]}` : 'Henüz teklif yok'}</p>
            <p><strong>Son teslimat:</strong> {latestDelivery ? deliveryStatusLabels[latestDelivery.status] : 'Henüz teslimat yok'}</p>
          </div>
        </article>
      </section>

      <section>
        <article className="card stack-sm" style={{ borderColor: 'var(--brand-200)', background: 'linear-gradient(180deg, rgba(239, 246, 255, 0.96), rgba(255, 255, 255, 1))' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <div>
              <p className="eyebrow">Audit snapshot</p>
              <h3>Dış dünya ve audit özetini tek bakışta oku</h3>
            </div>
            <BusinessDiscoveryRefreshButton businessId={business.id} />
          </div>

          <p className="muted">Bu aksiyon Apify ile seçili işletme için dış veri snapshot'ını yeniden çeker. Kanonik işletme kaydı otomatik ezilmez.</p>

          <div className="grid-2" style={{ alignItems: 'start' }}>
            <div className="stack-sm">
              <div className="stack-xs">
                <p><strong>Audit özeti:</strong> {latestAudit ? latestAudit.summary : 'Henüz yazılmış audit özeti yok.'}</p>
                <p><strong>Hazırlık sinyali:</strong> {latestAudit ? latestAudit.channelReadiness : 'Belirsiz'}</p>
                <p><strong>Audit durumu:</strong> {latestAudit ? auditStatusLabels[latestAudit.status] : 'Henüz audit açılmadı'}</p>
              </div>

              {discoverySnapshot ? (
                <div className="stack-xs">
                  <p><strong>Dış veri resmi:</strong> {discoverySnapshot.candidate.categoryName} · {discoverySnapshot.candidate.address}</p>
                  <p><strong>Yorum / puan:</strong> {discoverySnapshot.candidate.rating !== null ? `${discoverySnapshot.candidate.rating.toLocaleString('tr-TR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} puan · ${discoverySnapshot.candidate.reviewsCount} yorum` : `${discoverySnapshot.candidate.reviewsCount} yorum · puan görünmüyor`}</p>
                  <p><strong>Website:</strong> {discoverySnapshot.candidate.hasWebsite ? discoverySnapshot.candidate.websiteUrl : 'Görünmüyor'}</p>
                  <p><strong>Telefon:</strong> {discoverySnapshot.candidate.phone || 'Görünmüyor'}</p>
                  <p><strong>Sahiplik:</strong> {discoverySnapshot.candidate.ownershipStatus === 'claimed' ? 'Sahiplenilmiş' : discoverySnapshot.candidate.ownershipStatus === 'unclaimed' ? 'Sahiplenilmemiş' : 'Bilinmiyor'}</p>
                  <p><strong>Snapshot zamanı:</strong> {formatTimelineDate(discoverySnapshot.candidate.capturedAt || discoverySnapshot.source.collectedAt)}</p>
                </div>
              ) : (
                <p className="muted">Bu işletme için bağlanmış discovery snapshot bulunamadı.</p>
              )}
            </div>

            <div className="stack-sm">
              <div>
                <p className="eyebrow">İlk eksik listesi</p>
                <ul className="muted" style={{ margin: '8px 0 0', paddingLeft: 18 }}>
                  {auditSnapshotReasons.length > 0 ? auditSnapshotReasons.map((reason) => (
                    <li key={reason}>{reason}</li>
                  )) : (
                    <li>Eksik listesi discovery snapshot geldikçe burada büyüyecek.</li>
                  )}
                </ul>
              </div>

              {discoverySnapshot ? (
                <div className="stack-xs">
                  <p><strong>Google görünürlük notu:</strong> {discoverySnapshot.source.searchCoverageNote}</p>
                  <p><strong>İlk paket yönü:</strong> {discoverySnapshot.candidate.hasWebsite ? 'Vitrin + güven iyileştirme' : 'Website + güven veren vitrin başlangıcı'}</p>
                </div>
              ) : (
                <p className="muted">Dış veri eşleşmesi olmadığında paket yönü sadece operator auditine göre belirlenecek.</p>
              )}
            </div>
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

      <section>
        <article className="card stack-sm">
          <div>
            <p className="eyebrow">Activity timeline</p>
            <h3>Bu kayıttaki son hareketler</h3>
          </div>
          {activityTimeline.length > 0 ? (
            <div className="stack-sm">
              {activityTimeline.map((item) => (
                <div key={item.id} style={{ paddingBottom: 12, borderBottom: '1px solid var(--line)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                    <strong style={{ color: 'var(--ink-title)' }}>{item.title}</strong>
                    <span className="muted">{formatTimelineDate(item.occurredAt)}</span>
                  </div>
                  <p className="muted">{item.text}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="muted">Bu işletme için henüz zaman akışında gösterilecek hareket yok.</p>
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
