import { NextResponse } from 'next/server'

import { appendBusinessAgentScan, generateBusinessAgentScan } from '@/lib/businesses/agent-scan'
import { getBusinessDiscoverySnapshot } from '@/lib/businesses/discovery'
import { getProjectOsDataset } from '@/lib/project-os/service'

export const runtime = 'nodejs'
export const maxDuration = 300

const segmentLabels = {
  berber: 'Berber',
  guzellik: 'Güzellik salonu',
  'kafe-restoran': 'Kafe / Restoran',
  diger: 'Diğer',
} as const

export async function POST(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params

  try {
    const dataset = await getProjectOsDataset()
    const business = dataset.businesses.find((item) => item.id === id)

    if (!business) {
      return NextResponse.json({ ok: false, message: 'İşletme kaydı bulunamadı.' }, { status: 404 })
    }

    const discoverySnapshot = await getBusinessDiscoverySnapshot({ id: business.id, name: business.name, district: business.district })
    const latestAudit = dataset.audits.find((item) => item.businessId === business.id) || null

    const rawWebsiteUrl = discoverySnapshot?.candidate.websiteUrl?.trim() || ''
    const instagramUrl = /instagram\.com/i.test(rawWebsiteUrl) ? rawWebsiteUrl : ''
    const websiteUrl = instagramUrl ? '' : rawWebsiteUrl

    const entry = await generateBusinessAgentScan({
      business: {
        id: business.id,
        name: business.name,
        district: business.district,
        ownerName: business.ownerName,
        status: business.status,
      },
      discovery: {
        address: discoverySnapshot?.candidate.address?.trim() || '',
        phone: discoverySnapshot?.candidate.phone?.trim() || '',
        websiteUrl,
        instagramUrl,
        mapsUrl: discoverySnapshot?.candidate.mapsUrl?.trim() || '',
        categoryName: discoverySnapshot?.candidate.categoryName?.trim() || segmentLabels[business.segment],
        rating: discoverySnapshot?.candidate.rating ?? null,
        reviewsCount: discoverySnapshot?.candidate.reviewsCount || 0,
        isClosed: Boolean(discoverySnapshot?.candidate.isClosed),
        searchCoverageNote: discoverySnapshot?.source.searchCoverageNote?.trim() || '',
      },
      auditSummary: latestAudit?.summary?.trim() || '',
    })

    await appendBusinessAgentScan(business.id, entry)

    return NextResponse.json({ ok: true, scan: entry })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Ajan tarama başarısız oldu.'
    return NextResponse.json({ ok: false, message }, { status: 500 })
  }
}
