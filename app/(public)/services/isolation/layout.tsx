import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Isolation à 1€ en 2026 : Combles & Planchers | Greenter",
  description:
    "Isolation des combles perdus et planchers bas à partir de 1€* partout en France. Profitez des aides MaPrimeRénov' & CEE bonifiés 2026 pour les ménages modestes. Certifié RGE. Devis gratuit ☎ 07 66 97 50 99",
  keywords: [
    "isolation 1 euro",
    "isolation à 1€",
    "isolation combles 1 euro",
    "isolation combles perdus 1 euro",
    "isolation plancher bas 1 euro",
    "isolation 1 euro 2026",
    "aides isolation 2026",
    "MaPrimeRénov isolation",
    "prime CEE isolation",
    "coup de pouce isolation",
    "isolation ménages modestes",
    "artisan RGE isolation",
    "RGE isolation",
    "isolation thermique",
    "isolation combles",
    "isolation murs",
    "ITE",
    "ITI",
  ],
  openGraph: {
    title: "Isolation à 1€ en 2026 | Combles & Planchers | Greenter",
    description:
      "Isolez vos combles et planchers bas à partir de 1€* grâce aux aides 2026 (MaPrimeRénov', CEE bonifiés). Artisan certifié RGE. Devis gratuit sous 48h.",
    url: "https://www.greenter.fr/services/isolation",
    siteName: "Greenter",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "https://www.greenter.fr/isolation.jpg",
        width: 1200,
        height: 630,
        alt: "Isolation des combles par un artisan certifié RGE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Isolation à 1€ en 2026 | Greenter",
    description:
      "Isolation combles et planchers à partir de 1€* avec les aides 2026. Artisan certifié RGE. Devis gratuit.",
    images: ["https://www.greenter.fr/isolation.jpg"],
  },
  alternates: {
    canonical: "https://www.greenter.fr/services/isolation",
  },
}

export default function IsolationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
