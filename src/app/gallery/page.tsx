import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'View examples of our work including custom fixtures, mold repairs, EOAT assemblies, and precision machined parts.',
}

const galleryItems = [
  {
    id: 1,
    title: 'CNC Milling Operation',
    category: 'CNC Machining',
    description: 'Precision 5-axis CNC milling for complex geometries',
    image: 'https://images.unsplash.com/photo-1567361808960-dec9cb578182?w=800&q=80',
  },
  {
    id: 2,
    title: 'Laser Cutting',
    category: 'Laser',
    description: 'High-precision laser cutting and engraving',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  },
  {
    id: 3,
    title: 'Welding & Fabrication',
    category: 'Welding',
    description: 'Professional TIG and MIG welding services',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80',
  },
  {
    id: 4,
    title: '3D Printing',
    category: '3D Printing',
    description: 'Rapid prototyping with industrial FDM and SLA',
    image: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=800&q=80',
  },
  {
    id: 5,
    title: 'CNC Lathe Work',
    category: 'CNC Machining',
    description: 'Precision turning for cylindrical components',
    image: 'https://images.unsplash.com/photo-1567361808960-dec9cb578182?w=800&q=80',
  },
  {
    id: 6,
    title: 'Plasma Cutting',
    category: 'Plasma',
    description: 'Heavy-duty plasma cutting for thick materials',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80',
  },
  {
    id: 7,
    title: 'Metal Fabrication',
    category: 'Welding',
    description: 'Custom metal fabrication and assembly',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80',
  },
  {
    id: 8,
    title: 'Industrial Automation',
    category: 'EOAT',
    description: 'End-of-arm tooling for robotics',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
  },
  {
    id: 9,
    title: 'Precision Grinding',
    category: 'CNC Machining',
    description: 'Surface grinding to tight tolerances',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80',
  },
  {
    id: 10,
    title: 'Mold Components',
    category: 'Mold Repair',
    description: 'Precision mold inserts and components',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80',
  },
  {
    id: 11,
    title: 'Laser Engraving',
    category: 'Laser',
    description: 'Detailed marking and engraving services',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  },
  {
    id: 12,
    title: 'Prototyping',
    category: '3D Printing',
    description: 'Fast turnaround prototype development',
    image: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=800&q=80',
  },
]

const featuredImages = [
  {
    title: 'Metal Grinding in Action',
    description: 'Precision metalwork with sparks flying',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=80',
  },
  {
    title: 'Industrial CNC Machining',
    description: 'State-of-the-art precision equipment',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1920&q=80',
  },
]

const categories = ['All', 'CNC Machining', 'Laser', 'Welding', 'Plasma', '3D Printing', 'EOAT', 'Mold Repair']

export default function GalleryPage() {
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
            <span className="text-primary-400 font-medium tracking-wider uppercase text-sm 2xl:text-base 3xl:text-lg">Gallery</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl 3xl:text-8xl font-bold text-white mt-2 mb-6 2xl:mb-8 3xl:mb-10">
              Our Work &
              <br />
              <span className="gradient-text">Equipment</span>
            </h1>
            <p className="text-xl 2xl:text-2xl 3xl:text-3xl text-secondary-100 leading-relaxed">
              Explore our state-of-the-art machinery and examples of precision work we deliver to our customers.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-16 2xl:py-24 3xl:py-32 bg-secondary-100">
        <div className="container-custom">
          <div className="text-center mb-12 2xl:mb-16 3xl:mb-20">
            <span className="text-primary-500 font-medium tracking-wider uppercase text-sm 2xl:text-base 3xl:text-lg">Featured</span>
            <h2 className="section-heading mt-2">Machines in Action</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 2xl:gap-12 3xl:gap-16">
            {featuredImages.map((item, index) => (
              <div key={index} className="group relative rounded-2xl 2xl:rounded-3xl 3xl:rounded-[2rem] overflow-hidden border border-secondary-200 shadow-lg aspect-video">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary-600/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 2xl:bottom-8 2xl:left-8 3xl:bottom-10 3xl:left-10">
                  <p className="text-white font-semibold text-lg 2xl:text-xl 3xl:text-2xl">{item.title}</p>
                  <p className="text-secondary-200 text-sm 2xl:text-base 3xl:text-lg">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 2xl:py-10 3xl:py-12 bg-secondary-50 border-b border-secondary-200">
        <div className="container-custom">
          <div className="flex flex-wrap gap-2 2xl:gap-3 3xl:gap-4">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 2xl:px-5 2xl:py-2.5 3xl:px-6 3xl:py-3 rounded-full text-sm 2xl:text-base 3xl:text-lg font-medium transition-colors duration-200 ${
                  category === 'All'
                    ? 'bg-primary-500 text-white'
                    : 'bg-white text-secondary-500 hover:bg-secondary-100 border border-secondary-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 lg:py-24 2xl:py-32 3xl:py-40 bg-white">
        <div className="container-custom">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 gap-6 2xl:gap-8 3xl:gap-10">
            {galleryItems.map((item) => (
              <div
                key={item.id}
                className="group rounded-xl 2xl:rounded-2xl 3xl:rounded-3xl overflow-hidden border border-secondary-200 hover:border-primary-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/10"
              >
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary-600/80 via-secondary-600/20 to-transparent"></div>
                  <div className="absolute top-3 left-3 2xl:top-4 2xl:left-4 3xl:top-5 3xl:left-5">
                    <span className="bg-primary-500 text-white text-xs 2xl:text-sm 3xl:text-base font-medium px-2 py-1 2xl:px-3 2xl:py-1.5 3xl:px-4 3xl:py-2 rounded 3xl:rounded-lg">
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="p-4 2xl:p-6 3xl:p-8 bg-white">
                  <h3 className="font-semibold text-secondary-600 mb-1 2xl:text-lg 3xl:text-xl group-hover:text-primary-500 transition-colors">{item.title}</h3>
                  <p className="text-secondary-400 text-sm 2xl:text-base 3xl:text-lg">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 2xl:py-24 3xl:py-32 relative overflow-hidden">
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
          <h2 className="text-3xl md:text-4xl 2xl:text-5xl 3xl:text-6xl font-bold text-white mb-4 2xl:mb-6 3xl:mb-8">
            Ready to Start Your Project?
          </h2>
          <p className="text-secondary-200 text-lg 2xl:text-xl 3xl:text-2xl mb-8 3xl:mb-10 max-w-2xl 2xl:max-w-3xl 3xl:max-w-4xl mx-auto">
            Let us put our capabilities to work for you. Contact us today to discuss your tooling or
            machining needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 2xl:gap-6 3xl:gap-8 justify-center">
            <Link href="/contact" className="btn-primary">
              Request a Quote
            </Link>
            <a href="tel:+17152023631" className="btn-outline">
              Call (715) 202-3631
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
