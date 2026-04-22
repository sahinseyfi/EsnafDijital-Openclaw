'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

type Props = {
  placeId: string
  initiallyShortlisted: boolean
  importInfo?: {
    businessId: string
    auditId: string
  } | null
  payload: {
    placeId: string
    name: string
    segment: string
    district: string
    address: string
    categoryName: string
    phone: string
    websiteUrl: string
    reviewsCount: number
    score: number
    matchedSearchTerms: string[]
  }
}

export function DiscoveryRowActions({ placeId, initiallyShortlisted, importInfo, payload }: Props) {
  const router = useRouter()
  const [isShortlisted, setIsShortlisted] = useState(initiallyShortlisted)
  const [currentImport, setCurrentImport] = useState(importInfo)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  async function toggleShortlist() {
    setIsSubmitting(true)
    setMessage(null)

    try {
      const response = await fetch('/api/discovery/shortlist', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ placeId, shortlisted: !isShortlisted }),
      })
      const result = await response.json()

      if (!response.ok || !result.ok) {
        throw new Error(result.message || 'Shortlist guncellenemedi.')
      }

      setIsShortlisted(!isShortlisted)
      setMessage(!isShortlisted ? 'Shortliste eklendi' : 'Shortlistten cikarildi')
      router.refresh()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Shortlist guncellenemedi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  async function importToProjectOs() {
    setIsSubmitting(true)
    setMessage(null)

    try {
      const response = await fetch('/api/discovery/import', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const result = await response.json()

      if (!response.ok || !result.ok) {
        throw new Error(result.message || 'Project OS import basarisiz oldu.')
      }

      setCurrentImport(result.import)
      setIsShortlisted(true)
      setMessage('Project OSa aktarildi')
      router.refresh()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Project OS import basarisiz oldu.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="stack-xs">
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        <button type="button" className="button-secondary" style={{ minHeight: 36, padding: '8px 12px' }} onClick={toggleShortlist} disabled={isSubmitting}>
          {isShortlisted ? 'Shortlistten cikar' : 'Shortlist al'}
        </button>
        <button type="button" className="button-primary" style={{ minHeight: 36, padding: '8px 12px' }} onClick={importToProjectOs} disabled={isSubmitting || Boolean(currentImport)}>
          {currentImport ? 'Aktarildi' : 'Project OSa aktar'}
        </button>
      </div>
      {currentImport ? (
        <span className="muted">Business {currentImport.businessId.slice(0, 8)} ve audit {currentImport.auditId.slice(0, 8)} acildi.</span>
      ) : null}
      {message ? <span className="muted">{message}</span> : null}
    </div>
  )
}
