import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about RoweTech Machine & Engineering - a Wisconsin-based precision machining and mold repair shop serving manufacturers across the Midwest.',
}

const values = [
  {
    title: 'Quality Workmanship',
    description: 'Every part we produce meets exacting standards. We take pride in precision.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
  },
  {
    title: 'Honest Communication',
    description: 'Clear timelines, upfront pricing, and no surprises. We keep you informed.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
  },
  {
    title: 'Customer Focus',
    description: 'Your success is our success. We work as an extension of your team.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    title: 'Continuous Improvement',
    description: 'We invest in our capabilities to better serve your evolving needs.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
  },
]

const industries = [
  {
    title: 'Plastic Injection Molding',
    description: 'Mold repair and maintenance for injection molding operations.',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&q=80',
  },
  {
    title: 'Automation & Robotics',
    description: 'Custom EOAT and fixtures for automated production lines.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80',
  },
  {
    title: 'OEM Manufacturing',
    description: 'Precision parts and tooling for original equipment manufacturers.',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80',
  },
  {
    title: 'Local Manufacturers',
    description: 'Quick-turn machining services for Wisconsin businesses.',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&q=80',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 2xl:pt-40 2xl:pb-32 3xl:pt-48 3xl:pb-40 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1920&q=80"
            alt="Machine shop"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary-600/90 via-secondary-600/85 to-secondary-600/70"></div>
        </div>
        <div className="absolute inset-0 tech-lines opacity-20"></div>

        <div className="container-custom relative">
          <div className="max-w-3xl 2xl:max-w-4xl 3xl:max-w-5xl">
            <span className="text-primary-400 font-medium tracking-wider uppercase text-sm 2xl:text-base 3xl:text-lg">About Us</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl 3xl:text-8xl font-bold text-white mt-2 mb-6 2xl:mb-8 3xl:mb-10">
              Precision Engineering,
              <br />
              <span className="gradient-text">Wisconsin Roots</span>
            </h1>
            <p className="text-xl 2xl:text-2xl 3xl:text-3xl text-secondary-100 leading-relaxed">
              A Wisconsin-based machine shop dedicated to quality, precision, and customer success.
              We bring decades of combined experience to every project.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 2xl:py-32 3xl:py-40 bg-secondary-100">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 2xl:gap-24 3xl:gap-32 items-center">
            <div>
              <span className="text-primary-500 font-medium tracking-wider uppercase text-sm 2xl:text-base 3xl:text-lg">Our Story</span>
              <h2 className="section-heading mt-2">Built on Expertise</h2>
              <div className="space-y-4 2xl:space-y-6 3xl:space-y-8 text-secondary-500 leading-relaxed 2xl:text-lg 3xl:text-xl">
                <p>
                  RoweTech Machine & Engineering was founded with a simple mission: provide
                  manufacturers with reliable, high-quality machining and tooling services they can
                  count on.
                </p>
                <p>
                  Based in Cadott, Wisconsin, we serve plastic injection molding companies,
                  automation integrators, and OEM manufacturers throughout the Midwest. Our location
                  allows us to offer quick turnaround times and hands-on service that larger, more
                  distant shops simply can&apos;t match.
                </p>
                <p>
                  Whether you need emergency mold repairs, custom fixtures for a new production
                  line, or precision CNC parts, our experienced team is ready to help. We treat
                  every project with the same attention to detail, regardless of size.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 3xl:-inset-6 bg-gradient-to-r from-primary-500/20 to-transparent rounded-2xl 3xl:rounded-3xl blur-2xl"></div>
              <div className="relative grid grid-cols-2 gap-4 2xl:gap-6 3xl:gap-8">
                <div className="space-y-4 2xl:space-y-6 3xl:space-y-8">
                  <div className="rounded-xl 2xl:rounded-2xl 3xl:rounded-3xl overflow-hidden border border-secondary-200 shadow-lg">
                    <Image
                      src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&q=80"
                      alt="CNC machining"
                      width={300}
                      height={350}
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="card-dark text-center 2xl:p-8 3xl:p-10">
                    <div className="w-12 h-12 2xl:w-14 2xl:h-14 3xl:w-16 3xl:h-16 bg-primary-500/20 rounded-xl 3xl:rounded-2xl flex items-center justify-center text-primary-400 mx-auto mb-3 3xl:mb-4">
                      <svg className="w-6 h-6 2xl:w-7 2xl:h-7 3xl:w-8 3xl:h-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    </div>
                    <p className="font-semibold text-white 2xl:text-lg 3xl:text-xl">Location</p>
                    <p className="text-secondary-400 text-sm 2xl:text-base 3xl:text-lg">Cadott, Wisconsin</p>
                  </div>
                </div>
                <div className="space-y-4 2xl:space-y-6 3xl:space-y-8 pt-8 3xl:pt-12">
                  <div className="card-dark text-center 2xl:p-8 3xl:p-10">
                    <div className="w-12 h-12 2xl:w-14 2xl:h-14 3xl:w-16 3xl:h-16 bg-primary-500/20 rounded-xl 3xl:rounded-2xl flex items-center justify-center text-primary-400 mx-auto mb-3 3xl:mb-4">
                      <svg className="w-6 h-6 2xl:w-7 2xl:h-7 3xl:w-8 3xl:h-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                      </svg>
                    </div>
                    <p className="font-semibold text-white 2xl:text-lg 3xl:text-xl">Specialization</p>
                    <p className="text-secondary-400 text-sm 2xl:text-base 3xl:text-lg">Mold Repair & CNC</p>
                  </div>
                  <div className="rounded-xl 2xl:rounded-2xl 3xl:rounded-3xl overflow-hidden border border-secondary-200 shadow-lg">
                    <Image
                      src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&q=80"
                      alt="Manufacturing"
                      width={300}
                      height={350}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 2xl:py-32 3xl:py-40 bg-secondary-50">
        <div className="container-custom">
          <div className="text-center mb-16 2xl:mb-20 3xl:mb-24">
            <span className="text-primary-400 font-medium tracking-wider uppercase text-sm 2xl:text-base 3xl:text-lg">Our Values</span>
            <h2 className="section-heading mt-2">What Drives Us</h2>
            <p className="section-subheading mx-auto">
              The principles that guide how we work and serve our customers.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 2xl:gap-8 3xl:gap-10">
            {values.map((value, index) => (
              <div key={index} className="card group 2xl:p-8 3xl:p-10">
                <div className="w-14 h-14 2xl:w-16 2xl:h-16 3xl:w-20 3xl:h-20 bg-primary-500/10 border border-primary-500/20 rounded-xl 3xl:rounded-2xl flex items-center justify-center text-primary-400 mb-4 3xl:mb-6 group-hover:bg-primary-500/20 transition-colors">
                  {value.icon}
                </div>
                <h3 className="text-lg 2xl:text-xl 3xl:text-2xl font-semibold text-secondary-600 mb-2 3xl:mb-3">{value.title}</h3>
                <p className="text-secondary-400 text-sm 2xl:text-base 3xl:text-lg">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-24 2xl:py-32 3xl:py-40 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16 2xl:mb-20 3xl:mb-24">
            <span className="text-primary-500 font-medium tracking-wider uppercase text-sm 2xl:text-base 3xl:text-lg">Industries</span>
            <h2 className="section-heading mt-2">Who We Serve</h2>
            <p className="section-subheading mx-auto">
              We work with manufacturers and molders across various sectors.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 2xl:gap-8 3xl:gap-10">
            {industries.map((industry, index) => (
              <div key={index} className="service-card group">
                <div className="relative h-48 2xl:h-56 3xl:h-64 overflow-hidden">
                  <Image
                    src={industry.image}
                    alt={industry.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary-600/80 via-secondary-600/30 to-transparent"></div>
                </div>
                <div className="p-6 2xl:p-8 3xl:p-10">
                  <h3 className="text-lg 2xl:text-xl 3xl:text-2xl font-semibold text-secondary-600 mb-2 3xl:mb-3 group-hover:text-primary-500 transition-colors">
                    {industry.title}
                  </h3>
                  <p className="text-secondary-400 text-sm 2xl:text-base 3xl:text-lg">{industry.description}</p>
                </div>
              </div>
            ))}
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
          <h2 className="text-3xl md:text-4xl 2xl:text-5xl 3xl:text-6xl font-bold text-white mb-6 2xl:mb-8 3xl:mb-10">
            Let&apos;s Work Together
          </h2>
          <p className="text-secondary-200 text-lg 2xl:text-xl 3xl:text-2xl mb-10 3xl:mb-12 max-w-2xl 2xl:max-w-3xl 3xl:max-w-4xl mx-auto">
            Ready to discuss your project? Contact us for a quote or to learn more about our
            capabilities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 2xl:gap-6 3xl:gap-8 justify-center">
            <Link href="/contact" className="btn-primary text-lg 2xl:text-xl 3xl:text-2xl px-10 py-4 2xl:px-12 2xl:py-5 3xl:px-14 3xl:py-6">
              Request a Quote
            </Link>
            <Link href="/capabilities" className="btn-outline text-lg 2xl:text-xl 3xl:text-2xl px-10 py-4 2xl:px-12 2xl:py-5 3xl:px-14 3xl:py-6">
              View Our Capabilities
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
