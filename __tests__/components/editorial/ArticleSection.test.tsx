/**
 * Unit Tests for ArticleSection Component
 *
 * Feature: pac-editorial-content, Property 2: Prose Width Constraint
 *
 * Tests the ArticleSection component for correct styling and heading hierarchy.
 *
 * **Validates: Requirements 1.2, 9.2**
 */

import { render, screen } from '@testing-library/react';
import { ArticleSection } from '@/components/editorial/ArticleSection';

describe('ArticleSection', () => {
  /**
   * Feature: pac-editorial-content, Property 2: Prose Width Constraint
   *
   * *For any* ArticleSection component, the prose container SHALL have a maximum
   * width of 720px (or equivalent Tailwind class `max-w-prose` or custom `max-w-[720px]`).
   *
   * **Validates: Requirements 1.2**
   */
  it('applies prose-editorial class for max-width 720px', () => {
    render(
      <ArticleSection id="test" title="Test Title">
        <p>Test content</p>
      </ArticleSection>
    );
    
    const section = screen.getByTestId('article-section-test');
    const proseContainer = section.querySelector('.prose-editorial');
    expect(proseContainer).toBeInTheDocument();
  });

  /**
   * Requirement 9.2: Heading Hierarchy Compliance
   *
   * ArticleSection should render h2 heading by default for proper SEO structure.
   */
  it('renders h2 heading by default', () => {
    render(
      <ArticleSection id="test" title="Test Title">
        <p>Test content</p>
      </ArticleSection>
    );
    
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('Test Title');
  });

  /**
   * Requirement 9.2: Heading Hierarchy Compliance
   *
   * ArticleSection should render h3 heading when level prop is set to 'h3'.
   */
  it('renders h3 heading when level prop is h3', () => {
    render(
      <ArticleSection id="test" title="Test Title" level="h3">
        <p>Test content</p>
      </ArticleSection>
    );
    
    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toHaveTextContent('Test Title');
  });

  /**
   * Requirement 9.2: SEO and anchoring
   *
   * ArticleSection should apply correct id for anchoring and SEO purposes.
   */
  it('applies correct id for anchoring', () => {
    render(
      <ArticleSection id="types-pac" title="Types de PAC">
        <p>Content</p>
      </ArticleSection>
    );
    
    const section = document.getElementById('types-pac');
    expect(section).toBeInTheDocument();
  });

  /**
   * ArticleSection should render children content correctly.
   */
  it('renders children content', () => {
    render(
      <ArticleSection id="test" title="Test">
        <p>Child paragraph content</p>
      </ArticleSection>
    );
    
    expect(screen.getByText('Child paragraph content')).toBeInTheDocument();
  });

  /**
   * ArticleSection should apply custom className when provided.
   */
  it('applies custom className when provided', () => {
    render(
      <ArticleSection id="test" title="Test" className="custom-class">
        <p>Content</p>
      </ArticleSection>
    );
    
    const section = screen.getByTestId('article-section-test');
    expect(section).toHaveClass('custom-class');
  });

  /**
   * ArticleSection should have correct data-testid attribute.
   */
  it('has correct data-testid attribute based on id prop', () => {
    render(
      <ArticleSection id="my-section" title="My Section">
        <p>Content</p>
      </ArticleSection>
    );
    
    expect(screen.getByTestId('article-section-my-section')).toBeInTheDocument();
  });

  /**
   * Requirement 1.4: Editorial styling
   *
   * ArticleSection should apply editorial font classes for proper typography.
   */
  it('applies editorial font classes to heading', () => {
    render(
      <ArticleSection id="test" title="Test Title">
        <p>Content</p>
      </ArticleSection>
    );
    
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveClass('font-editorial-serif');
    expect(heading).toHaveClass('font-bold');
  });

  /**
   * Requirement 1.4: Editorial styling
   *
   * ArticleSection should apply correct font classes to content container.
   */
  it('applies editorial font classes to content container', () => {
    render(
      <ArticleSection id="test" title="Test Title">
        <p>Content</p>
      </ArticleSection>
    );
    
    const section = screen.getByTestId('article-section-test');
    const contentContainer = section.querySelector('.font-editorial-sans');
    expect(contentContainer).toBeInTheDocument();
  });

  /**
   * Requirement 1.4: Spacing
   *
   * ArticleSection should have generous vertical padding (py-16).
   */
  it('has generous vertical padding', () => {
    render(
      <ArticleSection id="test" title="Test Title">
        <p>Content</p>
      </ArticleSection>
    );
    
    const section = screen.getByTestId('article-section-test');
    expect(section).toHaveClass('py-16');
  });

  /**
   * H2 heading should have larger text size than H3.
   */
  it('h2 heading has larger text classes than h3', () => {
    const { rerender } = render(
      <ArticleSection id="test" title="Test Title" level="h2">
        <p>Content</p>
      </ArticleSection>
    );
    
    const h2Heading = screen.getByRole('heading', { level: 2 });
    expect(h2Heading).toHaveClass('text-3xl');
    expect(h2Heading).toHaveClass('md:text-4xl');
    
    rerender(
      <ArticleSection id="test" title="Test Title" level="h3">
        <p>Content</p>
      </ArticleSection>
    );
    
    const h3Heading = screen.getByRole('heading', { level: 3 });
    expect(h3Heading).toHaveClass('text-2xl');
    expect(h3Heading).toHaveClass('md:text-3xl');
  });
});
