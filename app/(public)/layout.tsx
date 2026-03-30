import type { Metadata } from "next";
import Script from "next/script";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { fetchGoogleReviews } from "@/lib/google-places";
import { CookieBanner } from "@/components/CookieBanner";
import { VideoPreloader } from "@/components/VideoPreloader";

const GTM_ID = "GTM-NQZQZT3S";

export const metadata: Metadata = {
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
    url: "https://greenter.fr",
    siteName: "Greenter",
    title: "Greenter | Rénovation énergétique - Pompe à chaleur & Panneaux solaires",
    description: "Expert certifié RGE : pompe à chaleur, panneaux solaires, isolation. Économisez jusqu'à 70% sur vos factures. Devis gratuit.",
    images: [
      {
        url: "https://greenter.fr/twitter_card.jpg",
        width: 1200,
        height: 630,
        alt: "Greenter - Rénovation énergétique",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Greenter | Rénovation énergétique partout en France",
    description: "Pompe à chaleur, panneaux solaires, isolation. Certifié RGE. Devis gratuit sous 48h.",
    images: ["https://greenter.fr/twitter_card.jpg"],
  },
  alternates: {
    canonical: "https://greenter.fr",
  },
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
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`,
        }}
      />
      <Script src="https://www.googletagmanager.com/gtag/js?id=AW-17839863014" strategy="afterInteractive" />
      <Script
        id="google-ads-gtag"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','AW-17839863014');`,
        }}
      />
      <Script
        id="microsoft-clarity"
        strategy="afterInteractive"
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
    </>
  );
}
