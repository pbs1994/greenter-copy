import type { Metadata } from "next";
import { fetchGoogleReviews } from "@/lib/google-places";
import { PACLanding } from "./PACLanding";

export const metadata: Metadata = {
  title: "Installation Pompe à Chaleur | Devis Gratuit 48h — Greenter",
  description: "Réduisez votre facture de chauffage jusqu'à 70% avec une pompe à chaleur. Certifié RGE. Visite technique gratuite. Devis sous 48h. Aides jusqu'à 5 000€.",
  robots: { index: false, follow: false },
};

export default async function PACLandingPage() {
  const reviewsData = await fetchGoogleReviews();
  return (
    <PACLanding
      rating={reviewsData.rating > 0 ? reviewsData.rating : 4.9}
      reviewCount={reviewsData.reviewCount > 0 ? reviewsData.reviewCount : 47}
    />
  );
}
