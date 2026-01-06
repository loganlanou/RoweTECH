'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { DesktopAuthButtons, MobileAuthButtons } from './AuthButtons'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Capabilities', href: '/capabilities' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Contact', href: '/contact' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-secondary-950/95 backdrop-blur-lg border-b border-primary-500/20'
          : 'bg-secondary-950/80 backdrop-blur-md'
      }`}
    >
      <nav className="container-custom" aria-label="Main navigation">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group z-50">
            <div className="relative">
              <div className="w-12 h-12 bg-primary-500 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300"
                   style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))' }}>
                <span className="text-white font-bold text-xl font-display">RT</span>
              </div>
              <div className="absolute inset-0 bg-primary-500 blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-display font-bold text-white uppercase tracking-wider">RoweTech</span>
              <span className="block text-xs text-primary-400 font-medium tracking-[0.2em] uppercase">
                Machine & Engineering
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2 3xl:space-x-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="nav-link px-5 py-3 3xl:px-6 3xl:py-4 text-base 3xl:text-xl tracking-wide"
              >
                {item.name}
              </Link>
            ))}
            <DesktopAuthButtons />
          </div>

          {/* Mobile menu button - Animated hamburger */}
          <button
            type="button"
            className="lg:hidden relative w-12 h-12 flex items-center justify-center rounded-lg
                       bg-secondary-900/50 border border-secondary-800 z-50
                       hover:border-primary-500/50 transition-colors duration-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={`block h-0.5 bg-white transition-all duration-300 origin-center ${
                  mobileMenuOpen ? 'rotate-45 translate-y-[9px]' : ''
                }`}
              />
              <span
                className={`block h-0.5 bg-white transition-all duration-300 ${
                  mobileMenuOpen ? 'opacity-0 scale-0' : ''
                }`}
              />
              <span
                className={`block h-0.5 bg-white transition-all duration-300 origin-center ${
                  mobileMenuOpen ? '-rotate-45 -translate-y-[9px]' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Full-screen Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        id="mobile-menu"
      >
        {/* Background */}
        <div className="absolute inset-0 bg-secondary-950/98 backdrop-blur-xl">
          {/* Industrial grid pattern */}
          <div className="absolute inset-0 industrial-grid opacity-30" />

          {/* Diagonal accent lines */}
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-primary-500/40 via-primary-500/10 to-transparent transform -skew-x-12" />
          <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary-500/20 to-primary-500/40 transform skew-x-12" />
        </div>

        {/* Menu Content */}
        <div className="relative flex flex-col h-full pt-24 pb-8 px-6">
          {/* Navigation Links */}
          <nav className="flex-1 flex flex-col justify-center space-y-2">
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`group flex items-center py-4 px-6 text-2xl font-display uppercase
                           tracking-wider text-secondary-300 hover:text-white
                           border-l-4 border-transparent hover:border-primary-500
                           transition-all duration-300
                           ${mobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}
                style={{
                  transitionDelay: mobileMenuOpen ? `${index * 50 + 100}ms` : '0ms'
                }}
              >
                <span className="w-8 h-px bg-primary-500 mr-4 scale-x-0 group-hover:scale-x-100
                                 transition-transform duration-300 origin-left" />
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Auth */}
          <div className={`transition-all duration-500 ${
            mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
          style={{ transitionDelay: mobileMenuOpen ? '400ms' : '0ms' }}>
            <MobileAuthButtons />
          </div>

          {/* Mobile CTAs */}
          <div
            className={`space-y-4 mt-8 transition-all duration-500 ${
              mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: mobileMenuOpen ? '500ms' : '0ms' }}
          >
            <a
              href="tel:+17152023631"
              className="btn-primary w-full justify-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Now
            </a>
            <Link
              href="/contact"
              className="btn-outline w-full justify-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Request Quote
            </Link>
          </div>

          {/* Contact Info */}
          <div
            className={`mt-8 pt-8 border-t border-secondary-800 text-center transition-all duration-500 ${
              mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: mobileMenuOpen ? '600ms' : '0ms' }}
          >
            <p className="text-secondary-500 text-sm uppercase tracking-wider mb-2">Cadott, Wisconsin</p>
            <p className="text-primary-400 font-semibold">(715) 202-3631</p>
          </div>
        </div>
      </div>
    </header>
  )
}
