import { z } from 'zod'

export const SPECIES_GROUPS = [
  'TURTLE',
  'CETACEAN',
  'PINNIPED',
  'SEABIRD',
  'OTHER',
  'UNKNOWN',
] as const

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .transform((value) => (value === '' ? undefined : value))
    .optional()

const coordinate = (min: number, max: number) =>
  z
    .string()
    .trim()
    .min(1)
    .transform((value) => Number(value.replace(',', '.')))
    .refine((val) => !isNaN(val) && val >= min && val <= max)

export const sightingSchema = z.object({
  reporterName: optionalText(80),
  speciesGroup: z.enum(SPECIES_GROUPS).default('UNKNOWN'),
  placeText: optionalText(120),
  latitude: coordinate(-90, 90),
  longitude: coordinate(-180, 180),
  description: z.string().trim().min(10).max(1000),
})

export type SightingInput = z.infer<typeof sightingSchema>

const FIELD_MESSAGES = {
  reporterName: 'Use até 80 caracteres no nome.',
  speciesGroup: 'Escolha uma opção da lista.',
  placeText: 'Use até 120 caracteres na referência do local.',
  latitude: 'Escolha o local do avistamento no mapa ou use sua localização.',
  longitude: 'Escolha o local do avistamento no mapa ou use sua localização.',
  description: 'Descreva o que você viu em 10 a 1000 caracteres.',
} as const

type SightingField = keyof typeof FIELD_MESSAGES

export type ParseResult =
  { ok: true; data: SightingInput } | { ok: false; fieldErrors: Record<string, string> }

export function parseSighting(input: Record<string, unknown>): ParseResult {
  const result = sightingSchema.safeParse(input)
  if (result.success) return { ok: true, data: result.data }

  const fieldErrors: Record<string, string> = {}
  for (const issue of result.error.issues) {
    const field = String(issue.path[0])
    if (field in FIELD_MESSAGES && !fieldErrors[field]) {
      fieldErrors[field] = FIELD_MESSAGES[field as SightingField]
    }
  }
  if (Object.keys(fieldErrors).length === 0) fieldErrors.form = 'Dados inválidos.'

  return { ok: false, fieldErrors }
}
