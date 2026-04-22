'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import styles from './CodexProfileDashboard.module.css'
import type { AuthSessionState, CodexProfile, DashboardStatusResponse, HealthLevel } from '@/lib/codex-dashboard/types'

type FlashTone = 'success' | 'error' | 'info'

type FlashState = {
  tone: FlashTone
  text: string
} | null

function formatDate(value?: string | null) {
  if (!value) return 'Yok'
  return new Intl.DateTimeFormat('tr-TR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(value))
}

function healthText(value?: HealthLevel) {
  switch (value) {
    case 'ok': return 'Sağlıklı'
    case 'warn': return 'Dikkat'
    case 'bad': return 'Sorunlu'
    default: return 'Pasif'
  }
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

function usageLeft(usedPercent?: number | null) {
  return Math.max(0, 100 - Math.round(usedPercent || 0))
}

function timeUntil(value?: string | null) {
  if (!value) return null
  const diffMs = new Date(value).getTime() - Date.now()
  if (diffMs <= 0) return 'şimdi'
  const totalMinutes = Math.round(diffMs / 60000)
  if (totalMinutes < 60) return `${totalMinutes} dk`
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  if (hours < 24) return minutes > 0 ? `${hours} sa ${minutes} dk` : `${hours} sa`
  const days = Math.floor(hours / 24)
  return `${days} gün`
}

function classNames(...items: Array<string | false | null | undefined>) {
  return items.filter(Boolean).join(' ')
}

function getErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message) return error.message
  return fallback
}

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

function SummaryCard({ label, value, note }: { label: string; value: string | number; note?: string }) {
  return (
    <article className={styles.summaryCard}>
      <span className={styles.summaryLabel}>{label}</span>
      <strong className={styles.summaryValue}>{value}</strong>
      {note ? <p className={styles.summaryNote}>{note}</p> : null}
    </article>
  )
}

function ProfileCard({
  profile,
  busyKey,
  isEditing,
  editDisplayName,
  editNote,
  onEditOpen,
  onEditCancel,
  onEditSave,
  onSwitchCurrent,
  onSwitchGlobal,
  onHide,
  setEditDisplayName,
  setEditNote,
  currentSessionUsage,
}: {
  profile: CodexProfile
  busyKey: string | null
  isEditing: boolean
  editDisplayName: string
  editNote: string
  onEditOpen: (profile: CodexProfile) => void
  onEditCancel: () => void
  onEditSave: (profileId: string) => void
  onSwitchCurrent: (profileId: string) => void
  onSwitchGlobal: (profileId: string) => void
  onHide: (profileId: string) => void
  setEditDisplayName: (value: string) => void
  setEditNote: (value: string) => void
  currentSessionUsage?: DashboardStatusResponse['summary']['currentSessionUsage']
}) {
  const visibleUsage = profile.isCurrentProfile && currentSessionUsage ? currentSessionUsage : profile.usage

  return (
    <article className={classNames(styles.profileRow, profile.isCurrentProfile && styles.profileRowCurrent)}>
      <div className={styles.profileRowMain}>
        <div className={styles.profileIdentity}>
          <div className={styles.profileTitleRow}>
            <strong className={styles.profileName}>{profile.displayName || profile.profileId}</strong>
            {profile.isCurrentProfile ? <span className={styles.currentBadge}>Aktif</span> : null}
            {profile.recommended ? <span className={styles.recommendBadge}>Önerilen</span> : null}
            <span className={classNames(styles.healthBadge, styles[`health_${profile.health || 'idle'}`])}>{healthText(profile.health)}</span>
          </div>
          <p className={styles.profileSubline}>{profile.email || profile.profileId}</p>
          <div className={styles.metaRow}>
            <span className={styles.metaChip}>{profile.kind === 'authProfile' ? 'Gerçek kimlik kaydı' : 'Ajan'}</span>
            {profile.workspace ? <span className={styles.metaChip}>{profile.workspace}</span> : null}
            {profile.planType ? <span className={styles.metaChip}>{profile.planType}</span> : null}
          </div>
        </div>

        <div className={styles.profileInfoRow}>
          <span className={styles.infoChip}>Ajan: {profile.agentId || 'Yok'}</span>
          {profile.kind === 'authProfile' && visibleUsage?.fiveHourResetAt ? (
            <span className={styles.infoChip}>{profile.isCurrentProfile && currentSessionUsage ? 'Oturum 5 saat' : '5 saat'}: %{usageLeft(visibleUsage.fiveHourPct)} kaldı{timeUntil(visibleUsage.fiveHourResetAt) ? ` · ${timeUntil(visibleUsage.fiveHourResetAt)}` : ''}</span>
          ) : null}
          {profile.kind === 'authProfile' && visibleUsage?.weekResetAt ? (
            <span className={styles.infoChip}>{profile.isCurrentProfile && currentSessionUsage ? 'Oturum hafta' : 'Hafta'}: %{usageLeft(visibleUsage.weekPct)} kaldı{timeUntil(visibleUsage.weekResetAt) ? ` · ${timeUntil(visibleUsage.weekResetAt)}` : ''}</span>
          ) : null}
        </div>
      </div>

      {profile.note ? <p className={styles.rowNote}>{profile.note}</p> : null}

      <div className={styles.profileRowActions}>
        <button className={styles.primaryButton} disabled={busyKey === `current:${profile.profileId}`} onClick={() => onSwitchCurrent(profile.profileId)}>
          Bu oturumda kullan
        </button>
        {profile.kind === 'authProfile' && profile.provider === 'openai-codex' ? (
          <button className={styles.secondaryButton} disabled={busyKey === `global:${profile.profileId}`} onClick={() => onSwitchGlobal(profile.profileId)}>
            Varsayılan yap
          </button>
        ) : null}
        <button className={styles.secondaryButton} onClick={() => (isEditing ? onEditCancel() : onEditOpen(profile))}>
          {isEditing ? 'Düzenlemeyi kapat' : 'Ad / not düzenle'}
        </button>
        <button className={styles.ghostDangerButton} disabled={profile.isCurrentProfile || busyKey === `hide:${profile.profileId}`} onClick={() => onHide(profile.profileId)}>
          Sil
        </button>
      </div>

      {isEditing ? (
        <div className={styles.inlineEditor}>
          <label className={styles.fieldBlock}>
            <span>Görünen ad</span>
            <input value={editDisplayName} onChange={(event) => setEditDisplayName(event.target.value)} placeholder="Örn: Merkez hesap" />
          </label>
          <label className={styles.fieldBlock}>
            <span>Not</span>
            <textarea value={editNote} onChange={(event) => setEditNote(event.target.value)} placeholder="Kısa operasyon notu" />
          </label>
          <div className={styles.inlineEditorActions}>
            <button className={styles.primaryButton} disabled={busyKey === `save:${profile.profileId}`} onClick={() => onEditSave(profile.profileId)}>
              Kaydet
            </button>
            <button className={styles.secondaryButton} onClick={onEditCancel}>Vazgeç</button>
          </div>
        </div>
      ) : null}
    </article>
  )
}

export function CodexProfileDashboard({
  initialStatus,
  initialAuthSession,
}: {
  initialStatus: DashboardStatusResponse
  initialAuthSession: AuthSessionState | null
}) {
  const [status, setStatus] = useState(initialStatus)
  const [authSession, setAuthSession] = useState<AuthSessionState | null>(initialAuthSession)
  const [busyKey, setBusyKey] = useState<string | null>(null)
  const [errorText, setErrorText] = useState<string | null>(null)
  const [flash, setFlash] = useState<FlashState>(null)

  const [callbackValue, setCallbackValue] = useState('')
  const [authDisplayName, setAuthDisplayName] = useState(initialAuthSession?.displayName || '')
  const [authNote, setAuthNote] = useState(initialAuthSession?.note || '')
  const [authWorkspace, setAuthWorkspace] = useState(initialAuthSession?.workspace || '')

  const [editingProfileId, setEditingProfileId] = useState<string | null>(null)
  const [editDisplayName, setEditDisplayName] = useState('')
  const [editNote, setEditNote] = useState('')

  const showFlash = useCallback((text: string, tone: FlashTone = 'info') => {
    setFlash({ text, tone })
  }, [])

  const orderedProfiles = useMemo(() => {
    return [...status.profiles].sort((a, b) => {
      if (a.isCurrentProfile && !b.isCurrentProfile) return -1
      if (!a.isCurrentProfile && b.isCurrentProfile) return 1
      if (a.recommended && !b.recommended) return -1
      if (!a.recommended && b.recommended) return 1
      if (a.kind === 'authProfile' && b.kind !== 'authProfile') return -1
      if (a.kind !== 'authProfile' && b.kind === 'authProfile') return 1
      return a.displayName.localeCompare(b.displayName, 'tr')
    })
  }, [status.profiles])

  const currentProfile = useMemo(
    () => status.profiles.find((profile) => profile.isCurrentProfile) || null,
    [status.profiles],
  )

  const refreshDashboard = useCallback(async (announce = false) => {
    setErrorText(null)
    setBusyKey((current) => current || 'refresh')
    try {
      const authPayload = await request<{ authSession: AuthSessionState | null }>('/api/auth-session')
      const nextStatus = await request<DashboardStatusResponse>('/api/status')
      setAuthSession(authPayload.authSession)
      setStatus(nextStatus)
      if (announce) showFlash('Sayfa yenilendi', 'success')
    } catch (error: unknown) {
      const message = getErrorMessage(error, 'Veriler alınamadı')
      setErrorText(message)
      showFlash(message, 'error')
    } finally {
      setBusyKey((current) => (current === 'refresh' ? null : current))
    }
  }, [showFlash])

  useEffect(() => {
    if (!authSession?.sessionId) return

    const timer = window.setInterval(async () => {
      try {
        const payload = await request<{ authSession: AuthSessionState | null; terminal?: boolean }>('/api/auth-session')
        setAuthSession(payload.authSession)

        if (payload.authSession?.status === 'completed') {
          const profileLabel = payload.authSession.displayName || payload.authSession.profileId || 'profil'
          const message = payload.authSession.canonicalAction === 'updated'
            ? `Yeni satır açılmadı, mevcut profil güncellendi: ${profileLabel}`
            : `Yeni profil kaydedildi: ${profileLabel}`
          showFlash(message, 'success')
          setCallbackValue('')
          setAuthDisplayName('')
          setAuthNote('')
          setAuthWorkspace('')
        }

        if (payload.authSession?.status === 'error') {
          const message = payload.authSession.error || 'Kimlik doğrulama başarısız oldu'
          setErrorText(message)
          showFlash(message, 'error')
        }

        if (payload.terminal || !payload.authSession) {
          const nextStatus = await request<DashboardStatusResponse>('/api/status')
          setStatus(nextStatus)
          if (!payload.authSession) {
            setAuthSession(null)
          }
        }
      } catch (error: unknown) {
        setErrorText(getErrorMessage(error, 'Doğrulama durumu alınamadı'))
      }
    }, 2500)

    return () => window.clearInterval(timer)
  }, [authSession?.sessionId, showFlash])

  const startAuth = useCallback(async () => {
    setBusyKey('start-auth')
    setErrorText(null)
    try {
      const payload = await request<{ ok: true; message: string; authSession: AuthSessionState }>('/api/auth-session/start', { method: 'POST' })
      setAuthSession(payload.authSession)
      setCallbackValue('')
      showFlash(payload.message, 'success')
    } catch (error: unknown) {
      const message = getErrorMessage(error, 'Kimlik doğrulama başlatılamadı')
      setErrorText(message)
      showFlash(message, 'error')
    } finally {
      setBusyKey(null)
    }
  }, [showFlash])

  const submitAuth = useCallback(async () => {
    if (!authSession?.sessionId) return
    if (!authDisplayName.trim() && !authWorkspace.trim()) {
      const message = 'Profil adı zorunlu'
      setErrorText(message)
      showFlash(message, 'error')
      return
    }
    setBusyKey('submit-auth')
    setErrorText(null)
    try {
      const payload = await request<{ ok: true; message: string; authSession: AuthSessionState }>('/api/auth-session/submit', {
        method: 'POST',
        body: JSON.stringify({
          sessionId: authSession.sessionId,
          callbackValue,
          displayName: authDisplayName,
          note: authNote,
          workspace: authWorkspace,
        }),
      })
      setAuthSession(payload.authSession)
      showFlash(payload.message, 'success')
    } catch (error: unknown) {
      const message = getErrorMessage(error, 'Kimlik doğrulama başlatılamadı')
      setErrorText(message)
      showFlash(message, 'error')
    } finally {
      setBusyKey(null)
    }
  }, [authDisplayName, authNote, authSession, authWorkspace, callbackValue, showFlash])

  const cancelAuth = useCallback(async () => {
    if (!authSession?.sessionId) return
    setBusyKey('cancel-auth')
    try {
      const payload = await request<{ ok: true; message: string }>('/api/auth-session/cancel', {
        method: 'POST',
        body: JSON.stringify({ sessionId: authSession.sessionId }),
      })
      setAuthSession(null)
      setCallbackValue('')
      showFlash(payload.message, 'info')
    } catch (error: unknown) {
      const message = getErrorMessage(error, 'Doğrulama oturumu iptal edilemedi')
      setErrorText(message)
      showFlash(message, 'error')
    } finally {
      setBusyKey(null)
    }
  }, [authSession, showFlash])

  const switchCurrent = useCallback(async (profileId: string) => {
    setBusyKey(`current:${profileId}`)
    try {
      const payload = await request<{ ok: true; message: string }>('/api/switch', {
        method: 'POST',
        body: JSON.stringify({ profileId, scope: 'current-session' }),
      })
      await refreshDashboard(false)
      showFlash(payload.message, 'success')
    } catch (error: unknown) {
      const message = getErrorMessage(error, 'Aktif profil değiştirilemedi')
      setErrorText(message)
      showFlash(message, 'error')
    } finally {
      setBusyKey(null)
    }
  }, [refreshDashboard, showFlash])

  const switchGlobal = useCallback(async (profileId: string) => {
    setBusyKey(`global:${profileId}`)
    try {
      const payload = await request<{ ok: true; message: string }>('/api/switch', {
        method: 'POST',
        body: JSON.stringify({ profileId, scope: 'all-sessions' }),
      })
      await refreshDashboard(false)
      showFlash(payload.message, 'success')
    } catch (error: unknown) {
      const message = getErrorMessage(error, 'Varsayılan profil değiştirilemedi')
      setErrorText(message)
      showFlash(message, 'error')
    } finally {
      setBusyKey(null)
    }
  }, [refreshDashboard, showFlash])

  const openEditor = useCallback((profile: CodexProfile) => {
    setEditingProfileId(profile.profileId)
    setEditDisplayName(profile.displayName)
    setEditNote(profile.note)
  }, [])

  const saveProfileMeta = useCallback(async (profileId: string) => {
    setBusyKey(`save:${profileId}`)
    try {
      const payload = await request<{ ok: true; message: string }>('/api/profile-meta', {
        method: 'POST',
        body: JSON.stringify({ profileId, displayName: editDisplayName, note: editNote }),
      })
      setEditingProfileId(null)
      await refreshDashboard(false)
      showFlash(payload.message, 'success')
    } catch (error: unknown) {
      const message = getErrorMessage(error, 'Profil kaydedilemedi')
      setErrorText(message)
      showFlash(message, 'error')
    } finally {
      setBusyKey(null)
    }
  }, [editDisplayName, editNote, refreshDashboard, showFlash])

  const hideProfile = useCallback(async (profileId: string) => {
    if (!window.confirm('Bu kayıt kaldırılacak. Devam edilsin mi?')) return
    setBusyKey(`hide:${profileId}`)
    try {
      const payload = await request<{ ok: true; message: string }>('/api/profile-delete', {
        method: 'POST',
        body: JSON.stringify({ profileId }),
      })
      await refreshDashboard(false)
      showFlash(payload.message, 'info')
    } catch (error: unknown) {
      const message = getErrorMessage(error, 'Profil silinemedi')
      setErrorText(message)
      showFlash(message, 'error')
    } finally {
      setBusyKey(null)
    }
  }, [refreshDashboard, showFlash])

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div>
          <span className={styles.eyebrow}>EsnafDigital / Codex Profilleri</span>
          <h1>Sade operatör ekranı</h1>
          <p className={styles.lead}>
            Burada sadece üç iş var: gerçek kimlik doğrulamayı başlatmak, profili kaydetmek ve hangi profille çalışacağını seçmek.
          </p>
        </div>
        <div className={styles.heroMeta}>
          <span className={styles.metaChip}>Ajan: {status.summary.activeAgentId}</span>
          <span className={styles.metaChip}>Model: {status.summary.currentModel}</span>
          <span className={styles.metaChip}>Güncellendi: {formatDate(status.lastRefreshedAt)}</span>
        </div>
      </section>

      {flash ? <div className={classNames(styles.flash, styles[`flash_${flash.tone}`])}>{flash.text}</div> : null}
      {errorText ? <div className={styles.errorBanner}>{errorText}</div> : null}

      <section className={styles.summaryGrid}>
        <SummaryCard label="Toplam profil" value={status.summary.totalProfiles} />
        <SummaryCard label="Sağlıklı" value={status.summary.healthyProfiles} />
        <SummaryCard label="Aktif profil" value={currentProfile?.displayName || 'Yok'} note={currentProfile?.workspace || currentProfile?.email || ''} />
        <SummaryCard label="Önerilen" value={status.summary.recommendedProfile || 'Yok'} />
      </section>

      <section className={styles.panel}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>1. Yeni profil ekle</h2>
            <p>Tek akış bu. Giriş bağlantısını aç, giriş yap, dönen bağlantıyı buraya yapıştır, profil adını ve notunu yaz, kaydet.</p>
          </div>
          <button className={styles.secondaryButton} disabled={busyKey === 'refresh'} onClick={() => refreshDashboard(true)}>
            Yenile
          </button>
        </div>

        {!authSession ? (
          <div className={styles.emptyBox}>
            <p>Yeni bir profil eklemek için kimlik doğrulamayı başlatın.</p>
            <button className={styles.primaryButton} disabled={busyKey === 'start-auth'} onClick={startAuth}>
              Yeni giriş bağlantısı üret
            </button>
          </div>
        ) : (
          <div className={styles.authBox}>
            <div className={styles.authRow}>
              <span className={styles.metaChip}>Oturum: {authSession.sessionId}</span>
              <span className={styles.metaChip}>Durum: {authStatusText(authSession.status)}</span>
              <span className={styles.metaChip}>Başlangıç: {formatDate(authSession.startedAt)}</span>
            </div>

            <label className={styles.fieldBlock}>
              <span>Giriş bağlantısı</span>
              <div className={styles.linkRow}>
                <input value={authSession.authUrl} readOnly />
                <a className={styles.secondaryButton} href={authSession.authUrl} target="_blank" rel="noreferrer">Aç</a>
              </div>
            </label>

            <div className={styles.formGrid}>
              <label className={styles.fieldBlock}>
                <span>Profil adı</span>
                <input value={authDisplayName} onChange={(event) => setAuthDisplayName(event.target.value)} placeholder="Örn: Merkez hesap" />
              </label>
              <label className={styles.fieldBlock}>
                <span>Kısa kod / çalışma alanı (isteğe bağlı)</span>
                <input value={authWorkspace} onChange={(event) => setAuthWorkspace(event.target.value)} placeholder="İstersen ayrıca yaz" />
              </label>
            </div>

            <label className={styles.fieldBlock}>
              <span>Not</span>
              <textarea value={authNote} onChange={(event) => setAuthNote(event.target.value)} placeholder="Kısa operasyon notu" />
            </label>

            <label className={styles.fieldBlock}>
              <span>Dönen bağlantı veya kod</span>
              <textarea value={callbackValue} onChange={(event) => setCallbackValue(event.target.value)} placeholder="Giriş sonrası dönen bağlantıyı ya da kodu yapıştırın" />
            </label>

            <div className={styles.cardActions}>
              <button className={styles.primaryButton} disabled={busyKey === 'submit-auth'} onClick={submitAuth}>
                Profili kaydet
              </button>
              <button className={styles.secondaryButton} disabled={busyKey === 'cancel-auth'} onClick={cancelAuth}>
                İptal et
              </button>
            </div>
          </div>
        )}
      </section>

      <section className={styles.panel}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>2. Profiller</h2>
            <p>Şu an kayıtlı profil sayısı {status.summary.totalProfiles}, aktif profil de {currentProfile?.displayName || 'yok'}.</p>
          </div>
        </div>

        <div className={styles.profileList}>
          {orderedProfiles.map((profile) => (
            <ProfileCard
              key={profile.profileId}
              profile={profile}
              busyKey={busyKey}
              isEditing={editingProfileId === profile.profileId}
              editDisplayName={editDisplayName}
              editNote={editNote}
              onEditOpen={openEditor}
              onEditCancel={() => setEditingProfileId(null)}
              onEditSave={saveProfileMeta}
              onSwitchCurrent={switchCurrent}
              onSwitchGlobal={switchGlobal}
              onHide={hideProfile}
              setEditDisplayName={setEditDisplayName}
              setEditNote={setEditNote}
              currentSessionUsage={status.summary.currentSessionUsage}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
