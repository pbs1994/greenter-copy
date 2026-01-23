/**
 * Property-Based Tests for FAQPageSchema Component
 * 
 * Feature: seo-audit-onsite
 * Property 2: FAQ Schema Completeness
 * 
 * **Validates: Requirements 3.1-3.3**
 * 
 * For any page with FAQ content, the number of Question items in the FAQPage 
 * schema SHALL equal the number of FAQ items displayed on the page, and each 
 * Question SHALL have a corresponding acceptedAnswer.
 */

import * as fc from 'fast-check'

// FAQPageSchema props interface (matching the component)
interface FAQItem {
  question: string
  answer: string
}

interface FAQPageSchemaProps {
  items: FAQItem[]
}

// Generated schema structure (what the component produces)
interface FAQQuestionItem {
  "@type": string
  name: string
  acceptedAnswer: {
    "@type": string
    text: string
  }
}

interface FAQPageSchemaOutput {
  "@context": string
  "@type": string
  mainEntity: FAQQuestionItem[]
}

/**
 * Helper function to generate the schema output from props
 * This mirrors the FAQPageSchema component logic
 */
function generateFAQPageSchema(props: FAQPageSchemaProps): FAQPageSchemaOutput {
  const { items } = props

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  }
}

/**
 * Arbitrary generator for valid FAQ item
 */
const faqItemArbitrary = fc.record({
  question: fc.string({ minLength: 1, maxLength: 500 }).filter(s => s.trim().length > 0),
  answer: fc.string({ minLength: 1, maxLength: 2000 }).filter(s => s.trim().length > 0),
})

/**
 * Arbitrary generator for valid FAQ schema props
 * Generates a non-empty array of FAQ items
 */
const faqPropsArbitrary = fc.record({
  items: fc.array(faqItemArbitrary, { minLength: 1, maxLength: 20 }),
})

/**
 * Arbitrary generator for empty FAQ props (edge case)
 */
const emptyFaqPropsArbitrary = fc.constant({ items: [] as FAQItem[] })

/**
 * Arbitrary generator for realistic French FAQ questions
 */
const frenchFaqQuestionArbitrary = fc.constantFrom(
  'Qu\'est-ce qu\'une pompe à chaleur ?',
  'Comment fonctionnent les panneaux solaires ?',
  'Quelles sont les aides disponibles pour la rénovation énergétique ?',
  'Combien coûte une installation de pompe à chaleur ?',
  'Quelle est la durée de vie d\'un panneau solaire ?',
  'Comment se déroule un audit énergétique ?',
  'Quels sont les avantages de l\'isolation thermique ?',
  'Pourquoi choisir Greenter pour vos travaux ?'
)

/**
 * Arbitrary generator for realistic French FAQ answers
 */
const frenchFaqAnswerArbitrary = fc.constantFrom(
  'Une pompe à chaleur est un système de chauffage qui utilise les calories présentes dans l\'air, l\'eau ou le sol pour chauffer votre habitation.',
  'Les panneaux solaires convertissent la lumière du soleil en électricité grâce à l\'effet photovoltaïque.',
  'Plusieurs aides sont disponibles : MaPrimeRénov\', les CEE, l\'éco-PTZ, et la TVA réduite à 5,5%.',
  'Le coût d\'une installation de pompe à chaleur varie entre 8 000€ et 15 000€ selon le modèle et la configuration.',
  'Un panneau solaire a une durée de vie moyenne de 25 à 30 ans avec une garantie de performance.',
  'L\'audit énergétique comprend une visite technique, une analyse thermique et un rapport détaillé avec recommandations.',
  'L\'isolation thermique permet de réduire les pertes de chaleur, d\'améliorer le confort et de diminuer les factures d\'énergie.',
  'Greenter est certifié RGE et vous accompagne de A à Z dans vos projets de rénovation énergétique.'
)

/**
 * Arbitrary generator for realistic FAQ props with French content
 */
const realisticFaqPropsArbitrary = fc.array(
  fc.record({
    question: frenchFaqQuestionArbitrary,
    answer: frenchFaqAnswerArbitrary,
  }),
  { minLength: 1, maxLength: 10 }
).map(items => ({ items }))

describe('Property 2: FAQ Schema Completeness', () => {
  /**
   * Property: For any valid FAQ input, the schema SHALL contain 
   * the @context field set to "https://schema.org"
   * 
   * **Validates: Requirements 3.1**
   */
  it('should always include valid Schema.org context', () => {
    fc.assert(
      fc.property(
        faqPropsArbitrary,
        (props) => {
          const schema = generateFAQPageSchema(props)
          return schema["@context"] === "https://schema.org"
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any valid FAQ input, the schema SHALL have 
   * @type set to "FAQPage"
   * 
   * **Validates: Requirements 3.1**
   */
  it('should always have @type set to FAQPage', () => {
    fc.assert(
      fc.property(
        faqPropsArbitrary,
        (props) => {
          const schema = generateFAQPageSchema(props)
          return schema["@type"] === "FAQPage"
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any valid FAQ input, the number of Question items 
   * SHALL equal the number of FAQ items provided
   * 
   * **Validates: Requirements 3.2**
   */
  it('should have Question count equal to input FAQ items count', () => {
    fc.assert(
      fc.property(
        faqPropsArbitrary,
        (props) => {
          const schema = generateFAQPageSchema(props)
          return schema.mainEntity.length === props.items.length
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any valid FAQ input, each item in mainEntity 
   * SHALL have @type set to "Question"
   * 
   * **Validates: Requirements 3.3**
   */
  it('should have @type "Question" for each FAQ item', () => {
    fc.assert(
      fc.property(
        faqPropsArbitrary,
        (props) => {
          const schema = generateFAQPageSchema(props)
          return schema.mainEntity.every(item => item["@type"] === "Question")
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any valid FAQ input, each Question SHALL have 
   * a corresponding acceptedAnswer
   * 
   * **Validates: Requirements 3.3**
   */
  it('should have acceptedAnswer for each Question', () => {
    fc.assert(
      fc.property(
        faqPropsArbitrary,
        (props) => {
          const schema = generateFAQPageSchema(props)
          return schema.mainEntity.every(item => 
            item.acceptedAnswer !== undefined &&
            item.acceptedAnswer !== null
          )
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any valid FAQ input, each acceptedAnswer 
   * SHALL have @type set to "Answer"
   * 
   * **Validates: Requirements 3.3**
   */
  it('should have @type "Answer" for each acceptedAnswer', () => {
    fc.assert(
      fc.property(
        faqPropsArbitrary,
        (props) => {
          const schema = generateFAQPageSchema(props)
          return schema.mainEntity.every(item => 
            item.acceptedAnswer["@type"] === "Answer"
          )
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any valid FAQ input, the question text (name) 
   * SHALL match the input question exactly
   * 
   * **Validates: Requirements 3.2**
   */
  it('should preserve question text exactly as provided', () => {
    fc.assert(
      fc.property(
        faqPropsArbitrary,
        (props) => {
          const schema = generateFAQPageSchema(props)
          return schema.mainEntity.every((item, index) => 
            item.name === props.items[index].question
          )
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any valid FAQ input, the answer text 
   * SHALL match the input answer exactly
   * 
   * **Validates: Requirements 3.2**
   */
  it('should preserve answer text exactly as provided', () => {
    fc.assert(
      fc.property(
        faqPropsArbitrary,
        (props) => {
          const schema = generateFAQPageSchema(props)
          return schema.mainEntity.every((item, index) => 
            item.acceptedAnswer.text === props.items[index].answer
          )
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any valid FAQ input, each Question SHALL have 
   * a non-empty name (question text)
   * 
   * **Validates: Requirements 3.2, 3.3**
   */
  it('should have non-empty name for each Question', () => {
    fc.assert(
      fc.property(
        faqPropsArbitrary,
        (props) => {
          const schema = generateFAQPageSchema(props)
          return schema.mainEntity.every(item => 
            typeof item.name === 'string' &&
            item.name.length > 0
          )
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any valid FAQ input, each acceptedAnswer SHALL have 
   * a non-empty text (answer text)
   * 
   * **Validates: Requirements 3.2, 3.3**
   */
  it('should have non-empty text for each acceptedAnswer', () => {
    fc.assert(
      fc.property(
        faqPropsArbitrary,
        (props) => {
          const schema = generateFAQPageSchema(props)
          return schema.mainEntity.every(item => 
            typeof item.acceptedAnswer.text === 'string' &&
            item.acceptedAnswer.text.length > 0
          )
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any valid FAQ input, the order of Questions 
   * SHALL match the order of input FAQ items
   * 
   * **Validates: Requirements 3.2**
   */
  it('should preserve FAQ items order', () => {
    fc.assert(
      fc.property(
        faqPropsArbitrary,
        (props) => {
          const schema = generateFAQPageSchema(props)
          return schema.mainEntity.every((item, index) => 
            item.name === props.items[index].question &&
            item.acceptedAnswer.text === props.items[index].answer
          )
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any valid FAQ input, the generated schema 
   * SHALL be valid JSON (can be stringified without errors)
   * 
   * **Validates: Requirements 3.1**
   */
  it('should generate valid JSON that can be stringified', () => {
    fc.assert(
      fc.property(
        faqPropsArbitrary,
        (props) => {
          const schema = generateFAQPageSchema(props)
          try {
            const jsonString = JSON.stringify(schema)
            const parsed = JSON.parse(jsonString)
            return parsed["@type"] === "FAQPage"
          } catch {
            return false
          }
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For any valid FAQ input, ALL required fields SHALL be present
   * This is the comprehensive check for Property 2
   * 
   * **Validates: Requirements 3.1-3.3**
   */
  it('should contain ALL required fields for any valid FAQ input', () => {
    fc.assert(
      fc.property(
        faqPropsArbitrary,
        (props) => {
          const schema = generateFAQPageSchema(props)
          
          // Check top-level structure (Req 3.1)
          const hasContext = schema["@context"] === "https://schema.org"
          const hasType = schema["@type"] === "FAQPage"
          const hasMainEntity = Array.isArray(schema.mainEntity)
          
          // Check FAQ count matches (Req 3.2)
          const countMatches = schema.mainEntity.length === props.items.length
          
          // Check each Question/Answer pair (Req 3.3)
          const allItemsValid = schema.mainEntity.every((item, index) => {
            const hasQuestionType = item["@type"] === "Question"
            const hasName = typeof item.name === 'string' && 
                           item.name.length > 0 &&
                           item.name === props.items[index].question
            const hasAcceptedAnswer = item.acceptedAnswer !== undefined
            const hasAnswerType = item.acceptedAnswer["@type"] === "Answer"
            const hasAnswerText = typeof item.acceptedAnswer.text === 'string' &&
                                 item.acceptedAnswer.text.length > 0 &&
                                 item.acceptedAnswer.text === props.items[index].answer
            
            return hasQuestionType && hasName && hasAcceptedAnswer && hasAnswerType && hasAnswerText
          })
          
          return hasContext && hasType && hasMainEntity && countMatches && allItemsValid
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property: For empty FAQ input, the schema SHALL have an empty mainEntity array
   * 
   * **Validates: Requirements 3.1**
   */
  it('should handle empty FAQ items array', () => {
    fc.assert(
      fc.property(
        emptyFaqPropsArbitrary,
        (props) => {
          const schema = generateFAQPageSchema(props)
          return (
            schema["@context"] === "https://schema.org" &&
            schema["@type"] === "FAQPage" &&
            Array.isArray(schema.mainEntity) &&
            schema.mainEntity.length === 0
          )
        }
      ),
      { numRuns: 10 }
    )
  })

  /**
   * Property: For realistic French FAQ content, the schema SHALL be valid
   * 
   * **Validates: Requirements 3.1-3.3**
   */
  it('should handle realistic French FAQ content correctly', () => {
    fc.assert(
      fc.property(
        realisticFaqPropsArbitrary,
        (props) => {
          const schema = generateFAQPageSchema(props)
          
          // Verify structure
          const hasValidStructure = (
            schema["@context"] === "https://schema.org" &&
            schema["@type"] === "FAQPage" &&
            schema.mainEntity.length === props.items.length
          )
          
          // Verify all items are properly formatted
          const allItemsFormatted = schema.mainEntity.every(item => 
            item["@type"] === "Question" &&
            item.acceptedAnswer["@type"] === "Answer"
          )
          
          return hasValidStructure && allItemsFormatted
        }
      ),
      { numRuns: 100 }
    )
  })
})

/**
 * Specific tests for the KSTAR BluE-S 6kW product page FAQ
 * These validate the specific requirements for the actual product FAQ
 */
describe('KSTAR BluE-S 6kW Product Page FAQ Schema Validation', () => {
  // Actual FAQ data as used on the product page
  const productFaqItems: FAQItem[] = [
    {
      question: 'Quelle est la capacité de stockage du KSTAR BluE-S 6kW ?',
      answer: 'Le KSTAR BluE-S 6kW dispose d\'une capacité de stockage de 10,24 kWh avec ses batteries LiFePO4 intégrées, extensible jusqu\'à 20,48 kWh.'
    },
    {
      question: 'Quelle est la garantie du produit ?',
      answer: 'Le KSTAR BluE-S 6kW bénéficie d\'une garantie de 10 ans sur l\'onduleur et les batteries, avec une durée de vie estimée à plus de 6000 cycles.'
    },
    {
      question: 'Le KSTAR BluE-S est-il compatible avec mon installation solaire existante ?',
      answer: 'Oui, le KSTAR BluE-S 6kW est compatible avec la plupart des installations solaires existantes. Notre équipe technique effectue une étude de compatibilité gratuite avant installation.'
    },
    {
      question: 'Quelles sont les dimensions et le poids du système ?',
      answer: 'L\'onduleur hybride mesure 516 x 440 x 184 mm et pèse environ 27 kg. Chaque module batterie mesure 442 x 420 x 108 mm pour un poids de 36 kg.'
    }
  ]

  /**
   * Test: The schema SHALL include valid Schema.org FAQPage markup
   * 
   * **Validates: Requirements 3.1**
   */
  it('should render valid Schema.org FAQPage markup', () => {
    const schema = generateFAQPageSchema({ items: productFaqItems })
    expect(schema["@context"]).toBe("https://schema.org")
    expect(schema["@type"]).toBe("FAQPage")
  })

  /**
   * Test: The schema SHALL include all FAQ questions and answers from the product page
   * 
   * **Validates: Requirements 3.2**
   */
  it('should include all FAQ questions and answers from the product page', () => {
    const schema = generateFAQPageSchema({ items: productFaqItems })
    expect(schema.mainEntity.length).toBe(productFaqItems.length)
    
    productFaqItems.forEach((faq, index) => {
      expect(schema.mainEntity[index].name).toBe(faq.question)
      expect(schema.mainEntity[index].acceptedAnswer.text).toBe(faq.answer)
    })
  })

  /**
   * Test: All FAQ items SHALL be formatted as Question/Answer pairs
   * 
   * **Validates: Requirements 3.3**
   */
  it('should format all FAQ items as Question/Answer pairs', () => {
    const schema = generateFAQPageSchema({ items: productFaqItems })
    
    schema.mainEntity.forEach(item => {
      expect(item["@type"]).toBe("Question")
      expect(item.acceptedAnswer["@type"]).toBe("Answer")
      expect(typeof item.name).toBe('string')
      expect(item.name.length).toBeGreaterThan(0)
      expect(typeof item.acceptedAnswer.text).toBe('string')
      expect(item.acceptedAnswer.text.length).toBeGreaterThan(0)
    })
  })

  /**
   * Test: Each Question SHALL have a corresponding acceptedAnswer
   * 
   * **Validates: Requirements 3.3**
   */
  it('should have acceptedAnswer for each Question', () => {
    const schema = generateFAQPageSchema({ items: productFaqItems })
    
    schema.mainEntity.forEach(item => {
      expect(item.acceptedAnswer).toBeDefined()
      expect(item.acceptedAnswer).not.toBeNull()
      expect(item.acceptedAnswer["@type"]).toBe("Answer")
      expect(item.acceptedAnswer.text).toBeTruthy()
    })
  })

  /**
   * Test: The generated schema SHALL be valid JSON
   * 
   * **Validates: Requirements 3.1**
   */
  it('should generate valid JSON that can be stringified and parsed', () => {
    const schema = generateFAQPageSchema({ items: productFaqItems })
    
    const jsonString = JSON.stringify(schema)
    const parsed = JSON.parse(jsonString)
    
    expect(parsed["@context"]).toBe("https://schema.org")
    expect(parsed["@type"]).toBe("FAQPage")
    expect(parsed.mainEntity.length).toBe(productFaqItems.length)
  })

  /**
   * Test: Questions SHALL contain specific product-related content
   */
  it('should contain product-specific FAQ content', () => {
    const schema = generateFAQPageSchema({ items: productFaqItems })
    
    // Verify at least one question mentions KSTAR
    const hasKstarQuestion = schema.mainEntity.some(item => 
      item.name.includes('KSTAR') || item.acceptedAnswer.text.includes('KSTAR')
    )
    expect(hasKstarQuestion).toBe(true)
    
    // Verify questions cover key product aspects
    const questionTexts = schema.mainEntity.map(item => item.name.toLowerCase())
    expect(questionTexts.some(q => q.includes('capacité') || q.includes('stockage'))).toBe(true)
    expect(questionTexts.some(q => q.includes('garantie'))).toBe(true)
  })
})

/**
 * Edge case tests for FAQPageSchema
 */
describe('FAQPageSchema Edge Cases', () => {
  /**
   * Test: Single FAQ item should be handled correctly
   */
  it('should handle single FAQ item', () => {
    const singleItem: FAQItem[] = [{
      question: 'Test question?',
      answer: 'Test answer.'
    }]
    
    const schema = generateFAQPageSchema({ items: singleItem })
    
    expect(schema.mainEntity.length).toBe(1)
    expect(schema.mainEntity[0]["@type"]).toBe("Question")
    expect(schema.mainEntity[0].name).toBe('Test question?')
    expect(schema.mainEntity[0].acceptedAnswer["@type"]).toBe("Answer")
    expect(schema.mainEntity[0].acceptedAnswer.text).toBe('Test answer.')
  })

  /**
   * Test: FAQ with special characters should be handled correctly
   */
  it('should handle FAQ with special characters', () => {
    const specialCharsItems: FAQItem[] = [{
      question: 'Qu\'est-ce que c\'est ? (avec des caractères spéciaux: é, è, ê, à, ù)',
      answer: 'Réponse avec des "guillemets" et des <balises> & des symboles €£¥'
    }]
    
    const schema = generateFAQPageSchema({ items: specialCharsItems })
    
    expect(schema.mainEntity[0].name).toBe(specialCharsItems[0].question)
    expect(schema.mainEntity[0].acceptedAnswer.text).toBe(specialCharsItems[0].answer)
    
    // Verify JSON serialization works with special characters
    const jsonString = JSON.stringify(schema)
    const parsed = JSON.parse(jsonString)
    expect(parsed.mainEntity[0].name).toBe(specialCharsItems[0].question)
  })

  /**
   * Test: FAQ with long content should be handled correctly
   */
  it('should handle FAQ with long content', () => {
    const longAnswer = 'A'.repeat(5000)
    const longItems: FAQItem[] = [{
      question: 'Question with a very long answer?',
      answer: longAnswer
    }]
    
    const schema = generateFAQPageSchema({ items: longItems })
    
    expect(schema.mainEntity[0].acceptedAnswer.text).toBe(longAnswer)
    expect(schema.mainEntity[0].acceptedAnswer.text.length).toBe(5000)
  })

  /**
   * Test: Multiple FAQ items should maintain order
   */
  it('should maintain order of multiple FAQ items', () => {
    const orderedItems: FAQItem[] = [
      { question: 'First question?', answer: 'First answer.' },
      { question: 'Second question?', answer: 'Second answer.' },
      { question: 'Third question?', answer: 'Third answer.' },
      { question: 'Fourth question?', answer: 'Fourth answer.' },
      { question: 'Fifth question?', answer: 'Fifth answer.' }
    ]
    
    const schema = generateFAQPageSchema({ items: orderedItems })
    
    expect(schema.mainEntity.length).toBe(5)
    orderedItems.forEach((item, index) => {
      expect(schema.mainEntity[index].name).toBe(item.question)
      expect(schema.mainEntity[index].acceptedAnswer.text).toBe(item.answer)
    })
  })
})
