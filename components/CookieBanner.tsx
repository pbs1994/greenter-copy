"use client"

import { useEffect, useState } from "react"
import * as CookieConsent from "vanilla-cookieconsent"

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Initialiser vanilla-cookieconsent en mode caché (on gère l'UI nous-mêmes)
    CookieConsent.run({
      guiOptions: {
        consentModal: {
          layout: "bar inline",
          position: "bottom",
          equalWeightButtons: true,
          flipButtons: false,
        },
        preferencesModal: {
          layout: "box",
          position: "left",
          equalWeightButtons: true,
          flipButtons: false,
        },
      },
      categories: {
        necessary: { enabled: true, readOnly: true },
        analytics: {
          enabled: false,
          autoClear: { cookies: [{ name: /^_ga/ }, { name: "_gid" }, { name: /^_gat/ }] },
        },
        marketing: {
          enabled: false,
          autoClear: { cookies: [{ name: /^_fbp/ }, { name: /^_fbc/ }, { name: /^_gcl/ }, { name: /^ads/ }] },
        },
      },
      language: {
        default: "fr",
        translations: {
          fr: {
            consentModal: {
              title: "Cookies",
              description: '🍪 Ce site utilise des cookies pour fonctionner, mesurer l\'audience et personnaliser les publicités. <a href="/confidentialite">En savoir plus</a>',
              acceptAllBtn: "Tout accepter",
              acceptNecessaryBtn: "Tout refuser",
              showPreferencesBtn: "Personnaliser",
            },
            preferencesModal: {
              title: "Gérer vos préférences de cookies",
              acceptAllBtn: "Tout accepter",
              acceptNecessaryBtn: "Tout refuser",
              savePreferencesBtn: "Enregistrer mes choix",
              closeIconLabel: "Fermer la fenêtre",
              sections: [
                {
                  title: "Vos choix en matière de cookies",
                  description: 'Chez GREEN TER, nous respectons votre vie privée.',
                },
                {
                  title: "Cookies strictement nécessaires",
                  description: "Ces cookies sont indispensables au fonctionnement du site.",
                  linkedCategory: "necessary",
                },
                {
                  title: "Cookies de mesure d'audience",
                  description: "Ces cookies nous permettent de comprendre comment vous utilisez notre site.",
                  linkedCategory: "analytics",
                },
                {
                  title: "Cookies publicitaires et marketing",
                  description: "Ces cookies permettent de vous proposer des publicités adaptées.",
                  linkedCategory: "marketing",
                },
              ],
            },
          },
        },
      },
      onFirstConsent: () => setVisible(false),
      onChange: () => setVisible(false),
    })

    // Vérifier si le consentement a déjà été donné
    const hasConsent = CookieConsent.validConsent()
    setVisible(!hasConsent)
  }, [])

  const handleAcceptAll = () => {
    CookieConsent.acceptCategory("all")
    setVisible(false)
  }

  const handleRejectAll = () => {
    CookieConsent.acceptCategory([])
    setVisible(false)
  }

  const handleCustomize = () => {
    CookieConsent.showPreferences()
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] bg-gradient-to-r from-[#0F4D2A] via-[#145C32] to-[#0F766E] shadow-[0_-4px_20px_rgba(0,0,0,0.15)]">
      <div className="max-w-[1400px] mx-auto px-4 py-3 flex flex-col md:flex-row items-center gap-3 md:gap-10">
        {/* Boutons - EN PREMIER sur mobile */}
        <div className="flex flex-row items-center justify-center gap-2 order-first md:order-last flex-shrink-0">
          <button
            onClick={handleAcceptAll}
            className="h-8 px-3 rounded-full text-xs font-semibold bg-white text-[#0F4D2A] border-2 border-white hover:bg-[#D4ECDB] hover:border-[#D4ECDB] transition-colors whitespace-nowrap flex items-center justify-center"
          >
            Tout accepter
          </button>
          <button
            onClick={handleRejectAll}
            className="h-8 px-3 rounded-full text-xs font-semibold bg-transparent text-white border-2 border-white/50 hover:border-white transition-colors whitespace-nowrap flex items-center justify-center"
          >
            Tout refuser
          </button>
          <button
            onClick={handleCustomize}
            className="h-8 px-3 rounded-full text-xs font-semibold bg-transparent text-white border-2 border-white/50 hover:border-white transition-colors whitespace-nowrap flex items-center justify-center"
          >
            Personnaliser
          </button>
        </div>
        {/* Texte */}
        <p className="text-[#D4ECDB] text-xs md:text-sm leading-snug text-center md:text-left flex-1">
          🍪 Ce site utilise des cookies pour fonctionner, mesurer l'audience et personnaliser les publicités.{" "}
          <a href="/confidentialite" className="text-white underline">En savoir plus</a>
        </p>
      </div>
    </div>
  )
}

export function openCookiePreferences() {
  if (typeof window !== "undefined") {
    CookieConsent.showPreferences()
  }
}
