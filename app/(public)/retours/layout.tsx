import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Conditions de retour et rétractation | Greenter",
  description: "Conditions de retour et droit de rétractation des produits Greenter : délai légal de 14 jours avant installation, procédure, remboursement et contacts. Informations claires pour commander sereinement votre équipement de rénovation énergétique.",
  robots: { index: true, follow: true },
}

export default function RetoursLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
