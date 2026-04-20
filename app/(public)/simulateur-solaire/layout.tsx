import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Étude Solaire | Analyse personnalisée de votre projet photovoltaïque",
  description: "Outil d'analyse pour dimensionner votre installation solaire. Production estimée, autoconsommation, aides disponibles. Données officielles T1 2026.",
  openGraph: {
    title: "Étude Solaire | Greenter",
    description: "Simulateur solaire Greenter : analyse personnalisée de votre projet photovoltaïque — production estimée, autoconsommation, rentabilité et aides disponibles, avec les données officielles 2026.",
    type: "website",
    locale: "fr_FR",
  },
}

export default function SimulateurSolaireLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
