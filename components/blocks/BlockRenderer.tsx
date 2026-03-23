/**
 * BlockRenderer Component
 * 
 * Dynamically renders Payload CMS blocks in order.
 * Handles auto-population of product data for SpecsTable, FAQ, and Gallery blocks.
 * 
 * @validates Requirements 19.3, 21.2
 */
'use client'

import { HeroBlock } from './HeroBlock'
import { SpecsTableBlock } from './SpecsTableBlock'
import { FAQBlock } from './FAQBlock'
import { GalleryBlock } from './GalleryBlock'
import { ComparisonChartBlock } from './ComparisonChartBlock'
import { CTABlock } from './CTABlock'
import { RichTextBlock } from './RichTextBlock'
import type { Media } from '@/payload-types'

// Block type definitions matching Payload block slugs
type BlockType =
  | { blockType: 'hero'; heading: string; subheading?: string | null; background_image?: Media | string | null; cta?: { text?: string | null; url?: string | null; style?: 'primary' | 'secondary' | null } | null; alignment?: 'left' | 'center' | 'right' | null; overlay?: boolean | null }
  | { blockType: 'specs-table'; title?: string | null; auto_populate?: boolean | null; specs?: Array<{ label: string; value: string }> | null; columns?: number | null }
  | { blockType: 'faq'; title?: string | null; auto_populate?: boolean | null; items?: Array<{ question: string; answer?: unknown }> | null }
  | { blockType: 'gallery'; title?: string | null; columns?: '2' | '3' | '4' | null; lightbox?: boolean | null; auto_populate?: boolean | null; images?: Array<{ image: Media | string; caption?: string | null }> | null }
  | { blockType: 'comparison-chart'; title?: string | null; columns: Array<{ header: string }>; rows: Array<{ feature: string; cells: Array<{ value?: string | null; type: 'text' | 'check' | 'cross' }> }>; highlight_column?: number | null }
  | { blockType: 'cta'; heading: string; description?: string | null; button?: { text?: string | null; url?: string | null; style?: 'primary' | 'secondary' | null } | null; style?: 'default' | 'highlight' | 'banner' | null; background_color?: string | null }
  | { blockType: 'richtext'; content: unknown }

// Product data for auto-population
interface ProductData {
  specs?: Array<{ label: string; value: string; unit?: string | null }> | null
  faq?: Array<{ question: string; answer?: unknown }> | null
  gallery?: Array<Media | string> | null
}

interface BlockRendererProps {
  blocks: BlockType[]
  productData?: ProductData | null
}

/**
 * Renders an array of Payload CMS blocks in order
 * 
 * @param blocks - Array of block objects from Payload
 * @param productData - Optional product data for auto-population
 */
export function BlockRenderer({ blocks, productData }: BlockRendererProps) {
  if (!blocks?.length) {
    return null
  }

  return (
    <div className="blocks-container">
      {blocks.map((block, index) => (
        <RenderBlock
          key={index}
          block={block}
          productData={productData}
        />
      ))}
    </div>
  )
}

function RenderBlock({
  block,
  productData,
}: {
  block: BlockType
  productData?: ProductData | null
}) {
  switch (block.blockType) {
    case 'hero':
      return (
        <HeroBlock
          heading={block.heading}
          subheading={block.subheading}
          background_image={block.background_image}
          cta={block.cta}
          alignment={block.alignment}
          overlay={block.overlay}
        />
      )

    case 'specs-table':
      return (
        <SpecsTableBlock
          title={block.title}
          auto_populate={block.auto_populate}
          specs={block.specs}
          columns={block.columns}
          productSpecs={productData?.specs}
        />
      )

    case 'faq':
      return (
        <FAQBlock
          title={block.title}
          auto_populate={block.auto_populate}
          items={block.items}
          productFAQ={productData?.faq}
        />
      )

    case 'gallery':
      return (
        <GalleryBlock
          title={block.title}
          columns={block.columns}
          lightbox={block.lightbox}
          auto_populate={block.auto_populate}
          images={block.images}
          productGallery={productData?.gallery}
        />
      )

    case 'comparison-chart':
      return (
        <ComparisonChartBlock
          title={block.title}
          columns={block.columns}
          rows={block.rows}
          highlight_column={block.highlight_column}
        />
      )

    case 'cta':
      return (
        <CTABlock
          heading={block.heading}
          description={block.description}
          button={block.button}
          style={block.style}
          background_color={block.background_color}
        />
      )

    case 'richtext':
      return <RichTextBlock content={block.content} />

    default:
      console.warn(`Unknown block type: ${(block as { blockType: string }).blockType}`)
      return null
  }
}
