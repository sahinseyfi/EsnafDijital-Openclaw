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
    description: 'Subdomain yerine veya yanina ozel domain baglama hazirligi ekler.',
  },
  {
    key: 'ek-kartvizit',
    label: 'Ek kartvizit varyasyonu',
    description: 'Farkli kartvizit varyasyonu veya ikinci duzen cikisi ekler.',
  },
  {
    key: 'ek-yorum-materyali',
    label: 'Ek yorum materyali',
    description: 'QR/NFC disinda ek yorum yonlendirme materyali ihtiyacini kapsar.',
  },
  {
    key: 'kucuk-sosyal-medya-duzenleme',
    label: 'Kucuk sosyal medya duzenleme',
    description: 'Profil biyografi, link veya kapak gibi kucuk sosyal medya dokunuslari ekler.',
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
  const domainLine = offer.domainPreference === 'custom-domain'
    ? `Domain plani: ozel domain bagla${offer.customDomain ? ` (${offer.customDomain})` : ''}`
    : 'Domain plani: subdomain ile yayinla'

  const sections = [
    `Secili teklif: ${offer.packageName}`,
    'Cekirdek teslimler:',
    ...(packageInfo ? packageInfo.includes.map((item) => `- ${item}`) : ['- Teklif kapsam maddeleri netlestirilecek']),
    domainLine,
  ]

  if (addons.length > 0) {
    sections.push('Opsiyonel ekler:')
    sections.push(...addons.map((item) => `- ${item.label}`))
  }

  sections.push('Teslim oncesi kontrol: asset, erisim, metin ve yayin adimini netlestir.')

  return sections.join('\n')
}
