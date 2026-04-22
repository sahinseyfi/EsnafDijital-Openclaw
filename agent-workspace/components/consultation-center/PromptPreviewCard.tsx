'use client'

import { useState } from 'react'

export function PromptPreviewCard({
  promptText,
  fallbackText,
  targetModel,
  promptSummary,
  promptStatus,
  promptError,
}: {
  promptText: string
  fallbackText: string
  targetModel: 'gpt-5' | 'gpt-5-pro'
  promptSummary: string[]
  promptStatus: 'preparing' | 'ready' | 'error'
  promptError: string | null
}) {
  const [copied, setCopied] = useState(false)

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

  return (
    <div className="card stack-sm">
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}>
        <div>
          <h3>Prompt</h3>
          <p className="muted">Hedef model: {targetModel === 'gpt-5-pro' ? 'GPT-5 Pro' : 'GPT-5'}</p>
        </div>
        {promptText.trim() ? (
          <button type="button" className="button-secondary" onClick={handleCopy}>
            {copied ? 'Kopyalandı' : 'Promptu kopyala'}
          </button>
        ) : null}
      </div>
      <p className="muted">{fallbackText}</p>
      {promptStatus === 'preparing' ? <p className="muted">Agent promptu şimdi hazırlıyor.</p> : null}
      {promptStatus === 'error' ? <p className="muted" style={{ color: 'var(--danger-text)' }}>{promptError || 'Prompt hazırlanırken hata oldu. "Promptu yenile" ile tekrar deneyebilirsin.'}</p> : null}
      {promptSummary.length && promptStatus === 'ready' ? (
        <ul className="list">
          {promptSummary.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
      {promptText.trim() && promptStatus === 'ready' ? (
        <pre className="card" style={{ whiteSpace: 'pre-wrap', fontSize: 13 }}>{promptText}</pre>
      ) : (
        <p className="muted">Henüz hazır prompt yok.</p>
      )}
    </div>
  )
}
