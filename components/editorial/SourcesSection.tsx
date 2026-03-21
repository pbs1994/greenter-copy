import { ExternalLink } from 'lucide-react';

interface Source {
  name: string;
  url: string;
  description: string;
}

interface SourcesSectionProps {
  sources: Source[];
}

/**
 * SourcesSection - Encadré "Sources" en fin d'article
 * 
 * Affiche une liste numérotée de sources officielles avec liens cliquables.
 * Style: fond slate-50, coins arrondis, liens avec icône externe.
 * 
 * Requirements: 10.1, 10.2
 */
export function SourcesSection({ sources }: SourcesSectionProps) {
  if (!sources || sources.length === 0) {
    return null;
  }

  return (
    <section
      data-testid="sources-section"
      className="bg-slate-50 rounded-2xl p-6 md:p-8 mt-12"
    >
      <h2 className="font-sans text-xl font-semibold text-slate-800 mb-6">
        Sources
      </h2>
      <ol className="list-decimal list-inside space-y-4">
        {sources.map((source, index) => (
          <li key={index} className="text-slate-700">
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-emerald-700 hover:text-emerald-800 transition-colors inline-flex items-center gap-1"
            >
              {source.name}
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            {source.description && (
              <span className="text-slate-600 ml-1">
                — {source.description}
              </span>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
