import Image from "next/image"
import { Phone, Shield, Clock, Wrench, CheckCircle, Calendar, Award, ArrowDown } from "lucide-react"
import { ServiceSchema } from "@/components/schemas/ServiceSchema"
import { BreadcrumbSchema } from "@/components/schemas/BreadcrumbSchema"
import { FAQPageSchema } from "@/components/schemas/FAQPageSchema"
import { MaintenanceConfigurator } from "@/components/MaintenanceConfigurator"
import { MaintenanceFAQ } from "./MaintenanceFAQ"
import { faqs } from "./faqData"
import { createSupabaseServerClient } from "@/lib/supabase-server"
import { formatEUR } from "@/lib/format"
import GoogleReviewsCarousel from "@/components/GoogleReviewsCarousel"
import { Certifications } from "@/components/Certifications"
import type { MaintenanceService, MaintenanceOption } from "@/types/maintenance"

const steps = [
  {
    number: "01",
    title: "Configurez votre contrat",
    description: "Sélectionnez vos équipements et options en quelques clics. Prix transparent, sans surprise.",
  },
  {
    number: "02", 
    title: "On vous rappelle sous 24h",
    description: "Un conseiller vous contacte pour valider vos besoins et planifier l'intervention.",
  },
  {
    number: "03",
    title: "Intervention par un pro certifié",
    description: "Notre technicien intervient chez vous et vous remet votre attestation d'entretien.",
  },
]

const guarantees = [
  {
    icon: Shield,
    title: "Sans engagement",
    description: "Résiliez quand vous voulez avec 1 mois de préavis, sans frais.",
  },
  {
    icon: Clock,
    title: "Intervention prioritaire",
    description: "En cas de panne, nos abonnés passent en priorité pour le dépannage.",
  },
  {
    icon: Award,
    title: "Techniciens certifiés",
    description: "Équipe qualifiée RGE, QualiPAC et QualiPV pour tous vos équipements.",
  },
  {
    icon: Calendar,
    title: "Rappel automatique",
    description: "On vous contacte quand c'est l'heure de l'entretien, vous n'avez rien à gérer.",
  },
]

export default async function MaintenancePage() {
  const supabase = await createSupabaseServerClient()

  const [servicesResult, optionsResult] = await Promise.all([
    supabase
      .from('maintenance_services')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true }),
    supabase
      .from('maintenance_options')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true }),
  ])

  const services: MaintenanceService[] = servicesResult.data ?? []
  const options: MaintenanceOption[] = optionsResult.data ?? []

  const minPrice = services.length > 0 
    ? Math.min(...services.map(s => s.price_monthly))
    : 1500

  const breadcrumbItems = [
    { name: "Accueil", url: "https://greenter.fr" },
    { name: "Services", url: "https://greenter.fr/services" },
    { name: "Contrats d'entretien", url: "https://greenter.fr/services/maintenance" }
  ]

  return (
    <main>
      <ServiceSchema
        name="Contrats d'entretien"
        description={`Contrats d'entretien pompe à chaleur, chaudière, panneaux solaires à partir de ${formatEUR(minPrice)}/mois. Entretien obligatoire, techniciens certifiés, sans engagement.`}
        url="https://greenter.fr/services/maintenance"
        image="https://greenter.fr/maintenance.jpg"
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      <FAQPageSchema items={faqs} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="container mx-auto max-w-6xl px-4 py-16 md:py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
                <Wrench className="w-4 h-4" />
                Entretien obligatoire PAC & Chaudière
              </span>
              
              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                Protégez vos équipements,<br />
                <span className="text-green-400">on s'occupe de tout</span>
              </h1>
              
              <p className="text-green-100 text-lg leading-relaxed mb-8">
                Contrats d'entretien pour pompe à chaleur, chaudière et panneaux solaires. 
                Composez votre formule en 2 minutes, on vous rappelle sous 24h.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 text-white">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Sans engagement</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Techniciens certifiés</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Attestation fournie</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="#configurateur" 
                  className="btn-primary text-base px-8 py-4"
                >
                  Configurer mon contrat
                  <ArrowDown className="w-5 h-5" />
                </a>
                <a 
                  href="tel:+33609455056" 
                  className="btn-secondary bg-transparent border-white text-white hover:bg-white hover:text-green-900 text-base px-8 py-4"
                >
                  <Phone className="w-5 h-5" />
                  06 09 45 50 56
                </a>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/maintenance.jpg"
                  alt="Technicien Greenter en intervention"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <span className="inline-block text-green-700 font-semibold text-sm uppercase tracking-wider mb-3">
              Simple et rapide
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              Souscrivez votre contrat d'entretien en quelques minutes, sans paperasse.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 md:gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-neutral-50 rounded-2xl p-8 hover:shadow-lg transition-shadow h-full border border-neutral-100">
                  <span className="text-5xl font-bold text-green-100 mb-4 block">
                    {step.number}
                  </span>
                  <h3 className="font-heading text-xl font-bold text-neutral-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-neutral-600">
                    {step.description}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden sm:block absolute top-1/2 -right-4 w-8 h-0.5 bg-green-200" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Configurateur */}
      <section id="configurateur" className="py-16 md:py-20 bg-neutral-50 scroll-mt-8">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <span className="inline-block text-green-700 font-semibold text-sm uppercase tracking-wider mb-3">
              Votre contrat sur mesure
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Composez votre formule
            </h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              Sélectionnez vos équipements et ajoutez des options selon vos besoins. 
              Plus vous cumulez, plus vous économisez.
            </p>
          </div>
          
          <MaintenanceConfigurator services={services} options={options} />
        </div>
      </section>

      {/* Garanties */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <span className="inline-block text-green-700 font-semibold text-sm uppercase tracking-wider mb-3">
              Nos engagements
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Pourquoi nous faire confiance ?
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {guarantees.map((guarantee, index) => {
              const Icon = guarantee.icon
              return (
                <div key={index} className="bg-neutral-50 rounded-xl p-6 hover:shadow-lg transition-shadow text-center border border-neutral-100">
                  <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-green-600" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-neutral-900 mb-2">
                    {guarantee.title}
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    {guarantee.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Avis Google */}
      <GoogleReviewsCarousel className="bg-neutral-50" />

      {/* Certifications */}
      <Certifications />

      {/* Bandeau contact */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-green-700 to-green-800">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-3">
            Une question sur nos contrats ?
          </h3>
          <p className="text-green-100 mb-6">
            Notre équipe est disponible du lundi au vendredi de 9h à 18h
          </p>
          <a 
            href="tel:+33609455056" 
            className="inline-flex items-center gap-3 bg-white text-green-800 font-semibold text-lg px-8 py-4 rounded-full hover:bg-green-50 transition-colors shadow-lg"
          >
            <Phone className="w-5 h-5" />
            06 09 45 50 56
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="text-center mb-12">
            <span className="inline-block text-green-700 font-semibold text-sm uppercase tracking-wider mb-3">
              Questions fréquentes
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Tout savoir sur l'entretien
            </h2>
          </div>
          <MaintenanceFAQ />
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-green-900 via-green-800 to-emerald-900">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Prêt à protéger vos équipements ?
          </h2>
          <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
            Configurez votre contrat en 2 minutes. Sans engagement, résiliable à tout moment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#configurateur" 
              className="btn-primary text-base px-8 py-4"
            >
              Configurer mon contrat
              <ArrowDown className="w-5 h-5" />
            </a>
            <a 
              href="tel:+33609455056" 
              className="btn-secondary bg-transparent border-white text-white hover:bg-white hover:text-green-900 text-base px-8 py-4"
            >
              <Phone className="w-5 h-5" />
              06 09 45 50 56
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
