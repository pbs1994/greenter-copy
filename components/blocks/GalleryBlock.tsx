/**
 * GalleryBlock Component
 * 
 * Renders an image gallery with responsive grid layout,
 * lightbox support, and optional captions.
 * 
 * @validates Requirements 15.1, 15.2
 */
'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Media } from '@/payload-types'

interface GalleryImage {
  image: Media | string
  caption?: string | null
}

interface GalleryBlockProps {
  title?: string | null
  columns?: '2' | '3' | '4' | null
  lightbox?: boolean | null
  auto_populate?: boolean | null
  images?: GalleryImage[] | null
  // Product gallery passed from parent when auto_populate is true
  productGallery?: Array<Media | string> | null
}

export function GalleryBlock({
  title,
  columns = '3',
  lightbox = true,
  auto_populate = true,
  images,
  productGallery,
}: GalleryBlockProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  // Use product gallery if auto-populate is enabled, otherwise use manual images
  const displayImages: GalleryImage[] = auto_populate && productGallery
    ? productGallery.map(img => ({ image: img }))
    : images || []

  if (displayImages.length === 0) {
    return null
  }

  const columnClasses = {
    '2': 'grid-cols-1 sm:grid-cols-2',
    '3': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    '4': 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
  }

  const getImageUrl = (img: Media | string): string | null => {
    if (typeof img === 'string') return img
    return img?.url || null
  }

  const getImageAlt = (img: Media | string, index: number): string => {
    if (typeof img === 'object' && img?.alt) return img.alt
    return `Image ${index + 1}`
  }

  const handlePrev = () => {
    if (lightboxIndex === null) return
    setLightboxIndex(lightboxIndex === 0 ? displayImages.length - 1 : lightboxIndex - 1)
  }

  const handleNext = () => {
    if (lightboxIndex === null) return
    setLightboxIndex(lightboxIndex === displayImages.length - 1 ? 0 : lightboxIndex + 1)
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {title && (
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
            {title}
          </h2>
        )}
        
        <div className={`grid gap-4 ${columnClasses[columns || '3']}`}>
          {displayImages.map((item, index) => {
            const imageUrl = getImageUrl(item.image)
            if (!imageUrl) return null

            return (
              <div key={index} className="relative group">
                <button
                  onClick={() => lightbox && setLightboxIndex(index)}
                  className={`relative aspect-square w-full overflow-hidden rounded-lg ${lightbox ? 'cursor-zoom-in' : ''}`}
                  disabled={!lightbox}
                >
                  <Image
                    src={imageUrl}
                    alt={getImageAlt(item.image, index)}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </button>
                {item.caption && (
                  <p className="mt-2 text-sm text-gray-600 text-center">{item.caption}</p>
                )}
              </div>
            )
          })}
        </div>

        {/* Lightbox */}
        {lightbox && lightboxIndex !== null && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
              aria-label="Fermer"
            >
              <X className="w-8 h-8" />
            </button>
            
            <button
              onClick={handlePrev}
              className="absolute left-4 text-white hover:text-gray-300 transition-colors"
              aria-label="Image pr�c�dente"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>
            
            <button
              onClick={handleNext}
              className="absolute right-4 text-white hover:text-gray-300 transition-colors"
              aria-label="Image suivante"
            >
              <ChevronRight className="w-10 h-10" />
            </button>
            
            <div className="relative w-full max-w-4xl h-[80vh] mx-4">
              {(() => {
                const currentImage = displayImages[lightboxIndex]
                const imageUrl = getImageUrl(currentImage.image)
                if (!imageUrl) return null
                
                return (
                  <Image
                    src={imageUrl}
                    alt={getImageAlt(currentImage.image, lightboxIndex)}
                    fill
                    className="object-contain"
                  />
                )
              })()}
            </div>
            
            {displayImages[lightboxIndex]?.caption && (
              <p className="absolute bottom-4 left-0 right-0 text-center text-white">
                {displayImages[lightboxIndex].caption}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
