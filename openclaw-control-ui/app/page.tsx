import Link from 'next/link'
import { AdminShell } from '@/components/admin/AdminShell'

export default function HomePage() {
  return (
    <AdminShell
      title="İç operasyon merkezi"
      description="Yeni hesap sistemiyle birlikte proje akışı, bağlam merkezi ve consultation hazırlığını sade şekilde kuruyoruz."
    >
      <section className="hero">
        <div>
          <p className="eyebrow">Şimdi aktif</p>
          <h1>Sade admin omurgası</h1>
          <p className="muted">
            Bu ana giriş artık yeni Hesap Merkezi ile gerçek auth/profil sistemini ayrı bir çekirdek olarak görünür başlatıyor.
          </p>
        </div>
        <Link href="/hesap-merkezi" className="cta-link">Hesap Merkezi'ni aç</Link>
      </section>

      <section className="grid-3" style={{ marginTop: 24 }}>
        <article className="card">
          <h3>Hesap Merkezi</h3>
          <p className="muted">Eski Codex ekranından ayrı, gerçek auth kayıtlarını net göstermek için başlatılan yeni sistem.</p>
        </article>
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
