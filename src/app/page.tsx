import Link from 'next/link'
import Image from 'next/image'

const services = [
  {
    title: 'Plastic Injection Mold Repair',
    description: 'Expert repair and maintenance of plastic injection molds to keep your production running smoothly.',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80',
    href: '/services#mold-repair',
  },
  {
    title: 'Custom Fixtures & EOAT',
    description: 'Precision-engineered workholding fixtures and end-of-arm tooling for automation systems.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
    href: '/services#fixtures',
  },
  {
    title: 'CNC Machining Services',
    description: 'High-precision CNC milling and turning for prototypes and production runs.',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80',
    href: '/services#cnc',
  },
  {
    title: 'Fast Turnaround',
    description: 'Wisconsin-based shop offering quick lead times and responsive customer service.',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80',
    href: '/contact',
  },
]

const machineGallery = [
  {
    title: 'CNC Milling',
    description: 'Precision 3-axis and 5-axis CNC milling for complex parts',
    image: 'https://images.unsplash.com/photo-1567361808960-dec9cb578182?w=800&q=80',
  },
  {
    title: 'Laser Cutting',
    description: 'High-precision laser cutting and engraving services',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  },
  {
    title: 'Welding & Fabrication',
    description: 'Professional welding and metal fabrication',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80',
  },
  {
    title: '3D Printing',
    description: 'Rapid prototyping with industrial 3D printing',
    image: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=800&q=80',
  },
  {
    title: 'CNC Turning',
    description: 'Precision lathe work for cylindrical components',
    image: 'https://images.unsplash.com/photo-1567361808960-dec9cb578182?w=800&q=80',
  },
  {
    title: 'Plasma Cutting',
    description: 'Heavy-duty plasma cutting for thick materials',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80',
  },
]

const stats = [
  { value: 'WI', label: 'Based in Wisconsin' },
  { value: 'CNC', label: 'Precision Machining' },
  { value: '24/7', label: 'Quote Requests' },
  { value: 'M-F', label: '7AM - 5PM' },
]

const capabilities = [
  'CNC Milling & Turning',
  'Wire & Sinker EDM',
  'Surface Grinding',
  'Mold Repair & Maintenance',
  'Custom Fixture Design',
  'EOAT Manufacturing',
]

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1920&q=80"
            alt="CNC Machine in operation"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary-950 via-secondary-950/95 to-secondary-950/70"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-secondary-950 via-transparent to-secondary-950/50"></div>
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 tech-lines opacity-30"></div>

        <div className="container-custom relative z-10 pt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-6">
                <span className="w-2 h-2 bg-primary-500 rounded-full mr-2 animate-pulse"></span>
                <span className="text-primary-400 text-sm font-medium">Precision Manufacturing in Wisconsin</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                <span className="text-white">Precision Machining &</span>
                <br />
                <span className="gradient-text">Mold Repair Excellence</span>
              </h1>

              <p className="text-lg md:text-xl text-secondary-300 mb-8 leading-relaxed">
                RoweTech Machine & Engineering provides plastic injection mold repair, custom
                fixtures, EOAT tooling, and CNC machining for manufacturers across Wisconsin.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link href="/contact" className="btn-primary text-lg px-8 py-4">
                  Request a Quote
                  <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
                <a
                  href="tel:+17152023631"
                  className="btn-secondary text-lg px-8 py-4"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  (715) 202-3631
                </a>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center p-4 rounded-lg bg-secondary-900/50 border border-secondary-800">
                    <p className="text-2xl font-bold text-primary-400">{stat.value}</p>
                    <p className="text-xs text-secondary-400 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Image Card */}
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/20 to-primary-600/20 rounded-2xl blur-2xl"></div>
                <div className="relative rounded-2xl overflow-hidden border border-secondary-800 shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80"
                    alt="Precision machining"
                    width={600}
                    height={500}
                    className="w-full h-auto"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-secondary-950 to-transparent p-6">
                    <p className="text-white font-semibold">Precision CNC Machining</p>
                    <p className="text-secondary-400 text-sm">Cadott, Wisconsin</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-secondary-500" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
          </svg>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-secondary-800 relative">
        <div className="absolute inset-0 tech-lines opacity-10"></div>
        <div className="container-custom relative">
          <div className="text-center mb-16">
            <span className="text-primary-400 font-medium tracking-wider uppercase text-sm">What We Do</span>
            <h2 className="section-heading mt-2">Our Services</h2>
            <p className="section-subheading mx-auto">
              Comprehensive machining and tooling solutions for plastic injection molding and
              manufacturing operations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Link key={index} href={service.href} className="group">
                <div className="service-card h-full">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary-900 via-secondary-900/50 to-transparent"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-secondary-400 text-sm">{service.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/services" className="btn-outline">
              View All Services
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-secondary-700 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full">
          <Image
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80"
            alt="Industrial manufacturing"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary-900 to-transparent"></div>
        </div>

        <div className="container-custom relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-primary-400 font-medium tracking-wider uppercase text-sm">Why Choose Us</span>
              <h2 className="section-heading mt-2">Precision You Can Trust</h2>
              <p className="section-subheading mb-8">
                We combine precision machining expertise with responsive customer service to deliver
                quality tooling solutions on time.
              </p>

              <div className="space-y-6">
                {[
                  {
                    title: 'Local Wisconsin Shop',
                    description: 'Quick lead times and easy communication with a shop right here in the Midwest.',
                  },
                  {
                    title: 'Experienced Team',
                    description: 'Deep expertise in plastic injection tooling and precision machining.',
                  },
                  {
                    title: 'Modern CNC Equipment',
                    description: 'State-of-the-art machinery and skilled programming for complex geometries.',
                  },
                  {
                    title: 'Flexible & Responsive',
                    description: 'From prototypes to production runs, we adapt to your needs.',
                  },
                ].map((benefit, index) => (
                  <div key={index} className="feature-highlight">
                    <h3 className="font-semibold text-white mb-1">{benefit.title}</h3>
                    <p className="text-secondary-400 text-sm">{benefit.description}</p>
                  </div>
                ))}
              </div>

              <Link href="/about" className="btn-primary mt-8 inline-flex">
                Learn More About Us
              </Link>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="rounded-xl overflow-hidden border border-secondary-800">
                    <Image
                      src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&q=80"
                      alt="CNC Machine"
                      width={300}
                      height={400}
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="stat-card">
                    <p className="text-3xl font-bold text-primary-400">CNC</p>
                    <p className="text-sm text-secondary-400 mt-1">Precision Machining</p>
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="stat-card">
                    <p className="text-3xl font-bold text-primary-400">24/7</p>
                    <p className="text-sm text-secondary-400 mt-1">Quote Requests</p>
                  </div>
                  <div className="rounded-xl overflow-hidden border border-secondary-800">
                    <Image
                      src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&q=80"
                      alt="Manufacturing"
                      width={300}
                      height={400}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Preview */}
      <section className="py-24 bg-secondary-800 relative">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/10 to-transparent rounded-2xl blur-2xl"></div>
              <div className="relative rounded-2xl overflow-hidden border border-secondary-800">
                <Image
                  src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1200&q=80"
                  alt="CNC Machining capabilities"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <span className="text-primary-400 font-medium tracking-wider uppercase text-sm">Our Capabilities</span>
              <h2 className="section-heading mt-2">Advanced Manufacturing</h2>
              <p className="section-subheading mb-8">
                Equipped with modern CNC machinery and experienced operators to handle your most demanding projects.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {capabilities.map((capability, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-secondary-900/50 border border-secondary-800">
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <span className="text-secondary-300">{capability}</span>
                  </div>
                ))}
              </div>

              <Link href="/capabilities" className="btn-outline">
                View Full Capabilities
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Machine Gallery Section */}
      <section className="py-24 bg-secondary-700">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="text-primary-400 font-medium tracking-wider uppercase text-sm">Our Equipment</span>
            <h2 className="section-heading mt-2">State-of-the-Art Machinery</h2>
            <p className="section-subheading mx-auto">
              From CNC machining to laser cutting and 3D printing, we have the equipment to handle any project.
            </p>
          </div>

          {/* Featured Image */}
          <div className="mb-12">
            <div className="relative rounded-2xl overflow-hidden border border-secondary-600 aspect-video max-w-4xl mx-auto group">
              <Image
                src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=80"
                alt="CNC Precision Machining"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <p className="text-white font-semibold text-lg">Precision Manufacturing</p>
                <p className="text-secondary-300 text-sm">Expert craftsmanship in every project</p>
              </div>
            </div>
          </div>

          {/* Image Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {machineGallery.map((item, index) => (
              <div key={index} className="group relative rounded-xl overflow-hidden border border-secondary-600 aspect-[4/3]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary-900 via-secondary-900/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-semibold">{item.title}</h3>
                  <p className="text-secondary-300 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/gallery" className="btn-outline">
              View Full Gallery
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&q=80"
            alt="Manufacturing background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-secondary-950/90"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-secondary-950/50"></div>
        </div>

        <div className="container-custom relative text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-secondary-300 text-lg mb-10 max-w-2xl mx-auto">
            Contact us today for a quote on mold repair, custom fixtures, EOAT, or CNC machining
            services. Our team is ready to help bring your project to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary text-lg px-10 py-4">
              Request a Quote
            </Link>
            <a
              href="tel:+17152023631"
              className="btn-outline text-lg px-10 py-4"
            >
              Call (715) 202-3631
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
