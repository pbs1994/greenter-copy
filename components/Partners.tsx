"use client"

import Image from "next/image"

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

const certifications = [
  { 
    name: "RGE", 
    fullName: "Reconnu Garant de l'Environnement",
    logo: "/certifications/rge.svg" 
  },
  { 
    name: "Qualibat", 
    fullName: "Certification Qualibat",
    logo: "/certifications/qualibat.svg" 
  },
  { 
    name: "QualiPAC", 
    fullName: "Pompes à chaleur",
    logo: "/certifications/qualipac.svg" 
  },
  { 
    name: "QualiPV", 
    fullName: "Photovoltaïque",
    logo: "/certifications/qualipv.svg" 
  },
]

export function Partners() {
  // Double the partners array for seamless infinite scroll
  const doubledPartners = [...partners, ...partners]

  return (
    <section className="py-16 md:py-20 px-4 bg-neutral-50 overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block text-green-700 font-semibold text-sm uppercase tracking-wider mb-3">
            Nos partenaires
          </span>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-neutral-900 mb-3">
            Nous installons les meilleures marques
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Partenaires officiels des leaders du marché pour vous garantir 
            des équipements fiables et performants.
          </p>
        </div>
      </div>

      {/* Infinite Carousel */}
      <div className="relative w-full">
        {/* Gradient masks for smooth edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-neutral-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-neutral-50 to-transparent z-10 pointer-events-none" />
        
        {/* Scrolling container */}
        <div className="flex animate-scroll">
          {doubledPartners.map((partner, index) => (
            <div 
              key={`${partner.name}-${index}`}
              className="flex-shrink-0 mx-4 md:mx-6"
            >
              <div className="flex items-center justify-center p-4 md:p-6 bg-white rounded-xl shadow-sm ring-1 ring-neutral-200 h-20 md:h-24 w-40 md:w-48 hover:shadow-md hover:ring-green-300 transition-all duration-300">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={160}
                  height={60}
                  className="h-10 md:h-12 w-auto object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div className="container mx-auto max-w-6xl mt-16">
        <div className="border-t border-neutral-200 pt-12">
          <div className="text-center mb-8">
            <span className="inline-block text-green-700 font-semibold text-sm uppercase tracking-wider mb-3">
              Certifications
            </span>
            <h3 className="font-heading text-xl md:text-2xl font-bold text-neutral-900">
              Labels qualité et garanties
            </h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {certifications.map((cert) => (
              <div 
                key={cert.name}
                className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm ring-1 ring-neutral-200 hover:shadow-md transition-shadow"
              >
                <Image
                  src={cert.logo}
                  alt={cert.name}
                  width={80}
                  height={80}
                  className="w-20 h-20 object-contain mb-4"
                />
                <span className="font-semibold text-neutral-900">{cert.name}</span>
                <span className="text-sm text-neutral-500 mt-1">{cert.fullName}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
