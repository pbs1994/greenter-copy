import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Conditions de retour et rétractation | Greenter",
  description: "Politique de retour et droit de rétractation pour vos achats chez Greenter. Délai de 14 jours avant installation.",
  robots: { index: true, follow: true },
}

export default function RetoursLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
