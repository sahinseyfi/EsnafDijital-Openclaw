import Link from 'next/link'
import { ReactNode } from 'react'

type NavItem = {
  href: string
  label: string
  note: string
}

const navItems: NavItem[] = [
  { href: '/hesap-merkezi', label: 'Hesap Merkezi', note: 'Yeni auth/profil sistemi' },
  { href: '/project-os', label: 'Project OS', note: 'Akış ve operasyon' },
  { href: '/context-center', label: 'Context Center', note: 'Bağlam ve dosyalar' },
  { href: '/consultation-center', label: 'Consultation Center', note: 'GPT Pro hazırlığı' },
  { href: '/codex-profilleri', label: 'Codex Profilleri', note: 'Eski ekran' },
]

export function AdminShell({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <div className="page-shell">
      <aside className="sidebar">
        <div>
          <p className="eyebrow">EsnafDigital Admin</p>
          <h1>İç sistem</h1>
          <p className="muted">Yeni hesap sistemi, proje akışı ve bağlam merkezini tek panelde topluyoruz.</p>
        </div>

        <nav>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link">
              <strong>{item.label}</strong>
              <p className="muted">{item.note}</p>
            </Link>
          ))}
        </nav>
      </aside>

      <main className="content">
        <header className="page-header">
          <div>
            <p className="eyebrow">Faz 1</p>
            <h2>{title}</h2>
            <p className="muted">{description}</p>
          </div>
          <Link href="/hesap-merkezi" className="ghost-link">Hesap Merkezi'ne dön</Link>
        </header>
        {children}
      </main>
    </div>
  )
}
