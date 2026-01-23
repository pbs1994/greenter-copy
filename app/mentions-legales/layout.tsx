import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mentions légales | GREEN TER - Site e-commerce France",
  description: "Mentions légales du site GREEN TER : informations légales de l'entreprise, conditions d'utilisation, hébergeur, responsable de publication. Conformité droit français et e-commerce.",
  keywords: ["mentions légales", "mentions légales site France", "informations légales entreprise", "conditions utilisation site", "GREEN TER", "e-commerce France"],
  alternates: {
    canonical: "https://greenter.fr/mentions-legales",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function MentionsLegalesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
