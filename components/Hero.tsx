"use client"

import { ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"
import useEmblaCarousel from "embla-carousel-react"
import AutoScroll from "embla-carousel-auto-scroll"
import GoogleRatingBadgeClient from "@/components/GoogleRatingBadgeClient"
import { CompareSlider } from "@/components/CompareSlider"

const benefits = [
  "Jusqu'à 70% d'économies",
  "Certifié RGE",
  "Garantie décennale",
  "+200 installations",
  "Éligible MaPrimeRénov'",
  "Devis gratuit sous 48h",
  "Accompagnement complet",
]

export function Hero() {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, dragFree: true, align: "start" },
    [AutoScroll({ speed: 0.5, stopOnInteraction: false, stopOnMouseEnter: true })]
  )

  return (
    <section className="bg-gradient-to-b from-green-50 via-white to-white">
      <div className="px-4 py-4 md:py-6 lg:py-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-4xl mx-auto mb-8 md:mb-10">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 leading-tight mb-5">
              <span className="text-teal-600">Baissez vos factures,</span>
              <br />
              <span className="text-green-700">pas votre confort.</span>
            </h1>
            
            <p className="text-neutral-600 text-base sm:text-lg md:text-xl leading-relaxed mb-8 max-w-3xl mx-auto">
              Installation de pompes à chaleur, panneaux solaires et isolation thermique 
              à Ozoir-la-Ferrière et en Seine-et-Marne. Certifié RGE, éligible aux aides.
            </p>

            <div className="mb-8">
              <div className="hidden lg:block">
                <div className="flex items-center justify-center gap-6 text-sm mb-3">
                  <div className="flex items-center gap-2 text-neutral-700">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>Jusqu'à 70% d'économies</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-700">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>Installateur certifié RGE</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-700">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>Garantie décennale</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-700">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>+200 installations</span>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-6 text-sm">
                  <div className="flex items-center gap-2 text-neutral-700">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>Éligible MaPrimeRénov'</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-700">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>Devis gratuit sous 48h</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-700">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>Accompagnement complet</span>
                  </div>
                </div>
              </div>

              <div className="lg:hidden overflow-hidden" ref={emblaRef}>
                <div className="flex">
                  {[...benefits, ...benefits].map((benefit, index) => (
                    <div key={index} className="flex-none px-3">
                      <span className="flex items-center gap-2 text-neutral-700 whitespace-nowrap">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm">{benefit}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary text-base px-8 py-4">
                Demander mon étude gratuite
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/produits" className="btn-secondary text-base px-8 py-4">
                Voir les produits
              </Link>
            </div>
          </div>

          {/* Compare Slider - PAC vs Panneaux solaires */}
          <div className="relative w-full max-w-5xl mx-auto">
            <CompareSlider
              beforeImage="/pac.jpg"
              afterImage="/solaire.jpg"
              beforeLabel="Pompe à chaleur"
              afterLabel="Panneaux solaires"
            />
          </div>

          <div className="mt-8 max-w-5xl mx-auto flex justify-center">
            <GoogleRatingBadgeClient />
          </div>
        </div>
      </div>
    </section>
  )
}
