import { promises as fs } from 'fs'
import path from 'path'

const RUNTIME_DIR = path.join(process.cwd(), '..', 'state', 'apify-discovery')
const RUNTIME_PATH = path.join(RUNTIME_DIR, 'runtime-state.json')

type DiscoveryImportRecord = {
  businessId: string
  auditId: string
  importedAt: string
  businessName: string
}

export type DiscoveryRuntimeState = {
  shortlistedPlaceIds: string[]
  imports: Record<string, DiscoveryImportRecord>
}

const emptyState = (): DiscoveryRuntimeState => ({
  shortlistedPlaceIds: [],
  imports: {},
})

async function writeState(state: DiscoveryRuntimeState) {
  await fs.mkdir(RUNTIME_DIR, { recursive: true })
  await fs.writeFile(RUNTIME_PATH, JSON.stringify(state, null, 2), 'utf8')
}

export async function readDiscoveryRuntimeState(): Promise<DiscoveryRuntimeState> {
  try {
    const raw = await fs.readFile(RUNTIME_PATH, 'utf8')
    const parsed = JSON.parse(raw) as Partial<DiscoveryRuntimeState>

    return {
      shortlistedPlaceIds: Array.isArray(parsed.shortlistedPlaceIds) ? parsed.shortlistedPlaceIds.filter((item): item is string => typeof item === 'string') : [],
      imports: typeof parsed.imports === 'object' && parsed.imports !== null ? parsed.imports as Record<string, DiscoveryImportRecord> : {},
    }
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      const state = emptyState()
      await writeState(state)
      return state
    }

    throw error
  }
}

export async function setDiscoveryShortlist(placeId: string, shortlisted: boolean) {
  const state = await readDiscoveryRuntimeState()
  const next = new Set(state.shortlistedPlaceIds)

  if (shortlisted) {
    next.add(placeId)
  } else {
    next.delete(placeId)
  }

  const updated: DiscoveryRuntimeState = {
    ...state,
    shortlistedPlaceIds: [...next].sort((left, right) => left.localeCompare(right, 'tr')),
  }

  await writeState(updated)
  return updated
}

export async function markDiscoveryImport(placeId: string, record: DiscoveryImportRecord) {
  const state = await readDiscoveryRuntimeState()
  const updated: DiscoveryRuntimeState = {
    shortlistedPlaceIds: state.shortlistedPlaceIds.includes(placeId)
      ? state.shortlistedPlaceIds
      : [...state.shortlistedPlaceIds, placeId].sort((left, right) => left.localeCompare(right, 'tr')),
    imports: {
      ...state.imports,
      [placeId]: record,
    },
  }

  await writeState(updated)
  return updated
}
