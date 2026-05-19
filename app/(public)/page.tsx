import type { Metadata } from "next"
import dynamic from "next/dynamic"
import { Hero } from "@/components/Hero"
import { TrustStrip } from "@/components/TrustStrip"
import { Services } from "@/components/Services"

// Below-fold: code-split to reduce initial JS bundle
const QuickEstimate = dynamic(() =>
  import("@/components/QuickEstimate").then((m) => ({ default: m.QuickEstimate }))
)
const BillComparison = dynamic(() =>
  import("@/components/BillComparison").then((m) => ({ default: m.BillComparison }))
)
const HowItWorks = dynamic(() =>
  import("@/components/HowItWorks").then((m) => ({ default: m.HowItWorks }))
)
const ProductShowcase = dynamic(() =>
  import("@/components/ProductShowcase").then((m) => ({ default: m.ProductShowcase }))
)
const GoogleReviewsCarousel = dynamic(() => import("@/components/GoogleReviewsCarousel"))
const WhyGreenterSection = dynamic(() => import("@/components/WhyGreenterSection"))
const Certifications = dynamic(() =>
  import("@/components/Certifications").then((m) => ({ default: m.Certifications }))
)
const FAQ = dynamic(() =>
  import("@/components/FAQ").then((m) => ({ default: m.FAQ }))
)
const BlogTeaser = dynamic(() =>
  import("@/components/BlogTeaser").then((m) => ({ default: m.BlogTeaser }))
)
const ServiceAreaSection = dynamic(() => import("@/components/ServiceAreaSection"))
const Banner = dynamic(() =>
  import("@/components/Banner").then((m) => ({ default: m.Banner }))
)
const StickyCTA = dynamic(() => import("@/components/StickyCTA"))

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
        <BillComparison />
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
