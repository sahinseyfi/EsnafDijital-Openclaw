'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { getConsultationClientMessage } from '@/lib/consultation-center/messages'

export function QuickCreateForm() {
  const router = useRouter()
  const [expanded, setExpanded] = useState(true)
  const [title, setTitle] = useState('')
  const [note, setNote] = useState('')
  const [targetModel, setTargetModel] = useState<'gpt-5' | 'gpt-5-pro'>('gpt-5-pro')
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
          targetModel,
        }),
      })
      const json = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(json.message || 'Kayıt oluşturulamadı')
      }

      const createdId = json?.created?.id
      if (!createdId) {
        throw new Error('Yeni kayıt kimliği dönmedi')
      }

      setTitle('')
      setNote('')
      router.replace(`/consultation-center?selectedId=${encodeURIComponent(createdId)}`)
      router.refresh()
    } catch (error: unknown) {
      setErrorText(getConsultationClientMessage(error, 'Kayıt oluşturulamadı'))
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card" style={{ display: 'grid', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
        <div>
          <p className="eyebrow">1. İstek metni</p>
          <h3>Neyi değiştirmek istiyorsun?</h3>
          <p className="muted">Buraya düz metin yazın. Kayıt açılınca sistem uygun bağlamı seçip promptu hazırlayacak.</p>
        </div>
        <button
          type="button"
          className="button-secondary"
          onClick={() => setExpanded((current) => !current)}
          aria-expanded={expanded}
          aria-controls="consultation-quick-create-fields"
          style={{ whiteSpace: 'nowrap' }}
        >
          {expanded ? 'Kapat' : 'Aç'}
        </button>
      </div>

      {expanded ? (
        <>
          <label style={{ display: 'grid', gap: 6 }}>
            <span>Kısa başlık (isteğe bağlı)</span>
            <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Örn: teklif omurgasını sadeleştir" />
          </label>

          <div id="consultation-quick-create-fields" style={{ display: 'grid', gap: 12 }}>
            <label style={{ display: 'grid', gap: 6 }}>
              <span>Değişiklik isteği</span>
              <textarea
                value={note}
                onChange={(event) => setNote(event.target.value)}
                rows={6}
                placeholder="Ne yapmak istediğini, neden düşündüğünü ve kafandaki soruyu düz metin olarak yaz."
              />
            </label>

            <label style={{ display: 'grid', gap: 6 }}>
              <span>Hedef model</span>
              <select value={targetModel} onChange={(event) => setTargetModel(event.target.value === 'gpt-5' ? 'gpt-5' : 'gpt-5-pro')}>
                <option value="gpt-5-pro">GPT-5 Pro</option>
                <option value="gpt-5">GPT-5</option>
              </select>
            </label>

            {targetModel === 'gpt-5-pro' ? (
              <p className="muted">GPT-5 Pro varsayılan seçili. Cevap yaklaşık 30 dakika sürebilir, bu yüzden prompt daha dikkatli hazırlanır.</p>
            ) : (
              <p className="muted">GPT-5 daha hızlı akış için uygundur. Sistem promptu daha kompakt kurar.</p>
            )}

            {errorText ? <p className="muted" style={{ color: 'var(--danger-text)' }}>{errorText}</p> : null}

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button type="submit" className="button-primary" disabled={busy}>
                {busy ? 'Kayıt açılıyor, prompt hazırlanıyor...' : 'Kaydı aç'}
              </button>
            </div>
          </div>
        </>
      ) : null}
    </form>
  )
}
