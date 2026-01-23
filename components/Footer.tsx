"use client"

import Image from "next/image"
import Link from "next/link"
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react"
import { openCookiePreferences } from "./CookieConsent"
import { ObfuscatedEmail } from "./ObfuscatedEmail"

export function Footer() {
  return (
    <footer className="bg-green-950 text-white">
      {/* Main Footer */}
      <div className="container mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-5">
              <Image
                src="/logo.png"
                alt="Greenter"
                width={140}
                height={40}
                className="h-10 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-green-200 text-sm leading-relaxed mb-6">
              Spécialiste de la rénovation énergétique partout en France. 
              Pompes à chaleur, panneaux solaires, isolation et audit énergétique.
            </p>
            
            {/* Certifications */}
            <div className="flex gap-3">
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center overflow-hidden p-1">
                <Image
                  src="/certifications/rge.webp"
                  alt="RGE"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center overflow-hidden p-1">
                <Image
                  src="/certifications/qualibat.jpg"
                  alt="Qualibat"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center overflow-hidden p-1">
                <Image
                  src="/certifications/qualipac.jpg"
                  alt="QualiPAC"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center overflow-hidden p-1">
                <Image
                  src="/certifications/qualipv.png"
                  alt="QualiPAC"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-5">Navigation</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-green-200 hover:text-white transition-colors text-sm">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-green-200 hover:text-white transition-colors text-sm">
                  Nos services
                </Link>
              </li>
              <li>
                <Link href="/produits" className="text-green-200 hover:text-white transition-colors text-sm">
                  Nos produits
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-green-200 hover:text-white transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-5">Services</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/services/audit" className="text-green-200 hover:text-white transition-colors text-sm">
                  Audit énergétique
                </Link>
              </li>
              <li>
                <Link href="/services/pompe-a-chaleur" className="text-green-200 hover:text-white transition-colors text-sm">
                  Pompe à chaleur
                </Link>
              </li>
              <li>
                <Link href="/services/panneaux-solaires" className="text-green-200 hover:text-white transition-colors text-sm">
                  Panneaux solaires
                </Link>
              </li>
              <li>
                <Link href="/services/isolation" className="text-green-200 hover:text-white transition-colors text-sm">
                  Isolation thermique
                </Link>
              </li>
              <li>
                <Link href="/services/maintenance" className="text-green-200 hover:text-white transition-colors text-sm">
                  Maintenance & SAV
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-5">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
                <span className="text-green-200 text-sm">
                  38 Rue de Ménilmontant<br />75020 Paris
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-green-400 shrink-0" />
                <a href="tel:+33609455056" className="text-green-200 hover:text-white transition-colors text-sm">
                  06 09 45 50 56
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-green-400 shrink-0" />
                <ObfuscatedEmail className="text-green-200 hover:text-white transition-colors text-sm text-left" />
              </li>
            </ul>

            {/* CTA */}
            <Link 
              href="/contact"
              className="inline-flex items-center gap-2 mt-6 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-colors"
            >
              Demander un devis
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-green-900">
        <div className="container mx-auto max-w-6xl px-4 py-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-green-300 text-sm">
              © {new Date().getFullYear()} Greenter. Tous droits réservés.
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              <Link href="/mentions-legales" className="text-green-300 hover:text-white transition-colors text-sm">
                Mentions légales
              </Link>
              <Link href="/confidentialite" className="text-green-300 hover:text-white transition-colors text-sm">
                Politique de confidentialité
              </Link>
              <button 
                onClick={openCookiePreferences}
                className="text-green-300 hover:text-white transition-colors text-sm cursor-pointer"
                aria-label="Gérer vos préférences de cookies"
              >
                Gérer les cookies
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
