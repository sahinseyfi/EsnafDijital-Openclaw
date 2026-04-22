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
    return NextResponse.json({ ok: false, message: 'Geçit yeniden başlatma yardımcısı bulunamadı' }, { status: 404 })
  }

  try {
    const { stdout, stderr } = await execFileAsync(HELPER)
    return NextResponse.json({ ok: true, message: 'Geçit yeniden başlatma işlemi tetiklendi', stdout, stderr })
  } catch (error: unknown) {
    const details = typeof error === 'object' && error !== null
      ? (error as { stderr?: string; message?: string }).stderr || (error as { stderr?: string; message?: string }).message || 'Bilinmeyen hata'
      : 'Bilinmeyen hata'

    return NextResponse.json(
      {
        ok: false,
        message: 'Geçit yeniden başlatılamadı',
        error: details,
      },
      { status: 500 },
    )
  }
}
