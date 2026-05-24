import Image from "next/image"

export default function HeroImage() {
  return (
    <Image
      src="/hero-maison-renovee.jpg"
      alt="Couple heureux devant leur maison rénovée avec panneaux solaires et pompe à chaleur en Île-de-France"
      fill
      priority
      sizes="(max-width: 1024px) 100vw, 50vw"
      className="object-cover object-right"
    />
  )
}
