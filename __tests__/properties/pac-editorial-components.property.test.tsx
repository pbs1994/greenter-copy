/**
 * Property-Based Tests for PAC Editorial Components
 * Optimized version - minimal renders, fast execution
 */

import '@testing-library/jest-dom';
import fc from 'fast-check';
import { render, screen } from '@testing-library/react';
import { calculateProgressWidth } from '@/components/editorial/ReadingProgressBar';
import { calculateReadingTime } from '@/lib/pac-editorial-data';
import { InfographicBlock } from '@/components/editorial/InfographicBlock';
import { SidebarCTA } from '@/components/editorial/SidebarCTA';
import { SourcesSection } from '@/components/editorial/SourcesSection';

// ============================================================================
// Pure function tests (no renders - very fast)
// ============================================================================

describe('ReadingProgressBar Properties', () => {
  it('progress width equals scroll percentage', () => {
    fc.assert(
      fc.property(fc.integer({ min: 0, max: 100 }), (scrollPercent) => {
        return calculateProgressWidth(scrollPercent) === scrollPercent;
      }),
      { numRuns: 50 }
    );
  });

  it('progress width bounds check', () => {
    expect(calculateProgressWidth(0)).toBe(0);
    expect(calculateProgressWidth(50)).toBe(50);
    expect(calculateProgressWidth(100)).toBe(100);
  });
});

describe('ArticleHeader Properties', () => {
  it('reading time equals ceil(wordCount / 200)', () => {
    fc.assert(
      fc.property(fc.integer({ min: 1, max: 10000 }), (wordCount) => {
        return calculateReadingTime(wordCount) === Math.ceil(wordCount / 200);
      }),
      { numRuns: 50 }
    );
  });

  it('reading time minimum is 1 minute', () => {
    expect(calculateReadingTime(1)).toBe(1);
    expect(calculateReadingTime(100)).toBe(1);
    expect(calculateReadingTime(200)).toBe(1);
    expect(calculateReadingTime(201)).toBe(2);
  });
});

// ============================================================================
// Component tests (single renders - optimized)
// ============================================================================

describe('InfographicBlock Properties', () => {
  it('renders with correct classes and data-type', () => {
    const { container, rerender } = render(
      <InfographicBlock type="stats" data={{ stats: [{ value: '50%', label: 'Test' }] }} />
    );
    
    let block = container.querySelector('[data-testid="infographic-block"]');
    expect(block).toHaveClass('rounded-2xl', 'bg-slate-50', 'p-6', 'md:p-8');
    expect(block?.getAttribute('data-type')).toBe('stats');

    // Test other types with rerender (faster than new render)
    rerender(<InfographicBlock type="comparison" data={{ items: [] }} />);
    block = container.querySelector('[data-testid="infographic-block"]');
    expect(block?.getAttribute('data-type')).toBe('comparison');

    rerender(<InfographicBlock type="timeline" data={{ steps: [] }} />);
    block = container.querySelector('[data-testid="infographic-block"]');
    expect(block?.getAttribute('data-type')).toBe('timeline');

    rerender(<InfographicBlock type="table" data={{ headers: [], rows: [] }} />);
    block = container.querySelector('[data-testid="infographic-block"]');
    expect(block?.getAttribute('data-type')).toBe('table');
  });

  it('stats layout uses responsive grid', () => {
    const { container } = render(
      <InfographicBlock type="stats" data={{ stats: [{ value: '50%', label: 'Test' }] }} />
    );
    const grid = container.querySelector('.grid');
    expect(grid).toHaveClass('grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-3');
  });

  it('comparison layout uses responsive grid', () => {
    const { container } = render(
      <InfographicBlock type="comparison" data={{ items: [{
        id: 'air-air', name: 'PAC Air/Air', description: 'Desc',
        priceRange: { min: 1000, max: 2000 }, savings: '40%',
        advantages: ['A'], disadvantages: ['B'], idealFor: 'Test', cop: { min: 3, max: 4 }
      }] }} />
    );
    const grid = container.querySelector('.grid');
    expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-2');
  });

  it('renders caption and source', () => {
    const { container } = render(
      <InfographicBlock 
        type="stats" 
        data={{ stats: [{ value: '50%', label: 'Test' }] }}
        caption="Test caption"
        source="Test source"
      />
    );
    expect(container.textContent).toContain('Test caption');
    expect(container.textContent).toContain('Test source');
  });
});

describe('SidebarCTA Properties', () => {
  const AGGRESSIVE_COLORS = /orange-500|orange-600|red-500|red-600|#f97316|#ea580c|#ef4444|#dc2626/i;

  it('no aggressive colors in any variant', () => {
    const { container, rerender } = render(
      <SidebarCTA title="Test" phone="07 66 97 50 99" variant="subtle" />
    );
    expect(container.innerHTML).not.toMatch(AGGRESSIVE_COLORS);

    rerender(<SidebarCTA title="Test" phone="07 66 97 50 99" variant="editorial" />);
    expect(container.innerHTML).not.toMatch(AGGRESSIVE_COLORS);
  });

  it('has tel: link with +33 format', () => {
    const { container } = render(<SidebarCTA title="Test" phone="07 66 97 50 99" />);
    const link = container.querySelector('a[href^="tel:"]');
    expect(link).not.toBeNull();
    expect(link?.getAttribute('href')).toBe('tel:+33766975099');
  });

  it('has data-testid and renders content', () => {
    render(
      <SidebarCTA title="Mon titre" phone="07 66 97 50 99" description="Ma description" />
    );
    expect(screen.getByTestId('sidebar-cta')).toBeInTheDocument();
    expect(screen.getByText('Mon titre')).toBeInTheDocument();
    expect(screen.getByText('Ma description')).toBeInTheDocument();
    expect(screen.getByText('07 66 97 50 99')).toBeInTheDocument();
  });
});

describe('SourcesSection Properties', () => {
  const COMPETITOR_DOMAINS = ['engie.fr', 'totalenergies.fr', 'effy.fr', 'quelleenergie.fr'];
  
  const testSources = [
    { name: 'ADEME', url: 'https://www.ademe.fr/test', description: 'Agence environnement' },
    { name: 'EDF', url: 'https://www.edf.fr/test', description: 'Électricité de France' },
    { name: 'Économie', url: 'https://www.economie.gouv.fr/test', description: 'Ministère' },
    { name: 'France Rénov', url: 'https://france-renov.gouv.fr/test', description: 'Rénovation' },
    { name: 'Service Public', url: 'https://www.service-public.fr/test', description: 'Services' },
  ];

  it('renders minimum 5 sources', () => {
    const { container } = render(<SourcesSection sources={testSources} />);
    expect(container.querySelectorAll('li').length).toBe(5);
  });

  it('returns null for empty sources', () => {
    const { container } = render(<SourcesSection sources={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('has data-testid', () => {
    render(<SourcesSection sources={testSources} />);
    expect(screen.getByTestId('sources-section')).toBeInTheDocument();
  });

  it('all links use HTTPS and have security attributes', () => {
    const { container } = render(<SourcesSection sources={testSources} />);
    const links = container.querySelectorAll('a[href]');
    
    expect(links.length).toBe(5);
    links.forEach((link) => {
      expect(link.getAttribute('href')).toMatch(/^https:\/\//);
      expect(link.getAttribute('target')).toBe('_blank');
      expect(link.getAttribute('rel')).toContain('noopener');
    });
  });

  it('no competitor domains', () => {
    const { container } = render(<SourcesSection sources={testSources} />);
    const links = container.querySelectorAll('a[href]');
    
    links.forEach((link) => {
      const href = link.getAttribute('href') || '';
      COMPETITOR_DOMAINS.forEach((domain) => {
        expect(href).not.toContain(domain);
      });
    });
  });

  it('displays descriptions', () => {
    const { container } = render(<SourcesSection sources={testSources} />);
    testSources.forEach((source) => {
      expect(container.textContent).toContain(source.description);
    });
  });
});
