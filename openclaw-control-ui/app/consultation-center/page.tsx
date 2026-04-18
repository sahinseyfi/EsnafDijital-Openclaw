import { AdminShell } from '@/components/admin/AdminShell'

const sections = [
  {
    title: 'Brief iskeleti',
    items: ['Ne çözmek istiyoruz?', 'Hangi kısıtlar var?', 'Hangi çıktı formatını istiyoruz?'],
  },
  {
    title: 'Kaynak bağlam',
    items: ['Seçili HEARTBEAT / karar notları', 'İlgili veri modeli parçaları', 'Sadece gerekli teknik detaylar'],
  },
  {
    title: 'Beklenen çıktı',
    items: ['Net karar', 'Uygulanabilir mimari', 'Gerekirse kod veya migration önerisi'],
  },
]

export default function ConsultationCenterPage() {
  return (
    <AdminShell
      title="Consultation Center"
      description="GPT Pro veya dış danışma için dağınık konuşma yerine temiz brief ve kontrollü bağlam üretmek için başlangıç ekranı."
    >
      <section className="grid-2">
        <article className="card">
          <h3>V1 hedefi</h3>
          <p className="muted">Kullanıcı dışarıya taşımadan önce tek ekranda: problem, seçili bağlam, beklenen çıktı ve prompt taslağı.</p>
        </article>
        <article className="card">
          <h3>Kırmızı çizgi</h3>
          <p className="muted">Tüm dosyaları kör biçimde prompta basmak yok. Sadece o soruya gerekli bağlam seçilecek.</p>
        </article>
      </section>

      <section className="grid-3" style={{ marginTop: 24 }}>
        {sections.map((section) => (
          <article key={section.title} className="card">
            <h3>{section.title}</h3>
            <ul className="list">
              {section.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>
        ))}
      </section>
    </AdminShell>
  )
}
