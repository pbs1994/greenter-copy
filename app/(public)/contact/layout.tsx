import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact | Devis Gratuit Rénovation Énergétique | Greenter",
  description: "Contactez Greenter pour votre projet de rénovation énergétique. Devis gratuit sous 48h. Pompe à chaleur, panneaux solaires, isolation. Intervention partout en France. Certifié RGE.",
  keywords: [
    "contact Greenter",
    "devis rénovation énergétique",
    "devis pompe à chaleur",
    "devis panneaux solaires",
    "devis isolation",
    "rénovation énergétique France",
  ],
  openGraph: {
    title: "Contact | Devis Gratuit | Greenter",
    description: "Contactez Greenter pour votre projet de rénovation énergétique : pompe à chaleur, panneaux solaires, isolation, audit. Devis gratuit sous 48h et intervention partout en Île-de-France par des techniciens certifiés RGE.",
    url: "https://www.greenter.fr/contact",
    siteName: "Greenter",
    locale: "fr_FR",
    type: "website",
  },
  alternates: {
    canonical: "https://www.greenter.fr/contact",
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
