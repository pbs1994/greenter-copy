"use client"

import { useState, useEffect } from 'react'

interface ProductPriceItem {
  slug: string
  name: string
  price: number
  formatted: string
}

interface ProductPrice {
  price: number
  formatted: string
  currency: string
  products?: ProductPriceItem[]
}

export function useProductPrice() {
  const [data, setData] = useState<ProductPrice | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/product-price')
      .then(res => res.json())
      .then(data => {
        setData(data)
        setLoading(false)
      })
      .catch(() => {
        // Fallback en cas d'erreur
        setData({ price: 2500, formatted: '2 500 €', currency: 'eur' })
        setLoading(false)
      })
  }, [])

  return { data, loading }
}
