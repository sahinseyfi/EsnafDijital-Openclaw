export type OfferPackageKey = 'paket-1' | 'paket-2' | 'paket-3' | 'paket-4' | 'bakim'

export type OfferPackageDefinition = {
  key: OfferPackageKey
  name: string
  shortLabel: string
  stage: 'ana-kurulum' | 'icerik' | 'bakim'
  description: string
  includes: string[]
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

export function getOfferPackageByName(packageName: string) {
  return OFFER_PACKAGES.find((item) => item.name === packageName) || null
}

export function getOfferPackageByKey(key: string) {
  return OFFER_PACKAGES.find((item) => item.key === key) || OFFER_PACKAGES[0]
}
