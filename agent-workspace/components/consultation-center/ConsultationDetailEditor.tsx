'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { ConsultationDetail } from '@/lib/consultation-center/types'

export function ConsultationDetailEditor({ consultation }: { consultation: ConsultationDetail }) {
  const router = useRouter()
  const [title, setTitle] = useState(consultation.title)
  const [summary, setSummary] = useState(consultation.summary)
  const [targetModel, setTargetModel] = useState<'gpt-5' | 'gpt-5-pro'>(consultation.promptRun.modelName === 'gpt-5' ? 'gpt-5' : 'gpt-5-pro')
  const [busyAction, setBusyAction] = useState<'suggest' | 'save' | null>(null)
  const [errorText, setErrorText] = useState<string | null>(null)
  const [successText, setSuccessText] = useState<string | null>(null)

  useEffect(() => {
    setTitle(consultation.title)
    setSummary(consultation.summary)
    setTargetModel(consultation.promptRun.modelName === 'gpt-5' ? 'gpt-5' : 'gpt-5-pro')
    setErrorText(null)
    setSuccessText(null)
  }, [consultation])

  const handleSave = async () => {
    setBusyAction('save')
    setErrorText(null)
    setSuccessText(null)

    try {
      const response = await fetch(`/api/consultation-center/${encodeURIComponent(consultation.id)}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          summary,
          targetModel,
          sharedBrief: {
            ...(consultation.sharedBrief || {}),
            hamNot: summary.trim(),
            targetModel,
          },
        }),
      })
      const rawText = await response.text()
      const json = rawText ? JSON.parse(rawText) : {}

      if (!response.ok) {
        throw new Error(json.message || rawText || 'Metin kaydedilemedi')
      }

      setSuccessText('Metin kaydedildi')
      router.refresh()
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        setErrorText('Sunucudan beklenmeyen cevap geldi. Sayfayı yenileyip tekrar dene.')
      } else if (error?.name === 'TypeError') {
        setErrorText('Sunucuya ulaşılamadı. Bağlantı ya da servis geçici olarak düşmüş olabilir.')
      } else {
        setErrorText(error?.message || 'Metin kaydedilemedi')
      }
    } finally {
      setBusyAction(null)
    }
  }

  const handleSuggest = async () => {
    setBusyAction('suggest')
    setErrorText(null)
    setSuccessText(null)

    try {
      const response = await fetch(`/api/consultation-center/${encodeURIComponent(consultation.id)}/suggest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, summary, targetModel }),
      })
      const rawText = await response.text()
      const json = rawText ? JSON.parse(rawText) : {}

      if (!response.ok) {
        throw new Error(json.message || rawText || 'Prompt hazırlanamadı')
      }

      setSuccessText('Prompt yenilendi')
      router.refresh()
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        setErrorText('Sunucudan beklenmeyen cevap geldi. Sayfayı yenileyip tekrar dene.')
      } else if (error?.name === 'TypeError') {
        setErrorText('Sunucuya ulaşılamadı. Bağlantı ya da servis geçici olarak düşmüş olabilir.')
      } else {
        setErrorText(error?.message || 'Prompt hazırlanamadı')
      }
    } finally {
      setBusyAction(null)
    }
  }

  const handleDelete = async () => {
    const confirmed = window.confirm(`"${consultation.title}" kaydını silmek istiyor musun?`)
    if (!confirmed) return

    setBusyAction('save')
    setErrorText(null)
    setSuccessText(null)

    try {
      const response = await fetch(`/api/consultation-center/${encodeURIComponent(consultation.id)}`, {
        method: 'DELETE',
      })
      const rawText = await response.text()
      const json = rawText ? JSON.parse(rawText) : {}

      if (!response.ok) {
        throw new Error(json.message || rawText || 'Kayıt silinemedi')
      }

      router.replace('/consultation-center')
      router.refresh()
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        setErrorText('Sunucudan beklenmeyen cevap geldi. Sayfayı yenileyip tekrar dene.')
      } else if (error?.name === 'TypeError') {
        setErrorText('Sunucuya ulaşılamadı. Bağlantı ya da servis geçici olarak düşmüş olabilir.')
      } else {
        setErrorText(error?.message || 'Kayıt silinemedi')
      }
    } finally {
      setBusyAction(null)
    }
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        void handleSave()
      }}
      className="card stack-sm"
    >
      <div>
        <p className="eyebrow">2. Metni prompta çevir</p>
        <h3>Ne yapmak istediğini yaz</h3>
        <p className="muted">Metni güncelle. Sistem sıfır hafızalı GPT oturumu için promptu yeniden kursun.</p>
      </div>

      <label style={{ display: 'grid', gap: 6 }}>
        <span>Kısa başlık</span>
        <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Kısa konu adı" />
      </label>

      <label style={{ display: 'grid', gap: 6 }}>
        <span>Değişiklik isteği</span>
        <textarea
          value={summary}
          onChange={(event) => setSummary(event.target.value)}
          rows={8}
          placeholder="Yapmak istediğin değişikliği, kafandaki soru işaretlerini ve neyi tartmak istediğini düz metin yaz."
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
        <p className="muted">GPT-5 Pro seçili. Cevap geç gelebilir, bu yüzden prompt daha eksiksiz hazırlanır.</p>
      ) : (
        <p className="muted">GPT-5 seçili. Prompt daha kısa ve daha hızlı akışa göre kurulur.</p>
      )}

      {errorText ? <p className="muted" style={{ color: 'var(--danger-text)' }}>{errorText}</p> : null}
      {successText ? <p className="muted" style={{ color: 'var(--accent-700)' }}>{successText}</p> : null}

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
        <button type="button" className="button-secondary" disabled={busyAction !== null} onClick={handleDelete} style={{ color: 'var(--danger-text)', borderColor: 'rgba(220, 38, 38, 0.28)' }}>
          {busyAction === 'save' ? 'İşleniyor...' : 'Kaydı sil'}
        </button>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button type="submit" className="button-secondary" disabled={busyAction !== null}>
            {busyAction === 'save' ? 'Kaydediliyor...' : 'Metni kaydet'}
          </button>
          <button type="button" className="button-primary" disabled={busyAction !== null || !summary.trim()} onClick={handleSuggest}>
            {busyAction === 'suggest' ? 'Prompt hazırlanıyor...' : 'Promptu yenile'}
          </button>
        </div>
      </div>
    </form>
  )
}
