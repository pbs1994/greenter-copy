import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Isolation Thermique | Combles, Murs, Planchers | Greenter",
  description: "Isolation thermique de votre maison partout en France. Combles, murs (ITE/ITI), planchers. Certifié RGE. Jusqu'à 30% d'économies. Éligible MaPrimeRénov' et CEE. Devis gratuit.",
  keywords: [
    "isolation thermique",
    "isolation combles",
    "isolation murs",
    "ITE",
    "ITI",
    "isolation extérieure",
    "isolation intérieure",
    "laine de verre",
    "ouate de cellulose",
    "rénovation énergétique",
    "déperdition thermique",
    "MaPrimeRénov isolation",
    "RGE Qualibat",
  ],
  openGraph: {
    title: "Isolation Thermique | Jusqu'à 30% d'économies | Greenter",
    description: "Stoppez les déperditions de chaleur. Isolation combles, murs, planchers. Certifié RGE. Aides déduites du devis.",
    url: "https://greenter.fr/services/isolation",
    siteName: "Greenter",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "https://greenter.fr/isolation.jpg",
        width: 1200,
        height: 630,
        alt: "Isolation thermique Greenter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Isolation Thermique | Greenter",
    description: "Combles, murs, planchers. Certifié RGE. Diagnostic gratuit.",
    images: ["https://greenter.fr/isolation.jpg"],
  },
  alternates: {
    canonical: "https://greenter.fr/services/isolation",
  },
}

export default function IsolationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
