/**
 * Minimal Lexical (Payload richText) → HTML serializer.
 *
 * We use this in the syncProductToPublic hook so the public-facing
 * product page can render the rich description without pulling in the
 * Payload runtime. Supports the node types we actually use in the admin:
 * paragraphs, headings, lists, links, line breaks, and inline marks
 * (bold/italic/underline/strikethrough/code).
 *
 * Anything we don't recognize is rendered as plain text — never as raw
 * markup — so this stays safe to feed into dangerouslySetInnerHTML.
 */

interface LexicalTextNode {
  type: 'text'
  text: string
  format?: number
}

interface LexicalLinkNode {
  type: 'link'
  url?: string
  fields?: { url?: string; newTab?: boolean }
  children?: LexicalNode[]
}

interface LexicalGenericNode {
  type: string
  tag?: string | number
  listType?: 'bullet' | 'number'
  children?: LexicalNode[]
}

type LexicalNode = LexicalTextNode | LexicalLinkNode | LexicalGenericNode

interface LexicalRoot {
  root?: {
    children?: LexicalNode[]
  }
}

// Lexical text format bitmask
const FORMAT_BOLD = 1
const FORMAT_ITALIC = 1 << 1
const FORMAT_STRIKETHROUGH = 1 << 2
const FORMAT_UNDERLINE = 1 << 3
const FORMAT_CODE = 1 << 4

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function escapeAttr(value: string): string {
  return value.replace(/"/g, '&quot;')
}

function renderText(node: LexicalTextNode): string {
  let html = escapeHtml(node.text || '')
  const format = node.format ?? 0
  if (format & FORMAT_CODE) html = `<code>${html}</code>`
  if (format & FORMAT_BOLD) html = `<strong>${html}</strong>`
  if (format & FORMAT_ITALIC) html = `<em>${html}</em>`
  if (format & FORMAT_UNDERLINE) html = `<u>${html}</u>`
  if (format & FORMAT_STRIKETHROUGH) html = `<s>${html}</s>`
  return html
}

function renderChildren(children: LexicalNode[] | undefined): string {
  if (!Array.isArray(children)) return ''
  return children.map(renderNode).join('')
}

function renderNode(node: LexicalNode): string {
  if (!node || typeof node !== 'object') return ''

  if (node.type === 'text') {
    return renderText(node as LexicalTextNode)
  }

  if (node.type === 'linebreak') {
    return '<br />'
  }

  if (node.type === 'link') {
    const link = node as LexicalLinkNode
    const url = link.fields?.url || link.url || '#'
    const newTab = link.fields?.newTab
    const rel = newTab ? ' rel="noopener noreferrer"' : ''
    const target = newTab ? ' target="_blank"' : ''
    return `<a href="${escapeAttr(url)}"${target}${rel}>${renderChildren(link.children)}</a>`
  }

  const generic = node as LexicalGenericNode
  const inner = renderChildren(generic.children)

  switch (generic.type) {
    case 'paragraph':
      return inner ? `<p>${inner}</p>` : ''
    case 'heading': {
      const tag =
        typeof generic.tag === 'string' && /^h[1-6]$/.test(generic.tag)
          ? generic.tag
          : 'h2'
      return `<${tag}>${inner}</${tag}>`
    }
    case 'list': {
      const tag = generic.listType === 'number' ? 'ol' : 'ul'
      return `<${tag}>${inner}</${tag}>`
    }
    case 'listitem':
      return `<li>${inner}</li>`
    case 'quote':
      return `<blockquote>${inner}</blockquote>`
    default:
      // Unknown block — fall back to its plain children
      return inner
  }
}

/**
 * Convert a Payload richText (lexical) value to a safe HTML string.
 * Returns null if the input is empty or unparseable.
 */
export function lexicalToHtml(value: unknown): string | null {
  if (!value || typeof value !== 'object') return null
  const root = (value as LexicalRoot).root
  if (!root || !Array.isArray(root.children)) return null
  const html = renderChildren(root.children).trim()
  return html.length > 0 ? html : null
}
