import type { Metadata } from "next";
import { SolaireLanding } from "./SolaireLanding";

export const metadata: Metadata = {
  title: "Panneaux Solaires B2B en Leasing | 0€ d'investissement — Greenter",
  description: "Greenter finance, installe et exploite vos panneaux solaires. Réduisez votre facture d'électricité de 30 à 50%, respectez la Loi APER et le Décret Tertiaire. Étude gratuite sous 24h.",
  robots: { index: false, follow: false },
};

export default function SolaireLandingPage() {
  return <SolaireLanding />;
}
