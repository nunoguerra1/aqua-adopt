const LOCAL_HOSTS = ['localhost', '127.0.0.1', '[::1]']

export function getDatabaseHost(url: string | undefined): string {
  try {
    return new URL(url ?? '').hostname
  } catch {
    throw new Error('DATABASE_URL ausente ou inválida.')
  }
}

export function isLocalDatabaseUrl(url: string | undefined): boolean {
  return LOCAL_HOSTS.includes(getDatabaseHost(url))
}
