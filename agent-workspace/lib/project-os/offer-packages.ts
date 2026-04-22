import type { OfferRecord } from '@/lib/project-os/types'

export type OfferPackageKey = 'paket-1' | 'paket-2' | 'paket-3' | 'paket-4' | 'bakim'
export type OfferAddonKey = 'ozel-domain' | 'ek-kartvizit' | 'ek-yorum-materyali' | 'kucuk-sosyal-medya-duzenleme'

export type OfferPackageDefinition = {
  key: OfferPackageKey
  name: string
  shortLabel: string
  stage: 'ana-kurulum' | 'icerik' | 'bakim'
  description: string
  includes: string[]
}

export type OfferAddonDefinition = {
  key: OfferAddonKey
  label: string
  description: string
}

export const OFFER_PACKAGES: OfferPackageDefinition[] = [
  {
    key: 'paket-1',
    name: 'Paket 1 - Temel Dijital Varlik',
    shortLabel: 'Paket 1',
    stage: 'ana-kurulum',
    description: 'Google Maps düzeni, alt alan adlı web sayfası, logo ve kartvizit ile temel dijital varlığı kurar.',
    includes: [
      'Google Maps işletme kaydı düzenleme',
      'Alt alan adlı web sayfası',
      'Logo tasarımı',
      'Kartvizit tasarımı',
    ],
  },
  {
    key: 'paket-2',
    name: 'Paket 2 - Gorunurluk Plus',
    shortLabel: 'Paket 2',
    stage: 'ana-kurulum',
    description: 'Paket 1 üstüne Yandex, Apple Maps ve QR yorum akışını ekler.',
    includes: [
      'Paket 1 kapsamı',
      'Yandex kaydı',
      'Apple Maps kaydı',
      'QR yorum isteme akışı',
    ],
  },
  {
    key: 'paket-3',
    name: 'Paket 3 - Guclu Dijital Kimlik',
    shortLabel: 'Paket 3',
    stage: 'ana-kurulum',
    description: 'Paket 2 üstüne Instagram profili ve NFC yorum akışı ile kimliği güçlendirir.',
    includes: [
      'Paket 2 kapsamı',
      'Instagram kurulumu / profil düzeni',
      'NFC yorum isteme akışı',
    ],
  },
  {
    key: 'paket-4',
    name: 'Paket 4 - Duzenli Icerik',
    shortLabel: 'Paket 4',
    stage: 'icerik',
    description: 'Haftalık Instagram içerik ritmiyle kurulan yüzeyi boş kalmaktan çıkarır.',
    includes: [
      'Haftalık Instagram içerik paylaşımı',
      'Temel içerik düzeni',
      'Görünürlük canlılık akışı',
    ],
  },
  {
    key: 'bakim',
    name: 'Bakim - Guncel Tutma',
    shortLabel: 'Bakim',
    stage: 'bakim',
    description: 'Harita, site ve iletişim bilgilerinde küçük ama kritik güncellemeleri tutar.',
    includes: [
      'Harita bilgileri güncelleme',
      'Telefon / saat / adres düzeltmeleri',
      'Site üzerindeki küçük güncellemeler',
      'Görünürlük ve yorum akışına kısa kontrol',
    ],
  },
]

export const OFFER_ADDONS: OfferAddonDefinition[] = [
  {
    key: 'ozel-domain',
    label: 'Özel alan adı bağlama',
    description: 'Tüm paketlerde ayrı ek olarak kalır. Varsayılan teslim alt alan adıyladır.',
  },
  {
    key: 'ek-kartvizit',
    label: 'Ek kartvizit varyasyonu',
    description: 'Paket 1 içindeki tek kartvizit tasarımı dışında ikinci varyasyon veya ekstra çıkış isterse kullanılır.',
  },
  {
    key: 'ek-yorum-materyali',
    label: 'Ek yorum materyali',
    description: 'Paket 2-3 içindeki temel yorum akışı dışında ek QR/NFC materyali isterse kullanılır.',
  },
  {
    key: 'kucuk-sosyal-medya-duzenleme',
    label: 'Küçük sosyal medya düzenleme',
    description: 'Paket 1-2 tarafında hafif profil dokunuşu için eklenir. Paket 3 içinde temel Instagram kurulumu zaten vardır.',
  },
]

export function getOfferPackageByName(packageName: string) {
  return OFFER_PACKAGES.find((item) => item.name === packageName) || null
}

export function getOfferPackageByKey(key: string) {
  return OFFER_PACKAGES.find((item) => item.key === key) || OFFER_PACKAGES[0]
}

export function getOfferAddons(keys: string[]) {
  const keySet = new Set(keys)
  return OFFER_ADDONS.filter((item) => keySet.has(item.key))
}

export function buildDeliveryScopeSuggestion(offer: Pick<OfferRecord, 'packageName' | 'addonKeys' | 'domainPreference' | 'customDomain'>) {
  const packageInfo = getOfferPackageByName(offer.packageName)
  const addons = getOfferAddons(offer.addonKeys)
  const needsInstagram = offer.packageName === 'Paket 3 - Guclu Dijital Kimlik' || offer.packageName === 'Paket 4 - Duzenli Icerik' || offer.addonKeys.includes('kucuk-sosyal-medya-duzenleme')
  const domainLine = offer.domainPreference === 'custom-domain'
    ? `- Özel alan adını bağla${offer.customDomain ? ` (${offer.customDomain})` : ' ve DNS yönlendirmesini netleştir'}`
    : '- Alt alan adı ile yayına al'

  const sections = [
    `Seçili teklif: ${offer.packageName}`,
    'Çekirdek teslimler:',
    ...(packageInfo ? packageInfo.includes.map((item) => `- ${item}`) : ['- Teklif kapsam maddeleri netleştirilecek']),
    'Alan adı ve yayın planı:',
    domainLine,
    'Gerekli varlıklar:',
    '- İşletme adı, telefon, adres, çalışma saatleri',
    '- Kullanılacak logo, görsel ve kısa tanıtım metni',
    '- Kartvizit veya yorum materyali için baskı metni ve onayı',
    'Gerekli erişimler:',
    '- Google İşletme Profili erişimi veya doğrulama desteği',
    '- Alan adı gerekiyorsa kayıt firması ve DNS erişimi',
    ...(needsInstagram ? ['- Instagram giriş bilgisi veya profil düzenleme onayı'] : []),
  ]

  if (addons.length > 0) {
    sections.push('Opsiyonel ekler:')
    sections.push(...addons.map((item) => `- ${item.label}`))
  }

  sections.push('Başlangıç sonrası operasyon adımları:')
  sections.push('- Varlık ve erişim eksiklerini tamamla')
  sections.push('- Ilk taslak / kurulum cikisini hazirla')
  sections.push('- Isletme onayi sonrasi yayin / teslim adimini gec')
  sections.push('Yayin oncesi kontrol:')
  sections.push('- Telefon, adres, harita ve buton linklerini kontrol et')
  sections.push('- Mobil gorunum ve temel yazim duzenini kontrol et')
  sections.push('- Isletme sahibinden son onayi al')

  return sections.join('\n')
}
