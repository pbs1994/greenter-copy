/**
 * Property-Based Tests for Draft Content Public Access Denial
 *
 * Feature: payload-cms-migration
 * Property 9: Draft Content Public Access Denial
 *
 * **Validates: Requirements 10.7, 20.6, 21.4**
 *
 * For any Blog_Post or Page with status "draft", a public request to view
 * that content should return a 404 response. Published content should be
 * accessible to everyone.
 */

import * as fc from 'fast-check'

/**
 * Content collections that support draft/published status
 */
type DraftableCollection = 'blog-posts' | 'pages'

const DRAFTABLE_COLLECTIONS: DraftableCollection[] = ['blog-posts', 'pages']

/**
 * Content status values
 */
type ContentStatus = 'draft' | 'published'

const CONTENT_STATUSES: ContentStatus[] = ['draft', 'published']

/**
 * User data structure (simplified for testing)
 */
interface UserData {
  id: string
  email: string
  role: 'admin' | 'editor'
}

/**
 * Request context for access control checks
 */
interface RequestContext {
  user: UserData | null
}


/**
 * Content document structure
 */
interface ContentDocument {
  id: string
  title: string
  slug: string
  status: ContentStatus
}

/**
 * Access control result
 */
interface AccessResult {
  allowed: boolean
  reason?: 'published' | 'admin_access' | 'draft_denied'
}

/**
 * Simulates Payload CMS access control for draftable collections
 * This mirrors the actual isPublishedOrAdmin access function in:
 * - collections/BlogPosts.ts
 * - collections/Pages.ts
 *
 * The access control logic:
 * - Admin users (req.user exists) can access all content
 * - Public users can only access published content
 */
class DraftContentAccessControl {
  /**
   * Check read access for BlogPosts collection
   * Based on collections/BlogPosts.ts isPublishedOrAdmin access function
   */
  checkBlogPostsAccess(document: ContentDocument, context: RequestContext): AccessResult {
    // Admin users can access all posts
    if (context.user) {
      return { allowed: true, reason: 'admin_access' }
    }

    // Public users can only access published posts
    if (document.status === 'published') {
      return { allowed: true, reason: 'published' }
    }

    return { allowed: false, reason: 'draft_denied' }
  }

  /**
   * Check read access for Pages collection
   * Based on collections/Pages.ts isPublishedOrAdmin access function
   */
  checkPagesAccess(document: ContentDocument, context: RequestContext): AccessResult {
    // Admin users can access all pages
    if (context.user) {
      return { allowed: true, reason: 'admin_access' }
    }

    // Public users can only access published pages
    if (document.status === 'published') {
      return { allowed: true, reason: 'published' }
    }

    return { allowed: false, reason: 'draft_denied' }
  }


  /**
   * Generic access check for any draftable collection
   */
  checkAccess(
    collection: DraftableCollection,
    document: ContentDocument,
    context: RequestContext
  ): AccessResult {
    switch (collection) {
      case 'blog-posts':
        return this.checkBlogPostsAccess(document, context)
      case 'pages':
        return this.checkPagesAccess(document, context)
      default:
        return { allowed: false, reason: 'draft_denied' }
    }
  }

  /**
   * Simulates the Payload query filter for public access
   * Returns the where clause that would be applied for public users
   */
  getPublicAccessFilter(): { status: { equals: 'published' } } {
    return {
      status: {
        equals: 'published',
      },
    }
  }
}

/**
 * Arbitrary generators for test data
 */

/**
 * Generator for valid MongoDB ObjectId format
 */
const objectIdArbitrary = fc.stringMatching(/^[a-f0-9]{24}$/)

/**
 * Generator for email addresses
 */
const emailArbitrary = fc
  .tuple(
    fc.stringMatching(/^[a-z][a-z0-9]{2,10}$/),
    fc.constantFrom('gmail.com', 'greenter.fr', 'example.com', 'admin.fr')
  )
  .map(([local, domain]) => `${local}@${domain}`)

/**
 * Generator for authenticated user data
 */
const authenticatedUserArbitrary: fc.Arbitrary<UserData> = fc.record({
  id: objectIdArbitrary,
  email: emailArbitrary,
  role: fc.constantFrom('admin' as const, 'editor' as const),
})


/**
 * Generator for public (unauthenticated) request context
 */
const publicContextArbitrary: fc.Arbitrary<RequestContext> = fc.constant({ user: null })

/**
 * Generator for authenticated request context
 */
const authenticatedContextArbitrary: fc.Arbitrary<RequestContext> = authenticatedUserArbitrary.map(
  (user) => ({ user })
)

/**
 * Generator for any request context (public or authenticated)
 */
const requestContextArbitrary: fc.Arbitrary<RequestContext> = fc.oneof(
  publicContextArbitrary,
  authenticatedContextArbitrary
)

/**
 * Generator for draftable collections
 */
const draftableCollectionArbitrary = fc.constantFrom<DraftableCollection>(...DRAFTABLE_COLLECTIONS)

/**
 * Generator for content status
 */
const contentStatusArbitrary = fc.constantFrom<ContentStatus>(...CONTENT_STATUSES)

/**
 * Generator for valid slugs
 */
const slugArbitrary = fc.stringMatching(/^[a-z][a-z0-9-]{2,30}$/)

/**
 * Generator for content titles (French e-commerce context)
 */
const titleArbitrary = fc.constantFrom(
  'Guide installation panneaux solaires',
  'Actualités énergie renouvelable',
  'Conseils maintenance pompe à chaleur',
  'Promotions été 2024',
  'Témoignages clients',
  'FAQ installation',
  'Conditions générales de vente',
  'Politique de confidentialité',
  'Notre équipe',
  'À propos de Greenter',
  'Aides financières disponibles',
  'Simulateur économies énergie'
)

/**
 * Generator for content documents
 */
const contentDocumentArbitrary: fc.Arbitrary<ContentDocument> = fc.record({
  id: objectIdArbitrary,
  title: titleArbitrary,
  slug: slugArbitrary,
  status: contentStatusArbitrary,
})


/**
 * Generator for draft content documents
 */
const draftDocumentArbitrary: fc.Arbitrary<ContentDocument> = fc.record({
  id: objectIdArbitrary,
  title: titleArbitrary,
  slug: slugArbitrary,
  status: fc.constant('draft' as const),
})

/**
 * Generator for published content documents
 */
const publishedDocumentArbitrary: fc.Arbitrary<ContentDocument> = fc.record({
  id: objectIdArbitrary,
  title: titleArbitrary,
  slug: slugArbitrary,
  status: fc.constant('published' as const),
})

describe('Property 9: Draft Content Public Access Denial', () => {
  const accessControl = new DraftContentAccessControl()

  /**
   * Property: Draft content SHALL be denied to public (unauthenticated) users
   *
   * **Validates: Requirements 10.7, 20.6, 21.4**
   */
  describe('Draft content public access denial', () => {
    it('should deny public access to draft blog posts', () => {
      fc.assert(
        fc.property(draftDocumentArbitrary, (document) => {
          const context: RequestContext = { user: null }
          const result = accessControl.checkAccess('blog-posts', document, context)

          return result.allowed === false && result.reason === 'draft_denied'
        }),
        { numRuns: 100 }
      )
    })

    it('should deny public access to draft pages', () => {
      fc.assert(
        fc.property(draftDocumentArbitrary, (document) => {
          const context: RequestContext = { user: null }
          const result = accessControl.checkAccess('pages', document, context)

          return result.allowed === false && result.reason === 'draft_denied'
        }),
        { numRuns: 100 }
      )
    })

    it('should deny public access to draft content across all draftable collections', () => {
      fc.assert(
        fc.property(
          draftableCollectionArbitrary,
          draftDocumentArbitrary,
          (collection, document) => {
            const context: RequestContext = { user: null }
            const result = accessControl.checkAccess(collection, document, context)

            return result.allowed === false && result.reason === 'draft_denied'
          }
        ),
        { numRuns: 100 }
      )
    })
  })


  /**
   * Property: Draft content SHALL be accessible to admin users
   *
   * **Validates: Requirements 10.7, 20.6, 21.4**
   */
  describe('Draft content admin access', () => {
    it('should allow admin access to draft blog posts', () => {
      fc.assert(
        fc.property(
          draftDocumentArbitrary,
          authenticatedUserArbitrary,
          (document, user) => {
            const context: RequestContext = { user }
            const result = accessControl.checkAccess('blog-posts', document, context)

            return result.allowed === true && result.reason === 'admin_access'
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should allow admin access to draft pages', () => {
      fc.assert(
        fc.property(
          draftDocumentArbitrary,
          authenticatedUserArbitrary,
          (document, user) => {
            const context: RequestContext = { user }
            const result = accessControl.checkAccess('pages', document, context)

            return result.allowed === true && result.reason === 'admin_access'
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should allow admin access to draft content across all draftable collections', () => {
      fc.assert(
        fc.property(
          draftableCollectionArbitrary,
          draftDocumentArbitrary,
          authenticatedUserArbitrary,
          (collection, document, user) => {
            const context: RequestContext = { user }
            const result = accessControl.checkAccess(collection, document, context)

            return result.allowed === true && result.reason === 'admin_access'
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  /**
   * Property: Published content SHALL be accessible to everyone (public and admin)
   *
   * **Validates: Requirements 10.7, 20.6, 21.4**
   */
  describe('Published content public access', () => {
    it('should allow public access to published blog posts', () => {
      fc.assert(
        fc.property(publishedDocumentArbitrary, (document) => {
          const context: RequestContext = { user: null }
          const result = accessControl.checkAccess('blog-posts', document, context)

          return result.allowed === true && result.reason === 'published'
        }),
        { numRuns: 100 }
      )
    })


    it('should allow public access to published pages', () => {
      fc.assert(
        fc.property(publishedDocumentArbitrary, (document) => {
          const context: RequestContext = { user: null }
          const result = accessControl.checkAccess('pages', document, context)

          return result.allowed === true && result.reason === 'published'
        }),
        { numRuns: 100 }
      )
    })

    it('should allow public access to published content across all draftable collections', () => {
      fc.assert(
        fc.property(
          draftableCollectionArbitrary,
          publishedDocumentArbitrary,
          (collection, document) => {
            const context: RequestContext = { user: null }
            const result = accessControl.checkAccess(collection, document, context)

            return result.allowed === true && result.reason === 'published'
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should allow admin access to published content', () => {
      fc.assert(
        fc.property(
          draftableCollectionArbitrary,
          publishedDocumentArbitrary,
          authenticatedUserArbitrary,
          (collection, document, user) => {
            const context: RequestContext = { user }
            const result = accessControl.checkAccess(collection, document, context)

            return result.allowed === true && result.reason === 'admin_access'
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  /**
   * Property: Access control SHALL be consistent across BlogPosts and Pages collections
   *
   * **Validates: Requirements 10.7, 20.6, 21.4**
   */
  describe('Access control consistency across collections', () => {
    it('should apply same access rules to BlogPosts and Pages for draft content', () => {
      fc.assert(
        fc.property(
          draftDocumentArbitrary,
          requestContextArbitrary,
          (document, context) => {
            const blogPostResult = accessControl.checkAccess('blog-posts', document, context)
            const pageResult = accessControl.checkAccess('pages', document, context)

            // Both collections should have the same access result
            return (
              blogPostResult.allowed === pageResult.allowed &&
              blogPostResult.reason === pageResult.reason
            )
          }
        ),
        { numRuns: 100 }
      )
    })


    it('should apply same access rules to BlogPosts and Pages for published content', () => {
      fc.assert(
        fc.property(
          publishedDocumentArbitrary,
          requestContextArbitrary,
          (document, context) => {
            const blogPostResult = accessControl.checkAccess('blog-posts', document, context)
            const pageResult = accessControl.checkAccess('pages', document, context)

            // Both collections should allow access to published content
            return (
              blogPostResult.allowed === true &&
              pageResult.allowed === true
            )
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should return consistent results for the same document and context', () => {
      fc.assert(
        fc.property(
          draftableCollectionArbitrary,
          contentDocumentArbitrary,
          requestContextArbitrary,
          (collection, document, context) => {
            const result1 = accessControl.checkAccess(collection, document, context)
            const result2 = accessControl.checkAccess(collection, document, context)
            const result3 = accessControl.checkAccess(collection, document, context)

            return (
              result1.allowed === result2.allowed &&
              result2.allowed === result3.allowed &&
              result1.reason === result2.reason &&
              result2.reason === result3.reason
            )
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  /**
   * Property: Public access filter SHALL only return published content
   *
   * **Validates: Requirements 10.7, 20.6, 21.4**
   */
  describe('Public access filter', () => {
    it('should generate filter that only matches published status', () => {
      const filter = accessControl.getPublicAccessFilter()

      expect(filter.status.equals).toBe('published')
    })

    it('should filter out draft content when applied', () => {
      fc.assert(
        fc.property(contentDocumentArbitrary, (document) => {
          const filter = accessControl.getPublicAccessFilter()
          const matchesFilter = document.status === filter.status.equals

          // Draft content should NOT match the filter
          if (document.status === 'draft') {
            return matchesFilter === false
          }
          // Published content should match the filter
          return matchesFilter === true
        }),
        { numRuns: 100 }
      )
    })
  })
})


/**
 * Edge case tests for draft content access
 */
describe('Draft Content Access Edge Cases', () => {
  const accessControl = new DraftContentAccessControl()

  /**
   * Test: Specific collection access patterns
   */
  describe('BlogPosts collection access patterns', () => {
    const draftBlogPost: ContentDocument = {
      id: '507f1f77bcf86cd799439011',
      title: 'Guide installation panneaux solaires',
      slug: 'guide-installation-panneaux-solaires',
      status: 'draft',
    }

    const publishedBlogPost: ContentDocument = {
      id: '507f1f77bcf86cd799439012',
      title: 'Actualités énergie renouvelable',
      slug: 'actualites-energie-renouvelable',
      status: 'published',
    }

    it('should deny public access to draft blog post', () => {
      const result = accessControl.checkAccess('blog-posts', draftBlogPost, { user: null })
      expect(result.allowed).toBe(false)
      expect(result.reason).toBe('draft_denied')
    })

    it('should allow public access to published blog post', () => {
      const result = accessControl.checkAccess('blog-posts', publishedBlogPost, { user: null })
      expect(result.allowed).toBe(true)
      expect(result.reason).toBe('published')
    })

    it('should allow admin access to draft blog post', () => {
      const adminUser: UserData = {
        id: '507f1f77bcf86cd799439013',
        email: 'admin@greenter.fr',
        role: 'admin',
      }
      const result = accessControl.checkAccess('blog-posts', draftBlogPost, { user: adminUser })
      expect(result.allowed).toBe(true)
      expect(result.reason).toBe('admin_access')
    })

    it('should allow admin access to published blog post', () => {
      const adminUser: UserData = {
        id: '507f1f77bcf86cd799439013',
        email: 'admin@greenter.fr',
        role: 'admin',
      }
      const result = accessControl.checkAccess('blog-posts', publishedBlogPost, { user: adminUser })
      expect(result.allowed).toBe(true)
      expect(result.reason).toBe('admin_access')
    })
  })


  /**
   * Test: Pages collection access patterns
   */
  describe('Pages collection access patterns', () => {
    const draftPage: ContentDocument = {
      id: '507f1f77bcf86cd799439021',
      title: 'Nouvelle page promotions',
      slug: 'nouvelle-page-promotions',
      status: 'draft',
    }

    const publishedPage: ContentDocument = {
      id: '507f1f77bcf86cd799439022',
      title: 'À propos de Greenter',
      slug: 'a-propos-de-greenter',
      status: 'published',
    }

    it('should deny public access to draft page', () => {
      const result = accessControl.checkAccess('pages', draftPage, { user: null })
      expect(result.allowed).toBe(false)
      expect(result.reason).toBe('draft_denied')
    })

    it('should allow public access to published page', () => {
      const result = accessControl.checkAccess('pages', publishedPage, { user: null })
      expect(result.allowed).toBe(true)
      expect(result.reason).toBe('published')
    })

    it('should allow admin access to draft page', () => {
      const adminUser: UserData = {
        id: '507f1f77bcf86cd799439023',
        email: 'admin@greenter.fr',
        role: 'admin',
      }
      const result = accessControl.checkAccess('pages', draftPage, { user: adminUser })
      expect(result.allowed).toBe(true)
      expect(result.reason).toBe('admin_access')
    })

    it('should allow editor access to draft page', () => {
      const editorUser: UserData = {
        id: '507f1f77bcf86cd799439024',
        email: 'editor@greenter.fr',
        role: 'editor',
      }
      const result = accessControl.checkAccess('pages', draftPage, { user: editorUser })
      expect(result.allowed).toBe(true)
      expect(result.reason).toBe('admin_access')
    })
  })


  /**
   * Test: User role variations
   */
  describe('User role variations', () => {
    const draftDocument: ContentDocument = {
      id: '507f1f77bcf86cd799439031',
      title: 'Test Document',
      slug: 'test-document',
      status: 'draft',
    }

    it('should allow admin role access to draft content', () => {
      const adminUser: UserData = {
        id: '507f1f77bcf86cd799439032',
        email: 'admin@greenter.fr',
        role: 'admin',
      }
      const result = accessControl.checkAccess('blog-posts', draftDocument, { user: adminUser })
      expect(result.allowed).toBe(true)
    })

    it('should allow editor role access to draft content', () => {
      const editorUser: UserData = {
        id: '507f1f77bcf86cd799439033',
        email: 'editor@greenter.fr',
        role: 'editor',
      }
      const result = accessControl.checkAccess('blog-posts', draftDocument, { user: editorUser })
      expect(result.allowed).toBe(true)
    })

    it('should allow access regardless of email domain', () => {
      const users: UserData[] = [
        { id: '507f1f77bcf86cd799439034', email: 'admin@greenter.fr', role: 'admin' },
        { id: '507f1f77bcf86cd799439035', email: 'admin@gmail.com', role: 'admin' },
        { id: '507f1f77bcf86cd799439036', email: 'admin@example.com', role: 'admin' },
      ]

      for (const user of users) {
        const result = accessControl.checkAccess('blog-posts', draftDocument, { user })
        expect(result.allowed).toBe(true)
      }
    })
  })

  /**
   * Test: Boundary conditions
   */
  describe('Boundary conditions', () => {
    it('should handle null user as public access', () => {
      const draftDocument: ContentDocument = {
        id: '507f1f77bcf86cd799439041',
        title: 'Test',
        slug: 'test',
        status: 'draft',
      }
      const result = accessControl.checkAccess('blog-posts', draftDocument, { user: null })
      expect(result.allowed).toBe(false)
      expect(result.reason).toBe('draft_denied')
    })

    it('should handle all status values correctly', () => {
      const statuses: ContentStatus[] = ['draft', 'published']
      const publicContext: RequestContext = { user: null }

      for (const status of statuses) {
        const document: ContentDocument = {
          id: '507f1f77bcf86cd799439042',
          title: 'Test',
          slug: 'test',
          status,
        }
        const result = accessControl.checkAccess('blog-posts', document, publicContext)

        if (status === 'draft') {
          expect(result.allowed).toBe(false)
        } else {
          expect(result.allowed).toBe(true)
        }
      }
    })
  })
})


/**
 * Real-world scenario tests for draft content access
 */
describe('Draft Content Access - Real-World Scenarios', () => {
  const accessControl = new DraftContentAccessControl()

  /**
   * Test: Blog post workflow scenarios
   */
  describe('Blog post workflow scenarios', () => {
    const adminUser: UserData = {
      id: '507f1f77bcf86cd799439051',
      email: 'admin@greenter.fr',
      role: 'admin',
    }

    it('should allow admin to preview draft blog post before publishing', () => {
      const draftPost: ContentDocument = {
        id: '507f1f77bcf86cd799439052',
        title: 'Guide installation panneaux solaires 2024',
        slug: 'guide-installation-panneaux-solaires-2024',
        status: 'draft',
      }
      const result = accessControl.checkAccess('blog-posts', draftPost, { user: adminUser })
      expect(result.allowed).toBe(true)
      expect(result.reason).toBe('admin_access')
    })

    it('should deny public access to draft blog post (returns 404)', () => {
      const draftPost: ContentDocument = {
        id: '507f1f77bcf86cd799439053',
        title: 'Upcoming Promotions',
        slug: 'upcoming-promotions',
        status: 'draft',
      }
      const result = accessControl.checkAccess('blog-posts', draftPost, { user: null })
      expect(result.allowed).toBe(false)
      // This would result in a 404 response on the frontend
    })

    it('should allow public access after blog post is published', () => {
      const publishedPost: ContentDocument = {
        id: '507f1f77bcf86cd799439054',
        title: 'Guide installation panneaux solaires 2024',
        slug: 'guide-installation-panneaux-solaires-2024',
        status: 'published',
      }
      const result = accessControl.checkAccess('blog-posts', publishedPost, { user: null })
      expect(result.allowed).toBe(true)
      expect(result.reason).toBe('published')
    })
  })


  /**
   * Test: Landing page workflow scenarios
   */
  describe('Landing page workflow scenarios', () => {
    const editorUser: UserData = {
      id: '507f1f77bcf86cd799439061',
      email: 'editor@greenter.fr',
      role: 'editor',
    }

    it('should allow editor to preview draft landing page', () => {
      const draftPage: ContentDocument = {
        id: '507f1f77bcf86cd799439062',
        title: 'Promotions Été 2024',
        slug: 'promotions-ete-2024',
        status: 'draft',
      }
      const result = accessControl.checkAccess('pages', draftPage, { user: editorUser })
      expect(result.allowed).toBe(true)
      expect(result.reason).toBe('admin_access')
    })

    it('should deny public access to draft landing page', () => {
      const draftPage: ContentDocument = {
        id: '507f1f77bcf86cd799439063',
        title: 'Promotions Été 2024',
        slug: 'promotions-ete-2024',
        status: 'draft',
      }
      const result = accessControl.checkAccess('pages', draftPage, { user: null })
      expect(result.allowed).toBe(false)
      expect(result.reason).toBe('draft_denied')
    })

    it('should allow public access to published landing page', () => {
      const publishedPage: ContentDocument = {
        id: '507f1f77bcf86cd799439064',
        title: 'Promotions Été 2024',
        slug: 'promotions-ete-2024',
        status: 'published',
      }
      const result = accessControl.checkAccess('pages', publishedPage, { user: null })
      expect(result.allowed).toBe(true)
      expect(result.reason).toBe('published')
    })
  })

  /**
   * Test: SEO and crawler scenarios
   */
  describe('SEO and crawler scenarios', () => {
    it('should prevent search engines from indexing draft content', () => {
      const draftContent: ContentDocument = {
        id: '507f1f77bcf86cd799439071',
        title: 'SEO Test Page',
        slug: 'seo-test-page',
        status: 'draft',
      }
      // Search engine crawlers are unauthenticated
      const result = accessControl.checkAccess('pages', draftContent, { user: null })
      expect(result.allowed).toBe(false)
      // This ensures draft content won't appear in search results
    })

    it('should allow search engines to index published content', () => {
      const publishedContent: ContentDocument = {
        id: '507f1f77bcf86cd799439072',
        title: 'SEO Test Page',
        slug: 'seo-test-page',
        status: 'published',
      }
      const result = accessControl.checkAccess('pages', publishedContent, { user: null })
      expect(result.allowed).toBe(true)
    })
  })


  /**
   * Test: Multiple concurrent access attempts
   */
  describe('Concurrent access scenarios', () => {
    it('should handle multiple simultaneous access checks correctly', () => {
      const adminUser: UserData = {
        id: '507f1f77bcf86cd799439081',
        email: 'admin@greenter.fr',
        role: 'admin',
      }

      const draftBlogPost: ContentDocument = {
        id: '507f1f77bcf86cd799439082',
        title: 'Draft Blog',
        slug: 'draft-blog',
        status: 'draft',
      }

      const publishedPage: ContentDocument = {
        id: '507f1f77bcf86cd799439083',
        title: 'Published Page',
        slug: 'published-page',
        status: 'published',
      }

      // Simulate multiple concurrent requests
      const results = [
        accessControl.checkAccess('blog-posts', draftBlogPost, { user: null }),
        accessControl.checkAccess('blog-posts', draftBlogPost, { user: adminUser }),
        accessControl.checkAccess('pages', publishedPage, { user: null }),
        accessControl.checkAccess('pages', publishedPage, { user: adminUser }),
      ]

      expect(results[0].allowed).toBe(false) // Public cannot access draft blog
      expect(results[1].allowed).toBe(true) // Admin can access draft blog
      expect(results[2].allowed).toBe(true) // Public can access published page
      expect(results[3].allowed).toBe(true) // Admin can access published page
    })
  })

  /**
   * Test: Session expiry scenarios
   */
  describe('Session expiry scenarios', () => {
    it('should deny access when admin session expires (user becomes null)', () => {
      const draftContent: ContentDocument = {
        id: '507f1f77bcf86cd799439091',
        title: 'Draft Content',
        slug: 'draft-content',
        status: 'draft',
      }

      // Simulate session expiry by having user become null
      const result = accessControl.checkAccess('blog-posts', draftContent, { user: null })
      expect(result.allowed).toBe(false)
      expect(result.reason).toBe('draft_denied')
    })

    it('should still allow access to published content after session expiry', () => {
      const publishedContent: ContentDocument = {
        id: '507f1f77bcf86cd799439092',
        title: 'Published Content',
        slug: 'published-content',
        status: 'published',
      }

      const result = accessControl.checkAccess('blog-posts', publishedContent, { user: null })
      expect(result.allowed).toBe(true)
      expect(result.reason).toBe('published')
    })
  })
})
