'use client'

import { useCallback, useEffect, useState } from 'react'
import type { AccountCenterPayload, AccountCenterProfile } from '@/lib/account-center/types'
import type { AuthSessionState } from '@/lib/codex-dashboard/types'

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
  })
  const json = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(json.message || 'İstek başarısız oldu')
  }
  return json as T
}

function formatDate(value?: string | null) {
  if (!value) return '—'
  return new Intl.DateTimeFormat('tr-TR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(value))
}

function authStatusText(value?: AuthSessionState['status']) {
  switch (value) {
    case 'awaiting_callback': return 'Doğrulama bekleniyor'
    case 'verifying': return 'Doğrulama sürüyor'
    case 'completed': return 'Tamamlandı'
    case 'error': return 'Hata'
    case 'cancelled': return 'İptal edildi'
    case 'running': return 'Çalışıyor'
    default: return 'Hazırlanıyor'
  }
}

function clampPercent(value?: number | null) {
  if (typeof value !== 'number' || Number.isNaN(value)) return 0
  return Math.max(0, Math.min(100, Math.round(value)))
}

function formatRemainingTime(resetAt?: string | null) {
  if (!resetAt) return 'veri yok'
  const diffMs = new Date(resetAt).getTime() - Date.now()
  if (!Number.isFinite(diffMs) || diffMs <= 0) return 'sıfırlanıyor'

  const totalMinutes = Math.ceil(diffMs / 60000)
  const days = Math.floor(totalMinutes / (60 * 24))
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60)
  const minutes = totalMinutes % 60

  if (days > 0) return `${days}g ${hours}s`
  if (hours > 0) return `${hours}s ${minutes}dk`
  return `${minutes}dk`
}

function resetProgress(resetAt?: string | null, totalHours?: number) {
  if (!resetAt || !totalHours) return 0
  const totalMs = totalHours * 60 * 60 * 1000
  const remainingMs = new Date(resetAt).getTime() - Date.now()
  if (!Number.isFinite(remainingMs) || remainingMs <= 0) return 0
  return Math.max(0, Math.min(100, Math.round((remainingMs / totalMs) * 100)))
}

export function AccountCenter({ initialPayload }: { initialPayload: AccountCenterPayload }) {
  const [payload, setPayload] = useState(initialPayload)
  const [busyKey, setBusyKey] = useState<string | null>(null)
  const [flash, setFlash] = useState<string | null>(null)
  const [errorText, setErrorText] = useState<string | null>(null)
  const [callbackValue, setCallbackValue] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [note, setNote] = useState('')
  const [editingProfileId, setEditingProfileId] = useState<string | null>(null)
  const [editDisplayName, setEditDisplayName] = useState('')
  const [editNote, setEditNote] = useState('')

  const refresh = useCallback(async () => {
    const next = await request<AccountCenterPayload>('/api/hesap-merkezi/status')
    setPayload(next)
    return next
  }, [])

  useEffect(() => {
    if (payload.authSession?.sessionId) return

    const timer = window.setInterval(async () => {
      try {
        const next = await request<AccountCenterPayload>('/api/hesap-merkezi/status')
        setPayload(next)
      } catch {
        // sessiz kal
      }
    }, 30000)

    return () => window.clearInterval(timer)
  }, [payload.authSession?.sessionId])

  useEffect(() => {
    if (!payload.authSession?.sessionId) return

    const timer = window.setInterval(async () => {
      try {
        const authPayload = await request<AccountCenterPayload & { terminal?: boolean }>('/api/hesap-merkezi/auth/status')
        setPayload({ state: authPayload.state, authSession: authPayload.authSession })

        if (authPayload.authSession?.status === 'completed') {
          setFlash(
            authPayload.authSession.canonicalAction === 'updated'
              ? 'Yeni satır açılmadı, mevcut profil güncellendi'
              : authPayload.authSession.canonicalAction === 'saved_separately'
                ? 'Aynı teknik hesaptan ayrı kayıt açıldı'
                : 'Yeni profil kaydedildi',
          )
        }

        if (authPayload.terminal || !authPayload.authSession) {
          if (!authPayload.authSession) {
            setCallbackValue('')
            setDisplayName('')
            setNote('')
          }
        }
      } catch (error: any) {
        setErrorText(error?.message || 'Auth durumu alınamadı')
      }
    }, 2500)

    return () => window.clearInterval(timer)
  }, [payload.authSession?.sessionId])

  const startAuth = useCallback(async () => {
    setBusyKey('start-auth')
    setErrorText(null)
    try {
      const result = await request<AccountCenterPayload & { ok: true; message: string }>('/api/hesap-merkezi/auth/start', { method: 'POST' })
      setPayload({ state: result.state, authSession: result.authSession })
      setFlash(result.message)
    } catch (error: any) {
      setErrorText(error?.message || 'Auth başlatılamadı')
    } finally {
      setBusyKey(null)
    }
  }, [])

  const submitAuth = useCallback(async () => {
    if (!payload.authSession?.sessionId) return
    if (!callbackValue.trim() || !displayName.trim()) {
      setErrorText('Callback ve profil adı zorunlu')
      return
    }

    setBusyKey('submit-auth')
    setErrorText(null)
    try {
      const result = await request<AccountCenterPayload & { ok: true; message: string }>('/api/hesap-merkezi/auth/submit', {
        method: 'POST',
        body: JSON.stringify({
          sessionId: payload.authSession.sessionId,
          callbackValue,
          displayName,
          note,
        }),
      })
      setPayload({ state: result.state, authSession: result.authSession })
      setFlash(result.message)
    } catch (error: any) {
      setErrorText(error?.message || 'Auth kaydı başlatılamadı')
    } finally {
      setBusyKey(null)
    }
  }, [callbackValue, displayName, note, payload.authSession])

  const cancelAuth = useCallback(async () => {
    if (!payload.authSession?.sessionId) return
    setBusyKey('cancel-auth')
    try {
      const result = await request<AccountCenterPayload & { ok: true; message: string }>('/api/hesap-merkezi/auth/cancel', {
        method: 'POST',
        body: JSON.stringify({ sessionId: payload.authSession.sessionId }),
      })
      setPayload({ state: result.state, authSession: result.authSession })
      setCallbackValue('')
      setDisplayName('')
      setNote('')
      setFlash(result.message)
    } catch (error: any) {
      setErrorText(error?.message || 'Auth iptal edilemedi')
    } finally {
      setBusyKey(null)
    }
  }, [payload.authSession])

  const switchProfile = useCallback(async (profileId: string) => {
    setBusyKey(`switch:${profileId}`)
    try {
      const result = await request<AccountCenterPayload & { ok: true; message: string }>('/api/hesap-merkezi/switch', {
        method: 'POST',
        body: JSON.stringify({ profileId }),
      })
      setPayload({ state: result.state, authSession: result.authSession })
      setFlash(result.message)
    } catch (error: any) {
      setErrorText(error?.message || 'Profil değiştirilemedi')
    } finally {
      setBusyKey(null)
    }
  }, [])

  const removeProfile = useCallback(async (profileId: string) => {
    if (!window.confirm('Bu profil silinecek. Devam?')) return
    setBusyKey(`delete:${profileId}`)
    try {
      const result = await request<AccountCenterPayload & { ok: true; message: string }>('/api/hesap-merkezi/delete', {
        method: 'POST',
        body: JSON.stringify({ profileId }),
      })
      setPayload({ state: result.state, authSession: result.authSession })
      setFlash(result.message)
    } catch (error: any) {
      setErrorText(error?.message || 'Profil silinemedi')
    } finally {
      setBusyKey(null)
    }
  }, [])

  const openEdit = useCallback((profile: AccountCenterProfile) => {
    setEditingProfileId(profile.profileId)
    setEditDisplayName(profile.displayName)
    setEditNote(profile.note)
  }, [])

  const saveMeta = useCallback(async (profileId: string) => {
    setBusyKey(`meta:${profileId}`)
    try {
      const result = await request<AccountCenterPayload & { ok: true; message: string }>('/api/hesap-merkezi/meta', {
        method: 'POST',
        body: JSON.stringify({ profileId, displayName: editDisplayName, note: editNote }),
      })
      setPayload({ state: result.state, authSession: result.authSession })
      setEditingProfileId(null)
      setFlash(result.message)
    } catch (error: any) {
      setErrorText(error?.message || 'Profil güncellenemedi')
    } finally {
      setBusyKey(null)
    }
  }, [editDisplayName, editNote])

  return (
    <>
      <section className="hero">
        <div>
          <p className="eyebrow">Yeni sistem / V2</p>
          <h1>Hesap Merkezi</h1>
          <p className="muted">
            Bu ekran sadece gerçek auth kaydı, current seçim ve operatör adı ilişkisini net kurmak için yazıldı.
          </p>
        </div>
      </section>

      {flash ? <section className="card" style={{ marginTop: 16 }}><p>{flash}</p></section> : null}
      {errorText ? <section className="card" style={{ marginTop: 16, borderColor: '#7f1d1d' }}><p>{errorText}</p></section> : null}

      <section className="stats-grid" style={{ marginTop: 24 }}>
        <article className="card stat-card">
          <strong>{payload.state.totalProfiles}</strong>
          <p className="muted">Bu ekran sadece gerçek auth kaydı, current seçim ve operatör adı ilişkisini net kurmak için yazıldı.</p>
        </article>
      </section>

      <section className="card" style={{ marginTop: 24 }}>
        <div className="page-header" style={{ marginBottom: 16 }}>
          <div>
            <h3>Yeni auth ekle</h3>
            <p className="muted">Link üret, giriş yap, callback'i yapıştır, profil adını ver, kaydet.</p>
          </div>
          <button className="button-primary" disabled={busyKey === 'start-auth'} onClick={startAuth}>Yeni auth başlat</button>
        </div>

        {!payload.authSession ? (
          <p className="muted">Şu an aktif auth oturumu yok.</p>
        ) : (
          <div className="stack-form">
            <div className="grid-2 two-col">
              <div className="card">
                <p><strong>Durum:</strong> {authStatusText(payload.authSession.status)}</p>
                <p><strong>Başlangıç:</strong> {formatDate(payload.authSession.startedAt)}</p>
                <p><strong>Session:</strong> {payload.authSession.sessionId}</p>
              </div>
              <div className="card">
                <label className="field">
                  <span>Auth linki</span>
                  <input value={payload.authSession.authUrl} readOnly />
                </label>
                <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
                  <a href={payload.authSession.authUrl} target="_blank" rel="noreferrer" className="button-primary">Linki aç</a>
                  <button className="button-danger" onClick={cancelAuth} disabled={busyKey === 'cancel-auth'}>İptal</button>
                </div>
              </div>
            </div>
            <div className="grid-2 two-col">
              <label className="field two-col-span">
                <span>Dönen callback / kod</span>
                <textarea value={callbackValue} onChange={(event) => setCallbackValue(event.target.value)} />
              </label>
              <label className="field">
                <span>Profil adı</span>
                <input value={displayName} onChange={(event) => setDisplayName(event.target.value)} placeholder="Örn: Workspace1" />
              </label>
              <label className="field">
                <span>Kısa not</span>
                <input value={note} onChange={(event) => setNote(event.target.value)} placeholder="Opsiyonel" />
              </label>
            </div>
            <div>
              <button className="button-primary" onClick={submitAuth} disabled={busyKey === 'submit-auth'}>Profili kaydet</button>
            </div>
          </div>
        )}
      </section>

      <section className="card" style={{ marginTop: 24 }}>
        <div className="page-header" style={{ marginBottom: 16 }}>
          <div>
            <h3>Kayıtlı profiller</h3>
            <p className="muted">Aktif olan üstte durur. Limitler doğrudan profil üzerinden okunur.</p>
          </div>
          <button className="button-secondary" onClick={() => refresh().then(() => setFlash('Liste yenilendi')).catch((error) => setErrorText(error.message))}>Yenile</button>
        </div>

        <div className="profile-list">
          {payload.state.profiles.map((profile) => (
            <article key={profile.profileId} className={`profile-row${profile.current ? ' profile-row-current' : ''}`}>
              <div className="profile-main">
                {editingProfileId === profile.profileId ? (
                  <div className="stack-form">
                    <input value={editDisplayName} onChange={(event) => setEditDisplayName(event.target.value)} />
                    <input value={editNote} onChange={(event) => setEditNote(event.target.value)} placeholder="Not" />
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      <button className="button-primary" onClick={() => saveMeta(profile.profileId)} disabled={busyKey === `meta:${profile.profileId}`}>Kaydet</button>
                      <button className="button-secondary" onClick={() => setEditingProfileId(null)}>Vazgeç</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="profile-title-row">
                      <span className={`profile-light${profile.current ? ' profile-light-active' : ''}`} />
                      <strong>{profile.displayName}</strong>
                      <span className="profile-last-used">Son kullanım: {formatDate(profile.lastUsedAt)}</span>
                    </div>
                    {profile.note ? <div className="muted" style={{ marginTop: 6 }}>{profile.note}</div> : null}
                    {profile.workspaceLabel ? <div className="badge" style={{ marginTop: 8 }}>{profile.workspaceLabel}</div> : null}
                    <div className="profile-limit-stack">
                      <div className="limit-block">
                        <div className="limit-label">5 saat</div>
                        <div className="limit-bar limit-bar-usage">
                          <div className="limit-bar-fill" style={{ width: `${clampPercent(profile.limits?.fiveHourLeftPct)}%` }} />
                          <span className="limit-bar-text">%{clampPercent(profile.limits?.fiveHourLeftPct)} kaldı</span>
                        </div>
                        <div className="limit-bar limit-bar-reset">
                          <div className="limit-bar-fill" style={{ width: `${resetProgress(profile.limits?.fiveHourResetAt, 5)}%` }} />
                          <span className="limit-bar-text">{formatRemainingTime(profile.limits?.fiveHourResetAt)} sonra sıfır</span>
                        </div>
                      </div>

                      <div className="limit-block">
                        <div className="limit-label">Hafta</div>
                        <div className="limit-bar limit-bar-usage">
                          <div className="limit-bar-fill" style={{ width: `${clampPercent(profile.limits?.weekLeftPct)}%` }} />
                          <span className="limit-bar-text">%{clampPercent(profile.limits?.weekLeftPct)} kaldı</span>
                        </div>
                        <div className="limit-bar limit-bar-reset">
                          <div className="limit-bar-fill" style={{ width: `${resetProgress(profile.limits?.weekResetAt, 24 * 7)}%` }} />
                          <span className="limit-bar-text">{formatRemainingTime(profile.limits?.weekResetAt)} sonra sıfır</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="profile-actions">
                <button className="button-primary" disabled={profile.current || busyKey === `switch:${profile.profileId}`} onClick={() => switchProfile(profile.profileId)}>Bu oturumda kullan</button>
                <button className="button-secondary" onClick={() => openEdit(profile)}>Ad / not</button>
                <button className="button-danger" disabled={profile.current || busyKey === `delete:${profile.profileId}`} onClick={() => removeProfile(profile.profileId)}>Sil</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="card" style={{ marginTop: 24 }}>
        <h3>Aynı teknik kayda bağlı profiller</h3>
        {payload.state.duplicateGroups.length === 0 ? (
          <p className="muted">Şu an aynı Account ID / Plan çizgisinde ikinci kayıt yok.</p>
        ) : (
          <div className="duplicate-group-list">
            {payload.state.duplicateGroups.map((group) => (
              <article key={group.canonicalProfileId} className="duplicate-group-item">
                <div className="stack-form" style={{ gap: 8 }}>
                  <strong>Teknik grup</strong>
                  <div className="muted">Account ID: {group.accountId || '—'}</div>
                  <div className="muted">Plan: {group.planType || '—'}</div>
                  <div className="muted">Temel kayıt: <code>{group.canonicalProfileId}</code></div>
                </div>
                <ul className="mini-list" style={{ marginTop: 12 }}>
                  {group.profiles.map((profile) => (
                    <li key={profile.profileId}>
                      <strong>{profile.displayName}</strong> <code>{profile.profileId}</code>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  )
}
