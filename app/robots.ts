import { MetadataRoute } from 'next'

/**
 * Robots directives.
 *
 * We explicitly allow AI-engine crawlers (GPTBot, ClaudeBot, PerplexityBot,
 * Google-Extended, etc.) on the public site so Greenter content can surface
 * in generative answers (ChatGPT, Claude, Perplexity, Google AI Overviews).
 * Private routes (/api, /admin, /commande) remain disallowed for everyone.
 */
export default function robots(): MetadataRoute.Robots {
  const disallow = ['/api/', '/admin/', '/commande/']

  const aiCrawlers = [
    'GPTBot',              // OpenAI (ChatGPT training + browse)
    'OAI-SearchBot',       // OpenAI SearchGPT
    'ChatGPT-User',        // ChatGPT browsing on user request
    'ClaudeBot',           // Anthropic Claude training
    'Claude-Web',          // Anthropic Claude browsing
    'anthropic-ai',        // legacy Anthropic UA
    'PerplexityBot',       // Perplexity indexing
    'Perplexity-User',     // Perplexity on-demand fetch
    'Google-Extended',     // Google Gemini / AI Overviews
    'Applebot-Extended',   // Apple Intelligence
    'Bytespider',          // ByteDance / Doubao
    'CCBot',               // Common Crawl (feeds most LLMs)
    'Amazonbot',           // Alexa / Rufus
    'DuckAssistBot',       // DuckDuckGo AI
    'cohere-ai',           // Cohere
    'MistralAI-User',      // Mistral
    'YouBot',              // You.com
    'Diffbot',             // Diffbot (used by multiple AI products)
  ]

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow,
      },
      ...aiCrawlers.map((userAgent) => ({
        userAgent,
        allow: '/',
        disallow,
      })),
    ],
    sitemap: 'https://www.greenter.fr/sitemap.xml',
    host: 'https://www.greenter.fr',
  }
}
