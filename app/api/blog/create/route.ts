import { getPayload } from 'payload'
import config from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'

// Structure Lexical pour le contenu riche avec images, listes, citations
function createRichContent(blocks: ContentBlock[]) {
  const children: any[] = []

  for (const block of blocks) {
    switch (block.type) {
      case 'heading':
        children.push({
          type: 'heading',
          tag: block.level || 'h2',
          children: [{ type: 'text', text: block.text }],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        })
        break

      case 'paragraph':
        const paraChildren: any[] = []
        if (typeof block.text === 'string') {
          paraChildren.push({ type: 'text', text: block.text })
        } else if (Array.isArray(block.content)) {
          for (const item of block.content) {
            if (item.type === 'text') {
              paraChildren.push({ 
                type: 'text', 
                text: item.text,
                format: item.bold ? 1 : item.italic ? 2 : 0
              })
            } else if (item.type === 'link') {
              paraChildren.push({
                type: 'link',
                fields: { url: item.url, newTab: item.newTab || false, linkType: 'custom' },
                children: [{ type: 'text', text: item.text }],
                direction: 'ltr',
                format: '',
                indent: 0,
                version: 1,
              })
            }
          }
        }
        children.push({
          type: 'paragraph',
          children: paraChildren,
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        })
        break

      case 'list':
        children.push({
          type: 'list',
          listType: block.ordered ? 'number' : 'bullet',
          children: block.items?.map(item => ({
            type: 'listitem',
            children: [{ type: 'text', text: item }],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          })) || [],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        })
        break

      case 'quote':
        children.push({
          type: 'quote',
          children: [{ 
            type: 'paragraph',
            children: [{ type: 'text', text: block.text }],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          }],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        })
        break

      case 'image':
        // Images externes via un bloc personnalis�
        children.push({
          type: 'paragraph',
          children: [{ 
            type: 'text', 
            text: `[IMAGE:${block.url}|${block.alt || ''}|${block.caption || ''}]`
          }],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        })
        break

      case 'callout':
        children.push({
          type: 'paragraph',
          children: [{ 
            type: 'text', 
            text: `[CALLOUT:${block.icon || '??'}|${block.title || ''}|${block.text}]`
          }],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        })
        break

      case 'divider':
        children.push({
          type: 'horizontalrule',
          version: 1,
        })
        break
    }
  }

  return {
    root: {
      type: 'root',
      children,
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

interface ContentBlock {
  type: 'heading' | 'paragraph' | 'list' | 'quote' | 'image' | 'callout' | 'divider'
  text?: string
  level?: 'h1' | 'h2' | 'h3' | 'h4'
  content?: Array<{ type: 'text' | 'link', text: string, url?: string, bold?: boolean, italic?: boolean, newTab?: boolean }>
  items?: string[]
  ordered?: boolean
  url?: string
  alt?: string
  caption?: string
  icon?: string
  title?: string
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { title, slug, excerpt, author, blocks, tags, seo, featured_image_url } = body

    const payload = await getPayload({ config })

    const content = createRichContent(blocks)

    const blogPost = await payload.create({
      collection: 'blog-posts',
      data: {
        title,
        slug,
        excerpt,
        author: author || '�quipe Greenter',
        published_date: new Date().toISOString(),
        status: 'published',
        content,
        tags: tags?.map((tag: string) => ({ tag })) || [],
        seo: {
          ...seo,
          // Stocker l'URL de l'image featured dans meta pour l'affichage
          meta_title: seo?.meta_title || title,
          meta_description: seo?.meta_description || excerpt,
        },
      },
    })

    return NextResponse.json({ 
      success: true, 
      id: blogPost.id,
      slug: blogPost.slug,
      url: `/blog/${blogPost.slug}`,
      featured_image_url
    })
  } catch (error: any) {
    console.error('Blog creation error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
