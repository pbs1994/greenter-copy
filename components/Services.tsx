"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Sun, ShieldCheck, Wrench, Fan } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const services = [
  {
    image: "/solaire.jpg",
    imageAlt: "Panneaux solaires photovoltaïques installés sur une toiture résidentielle en Île-de-France",
    icon: Sun,
    customIcon: null,
    customIconSize: 28,
    title: "Panneaux solaires",
    description: "Produisez votre propre électricité et revendez le surplus. Installation certifiée RGE.",
    href: "/services/panneaux-solaires",
  },
  {
    image: "/pac.jpg",
    imageAlt: "Unité extérieure de pompe à chaleur air-eau installée par technicien Greenter certifié RGE",
    icon: Fan,
    customIcon: null,
    customIconSize: 28,
    title: "Pompes à chaleur",
    description: "Divisez par 3 votre facture de chauffage. Confort été comme hiver garanti.",
    href: "/services/pompe-a-chaleur",
  },
  {
    image: "/audit.jpg",
    imageAlt: "Audit énergétique et diagnostic de performance réalisés par un expert Greenter",
    icon: null,
    customIcon: "/audit-icon.svg",
    customIconSize: 32,
    title: "Audit énergétique",
    description: "Identifiez vos sources de gaspillage. Recevez un plan d'action personnalisé.",
    href: "/services/audit",
  },
  {
    image: "/isolation.jpg",
    imageAlt: "Isolation thermique des combles soufflée par un technicien Greenter certifié RGE",
    icon: null,
    customIcon: "/isolation-icon.svg",
    customIconSize: 20,
    title: "Isolation thermique",
    description: "Gagnez en confort et réduisez les déperditions. Murs, combles et toitures.",
    href: "/services/isolation",
  },
  {
    image: "/conformite.jpg",
    imageAlt: "Mise en conformité d'installation énergétique par technicien Greenter certifié",
    icon: ShieldCheck,
    customIcon: null,
    customIconSize: 28,
    title: "Conformité",
    description: "Mise en service selon les normes en vigueur. Sécurité et performance garanties.",
    href: "/services/maintenance",
  },
  {
    image: "/maintenance.jpg",
    imageAlt: "Entretien et maintenance de pompe à chaleur par technicien Greenter certifié",
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
  const [selectedIndex, setSelectedIndex] = useState(0)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  // IntersectionObserver — no layout reads, fires asynchronously
  useEffect(() => {
    const observers = cardRefs.current.map((card, i) => {
      if (!card) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setSelectedIndex(i) },
        { threshold: 0.6 }
      )
      obs.observe(card)
      return obs
    })
    return () => observers.forEach((obs) => obs?.disconnect())
  }, [])

  const scrollToCard = (index: number) => {
    cardRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    })
  }

  return (
    <section className="py-8 md:py-12 bg-white">
      {/* Header */}
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-10 md:mb-14">
          <span className="inline-block text-green-700 font-semibold text-sm uppercase tracking-wider mb-3">
            Nos expertises
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
            Des solutions adaptées à votre projet
          </h2>
          <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
            De l&apos;audit à l&apos;installation, un accompagnement complet éligible aux aides.
          </p>
        </div>
      </div>

      {/* CSS scroll-snap carousel — no JS layout reads */}
      <div className="relative">
        <div className="flex gap-4 lg:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 lg:px-8 pb-4">
          {services.map((service, index) => (
            <div
              key={index}
              ref={(el) => { cardRefs.current[index] = el }}
              className="flex-none w-[80%] sm:w-[45%] lg:w-[320px] snap-start"
            >
              <ServiceCard service={service} />
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-10">
          {services.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToCard(index)}
              className={`h-2 rounded-full transition-all ${
                index === selectedIndex
                  ? "bg-green-600 w-6"
                  : "bg-neutral-300 hover:bg-neutral-400 w-2"
              }`}
              aria-label={`Aller au service ${index + 1}`}
            />
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-green-700 font-semibold text-sm hover:text-teal-600 transition-colors group border border-green-200 hover:border-green-400 rounded-full px-5 py-2.5 bg-white hover:bg-green-50"
          >
            Voir tous nos services
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* Partners — pure CSS infinite scroll, zero JS */}
      <div className="mt-12 pt-10 border-t border-neutral-100">
        <p className="text-center text-sm text-neutral-500 mb-6">
          Nous installons les meilleures marques
        </p>
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          <div className="flex animate-scroll-infinite hover:[animation-play-state:paused]">
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
          alt={service.imageAlt}
          fill
          sizes="(max-width: 768px) 80vw, (max-width: 1024px) 45vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="px-5 pb-6 pt-9 text-center relative h-[224px] flex flex-col">
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
