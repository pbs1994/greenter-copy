"use client"

import Link from "next/link"
import { ArrowLeft, Package, Wrench, Clock, AlertTriangle, CheckCircle, Phone, Mail } from "lucide-react"
import { ObfuscatedEmailLink } from "@/components/ObfuscatedEmail"

export default function RetoursPage() {
  return (
    <main className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-600 via-green-700 to-teal-700 text-white">
        <div className="container mx-auto max-w-4xl px-4 py-12 md:py-16">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-green-200 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l'accueil
          </Link>
          <h1 className="font-heading text-2xl md:text-3xl font-bold">
            Conditions de retour et droit de rétractation
          </h1>
          <p className="text-green-100 mt-3">
            Dernière mise à jour : janvier 2026
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-10">
        
        {/* Résumé important */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8">
          <div className="flex gap-4">
            <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="font-semibold text-amber-900 mb-2">À retenir</h2>
              <ul className="text-amber-800 space-y-1 text-sm">
                <li>• <strong>Avant installation :</strong> droit de rétractation de 14 jours</li>
                <li>• <strong>Après installation :</strong> plus de droit de rétractation (garantie applicable en cas de défaut)</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg ring-1 ring-neutral-100 overflow-hidden">
          <div className="p-6 md:p-8 space-y-8">

            {/* Section 1 */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="font-heading text-lg font-semibold text-neutral-900">
                  1. Droit de rétractation légal
                </h2>
              </div>
              <div className="text-neutral-600 space-y-3 pl-13">
                <p>
                  Conformément aux articles L.221-18 et suivants du Code de la consommation, vous disposez d'un délai de <strong>14 jours</strong> pour exercer votre droit de rétractation, sans avoir à justifier de motifs ni à payer de pénalités.
                </p>
                <p>
                  Ce délai court à compter de la <strong>réception du produit</strong> par vous-même ou un tiers désigné.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="font-heading text-lg font-semibold text-neutral-900">
                  2. Conditions de retour du produit
                </h2>
              </div>
              <div className="text-neutral-600 space-y-3 pl-13">
                <p>Pour exercer votre droit de rétractation <strong>avant installation</strong>, le produit doit être :</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Non installé et non utilisé</li>
                  <li>Dans son emballage d'origine, intact et complet</li>
                  <li>Accompagné de tous les accessoires et documentations</li>
                </ul>
                <p>
                  Les frais de retour sont à la charge du client. Compte tenu du poids et des dimensions des équipements (batteries, onduleurs), nous vous recommandons de faire appel à un transporteur spécialisé.
                </p>
              </div>
            </section>

            {/* Section 3 - Important */}
            <section className="bg-red-50 -mx-6 md:-mx-8 px-6 md:px-8 py-6 border-y border-red-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <Wrench className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="font-heading text-lg font-semibold text-red-900">
                  3. Exclusion après installation
                </h2>
              </div>
              <div className="text-red-800 space-y-3 pl-13">
                <p>
                  <strong>Important :</strong> Conformément à l'article L.221-28 du Code de la consommation, le droit de rétractation ne peut plus être exercé une fois que l'installation a été réalisée.
                </p>
                <p>
                  En acceptant l'installation de votre équipement par nos techniciens, vous reconnaissez expressément :
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Que le service d'installation a été pleinement exécuté</li>
                  <li>Que le produit a été personnalisé/adapté à votre installation électrique</li>
                  <li>Renoncer à votre droit de rétractation pour le produit installé</li>
                </ul>
                <p className="font-medium">
                  Cette renonciation vous sera confirmée par écrit avant le début de l'installation.
                </p>
              </div>
            </section>

            {/* Section 4 */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="font-heading text-lg font-semibold text-neutral-900">
                  4. Garantie et service après-vente
                </h2>
              </div>
              <div className="text-neutral-600 space-y-3 pl-13">
                <p>
                  L'exclusion du droit de rétractation après installation ne vous prive pas de vos droits en matière de garantie :
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li><strong>Garantie légale de conformité</strong> (2 ans) : pour tout défaut de conformité existant à la livraison</li>
                  <li><strong>Garantie des vices cachés</strong> : pour tout défaut rendant le produit impropre à son usage</li>
                  <li><strong>Garantie fabricant</strong> : 10 ans sur les batteries KSTAR</li>
                </ul>
                <p>
                  En cas de panne ou de dysfonctionnement, notre service technique interviendra dans les meilleurs délais.
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="font-heading text-lg font-semibold text-neutral-900">
                  5. Comment exercer votre droit de rétractation
                </h2>
              </div>
              <div className="text-neutral-600 space-y-3 pl-13">
                <p>
                  Pour exercer votre droit de rétractation avant installation, contactez-nous par :
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <a 
                    href="tel:+33609455056"
                    className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    06 09 45 50 56
                  </a>
                  <ObfuscatedEmailLink 
                    subject="Demande de rétractation"
                    className="inline-flex items-center justify-center gap-2 bg-neutral-100 text-neutral-700 px-5 py-2.5 rounded-lg hover:bg-neutral-200 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    contact.greenter@gmail.com
                  </ObfuscatedEmailLink>
                </div>
                <p className="text-sm text-neutral-500 mt-4">
                  Votre demande doit être envoyée avant l'expiration du délai de 14 jours suivant la réception du produit et avant toute intervention d'installation.
                </p>
              </div>
            </section>

          </div>
        </div>

        {/* Lien mentions légales */}
        <div className="text-center mt-8">
          <Link 
            href="/mentions-legales"
            className="text-green-600 hover:text-green-700 text-sm"
          >
            Voir aussi nos mentions légales
          </Link>
        </div>
      </div>
    </main>
  )
}
