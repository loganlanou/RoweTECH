'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const carouselImages = [
  {
    src: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1920&q=80',
    alt: 'CNC Machine in operation',
    title: 'CNC Machining',
  },
  {
    src: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1920&q=80',
    alt: 'Industrial metalworking',
    title: 'Precision Metalwork',
  },
  {
    src: 'https://images.unsplash.com/photo-1567361808960-dec9cb578182?w=1920&q=80',
    alt: 'CNC Milling machine',
    title: 'CNC Milling',
  },
  {
    src: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=80',
    alt: 'Metal grinding with sparks',
    title: 'Metal Fabrication',
  },
  {
    src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80',
    alt: 'Laser cutting machine',
    title: 'Laser Cutting',
  },
]

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % carouselImages.length)
        setIsTransitioning(false)
      }, 500)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0">
      {carouselImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex
              ? isTransitioning
                ? 'opacity-0'
                : 'opacity-100'
              : 'opacity-0'
          }`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            priority={index === 0}
          />
        </div>
      ))}

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-secondary-950 via-secondary-950/95 to-secondary-950/70"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-secondary-950 via-transparent to-secondary-950/50"></div>

      {/* Carousel indicators */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsTransitioning(true)
              setTimeout(() => {
                setCurrentIndex(index)
                setIsTransitioning(false)
              }, 300)
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-primary-500 w-8'
                : 'bg-secondary-600 hover:bg-secondary-500'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Current image label */}
      <div className="absolute bottom-36 left-1/2 -translate-x-1/2 z-20">
        <span className="text-secondary-400 text-sm font-medium tracking-wider uppercase">
          {carouselImages[currentIndex].title}
        </span>
      </div>
    </div>
  )
}
