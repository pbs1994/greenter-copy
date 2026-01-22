import Image from "next/image"
import Link from "next/link"
import { Heart, ArrowRight } from "lucide-react"

export function Product() {
  return (
    <section className="relative py-16 md:py-24 px-4 overflow-hidden bg-gradient-to-b from-white to-green-50">
      {/* Background decorative shape */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Image
          src="/greenter-forme.svg"
          alt=""
          width={800}
          height={800}
          className="opacity-20 w-[600px] md:w-[800px] lg:w-[1000px] h-auto"
        />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-green-700 font-semibold text-sm uppercase tracking-wider mb-3">
            Équipements
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
            Nos produits
          </h2>
          <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
            Nous installons des équipements de qualité professionnelle pour garantir 
            performance et durabilité.
          </p>
        </div>

        {/* Product Card */}
        <div className="max-w-sm mx-auto">
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg ring-1 ring-green-200 hover:shadow-xl transition-shadow duration-300">
            {/* Header with title and heart */}
            <div className="p-6 pb-0">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-xs font-medium text-teal-600 uppercase tracking-wider">
                    Onduleur solaire
                  </span>
                  <h3 className="font-heading text-xl font-bold text-neutral-900 mt-1">
                    Série BluE-S monophasée
                  </h3>
                </div>
                <button 
                  className="p-2 rounded-full hover:bg-green-50 transition-colors"
                  aria-label="Ajouter aux favoris"
                >
                  <Heart className="w-5 h-5 text-neutral-400 hover:text-green-600 transition-colors" />
                </button>
              </div>
            </div>

            {/* Product Image */}
            <div className="bg-gradient-to-b from-green-100 to-green-50 p-6 mx-4 rounded-xl">
              <Image
                src="/kstar.png"
                alt="Série BluE-S monophasée"
                width={300}
                height={300}
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Price and CTA */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold text-neutral-900">
                  Prix sur demande
                </span>
                <span className="text-xs bg-neutral-100 text-neutral-600 px-3 py-1 rounded-full font-medium">
                  Bientôt disponible
                </span>
              </div>
              
              <Link 
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-3 rounded-full transition-colors"
              >
                Demander un devis
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* View all products link */}
        <div className="text-center mt-8">
          <Link 
            href="/produits" 
            className="btn-ghost text-base"
          >
            Voir tous nos produits
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
