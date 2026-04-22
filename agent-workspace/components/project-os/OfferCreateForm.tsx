'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { OFFER_ADDONS, OFFER_PACKAGES, getOfferPackageByKey, type OfferAddonKey, type OfferPackageKey } from '@/lib/project-os/offer-packages'
import type { BusinessRecord, OfferRecord } from '@/lib/project-os/types'

const initialState = (businessId?: string) => ({
  businessId: businessId || '',
  status: 'draft' as OfferRecord['status'],
  packageKey: 'paket-1' as OfferPackageKey,
  addonKeys: [] as OfferAddonKey[],
  domainPreference: 'subdomain' as OfferRecord['domainPreference'],
  customDomain: '',
  amountTry: '',
})

export function OfferCreateForm({ businesses }: { businesses: BusinessRecord[] }) {
  const router = useRouter()
  const [form, setForm] = useState(initialState(businesses[0]?.id))
  const [busy, setBusy] = useState(false)
  const [errorText, setErrorText] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setBusy(true)
    setErrorText(null)

    try {
      const selectedPackage = getOfferPackageByKey(form.packageKey)
      const response = await fetch('/api/project-os/offers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          businessId: form.businessId,
          status: form.status,
          packageName: selectedPackage.name,
          amountTry: Number(form.amountTry),
          addonKeys: form.addonKeys,
          domainPreference: form.domainPreference,
          customDomain: form.customDomain.trim(),
        }),
      })
      const json = await response.json().catch(() => ({})) as { message?: string }

      if (!response.ok) {
        throw new Error(json.message || 'Teklif kaydı açılamadı')
      }

      setForm(initialState(businesses[0]?.id))
      router.refresh()
    } catch (error: unknown) {
      setErrorText(error instanceof Error ? error.message : 'Teklif kaydı açılamadı')
    } finally {
      setBusy(false)
    }
  }

  const selectedPackage = getOfferPackageByKey(form.packageKey)

  return (
    <form onSubmit={handleSubmit} className="card stack-sm">
      <div>
        <p className="eyebrow">Teklif akışı</p>
        <h3>Yeni teklif aç</h3>
        <p className="muted">Audit sonrası paket ve tutarı netleştirip teklifi İş Takibi omurgasına bağlar.</p>
      </div>

      <label style={{ display: 'grid', gap: 6 }}>
        <span>İşletme</span>
        <select
          value={form.businessId}
          onChange={(event) => setForm((current) => ({ ...current, businessId: event.target.value }))}
          disabled={businesses.length === 0}
        >
          {businesses.length > 0 ? businesses.map((business) => (
            <option key={business.id} value={business.id}>{business.name}</option>
          )) : <option value="">Önce işletme kaydı aç</option>}
        </select>
      </label>

      <div className="grid-2">
        <label style={{ display: 'grid', gap: 6 }}>
          <span>Teklif omurgasi</span>
          <select value={form.packageKey} onChange={(event) => setForm((current) => ({ ...current, packageKey: event.target.value as OfferPackageKey }))}>
            {OFFER_PACKAGES.map((item) => (
              <option key={item.key} value={item.key}>{item.name}</option>
            ))}
          </select>
        </label>

        <label style={{ display: 'grid', gap: 6 }}>
          <span>Durum</span>
          <select value={form.status} onChange={(event) => setForm((current) => ({ ...current, status: event.target.value as OfferRecord['status'] }))}>
            <option value="draft">Taslak</option>
            <option value="sent">Gönderildi</option>
            <option value="approved">Onaylandı</option>
          </select>
        </label>
      </div>

      <article className="card stack-sm" style={{ background: 'var(--surface-subtle)', borderColor: 'var(--line-soft)' }}>
        <div>
          <p className="eyebrow">Secili teklif omurgasi</p>
          <strong style={{ color: 'var(--ink-title)' }}>{selectedPackage.name}</strong>
        </div>
        <p className="muted">{selectedPackage.description}</p>
        <ul className="list">
          {selectedPackage.includes.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </article>

      <div className="grid-2">
        <label style={{ display: 'grid', gap: 6 }}>
          <span>Domain tercihi</span>
          <select value={form.domainPreference} onChange={(event) => setForm((current) => ({ ...current, domainPreference: event.target.value as OfferRecord['domainPreference'] }))}>
            <option value="subdomain">Alt alan adı</option>
            <option value="custom-domain">Ozel domain</option>
          </select>
        </label>

        <label style={{ display: 'grid', gap: 6 }}>
          <span>Tutar (₺)</span>
          <input value={form.amountTry} onChange={(event) => setForm((current) => ({ ...current, amountTry: event.target.value }))} inputMode="numeric" placeholder="Orn: 18000" />
        </label>
      </div>

      {form.domainPreference === 'custom-domain' ? (
        <label style={{ display: 'grid', gap: 6 }}>
          <span>Ozel domain</span>
          <input value={form.customDomain} onChange={(event) => setForm((current) => ({ ...current, customDomain: event.target.value }))} placeholder="Orn: atakuafor.com.tr" />
        </label>
      ) : null}

      <fieldset className="card stack-sm" style={{ background: 'var(--surface-subtle)', borderColor: 'var(--line-soft)' }}>
        <legend className="eyebrow" style={{ padding: '0 6px' }}>Opsiyonel ekler</legend>
        {OFFER_ADDONS.map((item) => {
          const checked = form.addonKeys.includes(item.key)
          return (
            <label key={item.key} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <input
                type="checkbox"
                checked={checked}
                onChange={() => setForm((current) => ({
                  ...current,
                  addonKeys: checked ? current.addonKeys.filter((key) => key !== item.key) : [...current.addonKeys, item.key],
                }))}
              />
              <span>
                <strong style={{ color: 'var(--ink-title)' }}>{item.label}</strong>
                <span className="muted" style={{ display: 'block' }}>{item.description}</span>
              </span>
            </label>
          )
        })}
      </fieldset>

      {errorText ? <p className="muted" style={{ color: 'var(--danger-text)' }}>{errorText}</p> : null}
      {businesses.length === 0 ? <p className="muted">Teklif açmadan önce en az bir işletme kaydı gerekli.</p> : null}

      <p className="muted">Paket 0 audit ve demo tarafında kalır. Teklif kaydı içinde Paket 1-4 ve bakım serisi seçilir. Domain tercihi ve opsiyonel ekler bu kayıtta tutulur.</p>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button type="submit" className="button-secondary" disabled={busy || businesses.length === 0 || !form.businessId || !form.amountTry.trim()}>
          {busy ? 'Kaydediliyor...' : 'Teklif kaydı aç'}
        </button>
      </div>
    </form>
  )
}
