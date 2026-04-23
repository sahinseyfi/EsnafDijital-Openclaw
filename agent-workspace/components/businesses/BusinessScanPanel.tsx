'use client'

import { useState } from 'react'

import { BusinessDiscoveryRefreshButton } from '@/components/businesses/BusinessDiscoveryRefreshButton'

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

export function BusinessScanPanel({
  businessId,
}: {
  businessId: string
}) {
  const [mode, setMode] = useState<ScanMode>('agent')
  const [selectedSources, setSelectedSources] = useState<string[]>(apifySources.map((item) => item.key))

  function toggleSource(key: string) {
    setSelectedSources((current) => current.includes(key)
      ? current.filter((item) => item !== key)
      : [...current, key])
  }

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
              <h3>Skill ile çalışacak tarama</h3>
            </div>
            <p className="muted">Bu alan sonradan eklenecek skill ile çalışacak. Skill bağlandığında bu işletme için ajan tarama buradan tetiklenecek.</p>
            <div className="page-header-actions">
              <button type="button" className="button-secondary" disabled>Ajan taramayı başlat</button>
            </div>
          </article>
        ) : (
          <article className="card stack-sm" style={{ background: 'var(--surface-subtle)', borderColor: 'var(--line-soft)' }}>
            <div>
              <p className="eyebrow">Apify tarama</p>
              <h3>Kaynakları seç ve tarat</h3>
            </div>

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

            <div className="page-header-actions">
              <BusinessDiscoveryRefreshButton
                businessId={businessId}
                idleLabel="Apify taramayı başlat"
                loadingLabel="Apify tarama çalışıyor..."
                successLabel="Apify tarama tamamlandı"
                helperText="İşaretlenen kaynaklar için Apify taraması başlatılır."
                requestBody={{ mode: 'apify', sources: selectedSources }}
              />
            </div>
          </article>
        )}
      </article>
    </section>
  )
}
