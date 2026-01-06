import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { auth } from '@clerk/nextjs/server'
import { isAuthorizedAdmin } from '@/config/authorized-users'
import { readAdminState, writeAdminState, jsonError } from '@/lib/admin-store'
import { AdminState } from '@/lib/admin-defaults'

const ensureAdmin = async () => {
  const { userId, sessionClaims } = await auth()
  if (!userId) return null
  const emailClaim =
    (sessionClaims?.email as string | undefined) ??
    (sessionClaims?.email_address as string | undefined) ??
    (Array.isArray(sessionClaims?.email_addresses)
      ? (sessionClaims.email_addresses[0] as string)
      : undefined)
  return isAuthorizedAdmin(emailClaim) ? emailClaim : null
}

export async function GET() {
  const isAdmin = await ensureAdmin()
  if (!isAdmin) return jsonError('Unauthorized', 401)
  const state = await readAdminState()
  return NextResponse.json(state)
}

export async function POST(request: Request) {
  const isAdmin = await ensureAdmin()
  if (!isAdmin) return jsonError('Unauthorized', 401)

  let body: Partial<AdminState>
  try {
    body = (await request.json()) as Partial<AdminState>
  } catch {
    return jsonError('Invalid JSON body')
  }

  const saved = await writeAdminState(body)

  // Revalidate key pages after content updates
  const pathsToRevalidate = ['/', '/about', '/services', '/capabilities', '/gallery', '/contact']
  pathsToRevalidate.forEach((p) => revalidatePath(p))

  return NextResponse.json({ message: 'Saved', state: saved })
}
