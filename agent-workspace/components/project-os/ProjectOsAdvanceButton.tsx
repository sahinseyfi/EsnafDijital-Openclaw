'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import type { ProjectOsQueueAdvanceAction } from '@/lib/project-os/derived'

function getRoute(action: ProjectOsQueueAdvanceAction) {
  if (action.entityType === 'audit') return `/api/project-os/audits/${action.entityId}`
  if (action.entityType === 'offer') return `/api/project-os/offers/${action.entityId}`
  return `/api/project-os/delivery-projects/${action.entityId}`
}

export function ProjectOsAdvanceButton({ action }: { action: ProjectOsQueueAdvanceAction }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  async function handleClick() {
    setIsSubmitting(true)
    setMessage(null)

    try {
      const response = await fetch(getRoute(action), {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ status: action.nextStatus }),
      })
      const result = await response.json().catch(() => ({})) as { ok?: boolean; message?: string }

      if (!response.ok || !result.ok) {
        throw new Error(result.message || 'Durum ilerletilemedi.')
      }

      setMessage('Durum ilerletildi')
      router.refresh()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Durum ilerletilemedi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="stack-xs">
      <button type="button" className="button-primary" onClick={handleClick} disabled={isSubmitting}>
        {isSubmitting ? 'Kaydediliyor...' : action.label}
      </button>
      {message ? <span className="muted">{message}</span> : null}
    </div>
  )
}
