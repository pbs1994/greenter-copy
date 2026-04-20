import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Maintenance & Conformité | Entretien PAC & Solaire | Greenter",
  description: "Entretien obligatoire pompe à chaleur et panneaux solaires. Contrats de maintenance, dépannage rapide, mise en conformité. Intervention sous 48h partout en France. Devis gratuit.",
  keywords: [
    "entretien pompe à chaleur",
    "maintenance PAC",
    "entretien panneaux solaires",
    "contrat entretien",
    "dépannage PAC",
    "mise en conformité",
    "SAV pompe à chaleur",
    "révision annuelle",
    "entretien obligatoire",
    "Consuel",
  ],
  openGraph: {
    title: "Maintenance & Conformité | Entretien Équipements | Greenter",
    description: "Contrats d'entretien PAC et solaire. Dépannage sous 48h. Mise en conformité. Techniciens certifiés.",
    url: "https://www.greenter.fr/services/maintenance",
    siteName: "Greenter",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "https://www.greenter.fr/maintenance.jpg",
        width: 1200,
        height: 630,
        alt: "Maintenance équipements Greenter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maintenance & Conformité | Greenter",
    description: "Entretien PAC et solaire. Dépannage rapide. Contrats sur mesure.",
    images: ["https://www.greenter.fr/maintenance.jpg"],
  },
  alternates: {
    canonical: "https://www.greenter.fr/services/maintenance",
  },
}

export default function MaintenanceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
