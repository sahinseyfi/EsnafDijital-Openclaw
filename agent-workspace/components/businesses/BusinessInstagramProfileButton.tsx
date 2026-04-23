'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function BusinessInstagramProfileButton({
  businessId,
}: {
  businessId: string
}) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  async function handleClick() {
    setIsSubmitting(true)
    setMessage(null)

    try {
      const response = await fetch(`/api/businesses/${businessId}/instagram-profile-scrape`, {
        method: 'POST',
      })

      const result = await response.json().catch(() => ({})) as { ok?: boolean; message?: string }
      if (!response.ok || !result.ok) {
        throw new Error(result.message || 'Instagram taramasi basarisiz oldu.')
      }

      setMessage('Instagram profili guncellendi')
      router.refresh()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Instagram taramasi basarisiz oldu.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="stack-xs" style={{ alignItems: 'flex-end' }}>
      <button
        type="button"
        className="button-secondary"
        onClick={handleClick}
        disabled={isSubmitting}
        style={{ width: 'auto', minHeight: 36, padding: '8px 12px' }}
      >
        {isSubmitting ? 'Tariyor...' : 'Tara'}
      </button>
      {message ? <span className="muted">{message}</span> : null}
    </div>
  )
}
