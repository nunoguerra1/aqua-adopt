import { z } from 'zod'

export const coordinate = (min: number, max: number) =>
  z
    .string()
    .trim()
    .min(1)
    .transform((value) => Number(value.replace(',', '.')))
    .pipe(z.number().min(min).max(max))