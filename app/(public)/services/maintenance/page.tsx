import { Phone, Shield, Clock, Award, Calendar, ArrowDown } from "lucide-react"
import { ServiceSchema } from "@/components/schemas/ServiceSchema"
import { BreadcrumbSchema } from "@/components/schemas/BreadcrumbSchema"
import { FAQPageSchema } from "@/components/schemas/FAQPageSchema"
import { faqs } from "./faqData"
import { createSupabaseServerClient } from "@/lib/supabase-server"
import { formatEUR } from "@/lib/format"
import GoogleReviewsCarousel from "@/components/GoogleReviewsCarousel"
import { Certifications } from "@/components/Certifications"
import type { MaintenanceService, MaintenanceOption } from "@/types/maintenance"

// New redesigned components
import { MaintenanceConfiguratorProvider } from "@/components/maintenance/MaintenanceConfiguratorContext"
import MaintenanceHero from "@/components/maintenance/MaintenanceHero"
import { MaintenanceServiceCatalog } from "@/components/maintenance/MaintenanceServiceCatalog"
import { MaintenanceDiscountBanner } from "@/components/maintenance/MaintenanceDiscountBanner"
import { MaintenanceOptionsSection } from "@/components/maintenance/MaintenanceOptionsSection"
import { MaintenanceFloatingPanel } from "@/components/maintenance/MaintenanceFloatingPanel"
import { MaintenanceFAQSection } from "@/components/maintenance/MaintenanceFAQSection"
import { ServiceDetailModal } from "@/components/maintenance/ServiceDetailModal"
import { OptionDetailModal } from "@/components/maintenance/OptionDetailModal"

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
  // Requirement 8.4: Conserver la récupération des données depuis Supabase
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

      {/* Wrap all interactive content with the provider */}
      <MaintenanceConfiguratorProvider services={services} options={options}>
        {/* Hero Section - New redesigned component */}
        <MaintenanceHero />

        {/* Configurateur Section */}
        <section id="configurateur" className="scroll-mt-8">
          {/* Service Catalog */}
          <MaintenanceServiceCatalog />

          {/* Discount Banner */}
          <MaintenanceDiscountBanner className="bg-white" />

          {/* Options Section */}
          <MaintenanceOptionsSection />
        </section>

        {/* Guarantees Section - Requirement 8.5: Keep existing structure */}
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

        {/* Google Reviews - Requirement 8.5: Keep existing */}
        <GoogleReviewsCarousel className="bg-neutral-50" />

        {/* Certifications - Requirement 8.5: Keep existing */}
        <Certifications />

        {/* Contact Banner */}
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

        {/* FAQ Section - New redesigned component */}
        <MaintenanceFAQSection />

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

        {/* Floating Panel - Always visible */}
        <MaintenanceFloatingPanel />

        {/* Modals */}
        <ServiceDetailModal />
        <OptionDetailModal />
      </MaintenanceConfiguratorProvider>
    </main>
  )
}
