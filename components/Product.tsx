import Image from "next/image"
import Link from "next/link"
import { Heart, ArrowRight, Truck, Wrench } from "lucide-react"

export function Product() {
  return (
    <section className="relative py-8 md:py-10 px-4 overflow-hidden bg-gradient-to-b from-white to-green-50">
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
        <div className="text-center mb-10">
          <span className="inline-block text-green-700 font-semibold text-sm uppercase tracking-wider mb-3">
            Notre sélection
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900">
            Équipement phare
          </h2>
        </div>

        {/* Product Card */}
        <Link href="/produits/kstar-blue-s-6kw" className="block max-w-sm mx-auto group">
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg ring-1 ring-green-200 group-hover:shadow-xl group-hover:ring-green-400 transition-all duration-300">
            {/* Header with title and heart */}
            <div className="p-6 pb-0">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-xs font-medium text-teal-600 uppercase tracking-wider">
                    Onduleur solaire
                  </span>
                  <h3 className="font-heading text-xl font-bold text-neutral-900 mt-1 group-hover:text-green-700 transition-colors">
                    Série BluE-S monophasée
                  </h3>
                </div>
                <div className="p-2 rounded-full bg-red-50">
                  <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                </div>
              </div>
            </div>

            {/* Product Image */}
            <div className="relative bg-gradient-to-b from-green-100 to-green-50 p-6 mx-4 rounded-xl">
              <Image
                src="/kstar.png"
                alt="KSTAR BluE-S 6kW - Batterie solaire onduleur hybride tout-en-un avec stockage LiFePO4"
                width={300}
                height={300}
                className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500"
              />
              
              {/* Badges Livraison + Installation */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-center gap-2">
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white/95 backdrop-blur-sm rounded-lg shadow-sm border border-green-100">
                  <Truck className="w-3.5 h-3.5 text-green-600" />
                  <span className="text-[10px] font-medium text-neutral-700">Livraison incluse</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white/95 backdrop-blur-sm rounded-lg shadow-sm border border-green-100">
                  <Wrench className="w-3.5 h-3.5 text-teal-600" />
                  <span className="text-[10px] font-medium text-neutral-700">Installation incluse</span>
                </div>
              </div>
            </div>

            {/* Price and CTA */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-neutral-900">2 500 €</span>
                  <span className="text-sm text-neutral-500">TTC</span>
                </div>
                <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                  Disponible
                </span>
              </div>
              
              <div className="w-full inline-flex items-center justify-center gap-2 bg-green-700 group-hover:bg-green-800 text-white font-semibold px-6 py-3 rounded-full transition-colors">
                Voir le produit
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  )
}
