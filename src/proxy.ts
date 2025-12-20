import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { AUTHORIZED_ADMIN_EMAILS } from '@/config/authorized-users'

const isAdminRoute = createRouteMatcher(['/admin(.*)'])

export default clerkMiddleware(async (auth, req) => {
  // Protect admin routes
  if (isAdminRoute(req)) {
    const { userId, sessionClaims } = await auth()

    // Must be signed in
    if (!userId) {
      const signInUrl = new URL('/sign-in', req.url)
      signInUrl.searchParams.set('redirect_url', req.url)
      return NextResponse.redirect(signInUrl)
    }

    // Must be an authorized admin
    const email = sessionClaims?.email as string | undefined
    if (!email || !AUTHORIZED_ADMIN_EMAILS.includes(email.toLowerCase() as typeof AUTHORIZED_ADMIN_EMAILS[number])) {
      return NextResponse.redirect(new URL('/unauthorized', req.url))
    }
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
