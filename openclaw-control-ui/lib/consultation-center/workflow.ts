import type { ConsultationDetail } from '@/lib/consultation-center/types'

export function getConsultationNextSteps(detail: ConsultationDetail) {
  if (detail.missingFields.length > 0) {
    return {
      title: 'Önce brief’i tamamla',
      items: [
        `Eksik alanları kapat: ${detail.missingFields.join(', ')}`,
        'Karar sorusunu tek cümlede netleştir',
        'Context pack içine sadece gerçekten gereken referansları bağla',
      ],
    }
  }

  if (detail.route === 'internal') {
    return {
      title: 'Doğrudan iç aksiyona çevir',
      items: [
        'Project OS veya Context Center hedefli aksiyon aç',
        'Gerekiyorsa teknik uygulama notunu sade bir karar cümlesine indir',
        'Bu iş için dış danışma açma, aksiyon listesi üzerinden ilerle',
      ],
    }
  }

  if (!detail.promptRun.sentAt && detail.route === 'external') {
    return {
      title: 'Promptu gönderime hazırla',
      items: [
        'Prompt preview’ı gözden geçir ve gerekirse kopyalayarak GPT Pro oturumuna taşı',
        'Gelen cevabı kısa özet halinde sonuç kaydı formuna işle',
        'Cevap geldikten sonra aksiyonları kullanıcı / teknik / ortak diye ayır',
      ],
    }
  }

  const openActions = detail.actions.filter((action) => action.status === 'open')
  if (detail.promptRun.responseSummary && openActions.length > 0) {
    return {
      title: 'Cevabı işe çevir',
      items: [
        `${openActions.length} açık aksiyonu kapat veya sahipliğini netleştir`,
        'Karar notu çıkacaksa Context Center hedefine yaz',
        'Uygulama işi çıkacaksa Project OS kaydına bağla',
      ],
    }
  }

  if (detail.stage === 'actioned') {
    return {
      title: 'Bu consultation tamamlandı',
      items: [
        'Karar ve aksiyonların hedef sistemlere yazıldığını doğrula',
        'Gerekirse yeni bir consultation kaydı açarak devam konusunu ayır',
      ],
    }
  }

  return {
    title: 'Sonraki adımı netleştir',
    items: [
      'Brief, prompt ve aksiyon akışını tekrar gözden geçir',
      'Bu kaydın hangi sistemde devam edeceğini kesinleştir',
    ],
  }
}
