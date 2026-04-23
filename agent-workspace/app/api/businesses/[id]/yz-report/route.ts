import { NextResponse } from 'next/server'

import { getLatestBusinessAgentScan } from '@/lib/businesses/agent-scan'
import { getBusinessDiscoverySnapshot, getBusinessRefreshHistory } from '@/lib/businesses/discovery'
import { getProjectOsDataset } from '@/lib/project-os/service'
import { appendBusinessYzReport, generateBusinessYzReport } from '@/lib/businesses/yz-report'

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

    const [discoverySnapshot, latestAgentScan, apifyRefreshHistory] = await Promise.all([
      getBusinessDiscoverySnapshot({ id: business.id, name: business.name, district: business.district }),
      getLatestBusinessAgentScan(business.id),
      getBusinessRefreshHistory(business.id),
    ])
    const latestAudit = dataset.audits.find((item) => item.businessId === business.id) || null
    const latestApifyScan = [...apifyRefreshHistory].reverse().find((item) => item.source.refreshMode === 'apify') || apifyRefreshHistory[apifyRefreshHistory.length - 1] || null

    const rawWebsiteUrl = discoverySnapshot?.candidate.websiteUrl?.trim() || ''
    const rawInstagramUrl = discoverySnapshot?.candidate.instagramUrl?.trim() || ''
    const instagramUrl = rawInstagramUrl || (/instagram\.com/i.test(rawWebsiteUrl) ? rawWebsiteUrl : '')
    const websiteUrl = instagramUrl && rawWebsiteUrl === instagramUrl ? '' : rawWebsiteUrl

    const entry = await generateBusinessYzReport({
      business: {
        id: business.id,
        name: business.name,
        district: business.district,
        ownerName: business.ownerName,
        status: business.status,
        segment: segmentLabels[business.segment],
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
      latestAgentScan,
      latestApifyScan,
      auditSummary: latestAudit?.summary?.trim() || '',
    })

    await appendBusinessYzReport(business.id, entry)

    return NextResponse.json({ ok: true, report: entry })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Y.Z raporu oluşturulamadı.'
    return NextResponse.json({ ok: false, message }, { status: 500 })
  }
}
