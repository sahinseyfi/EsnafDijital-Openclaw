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
    description: 'Google Maps duzeni, subdomain web sayfasi, logo ve kartvizit ile temel dijital varligi kurar.',
    includes: [
      'Google Maps isletme kaydi duzenleme',
      'Subdomain web sayfasi',
      'Logo tasarimi',
      'Kartvizit tasarimi',
    ],
  },
  {
    key: 'paket-2',
    name: 'Paket 2 - Gorunurluk Plus',
    shortLabel: 'Paket 2',
    stage: 'ana-kurulum',
    description: 'Paket 1 ustune Yandex, Apple Maps ve QR yorum akisini ekler.',
    includes: [
      'Paket 1 kapsami',
      'Yandex kaydi',
      'Apple Maps kaydi',
      'QR yorum isteme akisi',
    ],
  },
  {
    key: 'paket-3',
    name: 'Paket 3 - Guclu Dijital Kimlik',
    shortLabel: 'Paket 3',
    stage: 'ana-kurulum',
    description: 'Paket 2 ustune Instagram profili ve NFC yorum akisi ile kimligi guclendirir.',
    includes: [
      'Paket 2 kapsami',
      'Instagram kurulumu / profil duzeni',
      'NFC yorum isteme akisi',
    ],
  },
  {
    key: 'paket-4',
    name: 'Paket 4 - Duzenli Icerik',
    shortLabel: 'Paket 4',
    stage: 'icerik',
    description: 'Haftalik Instagram icerik ritmiyle kurulan yuzeyi bos kalmaktan cikarir.',
    includes: [
      'Haftalik Instagram icerik paylasimi',
      'Temel icerik duzeni',
      'Gorunurluk canlilik akisi',
    ],
  },
  {
    key: 'bakim',
    name: 'Bakim - Guncel Tutma',
    shortLabel: 'Bakim',
    stage: 'bakim',
    description: 'Harita, site ve iletisim bilgilerinde kucuk ama kritik guncellemeleri tutar.',
    includes: [
      'Harita bilgileri guncelleme',
      'Telefon / saat / adres duzeltmeleri',
      'Site uzerindeki kucuk guncellemeler',
      'Gorunurluk ve yorum akisina kisa kontrol',
    ],
  },
]

export const OFFER_ADDONS: OfferAddonDefinition[] = [
  {
    key: 'ozel-domain',
    label: 'Ozel domain baglama',
    description: 'Tum paketlerde ayri ek olarak kalir. Varsayilan teslim subdomaindir.',
  },
  {
    key: 'ek-kartvizit',
    label: 'Ek kartvizit varyasyonu',
    description: 'Paket 1 icindeki tek kartvizit tasarimi disinda ikinci varyasyon veya ekstra cikis isterse kullanilir.',
  },
  {
    key: 'ek-yorum-materyali',
    label: 'Ek yorum materyali',
    description: 'Paket 2-3 icindeki temel yorum akisi disinda ek QR/NFC materyali isterse kullanilir.',
  },
  {
    key: 'kucuk-sosyal-medya-duzenleme',
    label: 'Kucuk sosyal medya duzenleme',
    description: 'Paket 1-2 tarafinda hafif profil dokunusu icin eklenir. Paket 3 icinde temel Instagram kurulumu zaten vardir.',
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
    ? `- Ozel domain bagla${offer.customDomain ? ` (${offer.customDomain})` : ' ve DNS yonlendirmesini netlestir'}`
    : '- Subdomain ile yayinla'

  const sections = [
    `Secili teklif: ${offer.packageName}`,
    'Cekirdek teslimler:',
    ...(packageInfo ? packageInfo.includes.map((item) => `- ${item}`) : ['- Teklif kapsam maddeleri netlestirilecek']),
    'Domain ve yayin plani:',
    domainLine,
    'Gerekli assetler:',
    '- Isletme adi, telefon, adres, calisma saatleri',
    '- Kullanilacak logo, gorsel ve kisa tanitim metni',
    '- Kartvizit veya yorum materyali icin baski metni/onayi',
    'Gerekli erisimler:',
    '- Google Isletme Profili erisimi veya dogrulama destegi',
    '- Domain gerekiyorsa registrar / DNS erisimi',
    ...(needsInstagram ? ['- Instagram giris bilgisi veya profil duzenleme onayi'] : []),
  ]

  if (addons.length > 0) {
    sections.push('Opsiyonel ekler:')
    sections.push(...addons.map((item) => `- ${item.label}`))
  }

  sections.push('Kickoff sonrasi operasyon adimlari:')
  sections.push('- Asset ve erisim eksiklerini tamamla')
  sections.push('- Ilk taslak / kurulum cikisini hazirla')
  sections.push('- Isletme onayi sonrasi yayin / teslim adimini gec')
  sections.push('Yayin oncesi kontrol:')
  sections.push('- Telefon, adres, harita ve buton linklerini kontrol et')
  sections.push('- Mobil gorunum ve temel yazim duzenini kontrol et')
  sections.push('- Isletme sahibinden son onayi al')

  return sections.join('\n')
}
