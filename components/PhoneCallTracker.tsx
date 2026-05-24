"use client"

import { Phone } from "lucide-react"
import { COMPANY_PHONES } from "@/lib/local-seo-data"

interface PhoneCallTrackerProps {
  className?: string
  showIcon?: boolean
  children?: React.ReactNode
}

export function PhoneCallTracker({ className, showIcon = true, children }: PhoneCallTrackerProps) {
  const handleClick = () => {
    if (typeof window !== "undefined") {
      window.dataLayer?.push({ event: "phone_call_click", phone: COMPANY_PHONES.primary.display })
    }
  }

  return (
    <a
      href={`tel:${COMPANY_PHONES.primary.raw}`}
      className={className}
      onClick={handleClick}
    >
      {showIcon && <Phone className="w-4 h-4" />}
      {children}
    </a>
  )
}
