'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import type { ConsultationInboxItem } from '@/lib/consultation-center/types'

function stageLabel(value: string) {
  const labels: Record<string, string> = {
    draft: 'Taslak',
    clarifying: 'Netleşiyor',
    goal_set: 'Hazırlanıyor',
    context_ready: 'Prompt hazır',
    blocked: 'Eksik var',
    internal: 'İçeride çöz',
    external: 'GPT ile düşün',
    ready_to_send: 'Gönderime hazır',
    answered: 'Cevap geldi',
    actioned: 'Karar çıktı',
  }
  return labels[value] || value
}

export function ConsultationInboxList({ items, selectedId }: { items: ConsultationInboxItem[]; selectedId?: string }) {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [errorText, setErrorText] = useState<string | null>(null)

  const handleDelete = async (item: ConsultationInboxItem) => {
    const confirmed = window.confirm(`"${item.title}" kaydını silmek istiyor musun?`)
    if (!confirmed) return

    setDeletingId(item.id)
    setErrorText(null)

    try {
      const response = await fetch(`/api/consultation-center/${encodeURIComponent(item.id)}`, {
        method: 'DELETE',
      })
      const rawText = await response.text()
      const json = rawText ? JSON.parse(rawText) : {}

      if (!response.ok) {
        throw new Error(json.message || rawText || 'Kayıt silinemedi')
      }

      if (selectedId === item.id) {
        router.replace('/consultation-center')
      }
      router.refresh()
    } catch (error: unknown) {
      if (error instanceof SyntaxError) {
        setErrorText('Sunucudan beklenmeyen cevap geldi. Sayfayı yenileyip tekrar dene.')
      } else if (error instanceof Error) {
        setErrorText(error.message || 'Kayıt silinemedi')
      } else {
        setErrorText('Kayıt silinemedi')
      }
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="card">
      <div className="stack-sm">
        <div>
          <p className="eyebrow">Kayıtlar</p>
          <h3>Açık consultation kayıtları</h3>
          <p className="muted">Bir kayıt seç, metni düzenle, promptu al, cevabı işle.</p>
        </div>

        {errorText ? <p className="muted" style={{ color: 'var(--danger-text)' }}>{errorText}</p> : null}

        <div className="stack-sm">
          {items.map((item) => (
            <div key={item.id} className="card consultation-inbox-item" style={{ padding: 16, borderStyle: selectedId === item.id ? 'solid' : 'dashed' }}>
              <div className="consultation-inbox-main">
                <Link prefetch={false} href={`/consultation-center?selectedId=${encodeURIComponent(item.id)}`} className="consultation-inbox-link">
                  <div className="stack-xs">
                    <strong>{item.title}</strong>
                    <p className="muted">{item.summary}</p>
                    <span className="muted">Durum: {stageLabel(item.stage)}</span>
                  </div>
                </Link>

                <div className="consultation-inbox-actions">
                  <button
                    type="button"
                    className="button-secondary consultation-inbox-delete"
                    onClick={() => handleDelete(item)}
                    disabled={deletingId !== null}
                  >
                    {deletingId === item.id ? 'Siliniyor...' : 'Sil'}
                  </button>
                </div>
              </div>
            </div>
          ))}

          {items.length === 0 ? <p className="muted">Henüz kayıt yok.</p> : null}
        </div>
      </div>
    </div>
  )
}
