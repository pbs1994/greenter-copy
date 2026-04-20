import type { Metadata } from "next"
import { Hero } from "@/components/Hero"
import { Services } from "@/components/Services"
import { ProductShowcase } from "@/components/ProductShowcase"
import { Certifications } from "@/components/Certifications"
import { Banner } from "@/components/Banner"
import { FAQ } from "@/components/FAQ"
import GoogleReviewsCarousel from "@/components/GoogleReviewsCarousel"
import ServiceAreaSection from "@/components/ServiceAreaSection"

export const metadata: Metadata = {
  title: "Greenter | Rénovation Énergétique en Île-de-France | PAC, Solaire, Isolation",
  description: "Greenter, votre expert en rénovation énergétique : pompe à chaleur, panneaux solaires, isolation thermique et audit énergétique. Devis gratuit, installation certifiée RGE.",
  keywords: ["rénovation énergétique", "pompe à chaleur", "panneaux solaires", "isolation thermique", "audit énergétique", "RGE", "Île-de-France", "Seine-et-Marne"],
  openGraph: {
    title: "Greenter | Rénovation Énergétique",
    description: "Expert en rénovation énergétique : PAC, solaire, isolation. Devis gratuit, certifié RGE.",
    url: "https://www.greenter.fr",
    siteName: "Greenter",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Greenter | Rénovation Énergétique",
    description: "Expert en rénovation énergétique : PAC, solaire, isolation. Devis gratuit, certifié RGE.",
  },
  alternates: {
    canonical: "https://www.greenter.fr",
  },
}

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <ProductShowcase />
      <GoogleReviewsCarousel className="bg-neutral-50" />
      <Certifications />
      <FAQ />
      <ServiceAreaSection className="bg-white" />
      <Banner />
    </main>
  )
}
