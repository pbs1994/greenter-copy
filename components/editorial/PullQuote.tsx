interface PullQuoteProps {
  quote: string;
  source?: string;
  variant?: 'default' | 'highlight' | 'stat';
}

export function PullQuote({ quote, source, variant = 'default' }: PullQuoteProps) {
  const baseClasses = 'my-8 pl-6 border-l-4 border-emerald-500';
  
  const variantClasses = {
    default: 'py-2',
    highlight: 'py-4 px-6 bg-emerald-50 rounded-r-lg',
    stat: 'py-4 text-center border-l-0 border-t-4 border-b-4 border-emerald-500',
  };

  return (
    <blockquote 
      className={`${baseClasses} ${variantClasses[variant]}`}
      data-testid="pull-quote"
      data-variant={variant}
    >
      <p className="font-editorial-serif italic text-xl text-slate-700 leading-relaxed">
        {quote}
      </p>
      {source && (
        <cite className="block mt-3 text-sm text-slate-500 not-italic">
          {source}
        </cite>
      )}
    </blockquote>
  );
}
