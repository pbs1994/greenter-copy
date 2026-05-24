'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Truck, Wrench } from 'lucide-react'

interface ProductGalleryProps {
  images: string[]
  productName: string
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  if (images.length === 0) {
    return (
      <div className="relative aspect-square bg-gradient-to-b from-green-50/80 via-white to-white rounded-2xl flex items-center justify-center ring-1 ring-green-100/50">
        <div className="w-32 h-32 bg-green-100 rounded-xl flex items-center justify-center">
          <Truck className="w-12 h-12 text-green-400" />
        </div>
      </div>
    )
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const handleScroll = () => {
    if (!scrollRef.current) return
    const scrollLeft = scrollRef.current.scrollLeft
    const width = scrollRef.current.offsetWidth
    const newIndex = Math.round(scrollLeft / width)
    if (newIndex !== activeIndex && newIndex >= 0 && newIndex < images.length) {
      setActiveIndex(newIndex)
    }
  }

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="relative aspect-square bg-gradient-to-b from-green-50/80 via-white to-white rounded-2xl overflow-hidden ring-1 ring-green-100/50">
        {/* Decorative blurs */}
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-green-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-teal-200/20 rounded-full blur-3xl" />

        {/* Desktop: static image */}
        <div className="hidden md:flex items-center justify-center h-full p-8 relative">
          <Image
            src={images[activeIndex]}
            alt={`${productName} - photo ${activeIndex + 1}`}
            width={500}
            height={500}
            className="object-contain max-h-full drop-shadow-lg"
            priority={activeIndex === 0}
          />
        </div>

        {/* Mobile: swipe carousel */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="md:hidden flex overflow-x-auto snap-x snap-mandatory scrollbar-hide h-full"
          style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
        >
          {images.map((src, i) => (
            <div key={i} className="flex-shrink-0 w-full h-full snap-center flex items-center justify-center p-8">
              <Image
                src={src}
                alt={`${productName} - photo ${i + 1}`}
                width={400}
                height={400}
                className="object-contain max-h-full"
                priority={i === 0}
              />
            </div>
          ))}
        </div>

        {/* Navigation arrows (desktop only, multiple images) */}
        {images.length > 1 && (
          <div className="hidden md:block">
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full shadow-md flex items-center justify-center transition-colors"
              aria-label="Image précédente"
            >
              <ChevronLeft className="w-5 h-5 text-neutral-700" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full shadow-md flex items-center justify-center transition-colors"
              aria-label="Image suivante"
            >
              <ChevronRight className="w-5 h-5 text-neutral-700" />
            </button>
          </div>
        )}

        {/* Mobile dots */}
        {images.length > 1 && (
          <div className="md:hidden absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === activeIndex ? 'bg-green-600' : 'bg-neutral-300'
                }`}
              />
            ))}
          </div>
        )}

        {/* Badges */}
        <div className="absolute bottom-3 left-3 right-3 md:bottom-4 md:left-4 flex gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-600/90 text-white text-xs font-medium rounded-full backdrop-blur-sm">
            <Truck className="w-3 h-3" />
            Livraison offerte
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-teal-600/90 text-white text-xs font-medium rounded-full backdrop-blur-sm">
            <Wrench className="w-3 h-3" />
            Installation incluse
          </span>
        </div>
      </div>

      {/* Thumbnails (desktop only, multiple images) */}
      {images.length > 1 && (
        <div className="hidden md:flex gap-2">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-16 h-16 rounded-lg overflow-hidden ring-2 transition-all ${
                i === activeIndex
                  ? 'ring-green-500 shadow-md'
                  : 'ring-transparent hover:ring-green-200'
              }`}
            >
              <Image
                src={src}
                alt={`Miniature ${i + 1}`}
                width={64}
                height={64}
                className="object-cover w-full h-full"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
