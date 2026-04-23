import Link from 'next/link'
import { notFound, permanentRedirect } from 'next/navigation'

import { AdminShell } from '@/components/admin/AdminShell'
import { BusinessYzReportButton } from '@/components/businesses/BusinessYzReportButton'
import { getBusinessAgentScanHistory, getLatestBusinessAgentScan } from '@/lib/businesses/agent-scan'
import { BusinessScanPanel } from '@/components/businesses/BusinessScanPanel'
import { getBusinessDiscoverySnapshot, getBusinessRefreshHistory } from '@/lib/businesses/discovery'
import { buildBusinessDetailHref, parseBusinessSlugAndId } from '@/lib/businesses/route'
import { getProjectOsDataset } from '@/lib/project-os/service'
import { getLatestBusinessYzReport } from '@/lib/businesses/yz-report'

export const dynamic = 'force-dynamic'

const segmentLabels = {
  berber: 'Berber',
  guzellik: 'Güzellik salonu',
  'kafe-restoran': 'Kafe / Restoran',
  diger: 'Diğer',
} as const

function renderLink(url: string, emptyText = 'Görünmüyor') {
  if (!url.trim()) {
    return emptyText
  }

  return (
    <a href={url} target="_blank" rel="noreferrer" className="ghost-link" style={{ padding: 0, minHeight: 'auto' }}>
      {url}
    </a>
  )
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

  const [discoverySnapshot, latestAgentScan, agentScanHistory, apifyRefreshHistory, latestYzReport] = await Promise.all([
    getBusinessDiscoverySnapshot({ id: business.id, name: business.name, district: business.district }),
    getLatestBusinessAgentScan(business.id),
    getBusinessAgentScanHistory(business.id),
    getBusinessRefreshHistory(business.id),
    getLatestBusinessYzReport(business.id),
  ])
  const latestAudit = dataset.audits.find((item) => item.businessId === business.id) || null

  const rawWebsiteUrl = discoverySnapshot?.candidate.websiteUrl?.trim() || ''
  const rawInstagramUrl = discoverySnapshot?.candidate.instagramUrl?.trim() || ''
  const instagramUrl = rawInstagramUrl || (/instagram\.com/i.test(rawWebsiteUrl) ? rawWebsiteUrl : '')
  const websiteUrl = instagramUrl && rawWebsiteUrl === instagramUrl ? '' : rawWebsiteUrl
  const mapsUrl = discoverySnapshot?.candidate.mapsUrl?.trim() || ''
  const address = discoverySnapshot?.candidate.address?.trim() || 'Görünmüyor'
  const phone = discoverySnapshot?.candidate.phone?.trim() || 'Görünmüyor'
  const businessType = discoverySnapshot?.candidate.categoryName?.trim() || segmentLabels[business.segment]
  const note = latestAudit?.summary?.trim() || 'Henüz ek not yok.'

  return (
    <AdminShell
      title="İşletme"
      description="Tek işletme görünümü. Temel bilgiler, Y.Z raporu ve tarama paneli tek yerde durur."
    >
      <section>
        <article className="card stack-sm">
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
            <div>
              <p className="eyebrow">İşletme kartı</p>
              <h3>{business.name}</h3>
            </div>
            <div className="page-header-actions">
              <Link href={`/project-os?businessId=${business.id}#records`} className="button-secondary">İş Takibinde aç</Link>
            </div>
          </div>

          <div className="grid-2" style={{ alignItems: 'start', gap: 20 }}>
            <div style={{ display: 'grid', gap: 14 }}>
              <div className="detail-field">
                <p className="eyebrow">İşletme adı</p>
                <p>{business.name}</p>
              </div>
              <div className="detail-field">
                <p className="eyebrow">Adres</p>
                <p>{address}</p>
              </div>
              <div className="detail-field">
                <p className="eyebrow">Telefon</p>
                <p>{phone}</p>
              </div>
              <div className="detail-field">
                <p className="eyebrow">İşletme türü</p>
                <p>{businessType}</p>
              </div>
              <div className="detail-field">
                <p className="eyebrow">İşletme sahibi / muhatap</p>
                <p>{business.ownerName}</p>
              </div>
            </div>

            <div style={{ display: 'grid', gap: 14 }}>
              <div className="detail-field">
                <p className="eyebrow">Google Maps linki</p>
                <p>{renderLink(mapsUrl)}</p>
              </div>
              <div className="detail-field">
                <p className="eyebrow">Website</p>
                <p>{renderLink(websiteUrl)}</p>
              </div>
              <div className="detail-field">
                <p className="eyebrow">Instagram</p>
                <p>{instagramUrl ? renderLink(instagramUrl, 'Yok') : 'Yok'}</p>
              </div>
              <div className="detail-field">
                <p className="eyebrow">Ek not / kısa iç not</p>
                <p className="muted">{note}</p>
              </div>
            </div>
          </div>
        </article>
      </section>

      <section>
        <article className="card stack-sm">
          <div>
            <p className="eyebrow">Y.Z raporu</p>
            <h3>{latestYzReport ? latestYzReport.status : 'Henüz rapor yok'}</h3>
          </div>

          {latestYzReport ? (
            <>
              <div className="detail-field">
                <p className="eyebrow">Genel durum</p>
                <p>{latestYzReport.summary}</p>
              </div>

              {latestYzReport.strengths.length > 0 ? (
                <div className="detail-field">
                  <p className="eyebrow">Güçlü sinyaller</p>
                  <ul className="compact-list">
                    {latestYzReport.strengths.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              ) : null}

              {latestYzReport.weaknesses.length > 0 ? (
                <div className="detail-field">
                  <p className="eyebrow">Zayıf sinyaller</p>
                  <ul className="compact-list">
                    {latestYzReport.weaknesses.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              ) : null}

              <div className="detail-field">
                <p className="eyebrow">Dijital görünüm özeti</p>
                <p>{latestYzReport.visibilitySummary}</p>
              </div>

              <div className="detail-field">
                <p className="eyebrow">Öncelikli aksiyon</p>
                <p>{latestYzReport.nextAction}</p>
              </div>
            </>
          ) : (
            <p className="muted">Ajan tarama, Apify tarama ve notlardan rapor üretmek için hazır.</p>
          )}

          <div className="page-header-actions">
            <BusinessYzReportButton businessId={business.id} />
          </div>
        </article>
      </section>

      <BusinessScanPanel
        businessId={business.id}
        latestAgentScan={latestAgentScan}
        agentScanHistory={agentScanHistory}
        apifyRefreshHistory={apifyRefreshHistory}
      />
    </AdminShell>
  )
}
