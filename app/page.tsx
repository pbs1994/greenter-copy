import { Hero } from "@/components/Hero"
import { Services } from "@/components/Services"
import { Partners } from "@/components/Partners"
import { Product } from "@/components/Product"
import { Banner } from "@/components/Banner"

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Partners />
      <Product />
      <Banner />
    </main>
  )
}
