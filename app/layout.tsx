import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

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
  title: "Greenter | Rénovation énergétique en Île-de-France",
  description: "Pompes à chaleur, panneaux solaires, isolation et audit énergétique. Accompagnement MaPrimeRénov' inclus. Certifié RGE.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
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
