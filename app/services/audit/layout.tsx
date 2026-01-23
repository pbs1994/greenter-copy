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
    description: "Identifiez vos pertes d'énergie. Audit obligatoire vente F/G. Rapport complet avec scénarios de travaux et aides.",
    url: "https://greenter.fr/services/audit",
    siteName: "Greenter",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "https://greenter.fr/audit.png",
        width: 1200,
        height: 630,
        alt: "Audit énergétique Greenter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Audit Énergétique | Greenter",
    description: "Diagnostic complet certifié RGE. Rapport détaillé sous 15 jours.",
    images: ["https://greenter.fr/audit.png"],
  },
  alternates: {
    canonical: "https://greenter.fr/services/audit",
  },
}

export default function AuditLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
