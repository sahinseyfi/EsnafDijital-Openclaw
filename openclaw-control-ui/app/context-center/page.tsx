import { AdminShell } from '@/components/admin/AdminShell'

const buckets = [
  {
    title: 'Dosya tabanlı bağlam',
    items: ['PROJECT, ROADMAP, HEARTBEAT', 'Karar notları ve kalıcı ilkeler', 'Prompt için seçilecek sabit bağlam parçaları'],
  },
  {
    title: 'Veri katmanına taşınacaklar',
    items: ['businesses', 'audits', 'offers', 'delivery_projects'],
  },
  {
    title: 'Bu ekranın soruları',
    items: ['Neyi kalıcı bilgi sayıyoruz?', 'Neyi operasyon datası olarak ele alıyoruz?', 'Hangi ekran hangi kaynaktan beslenecek?'],
  },
]

export default function ContextCenterPage() {
  return (
    <AdminShell
      title="Context Center"
      description="Bağlamın kontrolsüz büyümemesi için dosya, veri ve prompt katmanlarını birbirinden ayıran karar yüzeyi."
    >
      <section className="hero">
        <div>
          <p className="eyebrow">Bağlam düzeni</p>
          <h1>Her bilgi aynı yere gitmez</h1>
          <p className="muted">Bu alan bir bilgi çöplüğü değil. Doğru bilgiyi doğru katmanda tutmak için karar vermemizi kolaylaştırır.</p>
        </div>
      </section>

      <section className="grid-2">
        <article className="card">
          <h3>Neden gerekli?</h3>
          <ul className="list">
            <li>Prompt üretiminde tüm dosyaları kör biçimde yüklememek için</li>
            <li>Kalıcı kararları geçici operasyon notlarından ayırmak için</li>
            <li>Veri tabanına taşınacak nesneleri erkenden netleştirmek için</li>
          </ul>
        </article>
        <article className="card">
          <h3>Kırmızı çizgi</h3>
          <ul className="list">
            <li>Wiki gibi büyüyen, araması zor bir yapı yok</li>
            <li>Dosya tabanlı bağlam ile operasyon datası birbirine karışmaz</li>
            <li>Her yeni bilgi önce işlevine göre sınıflanır</li>
          </ul>
        </article>
      </section>

      <section className="grid-3">
        {buckets.map((bucket) => (
          <article key={bucket.title} className="card">
            <h3>{bucket.title}</h3>
            <ul className="list">
              {bucket.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </AdminShell>
  )
}
