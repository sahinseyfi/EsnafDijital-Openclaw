'use client'

import Link from 'next/link'
import { useState } from 'react'

import { BusinessAgentScanButton } from '@/components/businesses/BusinessAgentScanButton'
import { BusinessDiscoveryRefreshButton } from '@/components/businesses/BusinessDiscoveryRefreshButton'
import type { BusinessAgentScanResult } from '@/lib/businesses/agent-scan'
import type { DiscoverySummaryEntry } from '@/lib/businesses/discovery'

const lightSources = ['maps-snapshot', 'website-check', 'google-search', 'serp-signals'] as const

const apifySources = [
  {
    key: 'google-maps',
    label: 'Google Maps',
  },
  {
    key: 'yandex',
    label: 'Yandex',
  },
  {
    key: 'apple-maps',
    label: 'Apple Maps',
  },
  {
    key: 'google-search',
    label: 'Google Search',
  },
] as const

type ScanMode = 'light' | 'agent' | 'apify'
type GoogleMapsOptions = {
  details: boolean
  reviews: boolean
}

type ScanHistoryItem = {
  kind: 'agent' | 'apify'
  createdAt: string
  label: string
  status?: string
  scannedFields?: string[]
}

function formatScanTime(value: string) {
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

function getApifyFieldLabels(entry: DiscoverySummaryEntry) {
  const labels: string[] = []
  const selectedSources = entry.source.selectedSources || []

  for (const source of selectedSources) {
    if (source === 'google-maps') labels.push('Google Maps')
    if (source === 'maps-refresh' || source === 'maps-snapshot') labels.push('Google Maps snapshot')
    if (source === 'website-check') labels.push('Website kontrolü')
    if (source === 'google-search') labels.push('Google Search')
    if (source === 'serp-signals') labels.push('Arama sinyali')
    if (source === 'yandex') labels.push('Yandex')
    if (source === 'apple-maps') labels.push('Apple Maps')
    if (source === 'instagram') labels.push('Instagram')
  }

  if (entry.source.googleMapsOptions?.details) labels.push('Google Maps tüm detaylar')
  if (entry.source.googleMapsOptions?.reviews) labels.push('Google Maps yorumlar')

  return labels.length > 0 ? labels : ['Varsayılan tek işletme taraması']
}

export function BusinessScanPanel({
  businessId,
  scanDetailHref,
  currentSnapshot,
  latestAgentScan,
  agentScanHistory,
  apifyRefreshHistory,
}: {
  businessId: string
  scanDetailHref: string
  currentSnapshot: DiscoverySummaryEntry | null
  latestAgentScan: BusinessAgentScanResult | null
  agentScanHistory: BusinessAgentScanResult[]
  apifyRefreshHistory: DiscoverySummaryEntry[]
}) {
  const [mode, setMode] = useState<ScanMode>('light')
  const [selectedSources, setSelectedSources] = useState<string[]>(apifySources.map((item) => item.key))
  const [googleMapsOptions, setGoogleMapsOptions] = useState<GoogleMapsOptions>({
    details: false,
    reviews: false,
  })

  function toggleSource(key: string) {
    setSelectedSources((current) => {
      const next = current.includes(key)
        ? current.filter((item) => item !== key)
        : [...current, key]

      if (key === 'google-maps' && !next.includes('google-maps')) {
        setGoogleMapsOptions({ details: false, reviews: false })
      }

      return next
    })
  }

  function toggleGoogleMapsOption(key: keyof GoogleMapsOptions) {
    setGoogleMapsOptions((current) => {
      const next = { ...current, [key]: !current[key] }
      if (key === 'reviews' && !current.reviews) {
        next.details = true
      }
      return next
    })
  }

  const hasGoogleMapsSelected = selectedSources.includes('google-maps')
  const scanHistory: ScanHistoryItem[] = [
    ...agentScanHistory.map((entry) => ({
      kind: 'agent' as const,
      createdAt: entry.createdAt,
      label: 'Ajan tarama',
      status: entry.status,
    })),
    ...apifyRefreshHistory.map((entry) => ({
      kind: 'apify' as const,
      createdAt: entry.source.collectedAt,
      label: entry.source.refreshMode === 'light' ? 'Hafif tarama' : 'Derin tarama',
      scannedFields: getApifyFieldLabels(entry),
    })),
  ].sort((left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime())

  return (
    <section>
      <article className="card stack-sm">
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div>
            <p className="eyebrow">Hazırlık / Tarama</p>
            <h3>Önce hafif tarama ile dış sinyali netleştir</h3>
          </div>
          <Link href={scanDetailHref} className="button-secondary">Tarama detayı</Link>
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button type="button" className={mode === 'light' ? 'button-primary' : 'button-secondary'} onClick={() => setMode('light')}>
            Hafif tarama
          </button>
          <button type="button" className={mode === 'agent' ? 'button-primary' : 'button-secondary'} onClick={() => setMode('agent')}>
            Ajan tarama
          </button>
          <button type="button" className={mode === 'apify' ? 'button-primary' : 'button-secondary'} onClick={() => setMode('apify')}>
            Derin tarama
          </button>
        </div>

        {mode === 'light' ? (
          <article className="card stack-sm" style={{ background: 'var(--surface-subtle)', borderColor: 'var(--line-soft)' }}>
            <div>
              <p className="eyebrow">Hafif tarama</p>
              <h3>Maps, website ve arama sinyalini hızlıca yenile</h3>
            </div>
            <p className="muted">Hazırlık adımıdır. Önce temel eşleşme, website ve görünürlük sinyali tazelenir. Derin tarama sadece ihtiyaç varsa açılır.</p>

            {currentSnapshot ? (
              <div className="card stack-xs" style={{ padding: 14, borderColor: 'var(--line-soft)', background: 'var(--surface)' }}>
                <div className="detail-field">
                  <p className="eyebrow">Son dış sinyal</p>
                  <p>{currentSnapshot.source.searchCoverageNote || 'Dış sinyal notu yok'}</p>
                </div>
                <div className="detail-field">
                  <p className="eyebrow">Website / telefon</p>
                  <p>{currentSnapshot.candidate.hasWebsite ? 'Website var' : 'Website yok'} · {currentSnapshot.candidate.phone ? 'Telefon var' : 'Telefon yok'}</p>
                </div>
                <div className="detail-field">
                  <p className="eyebrow">Puan / yorum</p>
                  <p>{typeof currentSnapshot.candidate.rating === 'number' ? `${currentSnapshot.candidate.rating} · ${currentSnapshot.candidate.reviewsCount} yorum` : 'Puan verisi sınırlı'}</p>
                </div>
              </div>
            ) : (
              <p className="muted">Henüz hafif tarama snapshotı yok.</p>
            )}

            <div className="page-header-actions">
              <BusinessDiscoveryRefreshButton
                businessId={businessId}
                idleLabel="Hafif taramayı başlat"
                loadingLabel="Hafif tarama çalışıyor..."
                successLabel="Hafif tarama tamamlandı"
                helperText="Maps snapshot, website kontrolü ve arama sinyali yenilenir."
                requestBody={{
                  mode: 'light',
                  sources: lightSources,
                }}
              />
            </div>
          </article>
        ) : mode === 'agent' ? (
          <article className="card stack-sm" style={{ background: 'var(--surface-subtle)', borderColor: 'var(--line-soft)' }}>
            <div>
              <p className="eyebrow">Ajan tarama</p>
              <h3>Skill ile çalışan tarama</h3>
            </div>
            <p className="muted">Tek işletme için kısa operasyon özeti üretir. Website, arama ve temel görünürlük sinyalini ajan tarafında yorumlar.</p>

            {latestAgentScan ? (
              <div className="card stack-xs" style={{ padding: 14, borderColor: 'var(--line-soft)', background: 'var(--surface)' }}>
                <div className="detail-field">
                  <p className="eyebrow">Son durum</p>
                  <p>{latestAgentScan.status}</p>
                </div>
                <div className="detail-field">
                  <p className="eyebrow">Kısa özet</p>
                  <p>{latestAgentScan.summary}</p>
                </div>
                {latestAgentScan.findings.length > 0 ? (
                  <div className="detail-field">
                    <p className="eyebrow">Bulgular</p>
                    <ul className="compact-list">
                      {latestAgentScan.findings.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                ) : null}
                {latestAgentScan.risks.length > 0 ? (
                  <div className="detail-field">
                    <p className="eyebrow">Eksikler / riskler</p>
                    <ul className="compact-list">
                      {latestAgentScan.risks.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                ) : null}
                <div className="detail-field">
                  <p className="eyebrow">Önerilen sonraki adım</p>
                  <p>{latestAgentScan.nextStep}</p>
                </div>
              </div>
            ) : (
              <p className="muted">Henüz ajan tarama sonucu yok.</p>
            )}

            <div className="page-header-actions">
              <BusinessAgentScanButton businessId={businessId} />
            </div>
          </article>
        ) : (
          <article className="card stack-sm" style={{ background: 'var(--surface-subtle)', borderColor: 'var(--line-soft)' }}>
            <div>
              <p className="eyebrow">Derin tarama</p>
              <h3>Ek kaynakları seç ve gerektiğinde derinleş</h3>
            </div>

            <div className="stack-sm">
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {apifySources.map((item) => (
                  <label
                    key={item.key}
                    style={{
                      display: 'inline-flex',
                      gap: 8,
                      alignItems: 'center',
                      padding: '8px 12px',
                      border: '1px solid var(--line-soft)',
                      borderRadius: 12,
                      background: 'var(--surface)',
                      cursor: 'pointer',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedSources.includes(item.key)}
                      onChange={() => toggleSource(item.key)}
                      style={{ width: 16, height: 16, margin: 0 }}
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>

              {hasGoogleMapsSelected ? (
                <div className="card stack-xs" style={{ padding: 14, borderColor: 'var(--line-soft)', background: 'var(--surface)' }}>
                  <div>
                    <p className="eyebrow">Google Maps seçenekleri</p>
                    <p className="muted">Google Maps seçiliyken detay ve yorum kapsamını buradan aç.</p>
                  </div>

                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    <label
                      style={{
                        display: 'inline-flex',
                        gap: 8,
                        alignItems: 'center',
                        padding: '8px 12px',
                        border: '1px solid var(--line-soft)',
                        borderRadius: 12,
                        background: 'var(--surface-subtle)',
                        cursor: 'pointer',
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={googleMapsOptions.details}
                        onChange={() => toggleGoogleMapsOption('details')}
                        style={{ width: 16, height: 16, margin: 0 }}
                      />
                      <span>Tüm detaylar</span>
                    </label>

                    <label
                      style={{
                        display: 'inline-flex',
                        gap: 8,
                        alignItems: 'center',
                        padding: '8px 12px',
                        border: '1px solid var(--line-soft)',
                        borderRadius: 12,
                        background: 'var(--surface-subtle)',
                        cursor: 'pointer',
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={googleMapsOptions.reviews}
                        onChange={() => toggleGoogleMapsOption('reviews')}
                        style={{ width: 16, height: 16, margin: 0 }}
                      />
                      <span>Yorumlar</span>
                    </label>
                  </div>

                  <p className="muted">Yorumlar seçilirse Google Maps tarafında tüm yorumlar alınır.</p>
                </div>
              ) : null}
            </div>

            <div className="page-header-actions">
              <BusinessDiscoveryRefreshButton
                businessId={businessId}
                idleLabel="Apify taramayı başlat"
                loadingLabel="Apify tarama çalışıyor..."
                successLabel="Apify tarama tamamlandı"
                helperText="İşaretlenen kaynaklar için Apify taraması başlatılır. Google Maps detay ve yorum kapsamı ayrı açılabilir."
                requestBody={{
                  mode: 'apify',
                  sources: selectedSources,
                  googleMaps: googleMapsOptions,
                }}
              />
            </div>
          </article>
        )}

        {scanHistory.length > 0 ? (
          <div className="card stack-sm" style={{ padding: 14, borderColor: 'var(--line-soft)', background: 'var(--surface)' }}>
            <div>
              <p className="eyebrow">Tarama geçmişi</p>
              <p className="muted">Bu işletme için daha önce çalışan hafif, ajan ve derin taramalar.</p>
            </div>

            <div style={{ display: 'grid', gap: 10 }}>
              {scanHistory.map((entry, index) => (
                <article
                  key={`${entry.kind}-${entry.createdAt}-${index}`}
                  className="card stack-xs"
                  style={{
                    padding: 12,
                    borderColor: 'var(--line-soft)',
                    background: 'var(--surface-subtle)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                    <div>
                      <p className="eyebrow">{entry.label}</p>
                      <p style={{ margin: 0 }}>{formatScanTime(entry.createdAt)}</p>
                    </div>

                    {entry.status ? (
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          minHeight: 28,
                          padding: '4px 10px',
                          borderRadius: 999,
                          border: '1px solid var(--line-soft)',
                          background: 'var(--surface)',
                          fontSize: 13,
                          color: 'var(--text-muted)',
                        }}
                      >
                        {entry.status}
                      </span>
                    ) : null}
                  </div>

                  {entry.scannedFields && entry.scannedFields.length > 0 ? (
                    <div className="detail-field">
                      <p className="eyebrow">Taranan alanlar</p>
                      <ul className="compact-list" style={{ marginTop: 0 }}>
                        {entry.scannedFields.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        ) : null}
      </article>
    </section>
  )
}
