import { redirect } from 'next/navigation'

export default async function ConsultationCenterRedirect({
  searchParams,
}: {
  searchParams?: Promise<{ selectedId?: string }>
}) {
  const params = await searchParams
  const selectedId = params?.selectedId?.trim()

  if (selectedId) {
    redirect(`/prompt-uretimi?selectedId=${encodeURIComponent(selectedId)}`)
  }

  redirect('/prompt-uretimi')
}
