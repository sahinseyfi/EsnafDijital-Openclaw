import { promises as fs } from 'fs'
import path from 'path'
import { projectOsMockData } from '@/lib/project-os/mock-data'
import type { ProjectOsDataset } from '@/lib/project-os/types'

const STORE_DIR = path.join(process.cwd(), '.data')
const STORE_PATH = path.join(STORE_DIR, 'project-os-mock.json')

export async function readProjectOsMockStore(): Promise<ProjectOsDataset> {
  try {
    const raw = await fs.readFile(STORE_PATH, 'utf8')
    const parsed = JSON.parse(raw)
    if (parsed && typeof parsed === 'object') return parsed as ProjectOsDataset
    return projectOsMockData
  } catch {
    await writeProjectOsMockStore(projectOsMockData)
    return projectOsMockData
  }
}

export async function writeProjectOsMockStore(dataset: ProjectOsDataset) {
  await fs.mkdir(STORE_DIR, { recursive: true })
  await fs.writeFile(STORE_PATH, JSON.stringify(dataset, null, 2), 'utf8')
}
