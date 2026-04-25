'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

export function PromptPreparationEffect({
  consultationId,
  title,
  summary,
  targetModel,
  promptStatus,
  promptText,
}: {
  consultationId: string
  title: string
  summary: string
  targetModel: 'gpt-5' | 'gpt-5-pro'
  promptStatus: 'preparing' | 'ready' | 'error'
  promptText: string
}) {
  const router = useRouter()
  const attemptedRef = useRef<string | null>(null)

  useEffect(() => {
    if (promptStatus !== 'preparing') return
    if (promptText.trim()) return
    if (attemptedRef.current === consultationId) return

    attemptedRef.current = consultationId

    void fetch(`/api/prompt-uretimi/${encodeURIComponent(consultationId)}/suggest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, summary, targetModel }),
    }).finally(() => {
      router.refresh()
    })
  }, [consultationId, promptStatus, promptText, router, summary, targetModel, title])

  useEffect(() => {
    if (promptStatus !== 'preparing') return

    const refreshTimer = window.setInterval(() => {
      router.refresh()
    }, 5000)

    return () => window.clearInterval(refreshTimer)
  }, [promptStatus, router])

  return null
}
