export type DiscoverySegment = 'berber' | 'guzellik salonu'
export type DiscoveryBucket = 'shortlist' | 'review' | 'skip'

export type DiscoveryOwnershipStatus = 'claimed' | 'unclaimed' | 'unknown'

export type DiscoverySummaryRow = {
  source: {
    segment: DiscoverySegment
    locationQuery: string
    collectedAt: string
    expectedSearchTerms: string[]
    matchedSearchTerms: string[]
    missingSearchTerms: string[]
    matchedSearchTermCount: number
    firstMatchedSearchTerm: string | null
    matchedSegments: string[]
    missingSegments: string[]
    searchCoverageNote: string
    rawRecordCount: number
  }
  candidate: {
    name: string
    mapsUrl: string
    placeId: string
    segment: string
    categoryName: string
    categories: string[]
    address: string
    district: string
    city: string
    phone: string
    websiteUrl: string
    hasWebsite: boolean
    rating: number | null
    reviewsCount: number
    hasOpeningHours: boolean
    isClosed: boolean
    ownershipStatus: DiscoveryOwnershipStatus
    latitude: number | null
    longitude: number | null
  }
  scoring: {
    score: number
    bucket: DiscoveryBucket
    reasons: string[]
    searchCoverageSignal: string
  }
}
