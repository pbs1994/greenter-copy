import { redirect } from "next/navigation"

export default function ProduitsPage() {
  // Avec un seul produit, on redirige directement
  redirect("/produits/kstar-blue-s-6kw")
}
