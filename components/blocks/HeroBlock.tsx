/**
 * HeroBlock Component
 * 
 * Renders a hero section with heading, subheading, background image,
 * and optional CTA button.
 * 
 * @validates Requirements 12.3
 */
'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { Media } from '@/payload-types'

interface HeroBlockProps {
  heading: string
  subheading?: string | null
  background_image?: Media | string | null
  cta?: {
    text?: string | null
    url?: string | null
    style?: 'primary' | 'secondary' | null
  } | null
  alignment?: 'left' | 'center' | 'right' | null
  overlay?: boolean | null
}

export function HeroBlock({
  heading,
  subheading,
  background_image,
  cta,
  alignment = 'center',
  overlay = false,
}: HeroBlockProps) {
  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  }

  const buttonStyles = {
    primary: 'bg-green-600 hover:bg-green-700 text-white',
    secondary: 'bg-white hover:bg-gray-100 text-green-600 border border-green-600',
  }

  const imageUrl = typeof background_image === 'object' && background_image?.url
    ? background_image.url
    : typeof background_image === 'string'
      ? background_image
      : null

  return (
    <section className="relative min-h-[400px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      {imageUrl && (
        <Image
          src={imageUrl}
          alt=""
          fill
          className="object-cover"
          priority
        />
      )}
      
      {/* Overlay */}
      {overlay && (
        <div className="absolute inset-0 bg-black/50" />
      )}
      
      {/* Content */}
      <div className={`relative z-10 container mx-auto px-4 py-16 flex flex-col ${alignmentClasses[alignment || 'center']}`}>
        <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 ${imageUrl ? 'text-white' : 'text-gray-900'}`}>
          {heading}
        </h1>
        
        {subheading && (
          <p className={`text-lg md:text-xl max-w-2xl mb-8 ${imageUrl ? 'text-white/90' : 'text-gray-600'}`}>
            {subheading}
          </p>
        )}
        
        {cta?.text && cta?.url && (
          <Link
            href={cta.url}
            className={`inline-flex px-6 py-3 rounded-lg font-semibold transition-colors ${buttonStyles[cta.style || 'primary']}`}
          >
            {cta.text}
          </Link>
        )}
      </div>
    </section>
  )
}
