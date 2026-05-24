"use client"

import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import AutoScroll from "embla-carousel-auto-scroll"

const partners = [
  { name: "Daikin", logo: "/partners/daikin.svg" },
  { name: "Atlantic", logo: "/partners/atlantic.svg" },
  { name: "Mitsubishi Electric", logo: "/partners/mitsubishi.svg" },
  { name: "Viessmann", logo: "/partners/viessmann.svg" },
  { name: "Bosch", logo: "/partners/bosch.svg" },
  { name: "Panasonic", logo: "/partners/panasonic.svg" },
  { name: "Toshiba", logo: "/partners/toshiba.svg" },
  { name: "LG", logo: "/partners/lg.svg" },
  { name: "Saunier Duval", logo: "/partners/saunier-duval.svg" },
  { name: "De Dietrich", logo: "/partners/de-dietrich.svg" },
  { name: "Chaffoteaux", logo: "/partners/chaffoteaux.svg" },
  { name: "Frisquet", logo: "/partners/frisquet.svg" },
  { name: "SunPower", logo: "/partners/sunpower.svg" },
  { name: "Enphase", logo: "/partners/enphase.svg" },
]

export function Partners() {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, dragFree: true, align: "start" },
    [AutoScroll({ speed: 0.8, stopOnInteraction: false, stopOnMouseEnter: true })]
  )

  return (
    <section className="py-12 md:py-16 bg-white overflow-hidden">
      {/* Partners */}
      <div className="container mx-auto max-w-6xl px-4 mb-10">
        <div className="text-center mb-10">
          <span className="inline-block text-green-700 font-semibold text-sm uppercase tracking-wider mb-3">
            Marques partenaires
          </span>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-neutral-900 mb-3">
            Les meilleures marques, installées chez vous
          </h2>
          <p className="text-neutral-600">
            Équipements premium des leaders du marché
          </p>
        </div>
      </div>

      {/* Logo Carousel */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-white to-transparent z-10" />
        
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {[...partners, ...partners].map((partner, index) => (
              <div key={index} className="flex-none mx-4 md:mx-6">
                <div className="flex items-center justify-center h-16 md:h-20 w-32 md:w-40 hover:opacity-80 transition-all duration-300">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={140}
                    height={50}
                    className="h-8 md:h-10 w-auto object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
