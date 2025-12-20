'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { isAuthorizedAdmin } from '@/config/authorized-users'

// Check if Clerk is properly configured
const isClerkConfigured = (): boolean => {
  const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  return Boolean(key && key !== 'YOUR_PUBLISHABLE_KEY' && key.startsWith('pk_'))
}

// Dynamically import Clerk components to avoid issues when not configured
const SignInButton = dynamic(
  () => import('@clerk/nextjs').then((mod) => mod.SignInButton),
  { ssr: false }
)

const SignedIn = dynamic(
  () => import('@clerk/nextjs').then((mod) => mod.SignedIn),
  { ssr: false }
)

const SignedOut = dynamic(
  () => import('@clerk/nextjs').then((mod) => mod.SignedOut),
  { ssr: false }
)

const UserButton = dynamic(
  () => import('@clerk/nextjs').then((mod) => mod.UserButton),
  { ssr: false }
)

// Custom hook wrapper for useUser
function useUserEmail(): string | null | undefined {
  // This will be called inside components that are only rendered when Clerk is configured
  // We use a try-catch in case the context isn't available
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { useUser } = require('@clerk/nextjs')
    const { user } = useUser()
    return user?.primaryEmailAddress?.emailAddress
  } catch {
    return null
  }
}

function AdminLinkWrapper() {
  const email = useUserEmail()
  const isAdmin = isAuthorizedAdmin(email)

  if (!isAdmin) return null

  return (
    <Link
      href="/admin"
      className="text-secondary-500 hover:text-secondary-600 font-medium transition-colors duration-200"
    >
      Admin
    </Link>
  )
}

function MobileAdminLinkWrapper() {
  const email = useUserEmail()
  const isAdmin = isAuthorizedAdmin(email)

  if (!isAdmin) return null

  return (
    <Link
      href="/admin"
      className="text-secondary-500 hover:text-secondary-600 hover:bg-secondary-100 px-4 py-3 rounded-lg font-medium transition-all duration-200"
    >
      Admin Dashboard
    </Link>
  )
}

export function DesktopAuthButtons() {
  if (!isClerkConfigured()) return null

  return (
    <div className="flex items-center space-x-4 ml-4 3xl:ml-6">
      <SignedOut>
        <SignInButton mode="modal">
          <button className="text-secondary-500 hover:text-secondary-600 font-medium transition-colors duration-200">
            Sign In
          </button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <AdminLinkWrapper />
        <UserButton
          appearance={{
            elements: {
              avatarBox: 'w-9 h-9',
            },
          }}
        />
      </SignedIn>
    </div>
  )
}

export function MobileAuthButtons() {
  if (!isClerkConfigured()) return null

  return (
    <div className="flex flex-col space-y-2 pt-4 mt-2 border-t border-secondary-200">
      <SignedOut>
        <SignInButton mode="modal">
          <button className="text-secondary-500 hover:text-secondary-600 hover:bg-secondary-100 px-4 py-3 rounded-lg font-medium transition-all duration-200 text-left">
            Sign In
          </button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <MobileAdminLinkWrapper />
        <div className="flex items-center space-x-3 px-4 py-3">
          <UserButton
            appearance={{
              elements: {
                avatarBox: 'w-9 h-9',
              },
            }}
          />
          <span className="text-secondary-500 font-medium">Account</span>
        </div>
      </SignedIn>
    </div>
  )
}
