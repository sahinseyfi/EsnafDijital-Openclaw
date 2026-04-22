'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { OFFER_PACKAGES, getOfferPackageByKey, type OfferPackageKey } from '@/lib/project-os/offer-packages'
import type { BusinessRecord, OfferRecord } from '@/lib/project-os/types'

const initialState = (businessId?: string) => ({
  businessId: businessId || '',
  status: 'draft' as OfferRecord['status'],
  packageKey: 'paket-1' as OfferPackageKey,
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
        <p className="muted">Audit sonrası paket ve tutarı netleştirip teklifi Project OS omurgasına bağlar.</p>
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
            <option value="draft">Draft</option>
            <option value="sent">Sent</option>
            <option value="approved">Approved</option>
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

      <label style={{ display: 'grid', gap: 6 }}>
        <span>Tutar (₺)</span>
        <input value={form.amountTry} onChange={(event) => setForm((current) => ({ ...current, amountTry: event.target.value }))} inputMode="numeric" placeholder="Orn: 18000" />
      </label>

      {errorText ? <p className="muted" style={{ color: 'var(--danger-text)' }}>{errorText}</p> : null}
      {businesses.length === 0 ? <p className="muted">Teklif açmadan önce en az bir işletme kaydı gerekli.</p> : null}

      <p className="muted">Paket 0 audit / demo tarafinda kalir. Offer kaydi icinde Paket 1-4 ve bakim serisi secilir.</p>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button type="submit" className="button-secondary" disabled={busy || businesses.length === 0 || !form.businessId || !form.amountTry.trim()}>
          {busy ? 'Kaydediliyor...' : 'Teklif kaydı aç'}
        </button>
      </div>
    </form>
  )
}
