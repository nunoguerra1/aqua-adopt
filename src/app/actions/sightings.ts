'use server'

import { parseSighting } from '@/lib/sightings/schema'
import { createSighting } from '@/services/sightings'

export type SightingFormState = {
  status: 'idle' | 'success' | 'error'
  message?: string
  fieldErrors?: Record<string, string>
  values?: Record<string, string>
}

const FIELDS = [
  'reporterName',
  'speciesGroup',
  'placeText',
  'latitude',
  'longitude',
  'description',
] as const

function pickFields(formData: FormData): Record<string, string> {
  const values: Record<string, string> = {}
  for (const field of FIELDS) {
    const value = formData.get(field)
    values[field] = typeof value === 'string' ? value : ''
  }
  return values
}

export async function submitSighting(
  _previousState: SightingFormState,
  formData: FormData,
): Promise<SightingFormState> {
  if (formData.get('website')) {
    return { status: 'success' }
  }

  const values = pickFields(formData)
  const parsed = parseSighting(values)

  if (!parsed.ok) {
    return {
      status: 'error',
      message: 'Confira os campos destacados.',
      fieldErrors: parsed.fieldErrors,
      values,
    }
  }

  try {
    await createSighting(parsed.data)
    return { status: 'success' }
  } catch (error) {
    console.error('Erro ao salvar avistamento:', error)
    return {
      status: 'error',
      message: 'Não foi possível enviar o relato agora. Tente novamente em instantes.',
      values,
    }
  }
}
