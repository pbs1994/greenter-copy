import type { Metadata } from "next";
import { fetchGoogleReviews } from "@/lib/google-places";
import { ChaudiereGazLanding } from "./ChaudiereGazLanding";

export const metadata: Metadata = {
  title: "Dépannage Chaudière Gaz | Intervention Rapide 77, 78, 91 — Greenter",
  description: "Panne de chauffage ou d'eau chaude ? Dépannage de chaudière gaz toutes marques en Île-de-France : Seine-et-Marne (77), Yvelines (78) et Essonne (91). Diagnostic, réparation, prix annoncé avant intervention.",
  robots: { index: false, follow: false },
};

export default async function ChaudiereGazLandingPage() {
  const reviewsData = await fetchGoogleReviews();
  return (
    <ChaudiereGazLanding
      rating={reviewsData.rating > 0 ? reviewsData.rating : 4.9}
      reviewCount={reviewsData.reviewCount > 0 ? reviewsData.reviewCount : 47}
    />
  );
}
