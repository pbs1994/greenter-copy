import { Phone, Shield, Clock, Wrench } from "lucide-react"
import { ServiceSchema } from "@/components/schemas/ServiceSchema"
import { BreadcrumbSchema } from "@/components/schemas/BreadcrumbSchema"
import { FAQPageSchema } from "@/components/schemas/FAQPageSchema"
import { MaintenanceConfigurator } from "@/components/MaintenanceConfigurator"
import { MaintenanceFAQ } from "./MaintenanceFAQ"
import { faqs } from "./faqData"
import { createSupabaseServerClient } from "@/lib/supabase-server"
import { formatEUR } from "@/lib/format"
import type { MaintenanceService, MaintenanceOption } from "@/types/maintenance"

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

      {/* Header avec fond moderne */}
      <section className="relative bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 pt-16 pb-12 overflow-hidden">
        {/* Éléments décoratifs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/5 rounded-full" />
        
        <div className="container mx-auto max-w-6xl px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-green-100 text-sm font-medium px-4 py-2 rounded-full mb-6 border border-white/10">
            <Wrench className="w-4 h-4" />
            Entretien obligatoire PAC & Chaudière
          </div>
          
          <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Protégez vos équipements,<br />
            <span className="text-green-400">simplifiez-vous la vie</span>
          </h1>
          
          <p className="text-green-100/80 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Composez votre contrat en 2 minutes. 
            On vous rappelle sous 24h pour planifier l'intervention.
          </p>

          {/* Mini badges */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            <div className="flex items-center gap-2 text-white/90">
              <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-green-400" />
              </div>
              <span className="text-sm font-medium">Sans engagement</span>
            </div>
            <div className="flex items-center gap-2 text-white/90">
              <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                <Clock className="w-4 h-4 text-green-400" />
              </div>
              <span className="text-sm font-medium">Contact sous 24h</span>
            </div>
            <div className="flex items-center gap-2 text-white/90">
              <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                <Wrench className="w-4 h-4 text-green-400" />
              </div>
              <span className="text-sm font-medium">Techniciens certifiés</span>
            </div>
          </div>
        </div>
      </section>

      {/* Configurateur */}
      <section className="py-12 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <MaintenanceConfigurator services={services} options={options} />
        </div>
      </section>

      {/* Bandeau contact */}
      <section className="py-10 bg-gradient-to-r from-green-700 to-green-800">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <p className="text-green-100 mb-3">Une question sur nos contrats ?</p>
          <a 
            href="tel:+33609455056" 
            className="inline-flex items-center gap-3 bg-white text-green-800 font-semibold text-lg px-6 py-3 rounded-full hover:bg-green-50 transition-colors"
          >
            <Phone className="w-5 h-5" />
            06 09 45 50 56
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto max-w-3xl px-4">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-neutral-900 text-center mb-10">
            Questions fréquentes
          </h2>
          <MaintenanceFAQ />
        </div>
      </section>
    </main>
  )
}
