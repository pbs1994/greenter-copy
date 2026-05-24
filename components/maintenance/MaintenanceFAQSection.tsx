'use client'

import { useState, useCallback, type KeyboardEvent } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'

// FAQ items specific to maintenance services
const maintenanceFaqs = [
  {
    question: "Pourquoi souscrire à un contrat d'entretien ?",
    answer:
      "Un contrat d'entretien garantit le bon fonctionnement de vos équipements, prolonge leur durée de vie et maintient leurs performances optimales. Il vous assure également une intervention prioritaire en cas de panne et des tarifs préférentiels sur les pièces détachées.",
  },
  {
    question: "À quelle fréquence l'entretien est-il réalisé ?",
    answer:
      "L'entretien annuel est obligatoire pour les chaudières et recommandé pour les pompes à chaleur. Nos techniciens certifiés interviennent une fois par an pour un contrôle complet de vos équipements, conformément à la réglementation en vigueur.",
  },
  {
    question: "Que comprend la visite d'entretien ?",
    answer:
      "La visite inclut le nettoyage des composants, la vérification des performances, le contrôle de sécurité, la mesure des émissions (pour les chaudières), et un rapport détaillé. Nous vérifions également l'étanchéité du circuit et optimisons les réglages.",
  },
  {
    question: "Comment fonctionne la remise multi-équipements ?",
    answer:
      "Plus vous souscrivez de contrats d'entretien, plus vous économisez : -5% pour 2 équipements, -10% pour 3 équipements, et -15% pour 4 équipements ou plus. La remise s'applique automatiquement sur le total de votre abonnement.",
  },
  {
    question: "Puis-je résilier mon contrat à tout moment ?",
    answer:
      "Nos contrats sont annuels avec tacite reconduction. Vous pouvez résilier à tout moment avec un préavis de 30 jours avant la date anniversaire. Aucuns frais de résiliation ne sont appliqués.",
  },
  {
    question: "Que se passe-t-il en cas de panne ?",
    answer:
      "En tant qu'abonné, vous bénéficiez d'une intervention prioritaire sous 48h ouvrées. Le déplacement et la main d'œuvre sont inclus dans votre contrat. Seules les pièces détachées sont facturées, avec une remise de 15% sur le tarif public.",
  },
  {
    question: "Les options sont-elles obligatoires ?",
    answer:
      "Non, les options sont facultatives et vous permettent de personnaliser votre contrat selon vos besoins. Vous pouvez les ajouter ou les retirer lors du renouvellement annuel de votre contrat.",
  },
  {
    question: "Comment se déroule le paiement ?",
    answer:
      "Le paiement s'effectue en une fois à la souscription pour l'année complète. Vous bénéficiez ainsi d'une remise annuelle de 10% par rapport au tarif mensuel. Le paiement est sécurisé par Stripe.",
  },
]

export interface MaintenanceFAQSectionProps {
  className?: string
}

/**
 * MaintenanceFAQSection - Section FAQ avec accordéon animé
 *
 * Accordéon avec animations fluides
 * Icônes et couleurs cohérentes avec le nouveau design (Material Design 3 green)
 * Typographie lisible et espacement généreux
 * Transition animée pour la réponse quand une question est ouverte
 * Support clavier complet (Tab, Enter, Space)
 *
 * Validates: Requirements 6.1, 6.2, 6.3, 6.4
 */
export function MaintenanceFAQSection({ className = '' }: MaintenanceFAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFaq = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }, [])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        toggleFaq(index)
      }
    },
    [toggleFaq]
  )

  return (
    <section
      id="faq"
      className={`py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-green-50/30 ${className}`}
      aria-labelledby="maintenance-faq-title"
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-100 mb-4">
            <HelpCircle className="w-7 h-7 text-green-600" aria-hidden="true" />
          </div>
          <h2
            id="maintenance-faq-title"
            className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-3"
          >
            Questions fréquentes
          </h2>
          <p className="text-neutral-600 text-base sm:text-lg max-w-xl mx-auto">
            Tout ce que vous devez savoir sur nos contrats d&apos;entretien
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3" role="list" aria-label="Questions fréquentes sur la maintenance">
          {maintenanceFaqs.map((faq, index) => {
            const isOpen = openIndex === index

            return (
              <div
                key={index}
                role="listitem"
                className={`
                  rounded-xl overflow-hidden
                  border-2 transition-all duration-300 ease-out
                  ${isOpen
                    ? 'border-green-400 bg-white shadow-lg shadow-green-100/50'
                    : 'border-neutral-200 bg-white hover:border-green-300 hover:shadow-md'
                  }
                `}
              >
                {/* Question button */}
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  className={`
                    w-full flex items-center justify-between gap-4
                    p-5 sm:p-6 text-left
                    transition-colors duration-200
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-inset
                    ${isOpen ? 'bg-green-50/50' : 'hover:bg-green-50/30'}
                  `}
                >
                  <span
                    className={`
                      font-semibold text-base sm:text-lg leading-snug
                      transition-colors duration-200
                      ${isOpen ? 'text-green-700' : 'text-neutral-900'}
                    `}
                  >
                    {faq.question}
                  </span>
                  <div
                    className={`
                      flex-shrink-0 w-8 h-8 rounded-full
                      flex items-center justify-center
                      transition-all duration-300 ease-out
                      ${isOpen
                        ? 'bg-green-500 rotate-180'
                        : 'bg-neutral-100 rotate-0'
                      }
                    `}
                  >
                    <ChevronDown
                      className={`w-5 h-5 transition-colors duration-200 ${
                        isOpen ? 'text-white' : 'text-neutral-500'
                      }`}
                      aria-hidden="true"
                    />
                  </div>
                </button>

                {/* Answer panel with animated height */}
                <div
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                  className={`
                    overflow-hidden
                    transition-all duration-300 ease-out
                    ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                  `}
                >
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
                    <p className="text-neutral-600 leading-relaxed text-base">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-10 pt-6 border-t border-neutral-200">
          <p className="text-neutral-600 mb-3">
            Vous avez d&apos;autres questions ?
          </p>
          <a
            href="/contact"
            className="
              inline-flex items-center gap-2
              text-green-600 font-semibold
              hover:text-green-700 transition-colors duration-200
              focus:outline-none focus-visible:underline
            "
          >
            Contactez notre équipe
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default MaintenanceFAQSection
