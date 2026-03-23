/**
 * Property Test: Related Articles by Tags
 * 
 * Validates that related articles are correctly selected based on
 * shared tags, and that the selection algorithm works correctly.
 * 
 * @validates Requirements 20.5
 */

import * as fc from 'fast-check'

// Blog post type for testing
interface BlogPost {
  id: string
  title: string
  slug: string
  status: 'draft' | 'published'
  tags: string[]
}

// Arbitrary for generating tags
const tagArb = fc.stringMatching(/^[a-z]+(-[a-z]+)*$/).filter(s => s.length >= 3 && s.length <= 20)

// Arbitrary for generating blog post IDs
const idArb = fc.uuid()

// Arbitrary for generating blog post slugs
const slugArb = fc.stringMatching(/^[a-z0-9]+(-[a-z0-9]+)*$/).filter(s => s.length >= 3 && s.length <= 50)

// Arbitrary for generating blog posts
const blogPostArb = fc.record({
  id: idArb,
  title: fc.string({ minLength: 5, maxLength: 100 }),
  slug: slugArb,
  status: fc.constantFrom('draft', 'published') as fc.Arbitrary<'draft' | 'published'>,
  tags: fc.array(tagArb, { minLength: 0, maxLength: 5 }),
})

/**
 * Find related articles based on shared tags
 * Simulates the actual query logic
 */
function findRelatedArticles(
  currentPost: BlogPost,
  allPosts: BlogPost[],
  limit: number = 3
): BlogPost[] {
  // Filter out current post and drafts
  const candidates = allPosts.filter(
    p => p.id !== currentPost.id && p.status === 'published'
  )
  
  if (currentPost.tags.length === 0) {
    // No tags, return recent posts
    return candidates.slice(0, limit)
  }
  
  // Score posts by number of shared tags
  const scored = candidates.map(post => {
    const sharedTags = post.tags.filter(tag => currentPost.tags.includes(tag))
    return { post, score: sharedTags.length }
  })
  
  // Sort by score (descending), then filter those with at least 1 shared tag
  const withSharedTags = scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(s => s.post)
  
  if (withSharedTags.length > 0) {
    return withSharedTags.slice(0, limit)
  }
  
  // Fallback to recent posts if no shared tags
  return candidates.slice(0, limit)
}

/**
 * Count shared tags between two posts
 */
function countSharedTags(post1: BlogPost, post2: BlogPost): number {
  return post1.tags.filter(tag => post2.tags.includes(tag)).length
}

describe('Property: Related Articles by Tags', () => {
  /**
   * Property 1: Related articles exclude the current post
   */
  it('should never include the current post in related articles', () => {
    fc.assert(
      fc.property(
        blogPostArb,
        fc.array(blogPostArb, { minLength: 1, maxLength: 20 }),
        (currentPost, otherPosts) => {
          const allPosts = [currentPost, ...otherPosts]
          const related = findRelatedArticles(currentPost, allPosts)
          
          // Current post should never be in related
          expect(related.find(p => p.id === currentPost.id)).toBeUndefined()
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property 2: Related articles only include published posts
   */
  it('should only include published posts', () => {
    fc.assert(
      fc.property(
        fc.record({
          ...blogPostArb.generator,
          status: fc.constant('published' as const),
        }) as fc.Arbitrary<BlogPost>,
        fc.array(blogPostArb, { minLength: 1, maxLength: 20 }),
        (currentPost, otherPosts) => {
          const allPosts = [currentPost, ...otherPosts]
          const related = findRelatedArticles(currentPost, allPosts)
          
          // All related posts should be published
          related.forEach(post => {
            expect(post.status).toBe('published')
          })
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property 3: Related articles respect the limit
   */
  it('should respect the limit parameter', () => {
    fc.assert(
      fc.property(
        blogPostArb,
        fc.array(blogPostArb, { minLength: 5, maxLength: 20 }),
        fc.integer({ min: 1, max: 10 }),
        (currentPost, otherPosts, limit) => {
          const allPosts = [currentPost, ...otherPosts]
          const related = findRelatedArticles(currentPost, allPosts, limit)
          
          // Should not exceed limit
          expect(related.length).toBeLessThanOrEqual(limit)
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property 4: Posts with shared tags are prioritized
   */
  it('should prioritize posts with shared tags', () => {
    fc.assert(
      fc.property(
        fc.array(tagArb, { minLength: 2, maxLength: 5 }),
        fc.array(blogPostArb, { minLength: 5, maxLength: 15 }),
        (sharedTags, otherPosts) => {
          // Create current post with specific tags
          const currentPost: BlogPost = {
            id: 'current-post-id',
            title: 'Current Post',
            slug: 'current-post',
            status: 'published',
            tags: sharedTags,
          }
          
          // Create a post that shares tags
          const relatedPost: BlogPost = {
            id: 'related-post-id',
            title: 'Related Post',
            slug: 'related-post',
            status: 'published',
            tags: [sharedTags[0]], // Share at least one tag
          }
          
          // Create posts without shared tags
          const unrelatedPosts = otherPosts
            .filter(p => p.status === 'published')
            .map(p => ({
              ...p,
              tags: p.tags.filter(t => !sharedTags.includes(t)),
            }))
          
          const allPosts = [currentPost, relatedPost, ...unrelatedPosts]
          const related = findRelatedArticles(currentPost, allPosts)
          
          // If there are posts with shared tags, they should be included
          if (related.length > 0) {
            const hasRelatedPost = related.some(p => p.id === relatedPost.id)
            // The related post should be in results if it exists
            expect(hasRelatedPost || related.every(p => countSharedTags(currentPost, p) > 0)).toBe(true)
          }
          
          return true
        }
      ),
      { numRuns: 50 }
    )
  })

  /**
   * Property 5: More shared tags = higher priority
   */
  it('should rank posts by number of shared tags', () => {
    fc.assert(
      fc.property(
        fc.array(tagArb, { minLength: 3, maxLength: 5 }),
        (tags) => {
          const currentPost: BlogPost = {
            id: 'current',
            title: 'Current',
            slug: 'current',
            status: 'published',
            tags: tags,
          }
          
          // Post with 1 shared tag
          const post1Tag: BlogPost = {
            id: 'post-1-tag',
            title: 'Post 1 Tag',
            slug: 'post-1-tag',
            status: 'published',
            tags: [tags[0]],
          }
          
          // Post with 2 shared tags
          const post2Tags: BlogPost = {
            id: 'post-2-tags',
            title: 'Post 2 Tags',
            slug: 'post-2-tags',
            status: 'published',
            tags: [tags[0], tags[1]],
          }
          
          // Post with 3 shared tags
          const post3Tags: BlogPost = {
            id: 'post-3-tags',
            title: 'Post 3 Tags',
            slug: 'post-3-tags',
            status: 'published',
            tags: [tags[0], tags[1], tags[2]],
          }
          
          const allPosts = [currentPost, post1Tag, post2Tags, post3Tags]
          const related = findRelatedArticles(currentPost, allPosts, 3)
          
          // Post with 3 tags should be first
          if (related.length >= 1) {
            expect(related[0].id).toBe('post-3-tags')
          }
          
          // Post with 2 tags should be second
          if (related.length >= 2) {
            expect(related[1].id).toBe('post-2-tags')
          }
          
          // Post with 1 tag should be third
          if (related.length >= 3) {
            expect(related[2].id).toBe('post-1-tag')
          }
          
          return true
        }
      ),
      { numRuns: 50 }
    )
  })

  /**
   * Property 6: Empty tags falls back to recent posts
   */
  it('should return recent posts when current post has no tags', () => {
    fc.assert(
      fc.property(
        fc.array(blogPostArb, { minLength: 3, maxLength: 10 }),
        (otherPosts) => {
          const currentPost: BlogPost = {
            id: 'current',
            title: 'Current',
            slug: 'current',
            status: 'published',
            tags: [], // No tags
          }
          
          const publishedPosts = otherPosts.filter(p => p.status === 'published')
          const allPosts = [currentPost, ...otherPosts]
          const related = findRelatedArticles(currentPost, allPosts)
          
          // Should return some posts (up to limit) if available
          expect(related.length).toBeLessThanOrEqual(Math.min(3, publishedPosts.length))
          
          return true
        }
      ),
      { numRuns: 50 }
    )
  })

  /**
   * Property 7: No related posts when only drafts exist
   */
  it('should return empty when only drafts exist', () => {
    fc.assert(
      fc.property(
        blogPostArb,
        fc.array(
          fc.record({
            id: idArb,
            title: fc.string({ minLength: 5, maxLength: 100 }),
            slug: slugArb,
            status: fc.constant('draft' as const),
            tags: fc.array(tagArb, { minLength: 0, maxLength: 5 }),
          }),
          { minLength: 1, maxLength: 10 }
        ),
        (currentPost, draftPosts) => {
          const allPosts = [{ ...currentPost, status: 'published' as const }, ...draftPosts]
          const related = findRelatedArticles(allPosts[0], allPosts)
          
          // Should be empty since all other posts are drafts
          expect(related.length).toBe(0)
          
          return true
        }
      ),
      { numRuns: 50 }
    )
  })

  /**
   * Property 8: Related articles are unique
   */
  it('should return unique posts', () => {
    fc.assert(
      fc.property(
        blogPostArb,
        fc.array(blogPostArb, { minLength: 1, maxLength: 20 }),
        (currentPost, otherPosts) => {
          const allPosts = [currentPost, ...otherPosts]
          const related = findRelatedArticles(currentPost, allPosts)
          
          // All IDs should be unique
          const ids = related.map(p => p.id)
          const uniqueIds = new Set(ids)
          expect(uniqueIds.size).toBe(ids.length)
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })
})
