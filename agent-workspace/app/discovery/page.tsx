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
  claimed: 'Alınmış',
  unclaimed: 'Alınmamış',
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
      title="Keşif"
      description="Apify taramasından gelen adayları ana kayıtlara dokunmadan önce temiz, okunur ve filtrelenebilir bir ön eleme tablosunda gösterir."
    >
      <section className="hero">
        <div>
          <p className="eyebrow">Keşif ön elemesi</p>
          <h1>Ham tarama değil, işlenmiş aday tablosu</h1>
          <p className="muted">Bu ekran Google Maps verisini doğrudan İş Takibi kayıtlarına yazmaz. Önce burada görür, eler, sonra nitelikli adayları işletme ve audit tarafına taşırız.</p>
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
          <p className="muted">elle kısa listeye alınan aday</p>
        </article>
        <article className="card stat-card">
          <strong>{stats.imported}</strong>
          <p className="muted">İş Takibine aktarılan aday</p>
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
              <input name="q" defaultValue={filters.q} placeholder="İşletme, adres, telefon, kategori" />
            </label>
            <label className="field">
              <span>Segment</span>
              <select name="segment" defaultValue={filters.segment}>
                <option value="all">Tüm segmentler</option>
                <option value="berber">Berber</option>
                <option value="guzellik salonu">Güzellik salonu</option>
              </select>
            </label>
            <label className="field">
              <span>Karar kovasi</span>
              <select name="bucket" defaultValue={filters.bucket}>
                <option value="all">Tüm kovalar</option>
                <option value="shortlist">Kısa liste</option>
                <option value="review">İncele</option>
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
            <h3>Bu tabloyu nasıl kullanacağız?</h3>
          </div>
          <ul className="list">
            <li>Skor ve kova ilk eleme sinyalidir, son karar değil.</li>
            <li>Çoklu arama teriminde görünen adaylar daha güçlü görünürlük sinyali verir.</li>
            <li>Sahiplik durumu, kaydın alınıp alınmadığını sonraki taramalarda hızlıca ayırmak için tutulur.</li>
            <li>Kısa liste butonu manuel seçimi saklar, İş Takibi butonu ise işletme ve audit açarak adayları ana hatta taşır.</li>
          </ul>
          <p className="muted">Şu an {stats.visible} aday görünüyor, bunların {stats.multiTerm} tanesi birden fazla arama teriminde yakalandı, {stats.unclaimed} tanesinde kayıt alınmamış sinyali var.</p>
        </article>
      </section>

      <section className="card stack-sm">
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div>
            <p className="eyebrow">Aday tablosu</p>
            <h3>Keşif listesi</h3>
          </div>
          <span className="badge">{stats.visible} kayıt gösteriliyor, sıralama: {filters.sort} {filters.dir}</span>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>İşletme</th>
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
                    İletişim <span>{getSortLabel(filters.sort === 'contact', filters.dir)}</span>
                  </Link>
                </th>
                <th>
                  <Link href={buildSortHref('ownership')} className="discovery-sort-link">
                    Sahiplik <span>{getSortLabel(filters.sort === 'ownership', filters.dir)}</span>
                  </Link>
                </th>
                <th>
                  <Link href={buildSortHref('coverage')} className="discovery-sort-link">
                    Arama kapsamı <span>{getSortLabel(filters.sort === 'coverage', filters.dir)}</span>
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
                      <Link href={`/discovery/${encodeURIComponent(row.candidate.placeId)}`} style={{ color: 'var(--ink-title)', fontWeight: 700 }}>
                        {row.candidate.name}
                      </Link>
                      <span className="muted">{row.candidate.categoryName || 'Kategori yok'}</span>
                      <span className="muted">{row.candidate.address || 'Adres yok'}</span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        <a href={row.candidate.mapsUrl} target="_blank" rel="noreferrer" className="ghost-link" style={{ minHeight: 36, padding: '8px 12px' }}>Harita</a>
                        {row.candidate.websiteUrl ? (
                          <a href={row.candidate.websiteUrl} target="_blank" rel="noreferrer" className="ghost-link" style={{ minHeight: 36, padding: '8px 12px' }}>Web sitesi</a>
                        ) : null}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="stack-xs">
                      <span>{segmentLabels[row.source.segment]}</span>
                      <span className="muted">{row.candidate.district || 'İlçe yok'}</span>
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
                      <span className="muted">{row.candidate.hasWebsite ? 'Web sitesi var' : 'Web sitesi yok'}</span>
                    </div>
                  </td>
                  <td>
                    <div className="stack-xs">
                      <span>{ownershipLabels[row.candidate.ownershipStatus]}</span>
                      <span className="muted">{row.candidate.ownershipStatus === 'unclaimed' ? 'İşletme kaydı alınmamış görünüyor' : row.candidate.ownershipStatus === 'claimed' ? 'İşletme kaydı alınmış görünüyor' : 'Alan yok'}</span>
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
                      {shortlistedPlaceIds.has(row.candidate.placeId) ? <span className="badge">Kısa listede</span> : null}
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
                  <td colSpan={9} className="muted">Bu filtreyle eşleşen aday yok.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </AdminShell>
  )
}
