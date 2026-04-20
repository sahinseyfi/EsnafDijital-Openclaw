import { execFile } from 'child_process'
import { promises as fs } from 'fs'
import { promisify } from 'util'
import { NextResponse } from 'next/server'

const execFileAsync = promisify(execFile)
const HELPER = '/usr/local/bin/esnafdijital-gateway-restart'

export async function POST() {
  try {
    await fs.access(HELPER)
  } catch {
    return NextResponse.json({ ok: false, message: 'Gateway restart helper bulunamadı' }, { status: 404 })
  }

  try {
    const { stdout, stderr } = await execFileAsync(HELPER)
    return NextResponse.json({ ok: true, message: 'Gateway restart tetiklendi', stdout, stderr })
  } catch (error: any) {
    return NextResponse.json(
      {
        ok: false,
        message: 'Gateway restart başarısız oldu',
        error: error?.stderr || error?.message || 'Bilinmeyen hata',
      },
      { status: 500 },
    )
  }
}
