import Link from "next/link"
import { ArrowRight, Phone, FileText, Wrench, ShieldCheck } from "lucide-react"

const steps = [
  {
    icon: Phone,
    title: "Prise de contact",
    description:
      "Contactez-nous par téléphone, email ou formulaire en ligne. Un expert vous rappelle sous 24h pour cerner votre projet.",
  },
  {
    icon: FileText,
    title: "Audit & Devis gratuit",
    description:
      "Visite technique gratuite de votre logement. Devis détaillé sous 48h avec aides MaPrimeRénov' et reste à charge réel.",
  },
  {
    icon: Wrench,
    title: "Installation RGE",
    description:
      "Nos techniciens certifiés interviennent en 1 à 3 jours. Matériel garanti, installation soignée, zéro mauvaise surprise.",
  },
  {
    icon: ShieldCheck,
    title: "Mise en service & SAV",
    description:
      "Test complet, formation à l'utilisation et attestation RGE remise. Accès au SAV prioritaire et contrat de maintenance optionnel.",
  },
]

export function HowItWorks() {
  return (
    <section className="py-12 md:py-16 bg-neutral-50" aria-labelledby="how-it-works-title">
      <div className="container mx-auto max-w-6xl px-4">

        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <span className="inline-block text-green-700 font-semibold text-sm uppercase tracking-wider mb-3">
            Notre processus
          </span>
          <h2
            id="how-it-works-title"
            className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-4"
          >
            De A à Z en 4 étapes
          </h2>
          <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
            Un accompagnement simple, transparent et sans surprise — du premier contact à la mise en service.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={step.title} className="relative flex flex-col items-center text-center">

                {/* Connecting arrow between steps — desktop only */}
                {index < steps.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-10 left-[calc(50%+3rem)] right-[calc(-50%+3rem)] h-0.5 border-t-2 border-dashed border-green-200"
                    aria-hidden="true"
                  />
                )}

                {/* Step circle */}
                <div className="relative z-10 w-20 h-20 bg-white rounded-full border-2 border-green-300 hover:border-green-500 flex items-center justify-center mb-4 shadow-md transition-colors">
                  <Icon className="w-8 h-8 text-green-600" aria-hidden="true" />
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-teal-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow">
                    {index + 1}
                  </span>
                </div>

                <h3 className="font-heading text-base md:text-lg font-bold text-neutral-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed max-w-[220px] mx-auto">
                  {step.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-10 md:mt-12">
          <Link href="/contact" className="btn-primary text-base px-8 py-4">
            Commencer mon projet
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </Link>
        </div>

      </div>
    </section>
  )
}
