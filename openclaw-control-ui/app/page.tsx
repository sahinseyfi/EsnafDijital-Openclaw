import Link from 'next/link'
import { AdminShell } from '@/components/admin/AdminShell'

const pillars = [
  {
    title: 'Hesap Merkezi',
    text: 'Gerçek auth kayıtlarını, current seçimi ve operatör görünür adını tek yerde sade biçimde yönetir.',
  },
  {
    title: 'Project OS',
    text: 'Audit, teklif, teslimat ve bakım hattını ayrı araçlara dağılmadan görünür kılar.',
  },
  {
    title: 'Context Center',
    text: 'Hangi bilginin dosyada, hangisinin veri katmanında yaşaması gerektiğini netleştirir.',
  },
  {
    title: 'Consultation Center',
    text: 'Dış danışma veya GPT Pro çalışmaları için temiz brief ve seçili bağlam üretir.',
  },
]

export default function HomePage() {
  return (
    <AdminShell
      title="İç operasyon merkezi"
      description="Admin panel artık yeni marka diliyle daha açık, daha sakin ve daha güven veren bir operatör yüzeyi olarak ilerliyor."
    >
      <section className="hero">
        <div>
          <p className="eyebrow">Şimdi aktif</p>
          <h1>Sade dijital düzen</h1>
          <p className="muted">
            Bu panel, gereksiz dashboard kalabalığı yerine net aksiyonlar, okunur bilgi blokları ve kontrollü operasyon akışı için toparlandı.
          </p>
        </div>
        <div className="hero-actions">
          <Link href="/hesap-merkezi" className="cta-link">Hesap Merkezi'ni aç</Link>
          <Link href="/project-os" className="ghost-link">Project OS'a geç</Link>
        </div>
      </section>

      <section className="stats-grid">
        <article className="card stat-card">
          <strong>4</strong>
          <p className="muted">Şu an netleştirilen ana panel alanı</p>
        </article>
        <article className="card stat-card">
          <strong>1</strong>
          <p className="muted">Ana aksiyon çizgisi, her sayfada daha görünür</p>
        </article>
        <article className="card stat-card">
          <strong>0</strong>
          <p className="muted">Steril SaaS hissi, neon ton ve gereksiz kalabalık</p>
        </article>
      </section>

      <section className="grid-2">
        <article className="card">
          <h3>Yeni tasarım çizgisi</h3>
          <ul className="list">
            <li>Açık yüzey, yüksek okunabilirlik, Inter tipografi</li>
            <li>Brand mavi, destekleyici accent turkuaz</li>
            <li>Border-first kartlar, yumuşak shadow, sade mikro metin</li>
            <li>Her sayfada tek ana iş daha net görünür</li>
          </ul>
        </article>
        <article className="card">
          <h3>Bu panelin rolü</h3>
          <ul className="list">
            <li>Satış konuşmasını değil, teknik omurgayı taşır</li>
            <li>Audit → teklif → teslimat akışını görünür yapar</li>
            <li>Bağlamı ve operasyon verisini ayrı tutar</li>
            <li>Dış danışma için kirli değil, seçili brief üretir</li>
          </ul>
        </article>
      </section>

      <section className="grid-2">
        {pillars.map((pillar) => (
          <article key={pillar.title} className="card">
            <h3>{pillar.title}</h3>
            <p className="muted">{pillar.text}</p>
          </article>
        ))}
      </section>
    </AdminShell>
  )
}
