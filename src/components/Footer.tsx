import Link from 'next/link'

const navigation = {
  main: [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Capabilities', href: '/capabilities' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
  ],
  services: [
    { name: 'Mold Repair', href: '/services#mold-repair' },
    { name: 'Custom Fixtures', href: '/services#fixtures' },
    { name: 'EOAT Manufacturing', href: '/services#eoat' },
    { name: 'CNC Machining', href: '/services#cnc' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-secondary-950 border-t border-secondary-800 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 industrial-grid opacity-10" />

      <div className="container-custom py-16 lg:py-20 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-3 group mb-6">
              <div className="relative">
                <div className="w-12 h-12 bg-primary-500 flex items-center justify-center"
                     style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))' }}>
                  <span className="text-white font-bold text-xl font-display">RT</span>
                </div>
                <div className="absolute inset-0 bg-primary-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
              </div>
              <div>
                <span className="font-display text-lg font-bold text-white uppercase tracking-wider">RoweTech</span>
                <span className="block text-xs text-primary-400 font-medium tracking-[0.2em] uppercase">Machine & Engineering</span>
              </div>
            </Link>
            <p className="text-secondary-400 text-sm leading-relaxed mb-6">
              Precision machining, mold repair, and custom tooling solutions for manufacturers across Wisconsin.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-sm font-semibold text-white uppercase tracking-wider mb-6 flex items-center">
              <span className="w-8 h-px bg-primary-500 mr-3" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-secondary-400 hover:text-primary-400 transition-colors duration-200 text-sm flex items-center group"
                  >
                    <span className="w-0 h-px bg-primary-500 mr-0 group-hover:w-4 group-hover:mr-3 transition-all duration-200" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display text-sm font-semibold text-white uppercase tracking-wider mb-6 flex items-center">
              <span className="w-8 h-px bg-primary-500 mr-3" />
              Services
            </h3>
            <ul className="space-y-3">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-secondary-400 hover:text-primary-400 transition-colors duration-200 text-sm flex items-center group"
                  >
                    <span className="w-0 h-px bg-primary-500 mr-0 group-hover:w-4 group-hover:mr-3 transition-all duration-200" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display text-sm font-semibold text-white uppercase tracking-wider mb-6 flex items-center">
              <span className="w-8 h-px bg-primary-500 mr-3" />
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-secondary-900 border border-secondary-800 flex items-center justify-center text-primary-500 flex-shrink-0"
                     style={{ clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))' }}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">Address</p>
                  <p className="text-secondary-400 text-sm">549 Lavorata Rd<br />Cadott, WI 54727</p>
                </div>
              </li>
              <li>
                <a href="tel:+17152023631" className="flex items-start space-x-3 group">
                  <div className="w-10 h-10 bg-secondary-900 border border-secondary-800 flex items-center justify-center text-primary-500 flex-shrink-0 group-hover:border-primary-500/50 transition-colors"
                       style={{ clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))' }}>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">Phone</p>
                    <p className="text-secondary-400 text-sm group-hover:text-primary-400 transition-colors">(715) 202-3631</p>
                  </div>
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-secondary-900 border border-secondary-800 flex items-center justify-center text-primary-500 flex-shrink-0"
                     style={{ clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))' }}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">Hours</p>
                  <p className="text-secondary-400 text-sm">Mon-Fri: 7AM - 5PM</p>
                </div>
              </li>
            </ul>
            <Link href="/contact" className="btn-primary mt-6 text-sm w-full justify-center">
              Request a Quote
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-secondary-500 text-sm">
              &copy; {new Date().getFullYear()} RoweTech Machine & Engineering. All rights reserved.
            </p>
            <div className="flex items-center space-x-3">
              <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
              <span className="text-secondary-500 text-sm uppercase tracking-wider">Wisconsin Precision Manufacturing</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
