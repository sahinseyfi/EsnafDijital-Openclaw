import Link from 'next/link'
import { notFound, permanentRedirect } from 'next/navigation'

import { AdminShell } from '@/components/admin/AdminShell'
import { BusinessScanPanel } from '@/components/businesses/BusinessScanPanel'
import { getBusinessDiscoverySnapshot } from '@/lib/businesses/discovery'
import { buildBusinessDetailHref, parseBusinessSlugAndId } from '@/lib/businesses/route'
import { getProjectOsDataset } from '@/lib/project-os/service'

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

  const discoverySnapshot = await getBusinessDiscoverySnapshot({ id: business.id, name: business.name, district: business.district })
  const latestAudit = dataset.audits.find((item) => item.businessId === business.id) || null

  const rawWebsiteUrl = discoverySnapshot?.candidate.websiteUrl?.trim() || ''
  const instagramUrl = /instagram\.com/i.test(rawWebsiteUrl) ? rawWebsiteUrl : ''
  const websiteUrl = instagramUrl ? '' : rawWebsiteUrl
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

          <div className="grid-2" style={{ alignItems: 'start' }}>
            <div className="stack-sm">
              <div>
                <p className="eyebrow">İşletme adı</p>
                <p>{business.name}</p>
              </div>
              <div>
                <p className="eyebrow">Adres</p>
                <p>{address}</p>
              </div>
              <div>
                <p className="eyebrow">Telefon</p>
                <p>{phone}</p>
              </div>
              <div>
                <p className="eyebrow">İşletme türü</p>
                <p>{businessType}</p>
              </div>
              <div>
                <p className="eyebrow">İşletme sahibi / muhatap</p>
                <p>{business.ownerName}</p>
              </div>
            </div>

            <div className="stack-sm">
              <div>
                <p className="eyebrow">Google Maps linki</p>
                <p>{renderLink(mapsUrl)}</p>
              </div>
              <div>
                <p className="eyebrow">Website</p>
                <p>{renderLink(websiteUrl)}</p>
              </div>
              <div>
                <p className="eyebrow">Instagram</p>
                <p>{instagramUrl ? renderLink(instagramUrl, 'Yok') : 'Yok'}</p>
              </div>
              <div>
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
            <h3>Henüz rapor yok</h3>
          </div>
          <p className="muted">Bu alan ilk durumda boş durur. Rapor oluştur akışı ve skill detayları sonra bağlanacak.</p>
          <div className="page-header-actions">
            <button type="button" className="button-secondary" disabled>Rapor oluştur</button>
          </div>
        </article>
      </section>

      <BusinessScanPanel businessId={business.id} />
    </AdminShell>
  )
}
