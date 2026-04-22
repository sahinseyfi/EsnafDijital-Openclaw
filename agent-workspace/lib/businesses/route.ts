import type { BusinessRecord } from '@/lib/project-os/types'

const segmentSlugParts: Record<BusinessRecord['segment'], string> = {
  berber: 'berber',
  guzellik: 'guzellik-salonu',
  'kafe-restoran': 'kafe-restoran',
  diger: 'isletme',
}

const trCharMap: Record<string, string> = {
  ç: 'c',
  ğ: 'g',
  ı: 'i',
  ö: 'o',
  ş: 's',
  ü: 'u',
}

export function slugifyTr(value: string) {
  return value
    .toLocaleLowerCase('tr')
    .split('')
    .map((char) => trCharMap[char] || char)
    .join('')
    .normalize('NFKD')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/[\s_-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function buildBusinessSlug({
  name,
  segment,
  postalCode,
}: {
  name: string
  segment?: BusinessRecord['segment']
  postalCode?: string | null
}) {
  const pieces = [name.trim()]

  if (segment) {
    pieces.push(segmentSlugParts[segment])
  }

  if (postalCode?.trim()) {
    pieces.push(postalCode.trim())
  }

  return slugifyTr(pieces.join(' ')) || 'isletme'
}

export function buildBusinessDetailHref({
  id,
  name,
  segment,
  postalCode,
}: {
  id: string
  name: string
  segment?: BusinessRecord['segment']
  postalCode?: string | null
}) {
  return `/businesses/${buildBusinessSlug({ name, segment, postalCode })}--${id}`
}

export function parseBusinessSlugAndId(slugAndId: string) {
  const value = slugAndId.trim()
  const separatorIndex = value.lastIndexOf('--')

  if (separatorIndex === -1) {
    return {
      slug: '',
      id: value,
    }
  }

  return {
    slug: value.slice(0, separatorIndex),
    id: value.slice(separatorIndex + 2),
  }
}
