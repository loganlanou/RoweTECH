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
    <footer className="bg-secondary-950 border-t border-secondary-800">
      <div className="container-custom py-16 lg:py-20 3xl:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 3xl:gap-16">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-3 3xl:space-x-4 group mb-6 3xl:mb-8">
              <div className="relative">
                <div className="w-12 h-12 3xl:w-14 3xl:h-14 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg 3xl:rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl 3xl:text-2xl">RT</span>
                </div>
                <div className="absolute inset-0 bg-primary-500 rounded-lg 3xl:rounded-xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity"></div>
              </div>
              <div>
                <span className="text-lg 3xl:text-xl font-bold text-white">RoweTech</span>
                <span className="block text-xs 3xl:text-sm text-primary-400 font-medium tracking-wider uppercase">Machine & Engineering</span>
              </div>
            </Link>
            <p className="text-secondary-400 text-sm 3xl:text-base leading-relaxed mb-6 3xl:mb-8">
              Precision machining, mold repair, and custom tooling solutions for manufacturers across Wisconsin.
            </p>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-lg bg-secondary-900 border border-secondary-800 flex items-center justify-center text-secondary-400 hover:text-primary-400 hover:border-primary-500/50 transition-colors cursor-pointer">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm 3xl:text-base font-semibold text-white uppercase tracking-wider mb-6 3xl:mb-8">Quick Links</h3>
            <ul className="space-y-3 3xl:space-y-4">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-secondary-400 hover:text-primary-400 transition-colors duration-200 text-sm 3xl:text-base flex items-center group"
                  >
                    <span className="w-0 h-0.5 bg-primary-500 mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-200"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm 3xl:text-base font-semibold text-white uppercase tracking-wider mb-6 3xl:mb-8">Services</h3>
            <ul className="space-y-3 3xl:space-y-4">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-secondary-400 hover:text-primary-400 transition-colors duration-200 text-sm 3xl:text-base flex items-center group"
                  >
                    <span className="w-0 h-0.5 bg-primary-500 mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-200"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm 3xl:text-base font-semibold text-white uppercase tracking-wider mb-6 3xl:mb-8">Contact Us</h3>
            <ul className="space-y-4 3xl:space-y-5">
              <li className="flex items-start space-x-3 3xl:space-x-4">
                <div className="w-10 h-10 3xl:w-12 3xl:h-12 rounded-lg 3xl:rounded-xl bg-secondary-900 border border-secondary-800 flex items-center justify-center text-primary-400 flex-shrink-0">
                  <svg className="w-5 h-5 3xl:w-6 3xl:h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white text-sm 3xl:text-base font-medium">Address</p>
                  <p className="text-secondary-400 text-sm 3xl:text-base">549 Lavorata Rd<br />Cadott, WI 54727</p>
                </div>
              </li>
              <li>
                <a
                  href="tel:+17152023631"
                  className="flex items-start space-x-3 3xl:space-x-4 group"
                >
                  <div className="w-10 h-10 3xl:w-12 3xl:h-12 rounded-lg 3xl:rounded-xl bg-secondary-900 border border-secondary-800 flex items-center justify-center text-primary-400 flex-shrink-0 group-hover:border-primary-500/50 transition-colors">
                    <svg className="w-5 h-5 3xl:w-6 3xl:h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white text-sm 3xl:text-base font-medium">Phone</p>
                    <p className="text-secondary-400 text-sm 3xl:text-base group-hover:text-primary-400 transition-colors">(715) 202-3631</p>
                  </div>
                </a>
              </li>
              <li className="flex items-start space-x-3 3xl:space-x-4">
                <div className="w-10 h-10 3xl:w-12 3xl:h-12 rounded-lg 3xl:rounded-xl bg-secondary-900 border border-secondary-800 flex items-center justify-center text-primary-400 flex-shrink-0">
                  <svg className="w-5 h-5 3xl:w-6 3xl:h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white text-sm 3xl:text-base font-medium">Hours</p>
                  <p className="text-secondary-400 text-sm 3xl:text-base">Mon-Fri: 7:00 AM - 5:00 PM<br />Sat-Sun: Closed</p>
                </div>
              </li>
            </ul>
            <Link href="/contact" className="btn-primary mt-6 3xl:mt-8 text-sm 3xl:text-base w-full justify-center">
              Request a Quote
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary-800 mt-12 3xl:mt-16 pt-8 3xl:pt-10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-secondary-500 text-sm 3xl:text-base">
              &copy; {new Date().getFullYear()} RoweTech Machine & Engineering. All rights reserved.
            </p>
            <div className="flex items-center space-x-2 3xl:space-x-3">
              <span className="w-2 h-2 3xl:w-3 3xl:h-3 bg-primary-500 rounded-full animate-pulse"></span>
              <span className="text-secondary-500 text-sm 3xl:text-base">Precision Manufacturing in Wisconsin</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
