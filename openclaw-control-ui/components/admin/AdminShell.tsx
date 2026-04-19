'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

type NavItem = {
  href: string
  label: string
  note: string
}

const navItems: NavItem[] = [
  { href: '/hesap-merkezi', label: 'Hesap Merkezi', note: 'Gerçek auth ve operatör kayıtları' },
  { href: '/project-os', label: 'Project OS', note: 'Audit, teklif ve teslimat akışı' },
  { href: '/context-center', label: 'Context Center', note: 'Dosya, veri ve prompt ayrımı' },
  { href: '/consultation-center', label: 'Consultation Center', note: 'Temiz brief ve danışma hazırlığı' },
  { href: '/codex-profilleri', label: 'Codex Profilleri', note: 'Eski ekran, hâlâ erişilebilir' },
]

function classNames(...items: Array<string | false | null | undefined>) {
  return items.filter(Boolean).join(' ')
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

  return (
    <div className="page-shell">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-mark">
            <span className="brand-dot" />
            EsnafDigital Admin
          </div>
          <h1>İç operasyon paneli</h1>
          <p className="muted">Güven veren, sade ve okunur bir operator yüzeyi. Her ekranda tek ana iş daha net görünür.</p>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href} className={classNames('nav-link', isActive && 'nav-link-active')}>
                <strong>{item.label}</strong>
                <p className="muted">{item.note}</p>
              </Link>
            )
          })}
        </nav>

        <div className="sidebar-footer">
          <p className="eyebrow">Tasarım çizgisi</p>
          <p className="muted">Inter, açık yüzeyler, brand + accent aksı, kısa Türkçe mikro metin ve border-first kart yaklaşımı aktif.</p>
        </div>
      </aside>

      <main className="content">
        <div className="page-body">
          <div className="topbar">
            <div className="topbar-meta">
              <span className="topbar-badge">Faz 1</span>
              <span className="topbar-note">Yeni Tasarım Sistemi aktif</span>
            </div>
            <div className="topbar-actions">
              <Link href="/" className="ghost-link">Ana giriş</Link>
            </div>
          </div>

          <header className="page-header">
            <div>
              <p className="eyebrow">EsnafDigital panel</p>
              <h2>{title}</h2>
              <p className="muted">{description}</p>
            </div>
            <div className="page-header-actions">
              <Link href="/hesap-merkezi" className="ghost-link">Hesap Merkezi</Link>
            </div>
          </header>

          {children}
        </div>
      </main>
    </div>
  )
}
