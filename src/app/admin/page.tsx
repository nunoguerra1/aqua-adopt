import Link from 'next/link'
import { moderateSighting } from '@/app/actions/moderation'
import { requireAdmin } from '@/lib/auth/session'
import { SPECIES_GROUP_LABELS } from '@/lib/sightings/labels'
import {
  MODERATION_STATUSES,
  parseStatusFilter,
  type ModerationStatus,
} from '@/lib/sightings/moderation'
import { countSightingsByStatus, getSightingsForModeration } from '@/services/sightings'

const dateFormat = new Intl.DateTimeFormat('pt-BR', {
  dateStyle: 'short',
  timeStyle: 'short',
  timeZone: 'America/Sao_Paulo',
})

const TAB_LABELS: Record<ModerationStatus, string> = {
  PENDING: 'Pendentes',
  APPROVED: 'Aprovados',
  REJECTED: 'Rejeitados',
}

const ACTION_LABELS: Record<ModerationStatus, string> = {
  PENDING: 'Reabrir',
  APPROVED: 'Aprovar',
  REJECTED: 'Rejeitar',
}

const ACTION_STYLES: Record<ModerationStatus, string> = {
  PENDING: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
  APPROVED: 'bg-ocean-900 text-white hover:bg-ocean-800',
  REJECTED: 'bg-red-50 text-red-700 hover:bg-red-100',
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string | string[] }>
}) {
  await requireAdmin('/admin')

  const { status: statusParam } = await searchParams
  const status = parseStatusFilter(statusParam)

  const [counts, sightings] = await Promise.all([
    countSightingsByStatus(),
    getSightingsForModeration(status),
  ])

  return (
    <main className="space-y-8">
      <h1 className="text-4xl font-black text-ocean-900 tracking-tighter">Avistamentos</h1>

      <nav className="flex flex-wrap gap-2" aria-label="Filtrar por status">
        {MODERATION_STATUSES.map((tab) => (
          <Link
            key={tab}
            href={`/admin?status=${tab}`}
            aria-current={tab === status ? 'page' : undefined}
            className={`rounded-full px-5 py-2 text-sm font-bold transition-colors ${
              tab === status
                ? 'bg-ocean-900 text-white'
                : 'bg-ocean-50 text-ocean-900 hover:bg-ocean-100'
            }`}
          >
            {TAB_LABELS[tab]} ({counts[tab]})
          </Link>
        ))}
      </nav>

      <p className="text-sm text-gray-500">
        Antes de aprovar, confira se a descrição não revela o local exato de uma espécie ameaçada.
        Se revelar, rejeite. Os dados abaixo são privados: não os compartilhe.
      </p>

      {sightings.length === 0 ? (
        <p className="text-gray-400 font-medium italic">Nenhum relato nesta lista.</p>
      ) : (
        <ul className="space-y-4">
          {sightings.map((sighting) => (
            <li key={sighting.id} className="glass rounded-3xl p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <strong className="text-ocean-900">
                  {SPECIES_GROUP_LABELS[sighting.speciesGroup]}
                </strong>
                <span className="text-xs text-gray-400">
                  Enviado em {dateFormat.format(sighting.createdAt)}
                </span>
              </div>

              <p className="text-sm text-gray-700">{sighting.description}</p>

              <dl className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-gray-500">
                <div>
                  <dt className="font-bold">Posição exata</dt>
                  <dd>
                    {sighting.latitude.toFixed(5)}, {sighting.longitude.toFixed(5)}
                  </dd>
                </div>
                <div>
                  <dt className="font-bold">Referência do local</dt>
                  <dd>{sighting.placeText ?? '—'}</dd>
                </div>
                <div>
                  <dt className="font-bold">Relator</dt>
                  <dd>{sighting.reporterName ?? 'Anônimo'}</dd>
                </div>
              </dl>

              {sighting.reviewedAt && (
                <p className="text-xs text-gray-400">
                  Revisado{sighting.reviewedBy ? ` por ${sighting.reviewedBy.email}` : ''} em{' '}
                  {dateFormat.format(sighting.reviewedAt)}
                </p>
              )}

              <div className="flex flex-wrap gap-2">
                {MODERATION_STATUSES.filter((target) => target !== sighting.status).map(
                  (target) => (
                    <form key={target} action={moderateSighting}>
                      <input type="hidden" name="id" value={sighting.id} />
                      <input type="hidden" name="status" value={target} />
                      <button
                        type="submit"
                        className={`rounded-full px-5 py-2 text-sm font-bold transition-colors ${ACTION_STYLES[target]}`}
                      >
                        {ACTION_LABELS[target]}
                      </button>
                    </form>
                  ),
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
