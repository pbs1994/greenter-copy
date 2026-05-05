/**
 * Root layout — provides the only `<html>`/`<body>` shell in the app.
 *
 * Per-section layouts (e.g. app/(public)/layout.tsx, the admin shell)
 * inherit from this and must NOT render their own html/body tags.
 *
 * Kept deliberately bare: site-wide chrome (Header, Footer, GTM, JsonLd,
 * cookie banner) lives in (public)/layout.tsx since it should not appear
 * on the /administrator/* pages.
 */

import type { Metadata } from "next"
import { Plus_Jakarta_Sans, Inter } from "next/font/google"
import "./globals.css"
import "./cookieconsent.css"

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://www.greenter.fr"),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${plusJakarta.variable} ${inter.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  )
}
