'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { parseAnimal } from '@/lib/animals/schema'
import { requireAdmin } from '@/lib/auth/session'
import { createAnimal, deleteAnimalIfUnadopted, updateAnimal } from '@/services/animals'

export type AnimalFormState = {
  status: 'idle' | 'error'
  message?: string
  fieldErrors?: Record<string, string>
  values?: Record<string, string>
}

const FIELDS = [
  'name',
  'species',
  'image',
  'description',
  'status',
  'latitude',
  'longitude',
] as const

function pickFields(formData: FormData): Record<string, string> {
  const values: Record<string, string> = {}
  for (const field of FIELDS) {
    const value = formData.get(field)
    values[field] = typeof value === 'string' ? value : ''
  }
  return values
}

function refreshAnimalPages(id?: string) {
  revalidatePath('/')
  revalidatePath('/admin/animais')
  if (id) revalidatePath(`/animals/${id}`)
}

export async function createAnimalAction(
  _previousState: AnimalFormState,
  formData: FormData,
): Promise<AnimalFormState> {
  await requireAdmin('/admin/animais/novo')

  const values = pickFields(formData)
  const parsed = parseAnimal(values)
  if (!parsed.ok) {
    return {
      status: 'error',
      message: 'Confira os campos destacados.',
      fieldErrors: parsed.fieldErrors,
      values,
    }
  }

  try {
    await createAnimal(parsed.data)
  } catch (error) {
    console.error('Erro ao criar animal:', error)
    return { status: 'error', message: 'Não foi possível salvar o animal agora.', values }
  }

  refreshAnimalPages()
  redirect('/admin/animais')
}

export async function updateAnimalAction(
  id: string,
  _previousState: AnimalFormState,
  formData: FormData,
): Promise<AnimalFormState> {
  await requireAdmin(`/admin/animais/${id}`)

  const values = pickFields(formData)
  const parsed = parseAnimal(values)
  if (!parsed.ok) {
    return {
      status: 'error',
      message: 'Confira os campos destacados.',
      fieldErrors: parsed.fieldErrors,
      values,
    }
  }

  try {
    const { count } = await updateAnimal(id, parsed.data)
    if (count === 0) {
      return { status: 'error', message: 'Este animal não existe mais.', values }
    }
  } catch (error) {
    console.error('Erro ao atualizar animal:', error)
    return { status: 'error', message: 'Não foi possível salvar o animal agora.', values }
  }

  refreshAnimalPages(id)
  redirect('/admin/animais')
}

export async function deleteAnimalAction(formData: FormData) {
  await requireAdmin('/admin/animais')

  const id = formData.get('id')
  if (typeof id !== 'string' || id === '') return

  const deleted = await deleteAnimalIfUnadopted(id)
  if (deleted) refreshAnimalPages(id)
}
