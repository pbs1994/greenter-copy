import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Isolation à 1€ en 2026 : Combles & Planchers | Seine-et-Marne (77) | Greenter",
  description:
    "Isolation des combles perdus et planchers bas à partir de 1€* en Seine-et-Marne (77). Profitez des aides MaPrimeRénov' & CEE bonifiés 2026 pour les ménages modestes. Certifié RGE Qualibat. Devis gratuit ☎ 07 66 97 50 99",
  keywords: [
    "isolation 1 euro",
    "isolation à 1€",
    "isolation combles 1 euro",
    "isolation combles perdus 1 euro",
    "isolation plancher bas 1 euro",
    "isolation 1 euro 2026",
    "isolation 1 euro Seine-et-Marne",
    "isolation 1 euro 77",
    "isolation combles Ozoir-la-Ferrière",
    "isolation combles Roissy-en-Brie",
    "isolation combles Pontault-Combault",
    "isolation combles Brie-Comte-Robert",
    "aides isolation 2026",
    "MaPrimeRénov isolation",
    "prime CEE isolation",
    "coup de pouce isolation",
    "isolation pas cher 77",
    "isolation ménages modestes",
    "artisan RGE isolation",
    "RGE Qualibat isolation",
  ],
  openGraph: {
    title: "Isolation à 1€ en 2026 | Combles & Planchers | Seine-et-Marne (77)",
    description:
      "Isolez vos combles et planchers bas à partir de 1€* grâce aux aides 2026 (MaPrimeRénov', CEE bonifiés). Artisan RGE Qualibat en Seine-et-Marne. Devis gratuit sous 48h.",
    url: "https://greenter.fr/services/isolation-1-euro",
    siteName: "Greenter",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "https://greenter.fr/isolation.jpg",
        width: 1200,
        height: 630,
        alt: "Isolation des combles à 1 euro en Seine-et-Marne",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Isolation à 1€ en 2026 | Greenter",
    description:
      "Isolation combles et planchers à partir de 1€* avec les aides 2026. Artisan RGE en Seine-et-Marne. Devis gratuit.",
    images: ["https://greenter.fr/isolation.jpg"],
  },
  alternates: {
    canonical: "https://greenter.fr/services/isolation-1-euro",
  },
}

export default function Isolation1EuroLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
