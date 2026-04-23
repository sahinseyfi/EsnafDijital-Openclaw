import Link from 'next/link'
import { notFound, permanentRedirect } from 'next/navigation'

import { AdminShell } from '@/components/admin/AdminShell'
import type { BusinessAgentScanResult } from '@/lib/businesses/agent-scan'
import { getBusinessAgentScanHistory, getLatestBusinessAgentScan } from '@/lib/businesses/agent-scan'
import type { DiscoverySummaryEntry } from '@/lib/businesses/discovery'
import { getBusinessDiscoverySnapshot, getBusinessRefreshHistory } from '@/lib/businesses/discovery'
import { buildBusinessDetailHref, buildBusinessScanDetailHref, parseBusinessSlugAndId } from '@/lib/businesses/route'
import { getProjectOsDataset } from '@/lib/project-os/service'

export const dynamic = 'force-dynamic'

function formatDateTime(value: string, emptyText = 'Henüz yok') {
  if (!value.trim()) return emptyText
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value

  return new Intl.DateTimeFormat('tr-TR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

function formatSourceLabel(source: string) {
  if (source === 'google-maps') return 'Google Maps'
  if (source === 'maps-refresh' || source === 'maps-snapshot') return 'Google Maps snapshot'
  if (source === 'website-check') return 'Website kontrolü'
  if (source === 'google-search') return 'Google Search'
  if (source === 'serp-signals') return 'Arama sinyali'
  if (source === 'yandex') return 'Yandex'
  if (source === 'apple-maps') return 'Apple Maps'
  if (source === 'instagram') return 'Instagram'
  return source
}

function formatSelectedSources(entry: DiscoverySummaryEntry) {
  const labels: string[] = []
  const selectedSources = entry.source.selectedSources || []

  for (const source of selectedSources) {
    labels.push(formatSourceLabel(source))
  }

  if (entry.source.googleMapsOptions?.details) labels.push('Google Maps tüm detaylar')
  if (entry.source.googleMapsOptions?.reviews) labels.push('Google Maps yorumlar')

  return labels.length > 0 ? labels : ['Varsayılan tek işletme taraması']
}

function JsonBlock({ value }: { value: unknown }) {
  return (
    <pre
      style={{
        margin: 0,
        padding: 14,
        borderRadius: 12,
        border: '1px solid var(--line-soft)',
        background: 'var(--surface-subtle)',
        overflowX: 'auto',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        fontSize: 13,
        lineHeight: 1.5,
      }}
    >
      {JSON.stringify(value, null, 2)}
    </pre>
  )
}

function AgentScanCard({ entry }: { entry: BusinessAgentScanResult }) {
  return (
    <article className="card stack-sm" style={{ borderColor: 'var(--line-soft)', background: 'var(--surface)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div>
          <p className="eyebrow">Ajan tarama</p>
          <h3>{entry.status}</h3>
        </div>
        <span className="badge">{formatDateTime(entry.createdAt)}</span>
      </div>

      <div className="detail-field">
        <p className="eyebrow">Özet</p>
        <p>{entry.summary}</p>
      </div>

      {entry.findings.length > 0 ? (
        <div className="detail-field">
          <p className="eyebrow">Bulgular</p>
          <ul className="compact-list">
            {entry.findings.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      ) : null}

      {entry.risks.length > 0 ? (
        <div className="detail-field">
          <p className="eyebrow">Eksikler / riskler</p>
          <ul className="compact-list">
            {entry.risks.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      ) : null}

      <div className="detail-field">
        <p className="eyebrow">Sonraki adım</p>
        <p>{entry.nextStep}</p>
      </div>

      <div className="detail-field">
        <p className="eyebrow">Ham veri</p>
        <JsonBlock value={entry} />
      </div>
    </article>
  )
}

function DiscoveryCard({ entry, label }: { entry: DiscoverySummaryEntry, label: string }) {
  return (
    <article className="card stack-sm" style={{ borderColor: 'var(--line-soft)', background: 'var(--surface)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div>
          <p className="eyebrow">{label}</p>
          <h3>{entry.source.refreshMode === 'apify' ? 'Derin tarama' : 'Hafif tarama / dış sinyal'}</h3>
        </div>
        <span className="badge">{formatDateTime(entry.source.collectedAt)}</span>
      </div>

      <div className="grid-2" style={{ alignItems: 'start', gap: 20 }}>
        <div style={{ display: 'grid', gap: 14 }}>
          <div className="detail-field">
            <p className="eyebrow">Kapsam notu</p>
            <p>{entry.source.searchCoverageNote || 'Not yok'}</p>
          </div>
          <div className="detail-field">
            <p className="eyebrow">Taranan kaynaklar</p>
            <ul className="compact-list">
              {formatSelectedSources(entry).map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <div className="detail-field">
            <p className="eyebrow">Bulunan işletme verisi</p>
            <p>{entry.candidate.name || 'İsim yok'}</p>
            <p className="muted" style={{ marginTop: 6 }}>{entry.candidate.address || 'Adres yok'}</p>
          </div>
          <div className="detail-field">
            <p className="eyebrow">Website / telefon / Instagram</p>
            <p>{entry.candidate.websiteUrl || 'Website yok'}</p>
            <p className="muted" style={{ marginTop: 6 }}>{entry.candidate.phone || 'Telefon yok'} · {entry.candidate.instagramUrl || 'Instagram yok'}</p>
          </div>
        </div>

        <div style={{ display: 'grid', gap: 14 }}>
          <div className="detail-field">
            <p className="eyebrow">Puan / yorum / sahiplik</p>
            <p>{typeof entry.candidate.rating === 'number' ? entry.candidate.rating : '—'} · {entry.candidate.reviewsCount} yorum · {entry.candidate.ownershipStatus}</p>
          </div>
          <div className="detail-field">
            <p className="eyebrow">Skor</p>
            <p>{typeof entry.scoring.score === 'number' ? entry.scoring.score : '—'} · {entry.scoring.bucket}</p>
          </div>
          {entry.scoring.reasons.length > 0 ? (
            <div className="detail-field">
              <p className="eyebrow">Skor nedenleri</p>
              <ul className="compact-list">
                {entry.scoring.reasons.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          ) : null}
          {(entry.source.matchedSearchTerms.length > 0 || entry.source.missingSearchTerms.length > 0) ? (
            <div className="detail-field">
              <p className="eyebrow">Arama terimleri</p>
              <p>Eşleşen: {entry.source.matchedSearchTerms.join(', ') || '—'}</p>
              <p className="muted" style={{ marginTop: 6 }}>Eksik: {entry.source.missingSearchTerms.join(', ') || '—'}</p>
            </div>
          ) : null}
          {entry.source.sourceRuns && entry.source.sourceRuns.length > 0 ? (
            <div className="detail-field">
              <p className="eyebrow">Kaynak çalışma durumu</p>
              <ul className="compact-list">
                {entry.source.sourceRuns.map((item) => (
                  <li key={`${item.source}-${item.actorId || 'actor'}`}>
                    {formatSourceLabel(item.source)} · {item.status === 'success' ? 'ok' : 'hata'} · {item.rawCount || 0} ham kayıt{item.error ? ` · ${item.error}` : ''}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>

      <div className="detail-field">
        <p className="eyebrow">Ham veri</p>
        <JsonBlock value={entry} />
      </div>
    </article>
  )
}

export default async function BusinessScanDetailPage({
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

  const detailHref = buildBusinessDetailHref(business)
  const scanDetailHref = buildBusinessScanDetailHref(business)

  if (scanDetailHref !== `/businesses/${decodeURIComponent(slugAndId)}/tarama`) {
    permanentRedirect(scanDetailHref)
  }

  const [currentSnapshot, latestAgentScan, agentScanHistory, apifyRefreshHistory] = await Promise.all([
    getBusinessDiscoverySnapshot({ id: business.id, name: business.name, district: business.district }),
    getLatestBusinessAgentScan(business.id),
    getBusinessAgentScanHistory(business.id),
    getBusinessRefreshHistory(business.id),
  ])

  const agentHistoryDesc = [...agentScanHistory].reverse()
  const refreshHistoryDesc = [...apifyRefreshHistory].reverse()

  return (
    <AdminShell
      title="Tarama detayı"
      description="Bu işletme için çalışan hafif, ajan ve derin taramaların tüm çıktıları burada görünür."
    >
      <section>
        <article className="card stack-sm">
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div>
              <p className="eyebrow">İşletme</p>
              <h3>{business.name}</h3>
            </div>
            <div className="page-header-actions">
              <Link href={detailHref} className="button-secondary">Profile dön</Link>
              <Link href={`/project-os?businessId=${business.id}#records`} className="button-secondary">İş Takibi</Link>
            </div>
          </div>

          <div className="grid-2" style={{ alignItems: 'start', gap: 20 }}>
            <div style={{ display: 'grid', gap: 14 }}>
              <div className="detail-field">
                <p className="eyebrow">Son dış sinyal</p>
                <p>{currentSnapshot ? formatDateTime(currentSnapshot.source.collectedAt) : 'Henüz yok'}</p>
              </div>
              <div className="detail-field">
                <p className="eyebrow">Son ajan tarama</p>
                <p>{latestAgentScan ? formatDateTime(latestAgentScan.createdAt) : 'Henüz yok'}</p>
              </div>
            </div>

            <div style={{ display: 'grid', gap: 14 }}>
              <div className="detail-field">
                <p className="eyebrow">Dış sinyal geçmişi</p>
                <p>{apifyRefreshHistory.length} kayıt</p>
              </div>
              <div className="detail-field">
                <p className="eyebrow">Ajan tarama geçmişi</p>
                <p>{agentScanHistory.length} kayıt</p>
              </div>
            </div>
          </div>
        </article>
      </section>

      <section className="stack-sm">
        <div>
          <p className="eyebrow">Aktif snapshot</p>
          <h3>Şu an profile yansıyan dış sinyal</h3>
        </div>

        {currentSnapshot ? (
          <DiscoveryCard entry={currentSnapshot} label="Güncel snapshot" />
        ) : (
          <article className="card stack-sm">
            <p className="muted">Henüz tarama verisi yok.</p>
          </article>
        )}
      </section>

      <section className="stack-sm">
        <div>
          <p className="eyebrow">Ajan tarama geçmişi</p>
          <h3>Tüm ajan çıktıları</h3>
        </div>

        {agentHistoryDesc.length > 0 ? agentHistoryDesc.map((entry, index) => (
          <AgentScanCard key={`${entry.createdAt}-${index}`} entry={entry} />
        )) : (
          <article className="card stack-sm">
            <p className="muted">Henüz ajan tarama kaydı yok.</p>
          </article>
        )}
      </section>

      <section className="stack-sm">
        <div>
          <p className="eyebrow">Dış sinyal / Apify geçmişi</p>
          <h3>Tüm hafif ve derin taramalar</h3>
        </div>

        {refreshHistoryDesc.length > 0 ? refreshHistoryDesc.map((entry, index) => (
          <DiscoveryCard key={`${entry.source.collectedAt}-${index}`} entry={entry} label="Geçmiş kayıt" />
        )) : (
          <article className="card stack-sm">
            <p className="muted">Henüz hafif veya derin tarama geçmişi yok.</p>
          </article>
        )}
      </section>
    </AdminShell>
  )
}
