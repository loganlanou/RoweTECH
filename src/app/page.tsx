import Link from 'next/link'
import Image from 'next/image'
import HeroCarousel from '@/components/HeroCarousel'

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
        {/* Cycling Background Images */}
        <HeroCarousel />

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 tech-lines opacity-30 z-10"></div>

        <div className="container-custom relative z-20 pt-20 2xl:pt-32 3xl:pt-40">
          <div className="grid lg:grid-cols-2 gap-12 2xl:gap-20 3xl:gap-28 items-center">
            <div className="max-w-2xl 2xl:max-w-3xl 3xl:max-w-4xl">
              <div className="inline-flex items-center px-4 py-2 3xl:px-6 3xl:py-3 rounded-full bg-primary-500/10 border border-primary-500/20 mb-6 3xl:mb-8">
                <span className="w-2 h-2 3xl:w-3 3xl:h-3 bg-primary-500 rounded-full mr-2 3xl:mr-3 animate-pulse"></span>
                <span className="text-primary-400 text-sm 3xl:text-base font-medium">Precision Manufacturing in Wisconsin</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl 3xl:text-8xl font-bold leading-tight mb-6 2xl:mb-8 3xl:mb-10">
                <span className="text-white drop-shadow-md">Precision Machining &</span>
                <br />
                <span className="gradient-text drop-shadow-md">Mold Repair Excellence</span>
              </h1>

              <p className="text-lg md:text-xl 2xl:text-2xl 3xl:text-3xl text-secondary-100 mb-8 3xl:mb-12 leading-relaxed">
                RoweTech Machine & Engineering provides plastic injection mold repair, custom
                fixtures, EOAT tooling, and CNC machining for manufacturers across Wisconsin.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 3xl:gap-6 mb-12 3xl:mb-16">
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
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 3xl:gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center p-4 3xl:p-6 rounded-lg 3xl:rounded-xl bg-white/20 backdrop-blur-sm border border-white/30">
                    <p className="text-2xl 3xl:text-3xl font-bold text-primary-400">{stat.value}</p>
                    <p className="text-xs 3xl:text-sm text-secondary-100 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Image Card */}
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute -inset-4 3xl:-inset-6 bg-gradient-to-r from-primary-500/20 to-primary-600/20 rounded-2xl 3xl:rounded-3xl blur-2xl"></div>
                <div className="relative rounded-2xl overflow-hidden border border-white/30 shadow-2xl 2xl:rounded-3xl 3xl:rounded-[2rem]">
                  <Image
                    src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1200&q=80"
                    alt="Precision machining"
                    width={800}
                    height={600}
                    className="w-full h-auto 2xl:min-h-[500px] 3xl:min-h-[600px] object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-secondary-600 to-transparent p-6 3xl:p-8">
                    <p className="text-white font-semibold 3xl:text-lg">Precision CNC Machining</p>
                    <p className="text-secondary-200 text-sm 3xl:text-base">Cadott, Wisconsin</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-20">
          <svg className="w-6 h-6 text-secondary-500" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
          </svg>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 2xl:py-32 3xl:py-40 bg-secondary-100 relative">
        <div className="absolute inset-0 tech-lines opacity-10"></div>
        <div className="container-custom relative">
          <div className="text-center mb-16 2xl:mb-20 3xl:mb-24">
            <span className="text-primary-500 font-medium tracking-wider uppercase text-sm 2xl:text-base 3xl:text-lg">What We Do</span>
            <h2 className="section-heading mt-2">Our Services</h2>
            <p className="section-subheading mx-auto">
              Comprehensive machining and tooling solutions for plastic injection molding and
              manufacturing operations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 2xl:gap-8 3xl:gap-10">
            {services.map((service, index) => (
              <Link key={index} href={service.href} className="group">
                <div className="service-card h-full">
                  <div className="relative h-48 2xl:h-56 3xl:h-64 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary-600/80 via-secondary-600/30 to-transparent"></div>
                  </div>
                  <div className="p-6 2xl:p-8 3xl:p-10">
                    <h3 className="text-lg 2xl:text-xl 3xl:text-2xl font-semibold text-secondary-600 mb-2 3xl:mb-3 group-hover:text-primary-500 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-secondary-400 text-sm 2xl:text-base 3xl:text-lg">{service.description}</p>
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
      <section className="py-24 2xl:py-32 3xl:py-40 bg-secondary-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full">
          <Image
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80"
            alt="Industrial manufacturing"
            fill
            className="object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary-50 to-transparent"></div>
        </div>

        <div className="container-custom relative">
          <div className="grid lg:grid-cols-2 gap-16 2xl:gap-24 3xl:gap-32 items-center">
            <div>
              <span className="text-primary-500 font-medium tracking-wider uppercase text-sm 2xl:text-base 3xl:text-lg">Why Choose Us</span>
              <h2 className="section-heading mt-2">Precision You Can Trust</h2>
              <p className="section-subheading mb-8 3xl:mb-10">
                We combine precision machining expertise with responsive customer service to deliver
                quality tooling solutions on time.
              </p>

              <div className="space-y-6 2xl:space-y-8 3xl:space-y-10">
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
                    <h3 className="font-semibold text-secondary-600 mb-1 2xl:text-lg 3xl:text-xl">{benefit.title}</h3>
                    <p className="text-secondary-400 text-sm 2xl:text-base 3xl:text-lg">{benefit.description}</p>
                  </div>
                ))}
              </div>

              <Link href="/about" className="btn-primary mt-8 3xl:mt-12 inline-flex">
                Learn More About Us
              </Link>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4 2xl:gap-6 3xl:gap-8">
                <div className="space-y-4 2xl:space-y-6 3xl:space-y-8">
                  <div className="rounded-xl 2xl:rounded-2xl 3xl:rounded-3xl overflow-hidden border border-secondary-200 shadow-lg">
                    <Image
                      src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&q=80"
                      alt="CNC Machine"
                      width={300}
                      height={400}
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="stat-card 2xl:p-8 3xl:p-10">
                    <p className="text-3xl 2xl:text-4xl 3xl:text-5xl font-bold text-primary-500">CNC</p>
                    <p className="text-sm 2xl:text-base 3xl:text-lg text-secondary-400 mt-1">Precision Machining</p>
                  </div>
                </div>
                <div className="space-y-4 2xl:space-y-6 3xl:space-y-8 pt-8 3xl:pt-12">
                  <div className="stat-card 2xl:p-8 3xl:p-10">
                    <p className="text-3xl 2xl:text-4xl 3xl:text-5xl font-bold text-primary-500">24/7</p>
                    <p className="text-sm 2xl:text-base 3xl:text-lg text-secondary-400 mt-1">Quote Requests</p>
                  </div>
                  <div className="rounded-xl 2xl:rounded-2xl 3xl:rounded-3xl overflow-hidden border border-secondary-200 shadow-lg">
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
      <section className="py-24 2xl:py-32 3xl:py-40 bg-white relative">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 2xl:gap-24 3xl:gap-32 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="absolute -inset-4 3xl:-inset-6 bg-gradient-to-r from-primary-500/10 to-transparent rounded-2xl 3xl:rounded-3xl blur-2xl"></div>
              <div className="relative rounded-2xl 2xl:rounded-3xl 3xl:rounded-[2rem] overflow-hidden border border-secondary-200 shadow-lg">
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
              <span className="text-primary-500 font-medium tracking-wider uppercase text-sm 2xl:text-base 3xl:text-lg">Our Capabilities</span>
              <h2 className="section-heading mt-2">Advanced Manufacturing</h2>
              <p className="section-subheading mb-8 3xl:mb-10">
                Equipped with modern CNC machinery and experienced operators to handle your most demanding projects.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 2xl:gap-5 3xl:gap-6 mb-8 3xl:mb-10">
                {capabilities.map((capability, index) => (
                  <div key={index} className="flex items-center space-x-3 3xl:space-x-4 p-3 2xl:p-4 3xl:p-5 rounded-lg 3xl:rounded-xl bg-secondary-100 border border-secondary-200">
                    <div className="w-2 h-2 3xl:w-3 3xl:h-3 bg-primary-500 rounded-full"></div>
                    <span className="text-secondary-500 2xl:text-lg 3xl:text-xl">{capability}</span>
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
      <section className="py-24 2xl:py-32 3xl:py-40 bg-secondary-100">
        <div className="container-custom">
          <div className="text-center mb-16 2xl:mb-20 3xl:mb-24">
            <span className="text-primary-500 font-medium tracking-wider uppercase text-sm 2xl:text-base 3xl:text-lg">Our Equipment</span>
            <h2 className="section-heading mt-2">State-of-the-Art Machinery</h2>
            <p className="section-subheading mx-auto">
              From CNC machining to laser cutting and 3D printing, we have the equipment to handle any project.
            </p>
          </div>

          {/* Featured Image */}
          <div className="mb-12 2xl:mb-16 3xl:mb-20">
            <div className="relative rounded-2xl 2xl:rounded-3xl 3xl:rounded-[2rem] overflow-hidden border border-secondary-200 shadow-xl aspect-video max-w-4xl 2xl:max-w-6xl 3xl:max-w-7xl mx-auto group">
              <Image
                src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=80"
                alt="CNC Precision Machining"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary-600/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 2xl:bottom-10 2xl:left-10 3xl:bottom-12 3xl:left-12">
                <p className="text-white font-semibold text-lg 2xl:text-2xl 3xl:text-3xl">Precision Manufacturing</p>
                <p className="text-secondary-200 text-sm 2xl:text-base 3xl:text-lg">Expert craftsmanship in every project</p>
              </div>
            </div>
          </div>

          {/* Image Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 2xl:gap-8 3xl:gap-10">
            {machineGallery.map((item, index) => (
              <div key={index} className="group relative rounded-xl 2xl:rounded-2xl 3xl:rounded-3xl overflow-hidden border border-secondary-200 shadow-lg aspect-[4/3]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary-600/80 via-secondary-600/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 2xl:bottom-6 2xl:left-6 3xl:bottom-8 3xl:left-8">
                  <h3 className="text-white font-semibold 2xl:text-lg 3xl:text-xl">{item.title}</h3>
                  <p className="text-secondary-200 text-sm 2xl:text-base 3xl:text-lg">{item.description}</p>
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
      <section className="py-24 2xl:py-32 3xl:py-40 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&q=80"
            alt="Manufacturing background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-secondary-600/90"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-secondary-600/50"></div>
        </div>

        <div className="container-custom relative text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl 3xl:text-7xl font-bold text-white mb-6 2xl:mb-8 3xl:mb-10">
            Ready to Start Your Project?
          </h2>
          <p className="text-secondary-200 text-lg 2xl:text-xl 3xl:text-2xl mb-10 3xl:mb-12 max-w-2xl 2xl:max-w-3xl 3xl:max-w-4xl mx-auto">
            Contact us today for a quote on mold repair, custom fixtures, EOAT, or CNC machining
            services. Our team is ready to help bring your project to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 2xl:gap-6 3xl:gap-8 justify-center">
            <Link href="/contact" className="btn-primary text-lg 2xl:text-xl 3xl:text-2xl px-10 py-4 2xl:px-12 2xl:py-5 3xl:px-14 3xl:py-6">
              Request a Quote
            </Link>
            <a
              href="tel:+17152023631"
              className="btn-outline text-lg 2xl:text-xl 3xl:text-2xl px-10 py-4 2xl:px-12 2xl:py-5 3xl:px-14 3xl:py-6"
            >
              Call (715) 202-3631
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
