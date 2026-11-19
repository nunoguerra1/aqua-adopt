import { requireAdmin } from '@/lib/auth/session'
import { SPECIES_GROUP_LABELS } from '@/lib/sightings/labels'
import { countSightingsByStatus, getPendingSightingsForModeration } from '@/services/sightings'

const dateFormat = new Intl.DateTimeFormat('pt-BR', {
  dateStyle: 'short',
  timeStyle: 'short',
  timeZone: 'America/Sao_Paulo',
})

export default async function AdminPage() {
  await requireAdmin()

  const [counts, pending] = await Promise.all([
    countSightingsByStatus(),
    getPendingSightingsForModeration(),
  ])

  const cards = [
    { label: 'Pendentes', value: counts.PENDING },
    { label: 'Aprovados', value: counts.APPROVED },
    { label: 'Rejeitados', value: counts.REJECTED },
  ]

  return (
    <main className="space-y-10">
      <h1 className="text-4xl font-black text-ocean-900 tracking-tighter">Avistamentos</h1>

      <div className="grid grid-cols-3 gap-4">
        {cards.map((card) => (
          <div key={card.label} className="glass rounded-3xl p-6">
            <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400">
              {card.label}
            </p>
            <p className="text-3xl font-black text-ocean-900 mt-1">{card.value}</p>
          </div>
        ))}
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-black text-ocean-900">Fila de moderação</h2>
        <p className="text-sm text-gray-500">
          Aprovar e rejeitar chegam no F1.4. Por enquanto, mude o status no Prisma Studio. Os dados
          abaixo são privados: não os compartilhe.
        </p>

        {pending.length === 0 ? (
          <p className="text-gray-400 font-medium italic">Nenhum relato pendente.</p>
        ) : (
          <ul className="space-y-4">
            {pending.map((sighting) => (
              <li key={sighting.id} className="glass rounded-3xl p-6 space-y-3">
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
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}
