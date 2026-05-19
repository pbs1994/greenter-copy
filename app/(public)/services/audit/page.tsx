import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle, FileSearch, Zap, TrendingDown, Shield, Phone, ChevronDown, ClipboardList, BarChart3, Lightbulb, FileText } from "lucide-react"
import { ServiceSchema } from "@/components/schemas/ServiceSchema"
import { BreadcrumbSchema } from "@/components/schemas/BreadcrumbSchema"
import { FAQPageSchema } from "@/components/schemas/FAQPageSchema"
import ServiceAreaSection from "@/components/ServiceAreaSection"

const auditSteps = [
  {
    icon: ClipboardList,
    title: "Analyse du bâti",
    description: "Étude de la structure, des matériaux, de l'isolation existante et des menuiseries.",
  },
  {
    icon: BarChart3,
    title: "Bilan énergétique",
    description: "Analyse de vos consommations, équipements de chauffage et production d'eau chaude.",
  },
  {
    icon: FileSearch,
    title: "Diagnostic thermique",
    description: "Identification des ponts thermiques et déperditions par caméra thermique.",
  },
  {
    icon: Lightbulb,
    title: "Recommandations",
    description: "Plan d'action priorisé avec estimation des économies et des aides disponibles.",
  },
]

const benefits = [
  {
    icon: TrendingDown,
    title: "Identifiez vos pertes",
    description: "Localisez précisément les sources de gaspillage énergétique de votre logement.",
  },
  {
    icon: Zap,
    title: "Priorisez vos travaux",
    description: "Sachez par où commencer pour maximiser le retour sur investissement.",
  },
  {
    icon: FileText,
    title: "Accédez aux aides",
    description: "L'audit est obligatoire pour MaPrimeRénov' Parcours accompagné.",
  },
  {
    icon: Shield,
    title: "Valorisez votre bien",
    description: "Améliorez votre DPE et la valeur de votre patrimoine immobilier.",
  },
]

const obligations = [
  {
    title: "Vente de passoire thermique",
    description: "Depuis avril 2023, l'audit énergétique est obligatoire pour vendre une maison classée F ou G.",
    mandatory: true,
  },
  {
    title: "MaPrimeRénov' Parcours accompagné",
    description: "L'audit est requis pour bénéficier des aides à la rénovation globale (gain de 2 classes DPE minimum).",
    mandatory: true,
  },
  {
    title: "Rénovation performante",
    description: "Recommandé avant tout projet de rénovation pour identifier les travaux prioritaires.",
    mandatory: false,
  },
]

const deliverables = [
  "État des lieux complet du bâti",
  "Analyse des consommations énergétiques",
  "Identification des déperditions thermiques",
  "Scénarios de travaux chiffrés",
  "Estimation des économies d'énergie",
  "Simulation des aides financières",
  "Planning de travaux recommandé",
  "Projection du nouveau DPE",
]

const faqs = [
  {
    question: "Quelle est la différence entre DPE et audit énergétique ?",
    answer: "Le DPE (Diagnostic de Performance Énergétique) donne une note de A à G et est obligatoire pour toute vente ou location. L'audit énergétique est plus complet : il analyse en détail les déperditions et propose des scénarios de travaux chiffrés avec les économies attendues.",
  },
  {
    question: "L'audit énergétique est-il obligatoire ?",
    answer: "Oui, depuis avril 2023 pour la vente de maisons classées F ou G (passoires thermiques). Il sera étendu aux classes E en 2025 et D en 2034. Il est aussi obligatoire pour MaPrimeRénov' Parcours accompagné.",
  },
  {
    question: "Combien coûte un audit énergétique ?",
    answer: "Un audit énergétique coûte entre 800€ et 1 500€ selon la taille du logement. Il peut être financé jusqu'à 500€ par MaPrimeRénov' selon vos revenus. Greenter propose l'audit offert pour tout projet de rénovation globale.",
  },
  {
    question: "Combien de temps dure un audit ?",
    answer: "La visite sur site dure 2 à 3 heures. Le rapport complet est remis sous 10 à 15 jours. Il comprend l'analyse détaillée et les scénarios de travaux.",
  },
  {
    question: "Qui peut réaliser un audit énergétique ?",
    answer: "L'audit doit être réalisé par un professionnel certifié RGE (Reconnu Garant de l'Environnement) avec une qualification spécifique audit. Greenter dispose de cette certification.",
  },
]

export default function AuditPage() {
  const breadcrumbItems = [
    { name: "Accueil", url: "https://www.greenter.fr" },
    { name: "Services", url: "https://www.greenter.fr/services" },
    { name: "Audit énergétique", url: "https://www.greenter.fr/services/audit" }
  ]

  return (
    <main>
      <ServiceSchema
        name="Audit Énergétique"
        description="Audit énergétique certifié RGE partout en France. Obligatoire pour vente passoire thermique (F/G) et MaPrimeRénov' Parcours accompagné. Rapport détaillé avec scénarios de travaux. Devis gratuit."
        url="https://www.greenter.fr/services/audit"
        image="https://www.greenter.fr/audit.jpg"
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      <FAQPageSchema items={faqs} />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-green-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }} />
        </div>

        <div className="container mx-auto max-w-6xl px-4 py-16 md:py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-green-500/20 text-green-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
                <FileSearch className="w-4 h-4" />
                Auditeur certifié RGE
              </span>
              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                Audit énergétique : identifiez vos pertes d'énergie
              </h1>
              <p className="text-slate-300 text-lg leading-relaxed mb-8">
                Diagnostic complet de votre logement avec plan d'action personnalisé. 
                Obligatoire pour la vente des passoires thermiques et MaPrimeRénov' Parcours accompagné.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 text-white">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Rapport détaillé</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Scénarios chiffrés</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Aides simulées</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="btn-primary text-base px-8 py-4">
                  Réserver mon audit
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a href="tel:+33609455056" className="btn-secondary bg-transparent border-white text-white hover:bg-white hover:text-slate-900 text-base px-8 py-4">
                  <Phone className="w-5 h-5" />
                  06 09 45 50 56
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                <Image
                  src="/audit.jpg"
                  alt="Audit énergétique par Greenter"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Badge */}
              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl p-4 shadow-xl hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <FileText className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold text-neutral-900">Rapport complet</p>
                    <p className="text-sm text-neutral-600">sous 15 jours</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Méthodologie */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <span className="inline-block text-green-700 font-semibold text-sm uppercase tracking-wider mb-3">
              Notre méthodologie
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Un audit en 4 étapes
            </h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              Une analyse complète pour comprendre votre logement et identifier les travaux prioritaires.
            </p>
          </div>

          {/* Timeline verticale */}
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Ligne verticale */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-green-200" />

              <div className="space-y-8">
                {auditSteps.map((step, index) => {
                  const Icon = step.icon
                  return (
                    <div key={index} className="relative flex gap-6">
                      <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center shrink-0 z-10 shadow-lg">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="bg-green-50 rounded-xl p-5 flex-1">
                        <span className="text-green-600 font-bold text-sm">Étape {index + 1}</span>
                        <h3 className="font-heading text-lg font-bold text-neutral-900 mt-1 mb-2">
                          {step.title}
                        </h3>
                        <p className="text-neutral-600 text-sm">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Obligations */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <span className="inline-block text-green-700 font-semibold text-sm uppercase tracking-wider mb-3">
              Réglementation
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Quand l'audit est-il obligatoire ?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {obligations.map((item, index) => (
              <div 
                key={index}
                className={`rounded-xl p-6 ${
                  item.mandatory 
                    ? 'bg-red-50 ring-2 ring-red-200' 
                    : 'bg-white ring-1 ring-neutral-200'
                }`}
              >
                <span className={`inline-block text-xs font-bold uppercase tracking-wider px-2 py-1 rounded mb-3 ${
                  item.mandatory 
                    ? 'bg-red-100 text-red-700' 
                    : 'bg-green-100 text-green-700'
                }`}>
                  {item.mandatory ? 'Obligatoire' : 'Recommandé'}
                </span>
                <h3 className="font-heading text-lg font-bold text-neutral-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-neutral-600 text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <span className="inline-block text-green-700 font-semibold text-sm uppercase tracking-wider mb-3">
              Pourquoi faire un audit
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Les bénéfices de l'audit énergétique
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-neutral-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    {benefit.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Livrables */}
      <section className="py-16 md:py-24 bg-green-900 text-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-green-300 font-semibold text-sm uppercase tracking-wider mb-3">
                Votre rapport
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                Ce que contient votre audit
              </h2>
              <p className="text-green-100 text-lg mb-8">
                Un document complet et exploitable pour planifier votre rénovation 
                et accéder aux aides financières.
              </p>

              <ul className="grid sm:grid-cols-2 gap-3">
                {deliverables.map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
                    <span className="text-green-100">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 text-neutral-900">
              <h3 className="font-heading text-xl font-bold mb-2">
                Tarif audit énergétique
              </h3>
              <p className="text-neutral-600 mb-6">
                Maison individuelle jusqu'à 150m²
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center py-2 border-b border-neutral-100">
                  <span className="text-neutral-600">Audit complet</span>
                  <span className="font-semibold">990 €</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-neutral-100">
                  <span className="text-neutral-600">Aide MaPrimeRénov'*</span>
                  <span className="font-semibold text-green-600">jusqu'à - 500 €</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-lg font-semibold">À partir de</span>
                  <span className="text-2xl font-bold text-green-700">490 €</span>
                </div>
              </div>

              <div className="bg-green-50 rounded-xl p-4 mb-6">
                <p className="text-sm text-green-800 font-medium">
                  💡 Audit offert pour tout projet de rénovation globale avec Greenter
                </p>
              </div>

              <p className="text-xs text-neutral-500 mb-6">
                *Selon revenus du ménage. Nous vous accompagnons dans les démarches.
              </p>

              <Link href="/contact" className="btn-primary w-full justify-center">
                Réserver mon audit
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="text-center mb-12">
            <span className="inline-block text-green-700 font-semibold text-sm uppercase tracking-wider mb-3">
              Questions fréquentes
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Tout savoir sur l'audit énergétique
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                {...(index === 0 ? { open: true } : {})}
                className="group border border-neutral-200 rounded-xl overflow-hidden hover:border-green-300 transition-colors"
              >
                <summary className="w-full flex items-center justify-between p-5 cursor-pointer bg-white hover:bg-green-50 transition-colors list-none">
                  <span className="font-semibold text-neutral-900 pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown className="w-5 h-5 text-green-700 shrink-0 transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <p className="px-5 pb-5 text-neutral-600 leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-slate-800 via-slate-900 to-green-900">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <FileSearch className="w-16 h-16 text-green-400 mx-auto mb-6" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Faites le premier pas vers la rénovation
          </h2>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
            L'audit énergétique est le point de départ de tout projet de rénovation réussi. 
            Prenez rendez-vous avec nos experts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary text-base px-8 py-4">
              Réserver mon audit
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="tel:+33609455056" className="btn-secondary bg-transparent border-white text-white hover:bg-white hover:text-slate-900 text-base px-8 py-4">
              <Phone className="w-5 h-5" />
              06 09 45 50 56
            </a>
          </div>
        </div>
      </section>

      {/* Services complémentaires */}
      <section className="py-12 bg-neutral-50">
        <div className="container mx-auto max-w-6xl px-4">
          <h3 className="font-heading text-xl font-bold text-neutral-900 text-center mb-8">
            Après l'audit, passez à l'action
          </h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <Link href="/services/isolation" className="flex items-center gap-4 p-4 bg-white rounded-xl hover:shadow-md transition-shadow group">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-neutral-900 group-hover:text-green-700 transition-colors">Isolation thermique</p>
                <p className="text-sm text-neutral-500">Priorité n°1 souvent</p>
              </div>
            </Link>
            <Link href="/services/pompe-a-chaleur" className="flex items-center gap-4 p-4 bg-white rounded-xl hover:shadow-md transition-shadow group">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-neutral-900 group-hover:text-green-700 transition-colors">Pompe à chaleur</p>
                <p className="text-sm text-neutral-500">Chauffage performant</p>
              </div>
            </Link>
            <Link href="/services/panneaux-solaires" className="flex items-center gap-4 p-4 bg-white rounded-xl hover:shadow-md transition-shadow group">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <TrendingDown className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-neutral-900 group-hover:text-green-700 transition-colors">Panneaux solaires</p>
                <p className="text-sm text-neutral-500">Produisez votre énergie</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <ServiceAreaSection serviceSlug="audit" title="Audit énergétique près de chez vous" className="bg-white" />
    </main>
  )
}
