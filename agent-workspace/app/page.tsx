import Link from 'next/link'

export const dynamic = 'force-dynamic'
import { AdminShell } from '@/components/admin/AdminShell'
import { getConsultationCenterPayload } from '@/lib/consultation-center/service'
import { getProjectOsDataset } from '@/lib/project-os/service'

function getActiveFocus(input: {
  blockedConsultations: number
  pendingOffers: number
  pendingAudits: number
  activeDeliveries: number
  maintenanceProjects: number
  businesses: number
}) {
  if (input.businesses === 0) {
    return {
      eyebrow: 'Şimdi aktif',
      title: 'İlk işletme kaydını aç',
      text: 'Operasyon hattı boş. Önce işletme kaydı açıp audit -> teklif -> teslimat akışını gerçek veriyle başlat.',
      primaryHref: '/project-os',
      primaryLabel: 'İş Takibine git',
      secondaryHref: '/context-center',
      secondaryLabel: 'Bağlam yüzeyini gör',
    }
  }

  if (input.blockedConsultations > 0) {
    return {
      eyebrow: 'Şimdi aktif',
      title: 'Karar bekleyen işler var',
      text: `${input.blockedConsultations} danışma kaydı netleşmeyi bekliyor. Kısa özet eksiklerini kapatıp hattı tekrar hareket ettir.`,
      primaryHref: '/consultation-center',
      primaryLabel: 'Karar hattına git',
      secondaryHref: '/project-os',
      secondaryLabel: 'Operasyon akışını aç',
    }
  }

  if (input.pendingOffers > 0) {
    return {
      eyebrow: 'Şimdi aktif',
      title: 'Teklife dönmesi gereken işler var',
      text: `${input.pendingOffers} teklif kaydı taslak veya gönderim aşamasında. Teklif hattını kapatmak şu an en sıcak iş.`,
      primaryHref: '/project-os',
      primaryLabel: 'Teklif hattını aç',
      secondaryHref: '/consultation-center',
      secondaryLabel: 'Gerekirse danışma hazırla',
    }
  }

  if (input.pendingAudits > 0) {
    return {
      eyebrow: 'Şimdi aktif',
      title: 'Audit hattı ilerlemeyi bekliyor',
      text: `${input.pendingAudits} audit kaydı yeni veya inceleme aşamasında. Teklife dönmeden önce audit tarafını toparla.`,
      primaryHref: '/project-os',
      primaryLabel: 'Audit hattını aç',
      secondaryHref: '/context-center',
      secondaryLabel: 'Eksik bağlama bak',
    }
  }

  if (input.activeDeliveries > 0) {
    return {
      eyebrow: 'Şimdi aktif',
      title: 'Teslimat hattı canlı',
      text: `${input.activeDeliveries} teslimat kaydı başlangıç, yapım veya yayın aşamasında. Yayın ve bakım geçişi ana takip noktası.`,
      primaryHref: '/project-os',
      primaryLabel: 'Teslimat hattını aç',
      secondaryHref: '/consultation-center',
      secondaryLabel: 'Karar hattını kontrol et',
    }
  }

  return {
    eyebrow: 'Şimdi aktif',
    title: 'Bakım ve netlik dönemi',
    text: `${input.maintenanceProjects} bakım kaydıyla hat sakin görünüyor. Ana ekran artık işi anlatmak değil, bir sonraki doğru aksiyonu göstermek için burada.`,
    primaryHref: '/project-os',
    primaryLabel: 'İş Takibine git',
    secondaryHref: '/context-center',
    secondaryLabel: 'Bağlam yüzeyini aç',
  }
}

export default async function HomePage() {
  const [projectOs, consultationPayload] = await Promise.all([
    getProjectOsDataset(),
    getConsultationCenterPayload(),
  ])

  const pendingAudits = projectOs.audits.filter((audit) => audit.status === 'new' || audit.status === 'reviewed').length
  const pendingOffers = projectOs.offers.filter((offer) => offer.status === 'draft' || offer.status === 'sent').length
  const activeDeliveries = projectOs.deliveryProjects.filter((project) => project.status === 'kickoff' || project.status === 'building' || project.status === 'live').length
  const maintenanceProjects = projectOs.deliveryProjects.filter((project) => project.status === 'maintenance').length
  const blockedConsultations = consultationPayload.inbox.filter((item) => item.route === 'blocked').length
  const readyConsultations = consultationPayload.inbox.filter((item) => item.stage === 'ready_to_send').length
  const answeredConsultations = consultationPayload.inbox.filter((item) => item.stage === 'answered').length
  const activeFocus = getActiveFocus({
    blockedConsultations,
    pendingOffers,
    pendingAudits,
    activeDeliveries,
    maintenanceProjects,
    businesses: projectOs.businesses.length,
  })

  return (
    <AdminShell
      title="İç operasyon merkezi"
      description="Bu yüzey sistem anlatısı değil, bugünkü işi ve bir sonraki doğru aksiyonu görünür kılmak için sadeleştiriliyor."
    >
      <section className="hero">
        <div>
          <p className="eyebrow">{activeFocus.eyebrow}</p>
          <h1>{activeFocus.title}</h1>
          <p className="muted">{activeFocus.text}</p>
        </div>
        <div className="hero-actions">
          <Link href={activeFocus.primaryHref} className="cta-link">{activeFocus.primaryLabel}</Link>
          <Link href={activeFocus.secondaryHref} className="ghost-link">{activeFocus.secondaryLabel}</Link>
        </div>
      </section>

      <section className="stats-grid">
        <article className="card stat-card">
          <strong>{pendingAudits}</strong>
          <p className="muted">audit hattinda bekleyen iş</p>
        </article>
        <article className="card stat-card">
          <strong>{pendingOffers}</strong>
          <p className="muted">teklif hattinda kapanmayan iş</p>
        </article>
        <article className="card stat-card">
          <strong>{activeDeliveries}</strong>
          <p className="muted">aktif teslimat kaydı</p>
        </article>
        <article className="card stat-card">
          <strong>{maintenanceProjects}</strong>
          <p className="muted">bakim tarafinda yasayan kayıt</p>
        </article>
      </section>

      <section className="grid-2" style={{ alignItems: 'start' }}>
        <article className="card stack-sm">
          <div>
            <p className="eyebrow">Kritik aksiyon</p>
            <h3>İlk bakışta ne yapmalıyım?</h3>
          </div>
          <ul className="list">
            <li>Önce audit → teklif → teslimat hattında biriken işi kapat.</li>
            <li>Blokajdaki danışma kayıtlarında özet eksiklerini tamamla, sonra dış danışmaya çık.</li>
            <li>Bağlam eksikse Bağlam Merkezine git, operasyon kaydını orada tekrar etme.</li>
          </ul>
        </article>

        <article className="card stack-sm">
          <div>
            <p className="eyebrow">Karar ve bağlam sinyali</p>
            <h3>Yan yüzeyler ne durumda?</h3>
          </div>
          <ul className="list">
            <li>{blockedConsultations} danışma kaydı blokajda</li>
            <li>{readyConsultations} danışma kaydı gönderime hazır</li>
            <li>{answeredConsultations} danışma kaydı cevap almış durumda</li>
            <li>{consultationPayload.inbox.filter((item) => item.gptRecommended).length} kayıt GPT Pro için uygun görünüyor</li>
          </ul>
          <div className="hero-actions">
            <Link href="/consultation-center" className="ghost-link">Karar Hazırlığına git</Link>
            <Link href="/context-center" className="ghost-link">Bağlam Merkezine git</Link>
          </div>
        </article>
      </section>
    </AdminShell>
  )
}
