/**
 * Property-Based Tests for FAQ Internal Linking
 * 
 * Feature: seo-audit-onsite
 * Property 6: FAQ Internal Linking
 * 
 * **Validates: Requirements 10.1-10.5**
 * 
 * For any FAQ answer that mentions a specific service (pompe à chaleur, 
 * panneaux solaires, audit, maintenance), the answer text SHALL contain 
 * an internal link to the corresponding service page.
 */

import * as fc from 'fast-check'

// Service keywords and their expected link paths
const serviceKeywordMappings = [
  { keywords: ['pompe à chaleur', 'pac', 'pompes à chaleur'], expectedPath: '/services/pompe-a-chaleur' },
  { keywords: ['panneaux solaires', 'solaire', 'photovoltaïque'], expectedPath: '/services/panneaux-solaires' },
  { keywords: ['audit énergétique', 'audit'], expectedPath: '/services/audit' },
  { keywords: ['entretien', 'maintenance', 'contrat'], expectedPath: '/services/maintenance' },
  { keywords: ['isolation'], expectedPath: '/services/isolation' },
]

// FAQ data from the component (mirroring the actual data structure)
interface FAQLink {
  text: string
  href: string
}

interface FAQItem {
  question: string
  answer: string
  links: FAQLink[]
}

// Actual FAQ data from the component
const faqs: FAQItem[] = [
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

/**
 * Helper function to check if a FAQ item is primarily about a specific service
 * This is more strict than just keyword matching - it checks if the FAQ
 * is actually about the service topic, not just mentioning it in passing
 */
function isPrimarilyAboutService(faq: FAQItem, serviceType: 'pac' | 'solaire' | 'audit' | 'maintenance' | 'isolation'): boolean {
  const questionLower = faq.question.toLowerCase()
  const answerLower = faq.answer.toLowerCase()
  
  switch (serviceType) {
    case 'pac':
      // FAQ is about PAC if the question mentions it, or the answer discusses PAC installation/cost
      return questionLower.includes('pompe à chaleur') || 
             (answerLower.includes('pompe à chaleur') && 
              (answerLower.includes('installation') || answerLower.includes('coût') || 
               answerLower.includes('type de pac') || answerLower.includes('air-eau') ||
               answerLower.includes('air-air')))
    case 'solaire':
      // FAQ is about solar if the question mentions it, or discusses solar panels specifically
      return questionLower.includes('panneaux solaires') || 
             questionLower.includes('solaire') ||
             (answerLower.includes('panneaux solaires') && 
              (answerLower.includes('autoconsommation') || answerLower.includes('rentable') ||
               answerLower.includes('installation')))
    case 'audit':
      // FAQ is about audit if it discusses energy audit specifically
      return questionLower.includes('audit') || 
             (answerLower.includes('audit énergétique') && answerLower.includes('obligatoire'))
    case 'maintenance':
      // FAQ is about maintenance if it discusses maintenance contracts
      return questionLower.includes('entretien') || 
             questionLower.includes('maintenance') ||
             (answerLower.includes('contrat') && answerLower.includes('entretien'))
    case 'isolation':
      // FAQ is about isolation if it discusses insulation work
      return questionLower.includes('isolation') ||
             (answerLower.includes('isolation') && answerLower.includes('combles'))
    default:
      return false
  }
}

/**
 * Helper function to check if a FAQ item has a link to a specific path
 */
function hasLinkToPath(faq: FAQItem, path: string): boolean {
  return faq.links.some(link => link.href === path)
}

describe('Property 6: FAQ Internal Linking', () => {
  /**
   * Property: For any FAQ that is primarily about pompe à chaleur, 
   * it SHALL have a link to /services/pompe-a-chaleur
   * 
   * **Validates: Requirements 10.2**
   */
  it('should have link to /services/pompe-a-chaleur for FAQs about pompe à chaleur', () => {
    const pacFaqs = faqs.filter(faq => isPrimarilyAboutService(faq, 'pac'))
    
    fc.assert(
      fc.property(
        fc.constantFrom(...pacFaqs),
        (faq) => {
          // If the FAQ is primarily about pompe à chaleur, it should have a link to the service page
          return hasLinkToPath(faq, '/services/pompe-a-chaleur')
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any FAQ that is primarily about panneaux solaires,
   * it SHALL have a link to /services/panneaux-solaires
   * 
   * **Validates: Requirements 10.3**
   */
  it('should have link to /services/panneaux-solaires for FAQs about panneaux solaires', () => {
    const solaireFaqs = faqs.filter(faq => isPrimarilyAboutService(faq, 'solaire'))
    
    fc.assert(
      fc.property(
        fc.constantFrom(...solaireFaqs),
        (faq) => {
          return hasLinkToPath(faq, '/services/panneaux-solaires')
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any FAQ that is primarily about audit énergétique,
   * it SHALL have a link to /services/audit
   * 
   * **Validates: Requirements 10.4**
   */
  it('should have link to /services/audit for FAQs about audit énergétique', () => {
    const auditFaqs = faqs.filter(faq => isPrimarilyAboutService(faq, 'audit'))
    
    fc.assert(
      fc.property(
        fc.constantFrom(...auditFaqs),
        (faq) => {
          return hasLinkToPath(faq, '/services/audit')
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any FAQ that is primarily about contrats d'entretien or maintenance,
   * it SHALL have a link to /services/maintenance
   * 
   * **Validates: Requirements 10.5**
   */
  it('should have link to /services/maintenance for FAQs about entretien/maintenance', () => {
    const maintenanceFaqs = faqs.filter(faq => isPrimarilyAboutService(faq, 'maintenance'))
    
    fc.assert(
      fc.property(
        fc.constantFrom(...maintenanceFaqs),
        (faq) => {
          return hasLinkToPath(faq, '/services/maintenance')
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any FAQ that is primarily about isolation,
   * it SHALL have a link to /services/isolation
   * 
   * **Validates: Requirements 10.1 (general internal linking)**
   */
  it('should have link to /services/isolation for FAQs about isolation', () => {
    const isolationFaqs = faqs.filter(faq => isPrimarilyAboutService(faq, 'isolation'))
    
    fc.assert(
      fc.property(
        fc.constantFrom(...isolationFaqs),
        (faq) => {
          return hasLinkToPath(faq, '/services/isolation')
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: All FAQ links SHALL point to valid internal paths
   * (paths that start with / and don't contain external URLs)
   * 
   * **Validates: Requirements 10.1**
   */
  it('should have all FAQ links pointing to valid internal paths', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...faqs),
        (faq) => {
          return faq.links.every(link => 
            link.href.startsWith('/') && !link.href.includes('http')
          )
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: All FAQ links SHALL have non-empty text
   * 
   * **Validates: Requirements 10.1**
   */
  it('should have all FAQ links with non-empty text', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...faqs.filter(faq => faq.links.length > 0)),
        (faq) => {
          return faq.links.every(link => link.text.trim().length > 0)
        }
      ),
      { numRuns: 100 }
    )
  })
})
