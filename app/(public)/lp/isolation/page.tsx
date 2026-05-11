import type { Metadata } from "next";
import { fetchGoogleReviews } from "@/lib/google-places";
import { IsolationLanding } from "./IsolationLanding";

export const metadata: Metadata = {
  title: "Isolation à 1€* en 2026 | Combles & Planchers — Greenter",
  description: "Isolez vos combles et planchers bas à partir de 1€* grâce aux aides 2026 (MaPrimeRénov' + CEE bonifiés). Artisan certifié RGE. Devis gratuit sous 48h. Aucune avance de trésorerie.",
  robots: { index: false, follow: false },
};

export default async function IsolationLandingPage() {
  const reviewsData = await fetchGoogleReviews();
  return (
    <IsolationLanding
      rating={reviewsData.rating > 0 ? reviewsData.rating : 4.9}
      reviewCount={reviewsData.reviewCount > 0 ? reviewsData.reviewCount : 47}
    />
  );
}
