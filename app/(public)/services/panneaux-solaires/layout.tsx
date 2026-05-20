import type { Metadata } from "next"
import { ServiceSchema } from "@/components/schemas/ServiceSchema"
import { BreadcrumbSchema } from "@/components/schemas/BreadcrumbSchema"
import { FAQPageSchema } from "@/components/schemas/FAQPageSchema"

export const metadata: Metadata = {
  title: "Installation Panneaux Solaires | Devis Gratuit | Greenter",
  description: "Installation de panneaux solaires photovoltaïques partout en France. Autoconsommation et revente surplus. Certifié RGE QualiPV. Jusqu'à 70% d'économies. Prime autoconsommation incluse.",
  keywords: [
    "panneaux solaires",
    "photovoltaïque",
    "installation solaire",
    "autoconsommation",
    "panneau solaire prix",
    "prime autoconsommation",
    "EDF OA",
    "revente électricité",
    "énergie solaire",
    "QualiPV",
    "installateur RGE",
    "kWc",
  ],
  openGraph: {
    title: "Installation Panneaux Solaires | Autoconsommation | Greenter",
    description: "Produisez votre propre électricité. Installation certifiée RGE QualiPV. Jusqu'à 70% d'économies sur votre facture. Étude gratuite.",
    url: "https://www.greenter.fr/services/panneaux-solaires",
    siteName: "Greenter",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "https://www.greenter.fr/solaire.jpg",
        width: 1200,
        height: 630,
        alt: "Installation panneaux solaires Greenter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Installation Panneaux Solaires | Greenter",
    description: "Installation de panneaux solaires photovoltaïques par Greenter, certifié RGE QualiPV : autoconsommation, revente du surplus à EDF OA, jusqu'à 70% d'économies. Étude gratuite sous 48h.",
    images: ["https://www.greenter.fr/solaire.jpg"],
  },
  alternates: {
    canonical: "https://www.greenter.fr/services/panneaux-solaires",
  },
}

const breadcrumbItems = [
  { name: "Accueil", url: "https://www.greenter.fr" },
  { name: "Services", url: "https://www.greenter.fr/services" },
  { name: "Panneaux solaires", url: "https://www.greenter.fr/services/panneaux-solaires" },
]

const faqs = [
  { question: "Les panneaux solaires sont-ils rentables en France ?", answer: "Oui, même en Île-de-France. L'ensoleillement est suffisant pour une rentabilité en 7 à 10 ans avec batterie. Les panneaux ont une durée de vie de 25 à 30 ans." },
  { question: "Quelle puissance installer pour ma maison ?", answer: "Pour une maison de 100m², nous recommandons généralement 6 kWc (16 panneaux). Notre étude gratuite détermine le dimensionnement optimal selon votre consommation réelle." },
  { question: "Quelles sont les aides pour le solaire en 2026 ?", answer: "Prime à l'autoconsommation de 80€/kWc + TVA réduite à 10%. Le tarif de rachat du surplus est passé à 4 cts/kWh depuis mars 2025." },
  { question: "Revente ou stockage batterie en 2026 ?", answer: "Avec le tarif de rachat à 4 cts/kWh, la batterie est devenue la solution la plus rentable — vous consommez à 25 cts/kWh au lieu de revendre à 4 cts." },
  { question: "Faut-il une autorisation pour installer des panneaux ?", answer: "Une déclaration préalable de travaux en mairie est obligatoire. Nous gérons toutes les démarches : mairie, Enedis, EDF OA, Consuel." },
]

export default function PanneauxSolairesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ServiceSchema
        name="Installation Panneaux Solaires Photovoltaïques"
        description="Installation de panneaux solaires photovoltaïques partout en France. Autoconsommation et revente surplus. Certifié RGE QualiPV."
        url="https://www.greenter.fr/services/panneaux-solaires"
        image="https://www.greenter.fr/solaire.jpg"
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      <FAQPageSchema items={faqs} />
      {children}
    </>
  )
}
