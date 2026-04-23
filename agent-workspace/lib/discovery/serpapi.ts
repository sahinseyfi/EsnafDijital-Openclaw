type SerpApiOrganicItem = {
  title?: string
  link?: string
  snippet?: string
  position?: number
}

type SerpApiSearchResponse = {
  organic_results?: SerpApiOrganicItem[]
}

type SearchSerpApiQueriesInput = {
  queries: string[]
  num?: number
  gl?: string
  hl?: string
  location?: string
}

type SearchSerpApiQueryResult = {
  searchString: string
  organicResults: SerpApiOrganicItem[]
}

const SERPAPI_ENDPOINT = 'https://serpapi.com/search.json'

export async function searchSerpApiQueries({
  queries,
  num = 5,
  gl = 'tr',
  hl = 'tr',
  location,
}: SearchSerpApiQueriesInput): Promise<SearchSerpApiQueryResult[]> {
  const apiKey = process.env.SERPAPI_API_KEY?.trim()
  if (!apiKey) {
    throw new Error('SERPAPI_API_KEY tanimli degil.')
  }

  const uniqueQueries = Array.from(new Set(queries.map((item) => item.trim()).filter(Boolean)))
  const results: SearchSerpApiQueryResult[] = []

  for (const query of uniqueQueries) {
    const url = new URL(SERPAPI_ENDPOINT)
    url.searchParams.set('engine', 'google')
    url.searchParams.set('q', query)
    url.searchParams.set('api_key', apiKey)
    url.searchParams.set('gl', gl)
    url.searchParams.set('hl', hl)
    url.searchParams.set('num', String(num))
    url.searchParams.set('google_domain', 'google.com')
    if (location?.trim()) {
      url.searchParams.set('location', location.trim())
    }

    const response = await fetch(url, {
      method: 'GET',
      cache: 'no-store',
    })

    if (!response.ok) {
      throw new Error(`SerpApi ${response.status} dondu.`)
    }

    const payload = await response.json().catch(() => ({})) as SerpApiSearchResponse
    results.push({
      searchString: query,
      organicResults: Array.isArray(payload.organic_results) ? payload.organic_results : [],
    })
  }

  return results
}
