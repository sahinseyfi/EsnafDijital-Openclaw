'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { getConsultationClientMessage, humanizeConsultationMessage } from '@/lib/prompt-uretimi/messages'

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
  primaryTask,
  whyPrimaryNow,
  promptStrategy,
  secondaryTasks,
  parkedQuestions,
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
  primaryTask: string
  whyPrimaryNow: string
  promptStrategy: 'single_prompt' | 'split_recommended'
  secondaryTasks: string[]
  parkedQuestions: string[]
}) {
  const router = useRouter()
  const [copied, setCopied] = useState(false)
  const [changeRequest, setChangeRequest] = useState('')
  const [busy, setBusy] = useState(false)
  const [changeError, setChangeError] = useState<string | null>(null)
  const [successText, setSuccessText] = useState<string | null>(null)

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
      setChangeError('Önce promptta neyin değişmesini istediğinizi yazın.')
      return
    }

    setBusy(true)
    setChangeError(null)
    setSuccessText(null)

    try {
      const response = await fetch(`/api/prompt-uretimi/${encodeURIComponent(consultationId)}/suggest`, {
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
      setSuccessText('Prompt isteğine göre güncellendi')
      router.refresh()
    } catch (error: unknown) {
      setChangeError(getConsultationClientMessage(error, 'Prompt yeniden düzenlenemedi'))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="card stack-sm">
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div>
          <h3>Prompt</h3>
          <p className="muted">Hedef model: {targetModel === 'gpt-5-pro' ? 'GPT-5 Pro' : 'GPT-5'}</p>
          <p className="muted">Hazırlama skill'i: consultation-prompt-builder</p>
        </div>
        {promptText.trim() && promptStatus === 'ready' ? (
          <button type="button" className="button-secondary" onClick={handleCopy}>
            {copied ? 'Kopyalandı' : 'Promptu kopyala'}
          </button>
        ) : null}
      </div>
      <p className="muted">{fallbackText}</p>
      {promptStatus === 'preparing' ? <p className="muted">Prompt şu anda hazırlanıyor.</p> : null}
      {promptStatus === 'error' ? <p className="muted" style={{ color: 'var(--danger-text)' }}>{humanizeConsultationMessage(promptError, 'Prompt hazırlanırken bir sorun çıktı. "Promptu yeniden kur" ile tekrar deneyebilirsiniz.')}</p> : null}
      {promptSummary.length && promptStatus === 'ready' ? (
        <ul className="list">
          {promptSummary.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
      {promptStatus === 'ready' ? (
        <div className="card stack-xs">
          <div>
            <strong>Ana görev</strong>
            <p className="muted">{primaryTask || 'Henüz çıkarılmadı.'}</p>
          </div>
          <div>
            <strong>Prompt stratejisi</strong>
            <p className="muted">{promptStrategy === 'split_recommended' ? 'Bölmek daha sağlıklı, bu tur tek ana prompt kuruldu.' : 'Tek prompt çizgisi korundu.'}</p>
          </div>
          {whyPrimaryNow ? (
            <div>
              <strong>Neden şimdi bu görev?</strong>
              <p className="muted">{whyPrimaryNow}</p>
            </div>
          ) : null}
          {secondaryTasks.length > 0 ? (
            <div>
              <strong>İkincil görevler</strong>
              <ul className="list">
                {secondaryTasks.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}
          {parkedQuestions.length > 0 ? (
            <div>
              <strong>Park edilen sorular</strong>
              <ul className="list">
                {parkedQuestions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      ) : null}
      {promptText.trim() && promptStatus === 'ready' ? (
        <>
          <pre className="card" style={{ whiteSpace: 'pre-wrap', fontSize: 12.5 }}>{promptText}</pre>

          <form onSubmit={handleSuggestChange} className="card stack-sm">
            <div>
              <strong>Değişiklik öner</strong>
              <p className="muted">Promptta neyin değişmesini istediğinizi kısa yazın. Sistem buna göre promptu yeniden kursun.</p>
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
                {busy ? 'Yeniden kuruluyor...' : 'Promptu yeniden kur'}
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
