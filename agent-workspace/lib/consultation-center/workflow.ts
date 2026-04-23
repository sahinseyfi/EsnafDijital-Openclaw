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
      title: 'Önerilen çalışma modu: Prompt gerekmiyor',
      items: [
        'Bu işi Prompt Üretimi dışında ilgili yüzeyde çöz',
        'Gerekiyorsa teknik notu sadeleştirip doğrudan uygulama işine çevir',
        'Prompt açmadan ilerle',
      ],
    }
  }

  if (!detail.promptRun.promptText.trim() && detail.route === 'external') {
    return {
      title: 'Önerilen çalışma modu: Promptu hazırla',
      items: [
        'Prompt önizlemesini kontrol et',
        'Eksik bağlam veya hedef varsa metni düzelt',
        'Hazır olunca promptu kopyalayıp dış GPT oturumunda kullan',
      ],
    }
  }

  if (detail.promptRun.promptText.trim()) {
    return {
      title: 'Prompt hazır',
      items: [
        'Promptu kopyala',
        'Dış GPT oturumunda kullan',
        'Sonraki işi gerekiyorsa ilgili operasyon yüzeyinde takip et',
      ],
    }
  }

  return {
    title: 'Sonraki adımı netleştir',
    items: [
      'Özet ve hedefi tekrar gözden geçir',
      'Bu kaydın prompta dönüp dönemeyeceğini kesinleştir',
    ],
  }
}
