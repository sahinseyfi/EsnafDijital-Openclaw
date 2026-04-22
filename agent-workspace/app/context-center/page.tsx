import { AdminShell } from '@/components/admin/AdminShell'

export const dynamic = 'force-dynamic'
import { getConsultationCenterPayload } from '@/lib/consultation-center/service'
import { getProjectOsDataset } from '@/lib/project-os/service'

const sourceRules = [
  {
    title: 'Dosya tabanlı bağlam',
    source: 'Markdown',
    scope: ['PROJECT / ROADMAP / HEARTBEAT', 'Kalıcı kararlar ve ilkeler', 'Prompt için seçilecek sabit bağlam parçaları'],
    reason: 'Yavaş değişen, referans niteliği olan ve okunabilir kalması gereken bilgi burada yaşar.',
  },
  {
    title: 'Veri tabanı omurgası',
    source: 'Postgres / Prisma',
    scope: ['İşletmeler', 'Audit kayıtları', 'Teklifler', 'Teslimatlar', 'Danışma kayıtları'],
    reason: 'Durumu değişen, liste ve ilişki gerektiren operasyon nesneleri veri katmanında tutulur.',
  },
  {
    title: 'Prompt ve karar katmanı',
    source: 'Hibrit',
    scope: ['Danışma özeti JSON', 'Bağlam referansı seçimi', 'Prompt önizlemesi ve cevap özeti'],
    reason: 'Karar kaydı veri içinde yaşar ama başvurduğu sabit bağlam dosya katmanından seçilir.',
  },
]

const decisionRows = [
  {
    domain: 'Proje omurgası ve aktif faz',
    source: 'Dosya',
    owner: 'PROJECT / HEARTBEAT / MEMORY',
    why: 'Prompt ve ürün yönü için referans, operasyon objesi değil.',
  },
  {
    domain: 'İşletme, audit, teklif, teslimat',
    source: 'Veri',
    owner: 'İş Takibi',
    why: 'Liste, durum ve ilişki gerektiren çekirdek operasyon hattı.',
  },
  {
    domain: 'Danışma kayıtları',
    source: 'Veri',
    owner: 'Karar Hazırlığı',
    why: 'Stage, route, action ve run geçmişi olan karar nesneleri.',
  },
  {
    domain: 'Prompta girecek sabit referans',
    source: 'Dosya seçimi',
    owner: 'Bağlam Merkezi',
    why: 'Tüm dosyaları kör yüklemek yerine seçili bağlam paket mantığı korunur.',
  },
]

export default async function ContextCenterPage() {
  const projectOs = await getProjectOsDataset()
  const consultationPayload = await getConsultationCenterPayload()

  const stats = {
    fileDomains: 4,
    projectOsRecords: projectOs.businesses.length + projectOs.audits.length + projectOs.offers.length + projectOs.deliveryProjects.length,
    consultationRecords: consultationPayload.inbox.length,
    gptReady: consultationPayload.inbox.filter((item) => item.gptRecommended).length,
  }

  return (
    <AdminShell
      title="Bağlam Merkezi"
      description="Bağlamın kontrolsüz büyümemesi için dosya, veri ve prompt katmanlarını birbirinden ayıran karar yüzeyi."
    >
      <section className="hero">
        <div>
          <p className="eyebrow">Bağlam düzeni</p>
          <h1>Her bilgi aynı yere gitmez</h1>
          <p className="muted">Bu alan bir bilgi çöplüğü değil. Doğru bilgiyi doğru katmanda tutmak için karar vermemizi kolaylaştırır.</p>
        </div>
      </section>

      <section className="stats-grid">
        <article className="card stat-card">
          <strong>{stats.fileDomains}</strong>
          <p className="muted">dosya tabanlı ana bağlam kümesi</p>
        </article>
        <article className="card stat-card">
          <strong>{stats.projectOsRecords}</strong>
          <p className="muted">İş Takibi kayıt toplamı</p>
        </article>
        <article className="card stat-card">
          <strong>{stats.consultationRecords}</strong>
          <p className="muted">danışma kaydı</p>
        </article>
        <article className="card stat-card">
          <strong>{stats.gptReady}</strong>
          <p className="muted">GPT Pro için hazır karar kaydı</p>
        </article>
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
            <li>Dosya tabanlı bağlam ile operasyon verisi birbirine karışmaz</li>
            <li>Her yeni bilgi önce işlevine göre sınıflanır</li>
          </ul>
        </article>
      </section>

      <section className="grid-3">
        {sourceRules.map((rule) => (
          <article key={rule.title} className="card stack-sm">
            <div>
              <p className="eyebrow">{rule.source}</p>
              <h3>{rule.title}</h3>
            </div>
            <ul className="list">
              {rule.scope.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="muted">{rule.reason}</p>
          </article>
        ))}
      </section>

      <section className="card stack-sm">
        <div>
          <p className="eyebrow">Kaynak kararı</p>
          <h3>Hangi bilgi nerede yaşar?</h3>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Bilgi alanı</th>
                <th>Kaynak</th>
                <th>Sahip ekran</th>
                <th>Neden</th>
              </tr>
            </thead>
            <tbody>
              {decisionRows.map((row) => (
                <tr key={row.domain}>
                  <td>{row.domain}</td>
                  <td>{row.source}</td>
                  <td>{row.owner}</td>
                  <td>{row.why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </AdminShell>
  )
}
