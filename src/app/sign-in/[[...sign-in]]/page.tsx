import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-secondary-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">RT</span>
          </div>
          <h1 className="text-2xl font-bold text-secondary-600">Admin Sign In</h1>
          <p className="text-secondary-500 mt-1">
            Sign in with your authorized Google account
          </p>
        </div>
        <SignIn
          appearance={{
            elements: {
              rootBox: 'mx-auto',
              card: 'shadow-lg border border-secondary-200',
              headerTitle: 'hidden',
              headerSubtitle: 'hidden',
              socialButtonsBlockButton:
                'border-secondary-300 hover:bg-secondary-50',
              formButtonPrimary: 'bg-primary-500 hover:bg-primary-600',
              footerActionLink: 'text-primary-500 hover:text-primary-600',
            },
          }}
        />
      </div>
    </div>
  )
}
