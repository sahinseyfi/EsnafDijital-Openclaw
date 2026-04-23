'use client'

import { useMemo, useState } from 'react'

import { BusinessDiscoveryRefreshButton } from '@/components/businesses/BusinessDiscoveryRefreshButton'
import type { DiscoverySummaryEntry } from '@/lib/businesses/discovery'

const lightSources = [
  {
    key: 'maps-snapshot',
    label: 'Maps / discovery snapshot',
    note: 'Mevcut kayitli dis veri resmini okur.',
  },
  {
    key: 'website-check',
    label: 'Website kontrolu',
    note: 'Site var mi, aciliyor mu, temel sinyal verir.',
  },
  {
    key: 'google-search',
    label: 'Google Search gorunurluk aramasi',
    note: 'Marka ve ilce bazli ilk sinyali toplar.',
  },
  {
    key: 'serp-signals',
    label: 'Ilk sonuc sinyalleri',
    note: 'Telefon, sosyal ve randevu izi arar.',
  },
] as const

const deepSources = [
  {
    key: 'maps-refresh',
    label: 'Google Maps detay yenileme',
    note: 'Detayli isletme verilerini yeniden ceker.',
  },
  {
    key: 'instagram',
    label: 'Instagram',
    note: 'Profil ve temel guven sinyalini arar.',
  },
  {
    key: 'yandex',
    label: 'Yandex',
    note: 'Ek harita ve dizin sinyali arar.',
  },
  {
    key: 'apple-maps',
    label: 'Apple Maps',
    note: 'Ek konum sinyali arar.',
  },
  {
    key: 'review-enrichment',
    label: 'Ek review / website enrichment',
    note: 'Ek yorum ve vitrin izi toplar.',
  },
] as const

type Mode = 'light' | 'deep'

function formatTimelineDate(value: string) {
  return new Intl.DateTimeFormat('tr-TR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value))
}

function getRunState(snapshot: DiscoverySummaryEntry | null, historyCount: number) {
  if (!snapshot) return { label: 'Hazir', tone: 'hazir' }
  if (historyCount === 0) return { label: 'Hazir', tone: 'hazir' }
  if ((snapshot.scoring.reasons || []).length >= 3) return { label: 'Uyari', tone: 'uyari' }
  return { label: 'Basarili', tone: 'basarili' }
}

function getFreshnessLabel(snapshot: DiscoverySummaryEntry | null) {
  if (!snapshot) return 'Snapshot yok'
  const capturedAt = snapshot.candidate.capturedAt || snapshot.source.collectedAt
  const ageMs = Date.now() - new Date(capturedAt).getTime()
  if (ageMs < 1000 * 60 * 60 * 6) return 'Bugun guncel'
  if (ageMs < 1000 * 60 * 60 * 24) return 'Son 24 saat'
  return 'Eski snapshot'
}

function buildDiffLines(current: DiscoverySummaryEntry | null, previous: DiscoverySummaryEntry | null) {
  if (!current || !previous) return []

  const lines: string[] = []
  if (current.candidate.websiteUrl !== previous.candidate.websiteUrl) {
    lines.push(current.candidate.websiteUrl ? `Yeni website sinyali: ${current.candidate.websiteUrl}` : 'Website sinyali kayboldu')
  }
  if (current.candidate.phone !== previous.candidate.phone) {
    lines.push(current.candidate.phone ? `Telefon degisti: ${current.candidate.phone}` : 'Telefon sinyali kayboldu')
  }
  if (current.candidate.reviewsCount !== previous.candidate.reviewsCount || current.candidate.rating !== previous.candidate.rating) {
    lines.push(`Yorum / puan guncellendi: ${current.candidate.reviewsCount} yorum${typeof current.candidate.rating === 'number' ? ` · ${current.candidate.rating.toLocaleString('tr-TR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} puan` : ''}`)
  }
  if (current.candidate.ownershipStatus !== previous.candidate.ownershipStatus) {
    lines.push(`Sahiplik sinyali degisti: ${current.candidate.ownershipStatus}`)
  }
  if (current.candidate.isClosed !== previous.candidate.isClosed) {
    lines.push(current.candidate.isClosed ? 'Kapanma sinyali geldi' : 'Kapali sinyali kalkti')
  }

  return lines
}

export function BusinessScanPanel({
  businessId,
  discoverySnapshot,
  refreshHistory,
}: {
  businessId: string
  discoverySnapshot: DiscoverySummaryEntry | null
  refreshHistory: DiscoverySummaryEntry[]
}) {
  const [mode, setMode] = useState<Mode>('light')
  const [selectedDeepSources, setSelectedDeepSources] = useState<string[]>(deepSources.map((item) => item.key))

  const currentSnapshot = discoverySnapshot
  const previousSnapshot = refreshHistory.length > 1 ? refreshHistory[refreshHistory.length - 2] : null
  const diffLines = useMemo(() => buildDiffLines(currentSnapshot, previousSnapshot), [currentSnapshot, previousSnapshot])
  const runState = getRunState(currentSnapshot, refreshHistory.length)
  const historyItems = [...refreshHistory].reverse().slice(0, 4)

  function toggleDeepSource(key: string) {
    setSelectedDeepSources((current) => current.includes(key)
      ? current.filter((item) => item !== key)
      : [...current, key])
  }

  const activeSourceCount = mode === 'light' ? lightSources.length : selectedDeepSources.length

  return (
    <section>
      <article className="card stack-sm">
        <div>
          <p className="eyebrow">Hazirlik / Tarama</p>
          <h3>Tarama paneli V1</h3>
          <p className="muted">Bu alan ham scrape konsolu degil. Audit veya teklif oncesi, tek kayit icin hangi dis sinyalin cekilmeye deger oldugunu kontrollu sekilde gorunur kilar.</p>
        </div>

        <div className="card" style={{ padding: 16, background: 'var(--surface-subtle)', borderColor: 'var(--line-soft)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              <span className="badge">Son calisma: {currentSnapshot ? formatTimelineDate(currentSnapshot.candidate.capturedAt || currentSnapshot.source.collectedAt) : 'Henuz yok'}</span>
              <span className="badge">Tazelik: {getFreshnessLabel(currentSnapshot)}</span>
              <span className="badge">Durum: {runState.label}</span>
              <span className="badge">Son mod: {refreshHistory.length > 0 ? 'Derin' : 'Hafif'}</span>
            </div>
            <span className="muted">Kanonik business kaydi otomatik override edilmez.</span>
          </div>
        </div>

        <div className="stack-sm">
          <div>
            <p className="eyebrow">Mod secici</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
              <button type="button" className={mode === 'light' ? 'button-primary' : 'button-secondary'} onClick={() => setMode('light')}>Hafif tarama</button>
              <button type="button" className={mode === 'deep' ? 'button-primary' : 'button-secondary'} onClick={() => setMode('deep')}>Derin tarama</button>
            </div>
            {mode === 'deep' ? <p className="muted" style={{ marginTop: 8 }}>Derin tarama secmeli ve daha maliyetli calisir. V1'de kaynak secimi gorunur, arka plan akisi ayni tekli yenileme hattina baglidir.</p> : null}
          </div>

          <div className="grid-2" style={{ alignItems: 'start' }}>
            <article className="card stack-sm" style={{ background: 'var(--surface-subtle)', borderColor: 'var(--line-soft)' }}>
              <div>
                <p className="eyebrow">Kaynak secimi</p>
                <h3>{mode === 'light' ? 'Varsayilan minimum set' : 'Secmeli derin kaynaklar'}</h3>
              </div>
              <div className="stack-xs">
                {mode === 'light' ? lightSources.map((item) => (
                  <label key={item.key} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <input type="checkbox" checked readOnly disabled />
                    <span>
                      <strong style={{ color: 'var(--ink-title)' }}>{item.label}</strong>
                      <span className="muted" style={{ display: 'block' }}>{item.note}</span>
                    </span>
                  </label>
                )) : deepSources.map((item) => (
                  <label key={item.key} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <input type="checkbox" checked={selectedDeepSources.includes(item.key)} onChange={() => toggleDeepSource(item.key)} />
                    <span>
                      <strong style={{ color: 'var(--ink-title)' }}>{item.label}</strong>
                      <span className="muted" style={{ display: 'block' }}>{item.note}</span>
                    </span>
                  </label>
                ))}
              </div>
            </article>

            <article className="card stack-sm" style={{ background: 'var(--surface-subtle)', borderColor: 'var(--line-soft)' }}>
              <div>
                <p className="eyebrow">Tarama aksiyonu</p>
                <h3>Tek primary aksiyon</h3>
              </div>
              <div className="stack-xs">
                <p><strong>Secili mod:</strong> {mode === 'light' ? 'Hafif tarama' : 'Derin tarama'}</p>
                <p><strong>Kaynak sayisi:</strong> {activeSourceCount}</p>
                <p><strong>Beklenti:</strong> {mode === 'light' ? 'Daha hizli audit on hazirligi' : 'Daha yavas ama zenginlestirilmis sinyal toplama'}</p>
              </div>
              <BusinessDiscoveryRefreshButton
                businessId={businessId}
                idleLabel="Tarama baslat"
                loadingLabel="Tarama calisiyor..."
                successLabel="Tarama tamamlandi"
                helperText={mode === 'light' ? 'Yaklasik 1 dk. Maps + arama sinyali ile hizli hazirlik paketi uretir.' : "Yaklasik 1-3 dk. Secmeli kaynaklar gorunur, V1'de arka plan yine tekli yenileme hattina baglidir."}
              />
            </article>
          </div>
        </div>

        <div className="grid-2" style={{ alignItems: 'start' }}>
          <article className="card stack-sm" style={{ background: 'var(--surface-subtle)', borderColor: 'var(--line-soft)' }}>
            <div>
              <p className="eyebrow">Sonuc ozeti</p>
              <h3>Ilk bakista cikan sinyal</h3>
            </div>
            {currentSnapshot ? (
              <div className="stack-xs">
                <p><strong>Ozet:</strong> {currentSnapshot.source.searchCoverageNote}</p>
                <p><strong>Website / telefon:</strong> {currentSnapshot.candidate.hasWebsite ? 'Website var' : 'Website yok'} · {currentSnapshot.candidate.phone || 'Telefon gorunmuyor'}</p>
                <p><strong>Sosyal / randevu izi:</strong> {currentSnapshot.candidate.hasWebsite ? 'Website uzerinden devam eden vitrin izi var' : 'Dogrudan vitrin izi zayif'}</p>
                <p><strong>Tutarlilik:</strong> {currentSnapshot.candidate.name} · {currentSnapshot.candidate.address}</p>
                <p><strong>Kritik bulgular:</strong> {(currentSnapshot.scoring.reasons || []).slice(0, 3).join(', ') || 'Belirgin eksik sinyal yok'}</p>
              </div>
            ) : (
              <p className="muted">Tarama sonucu geldikce bu alan website, telefon, sosyal ve tutarlilik sinyalini tek bakista ozetleyecek.</p>
            )}
          </article>

          {diffLines.length > 0 ? (
            <article className="card stack-sm" style={{ background: 'var(--surface-subtle)', borderColor: 'var(--line-soft)' }}>
              <div>
                <p className="eyebrow">Fark alani</p>
                <h3>Bir onceki calismaya gore degisenler</h3>
              </div>
              <ul className="muted" style={{ margin: 0, paddingLeft: 18 }}>
                {diffLines.map((line) => <li key={line}>{line}</li>)}
              </ul>
            </article>
          ) : null}
        </div>

        <article className="card stack-sm" style={{ background: 'var(--surface-subtle)', borderColor: 'var(--line-soft)' }}>
          <div>
            <p className="eyebrow">Kisa gecmis</p>
            <h3>Son calismalar</h3>
          </div>
          {historyItems.length > 0 ? (
            <div className="stack-sm">
              {historyItems.map((item, index) => (
                <div key={`${item.source.collectedAt}-${index}`} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', paddingBottom: 10, borderBottom: '1px solid var(--line-soft)' }}>
                  <div className="stack-xs">
                    <strong style={{ color: 'var(--ink-title)' }}>{index === 0 ? 'Son calisma' : 'Manuel yenileme'}</strong>
                    <span className="muted">{item.source.matchedSearchTerms.length > 0 ? item.source.matchedSearchTerms.join(', ') : 'Genel arama'} · {item.source.rawRecordCount || 0} kaynak kaydi</span>
                  </div>
                  <div className="stack-xs" style={{ alignItems: 'flex-end' }}>
                    <span className="badge">{formatTimelineDate(item.candidate.capturedAt || item.source.collectedAt)}</span>
                    <span className="muted">{item.scoring.bucket === 'review' ? 'Uyari cikti' : 'Kisa shortlist cikti'}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="muted">Henuz manuel tarama gecmisi yok. Ilk calisma bu alani dolduracak.</p>
          )}
        </article>
      </article>
    </section>
  )
}
