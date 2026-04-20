'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import styles from './AccountCenter.module.css'
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

function cx(...items: Array<string | false | null | undefined>) {
  return items.filter(Boolean).join(' ')
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

function mergePayloadPreservingLimits(current: AccountCenterPayload, next: AccountCenterPayload): AccountCenterPayload {
  const currentProfiles = new Map(current.state.profiles.map((profile) => [profile.profileId, profile]))

  return {
    ...next,
    state: {
      ...next.state,
      profiles: next.state.profiles.map((profile) => {
        const existing = currentProfiles.get(profile.profileId)
        return {
          ...profile,
          limits: profile.limits || existing?.limits || null,
        }
      }),
    },
  }
}

function ProfileCard({
  profile,
  busyKey,
  editingProfileId,
  editDisplayName,
  editNote,
  openEdit,
  saveMeta,
  setEditingProfileId,
  setEditDisplayName,
  setEditNote,
  switchProfile,
  removeProfile,
}: {
  profile: AccountCenterProfile
  busyKey: string | null
  editingProfileId: string | null
  editDisplayName: string
  editNote: string
  openEdit: (profile: AccountCenterProfile) => void
  saveMeta: (profileId: string) => void
  setEditingProfileId: (value: string | null) => void
  setEditDisplayName: (value: string) => void
  setEditNote: (value: string) => void
  switchProfile: (profileId: string) => void
  removeProfile: (profileId: string) => void
}) {
  const isEditing = editingProfileId === profile.profileId
  const hasLimits = Boolean(profile.limits)

  return (
    <article className={cx(styles.profileCard, profile.current && styles.profileCardCurrent)}>
      <div className={styles.profileMain}>
        {isEditing ? (
          <div className={styles.editorBox}>
            <div className={styles.editorGrid}>
              <label className={styles.field}>
                <span>Görünen ad</span>
                <input className={styles.input} value={editDisplayName} onChange={(event) => setEditDisplayName(event.target.value)} />
              </label>
              <label className={styles.field}>
                <span>Kısa not</span>
                <input className={styles.input} value={editNote} onChange={(event) => setEditNote(event.target.value)} placeholder="Not" />
              </label>
            </div>
            <div className={styles.actionRow} style={{ marginTop: 14 }}>
              <button className="button-primary" onClick={() => saveMeta(profile.profileId)} disabled={busyKey === `meta:${profile.profileId}`}>Kaydet</button>
              <button className="button-secondary" onClick={() => setEditingProfileId(null)}>Vazgeç</button>
            </div>
          </div>
        ) : (
          <>
            <div className={styles.profileHead}>
              <span className={cx(styles.profileLight, profile.current && styles.profileLightActive)} />
              <strong className={styles.profileName}>{profile.displayName}</strong>
              {profile.current ? <span className={styles.currentChip}>Current</span> : null}
              {profile.workspaceLabel ? <span className={styles.badge}>{profile.workspaceLabel}</span> : null}
            </div>

            <div className={styles.profileSubline}>
              <span>Son kullanım: {formatDate(profile.lastUsedAt)}</span>
              {profile.planType ? <span>Plan: {profile.planType}</span> : null}
              {profile.accountId ? <span>Account ID: {profile.accountId}</span> : null}
            </div>

            {profile.note ? <p className={styles.profileNote}>{profile.note}</p> : null}

            <div className={styles.profileUsage}>
              <div className={styles.limitBlock}>
                <div className={styles.limitLabel}>5 saat</div>
                <div className={styles.limitBar}>
                  <div className={cx(styles.limitFill, styles.limitFillUsage)} style={{ width: `${hasLimits ? clampPercent(profile.limits?.fiveHourLeftPct) : 100}%`, opacity: hasLimits ? 1 : 0.22 }} />
                  <span className={styles.limitText}>{hasLimits ? `%${clampPercent(profile.limits?.fiveHourLeftPct)} kaldı` : 'Limit verisi yükleniyor'}</span>
                </div>
                <div className={styles.limitBar}>
                  <div className={cx(styles.limitFill, styles.limitFillReset)} style={{ width: `${hasLimits ? resetProgress(profile.limits?.fiveHourResetAt, 5) : 100}%`, opacity: hasLimits ? 1 : 0.18 }} />
                  <span className={styles.limitText}>{hasLimits ? `${formatRemainingTime(profile.limits?.fiveHourResetAt)} sonra sıfır` : 'Reset bilgisi yükleniyor'}</span>
                </div>
              </div>

              <div className={styles.limitBlock}>
                <div className={styles.limitLabel}>Hafta</div>
                <div className={styles.limitBar}>
                  <div className={cx(styles.limitFill, styles.limitFillUsage)} style={{ width: `${hasLimits ? clampPercent(profile.limits?.weekLeftPct) : 100}%`, opacity: hasLimits ? 1 : 0.22 }} />
                  <span className={styles.limitText}>{hasLimits ? `%${clampPercent(profile.limits?.weekLeftPct)} kaldı` : 'Limit verisi yükleniyor'}</span>
                </div>
                <div className={styles.limitBar}>
                  <div className={cx(styles.limitFill, styles.limitFillReset)} style={{ width: `${hasLimits ? resetProgress(profile.limits?.weekResetAt, 24 * 7) : 100}%`, opacity: hasLimits ? 1 : 0.18 }} />
                  <span className={styles.limitText}>{hasLimits ? `${formatRemainingTime(profile.limits?.weekResetAt)} sonra sıfır` : 'Reset bilgisi yükleniyor'}</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className={styles.actionStack}>
        <button className="button-primary" disabled={profile.current || busyKey === `switch:${profile.profileId}`} onClick={() => switchProfile(profile.profileId)}>
          Bu oturumda kullan
        </button>
        <button className="button-secondary" onClick={() => openEdit(profile)}>Ad / not</button>
        <button className="button-danger" disabled={profile.current || busyKey === `delete:${profile.profileId}`} onClick={() => removeProfile(profile.profileId)}>Sil</button>
      </div>
    </article>
  )
}

export function AccountCenter({ initialPayload }: { initialPayload: AccountCenterPayload }) {
  const [payload, setPayload] = useState(initialPayload)
  const [busyKey, setBusyKey] = useState<string | null>(null)
  const limitRequestsRef = useRef<Set<string>>(new Set())
  const limitHydrationRunningRef = useRef(false)
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
    setPayload((current) => mergePayloadPreservingLimits(current, next))
    return next
  }, [])

  useEffect(() => {
    if (payload.authSession?.sessionId) return

    const timer = window.setInterval(async () => {
      try {
        const next = await request<AccountCenterPayload>('/api/hesap-merkezi/status')
        setPayload((current) => mergePayloadPreservingLimits(current, next))
      } catch {
        // sessiz kal
      }
    }, 30000)

    return () => window.clearInterval(timer)
  }, [payload.authSession?.sessionId])

  useEffect(() => {
    if (limitHydrationRunningRef.current) return

    const missingProfiles = payload.state.profiles
      .filter((profile) => !profile.limits)
      .map((profile) => profile.profileId)
      .filter((profileId) => !limitRequestsRef.current.has(profileId))

    if (missingProfiles.length === 0) return

    const concurrency = 4
    limitHydrationRunningRef.current = true

    const run = async () => {
      const queue = [...missingProfiles]
      const worker = async () => {
        while (queue.length > 0) {
          const profileId = queue.shift()
          if (!profileId) return
          limitRequestsRef.current.add(profileId)
          try {
            const result = await request<{ ok: true; profileId: string; limits: AccountCenterProfile['limits'] }>('/api/hesap-merkezi/limits', {
              method: 'POST',
              body: JSON.stringify({ profileId }),
            })

            setPayload((current) => ({
              ...current,
              state: {
                ...current.state,
                profiles: current.state.profiles.map((profile) => (
                  profile.profileId === result.profileId
                    ? {
                        ...profile,
                        limits: result.limits || {
                          fiveHourLeftPct: null,
                          weekLeftPct: null,
                          fiveHourResetAt: null,
                          weekResetAt: null,
                        },
                      }
                    : profile
                )),
              },
            }))
          } catch {
            // sessiz kal
          } finally {
            limitRequestsRef.current.delete(profileId)
          }
        }
      }

      await Promise.all(Array.from({ length: Math.min(concurrency, queue.length) }, () => worker()))
      limitHydrationRunningRef.current = false
    }

    void run()
  }, [payload.state.profiles])

  useEffect(() => {
    if (!payload.authSession?.sessionId) return

    const timer = window.setInterval(async () => {
      try {
        const authPayload = await request<AccountCenterPayload & { terminal?: boolean }>('/api/hesap-merkezi/auth/status')
        setPayload((current) => mergePayloadPreservingLimits(current, {
          state: authPayload.state,
          authSession: authPayload.authSession,
          systemNotice: authPayload.systemNotice,
        }))

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
      setPayload((current) => mergePayloadPreservingLimits(current, {
        state: result.state,
        authSession: result.authSession,
        systemNotice: result.systemNotice,
      }))
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
      setPayload((current) => mergePayloadPreservingLimits(current, {
        state: result.state,
        authSession: result.authSession,
        systemNotice: result.systemNotice,
      }))
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
      setPayload((current) => mergePayloadPreservingLimits(current, {
        state: result.state,
        authSession: result.authSession,
        systemNotice: result.systemNotice,
      }))
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
      setPayload((current) => mergePayloadPreservingLimits(current, {
        state: result.state,
        authSession: result.authSession,
        systemNotice: result.systemNotice,
      }))
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
      setPayload((current) => mergePayloadPreservingLimits(current, {
        state: result.state,
        authSession: result.authSession,
        systemNotice: result.systemNotice,
      }))
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
      setPayload((current) => mergePayloadPreservingLimits(current, {
        state: result.state,
        authSession: result.authSession,
        systemNotice: result.systemNotice,
      }))
      setEditingProfileId(null)
      setFlash(result.message)
    } catch (error: any) {
      setErrorText(error?.message || 'Profil güncellenemedi')
    } finally {
      setBusyKey(null)
    }
  }, [editDisplayName, editNote])

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>Yeni sistem / V2</p>
          <h1>Hesap Merkezi</h1>
          <p className={styles.lead}>Bu ekran gerçek auth kaydı, current seçim ve operatör görünen adı ilişkisini temiz tutmak için var.</p>
        </div>
        <div className={styles.heroMeta}>
          <span className={styles.metaChip}>Toplam profil: {payload.state.totalProfiles}</span>
          {payload.state.currentDisplayName ? <span className={styles.currentChip}>Current: {payload.state.currentDisplayName}</span> : null}
        </div>
      </section>

      {flash ? <section className={styles.notice}>{flash}</section> : null}
      {payload.systemNotice ? <section className={styles.notice}>{payload.systemNotice.message}</section> : null}
      {errorText ? <section className={styles.error}>{errorText}</section> : null}

      <section className={styles.statsGrid}>
        <article className={styles.statCard}>
          <strong className={styles.statValue}>{payload.state.totalProfiles}</strong>
          <span className={styles.statLabel}>Kayıtlı profil</span>
          <p className={styles.statText}>Aktif current profili koruyup, gerçek hesap kayıtlarını operatör düzeyinde yönetiyorsunuz.</p>
        </article>
      </section>

      <section className={styles.sectionCard}>
        <div className={styles.sectionHeader}>
          <div>
            <h3>Yeni auth ekle</h3>
            <p className={styles.sectionText}>Link üretin, giriş yapın, dönen callback’i yapıştırın, profil adını verin ve kaydedin.</p>
          </div>
          <button className="button-primary" disabled={busyKey === 'start-auth'} onClick={startAuth}>Yeni auth başlat</button>
        </div>

        {!payload.authSession ? (
          <div className={styles.emptyState}>Şu an aktif auth oturumu yok.</div>
        ) : (
          <div className={styles.stack}>
            <div className={styles.authGrid}>
              <div className={styles.authPanel}>
                <div className={styles.infoList}>
                  <div className={styles.infoRow}><strong>Durum:</strong> <span>{authStatusText(payload.authSession.status)}</span></div>
                  <div className={styles.infoRow}><strong>Başlangıç:</strong> <span>{formatDate(payload.authSession.startedAt)}</span></div>
                  <div className={styles.infoRow}><strong>Session:</strong> <span>{payload.authSession.sessionId}</span></div>
                </div>
              </div>

              <div className={styles.authPanel}>
                <label className={styles.field}>
                  <span>Auth linki</span>
                  <input className={styles.input} value={payload.authSession.authUrl} readOnly />
                </label>
                <div className={styles.actionRow} style={{ marginTop: 12 }}>
                  <a href={payload.authSession.authUrl} target="_blank" rel="noreferrer" className="button-primary">Linki aç</a>
                  <button className="button-danger" onClick={cancelAuth} disabled={busyKey === 'cancel-auth'}>İptal</button>
                </div>
              </div>
            </div>

            <div className={styles.authGrid}>
              <label className={cx(styles.field, styles.twoColSpan)}>
                <span>Dönen callback / kod</span>
                <textarea className={styles.textarea} value={callbackValue} onChange={(event) => setCallbackValue(event.target.value)} />
              </label>
              <label className={styles.field}>
                <span>Profil adı</span>
                <input className={styles.input} value={displayName} onChange={(event) => setDisplayName(event.target.value)} placeholder="Örn: Workspace 1" />
              </label>
              <label className={styles.field}>
                <span>Kısa not</span>
                <input className={styles.input} value={note} onChange={(event) => setNote(event.target.value)} placeholder="Opsiyonel" />
              </label>
            </div>

            <div className={styles.actionRow}>
              <button className="button-primary" onClick={submitAuth} disabled={busyKey === 'submit-auth'}>Profili kaydet</button>
            </div>
          </div>
        )}
      </section>

      <section className={styles.sectionCard}>
        <div className={styles.sectionHeader}>
          <div>
            <h3>Kayıtlı profiller</h3>
            <p className={styles.sectionText}>Aktif olan üstte durur. Haftalık ve 5 saatlik limiti bitenler sonda toplanır, daha geç sıfırlanan daha aşağı iner.</p>
          </div>
          <button className="button-secondary" onClick={() => refresh().then(() => setFlash('Liste yenilendi')).catch((error) => setErrorText(error.message))}>Yenile</button>
        </div>

        <div className={styles.profileList}>
          {payload.state.profiles.map((profile) => (
            <ProfileCard
              key={profile.profileId}
              profile={profile}
              busyKey={busyKey}
              editingProfileId={editingProfileId}
              editDisplayName={editDisplayName}
              editNote={editNote}
              openEdit={openEdit}
              saveMeta={saveMeta}
              setEditingProfileId={setEditingProfileId}
              setEditDisplayName={setEditDisplayName}
              setEditNote={setEditNote}
              switchProfile={switchProfile}
              removeProfile={removeProfile}
            />
          ))}
        </div>
      </section>

      <section className={styles.sectionCard}>
        <div className={styles.sectionHeader}>
          <div>
            <h3>Aynı teknik kayda bağlı profiller</h3>
            <p className={styles.sectionText}>Aynı auth kimliğinden operatör tarafında ayrı kayıt açılmış gruplar burada görünür.</p>
          </div>
        </div>

        {payload.state.duplicateGroups.length === 0 ? (
          <div className={styles.emptyState}>Şu an aynı Account ID / Plan çizgisinde ikinci kayıt yok.</div>
        ) : (
          <div className={styles.duplicateList}>
            {payload.state.duplicateGroups.map((group) => (
              <article key={group.canonicalProfileId} className={styles.duplicateCard}>
                <div className={styles.stack} style={{ gap: 8 }}>
                  <strong>Teknik grup</strong>
                  <div className={styles.mutedText}>Account ID: {group.accountId || '—'}</div>
                  <div className={styles.mutedText}>Plan: {group.planType || '—'}</div>
                  <div className={styles.mutedText}>Temel kayıt: <code className={styles.code}>{group.canonicalProfileId}</code></div>
                </div>
                <ul className={styles.miniList}>
                  {group.profiles.map((profile) => (
                    <li key={profile.profileId}>
                      <strong>{profile.displayName}</strong> <code className={styles.code}>{profile.profileId}</code>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
