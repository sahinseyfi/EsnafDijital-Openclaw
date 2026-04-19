'use client'

import { useState } from 'react'

export function PromptPreviewCard({ promptText, fallbackText }: { promptText: string; fallbackText: string }) {
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
        <h3>Prompt / sonuç</h3>
        {promptText.trim() ? (
          <button type="button" className="button-secondary" onClick={handleCopy}>
            {copied ? 'Kopyalandı' : 'Promptu kopyala'}
          </button>
        ) : null}
      </div>
      <p className="muted">{fallbackText}</p>
      {promptText.trim() ? (
        <pre className="card" style={{ whiteSpace: 'pre-wrap', fontSize: 13 }}>{promptText}</pre>
      ) : (
        <p className="muted">Bu kayıt için GPT Pro prompt'u gerekmiyor.</p>
      )}
    </div>
  )
}
