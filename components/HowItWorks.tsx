import Link from "next/link"
import { ArrowRight, Phone, FileText, Wrench, ShieldCheck } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: Phone,
    title: "Prise de contact",
    description:
      "Appelez-nous ou remplissez le formulaire en ligne. Un expert Greenter vous rappelle sous 24h pour cerner votre projet.",
    gradient: "from-teal-400 to-teal-600",
  },
  {
    number: "02",
    icon: FileText,
    title: "Audit & Devis gratuit",
    description:
      "Visite technique gratuite à domicile. Devis détaillé sous 48h avec aides MaPrimeRénov' et reste à charge réel inclus.",
    gradient: "from-green-400 to-green-600",
  },
  {
    number: "03",
    icon: Wrench,
    title: "Installation RGE",
    description:
      "Nos techniciens certifiés interviennent en 1 à 3 jours. Matériel garanti, installation soignée, zéro mauvaise surprise.",
    gradient: "from-teal-500 to-green-600",
  },
  {
    number: "04",
    icon: ShieldCheck,
    title: "Mise en service & SAV",
    description:
      "Test complet, formation et attestation RGE remise. Accès prioritaire au SAV et contrat de maintenance optionnel.",
    gradient: "from-green-500 to-teal-500",
  },
]

export function HowItWorks() {
  return (
    <section
      className="relative py-16 md:py-20 bg-gradient-to-br from-green-900 via-green-800 to-teal-900 overflow-hidden"
      aria-labelledby="how-it-works-title"
    >
      {/* Decorative orbs */}
      <div
        className="absolute top-0 right-0 w-72 h-72 bg-teal-300/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-56 h-56 bg-green-300/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="container mx-auto max-w-6xl px-4 relative z-10">

        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block text-green-400 font-semibold text-sm uppercase tracking-wider mb-3">
            Notre processus
          </span>
          <h2
            id="how-it-works-title"
            className="font-heading text-3xl md:text-4xl font-bold text-white mb-4"
          >
            De A à Z en 4 étapes
          </h2>
          <p className="text-green-200 text-lg max-w-2xl mx-auto">
            Un accompagnement simple et transparent — du premier contact à la mise en service.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div
                key={step.number}
                className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 group"
              >
                {/* Background number */}
                <div
                  className="absolute top-4 right-5 text-7xl font-heading font-bold text-white/8 leading-none select-none pointer-events-none"
                  aria-hidden="true"
                >
                  {step.number}
                </div>

                {/* Icon with gradient bg */}
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-6 h-6 text-white" aria-hidden="true" />
                </div>

                <h3 className="font-heading text-lg font-bold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-green-200 text-sm leading-relaxed">
                  {step.description}
                </p>

                {/* Arrow connector between cards — desktop only */}
                {index < steps.length - 1 && (
                  <div
                    className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 bg-green-400 rounded-full items-center justify-center shadow-lg"
                    aria-hidden="true"
                  >
                    <ArrowRight className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link href="/contact" className="btn-primary text-base px-8 py-4">
            Commencer mon projet
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </Link>
          <p className="text-green-400 text-sm mt-3">
            Sans engagement · Réponse sous 24h
          </p>
        </div>

      </div>
    </section>
  )
}
