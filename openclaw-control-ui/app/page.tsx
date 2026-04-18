import Link from 'next/link'
import { AdminShell } from '@/components/admin/AdminShell'

export default function HomePage() {
  return (
    <AdminShell
      title="İç operasyon merkezi"
      description="Sıradaki üç çekirdeği tek panelde görünür başlatıyoruz: proje akışı, bağlam merkezi ve consultation hazırlığı."
    >
      <section className="hero">
        <div>
          <p className="eyebrow">Şimdi aktif</p>
          <h1>Sade admin omurgası</h1>
          <p className="muted">
            Bu ana giriş artık sadece Codex ekranına atmak yerine sonraki gerçek operasyon modüllerini görünür hale getiriyor.
          </p>
        </div>
        <Link href="/project-os" className="cta-link">Project OS ekranını aç</Link>
      </section>

      <section className="grid-3" style={{ marginTop: 24 }}>
        <article className="card">
          <h3>Project OS</h3>
          <p className="muted">Audit, teklif, teslimat ve bakım akışını tek yerden takip etmek için başlangıç iskeleti.</p>
        </article>
        <article className="card">
          <h3>Context Center</h3>
          <p className="muted">Hangi bilgi dosyada, hangisi veritabanında kalacak sorusunu merkezileştiren ilk çerçeve.</p>
        </article>
        <article className="card">
          <h3>Consultation Center</h3>
          <p className="muted">GPT Pro için temiz brief, soru seti ve çıktı formatı hazırlayan çalışma alanı.</p>
        </article>
      </section>
    </AdminShell>
  )
}
