import type { Metadata } from "next";
import Script from "next/script";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { fetchGoogleReviews } from "@/lib/google-places";
import { CookieBanner } from "@/components/CookieBanner";
import { VideoPreloader } from "@/components/VideoPreloader";
import WhatsAppButton from "@/components/WhatsAppButton";

const GTM_ID = "GTM-T8J97XK3";

export const metadata: Metadata = {
  title: "Greenter | Rénovation Énergétique RGE en France",
  description: "Expert certifié RGE : installation pompe à chaleur, panneaux solaires, isolation thermique et audit énergétique. Économisez jusqu'à 70% sur vos factures. Devis gratuit sous 48h.",
  keywords: ["rénovation énergétique", "pompe à chaleur", "panneaux solaires", "isolation thermique", "audit énergétique", "MaPrimeRénov", "RGE", "économies énergie", "chauffage", "autoconsommation"],
  authors: [{ name: "Greenter" }],
  creator: "Greenter",
  publisher: "Greenter",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://www.greenter.fr",
    siteName: "Greenter",
    title: "Greenter | Rénovation Énergétique RGE en France",
    description: "Expert certifié RGE : pompe à chaleur, panneaux solaires, isolation. Économisez jusqu'à 70% sur vos factures. Devis gratuit.",
    images: [
      {
        url: "https://www.greenter.fr/twitter_card.jpg",
        width: 1200,
        height: 630,
        alt: "Greenter - Rénovation énergétique",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Greenter | Rénovation Énergétique RGE en France",
    description: "Expert certifié RGE : pompe à chaleur, panneaux solaires, isolation et audit énergétique. Économisez jusqu'à 70% sur vos factures avec MaPrimeRénov'. Devis gratuit sous 48h en Île-de-France.",
    images: ["https://www.greenter.fr/twitter_card.jpg"],
  },
  alternates: {
    canonical: "https://www.greenter.fr",
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
    other: {
      "msvalidate.01": process.env.BING_SITE_VERIFICATION || "",
    },
  },
  metadataBase: new URL("https://www.greenter.fr"),
};

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const reviewsData = await fetchGoogleReviews()
  const ratingValue = reviewsData.rating > 0 ? reviewsData.rating : 4.8
  const reviewCount = reviewsData.reviewCount > 0 ? reviewsData.reviewCount : 20

  return (
    <>
      <JsonLd ratingValue={ratingValue} reviewCount={reviewCount} />
      <link rel="preconnect" href={process.env.NEXT_PUBLIC_SUPABASE_URL || ''} />
      <link rel="dns-prefetch" href={process.env.NEXT_PUBLIC_SUPABASE_URL || ''} />
      <Script
        id="gtm-script"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`,
        }}
      />
      <Script
        id="microsoft-clarity"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","v9fqnrk25s");`,
        }}
      />
      <noscript>
        <iframe src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`} height="0" width="0" style={{ display: 'none', visibility: 'hidden' }} />
      </noscript>
      <VideoPreloader />
      <Header />
      {children}
      <Footer />
      <CookieBanner />
      <WhatsAppButton />
    </>
  );
}
