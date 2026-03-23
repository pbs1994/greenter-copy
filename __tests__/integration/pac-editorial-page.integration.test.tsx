/**
 * Integration Tests for PAC Editorial Content Page
 *
 * Feature: pac-editorial-content
 * Tests the complete editorial page for structure, content, accessibility, and source attribution.
 *
 * **Property 17: Statistics Source Attribution** - Chaque stat a une source
 * **Validates: Requirements 10.4, 10.5**
 */

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { PACEditorialContent } from '@/components/editorial/PACEditorialContent';
import { OFFICIAL_SOURCES } from '@/lib/pac-editorial-data';

// Extend Jest matchers with jest-axe
expect.extend(toHaveNoViolations);

// ============================================================================
// Test Constants
// ============================================================================

const EXPECTED_SECTIONS = [
  'introduction',
  'types-pac',
  'r290',
  'design',
  'aides-2026',
  'installation',
  'environnement',
  'faq',
];

const EXPECTED_READING_TIME = 12; // minutes

const MINIMUM_SOURCES_COUNT = 5;

// ============================================================================
// Integration Tests
// ============================================================================

describe('PAC Editorial Page Integration Tests', () => {
  /**
   * Test: All 8 main sections are present
   *
   * Verifies that the editorial content includes all required sections:
   * introduction, types-pac, r290, design, aides-2026, installation, environnement, faq
   *
   * **Validates: Requirements 1.8, 2.1, 3.1, 4.1, 5.1, 6.1, 7.1**
   */
  describe('Section Presence', () => {
    it('renders all 8 main article sections', () => {
      const { container } = render(<PACEditorialContent />);

      EXPECTED_SECTIONS.forEach((sectionId) => {
        const section = container.querySelector(`#${sectionId}`);
        expect(section).toBeInTheDocument();
      });
    });

    it('renders sections with correct data-testid attributes', () => {
      render(<PACEditorialContent />);

      EXPECTED_SECTIONS.forEach((sectionId) => {
        const section = screen.getByTestId(`article-section-${sectionId}`);
        expect(section).toBeInTheDocument();
      });
    });

    it('renders sections in correct order', () => {
      const { container } = render(<PACEditorialContent />);

      const articleSections = container.querySelectorAll('[data-testid^="article-section-"]');
      const sectionIds = Array.from(articleSections).map((section) => {
        const testId = section.getAttribute('data-testid');
        return testId?.replace('article-section-', '');
      });

      // Verify order matches expected sections
      EXPECTED_SECTIONS.forEach((expectedId, index) => {
        expect(sectionIds[index]).toBe(expectedId);
      });
    });

    it('each section has a heading', () => {
      const { container } = render(<PACEditorialContent />);

      EXPECTED_SECTIONS.forEach((sectionId) => {
        const section = container.querySelector(`#${sectionId}`);
        expect(section).not.toBeNull();
        
        const heading = section?.querySelector('h2, h3');
        expect(heading).toBeInTheDocument();
        expect(heading?.textContent?.length).toBeGreaterThan(0);
      });
    });
  });

  /**
   * Test: Reading time is displayed
   *
   * Verifies that the reading time indicator shows the expected duration (12 min).
   *
   * **Validates: Requirements 1.7**
   */
  describe('Reading Time Display', () => {
    it('displays reading time in the article header', () => {
      render(<PACEditorialContent />);

      // Look for reading time text
      const readingTimeText = screen.getByText(/min de lecture/i);
      expect(readingTimeText).toBeInTheDocument();
    });

    it('displays the correct reading time value (12 min)', () => {
      const { container } = render(<PACEditorialContent />);

      // Find the reading time element
      const readingTimeElement = container.querySelector('[data-testid="reading-time"]');
      expect(readingTimeElement).toBeInTheDocument();
      expect(readingTimeElement?.textContent).toContain(String(EXPECTED_READING_TIME));
    });

    it('displays last updated date', () => {
      render(<PACEditorialContent />);

      // Look for "Mis à jour" or date text
      const lastUpdatedText = screen.getByText(/mis à jour/i);
      expect(lastUpdatedText).toBeInTheDocument();
    });
  });

  /**
   * Test: Sources section at end of article
   *
   * Verifies that the sources section is present with at least 5 official sources.
   *
   * **Validates: Requirements 10.1, 10.2**
   */
  describe('Sources Section', () => {
    it('renders sources section at the end of the article', () => {
      const { container } = render(<PACEditorialContent />);

      const sourcesSection = container.querySelector('[data-testid="sources-section"]');
      expect(sourcesSection).toBeInTheDocument();
    });

    it('contains at least 5 official sources', () => {
      const { container } = render(<PACEditorialContent />);

      const sourcesSection = container.querySelector('[data-testid="sources-section"]');
      expect(sourcesSection).not.toBeNull();

      // Count source items (links or list items)
      const sourceLinks = sourcesSection?.querySelectorAll('a[href]');
      const sourceItems = sourcesSection?.querySelectorAll('li');
      
      const sourceCount = Math.max(sourceLinks?.length || 0, sourceItems?.length || 0);
      expect(sourceCount).toBeGreaterThanOrEqual(MINIMUM_SOURCES_COUNT);
    });

    it('sources include official domains (gouv.fr, ademe.fr, europa.eu)', () => {
      const { container } = render(<PACEditorialContent />);

      const sourcesSection = container.querySelector('[data-testid="sources-section"]');
      const sourceLinks = sourcesSection?.querySelectorAll('a[href]');
      
      const hrefs = Array.from(sourceLinks || []).map((link) => link.getAttribute('href'));
      
      // Check for official domains
      const officialDomains = ['gouv.fr', 'ademe.fr', 'europa.eu', 'edf.fr'];
      const hasOfficialSources = hrefs.some((href) =>
        officialDomains.some((domain) => href?.includes(domain))
      );
      
      expect(hasOfficialSources).toBe(true);
    });

    it('does not contain competitor domains', () => {
      const { container } = render(<PACEditorialContent />);

      const sourcesSection = container.querySelector('[data-testid="sources-section"]');
      const sourceLinks = sourcesSection?.querySelectorAll('a[href]');
      
      const hrefs = Array.from(sourceLinks || []).map((link) => link.getAttribute('href'));
      
      // Competitor domains to exclude
      const competitorDomains = ['engie.fr', 'totalenergies.fr', 'effy.fr', 'quelleenergie.fr'];
      
      hrefs.forEach((href) => {
        competitorDomains.forEach((competitor) => {
          expect(href).not.toContain(competitor);
        });
      });
    });

    it('sources have external link attributes for security', () => {
      const { container } = render(<PACEditorialContent />);

      const sourcesSection = container.querySelector('[data-testid="sources-section"]');
      const externalLinks = sourcesSection?.querySelectorAll('a[href^="http"]');
      
      externalLinks?.forEach((link) => {
        // External links should have target="_blank" and rel="noopener noreferrer"
        expect(link.getAttribute('target')).toBe('_blank');
        expect(link.getAttribute('rel')).toContain('noopener');
      });
    });
  });


  /**
   * Test: Accessibility (jest-axe)
   *
   * Verifies that the editorial content meets accessibility standards.
   *
   * **Validates: Requirements 9.3, 11.2**
   */
  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<PACEditorialContent />);

      const results = await axe(container, {
        rules: {
          // Disable color-contrast rule as it requires computed styles
          'color-contrast': { enabled: false },
          // Disable region rule as the component is part of a larger page
          region: { enabled: false },
        },
      });

      expect(results).toHaveNoViolations();
    });

    it('all interactive elements are keyboard accessible', () => {
      const { container } = render(<PACEditorialContent />);

      // Check buttons and links have proper focus indicators
      const interactiveElements = container.querySelectorAll('button, a[href]');
      
      interactiveElements.forEach((element) => {
        // Elements should not have tabindex="-1" unless they're decorative
        const tabIndex = element.getAttribute('tabindex');
        if (tabIndex === '-1') {
          // If tabindex is -1, it should be a decorative element
          const ariaHidden = element.getAttribute('aria-hidden');
          expect(ariaHidden).toBe('true');
        }
      });
    });

    it('headings follow proper hierarchy (no skipped levels)', () => {
      const { container } = render(<PACEditorialContent />);

      const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
      const levels: number[] = [];

      headings.forEach((heading) => {
        const level = parseInt(heading.tagName[1], 10);
        levels.push(level);
      });

      // Check that heading levels don't skip (e.g., h2 -> h4)
      for (let i = 1; i < levels.length; i++) {
        const currentLevel = levels[i];
        const previousLevel = levels[i - 1];
        
        // Current level should not be more than 1 level deeper than previous
        // (e.g., h2 -> h3 is OK, h2 -> h4 is not)
        if (currentLevel > previousLevel) {
          expect(currentLevel - previousLevel).toBeLessThanOrEqual(1);
        }
      }
    });

    it('images have alt text', () => {
      const { container } = render(<PACEditorialContent />);

      const images = container.querySelectorAll('img');
      
      images.forEach((img) => {
        const alt = img.getAttribute('alt');
        // Alt should be present (can be empty for decorative images)
        expect(img).toHaveAttribute('alt');
        
        // If alt is not empty, it should be descriptive (at least 5 chars)
        if (alt && alt.length > 0) {
          expect(alt.length).toBeGreaterThanOrEqual(5);
        }
      });
    });

    it('links have descriptive text', () => {
      const { container } = render(<PACEditorialContent />);

      const links = container.querySelectorAll('a[href]');
      
      links.forEach((link) => {
        const text = link.textContent?.trim();
        const ariaLabel = link.getAttribute('aria-label');
        
        // Link should have either visible text or aria-label
        const hasDescriptiveText = (text && text.length > 0) || (ariaLabel && ariaLabel.length > 0);
        expect(hasDescriptiveText).toBe(true);
        
        // Avoid generic link text
        const genericTexts = ['click here', 'read more', 'here', 'link'];
        if (text) {
          genericTexts.forEach((generic) => {
            expect(text.toLowerCase()).not.toBe(generic);
          });
        }
      });
    });

    it('FAQ accordion buttons have aria-expanded attribute', () => {
      const { container } = render(<PACEditorialContent />);

      const faqAccordion = container.querySelector('[data-testid="faq-accordion"]');
      
      if (faqAccordion) {
        const accordionButtons = faqAccordion.querySelectorAll('button');
        
        accordionButtons.forEach((button) => {
          expect(button).toHaveAttribute('aria-expanded');
        });
      }
    });
  });

  /**
   * Test: Property 17 - Statistics Source Attribution
   *
   * *For any* statistic displayed (percentage, currency amount, or numeric comparison),
   * there SHALL be an associated SourceCitation component within the same section
   * or a reference to the sources section.
   *
   * **Validates: Requirements 10.4, 10.5**
   */
  describe('Property 17: Statistics Source Attribution', () => {
    it('statistics in introduction section have source attribution', () => {
      const { container } = render(<PACEditorialContent />);

      const introSection = container.querySelector('#introduction');
      expect(introSection).not.toBeNull();

      // Check for source citation in the section
      const sourceCitation = introSection?.querySelector('[data-testid="source-citation"]');
      const hasSourceReference = introSection?.textContent?.toLowerCase().includes('source');
      
      // Section should have either a SourceCitation component or text reference to source
      expect(sourceCitation || hasSourceReference).toBeTruthy();
    });

    it('R290 statistics (GWP values) have source attribution', () => {
      const { container } = render(<PACEditorialContent />);

      const r290Section = container.querySelector('#r290');
      expect(r290Section).not.toBeNull();

      // R290 section should contain GWP values
      const sectionText = r290Section?.textContent || '';
      expect(sectionText).toContain('3'); // GWP R290
      expect(sectionText).toContain('1430'); // GWP R410A

      // Check for source citation
      const sourceCitation = r290Section?.querySelector('[data-testid="source-citation"]');
      const infographicSource = r290Section?.querySelector('[data-testid="infographic-block"]');
      
      // Should have source attribution via SourceCitation or InfographicBlock with source
      expect(sourceCitation || infographicSource).toBeTruthy();
    });

    it('environmental statistics (CO2 reduction, savings) have source attribution', () => {
      const { container } = render(<PACEditorialContent />);

      const envSection = container.querySelector('#environnement');
      expect(envSection).not.toBeNull();

      // Environmental section should contain key statistics
      const sectionText = envSection?.textContent || '';
      expect(sectionText).toMatch(/90%|75%|50-70%/);

      // Check for source citation
      const sourceCitation = envSection?.querySelector('[data-testid="source-citation"]');
      expect(sourceCitation).toBeInTheDocument();
    });

    it('aids section statistics have source attribution', () => {
      const { container } = render(<PACEditorialContent />);

      const aidesSection = container.querySelector('#aides-2026');
      expect(aidesSection).not.toBeNull();

      // Aids section should contain monetary values
      const sectionText = aidesSection?.textContent || '';
      expect(sectionText).toMatch(/\d+\s*€|\d+\s*000/);

      // Check for source citation
      const sourceCitation = aidesSection?.querySelector('[data-testid="source-citation"]');
      const infographicSource = aidesSection?.querySelector('[data-testid="infographic-block"]');
      
      expect(sourceCitation || infographicSource).toBeTruthy();
    });

    it('PAC types section with price ranges has source attribution', () => {
      const { container } = render(<PACEditorialContent />);

      const typesSection = container.querySelector('#types-pac');
      expect(typesSection).not.toBeNull();

      // Types section should contain price ranges
      const sectionText = typesSection?.textContent || '';
      expect(sectionText).toMatch(/\d+\s*€|\d+\s*000/);

      // Check for source citation
      const sourceCitation = typesSection?.querySelector('[data-testid="source-citation"]');
      expect(sourceCitation).toBeInTheDocument();
    });

    it('all infographic blocks with statistics have source prop', () => {
      const { container } = render(<PACEditorialContent />);

      const infographics = container.querySelectorAll('[data-testid="infographic-block"]');
      
      infographics.forEach((infographic) => {
        const type = infographic.getAttribute('data-type');
        
        // Stats and table infographics should have source attribution
        if (type === 'stats' || type === 'table' || type === 'comparison') {
          // Check for source text within the infographic
          const sourceText = infographic.querySelector('[class*="source"], [class*="caption"]');
          const hasSourceInText = infographic.textContent?.toLowerCase().includes('source');
          
          expect(sourceText || hasSourceInText).toBeTruthy();
        }
      });
    });

    it('pull quotes with statistics have source attribution', () => {
      const { container } = render(<PACEditorialContent />);

      const pullQuotes = container.querySelectorAll('[data-testid="pull-quote"]');
      
      pullQuotes.forEach((quote) => {
        const quoteText = quote.textContent || '';
        
        // If the quote contains a statistic (percentage or number)
        if (/\d+%|\d+\s*€|\d+x/.test(quoteText)) {
          // Check if it has a source prop rendered
          const sourceElement = quote.querySelector('[class*="source"]');
          const hasSourceText = quoteText.toLowerCase().includes('source');
          
          // Pull quotes with stats should have source attribution
          expect(sourceElement || hasSourceText).toBeTruthy();
        }
      });
    });
  });


  /**
   * Test: Complete page structure
   *
   * Verifies the overall structure and components of the editorial page.
   */
  describe('Complete Page Structure', () => {
    it('renders the main article container', () => {
      render(<PACEditorialContent />);

      const article = screen.getByTestId('pac-editorial-content');
      expect(article).toBeInTheDocument();
      expect(article.tagName).toBe('ARTICLE');
    });

    it('contains exactly 2 SidebarCTA components', () => {
      const { container } = render(<PACEditorialContent />);

      const ctaElements = container.querySelectorAll('[data-testid="sidebar-cta"]');
      expect(ctaElements.length).toBe(2);
    });

    it('contains FAQ accordion section', () => {
      const { container } = render(<PACEditorialContent />);

      const faqAccordion = container.querySelector('[data-testid="faq-accordion"]');
      expect(faqAccordion).toBeInTheDocument();
    });

    it('contains final contact box', () => {
      const { container } = render(<PACEditorialContent />);

      const contactBox = container.querySelector('[data-testid="final-contact-box"]');
      expect(contactBox).toBeInTheDocument();
    });

    it('contains article header with reading time', () => {
      const { container } = render(<PACEditorialContent />);

      const articleHeader = container.querySelector('[data-testid="article-header"]');
      expect(articleHeader).toBeInTheDocument();
    });

    it('contains multiple infographic blocks', () => {
      const { container } = render(<PACEditorialContent />);

      const infographics = container.querySelectorAll('[data-testid="infographic-block"]');
      expect(infographics.length).toBeGreaterThanOrEqual(3);
    });

    it('contains multiple pull quotes', () => {
      const { container } = render(<PACEditorialContent />);

      const pullQuotes = container.querySelectorAll('[data-testid="pull-quote"]');
      expect(pullQuotes.length).toBeGreaterThanOrEqual(2);
    });

    it('contains source citations throughout the article', () => {
      const { container } = render(<PACEditorialContent />);

      const sourceCitations = container.querySelectorAll('[data-testid="source-citation"]');
      expect(sourceCitations.length).toBeGreaterThanOrEqual(3);
    });
  });

  /**
   * Test: Content quality and SEO
   *
   * Verifies content quality aspects for SEO and user experience.
   */
  describe('Content Quality and SEO', () => {
    it('contains all priority SEO keywords', () => {
      const { container } = render(<PACEditorialContent />);

      const textContent = container.textContent?.toLowerCase() || '';

      const priorityKeywords = [
        'pompe à chaleur',
        'pac',
        'installation',
        'aides',
        'rge',
        'seine-et-marne',
      ];

      priorityKeywords.forEach((keyword) => {
        expect(textContent).toContain(keyword.toLowerCase());
      });
    });

    it('contains internal links to other site pages', () => {
      const { container } = render(<PACEditorialContent />);

      const internalLinks = container.querySelectorAll('a[href^="/"]');
      expect(internalLinks.length).toBeGreaterThan(0);

      // Check for links to key pages
      const hrefs = Array.from(internalLinks).map((link) => link.getAttribute('href'));
      const expectedInternalPages = ['/services/', '/blog', '/contact'];
      
      const hasInternalLinks = expectedInternalPages.some((page) =>
        hrefs.some((href) => href?.includes(page))
      );
      expect(hasInternalLinks).toBe(true);
    });

    it('MaPrimeRénov reopening date is mentioned', () => {
      const { container } = render(<PACEditorialContent />);

      const textContent = container.textContent || '';
      
      // Should mention the reopening date (23 février 2026)
      expect(textContent).toMatch(/23\s*(février|fevrier)\s*2026/i);
    });

    it('RGE certification importance is emphasized', () => {
      const { container } = render(<PACEditorialContent />);

      const textContent = container.textContent || '';
      
      // RGE should be mentioned multiple times
      const rgeMatches = textContent.match(/RGE/g) || [];
      expect(rgeMatches.length).toBeGreaterThanOrEqual(2);

      // Should emphasize RGE importance
      const strongElements = container.querySelectorAll('strong');
      const hasRGEEmphasis = Array.from(strongElements).some(
        (el) => el.textContent?.includes('RGE')
      );
      expect(hasRGEEmphasis).toBe(true);
    });

    it('phone number is present and clickable', () => {
      const { container } = render(<PACEditorialContent />);

      const phoneLinks = container.querySelectorAll('a[href^="tel:"]');
      expect(phoneLinks.length).toBeGreaterThan(0);
    });
  });

  /**
   * Test: Editorial styling
   *
   * Verifies that editorial styling classes are applied correctly.
   */
  describe('Editorial Styling', () => {
    it('article sections use prose-editorial class', () => {
      const { container } = render(<PACEditorialContent />);

      const proseContainers = container.querySelectorAll('.prose-editorial');
      expect(proseContainers.length).toBeGreaterThan(0);
    });

    it('headings use editorial serif font', () => {
      const { container } = render(<PACEditorialContent />);

      const articleSections = container.querySelectorAll('[data-testid^="article-section-"]');
      
      articleSections.forEach((section) => {
        const h2 = section.querySelector('h2');
        if (h2) {
          expect(h2).toHaveClass('font-editorial-serif');
        }
      });
    });

    it('body text uses editorial sans font', () => {
      const { container } = render(<PACEditorialContent />);

      const sansContainers = container.querySelectorAll('.font-editorial-sans');
      expect(sansContainers.length).toBeGreaterThan(0);
    });

    it('article sections have generous vertical padding', () => {
      const { container } = render(<PACEditorialContent />);

      const articleSections = container.querySelectorAll('[data-testid^="article-section-"]');
      
      articleSections.forEach((section) => {
        expect(section).toHaveClass('py-16');
      });
    });
  });

  /**
   * Test: Data integrity
   *
   * Verifies that the data displayed matches the source data.
   */
  describe('Data Integrity', () => {
    it('displays correct number of official sources', () => {
      const { container } = render(<PACEditorialContent />);

      const sourcesSection = container.querySelector('[data-testid="sources-section"]');
      const sourceItems = sourcesSection?.querySelectorAll('li, a[href^="http"]');
      
      // Should display at least as many sources as defined in OFFICIAL_SOURCES
      expect(sourceItems?.length).toBeGreaterThanOrEqual(OFFICIAL_SOURCES.length);
    });

    it('FAQ section contains multiple questions', () => {
      const { container } = render(<PACEditorialContent />);

      const faqAccordion = container.querySelector('[data-testid="faq-accordion"]');
      const faqItems = faqAccordion?.querySelectorAll('button');
      
      // Should have multiple FAQ items
      expect(faqItems?.length).toBeGreaterThanOrEqual(5);
    });

    it('installation section mentions all 4 steps', () => {
      const { container } = render(<PACEditorialContent />);

      const installSection = container.querySelector('#installation');
      const sectionText = installSection?.textContent || '';
      
      // Should mention key installation steps
      const stepKeywords = ['visite', 'dimensionnement', 'devis', 'installation'];
      
      stepKeywords.forEach((keyword) => {
        expect(sectionText.toLowerCase()).toContain(keyword);
      });
    });

    it('types PAC section mentions all 4 types', () => {
      const { container } = render(<PACEditorialContent />);

      const typesSection = container.querySelector('#types-pac');
      const sectionText = typesSection?.textContent || '';
      
      // Should mention all PAC types
      const pacTypes = ['air/air', 'air/eau', 'géothermique', 'hybride'];
      
      pacTypes.forEach((type) => {
        expect(sectionText.toLowerCase()).toContain(type.toLowerCase());
      });
    });
  });
});
