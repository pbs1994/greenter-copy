import { ExternalLink } from 'lucide-react'

interface Source {
  name: string
  url: string
  date?: string
}

interface ArticleSourcesProps {
  sources: Source[]
}

export function ArticleSources({ sources }: ArticleSourcesProps) {
  return (
    <div className="my-12 border-t border-slate-200 pt-8">
      <h3 className="text-lg font-bold text-slate-900 mb-4">Sources officielles</h3>
      <ul className="space-y-2">
        {sources.map((source, i) => (
          <li key={i} className="flex items-start gap-2">
            <ExternalLink className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
            >
              {source.name}
              {source.date && <span className="text-slate-400 ml-1">— consulté en {source.date}</span>}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
