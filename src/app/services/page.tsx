import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'RoweTech offers plastic injection mold repair, custom fixtures, EOAT manufacturing, and CNC machining services for manufacturers.',
}

const services = [
  {
    id: 'mold-repair',
    title: 'Plastic Injection Mold Repair',
    description:
      'Keep your production running with expert mold repair and maintenance services. We handle everything from minor repairs to major rebuilds.',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80',
    details: [
      'Weld repair and re-machining',
      'Insert replacement and modification',
      'Parting line repair',
      'Gate and runner modifications',
      'Surface polishing and texturing',
      'Preventive maintenance programs',
    ],
    useCases: [
      'Emergency breakdown repairs',
      'Scheduled maintenance shutdowns',
      'Mold modifications for design changes',
      'Wear repair and restoration',
    ],
  },
  {
    id: 'fixtures',
    title: 'Custom Fixtures & Tooling',
    description:
      'Precision-engineered workholding and inspection fixtures designed to improve your manufacturing efficiency and quality.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
    details: [
      'Workholding fixtures for machining',
      'Inspection and gauging fixtures',
      'Assembly fixtures and jigs',
      'Welding fixtures',
      'Custom tooling solutions',
      'Fixture modifications and upgrades',
    ],
    useCases: [
      'New product launches',
      'Quality improvement initiatives',
      'Production efficiency upgrades',
      'Process standardization',
    ],
  },
  {
    id: 'eoat',
    title: 'EOAT Manufacturing',
    description:
      'End-of-Arm Tooling designed and built for your specific robotic automation needs. We work with your integrator or directly with your team.',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80',
    details: [
      'Custom gripper assemblies',
      'Vacuum pickup plates',
      'Tool changer plates and adapters',
      'Part presence sensors mounting',
      'Lightweight aluminum construction',
      'Integration with existing robot systems',
    ],
    useCases: [
      'New automation cell installations',
      'EOAT replacement and upgrades',
      'Multi-part handling solutions',
      'Custom gripper designs',
    ],
  },
  {
    id: 'cnc',
    title: 'CNC Machining Services',
    description:
      'High-precision CNC milling and turning services for prototypes, short runs, and production quantities.',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80',
    details: [
      'CNC milling (3-axis and multi-axis)',
      'CNC turning and lathe work',
      'Surface grinding',
      'EDM services (wire and sinker)',
      'Prototype to production quantities',
      'Various materials: steel, aluminum, plastics',
    ],
    useCases: [
      'Prototype development',
      'Replacement parts',
      'Production machining',
      'One-off specialty parts',
    ],
  },
]

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 2xl:pt-40 2xl:pb-32 3xl:pt-48 3xl:pb-40 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1920&q=80"
            alt="CNC machining"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary-600/90 via-secondary-600/85 to-secondary-600/70"></div>
        </div>
        <div className="absolute inset-0 tech-lines opacity-20"></div>

        <div className="container-custom relative">
          <div className="max-w-3xl 2xl:max-w-4xl 3xl:max-w-5xl">
            <span className="text-primary-400 font-medium tracking-wider uppercase text-sm 2xl:text-base 3xl:text-lg">Our Services</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl 3xl:text-8xl font-bold text-white mt-2 mb-6 2xl:mb-8 3xl:mb-10">
              Comprehensive
              <br />
              <span className="gradient-text">Machining Solutions</span>
            </h1>
            <p className="text-xl 2xl:text-2xl 3xl:text-3xl text-secondary-100 leading-relaxed">
              From mold repair to custom fixtures, we provide the precision machining and tooling
              services manufacturers need to stay productive.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-24 2xl:py-32 3xl:py-40 bg-secondary-100">
        <div className="container-custom">
          <div className="space-y-32 2xl:space-y-40 3xl:space-y-48">
            {services.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                className="scroll-mt-24 3xl:scroll-mt-32"
              >
                <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 2xl:gap-24 3xl:gap-32 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-dense' : ''
                }`}>
                  {/* Image */}
                  <div className={`relative ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    <div className="absolute -inset-4 3xl:-inset-6 bg-gradient-to-r from-primary-500/20 to-transparent rounded-2xl 3xl:rounded-3xl blur-2xl"></div>
                    <div className="relative rounded-2xl 2xl:rounded-3xl 3xl:rounded-[2rem] overflow-hidden border border-secondary-200 shadow-lg">
                      <Image
                        src={service.image}
                        alt={service.title}
                        width={800}
                        height={600}
                        className="w-full h-auto"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-secondary-600 to-transparent p-6 2xl:p-8 3xl:p-10">
                        <span className="text-primary-400 font-medium text-sm 2xl:text-base 3xl:text-lg">Service #{index + 1}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                    <span className="text-primary-500 font-medium tracking-wider uppercase text-sm 2xl:text-base 3xl:text-lg">
                      {service.id.replace('-', ' ')}
                    </span>
                    <h2 className="text-3xl md:text-4xl 2xl:text-5xl 3xl:text-6xl font-bold text-secondary-600 mt-2 mb-4 2xl:mb-6 3xl:mb-8">
                      {service.title}
                    </h2>
                    <p className="text-lg 2xl:text-xl 3xl:text-2xl text-secondary-500 mb-8 3xl:mb-10">{service.description}</p>

                    <div className="mb-8 3xl:mb-10">
                      <h3 className="font-semibold text-secondary-600 mb-4 2xl:text-lg 3xl:text-xl flex items-center">
                        <span className="w-8 3xl:w-10 h-0.5 bg-primary-500 mr-3 3xl:mr-4"></span>
                        What We Offer
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-3 2xl:gap-4 3xl:gap-5">
                        {service.details.map((detail, i) => (
                          <div key={i} className="flex items-center space-x-3 3xl:space-x-4 p-3 2xl:p-4 3xl:p-5 rounded-lg 3xl:rounded-xl bg-white border border-secondary-200 shadow">
                            <div className="w-2 h-2 3xl:w-3 3xl:h-3 bg-primary-500 rounded-full flex-shrink-0"></div>
                            <span className="text-secondary-500 text-sm 2xl:text-base 3xl:text-lg">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-6 2xl:p-8 3xl:p-10 rounded-xl 2xl:rounded-2xl 3xl:rounded-3xl bg-white border border-secondary-200 shadow-lg">
                      <h3 className="font-semibold text-secondary-600 mb-4 2xl:text-lg 3xl:text-xl">Common Use Cases</h3>
                      <ul className="space-y-3 2xl:space-y-4 3xl:space-y-5">
                        {service.useCases.map((useCase, i) => (
                          <li key={i} className="flex items-center space-x-3 3xl:space-x-4">
                            <svg className="w-5 h-5 2xl:w-6 2xl:h-6 3xl:w-7 3xl:h-7 text-primary-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="text-secondary-500 2xl:text-lg 3xl:text-xl">{useCase}</span>
                          </li>
                        ))}
                      </ul>
                      <Link href="/contact" className="btn-primary mt-6 3xl:mt-8 w-full sm:w-auto">
                        Get a Quote
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Don't See What You Need */}
      <section className="py-24 2xl:py-32 3xl:py-40 bg-secondary-50">
        <div className="container-custom">
          <div className="max-w-3xl 2xl:max-w-4xl 3xl:max-w-5xl mx-auto text-center">
            <span className="text-primary-500 font-medium tracking-wider uppercase text-sm 2xl:text-base 3xl:text-lg">Custom Projects</span>
            <h2 className="section-heading mt-2">Don&apos;t See What You Need?</h2>
            <p className="text-secondary-500 text-lg 2xl:text-xl 3xl:text-2xl mb-8 3xl:mb-10">
              We handle a wide variety of machining and tooling projects. If you have a unique
              requirement, reach out and let&apos;s discuss how we can help.
            </p>
            <Link href="/contact" className="btn-primary">
              Contact Us to Discuss Your Project
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
          <h2 className="text-3xl md:text-4xl 2xl:text-5xl 3xl:text-6xl font-bold text-white mb-6 2xl:mb-8 3xl:mb-10">
            Ready to Get Started?
          </h2>
          <p className="text-secondary-200 text-lg 2xl:text-xl 3xl:text-2xl mb-10 3xl:mb-12 max-w-2xl 2xl:max-w-3xl 3xl:max-w-4xl mx-auto">
            Contact us today for a quote. We&apos;ll review your requirements and get back to you
            promptly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 2xl:gap-6 3xl:gap-8 justify-center">
            <Link href="/contact" className="btn-primary text-lg 2xl:text-xl 3xl:text-2xl px-10 py-4 2xl:px-12 2xl:py-5 3xl:px-14 3xl:py-6">
              Request a Quote
            </Link>
            <a href="tel:+17152023631" className="btn-outline text-lg 2xl:text-xl 3xl:text-2xl px-10 py-4 2xl:px-12 2xl:py-5 3xl:px-14 3xl:py-6">
              Call (715) 202-3631
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
