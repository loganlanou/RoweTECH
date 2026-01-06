import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { isAuthorizedAdmin } from '@/config/authorized-users'

const isAdminRoute = createRouteMatcher(['/admin(.*)'])

export default clerkMiddleware(async (auth, req) => {
  if (!isAdminRoute(req)) {
    return NextResponse.next()
  }

  const { userId, sessionClaims } = await auth()

  if (!userId) {
    const signInUrl = new URL('/sign-in', req.url)
    signInUrl.searchParams.set('redirect_url', req.url)
    return NextResponse.redirect(signInUrl)
  }

  const emailClaim =
    (sessionClaims?.email as string | undefined) ??
    (sessionClaims?.email_address as string | undefined) ??
    (Array.isArray(sessionClaims?.email_addresses)
      ? (sessionClaims.email_addresses[0] as string)
      : undefined)

  if (!isAuthorizedAdmin(emailClaim)) {
    return NextResponse.redirect(new URL('/unauthorized', req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
