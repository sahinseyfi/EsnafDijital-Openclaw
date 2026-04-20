'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { BusinessRecord, DeliveryProjectRecord } from '@/lib/project-os/types'

const initialState = (businessId?: string) => ({
  businessId: businessId || '',
  status: 'kickoff' as DeliveryProjectRecord['status'],
  scope: '',
})

export function DeliveryProjectCreateForm({ businesses }: { businesses: BusinessRecord[] }) {
  const router = useRouter()
  const [form, setForm] = useState(initialState(businesses[0]?.id))
  const [busy, setBusy] = useState(false)
  const [errorText, setErrorText] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setBusy(true)
    setErrorText(null)

    try {
      const response = await fetch('/api/project-os/delivery-projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })
      const json = await response.json().catch(() => ({})) as { message?: string }

      if (!response.ok) {
        throw new Error(json.message || 'Teslimat kaydı açılamadı')
      }

      setForm(initialState(businesses[0]?.id))
      router.refresh()
    } catch (error: unknown) {
      setErrorText(error instanceof Error ? error.message : 'Teslimat kaydı açılamadı')
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card stack-sm">
      <div>
        <p className="eyebrow">Teslimat akışı</p>
        <h3>Yeni teslimat aç</h3>
        <p className="muted">Onaylanan işi kickoff, build, live veya maintenance durumuyla operasyon hattına bağlar.</p>
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
          <span>Durum</span>
          <select value={form.status} onChange={(event) => setForm((current) => ({ ...current, status: event.target.value as DeliveryProjectRecord['status'] }))}>
            <option value="kickoff">Kickoff</option>
            <option value="building">Building</option>
            <option value="live">Live</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </label>
      </div>

      <label style={{ display: 'grid', gap: 6 }}>
        <span>Kapsam</span>
        <textarea
          value={form.scope}
          onChange={(event) => setForm((current) => ({ ...current, scope: event.target.value }))}
          rows={4}
          placeholder="Örn: Tanıtım sitesi + temel içerik düzeni"
        />
      </label>

      {errorText ? <p className="muted" style={{ color: 'var(--danger-text)' }}>{errorText}</p> : null}
      {businesses.length === 0 ? <p className="muted">Teslimat açmadan önce en az bir işletme kaydı gerekli.</p> : null}

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button type="submit" className="button-secondary" disabled={busy || businesses.length === 0 || !form.businessId || !form.scope.trim()}>
          {busy ? 'Kaydediliyor...' : 'Teslimat kaydı aç'}
        </button>
      </div>
    </form>
  )
}
