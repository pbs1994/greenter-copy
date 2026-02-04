"use client"

import { useObfuscatedEmail } from "@/components/ObfuscatedEmail"

export default function MentionsLegalesPage() {
  const decodedEmail = useObfuscatedEmail()
  
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-green-950 text-white py-16 md:py-20">
        <div className="container mx-auto max-w-4xl px-4">
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Mentions légales
          </h1>
          <p className="text-green-200 text-lg">
            Informations légales conformes au droit français et aux obligations e-commerce
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10 space-y-10">
            
            {/* Identification de l'entreprise */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">
                1. Identification de l'entreprise
              </h2>
              <p className="text-gray-600 mb-4">
                Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique (LCEN), nous vous informons des éléments suivants :
              </p>
              <div className="bg-gray-50 rounded-xl p-5 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <span className="text-gray-500 text-sm">Dénomination sociale</span>
                    <p className="font-semibold text-gray-900">GREEN TER</p>
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm">Forme juridique</span>
                    <p className="font-semibold text-gray-900">SASU (Société par Actions Simplifiée Unipersonnelle)</p>
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm">Numéro SIREN</span>
                    <p className="font-semibold text-gray-900">977 485 721</p>
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm">RCS</span>
                    <p className="font-semibold text-gray-900">Paris</p>
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm">Siège social</span>
                    <p className="font-semibold text-gray-900">38 Rue de Ménilmontant, 75020 Paris, France</p>
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm">Numéro de TVA intracommunautaire</span>
                    <p className="font-semibold text-gray-900">FR XX 977485721</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Coordonnées de contact */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">
                2. Coordonnées de contact
              </h2>
              <p className="text-gray-600 mb-4">
                Pour toute question ou demande d'information concernant le site ou nos services, vous pouvez nous contacter :
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 font-bold">•</span>
                  <span><strong>Téléphone :</strong> 06 09 45 50 56</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 font-bold">•</span>
                  <span><strong>Email :</strong> <button onClick={() => decodedEmail && (window.location.href = `mailto:${decodedEmail}`)} className="text-teal-600 hover:underline">{decodedEmail || "Chargement..."}</button></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 font-bold">•</span>
                  <span><strong>Adresse postale :</strong> 38 Rue de Ménilmontant, 75020 Paris</span>
                </li>
              </ul>
            </div>

            {/* Responsable de publication */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">
                3. Responsable de publication
              </h2>
              <p className="text-gray-600">
                Le directeur de la publication du site <strong>greenter.fr</strong> est le représentant légal de la société GREEN TER, en sa qualité de Président de la SASU.
              </p>
              <p className="text-gray-600 mt-2">
                Contact : <button onClick={() => decodedEmail && (window.location.href = `mailto:${decodedEmail}`)} className="text-teal-600 hover:underline">{decodedEmail || "Chargement..."}</button>
              </p>
            </div>

            {/* Hébergeur du site */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">
                4. Hébergeur du site
              </h2>
              <p className="text-gray-600 mb-4">
                Le site greenter.fr est hébergé par :
              </p>
              <div className="bg-gray-50 rounded-xl p-5 space-y-2">
                <p className="font-semibold text-gray-900">Vercel Inc.</p>
                <p className="text-gray-600">440 N Barranca Ave #4133</p>
                <p className="text-gray-600">Covina, CA 91723, États-Unis</p>
                <p className="text-gray-600">Site web : <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">https://vercel.com</a></p>
              </div>
            </div>

            {/* Activité de l'entreprise */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">
                5. Activité de l'entreprise
              </h2>
              <p className="text-gray-600 mb-4">
                GREEN TER est spécialisée dans la rénovation énergétique et propose :
              </p>
              <h3 className="font-heading text-lg font-semibold text-gray-900 mb-2">Services</h3>
              <ul className="space-y-2 text-gray-700 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 font-bold">•</span>
                  <span>Audit énergétique et diagnostic de performance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 font-bold">•</span>
                  <span>Installation de pompes à chaleur</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 font-bold">•</span>
                  <span>Installation de panneaux solaires photovoltaïques</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 font-bold">•</span>
                  <span>Travaux d'isolation thermique</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 font-bold">•</span>
                  <span>Maintenance et service après-vente</span>
                </li>
              </ul>
              <h3 className="font-heading text-lg font-semibold text-gray-900 mb-2">Produits</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 font-bold">•</span>
                  <span>Batteries solaires et systèmes de stockage d'énergie</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 font-bold">•</span>
                  <span>Accessoires et équipements liés aux installations énergétiques</span>
                </li>
              </ul>
            </div>

            {/* Conditions d'utilisation */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">
                6. Conditions d'utilisation du site
              </h2>
              <p className="text-gray-600 mb-4">
                L'utilisation du site greenter.fr implique l'acceptation pleine et entière des conditions générales d'utilisation décrites ci-dessous.
              </p>
              
              <h3 className="font-heading text-lg font-semibold text-gray-900 mb-2">Accès au site</h3>
              <p className="text-gray-600 mb-4">
                Le site est accessible gratuitement à tout utilisateur disposant d'un accès à Internet. Tous les frais liés à l'accès au site (matériel informatique, connexion Internet) sont à la charge de l'utilisateur.
              </p>

              <h3 className="font-heading text-lg font-semibold text-gray-900 mb-2">Propriété intellectuelle</h3>
              <p className="text-gray-600 mb-4">
                L'ensemble des éléments du site (textes, images, logos, vidéos, graphismes, icônes) est protégé par le droit de la propriété intellectuelle. Toute reproduction, représentation, modification ou exploitation non autorisée est interdite et constitue une contrefaçon sanctionnée par le Code de la propriété intellectuelle.
              </p>

              <h3 className="font-heading text-lg font-semibold text-gray-900 mb-2">Limitation de responsabilité</h3>
              <p className="text-gray-600">
                GREEN TER s'efforce de fournir des informations exactes et à jour. Toutefois, nous ne pouvons garantir l'exactitude, la complétude ou l'actualité des informations diffusées sur le site. L'utilisateur reconnaît utiliser ces informations sous sa responsabilité exclusive.
              </p>
            </div>

            {/* Paiement en ligne */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">
                7. Paiement en ligne et sécurité des transactions
              </h2>
              <p className="text-gray-600 mb-4">
                Les paiements en ligne sur le site greenter.fr sont sécurisés par <strong>Stripe</strong>, leader mondial des solutions de paiement en ligne.
              </p>
              <ul className="space-y-2 text-gray-700 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 font-bold">•</span>
                  <span><strong>Protocole sécurisé :</strong> Toutes les transactions sont chiffrées via le protocole SSL/TLS</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 font-bold">•</span>
                  <span><strong>Conformité PCI-DSS :</strong> Stripe est certifié PCI-DSS niveau 1, le plus haut niveau de certification de sécurité</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 font-bold">•</span>
                  <span><strong>Données bancaires :</strong> Vos informations de paiement ne sont jamais stockées sur nos serveurs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 font-bold">•</span>
                  <span><strong>Authentification 3D Secure :</strong> Protection renforcée contre la fraude</span>
                </li>
              </ul>
              <p className="text-gray-600">
                Pour plus d'informations sur la sécurité des paiements Stripe : <a href="https://stripe.com/fr/privacy" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">https://stripe.com/fr/privacy</a>
              </p>
            </div>

            {/* Litiges et règlements */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">
                8. Litiges et règlement des différends
              </h2>
              <p className="text-gray-600 mb-4">
                Les présentes mentions légales sont régies par le droit français. En cas de litige, les tribunaux français seront seuls compétents.
              </p>
              
              <h3 className="font-heading text-lg font-semibold text-gray-900 mb-2">Médiation de la consommation</h3>
              <p className="text-gray-600 mb-4">
                Conformément aux articles L.616-1 et R.616-1 du Code de la consommation, en cas de litige non résolu, le consommateur peut recourir gratuitement à un médiateur de la consommation.
              </p>
              <div className="bg-gray-50 rounded-xl p-5">
                <p className="text-gray-700 mb-2">
                  <strong>Médiateur de la consommation :</strong>
                </p>
                <p className="text-gray-600">
                  Vous pouvez contacter le médiateur via la plateforme européenne de règlement en ligne des litiges (RLL) : <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">https://ec.europa.eu/consumers/odr</a>
                </p>
              </div>
            </div>

            {/* Mise à jour */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">
                9. Mise à jour des mentions légales
              </h2>
              <p className="text-gray-600">
                Les présentes mentions légales peuvent être modifiées à tout moment. Nous vous invitons à les consulter régulièrement. Dernière mise à jour : Janvier 2026.
              </p>
            </div>

            {/* Lien vers politique de confidentialité */}
            <div className="bg-teal-50 rounded-xl p-6 border border-teal-100">
              <h2 className="font-heading text-xl font-bold text-gray-900 mb-2">
                Protection des données personnelles
              </h2>
              <p className="text-gray-600 mb-4">
                Pour connaître nos engagements en matière de protection des données personnelles et vos droits RGPD, consultez notre politique de confidentialité.
              </p>
              <a 
                href="/confidentialite" 
                className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-colors"
              >
                Voir la politique de confidentialité
              </a>
            </div>

          </div>
        </div>
      </section>
    </main>
  )
}
