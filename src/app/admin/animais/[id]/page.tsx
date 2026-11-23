import { notFound } from 'next/navigation'
import { updateAnimalAction } from '@/app/actions/animals'
import { AnimalForm } from '@/components/admin/AnimalForm'
import { requireAdmin } from '@/lib/auth/session'
import { getAnimalById } from '@/services/animals'

export default async function EditAnimalPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  await requireAdmin(`/admin/animais/${id}`)

  const animal = await getAnimalById(id)
  if (!animal) notFound()

  return (
    <main className="space-y-8">
      <h1 className="text-4xl font-black text-ocean-900 tracking-tighter">Editar {animal.name}</h1>
      <AnimalForm
        action={updateAnimalAction.bind(null, animal.id)}
        submitLabel="Salvar alterações"
        initialValues={{
          name: animal.name,
          species: animal.species,
          image: animal.image,
          description: animal.description,
          status: animal.status,
          latitude: String(animal.latitude),
          longitude: String(animal.longitude),
        }}
      />
    </main>
  )
}
