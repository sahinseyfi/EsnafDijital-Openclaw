'use client'

import { useState } from 'react'

import { BusinessAgentScanButton } from '@/components/businesses/BusinessAgentScanButton'
import { BusinessDiscoveryRefreshButton } from '@/components/businesses/BusinessDiscoveryRefreshButton'
import type { BusinessAgentScanResult } from '@/lib/businesses/agent-scan'
import type { DiscoverySummaryEntry } from '@/lib/businesses/discovery'

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
  {
    key: 'instagram',
    label: 'Instagram',
  },
] as const

type ScanMode = 'agent' | 'apify'
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
    if (source === 'maps-refresh') labels.push('Google Maps')
    if (source === 'yandex') labels.push('Yandex')
    if (source === 'apple-maps') labels.push('Apple Maps')
    if (source === 'google-search') labels.push('Google Search')
    if (source === 'instagram') labels.push('Instagram')
  }

  if (entry.source.googleMapsOptions?.details) labels.push('Google Maps tüm detaylar')
  if (entry.source.googleMapsOptions?.reviews) labels.push('Google Maps yorumlar')

  return labels.length > 0 ? labels : ['Varsayılan tek işletme taraması']
}

export function BusinessScanPanel({
  businessId,
  latestAgentScan,
  agentScanHistory,
  apifyRefreshHistory,
}: {
  businessId: string
  latestAgentScan: BusinessAgentScanResult | null
  agentScanHistory: BusinessAgentScanResult[]
  apifyRefreshHistory: DiscoverySummaryEntry[]
}) {
  const [mode, setMode] = useState<ScanMode>('agent')
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
      label: 'Apify tarama',
      scannedFields: getApifyFieldLabels(entry),
    })),
  ].sort((left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime())

  return (
    <section>
      <article className="card stack-sm">
        <div>
          <p className="eyebrow">Tarama paneli</p>
          <h3>Tarama tipini seç</h3>
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button type="button" className={mode === 'agent' ? 'button-primary' : 'button-secondary'} onClick={() => setMode('agent')}>
            Ajan tarama
          </button>
          <button type="button" className={mode === 'apify' ? 'button-primary' : 'button-secondary'} onClick={() => setMode('apify')}>
            Apify tarama
          </button>
        </div>

        {mode === 'agent' ? (
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
              <p className="eyebrow">Apify tarama</p>
              <h3>Kaynakları seç ve tarat</h3>
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
                helperText="İşaretlenen kaynaklar için Apify taraması başlatılır."
                requestBody={{
                  mode: 'apify',
                  sources: selectedSources,
                  googleMaps: googleMapsOptions,
                }}
              />
            </div>

            {scanHistory.length > 0 ? (
              <div className="card stack-sm" style={{ padding: 14, borderColor: 'var(--line-soft)', background: 'var(--surface)' }}>
                <div>
                  <p className="eyebrow">Tarama geçmişi</p>
                  <p className="muted">Bu işletme için daha önce çalışan ajan ve Apify taramaları.</p>
                </div>

                <div className="stack-xs">
                  {scanHistory.map((entry, index) => (
                    <div key={`${entry.kind}-${entry.createdAt}-${index}`} className="scan-history-row">
                      <div className="detail-field">
                        <p className="eyebrow">Tarama</p>
                        <p>{entry.label}</p>
                      </div>
                      <div className="detail-field">
                        <p className="eyebrow">Zaman</p>
                        <p>{formatScanTime(entry.createdAt)}</p>
                      </div>
                      {entry.status ? (
                        <div className="detail-field">
                          <p className="eyebrow">Durum</p>
                          <p>{entry.status}</p>
                        </div>
                      ) : null}
                      {entry.scannedFields && entry.scannedFields.length > 0 ? (
                        <div className="detail-field" style={{ gridColumn: '1 / -1' }}>
                          <p className="eyebrow">Taranan alanlar</p>
                          <ul className="compact-list">
                            {entry.scannedFields.map((item) => <li key={item}>{item}</li>)}
                          </ul>
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </article>
        )}
      </article>
    </section>
  )
}
