'use client'

import { useState, useEffect } from 'react'
import { ShoppingCart } from 'lucide-react'
import { formatEUR } from '@/lib/format'

interface StickyBuyBarProps {
  productName: string
  price: number // cents
  productId: string
  ctaId: string // ID of the main CTA element to observe
}

export function StickyBuyBar({ productName, price, productId, ctaId }: StickyBuyBarProps) {
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const target = document.getElementById(ctaId)
    if (!target) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting)
      },
      { threshold: 0 }
    )

    observer.observe(target)
    return () => observer.disconnect()
  }, [ctaId])

  const handleBuy = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: [{ productId, quantity: 1 }] }),
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } catch {
      setLoading(false)
    }
  }

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-neutral-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="container mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-neutral-900 truncate">{productName}</p>
          <p className="text-lg font-bold text-green-700">{formatEUR(price)}</p>
        </div>
        <button
          onClick={handleBuy}
          disabled={loading}
          className="shrink-0 inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 disabled:bg-green-400 text-white font-semibold px-6 py-3 rounded-full transition-colors text-sm"
        >
          <ShoppingCart className="w-4 h-4" />
          {loading ? 'Redirection...' : 'Acheter'}
        </button>
      </div>
    </div>
  )
}
