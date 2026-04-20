import type { Metadata } from "next"

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

export default function PanneauxSolairesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
