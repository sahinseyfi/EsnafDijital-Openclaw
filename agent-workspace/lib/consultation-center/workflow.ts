import type { ConsultationDetail } from '@/lib/consultation-center/types'

export function getConsultationNextSteps(detail: ConsultationDetail) {
  if (detail.missingFields.length > 0) {
    return {
      title: 'Önerilen çalışma modu: Özeti netleştir',
      items: [
        `Eksik alanları kapat: ${detail.missingFields.join(', ')}`,
        'Karar sorusunu tek cümlede netleştir',
        'Bağlam paketine sadece gerçekten gereken referansları bağla',
      ],
    }
  }

  if (detail.route === 'internal') {
    return {
      title: 'Önerilen çalışma modu: İç aksiyon / küçük patch',
      items: [
        'İş Takibi veya Bağlam Merkezi hedefli aksiyon aç',
        'Gerekiyorsa teknik uygulama notunu sade bir karar cümlesine indir',
        'Bu iş için dış danışma açma, aksiyon listesi üzerinden ilerle',
      ],
    }
  }

  if (!detail.promptRun.sentAt && detail.route === 'external') {
    return {
      title: 'Önerilen çalışma modu: Dış danışma + sonra aksiyon',
      items: [
        'Prompt önizlemesini gözden geçir ve gerekirse kopyalayarak GPT Pro oturumuna taşı',
        'Gelen cevabı kısa özet halinde sonuç kaydı formuna işle',
        'Cevap geldikten sonra aksiyonları kullanıcı / teknik / ortak diye ayır',
      ],
    }
  }

  const openActions = detail.actions.filter((action) => action.status === 'open')
  if (detail.promptRun.responseSummary && openActions.length > 0) {
    return {
      title: 'Önerilen çalışma modu: Cevabı işe çevir',
      items: [
        `${openActions.length} açık aksiyonu kapat veya sahipliğini netleştir`,
        'Karar notu çıkacaksa Bağlam Merkezi hedefine yaz',
        'Uygulama işi çıkacaksa İş Takibi kaydına bağla',
      ],
    }
  }

  if (detail.stage === 'actioned') {
    return {
      title: 'Bu danışma tamamlandı',
      items: [
        'Karar ve aksiyonların hedef sistemlere yazıldığını doğrula',
        'Gerekirse yeni bir danışma kaydı açarak devam konusunu ayır',
      ],
    }
  }

  return {
    title: 'Sonraki adımı netleştir',
    items: [
      'Özet, prompt ve aksiyon akışını tekrar gözden geçir',
      'Bu kaydın hangi sistemde devam edeceğini kesinleştir',
    ],
  }
}
