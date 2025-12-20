import Link from 'next/link'
import { SignOutButton } from '@clerk/nextjs'

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-secondary-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-secondary-600 mb-2">
          Access Denied
        </h1>
        <p className="text-secondary-500 mb-6">
          You don&apos;t have permission to access the admin area. Please contact an
          administrator if you believe this is an error.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-primary">
            Go to Homepage
          </Link>
          <SignOutButton>
            <button className="px-6 py-3 border border-secondary-300 text-secondary-600 font-medium rounded-lg hover:bg-secondary-100 transition-colors">
              Sign Out
            </button>
          </SignOutButton>
        </div>
      </div>
    </div>
  )
}
