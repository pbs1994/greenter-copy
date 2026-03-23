"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Sun, ShieldCheck, Wrench, ChevronLeft, ChevronRight, Fan } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"
import AutoScroll from "embla-carousel-auto-scroll"
import { useCallback, useEffect, useState } from "react"

const services = [
  {
    image: "/solaire.jpg",
    icon: Sun,
    customIcon: null,
    customIconSize: 28,
    title: "Panneaux solaires",
    description: "Produisez votre propre électricité et revendez le surplus. Installation certifiée RGE.",
    href: "/services/panneaux-solaires",
  },
  {
    image: "/pac.jpg",
    icon: Fan,
    customIcon: null,
    customIconSize: 28,
    title: "Pompes à chaleur",
    description: "Divisez par 3 votre facture de chauffage. Confort été comme hiver garanti.",
    href: "/services/pompe-a-chaleur",
  },
  {
    image: "/audit.png",
    icon: null,
    customIcon: "/audit-icon.svg",
    customIconSize: 32,
    title: "Audit énergétique",
    description: "Identifiez vos sources de gaspillage. Recevez un plan d'action personnalisé.",
    href: "/services/audit",
  },
  {
    image: "/isolation.jpg",
    icon: null,
    customIcon: "/isolation-icon.svg",
    customIconSize: 20,
    title: "Isolation thermique",
    description: "Gagnez en confort et réduisez les déperditions. Murs, combles et toitures.",
    href: "/services/isolation",
  },
  {
    image: "/conformite.jpg",
    icon: ShieldCheck,
    customIcon: null,
    customIconSize: 28,
    title: "Conformité",
    description: "Mise en service selon les normes en vigueur. Sécurité et performance garanties.",
    href: "/services/maintenance",
  },
  {
    image: "/maintenance.jpg",
    icon: Wrench,
    customIcon: null,
    customIconSize: 28,
    title: "Maintenance",
    description: "Prolongez la durée de vie de vos équipements. Évitez les pannes coûteuses.",
    href: "/services/maintenance",
  },
]

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

export function Services() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: false, 
    align: "start",
    containScroll: "trimSnaps"
  })

  const [partnersRef] = useEmblaCarousel(
    { loop: true, dragFree: true, align: "start" },
    [AutoScroll({ speed: 0.8, stopOnInteraction: false, stopOnMouseEnter: true })]
  )
  
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(true)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect)
    return () => { emblaApi.off("select", onSelect) }
  }, [emblaApi, onSelect])

  return (
    <section className="py-8 md:py-12 bg-white">
      {/* Header - centered */}
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-10 md:mb-14">
          <span className="inline-block text-green-700 font-semibold text-sm uppercase tracking-wider mb-3">
            Nos expertises
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
            Des solutions adaptées à votre projet
          </h2>
          <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
            De l'audit à l'installation, un accompagnement complet éligible aux aides.
          </p>
        </div>
      </div>

      {/* Carousel - Full width */}
      <div className="relative">
        <div className="overflow-hidden px-4 lg:px-8 pb-4" ref={emblaRef}>
          <div className="flex gap-4 lg:gap-6">
            {services.map((service, index) => (
              <div key={index} className="flex-none w-[80%] sm:w-[45%] lg:w-[320px]">
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation arrows - Desktop only */}
        <button
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          className="hidden lg:flex absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg items-center justify-center text-neutral-700 hover:text-green-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          aria-label="Précédent"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={scrollNext}
          disabled={!canScrollNext}
          className="hidden lg:flex absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg items-center justify-center text-neutral-700 hover:text-green-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          aria-label="Suivant"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-10">
          {services.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === selectedIndex 
                  ? "bg-green-600 w-6" 
                  : "bg-neutral-300 hover:bg-neutral-400"
              }`}
              aria-label={`Aller au service ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Partners Carousel - intégré */}
      <div className="mt-12 pt-10 border-t border-neutral-100">
        <p className="text-center text-sm text-neutral-500 mb-6">
          Nous installons les meilleures marques
        </p>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-white to-transparent z-10" />
          
          <div className="overflow-hidden" ref={partnersRef}>
            <div className="flex">
              {[...partners, ...partners].map((partner, index) => (
                <div key={index} className="flex-none mx-4 md:mx-5">
                  <div className="flex items-center justify-center h-12 w-28 md:w-32">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={120}
                      height={40}
                      className="h-6 md:h-7 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

type ServiceType = typeof services[0]

function ServiceCard({ service }: { service: ServiceType }) {
  const IconComponent = service.icon
  
  return (
    <Link 
      href={service.href}
      className="group block h-[400px] bg-gradient-to-b from-green-50 to-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ring-1 ring-green-200 hover:ring-green-400"
    >
      <div className="relative h-44 overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="(max-width: 768px) 80vw, (max-width: 1024px) 45vw, 33vw"
          quality={100}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      
      <div className="px-5 pb-6 pt-9 text-center relative h-[224px] flex flex-col">
        {/* Icon centered between image and content */}
        <div className="absolute -top-7 left-1/2 -translate-x-1/2">
          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg ring-2 ring-green-500 group-hover:ring-teal-500 transition-colors">
            {service.customIcon ? (
              <Image
                src={service.customIcon}
                alt=""
                width={service.customIconSize}
                height={service.customIconSize}
                className="object-contain"
              />
            ) : IconComponent ? (
              <IconComponent className="w-7 h-7 text-green-600" />
            ) : null}
          </div>
        </div>
        
        <h3 className="font-heading text-lg font-bold text-neutral-900 group-hover:text-green-700 transition-colors mb-2">
          {service.title}
        </h3>
        <p className="text-neutral-600 text-sm leading-relaxed mb-3 flex-grow">
          {service.description}
        </p>
        <span className="inline-flex items-center justify-center gap-1 text-green-700 font-semibold text-sm group-hover:gap-2 transition-all">
          En savoir plus
          <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  )
}
