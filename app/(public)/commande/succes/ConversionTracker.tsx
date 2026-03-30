'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

interface ConversionTrackerProps {
  sessionId: string
  amount: number
  items: Array<{ name: string; price: number; quantity: number }>
}

export function ConversionTracker({ sessionId, amount, items }: ConversionTrackerProps) {
  useEffect(() => {
    if (typeof window === 'undefined') return

    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: 'purchase',
      transaction_id: sessionId,
      value: amount,
      currency: 'EUR',
      items: items.map((item) => ({
        item_name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
    })

    if (window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: 'AW-17839863014/BTP5CNrp-ewbEObp2rpC',
        value: amount,
        currency: 'EUR',
        transaction_id: sessionId,
      })
    }
  }, [sessionId, amount, items])

  return null
}
