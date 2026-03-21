import { Clock, Calendar } from 'lucide-react';

interface ArticleHeaderProps {
  readingTime: number;
  lastUpdated: string;
}

/**
 * ArticleHeader - Affiche le temps de lecture et la date de mise à jour
 * 
 * Style: texte slate-500, police sans-serif, uppercase tracking-wide
 * 
 * Requirements: 1.7
 */
export function ArticleHeader({ readingTime, lastUpdated }: ArticleHeaderProps) {
  return (
    <div 
      className="flex flex-wrap items-center gap-4 text-slate-500 text-sm font-editorial-sans uppercase tracking-wide"
      data-testid="article-header"
    >
      <div className="flex items-center gap-2" data-testid="reading-time">
        <Clock className="w-4 h-4" aria-hidden="true" />
        <span>{readingTime} min de lecture</span>
      </div>
      <div className="flex items-center gap-2" data-testid="last-updated">
        <Calendar className="w-4 h-4" aria-hidden="true" />
        <span>Mis à jour en {lastUpdated}</span>
      </div>
    </div>
  );
}
