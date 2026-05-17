"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Phone, ArrowRight } from "lucide-react"
import { COMPANY_PHONES } from "@/lib/local-seo-data"

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.75)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div
      className={`
        fixed bottom-0 left-0 right-0 z-50 md:hidden
        transition-transform duration-300 ease-out
        ${isVisible ? "translate-y-0" : "translate-y-full"}
      `}
      aria-label="Actions rapides"
    >
      <div className="bg-white/98 backdrop-blur-md border-t border-neutral-200 px-4 py-3 shadow-2xl shadow-neutral-900/20">
        <div className="flex gap-3">
          {/* Phone call */}
          <a
            href={`tel:${COMPANY_PHONES.primary.raw}`}
            className="flex-none btn-secondary py-3.5 px-5 flex items-center gap-2 text-sm"
            aria-label={`Appeler le ${COMPANY_PHONES.primary.display}`}
          >
            <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
            Appeler
          </a>

          {/* Devis */}
          <Link
            href="/contact"
            className="flex-1 btn-primary py-3.5 justify-center text-sm"
          >
            Devis gratuit 48h
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
        <p className="text-center text-xs text-neutral-400 mt-1.5">
          Sans engagement · Certifié RGE
        </p>
      </div>
    </div>
  )
}
