import { z } from 'zod'
import { CONSERVATION_STATUSES } from '@/lib/status'
import { coordinate } from '@/lib/validation/coordinate'

const text = (min: number, max: number) => z.string().trim().min(min).max(max)

export const animalSchema = z.object({
  name: text(2, 80),
  species: text(2, 80),
  image: z
    .string()
    .trim()
    .max(500)
    .url()
    .refine((value) => /^https?:\/\//i.test(value)),
  description: text(10, 2000),
  status: z.enum(CONSERVATION_STATUSES),
  latitude: coordinate(-90, 90),
  longitude: coordinate(-180, 180),
})

export type AnimalInput = z.infer<typeof animalSchema>

const FIELD_MESSAGES = {
  name: 'Informe o nome (2 a 80 caracteres).',
  species: 'Informe a espécie (2 a 80 caracteres).',
  image: 'Informe o endereço (http ou https) de uma imagem.',
  description: 'Descreva o animal em 10 a 2000 caracteres.',
  status: 'Escolha um status da lista.',
  latitude: 'Escolha a posição no mapa ou digite as coordenadas.',
  longitude: 'Escolha a posição no mapa ou digite as coordenadas.',
} as const

export type AnimalParseResult =
  { ok: true; data: AnimalInput } | { ok: false; fieldErrors: Record<string, string> }

export function parseAnimal(input: Record<string, unknown>): AnimalParseResult {
  const result = animalSchema.safeParse(input)
  if (result.success) return { ok: true, data: result.data }

  const fieldErrors: Record<string, string> = {}
  for (const issue of result.error.issues) {
    const field = String(issue.path[0])
    if (field in FIELD_MESSAGES && !fieldErrors[field]) {
      fieldErrors[field] = FIELD_MESSAGES[field as keyof typeof FIELD_MESSAGES]
    }
  }
  if (Object.keys(fieldErrors).length === 0) fieldErrors.form = 'Dados inválidos.'

  return { ok: false, fieldErrors }
}
