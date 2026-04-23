import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

export type DiscoverySummaryEntry = {
  source: {
    collectedAt: string
    matchedSearchTerms: string[]
    missingSearchTerms: string[]
    searchCoverageNote: string
    rawRecordCount?: number
    refreshMode?: string
    selectedSources?: string[]
    googleMapsOptions?: {
      details?: boolean
      reviews?: boolean
    }
    instagramSignal?: {
      searched?: boolean
      query?: string
      candidateCount?: number
      matchedUsername?: string
      matchedProfileUrl?: string
      matchReason?: string
      followersCount?: number | null
      isVerified?: boolean
      isBusinessAccount?: boolean
      businessCategory?: string
    }
  }
  candidate: {
    name: string
    categoryName: string
    address: string
    district: string
    city: string
    phone: string
    websiteUrl: string
    instagramUrl?: string
    hasWebsite: boolean
    rating: number | null
    reviewsCount: number
    hasOpeningHours: boolean
    ownershipStatus: 'claimed' | 'unclaimed' | 'unknown'
    capturedAt?: string
    placeId?: string
    mapsUrl?: string
    categories?: string[]
    isClosed?: boolean
    latitude?: number | null
    longitude?: number | null
  }
  scoring: {
    bucket: string
    reasons: string[]
    score?: number
    searchCoverageSignal?: string
  }
}

type DiscoveryRawRow = Record<string, unknown>

type BusinessLookup = {
  id: string
  name: string
  district: string
}

type RefreshEntryOptions = {
  business: BusinessLookup
  rows: DiscoveryRawRow[]
  searchTerms: string[]
  locationQuery: string
  refreshMode?: string
  selectedSources?: string[]
  googleMapsOptions?: {
    details?: boolean
    reviews?: boolean
  }
  instagramSignal?: {
    searched?: boolean
    query?: string
    candidateCount?: number
    matchedUsername?: string
    matchedProfileUrl?: string
    matchReason?: string
    followersCount?: number | null
    isVerified?: boolean
    isBusinessAccount?: boolean
    businessCategory?: string
  }
}

const DISCOVERY_DIR = path.resolve(process.cwd(), '..', 'state', 'apify-discovery')
const DISCOVERY_SUMMARY_PATH = path.join(DISCOVERY_DIR, 'summary', 'candidates-summary.json')
const DISCOVERY_SNAPSHOTS_DIR = path.join(DISCOVERY_DIR, 'snapshots')
const BUSINESS_REFRESH_DIR = path.join(DISCOVERY_DIR, 'business-refreshes')
const DISCOVERY_LOCATION_TOKENS = new Set(['arnavutkoy', 'istanbul', 'turkiye'])
const DISCOVERY_CATEGORY_TOKEN_GROUPS = [
  ['berber', 'barber'],
  ['kuafor', 'kuaforu', 'hair'],
  ['guzellik', 'salon', 'salonu'],
  ['kafe', 'cafe'],
  ['restoran', 'restaurant'],
]

export function normalizeDiscoveryText(value: string) {
  return value
    .toLocaleLowerCase('tr-TR')
    .replace(/ç/g, 'c')
    .replace(/ğ/g, 'g')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ş/g, 's')
    .replace(/ü/g, 'u')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

function discoveryTokens(value: string) {
  return normalizeDiscoveryText(value)
    .split(' ')
    .filter(Boolean)
}

function getDiscoveryNameSignals(candidateName: string, businessName: string) {
  const candidateNormalized = normalizeDiscoveryText(candidateName)
  const businessNormalized = normalizeDiscoveryText(businessName)
  const candidateTokens = discoveryTokens(candidateName)
  const businessTokens = discoveryTokens(businessName)
    .filter((token) => !DISCOVERY_LOCATION_TOKENS.has(token))
  const candidateTokenSet = new Set(candidateTokens)
  const sharedTokens = businessTokens.filter((token) => candidateTokenSet.has(token))
  const sharedTokenCount = Array.from(new Set(sharedTokens)).length
  const requiredCategoryGroups = DISCOVERY_CATEGORY_TOKEN_GROUPS.filter((group) => businessTokens.some((token) => group.includes(token)))
  const categoryAligned = requiredCategoryGroups.length === 0
    || requiredCategoryGroups.some((group) => candidateTokens.some((token) => group.includes(token)))

  return {
    exactMatch: candidateNormalized === businessNormalized,
    partialMatch: candidateNormalized.includes(businessNormalized) || businessNormalized.includes(candidateNormalized),
    sharedTokenCount,
    businessTokenCount: businessTokens.length,
    categoryAligned,
  }
}

function businessKey(row: DiscoveryRawRow) {
  const placeId = String(row.placeId || '').trim()
  if (placeId) return placeId

  const mapsUrl = String(row.url || '').trim()
  if (mapsUrl) return mapsUrl

  return `${normalizeDiscoveryText(String(row.title || ''))}::${normalizeDiscoveryText(String(row.address || ''))}`
}

function extractWebsite(row: DiscoveryRawRow) {
  for (const key of ['website', 'websiteUrl']) {
    const value = row[key]
    if (typeof value === 'string' && value.trim()) {
      return { websiteUrl: value.trim(), hasWebsite: true }
    }
  }

  const webResults = row.webResults
  if (Array.isArray(webResults) && webResults.length > 0) {
    const first = webResults[0]
    if (typeof first === 'string' && first.trim()) {
      return { websiteUrl: first.trim(), hasWebsite: true }
    }

    if (first && typeof first === 'object') {
      for (const key of ['url', 'link']) {
        const value = (first as Record<string, unknown>)[key]
        if (typeof value === 'string' && value.trim()) {
          return { websiteUrl: value.trim(), hasWebsite: true }
        }
      }
    }
  }

  return { websiteUrl: '', hasWebsite: false }
}

function extractInstagramUrlFromValue(value: unknown) {
  if (typeof value !== 'string') return ''
  const trimmed = value.trim()
  if (!trimmed) return ''
  return /instagram\.com/i.test(trimmed) ? trimmed : ''
}

function extractInstagramUrl(row: DiscoveryRawRow) {
  for (const key of ['instagramUrl', 'instagram', 'profileUrl']) {
    const direct = extractInstagramUrlFromValue(row[key])
    if (direct) return direct
  }

  const website = extractInstagramUrlFromValue(row.website) || extractInstagramUrlFromValue(row.websiteUrl)
  if (website) return website

  const webResults = row.webResults
  if (Array.isArray(webResults)) {
    for (const item of webResults) {
      const direct = extractInstagramUrlFromValue(item)
      if (direct) return direct

      if (item && typeof item === 'object') {
        const url = extractInstagramUrlFromValue((item as Record<string, unknown>).url)
          || extractInstagramUrlFromValue((item as Record<string, unknown>).link)
        if (url) return url
      }
    }
  }

  return ''
}

function getOwnershipStatus(row: DiscoveryRawRow): 'claimed' | 'unclaimed' | 'unknown' {
  if (row.claimThisBusiness === true) return 'unclaimed'
  if (row.claimThisBusiness === false) return 'claimed'
  return 'unknown'
}

function detectDistrict(row: DiscoveryRawRow, locationQuery: string) {
  const address = [row.address, row.city, row.state].map((item) => String(item || '')).join(' ')
  const addressNorm = normalizeDiscoveryText(address)
  if (addressNorm.includes('arnavutkoy')) return 'Arnavutkoy'
  if (normalizeDiscoveryText(locationQuery).includes('arnavutkoy')) return 'Arnavutkoy'
  return String(row.city || '')
}

function categoryList(row: DiscoveryRawRow) {
  if (Array.isArray(row.categories)) {
    return row.categories.map((item) => String(item)).filter(Boolean)
  }

  if (typeof row.categoryName === 'string' && row.categoryName.trim()) {
    return [row.categoryName.trim()]
  }

  return []
}

function toNumber(value: unknown) {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

function toIsoNow() {
  return new Date().toISOString()
}

function scoreCandidateMatch(row: DiscoveryRawRow, business: BusinessLookup) {
  const nameSignals = getDiscoveryNameSignals(String(row.title || ''), business.name)
  const districtNeedle = normalizeDiscoveryText(business.district)
  const address = normalizeDiscoveryText([row.address, row.city, row.state].map((item) => String(item || '')).join(' '))

  let score = 0
  if (nameSignals.exactMatch) score += 8
  else if (nameSignals.partialMatch) score += 5
  else if (nameSignals.categoryAligned && nameSignals.sharedTokenCount >= 2) score += 4
  else if (nameSignals.categoryAligned && nameSignals.sharedTokenCount === 1 && nameSignals.businessTokenCount === 1) score += 3
  else if (!nameSignals.categoryAligned || nameSignals.sharedTokenCount === 0) score -= 4

  if (districtNeedle && address.includes(districtNeedle)) score += 2
  if (String(row.searchString || '').trim() === business.name.trim()) score += 1
  if (String(row.phone || '').trim()) score += 1
  if (extractWebsite(row).hasWebsite) score += 1

  return score
}

function scoreEntry(entry: DiscoverySummaryEntry) {
  const reasons: string[] = []
  let score = 0

  if (!entry.candidate.phone) {
    score += 1
    reasons.push('telefon eksik')
  }

  if (!entry.candidate.hasWebsite) {
    score += 1
    reasons.push('website yok')
  }

  if (!entry.candidate.hasOpeningHours) {
    score += 1
    reasons.push('saat bilgisi eksik')
  }

  if ((entry.candidate.reviewsCount || 0) === 0) {
    score += 1
    reasons.push('yorum yok')
  }

  if (entry.candidate.isClosed) {
    score -= 3
    reasons.push('kapali gorunuyor')
  }

  if ((entry.candidate.reviewsCount || 0) >= 30 && typeof entry.candidate.rating === 'number' && entry.candidate.rating >= 4.4) {
    score -= 1
    reasons.push('yorum ve puan guclu')
  }

  return {
    score,
    bucket: score >= 3 ? 'review' : 'shortlist',
    reasons,
    searchCoverageSignal: entry.source.missingSearchTerms.length > 0 ? 'sinirli' : 'genis',
  }
}

async function readJsonFile<T>(filePath: string, fallback: T): Promise<T> {
  try {
    const content = await readFile(filePath, 'utf8')
    return JSON.parse(content) as T
  } catch {
    return fallback
  }
}

export async function getBusinessRefreshHistory(businessId: string) {
  return readJsonFile<DiscoverySummaryEntry[]>(path.join(BUSINESS_REFRESH_DIR, `${businessId}.json`), [])
}

function matchesBusiness(record: DiscoverySummaryEntry, business: Pick<BusinessLookup, 'name' | 'district'>) {
  const candidateName = normalizeDiscoveryText(record.candidate.name)
  const candidateDistrict = normalizeDiscoveryText(record.candidate.district || record.candidate.city || '')
  const businessName = normalizeDiscoveryText(business.name)
  const businessDistrict = normalizeDiscoveryText(business.district)

  return candidateName === businessName && (!businessDistrict || candidateDistrict.includes(businessDistrict))
}

export async function getBusinessDiscoverySnapshot(business: BusinessLookup) {
  const refreshHistory = await getBusinessRefreshHistory(business.id)
  if (refreshHistory.length > 0) {
    return refreshHistory[refreshHistory.length - 1] || null
  }

  const summary = await readJsonFile<DiscoverySummaryEntry[]>(DISCOVERY_SUMMARY_PATH, [])
  return summary.find((record) => matchesBusiness(record, business)) || null
}

export function buildBusinessRefreshEntry({ business, rows, searchTerms, locationQuery, refreshMode, selectedSources, googleMapsOptions, instagramSignal }: RefreshEntryOptions): DiscoverySummaryEntry | null {
  if (rows.length === 0) return null

  const rankedRows = rows
    .map((row) => ({ row, score: scoreCandidateMatch(row, business) }))
    .sort((left, right) => right.score - left.score)

  const best = rankedRows[0]
  if (!best || best.score < 4) return null

  const bestNameSignals = getDiscoveryNameSignals(String(best.row.title || ''), business.name)
  const hasStrongNameAlignment = bestNameSignals.exactMatch
    || bestNameSignals.partialMatch
    || (bestNameSignals.categoryAligned && bestNameSignals.sharedTokenCount >= 2)
    || (bestNameSignals.categoryAligned && bestNameSignals.sharedTokenCount === 1 && bestNameSignals.businessTokenCount === 1)

  if (!hasStrongNameAlignment) return null

  const groupedRows = rows.filter((row) => businessKey(row) === businessKey(best.row))
  const firstRow = groupedRows[0]
  const website = extractWebsite(firstRow)
  const instagramFromMaps = extractInstagramUrl(firstRow)
  const location = (firstRow.location && typeof firstRow.location === 'object') ? firstRow.location as Record<string, unknown> : {}
  const matchedSearchTerms = Array.from(new Set(groupedRows
    .map((row) => String(row.searchString || '').trim())
    .filter(Boolean)))
  const missingSearchTerms = searchTerms.filter((term) => !matchedSearchTerms.includes(term))

  const entry: DiscoverySummaryEntry = {
    source: {
      collectedAt: String(firstRow.scrapedAt || toIsoNow()),
      matchedSearchTerms,
      missingSearchTerms,
      searchCoverageNote: matchedSearchTerms.length > 0
        ? missingSearchTerms.length > 0
          ? `${matchedSearchTerms.join(', ')} ile cikti, ${missingSearchTerms.join(', ')} ile cikmadi`
          : `${matchedSearchTerms.join(', ')} ile bulundu`
        : 'Arama terimi bilgisi yok',
      rawRecordCount: groupedRows.length,
      refreshMode: refreshMode || 'manual-single-business',
      selectedSources: selectedSources || [],
      googleMapsOptions: googleMapsOptions || { details: false, reviews: false },
      instagramSignal,
    },
    candidate: {
      name: String(firstRow.title || business.name),
      categoryName: String(firstRow.categoryName || ''),
      address: String(firstRow.address || ''),
      district: detectDistrict(firstRow, locationQuery) || business.district,
      city: String(firstRow.city || ''),
      phone: String(firstRow.phone || ''),
      websiteUrl: website.websiteUrl,
      instagramUrl: instagramSignal?.matchedProfileUrl || instagramFromMaps || '',
      hasWebsite: website.hasWebsite,
      rating: toNumber(firstRow.totalScore),
      reviewsCount: Number(firstRow.reviewsCount || 0),
      hasOpeningHours: Boolean(firstRow.openingHours),
      ownershipStatus: getOwnershipStatus(firstRow),
      capturedAt: toIsoNow(),
      placeId: String(firstRow.placeId || ''),
      mapsUrl: String(firstRow.url || ''),
      categories: categoryList(firstRow),
      isClosed: Boolean(firstRow.temporarilyClosed || firstRow.permanentlyClosed),
      latitude: toNumber(location.lat),
      longitude: toNumber(location.lng),
    },
    scoring: {
      bucket: 'review',
      reasons: [],
    },
  }

  for (const row of groupedRows.slice(1)) {
    if (!entry.candidate.phone && typeof row.phone === 'string') entry.candidate.phone = row.phone

    const extraWebsite = extractWebsite(row)
    if (!entry.candidate.hasWebsite && extraWebsite.hasWebsite) {
      entry.candidate.hasWebsite = true
      entry.candidate.websiteUrl = extraWebsite.websiteUrl
    }

    if (!entry.candidate.instagramUrl) {
      entry.candidate.instagramUrl = extractInstagramUrl(row)
    }

    const rating = toNumber(row.totalScore)
    if (typeof rating === 'number' && (entry.candidate.rating === null || rating > entry.candidate.rating)) {
      entry.candidate.rating = rating
    }

    entry.candidate.reviewsCount = Math.max(entry.candidate.reviewsCount, Number(row.reviewsCount || 0))
    entry.candidate.hasOpeningHours = Boolean(entry.candidate.hasOpeningHours || row.openingHours)

    const ownershipStatus = getOwnershipStatus(row)
    if (entry.candidate.ownershipStatus !== 'unclaimed' && ownershipStatus === 'unclaimed') {
      entry.candidate.ownershipStatus = 'unclaimed'
    } else if (entry.candidate.ownershipStatus === 'unknown' && ownershipStatus !== 'unknown') {
      entry.candidate.ownershipStatus = ownershipStatus
    }
  }

  entry.scoring = scoreEntry(entry)
  return entry
}

export async function appendBusinessRefreshSnapshot(businessId: string, entry: DiscoverySummaryEntry) {
  await mkdir(BUSINESS_REFRESH_DIR, { recursive: true })
  const snapshotPath = path.join(BUSINESS_REFRESH_DIR, `${businessId}.json`)
  const history = await getBusinessRefreshHistory(businessId)
  const last = history[history.length - 1]

  if (last) {
    const comparable = JSON.stringify({ ...last, candidate: { ...last.candidate, capturedAt: undefined }, source: { ...last.source, collectedAt: undefined } })
    const incoming = JSON.stringify({ ...entry, candidate: { ...entry.candidate, capturedAt: undefined }, source: { ...entry.source, collectedAt: undefined } })
    if (comparable === incoming) {
      history[history.length - 1] = entry
      await writeFile(snapshotPath, JSON.stringify(history, null, 2), 'utf8')
      return history
    }
  }

  const nextHistory = [...history, entry]
  await writeFile(snapshotPath, JSON.stringify(nextHistory, null, 2), 'utf8')
  return nextHistory
}

export async function appendPlaceSnapshot(entry: DiscoverySummaryEntry) {
  const placeId = String(entry.candidate.placeId || '').trim()
  if (!placeId) return

  await mkdir(DISCOVERY_SNAPSHOTS_DIR, { recursive: true })
  const snapshotPath = path.join(DISCOVERY_SNAPSHOTS_DIR, `${placeId}.json`)
  const history = await readJsonFile<Array<Record<string, unknown>>>(snapshotPath, [])

  const payload = {
    capturedAt: entry.candidate.capturedAt || toIsoNow(),
    placeId,
    name: entry.candidate.name,
    address: entry.candidate.address,
    phone: entry.candidate.phone,
    websiteUrl: entry.candidate.websiteUrl,
    instagramUrl: entry.candidate.instagramUrl || '',
    hasWebsite: entry.candidate.hasWebsite,
    rating: entry.candidate.rating,
    reviewsCount: entry.candidate.reviewsCount,
    hasOpeningHours: entry.candidate.hasOpeningHours,
    isClosed: entry.candidate.isClosed || false,
    ownershipStatus: entry.candidate.ownershipStatus,
    matchedSearchTerms: entry.source.matchedSearchTerms,
    missingSearchTerms: entry.source.missingSearchTerms,
    matchedSearchTermCount: entry.source.matchedSearchTerms.length,
    searchCoverageNote: entry.source.searchCoverageNote,
    rawRecordCount: entry.source.rawRecordCount || 0,
    score: entry.scoring.score || 0,
    bucket: entry.scoring.bucket,
  }

  const last = history[history.length - 1]
  if (last && JSON.stringify({ ...last, capturedAt: undefined }) === JSON.stringify({ ...payload, capturedAt: undefined })) {
    history[history.length - 1] = payload
  } else {
    history.push(payload)
  }

  await writeFile(snapshotPath, JSON.stringify(history, null, 2), 'utf8')
}
