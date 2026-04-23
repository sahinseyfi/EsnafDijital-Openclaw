type SerperOrganicItem = {
  title?: string
  link?: string
  snippet?: string
  position?: number
}

type SerperSearchResponse = {
  organic?: SerperOrganicItem[]
}

type SearchSerperQueriesInput = {
  queries: string[]
  num?: number
  gl?: string
  hl?: string
}

type SearchSerperQueryResult = {
  searchString: string
  organicResults: SerperOrganicItem[]
}

const SERPER_ENDPOINT = 'https://google.serper.dev/search'

export async function searchSerperQueries({
  queries,
  num = 5,
  gl = 'tr',
  hl = 'tr',
}: SearchSerperQueriesInput): Promise<SearchSerperQueryResult[]> {
  const apiKey = process.env.SERPER_API_KEY?.trim()
  if (!apiKey) {
    throw new Error('SERPER_API_KEY tanimli degil.')
  }

  const uniqueQueries = Array.from(new Set(queries.map((item) => item.trim()).filter(Boolean)))
  const results: SearchSerperQueryResult[] = []

  for (const query of uniqueQueries) {
    const response = await fetch(SERPER_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': apiKey,
      },
      body: JSON.stringify({
        q: query,
        gl,
        hl,
        num,
        autocorrect: false,
        page: 1,
      }),
      cache: 'no-store',
    })

    if (!response.ok) {
      throw new Error(`Serper ${response.status} dondu.`)
    }

    const payload = await response.json().catch(() => ({})) as SerperSearchResponse
    results.push({
      searchString: query,
      organicResults: Array.isArray(payload.organic) ? payload.organic : [],
    })
  }

  return results
}
