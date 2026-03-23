/**
 * FAQBlock Component
 * 
 * Renders FAQ items in an accordion format with expandable/collapsible
 * questions. Generates JSON-LD FAQPage structured data for SEO.
 * 
 * @validates Requirements 14.1, 14.4
 */
'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { RichTextRenderer } from './RichTextBlock'

interface FAQItem {
  question: string
  answer?: unknown // Lexical rich text content
}

interface FAQBlockProps {
  title?: string | null
  auto_populate?: boolean | null
  items?: FAQItem[] | null
  // Product FAQ passed from parent when auto_populate is true
  productFAQ?: Array<{ question: string; answer?: unknown }> | null
}

export function FAQBlock({
  title,
  auto_populate = true,
  items,
  productFAQ,
}: FAQBlockProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  // Use product FAQ if auto-populate is enabled, otherwise use manual items
  const displayItems = auto_populate && productFAQ ? productFAQ : items || []

  if (displayItems.length === 0) {
    return null
  }

  // Generate JSON-LD structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: displayItems.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: typeof item.answer === 'string' ? item.answer : 'Voir la r�ponse d�taill�e sur notre site.',
      },
    })),
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {title && (
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
            {title}
          </h2>
        )}
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        <div className="max-w-3xl mx-auto space-y-4">
          {displayItems.map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors"
                aria-expanded={openIndex === index}
              >
                <span className="font-medium text-gray-900">{item.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                />
              </button>
              
              {openIndex === index && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  {item.answer ? (
                    <RichTextRenderer content={item.answer} />
                  ) : (
                    <p className="text-gray-600">Aucune r�ponse disponible.</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
