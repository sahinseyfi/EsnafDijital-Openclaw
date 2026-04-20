'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import type { ConsultationInboxItem } from '@/lib/consultation-center/types'

function sectionTitle(value: string) {
  if (value === 'sales') return 'Saha / satış'
  if (value === 'technical') return 'Teknik'
  return 'Ortak karar'
}

function stageLabel(value: string) {
  const labels: Record<string, string> = {
    draft: 'Taslak',
    clarifying: 'Netleştiriliyor',
    goal_set: 'Hedef net',
    context_ready: 'Bağlam hazır',
    blocked: 'Blocked',
    internal: 'İçeride çöz',
    external: 'Dış danışma',
    ready_to_send: 'Gönderime hazır',
    answered: 'Cevap geldi',
    actioned: 'Aksiyona döndü',
  }
  return labels[value] || value
}

function routeLabel(value: string) {
  if (value === 'blocked') return 'Önce içeride netleştir'
  if (value === 'internal') return 'GPT Pro gerekmez'
  return 'GPT Pro aç'
}

function ownerLabel(value: string) {
  if (value === 'user') return 'Kullanıcı işi'
  if (value === 'tech_agent') return 'Teknik ajan işi'
  return 'Ortak karar'
}

export function ConsultationInboxList({ items, selectedId }: { items: ConsultationInboxItem[]; selectedId?: string }) {
  const [routeFilter, setRouteFilter] = useState<'all' | 'blocked' | 'internal' | 'external'>('all')
  const [typeFilter, setTypeFilter] = useState<'all' | 'sales' | 'technical' | 'shared'>('all')
  const [ownerFilter, setOwnerFilter] = useState<'all' | 'user' | 'tech_agent' | 'shared'>('all')

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (routeFilter !== 'all' && item.route !== routeFilter) return false
      if (typeFilter !== 'all' && item.type !== typeFilter) return false
      if (ownerFilter !== 'all' && item.ownerRole !== ownerFilter) return false
      return true
    })
  }, [items, ownerFilter, routeFilter, typeFilter])

  return (
    <div className="card">
      <div className="stack-sm">
        <div>
          <p className="eyebrow">Consultation Inbox</p>
          <h3>Açık kayıtlar</h3>
        </div>

        <details>
          <summary className="muted" style={{ cursor: 'pointer' }}>Filtreler ({filteredItems.length} kayıt)</summary>
          <div className="grid-3" style={{ marginTop: 12 }}>
            <label style={{ display: 'grid', gap: 6 }}>
              <span>Route</span>
              <select value={routeFilter} onChange={(event) => setRouteFilter(event.target.value as typeof routeFilter)}>
                <option value="all">Tümü</option>
                <option value="blocked">Blocked</option>
                <option value="internal">Internal</option>
                <option value="external">External</option>
              </select>
            </label>
            <label style={{ display: 'grid', gap: 6 }}>
              <span>Tip</span>
              <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value as typeof typeFilter)}>
                <option value="all">Tümü</option>
                <option value="sales">Saha / satış</option>
                <option value="technical">Teknik</option>
                <option value="shared">Ortak karar</option>
              </select>
            </label>
            <label style={{ display: 'grid', gap: 6 }}>
              <span>Sahiplik</span>
              <select value={ownerFilter} onChange={(event) => setOwnerFilter(event.target.value as typeof ownerFilter)}>
                <option value="all">Tümü</option>
                <option value="user">Kullanıcı işi</option>
                <option value="tech_agent">Teknik ajan işi</option>
                <option value="shared">Ortak karar</option>
              </select>
            </label>
          </div>
        </details>

        <div className="stack-sm">
          {filteredItems.map((item) => (
            <Link key={item.id} href={`/consultation-center?selectedId=${encodeURIComponent(item.id)}`} className="card" style={{ padding: 16, borderStyle: selectedId === item.id ? 'solid' : 'dashed', display: 'block' }}>
              <div className="stack-xs">
                <strong>{item.title}</strong>
                <p className="muted">{item.summary}</p>
              </div>
              <div className="stack-xs muted" style={{ marginTop: 10 }}>
                <span>Tip: {sectionTitle(item.type)}</span>
                <span>Stage: {stageLabel(item.stage)}</span>
                <span>Route: {routeLabel(item.route)}</span>
                <span>Sahiplik: {ownerLabel(item.ownerRole)}</span>
              </div>
            </Link>
          ))}
          {filteredItems.length === 0 ? <p className="muted">Bu filtrelerle kayıt bulunamadı.</p> : null}
        </div>
      </div>
    </div>
  )
}
