import Link from 'next/link'
import { ReactNode } from 'react'

type NavItem = {
  href: string
  label: string
  note: string
}

const navItems: NavItem[] = [
  { href: '/project-os', label: 'Project OS', note: 'Akış ve operasyon' },
  { href: '/context-center', label: 'Context Center', note: 'Bağlam ve dosyalar' },
  { href: '/consultation-center', label: 'Consultation Center', note: 'GPT Pro hazırlığı' },
  { href: '/codex-profilleri', label: 'Codex Profilleri', note: 'Auth ve profil yönetimi' },
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
          <p className="muted">Tek panel içinde proje, bağlam, consultation ve Codex operasyonu.</p>
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
          <Link href="/codex-profilleri" className="ghost-link">Codex profillerine dön</Link>
        </header>
        {children}
      </main>
    </div>
  )
}
