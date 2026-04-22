import Link from 'next/link'
import { AdminShell } from '@/components/admin/AdminShell'
import { DiscoveryRowActions } from '@/components/discovery/DiscoveryRowActions'
import { readDiscoveryRuntimeState } from '@/lib/discovery/runtime'
import { filterDiscoveryRows, normalizeDiscoveryFilters, readDiscoverySummary, sortDiscoveryRows } from '@/lib/discovery/service'
import type { DiscoveryOwnershipStatus } from '@/lib/discovery/types'

export const dynamic = 'force-dynamic'

const segmentLabels = {
  berber: 'Berber',
  'guzellik salonu': 'Güzellik salonu',
} as const

const bucketLabels = {
  shortlist: 'Kısa liste',
  review: 'İncele',
  skip: 'Ele',
} as const

const ownershipLabels: Record<DiscoveryOwnershipStatus, string> = {
  claimed: 'Alinmis',
  unclaimed: 'Alinmamis',
  unknown: 'Bilinmiyor',
}

function formatRating(value: number | null) {
  return typeof value === 'number' ? value.toFixed(1) : '—'
}

function bucketBadgeStyle(bucket: 'shortlist' | 'review' | 'skip') {
  if (bucket === 'shortlist') {
    return {
      background: 'var(--success-bg)',
      color: 'var(--success-text)',
      borderColor: 'var(--success-border)',
    }
  }

  if (bucket === 'review') {
    return {
      background: 'var(--warning-bg)',
      color: 'var(--warning-text)',
      borderColor: 'var(--warning-border)',
    }
  }

  return {
    background: 'var(--surface-subtle)',
    color: 'var(--ink-secondary)',
    borderColor: 'var(--line-strong)',
  }
}

function getSortLabel(isActive: boolean, dir: 'asc' | 'desc') {
  if (!isActive) return '↕'
  return dir === 'asc' ? '↑' : '↓'
}

function getDefaultSortDirection(key: 'segment' | 'score' | 'reviews' | 'contact' | 'ownership' | 'coverage' | 'decision' | 'actions') {
  if (key === 'segment' || key === 'decision') return 'asc' as const
  return 'desc' as const
}

export default async function DiscoveryPage({
  searchParams,
}: {
  searchParams?: Promise<{ segment?: string; bucket?: string; q?: string; sort?: string; dir?: string }>
}) {
  const params = (await searchParams) || {}
  const [rows, runtimeState] = await Promise.all([
    readDiscoverySummary(),
    readDiscoveryRuntimeState(),
  ])
  const filters = normalizeDiscoveryFilters(params)
  const filteredRows = filterDiscoveryRows(rows, params)
  const sortedRows = sortDiscoveryRows(filteredRows, params, runtimeState)
  const shortlistedPlaceIds = new Set(runtimeState.shortlistedPlaceIds)

  const stats = {
    total: rows.length,
    visible: filteredRows.length,
    shortlist: rows.filter((row) => row.scoring.bucket === 'shortlist').length,
    manualShortlist: runtimeState.shortlistedPlaceIds.length,
    imported: Object.keys(runtimeState.imports).length,
    withWebsite: rows.filter((row) => row.candidate.hasWebsite).length,
    withPhone: rows.filter((row) => Boolean(row.candidate.phone.trim())).length,
    multiTerm: rows.filter((row) => row.source.matchedSearchTermCount > 1).length,
    unclaimed: rows.filter((row) => row.candidate.ownershipStatus === 'unclaimed').length,
  }

  function buildSortHref(key: 'segment' | 'score' | 'reviews' | 'contact' | 'ownership' | 'coverage' | 'decision' | 'actions') {
    const nextDir = filters.sort === key
      ? (filters.dir === 'desc' ? 'asc' : 'desc')
      : getDefaultSortDirection(key)
    const query = new URLSearchParams()
    if (filters.q) query.set('q', filters.q)
    if (filters.segment !== 'all') query.set('segment', filters.segment)
    if (filters.bucket !== 'all') query.set('bucket', filters.bucket)
    query.set('sort', key)
    query.set('dir', nextDir)
    return `/discovery?${query.toString()}`
  }

  return (
    <AdminShell
      title="Discovery"
      description="Apify taramasindan gelen adaylari ana kayitlara dokunmadan once temiz, okunur ve filtrelenebilir bir staging tablosunda gosterir."
    >
      <section className="hero">
        <div>
          <p className="eyebrow">Discovery staging</p>
          <h1>Ham tarama degil, islenmis aday tablosu</h1>
          <p className="muted">Bu ekran Google Maps verisini dogrudan Project OS kayitlarina yazmaz. Once burada gorur, eler, sonra nitelikli adaylari isletme ve audit tarafina tasiriz.</p>
        </div>
      </section>

      <section className="stats-grid">
        <article className="card stat-card">
          <strong>{stats.total}</strong>
          <p className="muted">toplam ozet aday</p>
        </article>
        <article className="card stat-card">
          <strong>{stats.shortlist}</strong>
          <p className="muted">kisa liste sinyalinde aday</p>
        </article>
        <article className="card stat-card">
          <strong>{stats.manualShortlist}</strong>
          <p className="muted">elle shortlist edilen aday</p>
        </article>
        <article className="card stat-card">
          <strong>{stats.imported}</strong>
          <p className="muted">Project OSa aktarilan aday</p>
        </article>
      </section>

      <section className="grid-2" style={{ alignItems: 'start' }}>
        <article className="card stack-sm">
          <div>
            <p className="eyebrow">Filtre</p>
            <h3>Tabloyu daralt</h3>
          </div>
          <form method="get" className="form-grid two-col">
            <label className="field">
              <span>Arama</span>
              <input name="q" defaultValue={filters.q} placeholder="Isletme, adres, telefon, kategori" />
            </label>
            <label className="field">
              <span>Segment</span>
              <select name="segment" defaultValue={filters.segment}>
                <option value="all">Tum segmentler</option>
                <option value="berber">Berber</option>
                <option value="guzellik salonu">Guzellik salonu</option>
              </select>
            </label>
            <label className="field">
              <span>Karar kovasi</span>
              <select name="bucket" defaultValue={filters.bucket}>
                <option value="all">Tum kovalar</option>
                <option value="shortlist">Kisa liste</option>
                <option value="review">Incele</option>
                <option value="skip">Ele</option>
              </select>
            </label>
            <input type="hidden" name="sort" value={filters.sort} />
            <input type="hidden" name="dir" value={filters.dir} />
            <div className="page-header-actions" style={{ alignSelf: 'end' }}>
              <button type="submit" className="button-primary">Uygula</button>
              <a href="/discovery" className="button-secondary">Temizle</a>
            </div>
          </form>
        </article>

        <article className="card stack-sm">
          <div>
            <p className="eyebrow">Okuma notu</p>
            <h3>Bu tabloyu nasil kullanacagiz?</h3>
          </div>
          <ul className="list">
            <li>Skor ve kova ilk eleme sinyalidir, son karar degil.</li>
            <li>Coklu arama teriminde gorenen adaylar daha guclu gorunurluk sinyali verir.</li>
            <li>Sahiplik durumu, kaydin alinip alinmadigini sonraki scrape'lerde hizlica ayirmak icin tutulur.</li>
            <li>Shortlist butonu manuel secimi saklar, Project OS butonu ise Business ve Audit acarak adaylari ana hatta tasir.</li>
          </ul>
          <p className="muted">Su an {stats.visible} aday gorunuyor, bunlarin {stats.multiTerm} tanesi birden fazla arama teriminde yakalandi, {stats.unclaimed} tanesinde kayit alinmamis sinyali var.</p>
        </article>
      </section>

      <section className="card stack-sm">
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div>
            <p className="eyebrow">Aday tablosu</p>
            <h3>Discovery listesi</h3>
          </div>
          <span className="badge">{stats.visible} kayit gosteriliyor, siralama: {filters.sort} {filters.dir}</span>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Isletme</th>
                <th>
                  <Link href={buildSortHref('segment')} className="discovery-sort-link">
                    Segment <span>{getSortLabel(filters.sort === 'segment', filters.dir)}</span>
                  </Link>
                </th>
                <th>
                  <Link href={buildSortHref('score')} className="discovery-sort-link">
                    Skor <span>{getSortLabel(filters.sort === 'score', filters.dir)}</span>
                  </Link>
                </th>
                <th>
                  <Link href={buildSortHref('reviews')} className="discovery-sort-link">
                    Yorum / puan <span>{getSortLabel(filters.sort === 'reviews', filters.dir)}</span>
                  </Link>
                </th>
                <th>
                  <Link href={buildSortHref('contact')} className="discovery-sort-link">
                    Iletisim <span>{getSortLabel(filters.sort === 'contact', filters.dir)}</span>
                  </Link>
                </th>
                <th>
                  <Link href={buildSortHref('ownership')} className="discovery-sort-link">
                    Sahiplik <span>{getSortLabel(filters.sort === 'ownership', filters.dir)}</span>
                  </Link>
                </th>
                <th>
                  <Link href={buildSortHref('coverage')} className="discovery-sort-link">
                    Arama kapsami <span>{getSortLabel(filters.sort === 'coverage', filters.dir)}</span>
                  </Link>
                </th>
                <th>
                  <Link href={buildSortHref('decision')} className="discovery-sort-link">
                    Karar <span>{getSortLabel(filters.sort === 'decision', filters.dir)}</span>
                  </Link>
                </th>
                <th>
                  <Link href={buildSortHref('actions')} className="discovery-sort-link">
                    Aksiyon <span>{getSortLabel(filters.sort === 'actions', filters.dir)}</span>
                  </Link>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedRows.length > 0 ? sortedRows.map((row) => (
                <tr key={row.candidate.placeId}>
                  <td>
                    <div className="stack-xs">
                      <strong style={{ color: 'var(--ink-title)' }}>{row.candidate.name}</strong>
                      <span className="muted">{row.candidate.categoryName || 'Kategori yok'}</span>
                      <span className="muted">{row.candidate.address || 'Adres yok'}</span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        <a href={row.candidate.mapsUrl} target="_blank" rel="noreferrer" className="ghost-link" style={{ minHeight: 36, padding: '8px 12px' }}>Maps</a>
                        {row.candidate.websiteUrl ? (
                          <a href={row.candidate.websiteUrl} target="_blank" rel="noreferrer" className="ghost-link" style={{ minHeight: 36, padding: '8px 12px' }}>Website</a>
                        ) : null}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="stack-xs">
                      <span>{segmentLabels[row.source.segment]}</span>
                      <span className="muted">{row.candidate.district || 'Ilce yok'}</span>
                    </div>
                  </td>
                  <td>
                    <div className="stack-xs">
                      <strong style={{ color: 'var(--ink-title)' }}>{row.scoring.score}</strong>
                      <span className="muted">{row.scoring.searchCoverageSignal}</span>
                    </div>
                  </td>
                  <td>
                    <div className="stack-xs">
                      <span>{row.candidate.reviewsCount} yorum</span>
                      <span className="muted">{formatRating(row.candidate.rating)} puan</span>
                    </div>
                  </td>
                  <td>
                    <div className="stack-xs">
                      <span>{row.candidate.phone || 'Telefon yok'}</span>
                      <span className="muted">{row.candidate.hasWebsite ? 'Website var' : 'Website yok'}</span>
                    </div>
                  </td>
                  <td>
                    <div className="stack-xs">
                      <span>{ownershipLabels[row.candidate.ownershipStatus]}</span>
                      <span className="muted">{row.candidate.ownershipStatus === 'unclaimed' ? 'claimThisBusiness=true' : row.candidate.ownershipStatus === 'claimed' ? 'claimThisBusiness=false' : 'Alan yok'}</span>
                    </div>
                  </td>
                  <td>
                    <div className="stack-xs">
                      <span>{row.source.matchedSearchTerms.join(', ') || 'Terim yok'}</span>
                      <span className="muted">{row.source.matchedSearchTermCount} terim</span>
                    </div>
                  </td>
                  <td>
                    <div className="stack-xs">
                      <span className="badge" style={bucketBadgeStyle(row.scoring.bucket)}>{bucketLabels[row.scoring.bucket]}</span>
                      {shortlistedPlaceIds.has(row.candidate.placeId) ? <span className="badge">Shortlistte</span> : null}
                      <span className="muted">{row.scoring.reasons.slice(0, 2).join(', ') || 'Not yok'}</span>
                    </div>
                  </td>
                  <td>
                    <DiscoveryRowActions
                      placeId={row.candidate.placeId}
                      initiallyShortlisted={shortlistedPlaceIds.has(row.candidate.placeId)}
                      importInfo={runtimeState.imports[row.candidate.placeId] || null}
                      payload={{
                        placeId: row.candidate.placeId,
                        name: row.candidate.name,
                        segment: row.source.segment,
                        district: row.candidate.district,
                        address: row.candidate.address,
                        categoryName: row.candidate.categoryName,
                        phone: row.candidate.phone,
                        websiteUrl: row.candidate.websiteUrl,
                        reviewsCount: row.candidate.reviewsCount,
                        score: row.scoring.score,
                        matchedSearchTerms: row.source.matchedSearchTerms,
                      }}
                    />
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={9} className="muted">Bu filtreyle eslesen aday yok.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </AdminShell>
  )
}
