"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "Quelles sont les aides disponibles pour la rénovation énergétique ?",
    answer: "Plusieurs aides existent : MaPrimeRénov', les Certificats d'Économies d'Énergie (CEE), l'éco-prêt à taux zéro, et la TVA réduite à 5,5%. Greenter vous accompagne dans toutes vos démarches pour maximiser vos aides.",
    links: []
  },
  {
    question: "Combien coûte l'installation d'une pompe à chaleur ?",
    answer: "Le coût varie selon le type de PAC (air-eau, air-air) et la surface à chauffer. Comptez entre 8 000€ et 18 000€ avant aides. Avec MaPrimeRénov' et les CEE, le reste à charge peut être réduit de 40 à 70%.",
    links: [{ text: "En savoir plus sur nos pompes à chaleur", href: "/services/pompe-a-chaleur" }]
  },
  {
    question: "Les panneaux solaires sont-ils rentables ?",
    answer: "Oui, l'autoconsommation permet de réduire votre facture d'électricité de 30 à 70%. Le retour sur investissement est généralement atteint en 6 à 10 ans, avec une durée de vie des panneaux de 25 à 30 ans.",
    links: [{ text: "Découvrir nos solutions solaires", href: "/services/panneaux-solaires" }]
  },
  {
    question: "Qu'est-ce que la certification RGE ?",
    answer: "RGE signifie 'Reconnu Garant de l'Environnement'. C'est un label qualité obligatoire pour que vos travaux soient éligibles aux aides de l'État. Greenter est certifié RGE, QualiPAC et QualiPV.",
    links: []
  },
  {
    question: "Intervenez-vous partout en France ?",
    answer: "Oui, Greenter intervient sur l'ensemble du territoire français pour l'installation, le dépannage et l'entretien de vos équipements de rénovation énergétique.",
    links: [
      { text: "Nos services de maintenance", href: "/services/maintenance" },
      { text: "Contactez-nous", href: "/contact" }
    ]
  },
  {
    question: "Proposez-vous des contrats d'entretien ?",
    answer: "Oui, nous proposons des contrats d'entretien annuels pour pompes à chaleur et panneaux solaires. Ils incluent une visite de maintenance, une intervention prioritaire en cas de panne, et des tarifs préférentiels sur les pièces.",
    links: [
      { text: "Voir nos offres de maintenance", href: "/services/maintenance" },
      { text: "Nos pompes à chaleur", href: "/services/pompe-a-chaleur" },
      { text: "Nos panneaux solaires", href: "/services/panneaux-solaires" }
    ]
  },
  {
    question: "Combien de temps durent les travaux d'installation ?",
    answer: "L'installation d'une pompe à chaleur prend 1 à 2 jours. Pour les panneaux solaires, comptez 1 à 3 jours selon la puissance. L'isolation des combles peut être réalisée en une journée.",
    links: [
      { text: "Nos pompes à chaleur", href: "/services/pompe-a-chaleur" },
      { text: "Nos panneaux solaires", href: "/services/panneaux-solaires" },
      { text: "Découvrir l'isolation thermique", href: "/services/isolation" }
    ]
  },
  {
    question: "L'audit énergétique est-il obligatoire ?",
    answer: "L'audit énergétique est obligatoire pour la vente de maisons classées F ou G (passoires thermiques). Il est aussi recommandé avant tout projet de rénovation pour identifier les travaux prioritaires.",
    links: [{ text: "En savoir plus sur l'audit énergétique", href: "/services/audit" }]
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
                <div className="px-5 pb-5">
                  <p className="text-neutral-600 leading-relaxed">
                    {faq.answer}
                  </p>
                  {faq.links && faq.links.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {faq.links.map((link, linkIndex) => (
                        <Link 
                          key={linkIndex}
                          href={link.href}
                          className="inline-flex items-center gap-1 text-green-700 font-medium text-sm hover:text-teal-600 transition-colors"
                        >
                          {link.text}
                          <span aria-hidden="true">→</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <p className="text-neutral-600 mb-4">
            Vous avez d&apos;autres questions ?
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center gap-2 text-green-700 font-semibold hover:text-teal-600 transition-colors"
          >
            Contactez-nous
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
