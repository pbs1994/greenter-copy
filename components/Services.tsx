import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Sun, ShieldCheck, Wrench } from "lucide-react"

const services = [
  {
    image: "/audit.png",
    icon: "/audit-icon.svg",
    iconSize: 40,
    isCustomIcon: true,
    title: "Audit énergétique & conseil",
    description: "Analyse complète de votre logement ou bâtiment afin d'identifier les pertes d'énergie et définir les solutions les plus efficaces pour réduire vos consommations et vos factures.",
    href: "/services/audit",
  },
  {
    image: "/installation.jpg",
    icon: Sun,
    iconSize: 28,
    isCustomIcon: false,
    title: "Installation de solutions énergétiques",
    description: "Installation de panneaux solaires photovoltaïques et de pompes à chaleur performantes, adaptées à vos besoins, pour produire et consommer une énergie plus propre et plus économique.",
    href: "/services/installation",
  },
  {
    image: "/isolation.jpg",
    icon: "/isolation-icon.svg",
    iconSize: 20,
    isCustomIcon: true,
    title: "Isolation & performance thermique",
    description: "Travaux d'isolation des murs, combles, sols et toitures pour améliorer le confort thermique et limiter durablement les déperditions énergétiques.",
    href: "/services/isolation",
  },
  {
    image: "/conformite.jpg",
    icon: ShieldCheck,
    iconSize: 28,
    isCustomIcon: false,
    title: "Conformité & mise en service",
    description: "Vérification, contrôle et mise en service des installations afin de garantir leur conformité, leur sécurité et leur performance selon les normes en vigueur.",
    href: "/services/conformite",
  },
  {
    image: "/maintenance.jpg",
    icon: Wrench,
    iconSize: 28,
    isCustomIcon: false,
    title: "Maintenance & contrats d'entretien",
    description: "Entretien et maintenance régulière de vos équipements énergétiques pour assurer leur bon fonctionnement, prolonger leur durée de vie et maintenir un rendement optimal.",
    href: "/services/maintenance",
  },
]

export function Services() {
  return (
    <section className="py-16 md:py-24 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block text-green-700 font-semibold text-sm uppercase tracking-wider mb-3">
            Nos expertises
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
            Nos services en efficacité énergétique
          </h2>
          <p className="text-neutral-600 text-lg max-w-4xl mx-auto">
            Greenter accompagne particuliers et professionnels dans tous leurs projets de rénovation 
            et d&apos;optimisation énergétique. De l&apos;analyse initiale à l&apos;entretien des installations, 
            nous proposons des solutions complètes, performantes et durables.
          </p>
        </div>

        {/* Services Grid - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.slice(0, 3).map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>

        {/* Second row - 2 cards centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-6 lg:mt-8 max-w-4xl mx-auto">
          {services.slice(3, 5).map((service, index) => (
            <ServiceCard key={index + 3} service={service} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link href="/contact" className="btn-primary text-base">
            Demander un devis gratuit
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

type ServiceType = typeof services[0]

function ServiceCard({ service }: { service: ServiceType }) {
  return (
    <Link 
      href={service.href}
      className="group bg-gradient-to-b from-green-50 to-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 ring-1 ring-green-200 hover:ring-green-400"
    >
      {/* Image */}
      <div className="relative h-48 md:h-52 overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      {/* Content */}
      <div className="px-6 pb-6 pt-10 text-center relative">
        {/* Icon - positioned between image and content */}
        <div className="absolute -top-7 left-1/2 -translate-x-1/2">
          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg ring-2 ring-green-500 group-hover:ring-teal-500 transition-colors">
            {service.isCustomIcon ? (
              <Image
                src={service.icon as string}
                alt=""
                width={service.iconSize}
                height={service.iconSize}
                className="object-contain"
              />
            ) : (
              <ServiceIcon Icon={service.icon as typeof Sun} />
            )}
          </div>
        </div>
        
        {/* Title */}
        <h3 className="font-heading text-lg font-bold text-neutral-900 group-hover:text-green-700 transition-colors mt-2 mb-3">
          {service.title}
        </h3>
        
        {/* Description */}
        <p className="text-neutral-600 text-sm leading-relaxed mb-4">
          {service.description}
        </p>

        {/* Link */}
        <span className="inline-flex items-center gap-1 text-green-700 font-semibold text-sm group-hover:text-teal-600 transition-colors">
          En savoir plus
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  )
}

function ServiceIcon({ Icon }: { Icon: typeof Sun }) {
  return <Icon className="w-7 h-7 text-green-600" />
}
