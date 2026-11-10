const numero = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
})

export function formatCoordinates(latitude: number, longitude: number): string {
    const lat = `${numero.format(Math.abs(latitude))}° ${latitude >= 0 ? 'N' : 'S'}`
    const lng = `${numero.format(Math.abs(longitude))}° ${longitude >= 0 ? 'L' : 'O'}`
    return `${lat}, ${lng}`
}