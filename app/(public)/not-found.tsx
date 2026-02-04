import Link from "next/link"
import { Home, ArrowLeft, Phone } from "lucide-react"

export default function NotFound() {
  return (
    <main className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* 404 */}
        <div className="relative mb-6">
          <span className="text-[120px] md:text-[160px] font-heading font-bold text-green-100 leading-none select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-3xl">🔌</span>
            </div>
          </div>
        </div>

        {/* Message */}
        <h1 className="font-heading text-2xl md:text-3xl font-bold text-neutral-900 mb-3">
          Page introuvable
        </h1>
        <p className="text-neutral-500 mb-8">
          Oups ! Cette page semble avoir été débranchée. 
          Pas d'inquiétude, on vous remet sur le bon circuit.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-full transition-colors"
          >
            <Home className="w-4 h-4" />
            Retour à l'accueil
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-white border border-neutral-200 hover:border-green-200 hover:bg-green-50 text-neutral-700 font-medium px-6 py-3 rounded-full transition-colors"
          >
            <Phone className="w-4 h-4" />
            Nous contacter
          </Link>
        </div>

        {/* Liens rapides */}
        <div className="mt-10 pt-8 border-t border-neutral-200">
          <p className="text-sm text-neutral-400 mb-4">Pages populaires</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/services/pompe-a-chaleur" className="text-sm text-green-600 hover:text-green-700 hover:underline">
              Pompe à chaleur
            </Link>
            <span className="text-neutral-300">•</span>
            <Link href="/services/panneaux-solaires" className="text-sm text-green-600 hover:text-green-700 hover:underline">
              Panneaux solaires
            </Link>
            <span className="text-neutral-300">•</span>
            <Link href="/produits" className="text-sm text-green-600 hover:text-green-700 hover:underline">
              Nos produits
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
