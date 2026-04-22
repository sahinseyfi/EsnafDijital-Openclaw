import Link from 'next/link'

export const dynamic = 'force-dynamic'
import { AdminShell } from '@/components/admin/AdminShell'
import { AuditCreateForm } from '@/components/project-os/AuditCreateForm'
import { BusinessCreateForm } from '@/components/project-os/BusinessCreateForm'
import { DeliveryProjectCreateForm } from '@/components/project-os/DeliveryProjectCreateForm'
import { OfferCreateForm } from '@/components/project-os/OfferCreateForm'
import { getConsultationCenterPayload } from '@/lib/consultation-center/service'
import { deriveProjectOsOverview, type ProjectOsQueueItem, type ProjectOsStage } from '@/lib/project-os/derived'
import { getProjectOsDataset } from '@/lib/project-os/service'

const segmentLabels = {
  berber: 'Berber',
  guzellik: 'Güzellik',
  'kafe-restoran': 'Kafe / Restoran',
  diger: 'Diğer',
} as const

const stageTitles: Record<ProjectOsStage, string> = {
  intake: 'İntake, audit açılmamış işletmeler',
  audit: 'Audit kuyruğu',
  offer: 'Teklif kuyruğu',
  delivery: 'Teslimat kuyruğu',
  maintenance: 'Bakımda yaşayan kayıtlar',
}

function QueueList({ items, emptyText }: { items: ProjectOsQueueItem[]; emptyText: string }) {
  if (items.length === 0) {
    return <p className="muted">{emptyText}</p>
  }

  return (
    <div className="stack-sm">
      {items.map((item) => (
        <article key={item.businessId} className="card stack-sm" style={{ padding: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div className="stack-xs">
              <strong style={{ color: 'var(--ink-title)' }}>{item.businessName}</strong>
              <span className="muted">{segmentLabels[item.segment]} • {item.district}</span>
            </div>
            <span className="badge">{item.stageLabel}</span>
          </div>

          <div className="stack-xs">
            <span><strong>Durum:</strong> {item.statusLabel}</span>
            <span><strong>Sıradaki adım:</strong> {item.nextAction}</span>
            <span className="muted">{item.summary}</span>
          </div>

          <div className="hero-actions">
            <Link href={`/project-os?businessId=${item.businessId}#records`} className="ghost-link">Kaydı aç</Link>
            <Link href="/consultation-center" className="ghost-link">Consultation</Link>
            <Link href="/context-center" className="ghost-link">Context</Link>
          </div>
        </article>
      ))}
    </div>
  )
}

export default async function ProjectOsPage({
  searchParams,
}: {
  searchParams?: Promise<{ businessId?: string }>
}) {
  const params = await searchParams
  const selectedBusinessId = params?.businessId?.trim() || ''

  const [dataset, consultationPayload] = await Promise.all([
    getProjectOsDataset(),
    getConsultationCenterPayload(),
  ])

  const businessNames = Object.fromEntries(dataset.businesses.map((business) => [business.id, business.name]))
  const selectedBusiness = dataset.businesses.find((business) => business.id === selectedBusinessId) || null
  const overview = deriveProjectOsOverview(dataset)
  const consultationStats = {
    blocked: consultationPayload.inbox.filter((item) => item.route === 'blocked').length,
    ready: consultationPayload.inbox.filter((item) => item.stage === 'ready_to_send').length,
    gptRecommended: consultationPayload.inbox.filter((item) => item.gptRecommended).length,
  }

  return (
    <AdminShell
      title="Project OS"
      description="Create form duvarı değil, bugün hangi işi ilerleteceğini söyleyen sade operasyon merkezi."
    >
      <section className="hero">
        <div>
          <p className="eyebrow">Operasyon merkezi</p>
          <h1>Bugün hangi işi ilerleteceğin net olsun</h1>
          <p className="muted">Bu ekran genel CRM değil. Sadece aktif audit → teklif → teslimat → bakım zincirinde hangi işin sıcak olduğunu ve bir sonraki aksiyonu görünür kılar.</p>
        </div>
      </section>

      <section className="grid-2" style={{ alignItems: 'start' }}>
        <article className="card stack-sm">
          <div>
            <p className="eyebrow">Şimdi sıcak</p>
            <h3>{overview.hotStage.title}</h3>
          </div>
          <p className="muted">{overview.hotStage.text}</p>
          <div className="hero-actions">
            <Link href="#queue" className="cta-link">Sıradaki işleri gör</Link>
            <Link href="#quick-actions" className="ghost-link">Hızlı aksiyonlara git</Link>
          </div>
        </article>

        <article className="card stack-sm">
          <div>
            <p className="eyebrow">Blokaj ve karar netliği</p>
            <h3>Yan ekran geçişi</h3>
          </div>
          <ul className="list">
            <li>{consultationStats.blocked} consultation kaydı karar netliği bekliyor.</li>
            <li>{consultationStats.ready} kayıt gönderime hazır görünüyor.</li>
            <li>{consultationStats.gptRecommended} kayıt için GPT Pro hattı mantıklı duruyor.</li>
          </ul>
          <p className="muted">Karar bulanıksa Consultation, sabit referans seçimi bulanıksa Context. Netleşen iş yine bu hatta döner.</p>
          <div className="hero-actions">
            <Link href="/consultation-center" className="ghost-link">Consultation Centera git</Link>
            <Link href="/context-center" className="ghost-link">Context Centera git</Link>
          </div>
        </article>
      </section>

      <section className="stats-grid">
        <article className="card stat-card">
          <strong>{overview.byStage.intake.length}</strong>
          <p className="muted">audit açılmamış işletme</p>
        </article>
        <article className="card stat-card">
          <strong>{overview.byStage.audit.length}</strong>
          <p className="muted">audit aşamasında aktif iş</p>
        </article>
        <article className="card stat-card">
          <strong>{overview.byStage.offer.length}</strong>
          <p className="muted">teklif aşamasında aktif iş</p>
        </article>
        <article className="card stat-card">
          <strong>{overview.byStage.delivery.length}</strong>
          <p className="muted">teslimatta yaşayan iş</p>
        </article>
        <article className="card stat-card">
          <strong>{overview.byStage.maintenance.length}</strong>
          <p className="muted">bakımda yaşayan kayıt</p>
        </article>
        <article className="card stat-card">
          <strong>{consultationStats.blocked}</strong>
          <p className="muted">blocked karar sinyali</p>
        </article>
      </section>

      <section id="queue" className="grid-2" style={{ alignItems: 'start' }}>
        <article className="card stack-sm">
          <div>
            <p className="eyebrow">Sıradaki işler kuyruğu</p>
            <h3>Önce aksiyon isteyen kayıtlar</h3>
          </div>
          <QueueList items={overview.queue.slice(0, 6)} emptyText="Henüz aktif operasyon kuyruğu yok." />
        </article>

        <article className="card stack-sm" id="quick-actions">
          <div>
            <p className="eyebrow">Hızlı aksiyonlar</p>
            <h3>Yeni kayıt açma alanını daralt</h3>
          </div>
          <ul className="list">
            <li>Yeni işletme aç</li>
            <li>Audit başlat</li>
            <li>Teklif aç</li>
            <li>Teslimat başlat</li>
            <li>Karar için Consultation aç</li>
            <li>Referans için Context aç</li>
          </ul>
          <details className="accordion-card" open={dataset.businesses.length === 0}>
            <summary>
              <div>
                <span className="eyebrow">Dar form alanı</span>
                <strong>Kayıt açma formlarını göster</strong>
                <span className="muted">Formlar ana gövdede sürekli açık durmuyor. Gerektiğinde buradan açılıyor.</span>
              </div>
            </summary>
            <div className="accordion-body stack-sm">
              <div className="grid-2" style={{ alignItems: 'start' }}>
                <BusinessCreateForm />
                <AuditCreateForm businesses={dataset.businesses} />
              </div>
              <div className="grid-2" style={{ alignItems: 'start' }}>
                <OfferCreateForm businesses={dataset.businesses} />
                <DeliveryProjectCreateForm businesses={dataset.businesses} />
              </div>
            </div>
          </details>
        </article>
      </section>

      <section className="grid-2" style={{ alignItems: 'start' }}>
        {(Object.entries(overview.byStage) as Array<[ProjectOsStage, ProjectOsQueueItem[]]>).map(([stage, items]) => (
          <article key={stage} className="card stack-sm">
            <div>
              <p className="eyebrow">{stageTitles[stage]}</p>
              <h3>{items.length} kayıt</h3>
            </div>
            <QueueList
              items={items.slice(0, 4)}
              emptyText={stage === 'maintenance' ? 'Bakımda yaşayan kayıt görünmüyor.' : 'Bu aşamada aksiyon bekleyen kayıt yok.'}
            />
          </article>
        ))}
      </section>

      {selectedBusiness ? (
        <section>
          <article className="card stack-sm" style={{ borderColor: 'var(--brand-200)', background: 'linear-gradient(180deg, rgba(239, 246, 255, 0.95), rgba(255, 255, 255, 1))' }}>
            <div>
              <p className="eyebrow">Seçili kayıt</p>
              <h3>{selectedBusiness.name}</h3>
            </div>
            <p className="muted">Seçilen işletme alt kayıtlarda işaretlendi. Buradan audit, teklif ve teslimat zincirini kontrol edebilirsin.</p>
          </article>
        </section>
      ) : null}

      <section id="records">
        <details className="accordion-card">
          <summary>
            <div>
              <span className="eyebrow">Alt kayıt görünümü</span>
              <strong>Ham tablo kayıtlarını aç</strong>
              <span className="muted">Tam liste aşağıda duruyor ama ana ekranın odağını dağıtmaması için kapalı başlıyor.</span>
            </div>
          </summary>
          <div className="accordion-body stack-sm">
            <div className="grid-2">
              <article className="card" id="businesses">
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
                      {dataset.businesses.length > 0 ? dataset.businesses.map((business) => {
                        const isSelected = business.id === selectedBusinessId

                        return (
                          <tr key={business.id} style={isSelected ? { background: 'rgba(219, 234, 254, 0.45)' } : undefined}>
                            <td>
                              <div className="stack-xs">
                                <strong style={{ color: 'var(--ink-title)' }}>{business.name}</strong>
                                {isSelected ? <span className="badge">Seçili kayıt</span> : null}
                              </div>
                            </td>
                            <td>{segmentLabels[business.segment]}</td>
                            <td>{business.district}</td>
                            <td>{business.status}</td>
                          </tr>
                        )
                      }) : (
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
            </div>

            <div className="grid-2">
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
            </div>
          </div>
        </details>
      </section>
    </AdminShell>
  )
}
