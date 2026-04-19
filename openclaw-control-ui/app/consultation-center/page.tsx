import { AdminShell } from '@/components/admin/AdminShell'

const sections = [
  {
    title: 'Brief iskeleti',
    items: ['Ne çözmek istiyoruz?', 'Hangi kısıtlar var?', 'Tam olarak nasıl bir çıktı bekliyoruz?'],
  },
  {
    title: 'Seçili bağlam',
    items: ['İlgili HEARTBEAT veya karar notu', 'Gerekli veri modeli parçaları', 'Sadece işe yarayan teknik detaylar'],
  },
  {
    title: 'Beklenen çıktı',
    items: ['Net karar', 'Uygulanabilir mimari', 'Gerekirse kod, migration veya akış önerisi'],
  },
]

export default function ConsultationCenterPage() {
  return (
    <AdminShell
      title="Consultation Center"
      description="GPT Pro veya dış danışma öncesinde dağınık konuşma yerine temiz brief, seçili bağlam ve net çıktı beklentisi kuran alan."
    >
      <section className="hero">
        <div>
          <p className="eyebrow">Danışma hazırlığı</p>
          <h1>Temiz brief, temiz sonuç</h1>
          <p className="muted">Bu ekranın amacı çok konuşmak değil. Soruyu daraltmak, gerekli bağlamı seçmek ve daha iyi karar almak.</p>
        </div>
      </section>

      <section className="grid-2">
        <article className="card">
          <h3>V1 hedefi</h3>
          <p className="muted">Tek ekranda problem, seçili bağlam, beklenen çıktı ve prompt taslağı üretmek.</p>
        </article>
        <article className="card">
          <h3>Kırmızı çizgi</h3>
          <p className="muted">Tüm dosyaları prompta basmak yok. Sadece o karar için gerekli olan bağlam seçilir.</p>
        </article>
      </section>

      <section className="grid-3">
        {sections.map((section) => (
          <article key={section.title} className="card">
            <h3>{section.title}</h3>
            <ul className="list">
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </AdminShell>
  )
}
