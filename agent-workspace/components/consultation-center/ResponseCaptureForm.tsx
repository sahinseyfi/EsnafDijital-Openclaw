'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { ConsultationDetail } from '@/lib/consultation-center/types'

export function ResponseCaptureForm({ consultation }: { consultation: ConsultationDetail }) {
  const router = useRouter()
  const [modelName, setModelName] = useState(consultation.promptRun.modelName || 'gpt-5')
  const [promptText, setPromptText] = useState(consultation.promptRun.promptText || '')
  const [responseText, setResponseText] = useState(consultation.promptRun.responseSummary || '')
  const [decisionNote, setDecisionNote] = useState(String(consultation.sharedBrief?.kararNotu || ''))
  const [busy, setBusy] = useState(false)
  const [errorText, setErrorText] = useState<string | null>(null)
  const [successText, setSuccessText] = useState<string | null>(null)

  useEffect(() => {
    setModelName(consultation.promptRun.modelName || 'gpt-5')
    setPromptText(consultation.promptRun.promptText || '')
    setResponseText(consultation.promptRun.responseSummary || '')
    setDecisionNote(String(consultation.sharedBrief?.kararNotu || ''))
    setErrorText(null)
    setSuccessText(null)
  }, [consultation])

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

      setSuccessText('Cevap ve karar kaydedildi')
      router.refresh()
    } catch (error: any) {
      setErrorText(error?.message || 'Cevap ve karar kaydedilemedi')
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card stack-sm">
      <div>
        <p className="eyebrow">3. Cevap ve karar</p>
        <h3>GPT cevabını işle</h3>
        <p className="muted">GPT cevabını yapıştır. Altına kendi karar notunu yaz. Bu kayıt artık karar üretmiş olsun.</p>
      </div>

      <label style={{ display: 'grid', gap: 6 }}>
        <span>Model</span>
        <input value={modelName} onChange={(event) => setModelName(event.target.value)} placeholder="gpt-5" />
      </label>

      <label style={{ display: 'grid', gap: 6 }}>
        <span>Gönderilen prompt</span>
        <textarea value={promptText} onChange={(event) => setPromptText(event.target.value)} rows={8} />
      </label>

      <label style={{ display: 'grid', gap: 6 }}>
        <span>GPT cevabı</span>
        <textarea value={responseText} onChange={(event) => setResponseText(event.target.value)} rows={8} placeholder="GPT'den gelen cevabı buraya yapıştır." />
      </label>

      <label style={{ display: 'grid', gap: 6 }}>
        <span>Çıkan karar</span>
        <textarea value={decisionNote} onChange={(event) => setDecisionNote(event.target.value)} rows={4} placeholder="Bu cevaptan çıkan net kararı kısa yaz." />
      </label>

      {errorText ? <p className="muted" style={{ color: 'var(--danger-text)' }}>{errorText}</p> : null}
      {successText ? <p className="muted" style={{ color: 'var(--accent-700)' }}>{successText}</p> : null}

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button type="submit" className="button-primary" disabled={busy || !responseText.trim()}>
          {busy ? 'Kaydediliyor...' : 'Cevap ve kararı kaydet'}
        </button>
      </div>
    </form>
  )
}
