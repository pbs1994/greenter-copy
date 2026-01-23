import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Installation Pompe à Chaleur | Devis Gratuit | Greenter",
  description: "Installation de pompe à chaleur air-eau et air-air partout en France. Certifié RGE QualiPAC. Jusqu'à 70% d'économies sur votre chauffage. Éligible MaPrimeRénov'. Devis gratuit sous 48h.",
  keywords: [
    "pompe à chaleur",
    "PAC air-eau",
    "PAC air-air",
    "installation pompe à chaleur",
    "chauffage pompe à chaleur",
    "prix pompe à chaleur",
    "aide pompe à chaleur",
    "MaPrimeRénov pompe à chaleur",
    "remplacement chaudière",
    "chauffage économique",
    "QualiPAC",
    "installateur RGE",
  ],
  openGraph: {
    title: "Installation Pompe à Chaleur | Jusqu'à 70% d'économies | Greenter",
    description: "Divisez vos factures de chauffage par 3 avec une pompe à chaleur. Installation certifiée RGE, éligible aux aides. Devis gratuit.",
    url: "https://greenter.fr/services/pompe-a-chaleur",
    siteName: "Greenter",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "https://greenter.fr/pac.jpg",
        width: 1200,
        height: 630,
        alt: "Installation pompe à chaleur Greenter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Installation Pompe à Chaleur | Greenter",
    description: "Jusqu'à 70% d'économies sur votre chauffage. Certifié RGE. Devis gratuit sous 48h.",
    images: ["https://greenter.fr/pac.jpg"],
  },
  alternates: {
    canonical: "https://greenter.fr/services/pompe-a-chaleur",
  },
}

export default function PompeAChaleurLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
