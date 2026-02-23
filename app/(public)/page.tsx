import { Hero } from "@/components/Hero"
import { Services } from "@/components/Services"
import { ProductShowcase } from "@/components/ProductShowcase"
import { Certifications } from "@/components/Certifications"
import { Banner } from "@/components/Banner"
import { FAQ } from "@/components/FAQ"
import GoogleReviewsCarousel from "@/components/GoogleReviewsCarousel"
import ServiceAreaSection from "@/components/ServiceAreaSection"

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
