import type { Metadata } from 'next'
import { Inter, Oswald } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: {
    default: 'RoweTech Machine & Engineering | Precision Machining in Cadott, WI',
    template: '%s | RoweTech Machine & Engineering',
  },
  description:
    'RoweTech Machine & Engineering provides plastic injection mold repair, custom fixtures, EOAT tooling, and CNC machining services for manufacturers across Wisconsin.',
  keywords: [
    'CNC machining',
    'mold repair',
    'plastic injection mold',
    'custom fixtures',
    'EOAT',
    'end of arm tooling',
    'Wisconsin manufacturing',
    'Cadott WI',
    'precision machining',
  ],
  authors: [{ name: 'RoweTech Machine & Engineering' }],
  openGraph: {
    title: 'RoweTech Machine & Engineering',
    description:
      'Precision machining, mold repair, and custom tooling solutions for manufacturers across Wisconsin.',
    url: 'https://rowetechmachine.com',
    siteName: 'RoweTech Machine & Engineering',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${inter.variable} ${oswald.variable}`}>
        <body className={`${inter.className} bg-secondary-950 text-secondary-100`}>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  )
}
