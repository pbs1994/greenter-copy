import { Hero } from "@/components/Hero"
import { Services } from "@/components/Services"
import { ProductShowcase } from "@/components/ProductShowcase"
import { Certifications } from "@/components/Certifications"
import { Banner } from "@/components/Banner"
import { FAQ } from "@/components/FAQ"

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <ProductShowcase />
      <Certifications />
      <FAQ />
      <Banner />
    </main>
  )
}
