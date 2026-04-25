import Link from 'next/link'

export const dynamic = 'force-dynamic'
import { AdminShell } from '@/components/admin/AdminShell'
import { getConsultationCenterPayload } from '@/lib/prompt-uretimi/service'
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
      text: 'Operasyon hattı boş. Önce keşiften bir işletme içeri alıp gerçek veriyle başlangıç yap.',
      primaryHref: '/discovery',
      primaryLabel: 'Keşfe git',
      secondaryHref: '/prompt-uretimi',
      secondaryLabel: 'Prompt Üretimini gör',
    }
  }

  if (input.blockedConsultations > 0) {
    return {
      eyebrow: 'Şimdi aktif',
      title: 'Netleşmeyi bekleyen prompt işleri var',
      text: `${input.blockedConsultations} prompt kaydı netleşmeyi bekliyor. Kısa özet eksiklerini kapatıp promptu temiz hale getir.`,
      primaryHref: '/prompt-uretimi',
      primaryLabel: 'Prompt Üretimine git',
      secondaryHref: '/businesses',
      secondaryLabel: 'İşletmeleri aç',
    }
  }

  if (input.pendingOffers > 0) {
    return {
      eyebrow: 'Şimdi aktif',
      title: 'Teklife dönmesi gereken işler var',
      text: `${input.pendingOffers} teklif kaydı taslak veya gönderim aşamasında. Teklif hattını kapatmak şu an en sıcak iş.`,
      primaryHref: '/businesses',
      primaryLabel: 'İşletmeleri aç',
      secondaryHref: '/prompt-uretimi',
      secondaryLabel: 'Gerekirse prompt üret',
    }
  }

  if (input.pendingAudits > 0) {
    return {
      eyebrow: 'Şimdi aktif',
      title: 'İnceleme hattı ilerlemeyi bekliyor',
      text: `${input.pendingAudits} inceleme kaydı yeni veya inceleme aşamasında. Teklife dönmeden önce inceleme tarafını toparla.`,
      primaryHref: '/businesses',
      primaryLabel: 'İşletmeleri aç',
      secondaryHref: '/prompt-uretimi',
      secondaryLabel: 'Gerekirse prompt üret',
    }
  }

  if (input.activeDeliveries > 0) {
    return {
      eyebrow: 'Şimdi aktif',
      title: 'Teslimat hattı canlı',
      text: `${input.activeDeliveries} teslimat kaydı başlangıç, yapım veya yayın aşamasında. Yayın ve bakım geçişi ana takip noktası.`,
      primaryHref: '/businesses',
      primaryLabel: 'İşletmeleri aç',
      secondaryHref: '/prompt-uretimi',
      secondaryLabel: 'Gerekirse prompt üret',
    }
  }

  return {
    eyebrow: 'Şimdi aktif',
    title: 'Bakım ve netlik dönemi',
    text: `${input.maintenanceProjects} bakım kaydıyla hat sakin görünüyor. Ana ekran artık işi anlatmak değil, bir sonraki doğru aksiyonu göstermek için burada.`,
    primaryHref: '/businesses',
    primaryLabel: 'İşletmeleri aç',
    secondaryHref: '/prompt-uretimi',
    secondaryLabel: 'Prompt Üretimini aç',
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
  const readyPrompts = consultationPayload.inbox.filter((item) => item.promptStatus === 'ready').length
  const promptErrors = consultationPayload.inbox.filter((item) => item.promptStatus === 'error').length
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

      <section style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        <span className="badge">{pendingAudits} inceleme hattında bekleyen iş</span>
        <span className="badge">{pendingOffers} teklif hattinda kapanmayan is</span>
        <span className="badge">{activeDeliveries} aktif teslimat kaydi</span>
        <span className="badge">{maintenanceProjects} bakim kaydi</span>
      </section>

      <section className="card stack-sm">
        <div className="grid-2" style={{ alignItems: 'start' }}>
          <div className="stack-sm">
            <div>
              <p className="eyebrow">Kritik aksiyon</p>
              <h3>İlk bakışta ne yapmalıyım?</h3>
            </div>
            <ul className="list">
              <li>Önce inceleme → teklif → teslimat hattında biriken işi kapat.</li>
              <li>Prompt gerektiren işlerde kısa özet eksiklerini tamamla, sonra hazır promptu al.</li>
              <li>Bağlam eksikse ilgili dokümana git, operasyon kaydını referans dosyalarıyla karıştırma.</li>
            </ul>
          </div>

          <div className="stack-sm">
            <div>
              <p className="eyebrow">Prompt ve bağlam sinyali</p>
              <h3>Yan yüzeyler ne durumda?</h3>
            </div>
            <ul className="list">
              <li>{blockedConsultations} prompt kaydı netleşme bekliyor</li>
              <li>{readyPrompts} prompt kaydı hazır</li>
              <li>{promptErrors} prompt kaydında hata var</li>
              <li>{consultationPayload.inbox.filter((item) => item.gptRecommended).length} kayıt GPT Pro için uygun görünüyor</li>
            </ul>
            <div className="hero-actions">
              <Link href="/prompt-uretimi" className="ghost-link">Prompt Üretimine git</Link>
            </div>
          </div>
        </div>
      </section>
    </AdminShell>
  )
}
