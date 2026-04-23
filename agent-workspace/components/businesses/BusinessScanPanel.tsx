'use client'

import { useState } from 'react'

import { BusinessAgentScanButton } from '@/components/businesses/BusinessAgentScanButton'
import { BusinessDiscoveryRefreshButton } from '@/components/businesses/BusinessDiscoveryRefreshButton'
import type { BusinessAgentScanResult } from '@/lib/businesses/agent-scan'

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

type ScanMode = 'agent' | 'apify'
type GoogleMapsOptions = {
  details: boolean
  reviews: boolean
}

export function BusinessScanPanel({
  businessId,
  latestAgentScan,
}: {
  businessId: string
  latestAgentScan: BusinessAgentScanResult | null
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
          </article>
        )}
      </article>
    </section>
  )
}
