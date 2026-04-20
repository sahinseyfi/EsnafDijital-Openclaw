'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { BusinessRecord } from '@/lib/project-os/types'

const initialState = {
  name: '',
  segment: 'berber' as BusinessRecord['segment'],
  district: 'Arnavutköy',
  ownerName: '',
  status: 'lead' as BusinessRecord['status'],
}

export function BusinessCreateForm() {
  const router = useRouter()
  const [form, setForm] = useState(initialState)
  const [busy, setBusy] = useState(false)
  const [errorText, setErrorText] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setBusy(true)
    setErrorText(null)

    try {
      const response = await fetch('/api/project-os/businesses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })
      const json = await response.json().catch(() => ({})) as { message?: string }

      if (!response.ok) {
        throw new Error(json.message || 'İşletme kaydı açılamadı')
      }

      setForm(initialState)
      router.refresh()
    } catch (error: unknown) {
      setErrorText(error instanceof Error ? error.message : 'İşletme kaydı açılamadı')
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card stack-sm">
      <div>
        <p className="eyebrow">Hızlı kayıt</p>
        <h3>Yeni işletme aç</h3>
        <p className="muted">Project OS hattına yeni işletmeyi hızlıca ekler. Veritabanı yoksa mock store’a yazar.</p>
      </div>

      <label style={{ display: 'grid', gap: 6 }}>
        <span>İşletme adı</span>
        <input value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} placeholder="Örn: Mavi Makas Berber" />
      </label>

      <div className="grid-2">
        <label style={{ display: 'grid', gap: 6 }}>
          <span>Segment</span>
          <select value={form.segment} onChange={(event) => setForm((current) => ({ ...current, segment: event.target.value as BusinessRecord['segment'] }))}>
            <option value="berber">Berber</option>
            <option value="guzellik">Güzellik</option>
            <option value="kafe-restoran">Kafe / Restoran</option>
            <option value="diger">Diğer</option>
          </select>
        </label>

        <label style={{ display: 'grid', gap: 6 }}>
          <span>Durum</span>
          <select value={form.status} onChange={(event) => setForm((current) => ({ ...current, status: event.target.value as BusinessRecord['status'] }))}>
            <option value="lead">Lead</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
          </select>
        </label>
      </div>

      <div className="grid-2">
        <label style={{ display: 'grid', gap: 6 }}>
          <span>İlçe</span>
          <input value={form.district} onChange={(event) => setForm((current) => ({ ...current, district: event.target.value }))} placeholder="Örn: Arnavutköy" />
        </label>

        <label style={{ display: 'grid', gap: 6 }}>
          <span>İşletme sahibi</span>
          <input value={form.ownerName} onChange={(event) => setForm((current) => ({ ...current, ownerName: event.target.value }))} placeholder="Örn: Sefa Usta" />
        </label>
      </div>

      {errorText ? <p className="muted" style={{ color: 'var(--danger-text)' }}>{errorText}</p> : null}

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button type="submit" className="button-secondary" disabled={busy || !form.name.trim() || !form.ownerName.trim() || !form.district.trim()}>
          {busy ? 'Kaydediliyor...' : 'İşletme kaydı aç'}
        </button>
      </div>
    </form>
  )
}
