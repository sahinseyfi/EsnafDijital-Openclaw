'use client'

import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import styles from './CodexProfileDashboard.module.css'
import type { AuthSessionState, CodexProfile, DashboardSettings, DashboardStatusResponse, HealthLevel } from '@/lib/codex-dashboard/types'

type ToastTone = 'success' | 'error' | 'info'

type ToastItem = {
  id: number
  text: string
  tone: ToastTone
}

const viewOptions: Array<{ value: DashboardSettings['viewFilter']; label: string }> = [
  { value: 'all', label: 'Tüm profiller' },
  { value: 'healthy', label: 'Yalnız sağlıklı' },
  { value: 'attention', label: 'Dikkat gerektiren' },
  { value: 'problem', label: 'Problemli' },
  { value: 'recommended', label: 'Önerilen' },
  { value: 'current', label: 'Current profil' },
]

function formatDate(value?: string | null) {
  if (!value) return 'Yok'
  return new Intl.DateTimeFormat('tr-TR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(value))
}

function timeAgo(value?: string | null) {
  if (!value) return 'Henüz kullanılmadı'
  const diff = Date.now() - new Date(value).getTime()
  const min = Math.max(1, Math.round(diff / 60000))
  if (min < 60) return `${min} dk önce`
  const hour = Math.round(min / 60)
  if (hour < 24) return `${hour} sa önce`
  const day = Math.round(hour / 24)
  return `${day} gün önce`
}

function healthText(value?: HealthLevel) {
  switch (value) {
    case 'ok': return 'Sağlıklı'
    case 'warn': return 'Dikkat'
    case 'bad': return 'Problem'
    default: return 'Pasif'
  }
}

function timeUntil(value?: string | null) {
  if (!value) return 'veri yok'
  const diffMs = new Date(value).getTime() - Date.now()
  if (diffMs <= 0) return 'sıfırlandı'
  const totalMinutes = Math.max(1, Math.round(diffMs / 60000))
  const days = Math.floor(totalMinutes / 1440)
  const hours = Math.floor((totalMinutes % 1440) / 60)
  const minutes = totalMinutes % 60
  if (days > 0) return `${days}g ${hours}sa kaldı`
  if (hours > 0) return `${hours}sa ${minutes}dk kaldı`
  return `${minutes}dk kaldı`
}

function authStatusText(value?: AuthSessionState['status']) {
  switch (value) {
    case 'awaiting_callback': return 'Callback bekleniyor'
    case 'verifying': return 'Doğrulanıyor'
    case 'completed': return 'Tamamlandı'
    case 'error': return 'Hata'
    case 'cancelled': return 'İptal edildi'
    case 'running': return 'Çalışıyor'
    default: return 'Hazırlanıyor'
  }
}

function classNames(...items: Array<string | false | null | undefined>) {
  return items.filter(Boolean).join(' ')
}

function kindLabel(profile: CodexProfile) {
  if (profile.kind === 'authProfile') return 'Gerçek auth'
  if (profile.kind === 'agent') return 'Agent görünümü'
  return 'Business profil'
}

function canSetGlobal(profile: CodexProfile) {
  return profile.kind === 'authProfile' && profile.provider === 'openai-codex'
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

function ProgressCell({ value, resetAt }: { value: number; resetAt?: string | null }) {
  return (
    <div className={styles.progressCellWrap}>
      <div className={styles.progressCell}>
        <div className={styles.progressTrack}>
          <div className={styles.progressFill} style={{ width: `${Math.max(4, Math.min(100, value))}%` }} />
        </div>
        <span className={styles.progressText}>{value}%</span>
      </div>
      <span className={styles.progressMeta} title={resetAt ? formatDate(resetAt) : 'Veri yok'}>
        Sıfır: {resetAt ? `${formatDate(resetAt)} • ${timeUntil(resetAt)}` : 'veri yok'}
      </span>
    </div>
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
  const [countdown, setCountdown] = useState(initialStatus.settings.autoRefreshSeconds)
  const [busyKey, setBusyKey] = useState<string | null>(null)
  const [focusedProfileId, setFocusedProfileId] = useState<string | null>(initialStatus.settings.currentSessionProfileId)
  const [editingProfileId, setEditingProfileId] = useState<string | null>(null)
  const [editDisplayName, setEditDisplayName] = useState('')
  const [editNote, setEditNote] = useState('')
  const [authDisplayName, setAuthDisplayName] = useState('')
  const [authNote, setAuthNote] = useState('')
  const [authWorkspace, setAuthWorkspace] = useState('')
  const [newProfileSourceId, setNewProfileSourceId] = useState('')
  const [newProfileDisplayName, setNewProfileDisplayName] = useState('')
  const [newProfileWorkspace, setNewProfileWorkspace] = useState('')
  const [newProfileNote, setNewProfileNote] = useState('')
  const [callbackValue, setCallbackValue] = useState('')
  const [settingsDraft, setSettingsDraft] = useState({
    routingThreshold: initialStatus.settings.routingThreshold,
    currentModel: initialStatus.settings.currentModel,
    workspace: initialStatus.settings.workspace,
  })
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const [errorText, setErrorText] = useState<string | null>(null)

  const agentOptions = useMemo(
    () => [...new Set(status.profiles.map((profile) => profile.agentId).filter(Boolean))].sort(),
    [status.profiles],
  )

  const authProfileOptions = useMemo(
    () => status.profiles.filter((profile) => profile.kind === 'authProfile'),
    [status.profiles],
  )

  const pushToast = useCallback((text: string, tone: ToastTone = 'info') => {
    const id = Date.now() + Math.floor(Math.random() * 1000)
    setToasts((current) => [...current, { id, text, tone }])
    window.setTimeout(() => {
      setToasts((current) => current.filter((item) => item.id !== id))
    }, 3200)
  }, [])

  const loadData = useCallback(async (silent = false) => {
    if (!silent) setBusyKey('refresh')
    setErrorText(null)
    try {
      const [nextStatus, authPayload] = await Promise.all([
        request<DashboardStatusResponse>('/api/status'),
        request<{ authSession: AuthSessionState | null }>('/api/auth-session'),
      ])
      setStatus(nextStatus)
      setAuthSession(authPayload.authSession)
      setSettingsDraft({
        routingThreshold: nextStatus.settings.routingThreshold,
        currentModel: nextStatus.settings.currentModel,
        workspace: nextStatus.settings.workspace,
      })
      setCountdown(nextStatus.settings.autoRefreshSeconds)
      if (!silent) pushToast('Dashboard yenilendi', 'success')
    } catch (error: any) {
      const message = error?.message || 'Dashboard verisi alınamadı'
      setErrorText(message)
      if (!silent) pushToast(message, 'error')
    } finally {
      if (!silent) setBusyKey(null)
    }
  }, [pushToast])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdown((current) => {
        if (current <= 1) {
          loadData(true)
          return status.settings.autoRefreshSeconds
        }
        return current - 1
      })
    }, 1000)

    return () => window.clearInterval(timer)
  }, [loadData, status.settings.autoRefreshSeconds])

  useEffect(() => {
    if (authSession?.sessionId) {
      setAuthDisplayName(authSession.displayName || '')
      setAuthNote(authSession.note || '')
      setAuthWorkspace(authSession.workspace || '')
    }
  }, [authSession?.sessionId])

  useEffect(() => {
    if (!newProfileSourceId && authProfileOptions[0]?.profileId) {
      setNewProfileSourceId(authProfileOptions[0].profileId)
    }
  }, [authProfileOptions, newProfileSourceId])

  useEffect(() => {
    if (!authSession?.sessionId) return

    if (authSession.status === 'completed') {
      pushToast(
        authSession.profileId
          ? `Profil kaydedildi: ${authSession.displayName || authSession.profileId}`
          : 'Auth tamamlandı, profil güncellendi',
        'success',
      )
      if (authSession.profileId) {
        setFocusedProfileId(authSession.profileId)
      }
      setAuthSession(null)
      setCallbackValue('')
      setAuthDisplayName('')
      setAuthNote('')
      setAuthWorkspace('')
      loadData(true)
      return
    }

    if (authSession.status === 'error') {
      const message = authSession.error || 'Auth doğrulaması başarısız oldu'
      setErrorText(message)
      pushToast(message, 'error')
      setAuthSession(null)
      return
    }

    if (authSession.status === 'cancelled') {
      pushToast('Auth session iptal edildi', 'info')
      setAuthSession(null)
      setCallbackValue('')
      setAuthWorkspace('')
      return
    }

    const timer = window.setInterval(async () => {
      try {
        const payload = await request<{ authSession: AuthSessionState | null; terminal?: boolean }>('/api/auth-session')
        setAuthSession(payload.authSession)
      } catch {
        // sessiz poll
      }
    }, 3000)

    return () => window.clearInterval(timer)
  }, [authSession, loadData, pushToast])

  const filteredProfiles = useMemo(() => {
    switch (status.settings.viewFilter) {
      case 'healthy':
        return status.profiles.filter((profile) => profile.health === 'ok')
      case 'attention':
        return status.profiles.filter((profile) => profile.health === 'warn')
      case 'problem':
        return status.profiles.filter((profile) => profile.health === 'bad')
      case 'recommended':
        return status.profiles.filter((profile) => profile.recommended)
      case 'current':
        return status.profiles.filter((profile) => profile.isCurrentProfile)
      default:
        return status.profiles
    }
  }, [status.profiles, status.settings.viewFilter])

  async function updateSettings(payload: Partial<DashboardSettings>, successText = 'Ayar güncellendi') {
    setBusyKey('settings')
    setErrorText(null)
    try {
      const response = await request<{ settings: DashboardSettings; summary: DashboardStatusResponse['summary']; message: string }>('/api/settings', {
        method: 'POST',
        body: JSON.stringify(payload),
      })
      setStatus((current) => ({
        ...current,
        settings: response.settings,
        summary: response.summary,
      }))
      setCountdown(response.settings.autoRefreshSeconds)
      pushToast(response.message || successText, 'success')
    } catch (error: any) {
      const message = error?.message || 'Ayar güncellenemedi'
      setErrorText(message)
      pushToast(message, 'error')
    } finally {
      setBusyKey(null)
    }
  }

  async function toggleAutoRoute(value: boolean) {
    setBusyKey('auto-route')
    setErrorText(null)
    try {
      const response = await request<{ settings: DashboardSettings; message: string }>('/api/route', {
        method: 'POST',
        body: JSON.stringify({ autoRouteEnabled: value, activeAgentId: status.settings.activeAgentId, routingThreshold: settingsDraft.routingThreshold }),
      })
      setStatus((current) => ({
        ...current,
        settings: response.settings,
      }))
      pushToast(response.message, 'success')
    } catch (error: any) {
      const message = error?.message || 'Auto route güncellenemedi'
      setErrorText(message)
      pushToast(message, 'error')
    } finally {
      setBusyKey(null)
    }
  }

  async function switchProfile(profile: CodexProfile, scope: 'current-session' | 'all-sessions') {
    setBusyKey(`switch-${profile.profileId}-${scope}`)
    setErrorText(null)
    try {
      const response = await request<{ profiles: CodexProfile[]; settings: DashboardSettings; message: string }>('/api/switch', {
        method: 'POST',
        body: JSON.stringify({ profileId: profile.profileId, scope }),
      })
      setStatus((current) => ({
        ...current,
        profiles: response.profiles,
        settings: response.settings,
      }))
      setFocusedProfileId(profile.profileId)
      pushToast(response.message, 'success')
    } catch (error: any) {
      const message = error?.message || 'Profil değiştirilemedi'
      setErrorText(message)
      pushToast(message, 'error')
    } finally {
      setBusyKey(null)
    }
  }

  function openEdit(profile: CodexProfile) {
    setEditingProfileId(profile.profileId)
    setEditDisplayName(profile.displayName)
    setEditNote(profile.note)
  }

  async function saveProfileMeta(profileId: string) {
    setBusyKey(`meta-${profileId}`)
    try {
      const response = await request<{ profiles: CodexProfile[]; message: string }>('/api/profile-meta', {
        method: 'POST',
        body: JSON.stringify({ profileId, displayName: editDisplayName, note: editNote }),
      })
      setStatus((current) => ({
        ...current,
        profiles: response.profiles,
      }))
      setEditingProfileId(null)
      pushToast(response.message, 'success')
    } catch (error: any) {
      const message = error?.message || 'Profil metadata kaydedilemedi'
      setErrorText(message)
      pushToast(message, 'error')
    } finally {
      setBusyKey(null)
    }
  }

  async function hideProfile(profileId: string) {
    const confirmed = window.confirm('Bu profili sadece panel listesinden gizleyeceğim. Devam edeyim mi?')
    if (!confirmed) return

    setBusyKey(`delete-${profileId}`)
    try {
      const response = await request<{ profiles: CodexProfile[]; settings: DashboardSettings; message: string }>('/api/profile-delete', {
        method: 'POST',
        body: JSON.stringify({ profileId }),
      })
      setStatus((current) => ({
        ...current,
        profiles: response.profiles,
        settings: response.settings,
      }))
      if (editingProfileId === profileId) setEditingProfileId(null)
      pushToast(response.message, 'success')
    } catch (error: any) {
      const message = error?.message || 'Profil gizlenemedi'
      setErrorText(message)
      pushToast(message, 'error')
    } finally {
      setBusyKey(null)
    }
  }

  async function restartGateway() {
    setBusyKey('gateway')
    setErrorText(null)
    try {
      const response = await request<{ message: string }>('/api/gateway-restart', {
        method: 'POST',
        body: JSON.stringify({}),
      })
      pushToast(response.message, 'success')
      await loadData(true)
    } catch (error: any) {
      const message = error?.message || 'Gateway restart başarısız'
      setErrorText(message)
      pushToast(message, 'error')
    } finally {
      setBusyKey(null)
    }
  }

  async function startAuthSession() {
    setBusyKey('auth-start')
    setErrorText(null)
    try {
      const response = await request<{ authSession: AuthSessionState; message: string }>('/api/auth-session/start', {
        method: 'POST',
        body: JSON.stringify({}),
      })
      setAuthSession(response.authSession)
      setCallbackValue('')
      setAuthWorkspace('')
      pushToast(response.message, 'success')
    } catch (error: any) {
      const message = error?.message || 'Auth session başlatılamadı'
      setErrorText(message)
      pushToast(message, 'error')
    } finally {
      setBusyKey(null)
    }
  }

  async function submitAuthSession() {
    if (!authSession) return
    setBusyKey('auth-submit')
    setErrorText(null)
    try {
      const response = await request<{ profiles: CodexProfile[]; authSession: AuthSessionState | null; message: string }>('/api/auth-session/submit', {
        method: 'POST',
        body: JSON.stringify({
          sessionId: authSession.sessionId,
          callbackValue,
          displayName: authDisplayName,
          note: authNote,
          workspace: authWorkspace,
        }),
      })
      setStatus((current) => ({ ...current, profiles: response.profiles }))
      setAuthSession(response.authSession)
      pushToast(response.message, 'success')
    } catch (error: any) {
      const message = error?.message || 'Yeni profil kaydedilemedi'
      setErrorText(message)
      pushToast(message, 'error')
    } finally {
      setBusyKey(null)
    }
  }

  async function cancelAuthSession() {
    if (!authSession) return
    setBusyKey('auth-cancel')
    try {
      const response = await request<{ authSession: null; message: string }>('/api/auth-session/cancel', {
        method: 'POST',
        body: JSON.stringify({ sessionId: authSession.sessionId }),
      })
      setAuthSession(response.authSession)
      setCallbackValue('')
      setAuthWorkspace('')
      pushToast(response.message, 'success')
    } catch (error: any) {
      const message = error?.message || 'Auth session iptal edilemedi'
      setErrorText(message)
      pushToast(message, 'error')
    } finally {
      setBusyKey(null)
    }
  }

  async function createManagedProfile() {
    if (!newProfileSourceId || !newProfileWorkspace.trim()) return
    setBusyKey('profile-create')
    setErrorText(null)
    try {
      const response = await request<{ profiles: CodexProfile[]; settings: DashboardSettings; message: string }>('/api/profile-create', {
        method: 'POST',
        body: JSON.stringify({
          sourceProfileId: newProfileSourceId,
          displayName: newProfileDisplayName,
          workspace: newProfileWorkspace,
          note: newProfileNote,
        }),
      })
      setStatus((current) => ({
        ...current,
        profiles: response.profiles,
        settings: response.settings,
      }))
      const created = response.profiles.find((profile) => profile.profileId === response.settings.currentSessionProfileId)
      setFocusedProfileId(created?.profileId || null)
      setNewProfileDisplayName('')
      setNewProfileWorkspace('')
      setNewProfileNote('')
      pushToast(response.message, 'success')
    } catch (error: any) {
      const message = error?.message || 'Business profil oluşturulamadı'
      setErrorText(message)
      pushToast(message, 'error')
    } finally {
      setBusyKey(null)
    }
  }

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>Operator Console</p>
          <h1>Codex Profilleri</h1>
          <p className={styles.lead}>
            Gerçek OpenClaw openai-codex auth helper akışıyla çoklu hesap, profil ve workspace durumunu tek ekranda yönet.
          </p>
        </div>
        <div className={styles.heroMeta}>
          <span className={styles.metaChip}>Son yenilenme: {formatDate(status.lastRefreshedAt)}</span>
          <span className={styles.countdownChip}>Auto refresh {countdown}s</span>
        </div>
      </section>

      <section className={styles.actionBar}>
        <div className={styles.actionGroup}>
          <button className={styles.primaryButton} onClick={restartGateway} disabled={busyKey === 'gateway'}>
            {busyKey === 'gateway' ? 'Restarting...' : 'OpenClaw Gateway Restart'}
          </button>
          <button className={styles.secondaryButton} onClick={() => loadData(false)} disabled={busyKey === 'refresh'}>
            {busyKey === 'refresh' ? 'Yenileniyor...' : 'Manuel yenile'}
          </button>
        </div>

        <div className={styles.actionGroup}>
          <label className={styles.inlineControl}>
            <span>Auto route</span>
            <button
              className={classNames(styles.toggle, status.settings.autoRouteEnabled && styles.toggleActive)}
              onClick={() => toggleAutoRoute(!status.settings.autoRouteEnabled)}
              disabled={busyKey === 'auto-route'}
              type="button"
            >
              {status.settings.autoRouteEnabled ? 'Açık' : 'Kapalı'}
            </button>
          </label>

          <label className={styles.inlineControl}>
            <span>Agent</span>
            <select
              value={status.settings.activeAgentId}
              onChange={(event) => updateSettings({ activeAgentId: event.target.value })}
            >
              {agentOptions.map((agent) => <option key={agent} value={agent}>{agent}</option>)}
            </select>
          </label>

          <label className={styles.inlineControl}>
            <span>Görünüm</span>
            <select
              value={status.settings.viewFilter}
              onChange={(event) => updateSettings({ viewFilter: event.target.value as DashboardSettings['viewFilter'] }, 'Görünüm filtresi güncellendi')}
            >
              {viewOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
          </label>
        </div>
      </section>

      {errorText ? <div className={styles.errorBanner}>{errorText}</div> : null}

      <section className={styles.summaryGrid}>
        <SummaryCard label="Toplam profil" value={status.summary.totalProfiles} />
        <SummaryCard label="Sağlıklı profil" value={status.summary.healthyProfiles} />
        <SummaryCard label="Current profil" value={status.summary.currentSessionProfile || 'Yok'} />
        <SummaryCard label="Önerilen profil" value={status.summary.recommendedProfile || 'Yok'} />
        <SummaryCard label="Aktif agent" value={status.summary.activeAgentId} note={`Durum: ${status.summary.activeAgentStatus}`} />
        <SummaryCard label="Workspace" value={status.summary.workspace} />
        <SummaryCard label="Model" value={status.summary.currentModel} />
      </section>

      <section className={styles.tableSection}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>Profil matrisi</h2>
            <p>Gerçek auth profilleri, agent görünümü ve workspace bağı aynı tabloda.</p>
          </div>
          {focusedProfileId ? <span className={styles.metaChip}>Odak profil: {status.profiles.find((item) => item.profileId === focusedProfileId)?.displayName || focusedProfileId}</span> : null}
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Durum</th>
                <th>Profil</th>
                <th>Agent / Workspace</th>
                <th>Hesap</th>
                <th>Tür / Plan</th>
                <th>5 saat</th>
                <th>1 hafta</th>
                <th>Son kullanım</th>
                <th>Current</th>
                <th>Session</th>
                <th>Not</th>
                <th>Öneri</th>
                <th>Aksiyonlar</th>
              </tr>
            </thead>
            <tbody>
              {filteredProfiles.map((profile) => (
                <FragmentRow key={profile.profileId}>
                  <tr className={classNames(focusedProfileId === profile.profileId && styles.focusedRow)}>
                    <td>
                      <div className={styles.statusCell}>
                        <span className={classNames(styles.statusDot, styles[`status_${profile.health}` as keyof typeof styles])} />
                        <span>{healthText(profile.health)}</span>
                      </div>
                    </td>
                    <td>
                      <div className={styles.profileCell}>
                        <strong>{profile.displayName}</strong>
                        <span className={styles.subtle}>{profile.profileId}</span>
                      </div>
                    </td>
                    <td>
                      <div className={styles.profileCell}>
                        <span>{profile.agentId}</span>
                        <span className={styles.subtle}>{profile.workspace || 'workspace yok'}</span>
                      </div>
                    </td>
                    <td>
                      <div className={styles.profileCell}>
                        <span>{profile.email}</span>
                        <span className={styles.subtle}>{profile.accountId}</span>
                        {profile.duplicateAccount ? <span className={styles.warnBadge}>aynı hesap</span> : null}
                      </div>
                    </td>
                    <td>
                      <div className={styles.profileCell}>
                        <span>{kindLabel(profile)}</span>
                        <span className={styles.subtle}>{profile.planType}</span>
                      </div>
                    </td>
                    <td>
                      <ProgressCell value={profile.usage.fiveHourPct} resetAt={profile.usage.fiveHourResetAt} />
                    </td>
                    <td>
                      <ProgressCell value={profile.usage.weekPct} resetAt={profile.usage.weekResetAt} />
                    </td>
                    <td>
                      <div className={styles.profileCell}>
                        <span>{timeAgo(profile.lastUsedAt)}</span>
                        <span className={styles.subtle}>{formatDate(profile.lastUsedAt)}</span>
                      </div>
                    </td>
                    <td>{profile.isCurrentProfile ? <span className={styles.currentBadge}>Current</span> : '-'}</td>
                    <td>{profile.recentSessionCount}</td>
                    <td className={styles.noteCell}>{profile.note || '-'}</td>
                    <td>{profile.recommended ? <span className={styles.recommendBadge}>Öneriliyor</span> : '-'}</td>
                    <td>
                      <div className={styles.actionStack}>
                        <button className={styles.secondaryButton} onClick={() => { setFocusedProfileId(profile.profileId); pushToast(`${profile.displayName} odak profile alındı`, 'info') }}>
                          Odak al
                        </button>
                        <button className={styles.secondaryButton} onClick={() => switchProfile(profile, 'current-session')} disabled={busyKey === `switch-${profile.profileId}-current-session`}>
                          Current yap
                        </button>
                        <button
                          className={styles.secondaryButton}
                          onClick={() => switchProfile(profile, 'all-sessions')}
                          disabled={!canSetGlobal(profile) || busyKey === `switch-${profile.profileId}-all-sessions`}
                          title={canSetGlobal(profile) ? 'Gerçek auth sırasını agent üzerinde değiştirir' : 'Sadece gerçek auth profillerde çalışır'}
                        >
                          Agent varsayılanı yap
                        </button>
                        <button className={styles.secondaryButton} onClick={() => openEdit(profile)}>Düzenle</button>
                        <button className={styles.dangerButton} onClick={() => hideProfile(profile.profileId)} disabled={busyKey === `delete-${profile.profileId}`}>
                          Listeden gizle
                        </button>
                      </div>
                    </td>
                  </tr>
                  {editingProfileId === profile.profileId ? (
                    <tr>
                      <td colSpan={13}>
                        <div className={styles.inlineEditor}>
                          <div className={styles.formRow}>
                            <label className={styles.fieldBlock}>
                              <span>Görünen isim</span>
                              <input value={editDisplayName} onChange={(event) => setEditDisplayName(event.target.value)} />
                            </label>
                            <label className={styles.fieldBlock}>
                              <span>Kısa not</span>
                              <textarea rows={3} value={editNote} onChange={(event) => setEditNote(event.target.value)} />
                            </label>
                          </div>
                          <div className={styles.editorActions}>
                            <button className={styles.primaryButton} onClick={() => saveProfileMeta(profile.profileId)} disabled={busyKey === `meta-${profile.profileId}`}>
                              Kaydet
                            </button>
                            <button className={styles.secondaryButton} onClick={() => setEditingProfileId(null)}>İptal</button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ) : null}
                </FragmentRow>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.bottomGrid}>
        <article className={styles.panel}>
          <div className={styles.sectionHeader}>
            <div>
              <h2>Yeni auth profili ekle</h2>
              <p>Bu akış gerçek OpenClaw openai-codex login helper’ını çağırır.</p>
            </div>
          </div>

          <div className={styles.authGuide}>
            <ol>
              <li>Auth link üret.</li>
              <li>Linki kendi cihazındaki tarayıcıda aç.</li>
              <li>İstersen bu profile isim, business/workspace ve kısa not gir.</li>
              <li>Dönen callback URL veya code değerini buraya yapıştır.</li>
            </ol>
            <p className={styles.summaryNote}>Aynı OpenAI hesabını tekrar auth edersen yeni satır açılmayabilir, mevcut profil güncellenir.</p>
          </div>

          <div className={styles.inlineActionRow}>
            <button className={styles.primaryButton} onClick={startAuthSession} disabled={busyKey === 'auth-start' || Boolean(authSession)}>
              {busyKey === 'auth-start' ? 'Üretiliyor...' : 'Auth link üret'}
            </button>
            {authSession ? <span className={styles.metaChip}>Aktif session: {authSession.sessionId} • {authStatusText(authSession.status)}</span> : null}
          </div>

          {authSession ? (
            <div className={styles.authBox}>
              <label className={styles.fieldBlock}>
                <span>Auth link</span>
                <div className={styles.linkRow}>
                  <input value={authSession.authUrl} readOnly />
                  <button className={styles.secondaryButton} onClick={() => navigator.clipboard.writeText(authSession.authUrl).then(() => pushToast('Auth link kopyalandı', 'success'))}>Kopyala</button>
                </div>
              </label>
              <div className={styles.formRow}>
                <label className={styles.fieldBlock}>
                  <span>Profil adı</span>
                  <input value={authDisplayName} onChange={(event) => setAuthDisplayName(event.target.value)} placeholder="Örn: kişisel hesap, yedek hesap, müşteri-1" />
                </label>
                <label className={styles.fieldBlock}>
                  <span>Business / Workspace</span>
                  <input value={authWorkspace} onChange={(event) => setAuthWorkspace(event.target.value)} placeholder="Örn: berber-hasan, arnavutkoy-demo, cafe-1" />
                </label>
              </div>
              <label className={styles.fieldBlock}>
                <span>Kısa not</span>
                <input value={authNote} onChange={(event) => setAuthNote(event.target.value)} placeholder="Örn: haftalık limiti yüksek, ekip hesabı" />
              </label>
              <label className={styles.fieldBlock}>
                <span>Callback URL / code</span>
                <textarea rows={4} value={callbackValue} onChange={(event) => setCallbackValue(event.target.value)} placeholder="Tarayıcıdan dönen callback URL veya code değerini buraya yapıştır" />
              </label>
              {authSession.error ? <div className={styles.errorBanner}>{authSession.error}</div> : null}
              <div className={styles.editorActions}>
                <button className={styles.primaryButton} onClick={submitAuthSession} disabled={busyKey === 'auth-submit' || authSession.status === 'verifying' || !callbackValue.trim()}>
                  {busyKey === 'auth-submit' ? 'Gönderiliyor...' : authSession.status === 'verifying' ? 'Doğrulanıyor...' : 'Doğrulamayı başlat'}
                </button>
                <button className={styles.secondaryButton} onClick={cancelAuthSession} disabled={busyKey === 'auth-cancel'}>İptal</button>
              </div>
            </div>
          ) : null}
        </article>

        <article className={styles.panel}>
          <div className={styles.sectionHeader}>
            <div>
              <h2>Mevcut auth'tan business profil oluştur</h2>
              <p>Aynı hesabı farklı işletme/workspace profillerine ayır.</p>
            </div>
          </div>
          <div className={styles.formRow}>
            <label className={styles.fieldBlock}>
              <span>Kaynak auth profil</span>
              <select value={newProfileSourceId} onChange={(event) => setNewProfileSourceId(event.target.value)}>
                {authProfileOptions.map((profile) => <option key={profile.profileId} value={profile.profileId}>{profile.displayName} · {profile.email}</option>)}
              </select>
            </label>
            <label className={styles.fieldBlock}>
              <span>Business / Workspace</span>
              <input value={newProfileWorkspace} onChange={(event) => setNewProfileWorkspace(event.target.value)} placeholder="Örn: berber-hasan, cafe-1, güzellik-salonu-demo" />
            </label>
          </div>
          <div className={styles.formRow}>
            <label className={styles.fieldBlock}>
              <span>Görünen ad</span>
              <input value={newProfileDisplayName} onChange={(event) => setNewProfileDisplayName(event.target.value)} placeholder="Örn: Hasan Berber, Cafe Demo, Müşteri 03" />
            </label>
            <label className={styles.fieldBlock}>
              <span>Kısa not</span>
              <input value={newProfileNote} onChange={(event) => setNewProfileNote(event.target.value)} placeholder="Örn: aynı hesap, farklı işletme profili" />
            </label>
          </div>
          <div className={styles.inlineActionRow}>
            <button className={styles.primaryButton} onClick={createManagedProfile} disabled={busyKey === 'profile-create' || !authProfileOptions.length || !newProfileWorkspace.trim()}>
              {busyKey === 'profile-create' ? 'Kaydediliyor...' : 'Business profil oluştur'}
            </button>
            <span className={styles.summaryNote}>Bu işlem yeni auth açmaz, mevcut hesabın üstüne ayrı business/workspace profili ekler.</span>
          </div>
        </article>

        <article className={styles.panel}>
          <div className={styles.sectionHeader}>
            <div>
              <h2>Ayarlar</h2>
              <p>Routing ve operator görünümü ayarları</p>
            </div>
          </div>
          <div className={styles.formRow}>
            <label className={styles.fieldBlock}>
              <span>Routing threshold</span>
              <input type="number" min={50} max={95} value={settingsDraft.routingThreshold} onChange={(event) => setSettingsDraft((current) => ({ ...current, routingThreshold: Number(event.target.value) }))} />
            </label>
            <label className={styles.fieldBlock}>
              <span>Aktif agent</span>
              <select value={status.settings.activeAgentId} onChange={(event) => updateSettings({ activeAgentId: event.target.value }, 'Aktif agent değişti')}>
                {agentOptions.map((agent) => <option key={agent} value={agent}>{agent}</option>)}
              </select>
            </label>
          </div>
          <div className={styles.formRow}>
            <label className={styles.fieldBlock}>
              <span>Workspace</span>
              <input value={settingsDraft.workspace} onChange={(event) => setSettingsDraft((current) => ({ ...current, workspace: event.target.value }))} />
            </label>
            <label className={styles.fieldBlock}>
              <span>Model</span>
              <input value={settingsDraft.currentModel} onChange={(event) => setSettingsDraft((current) => ({ ...current, currentModel: event.target.value }))} />
            </label>
          </div>
          <div className={styles.inlineActionRow}>
            <label className={styles.inlineControl}>
              <span>AutoRouteEnabled</span>
              <button
                className={classNames(styles.toggle, status.settings.autoRouteEnabled && styles.toggleActive)}
                onClick={() => toggleAutoRoute(!status.settings.autoRouteEnabled)}
                type="button"
              >
                {status.settings.autoRouteEnabled ? 'Açık' : 'Kapalı'}
              </button>
            </label>
            <button className={styles.primaryButton} onClick={() => updateSettings({
              routingThreshold: settingsDraft.routingThreshold,
              workspace: settingsDraft.workspace,
              currentModel: settingsDraft.currentModel,
            })} disabled={busyKey === 'settings'}>
              Ayarları kaydet
            </button>
          </div>
        </article>
      </section>

      <div className={styles.toastArea}>
        {toasts.map((toast) => (
          <div key={toast.id} className={classNames(styles.toast, toast.tone === 'success' && styles.toastSuccess, toast.tone === 'error' && styles.toastError)}>
            {toast.text}
          </div>
        ))}
      </div>
    </div>
  )
}

function FragmentRow({ children }: { children: ReactNode }) {
  return <>{children}</>
}
