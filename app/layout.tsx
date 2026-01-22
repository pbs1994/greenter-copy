import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Greenter | Rénovation énergétique partout en France - Pompe à chaleur, Panneaux solaires",
  description: "Expert certifié RGE en rénovation énergétique : installation pompe à chaleur, panneaux solaires, isolation thermique et audit énergétique. Économisez jusqu'à 70% sur vos factures. Accompagnement MaPrimeRénov' inclus.",
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
        url: "https://greenter.fr/og-image.jpg",
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
    images: ["https://greenter.fr/og-image.jpg"],
  },
  alternates: {
    canonical: "https://greenter.fr",
  },
  verification: {
    // google: "votre-code-verification-google",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <JsonLd />
      </head>
      <body
        className={`${plusJakarta.variable} ${inter.variable} font-body antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
