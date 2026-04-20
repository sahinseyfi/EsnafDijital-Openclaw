import { promises as fs } from 'fs'
import path from 'path'
import type { ConsultationDetail } from '@/lib/consultation-center/types'

const STORE_DIR = path.join(process.cwd(), '.data')
const STORE_PATH = path.join(STORE_DIR, 'consultation-center-mock.json')

export async function readMockStore(seed: ConsultationDetail[]): Promise<ConsultationDetail[]> {
  try {
    const raw = await fs.readFile(STORE_PATH, 'utf8')
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) return parsed as ConsultationDetail[]
    return seed
  } catch {
    await writeMockStore(seed)
    return seed
  }
}

export async function writeMockStore(items: ConsultationDetail[]) {
  await fs.mkdir(STORE_DIR, { recursive: true })
  await fs.writeFile(STORE_PATH, JSON.stringify(items, null, 2), 'utf8')
}
