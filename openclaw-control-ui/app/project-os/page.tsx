import { AdminShell } from '@/components/admin/AdminShell'

const pipeline = [
  {
    title: 'Audit kuyruğu',
    items: ['Yeni işletme kaydı', 'İlk audit notu', 'Teklife dönüşecek auditler'],
  },
  {
    title: 'Teklif hattı',
    items: ['Hazırlanan teklifler', 'Bekleyen onaylar', 'Revizyon isteyenler'],
  },
  {
    title: 'Teslimat ve bakım',
    items: ['Aktif teslimatlar', 'Yayına alınan işler', 'Bakım/güncelleme talepleri'],
  },
]

export default function ProjectOsPage() {
  return (
    <AdminShell
      title="Project OS"
      description="Audit → teklif → teslimat → bakım akışını panel mantığında görünür hale getiren başlangıç ekranı."
    >
      <section className="stats-grid">
        <article className="card stat-card">
          <strong>4</strong>
          <p className="muted">Çekirdek aşama: audit, teklif, teslimat, bakım</p>
        </article>
        <article className="card stat-card">
          <strong>1</strong>
          <p className="muted">Tek ana akış, CRM'e kaymadan sade operasyon</p>
        </article>
      </section>

      <section className="grid-3" style={{ marginTop: 24 }}>
        {pipeline.map((column) => (
          <article key={column.title} className="card">
            <h3>{column.title}</h3>
            <ul className="list">
              {column.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>
        ))}
      </section>
    </AdminShell>
  )
}
