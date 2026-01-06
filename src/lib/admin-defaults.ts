export type HeroSettings = {
  headline: string
  subheadline: string
  description: string
  ctaLabel: string
  ctaHref: string
  phone: string
  background: string
  layout: 'split' | 'overlay'
}

export type LayoutSettings = {
  servicesLayout: 'grid' | 'stacked'
  galleryLayout: 'masonry' | 'grid'
  spacing: 'roomy' | 'compact'
}

export type SeoSettings = {
  title: string
  description: string
}

export type MediaSettings = {
  galleryCover: string
  brandBadge: string
}

export type ServiceCard = {
  id: number
  title: string
  description: string
  image: string
}

export type AboutContent = {
  title: string
  content: string
}

export type ContactInfo = {
  phone: string
  address: string
  city: string
  hours: string
}

export type GalleryItem = {
  id: number
  title: string
  category: string
  url: string
}

export type AdminState = {
  hero: HeroSettings
  layout: LayoutSettings
  seo: SeoSettings
  media: MediaSettings
  services: ServiceCard[]
  about: AboutContent
  contact: ContactInfo
  gallery: GalleryItem[]
}

export const DEFAULT_ADMIN_STATE: AdminState = {
  hero: {
    headline: 'Precision Machining & Mold Repair Excellence',
    subheadline:
      'Wisconsin-based shop for mold repair, CNC machining, and EOAT tooling with quick turnarounds.',
    description:
      'RoweTech Machine & Engineering provides plastic injection mold repair, custom fixtures, EOAT tooling, and CNC machining for manufacturers across Wisconsin.',
    ctaLabel: 'Request a Quote',
    ctaHref: '/contact',
    phone: '(715) 202-3631',
    background: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1200&q=80',
    layout: 'split',
  },
  layout: {
    servicesLayout: 'grid',
    galleryLayout: 'masonry',
    spacing: 'roomy',
  },
  seo: {
    title: 'RoweTech Machine & Engineering',
    description:
      'Precision machining, mold repair, and custom tooling solutions for manufacturers across Wisconsin.',
  },
  media: {
    galleryCover: 'https://images.unsplash.com/photo-1567361808960-dec9cb578182?w=800&q=80',
    brandBadge: 'https://images.unsplash.com/photo-1581092918320-9c8ac0c7846b?w=640&q=80',
  },
  services: [
    {
      id: 1,
      title: 'Plastic Injection Mold Repair',
      description:
        'Emergency and preventative mold repair with fast turnarounds for Wisconsin manufacturers.',
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80',
    },
    {
      id: 2,
      title: 'Custom Fixtures & EOAT',
      description:
        'Precision-engineered workholding fixtures and end-of-arm tooling to keep automation online.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
    },
    {
      id: 3,
      title: 'CNC Machining Services',
      description:
        '3-axis and 5-axis milling, turning, and grinding for prototypes or production runs.',
      image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80',
    },
  ],
  about: {
    title: 'Built on Expertise',
    content:
      'RoweTech Machine & Engineering was founded with a simple mission: provide manufacturers with reliable, high-quality machining and tooling services they can count on.',
  },
  contact: {
    phone: '(715) 202-3631',
    address: '549 Lavorata Rd',
    city: 'Cadott, WI 54727',
    hours: 'Mon-Fri: 7:00 AM - 5:00 PM',
  },
  gallery: [
    {
      id: 1,
      title: 'CNC Milling Operation',
      category: 'CNC Machining',
      url: 'https://images.unsplash.com/photo-1567361808960-dec9cb578182?w=800&q=80',
    },
    {
      id: 2,
      title: 'Laser Cutting',
      category: 'Laser',
      url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    },
    {
      id: 3,
      title: 'Welding & Fabrication',
      category: 'Welding',
      url: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80',
    },
    {
      id: 4,
      title: '3D Printing',
      category: '3D Printing',
      url: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=800&q=80',
    },
  ],
}
