export type Role = 'USER' | 'ADMIN'

export function parseAdminEmails(value: string | undefined): string[] {
  return (value ?? '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean)
}

export function isAdminEmail(email: string, adminEmails: string | undefined): boolean {
  return parseAdminEmails(adminEmails).includes(email.trim().toLowerCase())
}
