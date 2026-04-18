import { AdminShell } from '@/components/admin/AdminShell'

const buckets = [
  {
    title: 'Dosya tabanlı bağlam',
    items: ['PROJECT / ROADMAP / HEARTBEAT', 'Karar logları', 'Prompt için seçilecek sabit bağlam'],
  },
  {
    title: 'Veritabanına taşınacaklar',
    items: ['businesses', 'audits', 'offers', 'delivery_projects'],
  },
  {
    title: 'Karar soruları',
    items: ['Neyi kalıcı tutacağız?', 'Neyi sadece operasyon datası sayacağız?', 'Hangi ekran hangi kaynağı okuyacak?'],
  },
]

export default function ContextCenterPage() {
  return (
    <AdminShell
      title="Context Center"
      description="Bağlamın kontrolsüz büyümemesi için dosya, veritabanı ve prompt katmanlarını ayıran ilk merkez ekran."
    >
      <section className="hero">
        <div>
          <p className="eyebrow">Amaç</p>
          <h1>Bağlamı nereye koyacağımızı netleştirmek</h1>
          <p className="muted">Bu ekran bir wiki değil, karar yüzeyi. Hangi bilginin nerede yaşayacağını sade şekilde görünür kılar.</p>
        </div>
      </section>

      <section className="grid-3" style={{ marginTop: 24 }}>
        {buckets.map((bucket) => (
          <article key={bucket.title} className="card">
            <h3>{bucket.title}</h3>
            <ul className="list">
              {bucket.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>
        ))}
      </section>
    </AdminShell>
  )
}
