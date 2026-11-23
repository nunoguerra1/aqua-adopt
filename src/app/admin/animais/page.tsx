import Link from 'next/link'
import { deleteAnimalAction } from '@/app/actions/animals'
import { ConfirmButton } from '@/components/ui/ConfirmButton'
import { requireAdmin } from '@/lib/auth/session'
import { STATUS_INFO } from '@/lib/status'
import { getAnimalsForAdmin } from '@/services/animals'

export default async function AdminAnimalsPage() {
  await requireAdmin('/admin/animais')
  const animals = await getAnimalsForAdmin()

  return (
    <main className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-4xl font-black text-ocean-900 tracking-tighter">Animais</h1>
        <Link
          href="/admin/animais/novo"
          className="bg-ocean-900 text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-ocean-800 transition-colors"
        >
          Novo animal
        </Link>
      </div>

      {animals.length === 0 ? (
        <p className="text-gray-400 font-medium italic">Nenhum animal cadastrado.</p>
      ) : (
        <ul className="space-y-4">
          {animals.map((animal) => {
            const hasAdopters = animal._count.adoptions > 0

            return (
              <li
                key={animal.id}
                className="glass rounded-3xl p-6 flex flex-wrap items-center justify-between gap-4"
              >
                <div>
                  <strong className="text-ocean-900 text-lg">{animal.name}</strong>
                  <p className="text-sm text-gray-500">
                    {animal.species} · {STATUS_INFO[animal.status].label}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {animal._count.updates} atualizações · {animal._count.adoptions} padrinhos
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/animais/${animal.id}`}
                    className="rounded-full bg-ocean-50 px-5 py-2 text-sm font-bold text-ocean-900 hover:bg-ocean-100 transition-colors"
                  >
                    Editar
                  </Link>
                  <form action={deleteAnimalAction}>
                    <input type="hidden" name="id" value={animal.id} />
                    <ConfirmButton
                      message={`Excluir ${animal.name} e todo o diário de bordo? Isso não pode ser desfeito.`}
                      disabled={hasAdopters}
                      title={
                        hasAdopters ? 'Animais com padrinhos não podem ser excluídos' : undefined
                      }
                      className="rounded-full bg-red-50 px-5 py-2 text-sm font-bold text-red-700 hover:bg-red-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Excluir
                    </ConfirmButton>
                  </form>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </main>
  )
}
