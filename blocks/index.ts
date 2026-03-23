/**
 * Blocks Index
 * 
 * Exports all modular blocks for use in Payload CMS collections.
 * ProductBlocks includes all blocks suitable for product pages.
 * PageBlocks includes blocks suitable for custom landing pages and blog posts.
 * 
 * @validates Requirements 2.9, 11.3
 */

import { HeroBlock } from './Hero'
import { SpecsTableBlock } from './SpecsTable'
import { FAQBlock } from './FAQ'
import { GalleryBlock } from './Gallery'
import { ComparisonChartBlock } from './ComparisonChart'
import { CTABlock } from './CTA'
import { RichTextBlock } from './RichText'

/**
 * ProductBlocks - Blocks available for product pages
 * Includes all blocks including SpecsTable which is product-specific
 * 
 * @validates Requirements 2.9
 */
export const ProductBlocks = [
  HeroBlock,
  SpecsTableBlock,
  FAQBlock,
  GalleryBlock,
  ComparisonChartBlock,
  CTABlock,
  RichTextBlock,
]

/**
 * PageBlocks - Blocks available for custom pages and blog posts
 * Excludes SpecsTable as it's product-specific
 * 
 * @validates Requirements 11.3
 */
export const PageBlocks = [
  HeroBlock,
  FAQBlock,
  GalleryBlock,
  ComparisonChartBlock,
  CTABlock,
  RichTextBlock,
]

// Re-export individual blocks for direct imports
export {
  HeroBlock,
  SpecsTableBlock,
  FAQBlock,
  GalleryBlock,
  ComparisonChartBlock,
  CTABlock,
  RichTextBlock,
}
