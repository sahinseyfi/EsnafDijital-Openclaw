import Link from 'next/link'

export const dynamic = 'force-dynamic'
import { AdminShell } from '@/components/admin/AdminShell'
import { buildBusinessDetailHref } from '@/lib/businesses/route'
import { deriveProjectOsOverview, type ProjectOsStage } from '@/lib/project-os/derived'
import { getProjectOsDataset } from '@/lib/project-os/service'

const segmentLabels = {
  berber: 'Berber',
  guzellik: 'Güzellik',
  'kafe-restoran': 'Kafe / Restoran',
  diger: 'Diğer',
} as const

const businessStatusLabels = {
  lead: 'Aday',
  active: 'Aktif',
  paused: 'Beklemede',
} as const

const stageLabels: Record<ProjectOsStage, string> = {
  intake: 'Giriş',
  audit: 'Audit',
  offer: 'Teklif',
  delivery: 'Teslimat',
  maintenance: 'Bakım',
}

type FilterState = {
  q: string
  segment: 'all' | keyof typeof segmentLabels
  status: 'all' | keyof typeof businessStatusLabels
  stage: 'all' | ProjectOsStage
}

function pickFilter<T extends string>(value: string | undefined, allowed: readonly T[], fallback: T) {
  return value && allowed.includes(value as T) ? (value as T) : fallback
}

function normalizeFilters(input: {
  q?: string
  segment?: string
  status?: string
  stage?: string
}): FilterState {
  return {
    q: input.q?.trim() || '',
    segment: pickFilter(input.segment, ['all', 'berber', 'guzellik', 'kafe-restoran', 'diger'] as const, 'all'),
    status: pickFilter(input.status, ['all', 'lead', 'active', 'paused'] as const, 'all'),
    stage: pickFilter(input.stage, ['all', 'intake', 'audit', 'offer', 'delivery', 'maintenance'] as const, 'all'),
  }
}

function matchesSearch(haystack: string, query: string) {
  return haystack.toLocaleLowerCase('tr').includes(query.toLocaleLowerCase('tr'))
}

export default async function BusinessesPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; segment?: string; status?: string; stage?: string }>
}) {
  const params = await searchParams
  const filters = normalizeFilters(params || {})
  const dataset = await getProjectOsDataset()
  const overview = deriveProjectOsOverview(dataset)
  const queueMap = new Map(overview.queue.map((item, index) => [item.businessId, { item, index }]))

  const filteredBusinesses = dataset.businesses
    .filter((business) => {
      const queueEntry = queueMap.get(business.id)?.item
      const matchesQuery = filters.q
        ? matchesSearch([business.name, business.ownerName, business.district, queueEntry?.summary || ''].join(' '), filters.q)
        : true
      const matchesSegment = filters.segment === 'all' ? true : business.segment === filters.segment
      const matchesStatus = filters.status === 'all' ? true : business.status === filters.status
      const matchesStage = filters.stage === 'all' ? true : queueEntry?.stage === filters.stage

      return matchesQuery && matchesSegment && matchesStatus && matchesStage
    })
    .sort((left, right) => {
      const leftOrder = queueMap.get(left.id)?.index ?? Number.MAX_SAFE_INTEGER
      const rightOrder = queueMap.get(right.id)?.index ?? Number.MAX_SAFE_INTEGER

      if (leftOrder !== rightOrder) {
        return leftOrder - rightOrder
      }

      return left.name.localeCompare(right.name, 'tr')
    })

  const stats = {
    total: dataset.businesses.length,
    visible: filteredBusinesses.length,
    active: dataset.businesses.filter((business) => business.status === 'active').length,
    lead: dataset.businesses.filter((business) => business.status === 'lead').length,
    paused: dataset.businesses.filter((business) => business.status === 'paused').length,
  }

  return (
    <AdminShell
      title="İşletmeler"
      description="Project OS içindeki dar operasyon kuyruğundan ayrı, tüm işletme kayıtlarını toplu görüp detaya inmek için sade liste yüzeyi."
    >
      <section className="hero">
        <div>
          <p className="eyebrow">Tüm kayıt görünümü</p>
          <h1>İşletmeleri ayrı bir listede gör</h1>
          <p className="muted">Bu sayfa işletme envanteri içindir. Sıcak operasyon sırası yine İş Takibi içinde kalır, ama tüm kayıtları filtreleyip detay sayfasına buradan daha rahat geçersin.</p>
        </div>
        <div className="hero-actions">
          <Link href="/project-os#quick-actions" className="cta-link">Yeni işletme aç</Link>
          <Link href="/project-os" className="ghost-link">İş Takibine dön</Link>
        </div>
      </section>

      <section className="stats-grid">
        <article className="card stat-card">
          <strong>{stats.total}</strong>
          <p className="muted">toplam işletme kaydı</p>
        </article>
        <article className="card stat-card">
          <strong>{stats.visible}</strong>
          <p className="muted">filtre sonrası görünen kayıt</p>
        </article>
        <article className="card stat-card">
          <strong>{stats.lead}</strong>
          <p className="muted">aday statüsünde kayıt</p>
        </article>
        <article className="card stat-card">
          <strong>{stats.active}</strong>
          <p className="muted">aktif statüde kayıt</p>
        </article>
        <article className="card stat-card">
          <strong>{stats.paused}</strong>
          <p className="muted">beklemede kayıt</p>
        </article>
      </section>

      <section className="grid-2" style={{ alignItems: 'start' }}>
        <article className="card stack-sm">
          <div>
            <p className="eyebrow">Filtre</p>
            <h3>Listeyi daralt</h3>
          </div>
          <form method="get" className="form-grid two-col">
            <label className="field">
              <span>Arama</span>
              <input name="q" defaultValue={filters.q} placeholder="İşletme, sahip, ilçe, not" />
            </label>
            <label className="field">
              <span>Segment</span>
              <select name="segment" defaultValue={filters.segment}>
                <option value="all">Tüm segmentler</option>
                <option value="berber">Berber</option>
                <option value="guzellik">Güzellik</option>
                <option value="kafe-restoran">Kafe / Restoran</option>
                <option value="diger">Diğer</option>
              </select>
            </label>
            <label className="field">
              <span>İşletme durumu</span>
              <select name="status" defaultValue={filters.status}>
                <option value="all">Tüm durumlar</option>
                <option value="lead">Aday</option>
                <option value="active">Aktif</option>
                <option value="paused">Beklemede</option>
              </select>
            </label>
            <label className="field">
              <span>Hat aşaması</span>
              <select name="stage" defaultValue={filters.stage}>
                <option value="all">Tüm aşamalar</option>
                <option value="intake">Giriş</option>
                <option value="audit">Audit</option>
                <option value="offer">Teklif</option>
                <option value="delivery">Teslimat</option>
                <option value="maintenance">Bakım</option>
              </select>
            </label>
            <div className="page-header-actions" style={{ alignSelf: 'end' }}>
              <button type="submit" className="button-primary">Uygula</button>
              <Link href="/businesses" className="button-secondary">Temizle</Link>
            </div>
          </form>
        </article>

        <article className="card stack-sm">
          <div>
            <p className="eyebrow">Okuma notu</p>
            <h3>Bu sayfanın rolü ne?</h3>
          </div>
          <ul className="list">
            <li>Burada tüm işletme kayıtlarını görür ve detaya inersin.</li>
            <li>Sıcak iş sırası ve ilerletme butonları esas olarak İş Takibi içindedir.</li>
            <li>Detay sayfası tek kayıt odaklıdır, bu ekran ise envanter ve filtreleme yüzeyidir.</li>
          </ul>
          <p className="muted">İstersen buradan işletme detayına geç, istersen aynı kaydı İş Takibinde açıp audit, teklif ve teslimat zincirini gör.</p>
        </article>
      </section>

      <section className="card stack-sm">
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div>
            <p className="eyebrow">İşletme listesi</p>
            <h3>Tüm işletmeler</h3>
          </div>
          <span className="badge">{stats.visible} kayıt gösteriliyor</span>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>İşletme</th>
                <th>Sahip</th>
                <th>Segment</th>
                <th>İlçe</th>
                <th>Hat aşaması</th>
                <th>Sıradaki adım</th>
                <th>Durum</th>
              </tr>
            </thead>
            <tbody>
              {filteredBusinesses.length > 0 ? filteredBusinesses.map((business) => {
                const queueEntry = queueMap.get(business.id)?.item

                return (
                  <tr key={business.id}>
                    <td>
                      <div className="stack-xs">
                        <Link href={buildBusinessDetailHref(business)} style={{ color: 'var(--ink-title)', fontWeight: 700 }}>{business.name}</Link>
                        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                          <Link href={buildBusinessDetailHref(business)} className="ghost-link">Profili aç</Link>
                          <Link href={`/project-os?businessId=${business.id}#records`} className="ghost-link">İş Takibinde aç</Link>
                        </div>
                      </div>
                    </td>
                    <td>{business.ownerName}</td>
                    <td>{segmentLabels[business.segment]}</td>
                    <td>{business.district}</td>
                    <td>{queueEntry ? stageLabels[queueEntry.stage] : '—'}</td>
                    <td>{queueEntry?.nextAction || '—'}</td>
                    <td>{businessStatusLabels[business.status]}</td>
                  </tr>
                )
              }) : (
                <tr>
                  <td colSpan={7} className="muted">Bu filtreyle eşleşen işletme kaydı yok.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </AdminShell>
  )
}
