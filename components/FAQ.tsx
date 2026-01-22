"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "Quelles sont les aides disponibles pour la rénovation énergétique ?",
    answer: "Plusieurs aides existent : MaPrimeRénov', les Certificats d'Économies d'Énergie (CEE), l'éco-prêt à taux zéro, et la TVA réduite à 5,5%. Greenter vous accompagne dans toutes vos démarches pour maximiser vos aides."
  },
  {
    question: "Combien coûte l'installation d'une pompe à chaleur ?",
    answer: "Le coût varie selon le type de PAC (air-eau, air-air) et la surface à chauffer. Comptez entre 8 000€ et 18 000€ avant aides. Avec MaPrimeRénov' et les CEE, le reste à charge peut être réduit de 40 à 70%."
  },
  {
    question: "Les panneaux solaires sont-ils rentables ?",
    answer: "Oui, l'autoconsommation permet de réduire votre facture d'électricité de 30 à 70%. Le retour sur investissement est généralement atteint en 6 à 10 ans, avec une durée de vie des panneaux de 25 à 30 ans."
  },
  {
    question: "Qu'est-ce que la certification RGE ?",
    answer: "RGE signifie 'Reconnu Garant de l'Environnement'. C'est un label qualité obligatoire pour que vos travaux soient éligibles aux aides de l'État. Greenter est certifié RGE, QualiPAC et QualiPV."
  },
  {
    question: "Intervenez-vous partout en France ?",
    answer: "Oui, Greenter intervient sur l'ensemble du territoire français pour l'installation, le dépannage et l'entretien de vos équipements de rénovation énergétique."
  },
  {
    question: "Proposez-vous des contrats d'entretien ?",
    answer: "Oui, nous proposons des contrats d'entretien annuels pour pompes à chaleur et panneaux solaires. Ils incluent une visite de maintenance, une intervention prioritaire en cas de panne, et des tarifs préférentiels sur les pièces."
  },
  {
    question: "Combien de temps durent les travaux d'installation ?",
    answer: "L'installation d'une pompe à chaleur prend 1 à 2 jours. Pour les panneaux solaires, comptez 1 à 3 jours selon la puissance. L'isolation des combles peut être réalisée en une journée."
  },
  {
    question: "L'audit énergétique est-il obligatoire ?",
    answer: "L'audit énergétique est obligatoire pour la vente de maisons classées F ou G (passoires thermiques). Il est aussi recommandé avant tout projet de rénovation pour identifier les travaux prioritaires."
  }
]

// JSON-LD pour les FAQ (SEO)
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-12 md:py-16 px-4 bg-white">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-green-700 font-semibold text-sm uppercase tracking-wider mb-3">
            Questions fréquentes
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Tout savoir sur la rénovation énergétique
          </h2>
          <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
            Les réponses aux questions les plus posées sur les pompes à chaleur, 
            panneaux solaires, isolation et aides financières.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="border border-neutral-200 rounded-xl overflow-hidden hover:border-green-300 transition-colors"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-green-50 transition-colors"
                aria-expanded={openIndex === index}
              >
                <span className="font-semibold text-neutral-900 pr-4">
                  {faq.question}
                </span>
                <ChevronDown 
                  className={`w-5 h-5 text-green-700 shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <p className="px-5 pb-5 text-neutral-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <p className="text-neutral-600 mb-4">
            Vous avez d&apos;autres questions ?
          </p>
          <a 
            href="/contact" 
            className="inline-flex items-center gap-2 text-green-700 font-semibold hover:text-teal-600 transition-colors"
          >
            Contactez-nous
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
