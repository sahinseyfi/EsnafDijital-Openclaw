'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { AuditRecord, BusinessRecord } from '@/lib/project-os/types'

const initialState = (businessId?: string) => ({
  businessId: businessId || '',
  status: 'new' as AuditRecord['status'],
  channelReadiness: 'dusuk' as AuditRecord['channelReadiness'],
  summary: '',
})

export function AuditCreateForm({ businesses }: { businesses: BusinessRecord[] }) {
  const router = useRouter()
  const [form, setForm] = useState(initialState(businesses[0]?.id))
  const [busy, setBusy] = useState(false)
  const [errorText, setErrorText] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setBusy(true)
    setErrorText(null)

    try {
      const response = await fetch('/api/project-os/audits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })
      const json = await response.json().catch(() => ({})) as { message?: string }

      if (!response.ok) {
        throw new Error(json.message || 'Audit kaydı açılamadı')
      }

      setForm(initialState(businesses[0]?.id))
      router.refresh()
    } catch (error: unknown) {
      setErrorText(error instanceof Error ? error.message : 'Audit kaydı açılamadı')
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card stack-sm">
      <div>
        <p className="eyebrow">Audit akışı</p>
        <h3>Yeni audit aç</h3>
        <p className="muted">İşletme seç, ilk hazırlık seviyesini yaz ve teklif öncesi somut durumu İş Takibi içine bağla.</p>
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
          <span>Hazırlık seviyesi</span>
          <select value={form.channelReadiness} onChange={(event) => setForm((current) => ({ ...current, channelReadiness: event.target.value as AuditRecord['channelReadiness'] }))}>
            <option value="dusuk">Düşük</option>
            <option value="orta">Orta</option>
            <option value="iyi">İyi</option>
          </select>
        </label>

        <label style={{ display: 'grid', gap: 6 }}>
          <span>Durum</span>
          <select value={form.status} onChange={(event) => setForm((current) => ({ ...current, status: event.target.value as AuditRecord['status'] }))}>
            <option value="new">Yeni</option>
            <option value="reviewed">İncelendi</option>
            <option value="offered">Teklife taşındı</option>
          </select>
        </label>
      </div>

      <label style={{ display: 'grid', gap: 6 }}>
        <span>Kısa audit özeti</span>
        <textarea
          value={form.summary}
          onChange={(event) => setForm((current) => ({ ...current, summary: event.target.value }))}
          rows={4}
          placeholder="Örn: Google görünürlüğü zayıf, temel iletişim bilgileri dağınık."
        />
      </label>

      {errorText ? <p className="muted" style={{ color: 'var(--danger-text)' }}>{errorText}</p> : null}
      {businesses.length === 0 ? <p className="muted">Audit açmadan önce en az bir işletme kaydı gerekli.</p> : null}

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button type="submit" className="button-secondary" disabled={busy || businesses.length === 0 || !form.businessId || !form.summary.trim()}>
          {busy ? 'Kaydediliyor...' : 'Audit kaydı aç'}
        </button>
      </div>
    </form>
  )
}
