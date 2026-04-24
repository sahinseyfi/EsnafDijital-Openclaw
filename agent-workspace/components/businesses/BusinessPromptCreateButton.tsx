'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function BusinessPromptCreateButton({
  title,
  note,
  idleLabel = 'Prompt kaydını aç',
  loadingLabel = 'Prompt kaydı açılıyor...',
  helperText = 'Y.Z raporunu karar promptuna çevirip Prompt Üretimi ekranına taşır.',
}: {
  title: string
  note: string
  idleLabel?: string
  loadingLabel?: string
  helperText?: string
}) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  async function handleClick() {
    setIsSubmitting(true)
    setMessage(null)

    try {
      const response = await fetch('/api/prompt-uretimi', {
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
          targetModel: 'gpt-5-pro',
        }),
      })

      const result = await response.json().catch(() => ({})) as {
        ok?: boolean
        message?: string
        created?: { id?: string }
      }

      if (!response.ok || !result.ok || !result.created?.id) {
        throw new Error(result.message || 'Prompt kaydı açılamadı.')
      }

      router.push(`/prompt-uretimi?selectedId=${encodeURIComponent(result.created.id)}`)
      router.refresh()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Prompt kaydı açılamadı.')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="stack-xs" style={{ alignItems: 'flex-start' }}>
      <button type="button" className="button-primary" onClick={handleClick} disabled={isSubmitting}>
        {isSubmitting ? loadingLabel : idleLabel}
      </button>
      <span className="muted">{helperText}</span>
      {message ? <span className="muted">{message}</span> : null}
    </div>
  )
}
