'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { ConsultationDetail } from '@/lib/consultation-center/types'

export function ResponseCaptureForm({ consultation }: { consultation: ConsultationDetail }) {
  const router = useRouter()
  const [modelName, setModelName] = useState(consultation.promptRun.modelName || 'gpt-pro')
  const [promptText, setPromptText] = useState(consultation.promptRun.promptText || '')
  const [responseSummary, setResponseSummary] = useState(consultation.promptRun.responseSummary || '')
  const [busy, setBusy] = useState(false)
  const [errorText, setErrorText] = useState<string | null>(null)
  const [successText, setSuccessText] = useState<string | null>(null)

  useEffect(() => {
    setModelName(consultation.promptRun.modelName || 'gpt-pro')
    setPromptText(consultation.promptRun.promptText || '')
    setResponseSummary(consultation.promptRun.responseSummary || '')
    setErrorText(null)
    setSuccessText(null)
  }, [consultation])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setBusy(true)
    setErrorText(null)
    setSuccessText(null)

    try {
      const response = await fetch(`/api/consultation-center/${encodeURIComponent(consultation.id)}/run`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ modelName, promptText, responseSummary }),
      })
      const json = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(json.message || 'Sonuç kaydedilemedi')
      }

      setSuccessText('Sonuç kaydedildi')
      router.refresh()
    } catch (error: any) {
      setErrorText(error?.message || 'Sonuç kaydedilemedi')
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card stack-sm">
      <div>
        <p className="eyebrow">Sonuç kaydı</p>
        <h3>GPT çıktısını işle</h3>
        <p className="muted">Promptu ve kısa cevap özetini kaydet. Sistem stage'i answered yapar.</p>
      </div>

      <label style={{ display: 'grid', gap: 6 }}>
        <span>Model</span>
        <input value={modelName} onChange={(event) => setModelName(event.target.value)} placeholder="gpt-pro" />
      </label>

      <label style={{ display: 'grid', gap: 6 }}>
        <span>Gönderilen prompt</span>
        <textarea value={promptText} onChange={(event) => setPromptText(event.target.value)} rows={8} />
      </label>

      <label style={{ display: 'grid', gap: 6 }}>
        <span>Kısa cevap özeti</span>
        <textarea value={responseSummary} onChange={(event) => setResponseSummary(event.target.value)} rows={5} placeholder="Öneri, karar ve ilk aksiyonları kısa yaz." />
      </label>

      {errorText ? <p className="muted" style={{ color: 'var(--danger-text)' }}>{errorText}</p> : null}
      {successText ? <p className="muted" style={{ color: 'var(--accent-700)' }}>{successText}</p> : null}

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button type="submit" className="button-secondary" disabled={busy || !responseSummary.trim()}>
          {busy ? 'Kaydediliyor...' : 'Sonucu kaydet'}
        </button>
      </div>
    </form>
  )
}
