'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
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

  const currentProfile = useMemo(
    () => payload.state.profiles.find((profile) => profile.current) || null,
    [payload.state.profiles],
  )

  const refresh = useCallback(async () => {
    const next = await request<AccountCenterPayload>('/api/hesap-merkezi/status')
    setPayload(next)
    return next
  }, [])

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
          <p className="muted">kayıtlı gerçek auth profili</p>
        </article>
        <article className="card stat-card">
          <strong>{payload.state.currentDisplayName || 'Yok'}</strong>
          <p className="muted">bu oturumda aktif profil</p>
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
            <p className="muted">Bir satır = tek gerçek auth kaydı.</p>
          </div>
          <button className="button-secondary" onClick={() => refresh().then(() => setFlash('Liste yenilendi')).catch((error) => setErrorText(error.message))}>Yenile</button>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Görünen ad</th>
                <th>Current</th>
                <th>Email</th>
                <th>Account ID</th>
                <th>Plan</th>
                <th>Profil ID</th>
                <th>İşlem</th>
              </tr>
            </thead>
            <tbody>
              {payload.state.profiles.map((profile) => (
                <tr key={profile.profileId}>
                  <td>
                    {editingProfileId === profile.profileId ? (
                      <div className="stack-form">
                        <input value={editDisplayName} onChange={(event) => setEditDisplayName(event.target.value)} />
                        <input value={editNote} onChange={(event) => setEditNote(event.target.value)} />
                        <div style={{ display: 'flex', gap: 8 }}>
                          <button className="button-primary" onClick={() => saveMeta(profile.profileId)} disabled={busyKey === `meta:${profile.profileId}`}>Kaydet</button>
                          <button className="button-secondary" onClick={() => setEditingProfileId(null)}>Vazgeç</button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <strong>{profile.displayName}</strong>
                        <div className="muted" style={{ marginTop: 6 }}>{profile.note}</div>
                        {profile.workspaceLabel ? <div className="badge" style={{ marginTop: 8 }}>{profile.workspaceLabel}</div> : null}
                      </>
                    )}
                  </td>
                  <td>{profile.current ? <span className="badge">Aktif</span> : '—'}</td>
                  <td>{profile.email || '—'}</td>
                  <td><code>{profile.accountId || '—'}</code></td>
                  <td>{profile.planType || '—'}</td>
                  <td><code>{profile.profileId}</code></td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <button className="button-primary" disabled={profile.current || busyKey === `switch:${profile.profileId}`} onClick={() => switchProfile(profile.profileId)}>Bu oturumda kullan</button>
                      <button className="button-secondary" onClick={() => openEdit(profile)}>Ad / not</button>
                      <button className="button-danger" disabled={profile.current || busyKey === `delete:${profile.profileId}`} onClick={() => removeProfile(profile.profileId)}>Sil</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="card" style={{ marginTop: 24 }}>
        <h3>Sistem çizgisi</h3>
        <ul className="list">
          <li>Bir satır gerçek auth kaydıdır</li>
          <li>Current seçimi bu oturum için ayrıdır</li>
          <li>Görünen ad teknik kimlikten ayrıdır</li>
          <li>Bu ekran eski panelin kopyası değil, yeni çekirdektir</li>
        </ul>
      </section>
    </>
  )
}
