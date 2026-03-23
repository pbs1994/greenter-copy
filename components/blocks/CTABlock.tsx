/**
 * CTABlock Component
 * 
 * Renders a call-to-action section with heading, description,
 * and customizable button styling.
 * 
 * @validates Requirements 17.1, 17.2, 17.3
 */
'use client'

import Link from 'next/link'

interface CTABlockProps {
  heading: string
  description?: string | null
  button?: {
    text?: string | null
    url?: string | null
    style?: 'primary' | 'secondary' | null
  } | null
  style?: 'default' | 'highlight' | 'banner' | null
  background_color?: string | null
}

export function CTABlock({
  heading,
  description,
  button,
  style = 'default',
  background_color,
}: CTABlockProps) {
  const sectionStyles = {
    default: 'bg-gray-100',
    highlight: 'bg-green-600 text-white',
    banner: 'bg-gradient-to-r from-green-600 to-green-700 text-white',
  }

  const buttonStyles = {
    primary: style === 'default'
      ? 'bg-green-600 hover:bg-green-700 text-white'
      : 'bg-white hover:bg-gray-100 text-green-600',
    secondary: style === 'default'
      ? 'bg-white hover:bg-gray-100 text-green-600 border border-green-600'
      : 'bg-transparent hover:bg-white/10 text-white border border-white',
  }

  const textColor = style === 'default' ? 'text-gray-900' : 'text-white'
  const descColor = style === 'default' ? 'text-gray-600' : 'text-white/90'

  return (
    <section
      className={`py-16 ${sectionStyles[style || 'default']}`}
      style={background_color ? { backgroundColor: background_color } : undefined}
    >
      <div className="container mx-auto px-4 text-center">
        <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-4 ${textColor}`}>
          {heading}
        </h2>
        
        {description && (
          <p className={`text-lg max-w-2xl mx-auto mb-8 ${descColor}`}>
            {description}
          </p>
        )}
        
        {button?.text && button?.url && (
          <Link
            href={button.url}
            className={`inline-flex px-8 py-4 rounded-lg font-semibold transition-colors ${buttonStyles[button.style || 'primary']}`}
          >
            {button.text}
          </Link>
        )}
      </div>
    </section>
  )
}
