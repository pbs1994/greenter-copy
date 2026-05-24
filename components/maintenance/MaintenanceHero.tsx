"use client"

import { ArrowDown, Shield } from "lucide-react"
import Image from "next/image"
import GoogleRatingBadgeClient from "@/components/GoogleRatingBadgeClient"

interface MaintenanceHeroProps {
  className?: string
}

/**
 * RGE Badge Component - Badge flottant certification RGE
 * Positionné en bas à gauche de l'image sur desktop
 */
function RGEBadge() {
  return (
    <div className="absolute -bottom-6 -left-6 z-10 hidden md:block">
      <div className="flex items-center gap-3 bg-emerald-100 px-5 py-4 rounded-2xl shadow-lg shadow-emerald-900/10 border border-emerald-200/50">
        <div className="w-12 h-12 rounded-full bg-emerald-200 flex items-center justify-center">
          <Shield className="w-6 h-6 text-emerald-700" />
        </div>
        <div>
          <p className="text-emerald-800 font-bold">Certification RGE</p>
          <p className="text-emerald-700/70 text-sm">Techniciens qualifiés</p>
        </div>
      </div>
    </div>
  )
}

export default function MaintenanceHero({ className = "" }: MaintenanceHeroProps) {
  const scrollToConfigurator = () => {
    const configurator = document.getElementById("configurateur")
    if (configurator) {
      configurator.scrollIntoView({ behavior: "smooth" })
    }
  }

  const scrollToFAQ = () => {
    const faq = document.getElementById("faq")
    if (faq) {
      faq.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className={`relative px-4 sm:px-8 py-8 md:py-12 lg:py-16 overflow-hidden ${className}`}>
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-6 lg:gap-12 items-center">
        {/* Left column - Text content */}
        <div className="md:col-span-6 space-y-4 sm:space-y-6 z-10 text-center md:text-left">
          {/* Main title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-green-800 leading-[1.1] tracking-tight">
            Sérénité Totale pour votre Habitat.
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-neutral-600 max-w-lg leading-relaxed mx-auto md:mx-0">
            Expertise technique et maintenance préventive pour vos systèmes d'énergie. 
            Assurez la longévité de vos installations avec nos contrats sur-mesure.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button
              onClick={scrollToConfigurator}
              className="
                inline-flex items-center justify-center gap-2
                bg-green-800 hover:bg-green-700 
                text-white font-semibold
                px-8 py-4 rounded-xl
                shadow-lg shadow-green-800/25
                transition-all duration-200
                hover:shadow-xl hover:shadow-green-800/30
                hover:-translate-y-0.5 hover:scale-105
                focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
              "
            >
              Explorer nos forfaits
              <ArrowDown className="w-5 h-5" />
            </button>
            <button
              onClick={scrollToFAQ}
              className="
                border-2 border-green-800/20 text-green-800
                px-8 py-4 rounded-xl font-semibold
                hover:bg-green-800/5 transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
              "
            >
              En savoir plus
            </button>
          </div>

          {/* Google Rating Badge */}
          <div className="flex justify-center md:justify-start pt-4">
            <GoogleRatingBadgeClient />
          </div>
        </div>

        {/* Right column - Image with effects (desktop) */}
        <div className="md:col-span-6 relative hidden md:block">
          <div className="relative">
            {/* Image container with rotation and hover effects */}
            <div
              className="
                rounded-[2.5rem] overflow-hidden
                shadow-xl shadow-green-900/10
                rotate-2 hover:rotate-0
                transition-transform duration-500
                bg-white p-2
                group
              "
            >
              <Image
                src="/interieur.webp"
                alt="Intérieur moderne avec équipements de chauffage"
                width={600}
                height={500}
                className="
                  rounded-[2rem] w-full h-[450px] lg:h-[500px] object-cover
                  transition-transform duration-700 ease-out
                  group-hover:scale-105
                "
                priority
              />
            </div>

            {/* RGE Badge - positioned bottom-left */}
            <RGEBadge />
          </div>
        </div>
      </div>

      {/* Background gradient decoration */}
      <div className="absolute top-0 right-0 -z-10 w-1/3 h-full bg-gradient-to-l from-green-100/50 to-transparent blur-3xl" />
      <div className="absolute bottom-0 left-0 -z-10 w-1/4 h-1/2 bg-gradient-to-tr from-emerald-100/30 to-transparent blur-3xl" />
    </section>
  )
}
