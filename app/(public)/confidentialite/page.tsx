"use client"

import { useObfuscatedEmail } from "@/components/ObfuscatedEmail"

export default function ConfidentialitePage() {
  const decodedEmail = useObfuscatedEmail()
  
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-green-950 text-white py-16 md:py-20">
        <div className="container mx-auto max-w-4xl px-4">
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Politique de confidentialité
          </h1>
          <p className="text-green-200 text-lg">
            Protection des données personnelles conforme au RGPD et au droit français
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10 space-y-10">
            
            {/* Introduction */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">
                1. Introduction
              </h2>
              <p className="text-gray-600 mb-4">
                La société <strong>GREEN TER</strong> (SASU au capital de 50 000,00 €), immatriculée au RCS de Paris sous le numéro SIREN 977 485 721, dont le siège social est situé au 38 Rue de Ménilmontant, 75020 Paris, s'engage à protéger la vie privée des utilisateurs de son site internet <strong>greenter.fr</strong>.
              </p>
              <p className="text-gray-600">
                Cette politique de confidentialité décrit comment nous collectons, utilisons, stockons et protégeons vos données personnelles, conformément au Règlement Général sur la Protection des Données (RGPD - Règlement UE 2016/679) et à la loi Informatique et Libertés du 6 janvier 1978 modifiée.
              </p>
            </div>

            {/* Responsable du traitement */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">
                2. Responsable du traitement des données
              </h2>
              <p className="text-gray-600 mb-4">
                Le responsable du traitement de vos données personnelles est :
              </p>
              <div className="bg-gray-50 rounded-xl p-5 space-y-2">
                <p className="font-semibold text-gray-900">GREEN TER (SASU)</p>
                <p className="text-gray-600">38 Rue de Ménilmontant, 75020 Paris</p>
                <p className="text-gray-600">SIREN : 977 485 721</p>
                <p className="text-gray-600">Email : <a href={decodedEmail ? `mailto:${decodedEmail}` : undefined} className="text-teal-600 hover:underline">{decodedEmail || "Chargement..."}</a></p>
                <p className="text-gray-600">Téléphone : <a href="tel:+33609455056" className="text-teal-600 hover:underline">06 09 45 50 56</a></p>
              </div>
            </div>

            {/* Données collectées */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">
                3. Données personnelles collectées
              </h2>
              <p className="text-gray-600 mb-4">
                Nous collectons différentes catégories de données personnelles selon vos interactions avec notre site :
              </p>
              
              <h3 className="font-heading text-lg font-semibold text-gray-900 mb-2">Données d'identification</h3>
              <ul className="space-y-2 text-gray-700 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 font-bold">•</span>
                  <span>Nom et prénom</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 font-bold">•</span>
                  <span>Adresse email</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 font-bold">•</span>
                  <span>Numéro de téléphone</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 font-bold">•</span>
                  <span>Adresse postale (pour les livraisons et interventions)</span>
                </li>
              </ul>

              <h3 className="font-heading text-lg font-semibold text-gray-900 mb-2">Données de transaction</h3>
              <ul className="space-y-2 text-gray-700 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 font-bold">•</span>
                  <span>Historique des commandes et devis</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 font-bold">•</span>
                  <span>Informations de facturation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 font-bold">•</span>
                  <span>Données de paiement (traitées exclusivement par Stripe)</span>
                </li>
              </ul>

              <h3 className="font-heading text-lg font-semibold text-gray-900 mb-2">Données de navigation</h3>
              <ul className="space-y-2 text-gray-700 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 font-bold">•</span>
                  <span>Adresse IP</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 font-bold">•</span>
                  <span>Type de navigateur et système d'exploitation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 font-bold">•</span>
                  <span>Pages visitées et temps de navigation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 font-bold">•</span>
                  <span>Source de trafic (moteur de recherche, publicité, lien direct)</span>
                </li>
              </ul>

              <h3 className="font-heading text-lg font-semibold text-gray-900 mb-2">Données de communication</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 font-bold">•</span>
                  <span>Messages envoyés via le formulaire de contact</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 font-bold">•</span>
                  <span>Préférences de communication (newsletter)</span>
                </li>
              </ul>
            </div>

            {/* Finalités du traitement */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">
                4. Finalités du traitement des données
              </h2>
              <p className="text-gray-600 mb-4">
                Vos données personnelles sont collectées et traitées pour les finalités suivantes :
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left p-3 font-semibold text-gray-900">Finalité</th>
                      <th className="text-left p-3 font-semibold text-gray-900">Base légale RGPD</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="p-3 text-gray-700">Gestion des demandes de devis et contact</td>
                      <td className="p-3 text-gray-600">Exécution de mesures précontractuelles</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-gray-700">Traitement des commandes et livraisons</td>
                      <td className="p-3 text-gray-600">Exécution du contrat</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-gray-700">Gestion des paiements en ligne</td>
                      <td className="p-3 text-gray-600">Exécution du contrat</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-gray-700">Service après-vente et maintenance</td>
                      <td className="p-3 text-gray-600">Exécution du contrat</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-gray-700">Envoi de newsletters et offres commerciales</td>
                      <td className="p-3 text-gray-600">Consentement</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-gray-700">Analyse statistique et amélioration du site</td>
                      <td className="p-3 text-gray-600">Intérêt légitime</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-gray-700">Campagnes publicitaires ciblées</td>
                      <td className="p-3 text-gray-600">Consentement</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-gray-700">Respect des obligations légales et fiscales</td>
                      <td className="p-3 text-gray-600">Obligation légale</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Cookies et traceurs */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">
                5. Cookies et traceurs
              </h2>
              <p className="text-gray-600 mb-4">
                Notre site utilise des cookies et technologies similaires pour améliorer votre expérience de navigation et analyser l'utilisation du site.
              </p>
              
              <h3 className="font-heading text-lg font-semibold text-gray-900 mb-2">Types de cookies utilisés</h3>
              
              <div className="space-y-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Cookies essentiels</h4>
                  <p className="text-gray-600 text-sm">Nécessaires au fonctionnement du site (session, panier, sécurité). Ils ne peuvent pas être désactivés.</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Cookies analytiques (Google Analytics)</h4>
                  <p className="text-gray-600 text-sm">Permettent de mesurer l'audience du site, comprendre le comportement des visiteurs et améliorer nos services.</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Cookies publicitaires (Google Ads, Meta Ads)</h4>
                  <p className="text-gray-600 text-sm">Utilisés pour diffuser des publicités personnalisées et mesurer l'efficacité de nos campagnes marketing.</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Cookies de paiement (Stripe)</h4>
                  <p className="text-gray-600 text-sm">Nécessaires pour sécuriser les transactions et prévenir la fraude.</p>
                </div>
              </div>

              <h3 className="font-heading text-lg font-semibold text-gray-900 mb-2">Gestion de vos préférences</h3>
              <p className="text-gray-600 mb-4">
                Lors de votre première visite, un bandeau vous permet d'accepter ou de refuser les cookies non essentiels. Vous pouvez modifier vos préférences à tout moment via les paramètres de votre navigateur ou en nous contactant.
              </p>
            </div>

            {/* Partenaires et prestataires */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">
                6. Partenaires et prestataires
              </h2>
              <p className="text-gray-600 mb-4">
                Pour assurer nos services, nous faisons appel à des prestataires tiers qui peuvent avoir accès à certaines de vos données :
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left p-3 font-semibold text-gray-900">Prestataire</th>
                      <th className="text-left p-3 font-semibold text-gray-900">Fonction</th>
                      <th className="text-left p-3 font-semibold text-gray-900">Données concernées</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="p-3 text-gray-700 font-medium">Stripe</td>
                      <td className="p-3 text-gray-600">Paiement sécurisé</td>
                      <td className="p-3 text-gray-600">Données de paiement, identité</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-gray-700 font-medium">Google Analytics</td>
                      <td className="p-3 text-gray-600">Analyse d'audience</td>
                      <td className="p-3 text-gray-600">Données de navigation anonymisées</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-gray-700 font-medium">Google Ads</td>
                      <td className="p-3 text-gray-600">Publicité ciblée</td>
                      <td className="p-3 text-gray-600">Données de navigation, conversions</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-gray-700 font-medium">Meta (Facebook/Instagram)</td>
                      <td className="p-3 text-gray-600">Publicité ciblée</td>
                      <td className="p-3 text-gray-600">Données de navigation, conversions</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-gray-700 font-medium">Vercel</td>
                      <td className="p-3 text-gray-600">Hébergement du site</td>
                      <td className="p-3 text-gray-600">Logs serveur, adresses IP</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-gray-600 mt-4">
                Ces prestataires sont contractuellement tenus de respecter la confidentialité de vos données et de les utiliser uniquement dans le cadre des services qu'ils nous fournissent.
              </p>
            </div>

            {/* Transfert hors UE */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">
                7. Transfert de données hors Union Européenne
              </h2>
              <p className="text-gray-600 mb-4">
                Certains de nos prestataires (Stripe, Google, Meta, Vercel) sont basés aux États-Unis. Les transferts de données vers ces pays sont encadrés par :
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 font-bold">•</span>
                  <span><strong>Data Privacy Framework (DPF) :</strong> Accord UE-USA garantissant un niveau de protection adéquat</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 font-bold">•</span>
                  <span><strong>Clauses contractuelles types (CCT) :</strong> Contrats approuvés par la Commission européenne</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 font-bold">•</span>
                  <span><strong>Mesures de sécurité supplémentaires :</strong> Chiffrement des données, pseudonymisation</span>
                </li>
              </ul>
            </div>

            {/* Durée de conservation */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">
                8. Durée de conservation des données
              </h2>
              <p className="text-gray-600 mb-4">
                Vos données personnelles sont conservées pendant une durée limitée, en fonction de leur finalité :
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left p-3 font-semibold text-gray-900">Type de données</th>
                      <th className="text-left p-3 font-semibold text-gray-900">Durée de conservation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="p-3 text-gray-700">Données clients (commandes, factures)</td>
                      <td className="p-3 text-gray-600">10 ans (obligation comptable)</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-gray-700">Données prospects (demandes de devis)</td>
                      <td className="p-3 text-gray-600">3 ans après le dernier contact</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-gray-700">Données de newsletter</td>
                      <td className="p-3 text-gray-600">Jusqu'au désabonnement + 3 ans</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-gray-700">Cookies analytiques</td>
                      <td className="p-3 text-gray-600">13 mois maximum</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-gray-700">Logs de connexion</td>
                      <td className="p-3 text-gray-600">1 an</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Droits des utilisateurs */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">
                9. Vos droits sur vos données personnelles
              </h2>
              <p className="text-gray-600 mb-4">
                Conformément au RGPD et à la loi Informatique et Libertés, vous disposez des droits suivants sur vos données personnelles :
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Droit d'accès</h4>
                  <p className="text-gray-600 text-sm">Obtenir la confirmation que vos données sont traitées et en recevoir une copie.</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Droit de rectification</h4>
                  <p className="text-gray-600 text-sm">Faire corriger des données inexactes ou compléter des données incomplètes.</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Droit à l'effacement</h4>
                  <p className="text-gray-600 text-sm">Demander la suppression de vos données dans certaines conditions.</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Droit à la limitation</h4>
                  <p className="text-gray-600 text-sm">Demander la suspension temporaire du traitement de vos données.</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Droit à la portabilité</h4>
                  <p className="text-gray-600 text-sm">Recevoir vos données dans un format structuré et les transférer à un tiers.</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Droit d'opposition</h4>
                  <p className="text-gray-600 text-sm">Vous opposer au traitement de vos données pour des motifs légitimes.</p>
                </div>
              </div>

              <h3 className="font-heading text-lg font-semibold text-gray-900 mb-2">Comment exercer vos droits ?</h3>
              <p className="text-gray-600 mb-4">
                Pour exercer vos droits, vous pouvez nous contacter :
              </p>
              <ul className="space-y-2 text-gray-700 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 font-bold">•</span>
                  <span><strong>Par email :</strong> <a href={decodedEmail ? `mailto:${decodedEmail}?subject=${encodeURIComponent("Exercice droits RGPD")}` : undefined} className="text-teal-600 hover:underline">{decodedEmail || "Chargement..."}</a> (objet : « Exercice droits RGPD »)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 font-bold">•</span>
                  <span><strong>Par courrier :</strong> GREEN TER - Service Protection des Données, 38 Rue de Ménilmontant, 75020 Paris</span>
                </li>
              </ul>
              <p className="text-gray-600">
                Nous répondrons à votre demande dans un délai d'un mois. Une pièce d'identité pourra vous être demandée pour vérifier votre identité.
              </p>
            </div>

            {/* Réclamation CNIL */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">
                10. Réclamation auprès de la CNIL
              </h2>
              <p className="text-gray-600 mb-4">
                Si vous estimez que le traitement de vos données personnelles constitue une violation du RGPD, vous avez le droit d'introduire une réclamation auprès de la Commission Nationale de l'Informatique et des Libertés (CNIL) :
              </p>
              <div className="bg-gray-50 rounded-xl p-5 space-y-2">
                <p className="font-semibold text-gray-900">CNIL</p>
                <p className="text-gray-600">3 Place de Fontenoy, TSA 80715</p>
                <p className="text-gray-600">75334 Paris Cedex 07</p>
                <p className="text-gray-600">Site web : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">www.cnil.fr</a></p>
              </div>
            </div>

            {/* Sécurité des données */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">
                11. Sécurité des données
              </h2>
              <p className="text-gray-600 mb-4">
                Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles :
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 font-bold">•</span>
                  <span><strong>Chiffrement SSL/TLS :</strong> Toutes les communications sont sécurisées</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 font-bold">•</span>
                  <span><strong>Sécurité paiement Stripe :</strong> Certification PCI-DSS niveau 1, authentification 3D Secure</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 font-bold">•</span>
                  <span><strong>Accès restreint :</strong> Seuls les employés autorisés ont accès aux données</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 font-bold">•</span>
                  <span><strong>Sauvegardes régulières :</strong> Protection contre la perte de données</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 font-bold">•</span>
                  <span><strong>Mises à jour de sécurité :</strong> Maintenance régulière des systèmes</span>
                </li>
              </ul>
            </div>

            {/* Mineurs */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">
                12. Protection des mineurs
              </h2>
              <p className="text-gray-600">
                Notre site et nos services s'adressent à des personnes majeures. Nous ne collectons pas sciemment de données personnelles concernant des mineurs de moins de 16 ans. Si vous êtes parent ou tuteur et que vous pensez que votre enfant nous a fourni des données personnelles, veuillez nous contacter pour que nous puissions les supprimer.
              </p>
            </div>

            {/* Modification de la politique */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">
                13. Modification de la politique de confidentialité
              </h2>
              <p className="text-gray-600">
                Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. En cas de modification substantielle, nous vous en informerons par email ou via une notification sur le site. Nous vous invitons à consulter régulièrement cette page. Dernière mise à jour : Janvier 2026.
              </p>
            </div>

            {/* Contact */}
            <div className="bg-teal-50 rounded-xl p-6 border border-teal-100">
              <h2 className="font-heading text-xl font-bold text-gray-900 mb-2">
                Une question sur vos données ?
              </h2>
              <p className="text-gray-600 mb-4">
                Pour toute question concernant cette politique de confidentialité ou le traitement de vos données personnelles, n'hésitez pas à nous contacter.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={decodedEmail ? `mailto:${decodedEmail}` : undefined}
                  className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-colors"
                >
                  Nous contacter
                </a>
                <a 
                  href="/mentions-legales" 
                  className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-semibold px-5 py-2.5 rounded-full text-sm transition-colors border border-gray-200"
                >
                  Voir les mentions légales
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  )
}
