/**
 * Property-Based Tests for Block Auto-Population from Parent
 * 
 * Feature: payload-cms-migration
 * Property 16: Block Auto-Population from Parent
 * 
 * **Validates: Requirements 13.1, 14.3, 15.4**
 * 
 * For any Specs_Table_Block, FAQ_Block, or Gallery_Block used within a Product document:
 * - SpecsTable block with auto_populate=true should use parent product.specs
 * - FAQ block with auto_populate=true should use parent product.faq
 * - Gallery block with auto_populate=true should use parent product.gallery
 * - When auto_populate=false, manual entries should be used instead
 * - Auto-populated data should match the parent product data exactly
 */

import * as fc from 'fast-check'

/**
 * Type definitions matching the block structures from blocks/*.ts
 */

interface SpecItem {
  label: string
  value: string
  unit?: string
}

interface FAQItem {
  question: string
  answer?: unknown // RichText content
}

interface GalleryItem {
  image: string // Media ID reference
  caption?: string
}

interface SpecsTableBlock {
  blockType: 'specs-table'
  title?: string
  auto_populate: boolean
  specs?: SpecItem[]
  columns?: number
}

interface FAQBlock {
  blockType: 'faq'
  title?: string
  auto_populate: boolean
  items?: FAQItem[]
}

interface GalleryBlock {
  blockType: 'gallery'
  title?: string
  columns?: '2' | '3' | '4'
  lightbox?: boolean
  auto_populate: boolean
  images?: GalleryItem[]
}

type ProductBlock = SpecsTableBlock | FAQBlock | GalleryBlock

/**
 * Product data structure (simplified for testing)
 */
interface ProductData {
  id: string
  name: string
  specs?: SpecItem[]
  faq?: FAQItem[]
  gallery?: Array<{ image: string }>
  blocks?: ProductBlock[]
}

/**
 * Simulates the auto-population logic for SpecsTable block
 * This mirrors the frontend rendering behavior
 * 
 * @validates Requirements 13.1
 */
function resolveSpecsTableData(
  block: SpecsTableBlock,
  product: ProductData
): SpecItem[] {
  if (block.auto_populate) {
    // Auto-populate from parent product specs
    return product.specs || []
  }
  // Use manual specs from block
  return block.specs || []
}

/**
 * Simulates the auto-population logic for FAQ block
 * This mirrors the frontend rendering behavior
 * 
 * @validates Requirements 14.3
 */
function resolveFAQData(
  block: FAQBlock,
  product: ProductData
): FAQItem[] {
  if (block.auto_populate) {
    // Auto-populate from parent product FAQ
    return product.faq || []
  }
  // Use manual FAQ items from block
  return block.items || []
}

/**
 * Simulates the auto-population logic for Gallery block
 * This mirrors the frontend rendering behavior
 * 
 * @validates Requirements 15.4
 */
function resolveGalleryData(
  block: GalleryBlock,
  product: ProductData
): GalleryItem[] {
  if (block.auto_populate) {
    // Auto-populate from parent product gallery
    // Product gallery has { image } structure, Gallery block expects { image, caption? }
    return (product.gallery || []).map(item => ({
      image: item.image,
      caption: undefined,
    }))
  }
  // Use manual images from block
  return block.images || []
}

/**
 * Arbitrary generators for test data
 */

/**
 * Generator for valid MongoDB ObjectId format
 */
const objectIdArbitrary = fc.stringMatching(/^[a-f0-9]{24}$/)

/**
 * Generator for spec items (matching Products.specs structure)
 */
const specItemArbitrary = fc.record({
  label: fc.constantFrom(
    'Puissance',
    'Capacité',
    'Tension',
    'Rendement',
    'Poids',
    'Dimensions',
    'Garantie',
    'Température de fonctionnement',
    'Indice de protection',
    'Certification'
  ),
  value: fc.oneof(
    fc.integer({ min: 1, max: 10000 }).map(n => n.toString()),
    fc.constantFrom('5 kW', '10 kWh', '48V', '97%', '25 kg', '500x400x200 mm', '10 ans', '-20°C à 60°C', 'IP65', 'CE, TÜV')
  ),
  unit: fc.option(fc.constantFrom('kW', 'kWh', 'V', '%', 'kg', 'mm', 'ans', '°C'), { nil: undefined }),
}) as fc.Arbitrary<SpecItem>

/**
 * Generator for FAQ items (matching Products.faq structure)
 */
const faqItemArbitrary = fc.record({
  question: fc.constantFrom(
    'Quelle est la durée de vie du produit ?',
    'Comment installer ce produit ?',
    'Quelles sont les conditions de garantie ?',
    'Ce produit est-il compatible avec mon installation ?',
    'Quel est le délai de livraison ?',
    'Comment fonctionne le SAV ?',
    'Puis-je bénéficier d\'aides financières ?',
    'Quelle est la consommation en veille ?'
  ),
  answer: fc.constant({ root: { children: [{ text: 'Réponse détaillée...' }] } }),
}) as fc.Arbitrary<FAQItem>

/**
 * Generator for gallery items (matching Products.gallery structure)
 */
const galleryItemArbitrary = fc.record({
  image: objectIdArbitrary,
}) as fc.Arbitrary<{ image: string }>

/**
 * Generator for gallery items with captions (for manual block entries)
 */
const galleryItemWithCaptionArbitrary = fc.record({
  image: objectIdArbitrary,
  caption: fc.option(fc.constantFrom(
    'Vue de face',
    'Vue arrière',
    'Détail connectique',
    'Installation type',
    'Schéma de câblage'
  ), { nil: undefined }),
}) as fc.Arbitrary<GalleryItem>

/**
 * Generator for SpecsTable block
 */
const specsTableBlockArbitrary = fc.record({
  blockType: fc.constant('specs-table' as const),
  title: fc.option(fc.constantFrom('Spécifications techniques', 'Caractéristiques', 'Fiche technique'), { nil: undefined }),
  auto_populate: fc.boolean(),
  specs: fc.option(fc.array(specItemArbitrary, { minLength: 1, maxLength: 10 }), { nil: undefined }),
  columns: fc.option(fc.integer({ min: 1, max: 3 }), { nil: undefined }),
}) as fc.Arbitrary<SpecsTableBlock>

/**
 * Generator for FAQ block
 */
const faqBlockArbitrary = fc.record({
  blockType: fc.constant('faq' as const),
  title: fc.option(fc.constantFrom('Questions fréquentes', 'FAQ', 'Besoin d\'aide ?'), { nil: undefined }),
  auto_populate: fc.boolean(),
  items: fc.option(fc.array(faqItemArbitrary, { minLength: 1, maxLength: 8 }), { nil: undefined }),
}) as fc.Arbitrary<FAQBlock>

/**
 * Generator for Gallery block
 */
const galleryBlockArbitrary = fc.record({
  blockType: fc.constant('gallery' as const),
  title: fc.option(fc.constantFrom('Galerie', 'Photos', 'Images du produit'), { nil: undefined }),
  columns: fc.option(fc.constantFrom('2', '3', '4'), { nil: undefined }),
  lightbox: fc.option(fc.boolean(), { nil: undefined }),
  auto_populate: fc.boolean(),
  images: fc.option(fc.array(galleryItemWithCaptionArbitrary, { minLength: 1, maxLength: 10 }), { nil: undefined }),
}) as fc.Arbitrary<GalleryBlock>

/**
 * Generator for product data with specs, faq, and gallery
 */
const productDataArbitrary = fc.record({
  id: objectIdArbitrary,
  name: fc.constantFrom(
    'KSTAR BluE-S 6kW',
    'Onduleur hybride 10kW',
    'Batterie lithium 10kWh',
    'Panneau solaire 400W',
    'Kit autoconsommation 3kWc'
  ),
  specs: fc.option(fc.array(specItemArbitrary, { minLength: 0, maxLength: 15 }), { nil: undefined }),
  faq: fc.option(fc.array(faqItemArbitrary, { minLength: 0, maxLength: 10 }), { nil: undefined }),
  gallery: fc.option(fc.array(galleryItemArbitrary, { minLength: 0, maxLength: 10 }), { nil: undefined }),
}) as fc.Arbitrary<ProductData>

describe('Property 16: Block Auto-Population from Parent', () => {
  /**
   * Property: SpecsTable block with auto_populate=true SHALL use parent product.specs
   * 
   * **Validates: Requirements 13.1**
   */
  describe('SpecsTable Auto-Population', () => {
    it('should use product.specs when auto_populate is true', () => {
      fc.assert(
        fc.property(
          productDataArbitrary,
          (product) => {
            const block: SpecsTableBlock = {
              blockType: 'specs-table',
              auto_populate: true,
              specs: [{ label: 'Manual', value: 'Should not be used' }],
            }
            
            const result = resolveSpecsTableData(block, product)
            
            // Should return product specs, not block specs
            expect(result).toEqual(product.specs || [])
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should return empty array when auto_populate is true and product has no specs', () => {
      fc.assert(
        fc.property(
          objectIdArbitrary,
          fc.constantFrom('Product A', 'Product B'),
          (id, name) => {
            const product: ProductData = { id, name, specs: undefined }
            const block: SpecsTableBlock = {
              blockType: 'specs-table',
              auto_populate: true,
              specs: [{ label: 'Manual', value: 'Value' }],
            }
            
            const result = resolveSpecsTableData(block, product)
            
            expect(result).toEqual([])
          }
        ),
        { numRuns: 50 }
      )
    })

    it('should use block.specs when auto_populate is false', () => {
      fc.assert(
        fc.property(
          productDataArbitrary,
          fc.array(specItemArbitrary, { minLength: 1, maxLength: 5 }),
          (product, manualSpecs) => {
            const block: SpecsTableBlock = {
              blockType: 'specs-table',
              auto_populate: false,
              specs: manualSpecs,
            }
            
            const result = resolveSpecsTableData(block, product)
            
            // Should return block specs, not product specs
            expect(result).toEqual(manualSpecs)
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should return empty array when auto_populate is false and no manual specs', () => {
      fc.assert(
        fc.property(
          productDataArbitrary,
          (product) => {
            const block: SpecsTableBlock = {
              blockType: 'specs-table',
              auto_populate: false,
              specs: undefined,
            }
            
            const result = resolveSpecsTableData(block, product)
            
            expect(result).toEqual([])
          }
        ),
        { numRuns: 50 }
      )
    })
  })

  /**
   * Property: FAQ block with auto_populate=true SHALL use parent product.faq
   * 
   * **Validates: Requirements 14.3**
   */
  describe('FAQ Auto-Population', () => {
    it('should use product.faq when auto_populate is true', () => {
      fc.assert(
        fc.property(
          productDataArbitrary,
          (product) => {
            const block: FAQBlock = {
              blockType: 'faq',
              auto_populate: true,
              items: [{ question: 'Manual question?', answer: { text: 'Manual answer' } }],
            }
            
            const result = resolveFAQData(block, product)
            
            // Should return product FAQ, not block items
            expect(result).toEqual(product.faq || [])
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should return empty array when auto_populate is true and product has no faq', () => {
      fc.assert(
        fc.property(
          objectIdArbitrary,
          fc.constantFrom('Product A', 'Product B'),
          (id, name) => {
            const product: ProductData = { id, name, faq: undefined }
            const block: FAQBlock = {
              blockType: 'faq',
              auto_populate: true,
              items: [{ question: 'Manual?', answer: undefined }],
            }
            
            const result = resolveFAQData(block, product)
            
            expect(result).toEqual([])
          }
        ),
        { numRuns: 50 }
      )
    })

    it('should use block.items when auto_populate is false', () => {
      fc.assert(
        fc.property(
          productDataArbitrary,
          fc.array(faqItemArbitrary, { minLength: 1, maxLength: 5 }),
          (product, manualItems) => {
            const block: FAQBlock = {
              blockType: 'faq',
              auto_populate: false,
              items: manualItems,
            }
            
            const result = resolveFAQData(block, product)
            
            // Should return block items, not product FAQ
            expect(result).toEqual(manualItems)
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should return empty array when auto_populate is false and no manual items', () => {
      fc.assert(
        fc.property(
          productDataArbitrary,
          (product) => {
            const block: FAQBlock = {
              blockType: 'faq',
              auto_populate: false,
              items: undefined,
            }
            
            const result = resolveFAQData(block, product)
            
            expect(result).toEqual([])
          }
        ),
        { numRuns: 50 }
      )
    })
  })

  /**
   * Property: Gallery block with auto_populate=true SHALL use parent product.gallery
   * 
   * **Validates: Requirements 15.4**
   */
  describe('Gallery Auto-Population', () => {
    it('should use product.gallery when auto_populate is true', () => {
      fc.assert(
        fc.property(
          productDataArbitrary.filter(p => Boolean(p.gallery && p.gallery.length > 0)),
          (product) => {
            const block: GalleryBlock = {
              blockType: 'gallery',
              auto_populate: true,
              images: [{ image: '000000000000000000000001', caption: 'Manual caption' }],
            }
            
            const result = resolveGalleryData(block, product)
            
            // Should return product gallery images (without captions)
            expect(result.length).toBe(product.gallery!.length)
            result.forEach((item, index) => {
              expect(item.image).toBe(product.gallery![index].image)
              expect(item.caption).toBeUndefined()
            })
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should return empty array when auto_populate is true and product has no gallery', () => {
      fc.assert(
        fc.property(
          objectIdArbitrary,
          fc.constantFrom('Product A', 'Product B'),
          (id, name) => {
            const product: ProductData = { id, name, gallery: undefined }
            const block: GalleryBlock = {
              blockType: 'gallery',
              auto_populate: true,
              images: [{ image: '000000000000000000000001' }],
            }
            
            const result = resolveGalleryData(block, product)
            
            expect(result).toEqual([])
          }
        ),
        { numRuns: 50 }
      )
    })

    it('should use block.images when auto_populate is false', () => {
      fc.assert(
        fc.property(
          productDataArbitrary,
          fc.array(galleryItemWithCaptionArbitrary, { minLength: 1, maxLength: 5 }),
          (product, manualImages) => {
            const block: GalleryBlock = {
              blockType: 'gallery',
              auto_populate: false,
              images: manualImages,
            }
            
            const result = resolveGalleryData(block, product)
            
            // Should return block images, not product gallery
            expect(result).toEqual(manualImages)
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should return empty array when auto_populate is false and no manual images', () => {
      fc.assert(
        fc.property(
          productDataArbitrary,
          (product) => {
            const block: GalleryBlock = {
              blockType: 'gallery',
              auto_populate: false,
              images: undefined,
            }
            
            const result = resolveGalleryData(block, product)
            
            expect(result).toEqual([])
          }
        ),
        { numRuns: 50 }
      )
    })

    it('should preserve image IDs exactly when auto-populating', () => {
      fc.assert(
        fc.property(
          fc.array(objectIdArbitrary, { minLength: 1, maxLength: 10 }),
          objectIdArbitrary,
          (imageIds, productId) => {
            const product: ProductData = {
              id: productId,
              name: 'Test Product',
              gallery: imageIds.map(id => ({ image: id })),
            }
            const block: GalleryBlock = {
              blockType: 'gallery',
              auto_populate: true,
            }
            
            const result = resolveGalleryData(block, product)
            
            // Each image ID should be preserved exactly
            imageIds.forEach((id, index) => {
              expect(result[index].image).toBe(id)
            })
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  /**
   * Property: Auto-populated data SHALL match parent product data exactly
   * 
   * **Validates: Requirements 13.1, 14.3, 15.4**
   */
  describe('Data Integrity', () => {
    it('should preserve all spec fields when auto-populating', () => {
      fc.assert(
        fc.property(
          fc.array(specItemArbitrary, { minLength: 1, maxLength: 10 }),
          objectIdArbitrary,
          (specs, productId) => {
            const product: ProductData = {
              id: productId,
              name: 'Test Product',
              specs,
            }
            const block: SpecsTableBlock = {
              blockType: 'specs-table',
              auto_populate: true,
            }
            
            const result = resolveSpecsTableData(block, product)
            
            // All fields should be preserved
            specs.forEach((spec, index) => {
              expect(result[index].label).toBe(spec.label)
              expect(result[index].value).toBe(spec.value)
              expect(result[index].unit).toBe(spec.unit)
            })
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should preserve all FAQ fields when auto-populating', () => {
      fc.assert(
        fc.property(
          fc.array(faqItemArbitrary, { minLength: 1, maxLength: 8 }),
          objectIdArbitrary,
          (faqItems, productId) => {
            const product: ProductData = {
              id: productId,
              name: 'Test Product',
              faq: faqItems,
            }
            const block: FAQBlock = {
              blockType: 'faq',
              auto_populate: true,
            }
            
            const result = resolveFAQData(block, product)
            
            // All fields should be preserved
            faqItems.forEach((item, index) => {
              expect(result[index].question).toBe(item.question)
              expect(result[index].answer).toEqual(item.answer)
            })
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should preserve array order when auto-populating specs', () => {
      fc.assert(
        fc.property(
          fc.array(specItemArbitrary, { minLength: 2, maxLength: 10 }),
          objectIdArbitrary,
          (specs, productId) => {
            const product: ProductData = {
              id: productId,
              name: 'Test Product',
              specs,
            }
            const block: SpecsTableBlock = {
              blockType: 'specs-table',
              auto_populate: true,
            }
            
            const result = resolveSpecsTableData(block, product)
            
            // Order should be preserved
            expect(result.map(s => s.label)).toEqual(specs.map(s => s.label))
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should preserve array order when auto-populating FAQ', () => {
      fc.assert(
        fc.property(
          fc.array(faqItemArbitrary, { minLength: 2, maxLength: 8 }),
          objectIdArbitrary,
          (faqItems, productId) => {
            const product: ProductData = {
              id: productId,
              name: 'Test Product',
              faq: faqItems,
            }
            const block: FAQBlock = {
              blockType: 'faq',
              auto_populate: true,
            }
            
            const result = resolveFAQData(block, product)
            
            // Order should be preserved
            expect(result.map(f => f.question)).toEqual(faqItems.map(f => f.question))
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should preserve array order when auto-populating gallery', () => {
      fc.assert(
        fc.property(
          fc.array(objectIdArbitrary, { minLength: 2, maxLength: 10 }),
          objectIdArbitrary,
          (imageIds, productId) => {
            const product: ProductData = {
              id: productId,
              name: 'Test Product',
              gallery: imageIds.map(id => ({ image: id })),
            }
            const block: GalleryBlock = {
              blockType: 'gallery',
              auto_populate: true,
            }
            
            const result = resolveGalleryData(block, product)
            
            // Order should be preserved
            expect(result.map(g => g.image)).toEqual(imageIds)
          }
        ),
        { numRuns: 100 }
      )
    })
  })
})


/**
 * Edge case tests for block auto-population
 */
describe('Block Auto-Population Edge Cases', () => {
  /**
   * Test: Empty product data handling
   */
  describe('Empty product data', () => {
    it('should handle product with empty specs array', () => {
      const product: ProductData = {
        id: '507f1f77bcf86cd799439011',
        name: 'Empty Specs Product',
        specs: [],
      }
      const block: SpecsTableBlock = {
        blockType: 'specs-table',
        auto_populate: true,
        specs: [{ label: 'Manual', value: 'Value' }],
      }
      
      const result = resolveSpecsTableData(block, product)
      
      expect(result).toEqual([])
    })

    it('should handle product with empty faq array', () => {
      const product: ProductData = {
        id: '507f1f77bcf86cd799439011',
        name: 'Empty FAQ Product',
        faq: [],
      }
      const block: FAQBlock = {
        blockType: 'faq',
        auto_populate: true,
        items: [{ question: 'Manual?', answer: undefined }],
      }
      
      const result = resolveFAQData(block, product)
      
      expect(result).toEqual([])
    })

    it('should handle product with empty gallery array', () => {
      const product: ProductData = {
        id: '507f1f77bcf86cd799439011',
        name: 'Empty Gallery Product',
        gallery: [],
      }
      const block: GalleryBlock = {
        blockType: 'gallery',
        auto_populate: true,
        images: [{ image: '507f1f77bcf86cd799439012' }],
      }
      
      const result = resolveGalleryData(block, product)
      
      expect(result).toEqual([])
    })
  })

  /**
   * Test: Realistic product scenarios
   */
  describe('Realistic product scenarios', () => {
    it('should auto-populate specs for KSTAR inverter product', () => {
      const product: ProductData = {
        id: '507f1f77bcf86cd799439011',
        name: 'KSTAR BluE-S 6kW',
        specs: [
          { label: 'Puissance nominale', value: '6', unit: 'kW' },
          { label: 'Tension batterie', value: '48', unit: 'V' },
          { label: 'Rendement max', value: '97.6', unit: '%' },
          { label: 'Poids', value: '28', unit: 'kg' },
          { label: 'Garantie', value: '10', unit: 'ans' },
        ],
      }
      const block: SpecsTableBlock = {
        blockType: 'specs-table',
        title: 'Spécifications techniques',
        auto_populate: true,
      }
      
      const result = resolveSpecsTableData(block, product)
      
      expect(result).toHaveLength(5)
      expect(result[0]).toEqual({ label: 'Puissance nominale', value: '6', unit: 'kW' })
      expect(result[4]).toEqual({ label: 'Garantie', value: '10', unit: 'ans' })
    })

    it('should auto-populate FAQ for solar panel product', () => {
      const product: ProductData = {
        id: '507f1f77bcf86cd799439012',
        name: 'Panneau solaire 400W',
        faq: [
          { question: 'Quelle est la durée de vie ?', answer: { text: '25 ans minimum' } },
          { question: 'Résiste-t-il à la grêle ?', answer: { text: 'Oui, certifié IEC 61215' } },
        ],
      }
      const block: FAQBlock = {
        blockType: 'faq',
        title: 'Questions fréquentes',
        auto_populate: true,
      }
      
      const result = resolveFAQData(block, product)
      
      expect(result).toHaveLength(2)
      expect(result[0].question).toBe('Quelle est la durée de vie ?')
      expect(result[1].question).toBe('Résiste-t-il à la grêle ?')
    })

    it('should auto-populate gallery for battery product', () => {
      const product: ProductData = {
        id: '507f1f77bcf86cd799439013',
        name: 'Batterie lithium 10kWh',
        gallery: [
          { image: 'aaaaaaaaaaaaaaaaaaaaaaaa' },
          { image: 'bbbbbbbbbbbbbbbbbbbbbbbb' },
          { image: 'cccccccccccccccccccccccc' },
        ],
      }
      const block: GalleryBlock = {
        blockType: 'gallery',
        title: 'Galerie',
        columns: '3',
        lightbox: true,
        auto_populate: true,
      }
      
      const result = resolveGalleryData(block, product)
      
      expect(result).toHaveLength(3)
      expect(result[0].image).toBe('aaaaaaaaaaaaaaaaaaaaaaaa')
      expect(result[1].image).toBe('bbbbbbbbbbbbbbbbbbbbbbbb')
      expect(result[2].image).toBe('cccccccccccccccccccccccc')
      // Auto-populated images should not have captions
      result.forEach(item => {
        expect(item.caption).toBeUndefined()
      })
    })
  })

  /**
   * Test: Manual override scenarios
   */
  describe('Manual override scenarios', () => {
    it('should use manual specs even when product has specs', () => {
      const product: ProductData = {
        id: '507f1f77bcf86cd799439011',
        name: 'Product with specs',
        specs: [
          { label: 'Product Spec', value: '100', unit: 'W' },
        ],
      }
      const manualSpecs = [
        { label: 'Custom Spec 1', value: '200', unit: 'kW' },
        { label: 'Custom Spec 2', value: '50', unit: '%' },
      ]
      const block: SpecsTableBlock = {
        blockType: 'specs-table',
        auto_populate: false,
        specs: manualSpecs,
      }
      
      const result = resolveSpecsTableData(block, product)
      
      expect(result).toEqual(manualSpecs)
      expect(result).not.toEqual(product.specs)
    })

    it('should use manual FAQ even when product has FAQ', () => {
      const product: ProductData = {
        id: '507f1f77bcf86cd799439011',
        name: 'Product with FAQ',
        faq: [
          { question: 'Product question?', answer: { text: 'Product answer' } },
        ],
      }
      const manualItems = [
        { question: 'Custom question 1?', answer: { text: 'Custom answer 1' } },
        { question: 'Custom question 2?', answer: { text: 'Custom answer 2' } },
      ]
      const block: FAQBlock = {
        blockType: 'faq',
        auto_populate: false,
        items: manualItems,
      }
      
      const result = resolveFAQData(block, product)
      
      expect(result).toEqual(manualItems)
      expect(result).not.toEqual(product.faq)
    })

    it('should use manual gallery with captions even when product has gallery', () => {
      const product: ProductData = {
        id: '507f1f77bcf86cd799439011',
        name: 'Product with gallery',
        gallery: [
          { image: 'aaaaaaaaaaaaaaaaaaaaaaaa' },
        ],
      }
      const manualImages = [
        { image: 'bbbbbbbbbbbbbbbbbbbbbbbb', caption: 'Vue de face' },
        { image: 'cccccccccccccccccccccccc', caption: 'Vue arrière' },
      ]
      const block: GalleryBlock = {
        blockType: 'gallery',
        auto_populate: false,
        images: manualImages,
      }
      
      const result = resolveGalleryData(block, product)
      
      expect(result).toEqual(manualImages)
      expect(result[0].caption).toBe('Vue de face')
      expect(result[1].caption).toBe('Vue arrière')
    })
  })
})
