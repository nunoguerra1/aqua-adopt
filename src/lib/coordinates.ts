const numero = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
})

export function formatCoordinates(latitude: number, longitude: number): string {
  const lat = `${numero.format(Math.abs(latitude))}° ${latitude >= 0 ? 'N' : 'S'}`
  const lng = `${numero.format(Math.abs(longitude))}° ${longitude >= 0 ? 'L' : 'O'}`
  return `${lat}, ${lng}`
}

export function roundCoordinate(value: number, decimals = 1): number {
  const factor = 10 ** decimals
  return Math.round(value * factor) / factor + 0
}

export function toPublicCoordinates(latitude: number, longitude: number) {
  return {
    latitude: roundCoordinate(latitude),
    longitude: roundCoordinate(longitude),
  }
}

export function parseCoordinate(value: string, min: number, max: number): number | null {
  const normalized = value.trim().replace(',', '.')
  if (normalized === '') return null

  const number = Number(normalized)
  if (!Number.isFinite(number) || number < min || number > max) return null

  return number
}
