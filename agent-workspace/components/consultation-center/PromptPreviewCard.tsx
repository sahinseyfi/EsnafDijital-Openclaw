'use client'

import { useState } from 'react'

export function PromptPreviewCard({
  promptText,
  fallbackText,
  targetModel,
  promptSummary,
}: {
  promptText: string
  fallbackText: string
  targetModel: 'gpt-5' | 'gpt-5-pro'
  promptSummary: string[]
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
      {promptSummary.length ? (
        <ul className="list">
          {promptSummary.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
      {promptText.trim() ? (
        <pre className="card" style={{ whiteSpace: 'pre-wrap', fontSize: 13 }}>{promptText}</pre>
      ) : (
        <p className="muted">Bu kayıt için GPT Pro prompt'u gerekmiyor.</p>
      )}
    </div>
  )
}
