'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export function PromptPreviewCard({
  consultationId,
  title,
  summary,
  promptText,
  fallbackText,
  targetModel,
  promptSummary,
  promptStatus,
  promptError,
}: {
  consultationId: string
  title: string
  summary: string
  promptText: string
  fallbackText: string
  targetModel: 'gpt-5' | 'gpt-5-pro'
  promptSummary: string[]
  promptStatus: 'preparing' | 'ready' | 'error'
  promptError: string | null
}) {
  const router = useRouter()
  const [copied, setCopied] = useState(false)
  const [changeRequest, setChangeRequest] = useState('')
  const [busy, setBusy] = useState(false)
  const [changeError, setChangeError] = useState<string | null>(null)
  const [successText, setSuccessText] = useState<string | null>(null)

  useEffect(() => {
    setBusy(false)
    setChangeError(null)
    setSuccessText(null)
  }, [consultationId, promptText, promptStatus])

  const handleCopy = async () => {
    if (!promptText.trim()) return
    try {
      await navigator.clipboard.writeText(promptText)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  const handleSuggestChange = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!changeRequest.trim()) {
      setChangeError('Önce promptta neyi değiştirmek istediğini yaz.')
      return
    }

    setBusy(true)
    setChangeError(null)
    setSuccessText(null)

    try {
      const response = await fetch(`/api/consultation-center/${encodeURIComponent(consultationId)}/suggest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          summary,
          targetModel,
          changeRequest,
        }),
      })
      const json = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(json.message || 'Prompt yeniden düzenlenemedi')
      }

      setChangeRequest('')
      setSuccessText('Prompt isteğine göre yeniden düzenlendi')
      router.refresh()
    } catch (error: any) {
      setChangeError(error?.message || 'Prompt yeniden düzenlenemedi')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="card stack-sm">
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}>
        <div>
          <h3>Prompt</h3>
          <p className="muted">Hedef model: {targetModel === 'gpt-5-pro' ? 'GPT-5 Pro' : 'GPT-5'}</p>
        </div>
        {promptText.trim() && promptStatus === 'ready' ? (
          <button type="button" className="button-secondary" onClick={handleCopy}>
            {copied ? 'Kopyalandı' : 'Promptu kopyala'}
          </button>
        ) : null}
      </div>
      <p className="muted">{fallbackText}</p>
      {promptStatus === 'preparing' ? <p className="muted">Sistem promptu şimdi hazırlıyor.</p> : null}
      {promptStatus === 'error' ? <p className="muted" style={{ color: 'var(--danger-text)' }}>{promptError || 'Prompt hazırlanırken hata oldu. "Promptu yenile" ile tekrar deneyebilirsin.'}</p> : null}
      {promptSummary.length && promptStatus === 'ready' ? (
        <ul className="list">
          {promptSummary.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
      {promptText.trim() && promptStatus === 'ready' ? (
        <>
          <pre className="card" style={{ whiteSpace: 'pre-wrap', fontSize: 13 }}>{promptText}</pre>

          <form onSubmit={handleSuggestChange} className="card stack-sm">
            <div>
              <strong>Değişiklik öner</strong>
              <p className="muted">Promptta neyin değişmesini istediğini kısa yaz. Sistem promptu buna göre yeniden düzenlesin.</p>
            </div>
            <textarea
              value={changeRequest}
              onChange={(event) => setChangeRequest(event.target.value)}
              rows={3}
              placeholder="Örn: Daha kısa olsun, teknik dili azalt, çıktı kısmını daha net yaz."
            />
            {changeError ? <p className="muted" style={{ color: 'var(--danger-text)' }}>{changeError}</p> : null}
            {successText ? <p className="muted" style={{ color: 'var(--accent-700)' }}>{successText}</p> : null}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button type="submit" className="button-secondary" disabled={busy}>
                {busy ? 'Yeniden düzenleniyor...' : 'Promptu yeniden düzenle'}
              </button>
            </div>
          </form>
        </>
      ) : (
        <p className="muted">Henüz hazır prompt yok.</p>
      )}
    </div>
  )
}
