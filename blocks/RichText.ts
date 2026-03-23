import type { Block } from 'payload'

/**
 * RichText Block
 * 
 * A modular block for adding formatted text sections anywhere on a page.
 * Uses Lexical editor with full formatting capabilities including:
 * - Headings (H2-H6), paragraphs
 * - Bold, italic, underline, strikethrough
 * - Ordered and unordered lists
 * - Links with target options
 * - Inline images with alignment
 * - Blockquotes and horizontal rules
 * - Code blocks
 * 
 * @validates Requirements 18.1, 18.2, 18.3, 18.4, 18.5
 */
export const RichTextBlock: Block = {
  slug: 'richtext',
  labels: {
    singular: 'Texte enrichi',
    plural: 'Textes enrichis',
  },
  imageURL: '/admin/richtext-block-preview.png',
  fields: [
    // Content - full Lexical editor - Requirements 18.1, 18.2, 18.3, 18.4, 18.5
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Contenu',
      admin: {
        description: 'Éditeur de texte enrichi avec formatage complet (titres, listes, liens, images, citations, code)',
      },
    },
  ],
}
