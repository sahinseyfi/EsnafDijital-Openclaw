import Link from 'next/link'
import { notFound } from 'next/navigation'
import { AdminShell } from '@/components/admin/AdminShell'
import { DiscoveryRowActions } from '@/components/discovery/DiscoveryRowActions'
import { readDiscoveryRuntimeState } from '@/lib/discovery/runtime'
import { readDiscoveryRow, readDiscoverySnapshots } from '@/lib/discovery/service'
import type { DiscoveryOwnershipStatus } from '@/lib/discovery/types'

export const dynamic = 'force-dynamic'

const segmentLabels = {
  berber: 'Berber',
  'guzellik salonu': 'Güzellik salonu',
} as const

const bucketLabels = {
  shortlist: 'Kısa liste',
  review: 'İncele',
  skip: 'Ele',
} as const

const ownershipLabels: Record<DiscoveryOwnershipStatus, string> = {
  claimed: 'Alınmış',
  unclaimed: 'Alınmamış',
  unknown: 'Bilinmiyor',
}

function formatRating(value: number | null) {
  return typeof value === 'number' ? value.toFixed(1) : '—'
}

function formatChange(previous: string | number | boolean | null | undefined, current: string | number | boolean | null | undefined) {
  const prev = previous ?? 'Yok'
  const next = current ?? 'Yok'
  return `${prev} → ${next}`
}

export default async function DiscoveryDetailPage({
  params,
}: {
  params: Promise<{ placeId: string }>
}) {
  const { placeId } = await params
  const [row, runtimeState, snapshots] = await Promise.all([
    readDiscoveryRow(decodeURIComponent(placeId)),
    readDiscoveryRuntimeState(),
    readDiscoverySnapshots(decodeURIComponent(placeId)),
  ])

  if (!row) {
    notFound()
  }

  const importInfo = runtimeState.imports[row.candidate.placeId]
  const isShortlisted = runtimeState.shortlistedPlaceIds.includes(row.candidate.placeId)
  const latestSnapshot = snapshots.at(-1) || null
  const previousSnapshot = snapshots.length > 1 ? snapshots.at(-2) || null : null
  const changedFields = previousSnapshot ? [
    previousSnapshot.reviewsCount !== latestSnapshot?.reviewsCount ? { label: 'Yorum sayısı', value: formatChange(previousSnapshot.reviewsCount, latestSnapshot?.reviewsCount) } : null,
    previousSnapshot.rating !== latestSnapshot?.rating ? { label: 'Puan', value: formatChange(formatRating(previousSnapshot.rating), formatRating(latestSnapshot?.rating ?? null)) } : null,
    previousSnapshot.websiteUrl !== latestSnapshot?.websiteUrl ? { label: 'Web sitesi', value: formatChange(previousSnapshot.websiteUrl || 'Yok', latestSnapshot?.websiteUrl || 'Yok') } : null,
    previousSnapshot.phone !== latestSnapshot?.phone ? { label: 'Telefon', value: formatChange(previousSnapshot.phone || 'Yok', latestSnapshot?.phone || 'Yok') } : null,
    previousSnapshot.ownershipStatus !== latestSnapshot?.ownershipStatus ? { label: 'Sahiplik', value: formatChange(ownershipLabels[previousSnapshot.ownershipStatus], ownershipLabels[latestSnapshot?.ownershipStatus || 'unknown']) } : null,
    previousSnapshot.matchedSearchTerms.join(', ') !== latestSnapshot?.matchedSearchTerms.join(', ') ? { label: 'Eşleşen terimler', value: formatChange(previousSnapshot.matchedSearchTerms.join(', ') || 'Yok', latestSnapshot?.matchedSearchTerms.join(', ') || 'Yok') } : null,
  ].filter(Boolean) as { label: string; value: string }[] : []

  return (
    <AdminShell
      title="Keşif detayı"
      description="Seçili aday için şu ana kadar çekilen ön eleme verisini tek yerde gösterir."
    >
      <section className="card stack-sm">
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <div>
            <p className="eyebrow">Aday detay</p>
            <h3>{row.candidate.name}</h3>
            <p className="muted">{row.candidate.categoryName || 'Kategori yok'} · {segmentLabels[row.source.segment]} · {row.candidate.district || 'İlçe yok'}</p>
          </div>
          <div className="page-header-actions">
            <Link href="/discovery" className="button-secondary">Listeye dön</Link>
            <a href={row.candidate.mapsUrl} target="_blank" rel="noreferrer" className="button-primary">Haritada aç</a>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          <span className="badge">{bucketLabels[row.scoring.bucket]}</span>
          <span className="badge">Skor {row.scoring.score}</span>
          <span className="badge">Sahiplik: {ownershipLabels[row.candidate.ownershipStatus]}</span>
          {isShortlisted ? <span className="badge">Kısa listede</span> : null}
          {importInfo ? <span className="badge">İşletmeye aktarıldı</span> : null}
        </div>

        <DiscoveryRowActions
          placeId={row.candidate.placeId}
          initiallyShortlisted={isShortlisted}
          importInfo={importInfo || null}
          payload={{
            placeId: row.candidate.placeId,
            name: row.candidate.name,
            segment: row.source.segment,
            district: row.candidate.district,
            address: row.candidate.address,
            categoryName: row.candidate.categoryName,
            phone: row.candidate.phone,
            websiteUrl: row.candidate.websiteUrl,
            reviewsCount: row.candidate.reviewsCount,
            score: row.scoring.score,
            matchedSearchTerms: row.source.matchedSearchTerms,
          }}
        />
      </section>

      {importInfo ? (
        <section className="card stack-sm">
          <div>
            <p className="eyebrow">İşletme bağlantısı</p>
            <h3>Bu aday işletme kaydına taşındı</h3>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            <span className="badge">İşletme {importInfo.businessId.slice(0, 8)}</span>
            <span className="badge">Audit {importInfo.auditId.slice(0, 8)}</span>
            {'importedAt' in importInfo && importInfo.importedAt ? <span className="badge">Aktarım {importInfo.importedAt}</span> : null}
          </div>
          <div className="page-header-actions">
            <Link href={`/businesses/${importInfo.businessId}`} className="button-primary">İşletme kaydını aç</Link>
          </div>
        </section>
      ) : null}

      {latestSnapshot ? (
        <section className="card stack-sm">
          <div>
            <p className="eyebrow">Çekim geçmişi</p>
            <h3>Önce ve şimdi</h3>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            <span className="badge">Toplam çekim {snapshots.length}</span>
            <span className="badge">Son kayıt {latestSnapshot.capturedAt}</span>
            {previousSnapshot ? <span className="badge">Bir önceki {previousSnapshot.capturedAt}</span> : null}
          </div>
          {previousSnapshot ? (
            changedFields.length ? (
              <ul className="list">
                {changedFields.map((item) => (
                  <li key={item.label}><strong>{item.label}:</strong> {item.value}</li>
                ))}
              </ul>
            ) : (
              <p className="muted">Son iki çekim arasında izlenen alanlarda değişiklik yok.</p>
            )
          ) : (
            <p className="muted">Henüz karşılaştırma yapacak ikinci çekim yok. Sonraki taramada önce ve şimdi farkı burada görünecek.</p>
          )}
        </section>
      ) : null}

      <section className="grid-2" style={{ alignItems: 'start' }}>
        <article className="card stack-sm">
          <div>
            <p className="eyebrow">Temel bilgi</p>
            <h3>Cekilen aday verisi</h3>
          </div>
          <dl className="stack-xs">
            <div>
              <dt className="eyebrow">Adres</dt>
              <dd>{row.candidate.address || 'Yok'}</dd>
            </div>
            <div>
              <dt className="eyebrow">Telefon</dt>
              <dd>{row.candidate.phone || 'Yok'}</dd>
            </div>
            <div>
              <dt className="eyebrow">Web sitesi</dt>
              <dd>{row.candidate.websiteUrl ? <a href={row.candidate.websiteUrl} target="_blank" rel="noreferrer" className="ghost-link">{row.candidate.websiteUrl}</a> : 'Yok'}</dd>
            </div>
            <div>
              <dt className="eyebrow">Puan / yorum</dt>
              <dd>{formatRating(row.candidate.rating)} puan, {row.candidate.reviewsCount} yorum</dd>
            </div>
            <div>
              <dt className="eyebrow">Acilis saatleri</dt>
              <dd>{row.candidate.hasOpeningHours ? 'Var' : 'Yok'}</dd>
            </div>
            <div>
              <dt className="eyebrow">Kapali sinyali</dt>
              <dd>{row.candidate.isClosed ? 'Kapali gorunuyor' : 'Kapali sinyali yok'}</dd>
            </div>
            <div>
              <dt className="eyebrow">Kategoriler</dt>
              <dd>{row.candidate.categories.length ? row.candidate.categories.join(', ') : 'Yok'}</dd>
            </div>
            <div>
              <dt className="eyebrow">Koordinat</dt>
              <dd>{row.candidate.latitude && row.candidate.longitude ? `${row.candidate.latitude}, ${row.candidate.longitude}` : 'Yok'}</dd>
            </div>
          </dl>
        </article>

        <article className="card stack-sm">
          <div>
            <p className="eyebrow">Keşif sinyali</p>
            <h3>Neden burada gorunuyor?</h3>
          </div>
          <dl className="stack-xs">
            <div>
              <dt className="eyebrow">Arama kapsami</dt>
              <dd>{row.source.searchCoverageNote || 'Yok'}</dd>
            </div>
            <div>
              <dt className="eyebrow">Eslesen terimler</dt>
              <dd>{row.source.matchedSearchTerms.length ? row.source.matchedSearchTerms.join(', ') : 'Yok'}</dd>
            </div>
            <div>
              <dt className="eyebrow">Eksik terimler</dt>
              <dd>{row.source.missingSearchTerms.length ? row.source.missingSearchTerms.join(', ') : 'Yok'}</dd>
            </div>
            <div>
              <dt className="eyebrow">Sahiplik sinyali</dt>
              <dd>{ownershipLabels[row.candidate.ownershipStatus]}{row.candidate.ownershipStatus === 'unclaimed' ? ' (işletme kaydı alınmamış görünüyor)' : row.candidate.ownershipStatus === 'claimed' ? ' (işletme kaydı alınmış görünüyor)' : ''}</dd>
            </div>
            <div>
              <dt className="eyebrow">Skor nedenleri</dt>
              <dd>{row.scoring.reasons.length ? row.scoring.reasons.join(', ') : 'Not yok'}</dd>
            </div>
            <div>
              <dt className="eyebrow">Ham kayit adedi</dt>
              <dd>{row.source.rawRecordCount}</dd>
            </div>
            <div>
              <dt className="eyebrow">Ilk gorulme</dt>
              <dd>{row.source.collectedAt || 'Yok'}</dd>
            </div>
            <div>
              <dt className="eyebrow">Güncel tarama özeti</dt>
              <dd>{row.source.rawRecordCount} ham kayittan ozetlenmis, {row.source.matchedSearchTermCount} arama teriminde yakalanmis.</dd>
            </div>
            <div>
              <dt className="eyebrow">Çekim durumu</dt>
              <dd>{snapshots.length ? `${snapshots.length} kayit var` : 'Henuz snapshot yok'}</dd>
            </div>
          </dl>
        </article>
      </section>
    </AdminShell>
  )
}
