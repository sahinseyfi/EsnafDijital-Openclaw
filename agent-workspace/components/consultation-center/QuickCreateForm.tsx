'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function QuickCreateForm() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [note, setNote] = useState('')
  const [busy, setBusy] = useState(false)
  const [errorText, setErrorText] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!note.trim()) {
      setErrorText('Önce neyi değiştirmek istediğini yaz.')
      return
    }

    setBusy(true)
    setErrorText(null)

    try {
      const response = await fetch('/api/consultation-center', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          note,
          type: 'shared',
          workMode: 'decision',
          targetSurface: 'cross',
          outputType: 'gpt_prompt',
        }),
      })
      const json = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(json.message || 'Kayıt oluşturulamadı')
      }

      const createdId = json?.created?.id
      if (!createdId) {
        throw new Error('Yeni kayıt id dönmedi')
      }

      setTitle('')
      setNote('')
      router.replace(`/consultation-center?selectedId=${encodeURIComponent(createdId)}`)
      router.refresh()
    } catch (error: any) {
      setErrorText(error?.message || 'Kayıt oluşturulamadı')
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card" style={{ display: 'grid', gap: 12 }}>
      <div>
        <p className="eyebrow">1. İstek metni</p>
        <h3>Neyi değiştirmek istiyorsun?</h3>
        <p className="muted">Buraya düz metin yaz. Sistem bunu GPT-5 için uygun prompta çevirecek.</p>
      </div>

      <label style={{ display: 'grid', gap: 6 }}>
        <span>Kısa başlık (isteğe bağlı)</span>
        <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Örn: teklif omurgasını sadeleştir" />
      </label>

      <label style={{ display: 'grid', gap: 6 }}>
        <span>Değişiklik isteği</span>
        <textarea
          value={note}
          onChange={(event) => setNote(event.target.value)}
          rows={6}
          placeholder="Ne yapmak istediğini, neden düşündüğünü ve kafandaki soruyu düz metin olarak yaz."
        />
      </label>

      {errorText ? <p className="muted" style={{ color: 'var(--danger-text)' }}>{errorText}</p> : null}

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button type="submit" className="button-primary" disabled={busy}>
          {busy ? 'Hazırlanıyor...' : 'Kaydı aç'}
        </button>
      </div>
    </form>
  )
}
