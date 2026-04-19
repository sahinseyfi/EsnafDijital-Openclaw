'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function QuickCreateForm() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [type, setType] = useState<'sales' | 'technical' | 'shared'>('shared')
  const [note, setNote] = useState('')
  const [busy, setBusy] = useState(false)
  const [errorText, setErrorText] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setBusy(true)
    setErrorText(null)

    try {
      const response = await fetch('/api/consultation-center', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, type, note }),
      })
      const json = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(json.message || 'Consultation oluşturulamadı')
      }

      const createdId = json?.created?.id
      if (createdId) {
        router.push(`/consultation-center?selectedId=${encodeURIComponent(createdId)}`)
      }
      router.refresh()
      setTitle('')
      setNote('')
    } catch (error: any) {
      setErrorText(error?.message || 'Consultation oluşturulamadı')
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card" style={{ display: 'grid', gap: 12 }}>
      <div>
        <p className="eyebrow">Quick create</p>
        <h3>Yeni consultation aç</h3>
        <p className="muted">Ham notu bırak, karar brief'ine çevirmeyi sonra detay ekranında yap.</p>
      </div>

      <label style={{ display: 'grid', gap: 6 }}>
        <span>Başlık</span>
        <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Örn: İlk teklif paketlerini sadeleştir" />
      </label>

      <label style={{ display: 'grid', gap: 6 }}>
        <span>Tip</span>
        <select value={type} onChange={(event) => setType(event.target.value as 'sales' | 'technical' | 'shared')}>
          <option value="shared">Ortak karar</option>
          <option value="sales">Saha / satış</option>
          <option value="technical">Teknik</option>
        </select>
      </label>

      <label style={{ display: 'grid', gap: 6 }}>
        <span>Ham not</span>
        <textarea value={note} onChange={(event) => setNote(event.target.value)} rows={5} placeholder="Dağınık notu bırak, sonra netleştir." />
      </label>

      {errorText ? <p className="muted" style={{ color: 'var(--danger-text)' }}>{errorText}</p> : null}

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button type="submit" className="button-primary" disabled={busy}>
          {busy ? 'Oluşturuluyor...' : 'Consultation oluştur'}
        </button>
      </div>
    </form>
  )
}
