// Authorized admin email addresses
// Add emails here to grant admin access
export const AUTHORIZED_ADMIN_EMAILS = [
  'logan@lanou.com',
] as const

export function isAuthorizedAdmin(email: string | null | undefined): boolean {
  if (!email) return false
  return AUTHORIZED_ADMIN_EMAILS.includes(email.toLowerCase() as typeof AUTHORIZED_ADMIN_EMAILS[number])
}
