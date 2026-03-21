import { ReactNode } from 'react';

interface ArticleSectionProps {
  id: string;
  title: string;
  level?: 'h2' | 'h3';
  children: ReactNode;
  className?: string;
}

/**
 * ArticleSection - Section thématique de l'article éditorial
 * 
 * Style: max-width 720px centré, espacement généreux (py-16)
 * Titre: font-serif bold, taille 2xl-3xl
 * Corps: font-sans, line-height relaxed, taille lg
 * 
 * Requirements: 1.2, 1.4, 1.8, 9.2
 */
export function ArticleSection({ 
  id, 
  title, 
  level = 'h2', 
  children, 
  className = '' 
}: ArticleSectionProps) {
  const Heading = level;
  
  const headingClasses = level === 'h2' 
    ? 'text-3xl md:text-4xl font-bold font-editorial-serif text-slate-900 mb-6'
    : 'text-2xl md:text-3xl font-bold font-editorial-serif text-slate-900 mb-4';

  return (
    <section 
      id={id} 
      className={`py-16 ${className}`}
      data-testid={`article-section-${id}`}
    >
      <div className="prose-editorial px-4">
        <Heading className={headingClasses}>
          {title}
        </Heading>
        <div className="font-editorial-sans text-lg text-slate-700 leading-relaxed space-y-6">
          {children}
        </div>
      </div>
    </section>
  );
}
