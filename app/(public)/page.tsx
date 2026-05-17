import type { Metadata } from "next"
import { Hero } from "@/components/Hero"
import { TrustStrip } from "@/components/TrustStrip"
import { Services } from "@/components/Services"
import { QuickEstimate } from "@/components/QuickEstimate"
import { HowItWorks } from "@/components/HowItWorks"
import { ProductShowcase } from "@/components/ProductShowcase"
import { Certifications } from "@/components/Certifications"
import { Banner } from "@/components/Banner"
import { FAQ } from "@/components/FAQ"
import { BlogTeaser } from "@/components/BlogTeaser"
import GoogleReviewsCarousel from "@/components/GoogleReviewsCarousel"
import ServiceAreaSection from "@/components/ServiceAreaSection"
import WhyGreenterSection from "@/components/WhyGreenterSection"
import StickyCTA from "@/components/StickyCTA"

export const metadata: Metadata = {
  title: "Greenter | Rénovation Énergétique RGE — Île-de-France",
  description: "Greenter, votre expert en rénovation énergétique : pompe à chaleur, panneaux solaires, isolation thermique et audit énergétique. Devis gratuit, installation certifiée RGE.",
  keywords: ["rénovation énergétique", "pompe à chaleur", "panneaux solaires", "isolation thermique", "audit énergétique", "RGE", "Île-de-France", "Seine-et-Marne"],
  openGraph: {
    title: "Greenter | Rénovation Énergétique",
    description: "Greenter, expert certifié RGE en rénovation énergétique : pompe à chaleur, panneaux solaires, isolation et audit énergétique. Devis gratuit sous 48h, installations partout en Île-de-France avec aides MaPrimeRénov'.",
    url: "https://www.greenter.fr",
    siteName: "Greenter",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Greenter | Rénovation Énergétique",
    description: "Greenter, expert certifié RGE en rénovation énergétique : pompe à chaleur, panneaux solaires, isolation et audit énergétique. Devis gratuit sous 48h, installations partout en Île-de-France avec aides MaPrimeRénov'.",
  },
  alternates: {
    canonical: "https://www.greenter.fr",
  },
}

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <TrustStrip />
        <Services />
        <QuickEstimate />
        <HowItWorks />
        <ProductShowcase />
        <GoogleReviewsCarousel className="bg-neutral-50" />
        <WhyGreenterSection />
        <Certifications />
        <FAQ />
        <BlogTeaser />
        <ServiceAreaSection className="bg-neutral-50" />
        <Banner />
      </main>
      <StickyCTA />
    </>
  )
}
