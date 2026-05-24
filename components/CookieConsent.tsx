"use client"

import { useEffect } from "react"
import "vanilla-cookieconsent/dist/cookieconsent.css"
import * as CookieConsent from "vanilla-cookieconsent"

export function CookieConsentBanner() {
  useEffect(() => {
    CookieConsent.run({
      // Configuration GUI - bannière carrée à gauche
      guiOptions: {
        consentModal: {
          layout: "bar inline",    // Barre horizontale
          position: "bottom",      // En bas
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

      // Catégories de cookies - aucune case précochée (sauf nécessaires)
      categories: {
        necessary: {
          enabled: true,
          readOnly: true, // Toujours actifs, non modifiables
        },
        analytics: {
          enabled: false, // RGPD : désactivé par défaut
          autoClear: {
            cookies: [
              { name: /^_ga/ },
              { name: "_gid" },
              { name: /^_gat/ },
            ],
          },
        },
        marketing: {
          enabled: false, // RGPD : désactivé par défaut
          autoClear: {
            cookies: [
              { name: /^_fbp/ },
              { name: /^_fbc/ },
              { name: /^_gcl/ },
              { name: /^ads/ },
            ],
          },
        },
      },

      language: {
        default: "fr",
        translations: {
          fr: {
            consentModal: {
              title: "Cookies",
              description:
                '🍪 Ce site utilise des cookies pour fonctionner, mesurer l\'audience et personnaliser les publicités. <a href="/confidentialite">En savoir plus</a>',
              acceptAllBtn: "Tout accepter",
              acceptNecessaryBtn: "Tout refuser",
              showPreferencesBtn: "Personnaliser",
              footer: '<a href="/confidentialite">Confidentialité</a> · <a href="/mentions-legales">Mentions légales</a>',
            },
            preferencesModal: {
              title: "Gérer vos préférences de cookies",
              acceptAllBtn: "Tout accepter",
              acceptNecessaryBtn: "Tout refuser",
              savePreferencesBtn: "Enregistrer mes choix",
              closeIconLabel: "Fermer la fenêtre",
              serviceCounterLabel: "Service|Services",
              sections: [
                {
                  title: "Vos choix en matière de cookies",
                  description:
                    'Chez GREEN TER, nous respectons votre vie privée. Les cookies nous aident à améliorer votre expérience sur notre site. Vous gardez le contrôle total : choisissez les cookies que vous acceptez. Vous pouvez modifier vos préférences à tout moment en cliquant sur "Gérer les cookies" en bas de page.',
                },
                {
                  title: "Cookies strictement nécessaires",
                  description:
                    "Ces cookies sont indispensables au fonctionnement du site. Ils permettent la navigation, la sécurité de vos données et le bon déroulement de vos achats (panier, paiement Stripe). Sans eux, le site ne peut pas fonctionner correctement. Ils ne collectent aucune information personnelle à des fins marketing.",
                  linkedCategory: "necessary",
                  cookieTable: {
                    headers: {
                      name: "Nom",
                      domain: "Domaine",
                      description: "Finalité",
                      expiration: "Durée",
                    },
                    body: [
                      {
                        name: "cc_cookie",
                        domain: "greenter.fr",
                        description: "Mémorise vos préférences de cookies",
                        expiration: "6 mois",
                      },
                      {
                        name: "__stripe_*",
                        domain: "stripe.com",
                        description: "Sécurisation des paiements en ligne",
                        expiration: "Session",
                      },
                    ],
                  },
                },
                {
                  title: "Cookies de mesure d'audience",
                  description:
                    "Ces cookies nous permettent de comprendre comment vous utilisez notre site : pages visitées, temps passé, parcours de navigation. Ces données anonymisées nous aident à améliorer nos services et votre expérience. Outil utilisé : Google Analytics.",
                  linkedCategory: "analytics",
                  cookieTable: {
                    headers: {
                      name: "Nom",
                      domain: "Domaine",
                      description: "Finalité",
                      expiration: "Durée",
                    },
                    body: [
                      {
                        name: "_ga",
                        domain: "greenter.fr",
                        description: "Distingue les visiteurs uniques",
                        expiration: "13 mois",
                      },
                      {
                        name: "_ga_*",
                        domain: "greenter.fr",
                        description: "Conserve l'état de la session",
                        expiration: "13 mois",
                      },
                      {
                        name: "_gid",
                        domain: "greenter.fr",
                        description: "Distingue les visiteurs",
                        expiration: "24 heures",
                      },
                    ],
                  },
                },
                {
                  title: "Cookies publicitaires et marketing",
                  description:
                    "Ces cookies permettent de vous proposer des publicités adaptées à vos centres d'intérêt sur notre site et sur d'autres sites. Ils mesurent également l'efficacité de nos campagnes publicitaires. Outils utilisés : Google Ads, Meta (Facebook/Instagram).",
                  linkedCategory: "marketing",
                  cookieTable: {
                    headers: {
                      name: "Nom",
                      domain: "Domaine",
                      description: "Finalité",
                      expiration: "Durée",
                    },
                    body: [
                      {
                        name: "_gcl_au",
                        domain: "greenter.fr",
                        description: "Suivi des conversions Google Ads",
                        expiration: "3 mois",
                      },
                      {
                        name: "_gcl_aw",
                        domain: "greenter.fr",
                        description: "Liaison clics publicitaires Google",
                        expiration: "3 mois",
                      },
                      {
                        name: "_fbp",
                        domain: "greenter.fr",
                        description: "Suivi publicitaire Meta/Facebook",
                        expiration: "3 mois",
                      },
                      {
                        name: "_fbc",
                        domain: "greenter.fr",
                        description: "Liaison clics publicitaires Facebook",
                        expiration: "3 mois",
                      },
                    ],
                  },
                },
                {
                  title: "Plus d'informations",
                  description:
                    'GREEN TER (SASU) s\'engage à protéger vos données personnelles conformément au RGPD. Pour toute question sur notre utilisation des cookies ou pour exercer vos droits (accès, rectification, suppression), <a href="/contact">contactez-nous</a> ou consultez notre <a href="/confidentialite">politique de confidentialité complète</a>.',
                },
              ],
            },
          },
        },
      },
    })
  }, [])

  return null
}

// Fonction utilitaire pour ouvrir le panneau de préférences (à utiliser dans le footer)
export function openCookiePreferences() {
  if (typeof window !== "undefined") {
    CookieConsent.showPreferences()
  }
}
