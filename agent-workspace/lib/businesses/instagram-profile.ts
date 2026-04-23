import { spawn } from 'node:child_process'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

export type BusinessInstagramProfile = {
  createdAt: string
  actorId: string
  instagramUrl: string
  username: string
  fullName: string
  biography: string
  websiteUrl: string
  externalUrls: string[]
  followersCount: number | null
  followsCount: number | null
  postsCount: number | null
  isVerified: boolean
  isBusinessAccount: boolean
  isPrivate: boolean
  businessCategory: string
  profilePicUrl: string
}

const INSTAGRAM_PROFILE_DIR = path.resolve(process.cwd(), '..', 'state', 'instagram-profiles')
const INSTAGRAM_RUN_DIR = path.resolve(process.cwd(), '..', 'state', 'instagram-profile-runs')
const INSTAGRAM_PROFILE_ACTOR = 'apify/instagram-profile-scraper'

function profileFilePath(businessId: string) {
  return path.join(INSTAGRAM_PROFILE_DIR, `${businessId}.json`)
}

async function readJsonFile<T>(filePath: string, fallback: T): Promise<T> {
  try {
    const content = await readFile(filePath, 'utf8')
    return JSON.parse(content) as T
  } catch {
    return fallback
  }
}

function extractInstagramUsername(instagramUrl: string) {
  const trimmed = instagramUrl.trim()
  const match = trimmed.match(/instagram\.com\/(?!p\/|reel\/|stories\/)([^/?#]+)/i)
  return match?.[1]?.trim() || ''
}

function firstString(...values: unknown[]) {
  for (const value of values) {
    if (typeof value === 'string' && value.trim()) return value.trim()
  }
  return ''
}

function firstNumber(...values: unknown[]) {
  for (const value of values) {
    const parsed = Number(value)
    if (Number.isFinite(parsed)) return parsed
  }
  return null
}

function firstBoolean(...values: unknown[]) {
  for (const value of values) {
    if (typeof value === 'boolean') return value
  }
  return false
}

function stringArray(value: unknown) {
  if (!Array.isArray(value)) return []
  return value.map((item) => String(item || '').trim()).filter(Boolean)
}

function parseProfileRow(row: Record<string, unknown>, instagramUrl: string) {
  const externalUrls = stringArray(row.externalUrls)
  const websiteUrl = firstString(
    row.externalUrl,
    row.website,
    row.websiteUrl,
    externalUrls[0],
  )

  return {
    createdAt: new Date().toISOString(),
    actorId: INSTAGRAM_PROFILE_ACTOR,
    instagramUrl,
    username: firstString(row.username),
    fullName: firstString(row.fullName, row.name),
    biography: firstString(row.biography, row.bio),
    websiteUrl,
    externalUrls,
    followersCount: firstNumber(row.followersCount),
    followsCount: firstNumber(row.followsCount, row.followingCount),
    postsCount: firstNumber(row.postsCount),
    isVerified: firstBoolean(row.isVerified, row.verified),
    isBusinessAccount: firstBoolean(row.isBusinessAccount, row.businessAccount),
    isPrivate: firstBoolean(row.isPrivate, row.private),
    businessCategory: firstString(row.businessCategory, row.businessCategoryName, row.categoryName),
    profilePicUrl: firstString(row.profilePicUrl, row.profilePictureUrl),
  } satisfies BusinessInstagramProfile
}

async function runApifyActor({ inputPath, rawPath }: { inputPath: string; rawPath: string }) {
  await new Promise<void>((resolve, reject) => {
    const child = spawn('/bin/bash', ['-lc', 'apify call "$ACTOR_ID" --input-file "$INPUT_PATH" --output-dataset --silent > "$RAW_PATH"'], {
      env: {
        ...process.env,
        ACTOR_ID: INSTAGRAM_PROFILE_ACTOR,
        INPUT_PATH: inputPath,
        RAW_PATH: rawPath,
      },
      stdio: 'ignore',
    })

    const timeout = setTimeout(() => {
      child.kill('SIGTERM')
      reject(new Error('Instagram profil taramasi zaman asimina ugradi.'))
    }, 300_000)

    child.on('error', (error) => {
      clearTimeout(timeout)
      reject(error)
    })

    child.on('close', (code, signal) => {
      clearTimeout(timeout)
      if (code === 0) {
        resolve()
        return
      }

      reject(new Error(signal
        ? `Instagram profil taramasi ${signal} ile sonlandi.`
        : `Instagram profil taramasi ${code ?? 'bilinmeyen'} koduyla sonlandi.`))
    })
  })
}

export async function getBusinessInstagramProfileHistory(businessId: string) {
  return readJsonFile<BusinessInstagramProfile[]>(profileFilePath(businessId), [])
}

export async function getLatestBusinessInstagramProfile(businessId: string) {
  const history = await getBusinessInstagramProfileHistory(businessId)
  return history[history.length - 1] || null
}

export async function appendBusinessInstagramProfile(businessId: string, entry: BusinessInstagramProfile) {
  await mkdir(INSTAGRAM_PROFILE_DIR, { recursive: true })
  const history = await getBusinessInstagramProfileHistory(businessId)
  const nextHistory = [...history, entry]
  await writeFile(profileFilePath(businessId), JSON.stringify(nextHistory, null, 2), 'utf8')
  return nextHistory
}

export async function generateBusinessInstagramProfile(instagramUrl: string) {
  const username = extractInstagramUsername(instagramUrl)
  if (!username) {
    throw new Error('Instagram kullanici adi linkten cikartilamadi.')
  }

  await mkdir(INSTAGRAM_RUN_DIR, { recursive: true })
  const slug = `${username}-${Date.now()}`
  const inputPath = path.join(INSTAGRAM_RUN_DIR, `${slug}.input.json`)
  const rawPath = path.join(INSTAGRAM_RUN_DIR, `${slug}.raw.json`)

  const inputPayload = {
    usernames: [username],
    resultsLimit: 1,
    includeAboutSection: false,
  }

  await writeFile(inputPath, JSON.stringify(inputPayload, null, 2), 'utf8')
  await runApifyActor({ inputPath, rawPath })

  const raw = await readFile(rawPath, 'utf8')
  const rows = JSON.parse(raw) as Array<Record<string, unknown>>
  const row = Array.isArray(rows) ? rows[0] : null
  if (!row || typeof row !== 'object') {
    throw new Error('Instagram profil verisi bos dondu.')
  }

  return parseProfileRow(row, instagramUrl)
}
