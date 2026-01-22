import { ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"

const benefits = [
  "Audit énergétique offert",
  "Accompagnement MaPrimeRénov'",
  "Devis détaillé sous 48h",
  "Contrats d'entretien sur mesure",
]

export function Banner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-900 via-green-800 to-teal-900 py-12 md:py-16 px-4">
      {/* Subtle pattern overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left Content */}
          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Réduisez vos factures d&apos;énergie dès maintenant
            </h2>
            
            <p className="text-green-100 text-lg leading-relaxed mb-8">
              Greenter accompagne particuliers et professionnels dans leurs projets 
              d&apos;efficacité énergétique, de l&apos;audit à la maintenance, avec des solutions 
              durables et performantes.
            </p>

            {/* Benefits */}
            <ul className="grid sm:grid-cols-2 gap-3 mb-8">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-2 text-white">
                  <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right CTA Card */}
          <div className="bg-white rounded-2xl p-8 shadow-2xl">
            <h3 className="font-heading text-2xl font-bold text-neutral-900 mb-2">
              Demandez votre devis gratuit
            </h3>
            <p className="text-neutral-600 mb-6">
              Sans engagement, réponse sous 48h.
            </p>

            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Votre nom"
                  className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:border-green-700 focus:ring-2 focus:ring-green-700/20 outline-none transition-all"
                />
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="Votre téléphone"
                  className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:border-green-700 focus:ring-2 focus:ring-green-700/20 outline-none transition-all"
                />
              </div>
              <div>
                <select
                  className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:border-green-700 focus:ring-2 focus:ring-green-700/20 outline-none transition-all text-neutral-600"
                  defaultValue=""
                >
                  <option value="" disabled>Type de projet</option>
                  <option value="pac">Pompe à chaleur</option>
                  <option value="solar">Panneaux solaires</option>
                  <option value="isolation">Isolation</option>
                  <option value="audit">Audit énergétique</option>
                  <option value="other">Autre</option>
                </select>
              </div>
              <button
                type="submit"
                className="btn-primary w-full justify-center text-base py-4"
              >
                Recevoir mon devis gratuit
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>

            <p className="text-xs text-neutral-500 mt-4 text-center">
              En soumettant ce formulaire, vous acceptez d&apos;être contacté par Greenter.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
