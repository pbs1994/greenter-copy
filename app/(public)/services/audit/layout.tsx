import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Audit Énergétique | Diagnostic Complet | Greenter",
  description: "Audit énergétique certifié RGE partout en France. Obligatoire pour vente passoire thermique (F/G) et MaPrimeRénov' Parcours accompagné. Rapport détaillé avec scénarios de travaux. Devis gratuit.",
  keywords: [
    "audit énergétique",
    "diagnostic énergétique",
    "DPE",
    "passoire thermique",
    "bilan thermique",
    "audit RGE",
    "MaPrimeRénov parcours accompagné",
    "rénovation globale",
    "classe énergétique",
    "performance énergétique",
    "audit obligatoire",
  ],
  openGraph: {
    title: "Audit Énergétique | Diagnostic Certifié RGE | Greenter",
    description: "Audit énergétique certifié RGE par Greenter : diagnostic complet, obligatoire pour vendre un logement F ou G, rapport détaillé avec scénarios de travaux chiffrés, aides MaPrimeRénov' incluses. Devis gratuit.",
    url: "https://www.greenter.fr/services/audit",
    siteName: "Greenter",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "https://www.greenter.fr/audit.png",
        width: 1200,
        height: 630,
        alt: "Audit énergétique Greenter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Audit Énergétique | Greenter",
    description: "Audit énergétique certifié RGE : diagnostic complet, rapport détaillé sous 15 jours, scénarios de travaux chiffrés et aides MaPrimeRénov' intégrées. Devis gratuit.",
    images: ["https://www.greenter.fr/audit.png"],
  },
  alternates: {
    canonical: "https://www.greenter.fr/services/audit",
  },
}

export default function AuditLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
