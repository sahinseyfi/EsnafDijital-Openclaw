import Link from 'next/link'
import { notFound } from 'next/navigation'
import { AdminShell } from '@/components/admin/AdminShell'
import { DiscoveryRowActions } from '@/components/discovery/DiscoveryRowActions'
import { readDiscoveryRuntimeState } from '@/lib/discovery/runtime'
import { readDiscoveryRow } from '@/lib/discovery/service'
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
  claimed: 'Alinmis',
  unclaimed: 'Alinmamis',
  unknown: 'Bilinmiyor',
}

function formatRating(value: number | null) {
  return typeof value === 'number' ? value.toFixed(1) : '—'
}

export default async function DiscoveryDetailPage({
  params,
}: {
  params: Promise<{ placeId: string }>
}) {
  const { placeId } = await params
  const [row, runtimeState] = await Promise.all([
    readDiscoveryRow(decodeURIComponent(placeId)),
    readDiscoveryRuntimeState(),
  ])

  if (!row) {
    notFound()
  }

  const importInfo = runtimeState.imports[row.candidate.placeId]
  const isShortlisted = runtimeState.shortlistedPlaceIds.includes(row.candidate.placeId)

  return (
    <AdminShell
      title="Discovery detay"
      description="Seçili aday için şu ana kadar çekilen staging verisini tek yerde gösterir."
    >
      <section className="card stack-sm">
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
          <div>
            <p className="eyebrow">Aday detay</p>
            <h3>{row.candidate.name}</h3>
            <p className="muted">{row.candidate.categoryName || 'Kategori yok'} · {segmentLabels[row.source.segment]} · {row.candidate.district || 'Ilce yok'}</p>
          </div>
          <div className="page-header-actions">
            <Link href="/discovery" className="button-secondary">Listeye don</Link>
            <a href={row.candidate.mapsUrl} target="_blank" rel="noreferrer" className="button-primary">Maps'te ac</a>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          <span className="badge">{bucketLabels[row.scoring.bucket]}</span>
          <span className="badge">Skor {row.scoring.score}</span>
          <span className="badge">Sahiplik: {ownershipLabels[row.candidate.ownershipStatus]}</span>
          {isShortlisted ? <span className="badge">Shortlistte</span> : null}
          {importInfo ? <span className="badge">Project OSa aktarildi</span> : null}
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
            <p className="eyebrow">Project OS baglantisi</p>
            <h3>Bu aday ana hatta tasindi</h3>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            <span className="badge">Business {importInfo.businessId.slice(0, 8)}</span>
            <span className="badge">Audit {importInfo.auditId.slice(0, 8)}</span>
            {'importedAt' in importInfo && importInfo.importedAt ? <span className="badge">Aktarim {importInfo.importedAt}</span> : null}
          </div>
          <div className="page-header-actions">
            <Link href={`/project-os?businessId=${importInfo.businessId}#businesses`} className="button-primary">Business kaydini ac</Link>
          </div>
        </section>
      ) : null}

      <section className="grid-2" style={{ alignItems: 'start' }}>
        <article className="card stack-sm">
          <div>
            <p className="eyebrow">Temel bilgi</p>
            <h3>Cekilen aday verisi</h3>
          </div>
          <dl className="stack-sm">
            <div>
              <dt className="eyebrow">Adres</dt>
              <dd>{row.candidate.address || 'Yok'}</dd>
            </div>
            <div>
              <dt className="eyebrow">Telefon</dt>
              <dd>{row.candidate.phone || 'Yok'}</dd>
            </div>
            <div>
              <dt className="eyebrow">Website</dt>
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
            <p className="eyebrow">Discovery sinyali</p>
            <h3>Neden burada gorunuyor?</h3>
          </div>
          <dl className="stack-sm">
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
              <dd>{ownershipLabels[row.candidate.ownershipStatus]}{row.candidate.ownershipStatus === 'unclaimed' ? ' (claimThisBusiness=true)' : row.candidate.ownershipStatus === 'claimed' ? ' (claimThisBusiness=false)' : ''}</dd>
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
              <dt className="eyebrow">Mevcut scrape ozeti</dt>
              <dd>{row.source.rawRecordCount} ham kayittan ozetlenmis, {row.source.matchedSearchTermCount} arama teriminde yakalanmis.</dd>
            </div>
          </dl>
        </article>
      </section>
    </AdminShell>
  )
}
