'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'

type ThemeMode = 'light' | 'dark'

type NavItem = {
  href: string
  label: string
  note: string
}

type NavGroup = {
  title: string
  items: NavItem[]
}

const navGroups: NavGroup[] = [
  {
    title: 'Ana akış',
    items: [
      { href: '/businesses', label: 'İşletmeler', note: 'Tüm kayıt listesi ve detay geçişi' },
      { href: '/prompt-uretimi', label: 'Prompt Üretimi', note: 'Tek işi hazır GPT promptu üretmek' },
      { href: '/discovery', label: 'Keşif', note: 'Apify aday tablosu ve ön eleme görünümü' },
    ],
  },
  {
    title: 'Sistem',
    items: [
      { href: '/hesap-merkezi', label: 'Hesaplar', note: 'Giriş doğrulaması ve operatör kayıtları' },
    ],
  },
]

function classNames(...items: Array<string | false | null | undefined>) {
  return items.filter(Boolean).join(' ')
}

function getInitialTheme(): ThemeMode {
  if (typeof document !== 'undefined') {
    const current = document.documentElement.dataset.theme
    if (current === 'dark' || current === 'light') return current
  }

  if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }

  return 'light'
}

function applyTheme(theme: ThemeMode) {
  if (typeof document !== 'undefined') {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
  }

  if (typeof window !== 'undefined') {
    window.localStorage.setItem('esnafdijital-admin-theme', theme)
  }
}

export function AdminShell({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: ReactNode
}) {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [theme, setTheme] = useState<ThemeMode>(() => getInitialTheme())

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  useEffect(() => {
    if (typeof document === 'undefined') {
      return
    }

    const previousOverflow = document.body.style.overflow

    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isMenuOpen])

  useEffect(() => {
    if (!isMenuOpen || typeof window === 'undefined') {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isMenuOpen])

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)
    applyTheme(nextTheme)
  }

  return (
    <div className="page-shell">
      <button
        type="button"
        className={classNames('sidebar-backdrop', isMenuOpen && 'sidebar-backdrop-visible')}
        aria-label="Menüyü kapat"
        onClick={() => setIsMenuOpen(false)}
      />

      <aside id="admin-sidebar" className={classNames('sidebar', isMenuOpen && 'sidebar-open')}>
        <div className="sidebar-mobile-header">
          <span className="eyebrow">Menü</span>
          <button type="button" className="button-secondary sidebar-close" onClick={() => setIsMenuOpen(false)}>
            Kapat
          </button>
        </div>

        <nav className="sidebar-nav">
          {navGroups.map((group) => (
            <div key={group.title} className="stack-sm">
              <p className="eyebrow">{group.title}</p>
              <div className="stack-sm">
                {group.items.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
                  return (
                    <Link key={item.href} href={item.href} className={classNames('nav-link', isActive && 'nav-link-active')} onClick={() => setIsMenuOpen(false)}>
                      <strong>{item.label}</strong>
                      <p className="muted">{item.note}</p>
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="sidebar-footer stack-sm">
          <button type="button" className="button-secondary" onClick={toggleTheme} aria-pressed={theme === 'dark'}>
            {theme === 'dark' ? 'Açık moda geç' : 'Koyu moda geç'}
          </button>
        </div>
      </aside>

      <main className="content">
        <div className="page-body">
          <div className="mobile-topbar">
            <button
              type="button"
              className="button-secondary mobile-nav-trigger"
              aria-expanded={isMenuOpen}
              aria-controls="admin-sidebar"
              aria-label={isMenuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
              onClick={() => setIsMenuOpen(true)}
            >
              <span className="menu-trigger-icon" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>

          <header className="page-header">
            <div>
              <p className="eyebrow">EsnafDigital panel</p>
              <h2>{title}</h2>
              <p className="muted">{description}</p>
            </div>
          </header>

          {children}
        </div>
      </main>
    </div>
  )
}
