'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

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
      { href: '/project-os', label: 'İş Takibi', note: 'Audit, teklif ve teslimat akışı' },
      { href: '/consultation-center', label: 'Karar Hazırlığı', note: 'Prompt ve danışma hazırlığı' },
    ],
  },
  {
    title: 'Sistem',
    items: [
      { href: '/hesap-merkezi', label: 'Hesaplar', note: 'Auth ve operatör kayıtları' },
      { href: '/context-center', label: 'Bağlam', note: 'Dosya, veri ve karar yüzeyi' },
    ],
  },
  {
    title: 'Eski ekran',
    items: [
      { href: '/codex-profilleri', label: 'Profil araçları', note: 'Eski profil ekranı' },
    ],
  },
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
          {navGroups.map((group) => (
            <div key={group.title} className="stack-sm">
              <p className="eyebrow">{group.title}</p>
              <div className="stack-sm">
                {group.items.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link key={item.href} href={item.href} className={classNames('nav-link', isActive && 'nav-link-active')}>
                      <strong>{item.label}</strong>
                      <p className="muted">{item.note}</p>
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <p className="eyebrow">Kısa kural</p>
          <p className="muted">Önce iş, sonra karar, sonra bağlam. Menü akışı da bu sırayı izler.</p>
        </div>
      </aside>

      <main className="content">
        <div className="page-body">
          <div className="topbar">
            <div className="topbar-meta">
              <span className="topbar-badge">Faz 1</span>
              <span className="topbar-note">Sade akış menüsü aktif</span>
            </div>
            <div className="topbar-actions">
              <Link href="/project-os" className="ghost-link">İş Takibi</Link>
            </div>
          </div>

          <header className="page-header">
            <div>
              <p className="eyebrow">EsnafDigital panel</p>
              <h2>{title}</h2>
              <p className="muted">{description}</p>
            </div>
            <div className="page-header-actions">
              <Link href="/project-os" className="ghost-link">Ana akışa dön</Link>
            </div>
          </header>

          {children}
        </div>
      </main>
    </div>
  )
}
