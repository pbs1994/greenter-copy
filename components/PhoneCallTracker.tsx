'use client'

import { Phone } from 'lucide-react'
import { ReactNode } from 'react'
import { COMPANY_PHONE } from '@/lib/local-seo-data'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

interface PhoneCallTrackerProps {
  phoneNumber?: string
  displayNumber?: string
  className?: string
  showIcon?: boolean
  conversionId?: string
  conversionLabel?: string
  ariaLabel?: string
  children?: ReactNode
}

export function PhoneCallTracker({
  phoneNumber = COMPANY_PHONE.raw,
  displayNumber = COMPANY_PHONE.display,
  className = '',
  showIcon = true,
  conversionId = 'AW-17839863014',
  conversionLabel = 'ovtpCOy194wcEObp2rpC',
  ariaLabel,
  children
}: PhoneCallTrackerProps) {
  
  const handlePhoneClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    // Referral attribution: if this visitor arrived via an agent's link,
    // log the click for the admin/agent to reconcile against an incoming
    // call — see /api/track-call-click. Fire-and-forget: a tel: link
    // doesn't unload the page (it opens the dialer app / a confirmation
    // dialog), so this reliably reaches the server without blocking or
    // delaying the redirect below. No-ops server-side if there's no
    // referral cookie, so this is safe to call unconditionally.
    fetch('/api/track-call-click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page: window.location.pathname }),
      keepalive: true,
    }).catch(() => {})

    // Track conversion via gtag
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': `${conversionId}/${conversionLabel}`,
        'value': 1.0,
        'currency': 'EUR',
        'event_callback': () => {
          // Redirect to phone after tracking
          window.location.href = `tel:${phoneNumber}`
        }
      })
      
      // Fallback: redirect after 1 second if callback doesn't fire
      setTimeout(() => {
        window.location.href = `tel:${phoneNumber}`
      }, 1000)
    } else {
      // If gtag not available, just redirect
      window.location.href = `tel:${phoneNumber}`
    }
    
    // Also push to dataLayer for GTM
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({
        'event': 'phone_call_click',
        'phone_number': phoneNumber,
        'page_url': window.location.href
      })
    }
  }

  // If children provided, render custom content
  if (children) {
    return (
      <a
        href={`tel:${phoneNumber}`}
        onClick={handlePhoneClick}
        className={className}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    )
  }

  return (
    <a
      href={`tel:${phoneNumber}`}
      onClick={handlePhoneClick}
      className={className}
      aria-label={ariaLabel}
    >
      {showIcon && <Phone className="w-5 h-5" />}
      {displayNumber}
    </a>
  )
}
