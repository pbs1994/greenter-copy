'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { faqs } from './faqData'

export function MaintenanceFAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="border border-neutral-200 rounded-xl overflow-hidden hover:border-green-300 transition-colors"
        >
          <button
            onClick={() => setOpenFaq(openFaq === index ? null : index)}
            className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-green-50 transition-colors"
          >
            <span className="font-semibold text-neutral-900 pr-4">
              {faq.question}
            </span>
            <ChevronDown
              className={`w-5 h-5 text-green-700 shrink-0 transition-transform duration-300 ${
                openFaq === index ? 'rotate-180' : ''
              }`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openFaq === index ? 'max-h-96' : 'max-h-0'
            }`}
          >
            <p className="px-5 pb-5 text-neutral-600 leading-relaxed">
              {faq.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
