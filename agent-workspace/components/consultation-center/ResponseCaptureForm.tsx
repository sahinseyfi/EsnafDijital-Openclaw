'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { ConsultationDetail } from '@/lib/consultation-center/types'
import { getConsultationClientMessage } from '@/lib/consultation-center/messages'

export function ResponseCaptureForm({ consultation }: { consultation: ConsultationDetail }) {
  const router = useRouter()
  const [modelName, setModelName] = useState<'gpt-5' | 'gpt-5-pro'>(consultation.promptRun.modelName === 'gpt-5' ? 'gpt-5' : 'gpt-5-pro')
  const [promptText, setPromptText] = useState(consultation.promptRun.promptText || '')
  const [responseText, setResponseText] = useState(consultation.promptRun.responseSummary || '')
  const [decisionNote, setDecisionNote] = useState(String(consultation.sharedBrief?.kararNotu || ''))
  const [busy, setBusy] = useState(false)
  const [errorText, setErrorText] = useState<string | null>(null)
  const [successText, setSuccessText] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setBusy(true)
    setErrorText(null)
    setSuccessText(null)

    try {
      const saveDecision = await fetch(`/api/consultation-center/${encodeURIComponent(consultation.id)}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sharedBrief: {
            ...(consultation.sharedBrief || {}),
            kararNotu: decisionNote.trim(),
          },
        }),
      })
      const saveDecisionText = await saveDecision.text()
      const saveDecisionJson = saveDecisionText ? JSON.parse(saveDecisionText) : {}

      if (!saveDecision.ok) {
        throw new Error(saveDecisionJson.message || 'Karar notu kaydedilemedi')
      }

      const saveRun = await fetch(`/api/consultation-center/${encodeURIComponent(consultation.id)}/run`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ modelName, promptText, responseSummary: responseText }),
      })
      const saveRunJson = await saveRun.json().catch(() => ({}))

      if (!saveRun.ok) {
        throw new Error(saveRunJson.message || 'GPT cevabı kaydedilemedi')
      }

      setSuccessText('Cevap ile karar notu kaydedildi')
      router.refresh()
    } catch (error: unknown) {
      setErrorText(getConsultationClientMessage(error, 'Cevap ile karar notu kaydedilemedi'))
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card stack-sm">
      <div>
        <p className="eyebrow">3. Cevap ve karar</p>
        <h3>GPT cevabını işle</h3>
        <p className="muted">Gelen cevabı yapıştırın. Altına kendi karar notunuzu yazın. Böylece kayıt net bir karara bağlansın.</p>
      </div>

      <label style={{ display: 'grid', gap: 6 }}>
        <span>Model</span>
        <select value={modelName} onChange={(event) => setModelName(event.target.value === 'gpt-5' ? 'gpt-5' : 'gpt-5-pro')}>
          <option value="gpt-5-pro">GPT-5 Pro</option>
          <option value="gpt-5">GPT-5</option>
        </select>
      </label>

      {modelName === 'gpt-5-pro' ? (
        <p className="muted">Bu kayıtta hedef model GPT-5 Pro. Cevabı kaydederken aynı model bilgisini koruyacağız.</p>
      ) : (
        <p className="muted">Bu kayıtta hedef model GPT-5. Daha hızlı akış için bu seçim korunacak.</p>
      )}

      <label style={{ display: 'grid', gap: 6 }}>
        <span>Gönderilen prompt</span>
        <textarea value={promptText} onChange={(event) => setPromptText(event.target.value)} rows={8} />
      </label>

      <label style={{ display: 'grid', gap: 6 }}>
        <span>GPT cevabı</span>
        <textarea value={responseText} onChange={(event) => setResponseText(event.target.value)} rows={8} placeholder="GPT'den gelen cevabı buraya yapıştırın." />
      </label>

      <label style={{ display: 'grid', gap: 6 }}>
        <span>Çıkan karar</span>
        <textarea value={decisionNote} onChange={(event) => setDecisionNote(event.target.value)} rows={4} placeholder="Bu cevaptan çıkan net kararı kısa yaz." />
      </label>

      {errorText ? <p className="muted" style={{ color: 'var(--danger-text)' }}>{errorText}</p> : null}
      {successText ? <p className="muted" style={{ color: 'var(--accent-700)' }}>{successText}</p> : null}

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button type="submit" className="button-primary" disabled={busy || !responseText.trim()}>
          {busy ? 'Kaydediliyor...' : 'Cevap ile kararı kaydet'}
        </button>
      </div>
    </form>
  )
}
