'use client'

import { ReactNode, useEffect, useState } from 'react'

// Check if Clerk is properly configured
const isClerkConfigured = (): boolean => {
  const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  return Boolean(key && key !== 'YOUR_PUBLISHABLE_KEY' && key.startsWith('pk_'))
}

export default function ClerkProviderWrapper({
  children,
}: {
  children: ReactNode
}) {
  const [ClerkProviderComponent, setClerkProviderComponent] = useState<React.ComponentType<{ children: ReactNode }> | null>(null)

  useEffect(() => {
    if (isClerkConfigured()) {
      import('@clerk/nextjs').then((mod) => {
        setClerkProviderComponent(() => mod.ClerkProvider)
      })
    }
  }, [])

  // If Clerk is not configured or not yet loaded, just render children
  if (!ClerkProviderComponent) {
    return <>{children}</>
  }

  return <ClerkProviderComponent>{children}</ClerkProviderComponent>
}
