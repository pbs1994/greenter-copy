import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Politique de confidentialité | GREEN TER - Protection des données RGPD",
  description: "Politique de confidentialité GREEN TER : protection des données personnelles RGPD, cookies, droits des utilisateurs, sécurité paiement Stripe. Conformité e-commerce France.",
  keywords: ["politique de confidentialité", "RGPD", "protection données personnelles", "cookies", "e-commerce France", "sécurité paiement Stripe", "droits utilisateurs RGPD"],
  alternates: {
    canonical: "https://www.greenter.fr/confidentialite",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function ConfidentialiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
