import { ExternalLink } from 'lucide-react';

interface SourceCitationProps {
  source: string;
  url?: string;
  date?: string;
}

export function SourceCitation({ source, url, date }: SourceCitationProps) {
  const content = (
    <>
      {source}
      {date && ` (${date})`}
    </>
  );

  if (url) {
    return (
      <cite 
        className="text-xs text-slate-400 italic not-italic inline-flex items-center gap-1"
        data-testid="source-citation"
      >
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-slate-500 transition-colors inline-flex items-center gap-1"
        >
          {content}
          <ExternalLink className="w-3 h-3" />
        </a>
      </cite>
    );
  }

  return (
    <cite 
      className="text-xs text-slate-400 italic"
      data-testid="source-citation"
    >
      {content}
    </cite>
  );
}
