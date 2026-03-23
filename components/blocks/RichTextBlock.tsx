/**
 * RichTextBlock Component
 * 
 * Renders Lexical rich text content with full formatting support.
 * Handles headings, paragraphs, lists, links, images, blockquotes,
 * and code blocks.
 * 
 * @validates Requirements 18.1, 18.2, 18.3, 18.4, 18.5
 */
'use client'

import Image from 'next/image'
import Link from 'next/link'

interface RichTextBlockProps {
  content: unknown
}

// Lexical node types
interface LexicalNode {
  type: string
  tag?: string
  format?: number | string
  text?: string
  children?: LexicalNode[]
  url?: string
  target?: string
  value?: {
    url?: string
    alt?: string
  }
  listType?: 'bullet' | 'number'
  direction?: string
  indent?: number
}

interface LexicalRoot {
  root?: {
    children?: LexicalNode[]
  }
}

// Format flags for text formatting
const FORMAT_BOLD = 1
const FORMAT_ITALIC = 2
const FORMAT_UNDERLINE = 8
const FORMAT_STRIKETHROUGH = 4

/**
 * Renders Lexical rich text content
 */
export function RichTextRenderer({ content }: { content: unknown }) {
  if (!content) return null

  const lexicalContent = content as LexicalRoot
  const children = lexicalContent?.root?.children

  if (!children || !Array.isArray(children)) {
    return null
  }

  return (
    <div className="prose prose-gray max-w-none">
      {children.map((node, index) => (
        <RenderNode key={index} node={node} />
      ))}
    </div>
  )
}

function RenderNode({ node }: { node: LexicalNode }) {
  switch (node.type) {
    case 'heading':
      return <RenderHeading node={node} />
    case 'paragraph':
      return <RenderParagraph node={node} />
    case 'list':
      return <RenderList node={node} />
    case 'listitem':
      return <RenderListItem node={node} />
    case 'quote':
      return <RenderBlockquote node={node} />
    case 'horizontalrule':
      return <hr className="my-8 border-gray-300" />
    case 'upload':
      return <RenderImage node={node} />
    case 'link':
      return <RenderLink node={node} />
    case 'text':
      return <RenderText node={node} />
    default:
      // Render children if present
      if (node.children?.length) {
        return (
          <>
            {node.children.map((child, index) => (
              <RenderNode key={index} node={child} />
            ))}
          </>
        )
      }
      return null
  }
}

function RenderHeading({ node }: { node: LexicalNode }) {
  const Tag = (node.tag || 'h2') as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  const classes = {
    h1: 'text-4xl font-bold mt-8 mb-4',
    h2: 'text-3xl font-bold mt-8 mb-4',
    h3: 'text-2xl font-semibold mt-6 mb-3',
    h4: 'text-xl font-semibold mt-4 mb-2',
    h5: 'text-lg font-medium mt-4 mb-2',
    h6: 'text-base font-medium mt-4 mb-2',
  }

  return (
    <Tag className={classes[Tag] || classes.h2}>
      {node.children?.map((child, index) => (
        <RenderNode key={index} node={child} />
      ))}
    </Tag>
  )
}

function RenderParagraph({ node }: { node: LexicalNode }) {
  if (!node.children?.length) return null

  return (
    <p className="mb-4 leading-relaxed">
      {node.children.map((child, index) => (
        <RenderNode key={index} node={child} />
      ))}
    </p>
  )
}

function RenderList({ node }: { node: LexicalNode }) {
  const Tag = node.listType === 'number' ? 'ol' : 'ul'
  const classes = node.listType === 'number'
    ? 'list-decimal pl-6 mb-6 space-y-3'
    : 'mb-6 space-y-3'

  if (node.listType !== 'number') {
    // Custom styled bullet list
    return (
      <ul className={classes}>
        {node.children?.map((child, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
            </span>
            <span className="flex-1">
              {child.children?.map((c, i) => <RenderNode key={i} node={c} />)}
            </span>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <Tag className={classes}>
      {node.children?.map((child, index) => (
        <RenderNode key={index} node={child} />
      ))}
    </Tag>
  )
}

function RenderListItem({ node }: { node: LexicalNode }) {
  return (
    <li className="text-gray-700">
      {node.children?.map((child, index) => (
        <RenderNode key={index} node={child} />
      ))}
    </li>
  )
}

function RenderBlockquote({ node }: { node: LexicalNode }) {
  return (
    <blockquote className="my-8 relative pl-6 py-4 border-l-4 border-green-500 bg-gradient-to-r from-green-50 to-transparent rounded-r-lg">
      <span className="absolute -left-3 -top-3 text-5xl text-green-200 font-serif">"</span>
      <div className="relative text-lg text-gray-700 italic">
        {node.children?.map((child, index) => (
          <RenderNode key={index} node={child} />
        ))}
      </div>
    </blockquote>
  )
}

function RenderImage({ node }: { node: LexicalNode }) {
  const url = node.value?.url
  const alt = node.value?.alt || ''

  if (!url) return null

  return (
    <figure className="my-6">
      <Image
        src={url}
        alt={alt}
        width={800}
        height={600}
        className="rounded-lg mx-auto"
      />
      {alt && (
        <figcaption className="text-center text-sm text-gray-500 mt-2">
          {alt}
        </figcaption>
      )}
    </figure>
  )
}

function RenderLink({ node }: { node: LexicalNode }) {
  // Support both direct url and fields.url (Lexical format)
  const fields = (node as any).fields || {}
  const href = node.url || fields.url || '#'
  const target = node.target || (fields.newTab ? '_blank' : '_self')

  return (
    <Link
      href={href}
      target={target}
      className="text-green-600 hover:text-green-700 underline font-medium"
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
    >
      {node.children?.map((child, index) => (
        <RenderNode key={index} node={child} />
      ))}
    </Link>
  )
}

function RenderText({ node }: { node: LexicalNode }) {
  let text = node.text || ''
  const format = typeof node.format === 'number' ? node.format : 0

  // Check for special blocks encoded in text
  if (text.startsWith('[IMAGE:')) {
    const match = text.match(/\[IMAGE:(.+?)\|(.+?)\|(.+?)\]/)
    if (match) {
      const [, url, alt, caption] = match
      return (
        <figure className="my-8">
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg">
            <img
              src={url}
              alt={alt}
              className="w-full h-full object-cover"
            />
          </div>
          {caption && (
            <figcaption className="text-center text-sm text-gray-500 mt-3 italic">
              {caption}
            </figcaption>
          )}
        </figure>
      )
    }
  }

  if (text.startsWith('[CALLOUT:')) {
    const match = text.match(/\[CALLOUT:(.+?)\|(.+?)\|(.+?)\]/)
    if (match) {
      const [, icon, title, content] = match
      return (
        <div className="my-6 p-6 bg-gradient-to-r from-green-50 to-teal-50 border-l-4 border-green-500 rounded-r-xl">
          <div className="flex items-start gap-3">
            <span className="text-2xl">{icon}</span>
            <div>
              {title && <h4 className="font-bold text-green-800 mb-1">{title}</h4>}
              <p className="text-green-700">{content}</p>
            </div>
          </div>
        </div>
      )
    }
  }

  // Apply formatting
  if (format & FORMAT_BOLD) {
    return <strong className="font-semibold text-gray-900">{text}</strong>
  }
  if (format & FORMAT_ITALIC) {
    return <em className="italic">{text}</em>
  }
  if (format & FORMAT_UNDERLINE) {
    return <u>{text}</u>
  }
  if (format & FORMAT_STRIKETHROUGH) {
    return <s>{text}</s>
  }

  return <>{text}</>
}

/**
 * RichTextBlock - Wrapper component for use in BlockRenderer
 */
export function RichTextBlock({ content }: RichTextBlockProps) {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <RichTextRenderer content={content} />
      </div>
    </section>
  )
}
