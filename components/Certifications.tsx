"use client"

import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"

const certifications = [
  { 
    name: "RGE", 
    fullName: "Reconnu Garant de l'Environnement",
    logo: "/certifications/rge.webp" 
  },
  { 
    name: "Qualibat", 
    fullName: "Certification Qualibat",
    logo: "/certifications/qualibat.jpg" 
  },
  { 
    name: "QualiPAC", 
    fullName: "Pompes à chaleur",
    logo: "/certifications/qualipac.jpg" 
  },
  { 
    name: "QualiPV", 
    fullName: "Photovoltaïque",
    logo: "/certifications/qualipv.png" 
  },
]

export function Certifications() {
  const [certEmblaRef] = useEmblaCarousel(
    { loop: true, align: "start" }
  )

  return (
    <section className="py-12 md:py-16 bg-neutral-50">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="text-center mb-10">
          <span className="inline-block text-green-700 font-semibold text-sm uppercase tracking-wider mb-3">
            Certifications
          </span>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-neutral-900">
            Qualité garantie
          </h2>
        </div>
        
        {/* Mobile Carousel */}
        <div className="md:hidden overflow-hidden" ref={certEmblaRef}>
          <div className="flex gap-2">
            {certifications.map((cert) => (
              <div key={cert.name} className="flex-none w-[24%]">
                <CertificationCard cert={cert} />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:flex flex-wrap justify-center gap-4 md:gap-6">
          {certifications.map((cert) => (
            <CertificationCard key={cert.name} cert={cert} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CertificationCard({ cert }: { cert: typeof certifications[0] }) {
  return (
    <div className="group flex flex-col items-center text-center">
      <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-white flex items-center justify-center mb-3 group-hover:bg-green-50 transition-colors ring-2 ring-green-200 group-hover:ring-green-400">
        <Image
          src={cert.logo}
          alt={cert.name}
          width={60}
          height={60}
          className="w-14 h-14 md:w-16 md:h-16 object-contain"
        />
      </div>
      <span className="font-semibold text-neutral-900">{cert.name}</span>
      <span className="text-xs text-neutral-500 max-w-[120px]">{cert.fullName}</span>
    </div>
  )
}
