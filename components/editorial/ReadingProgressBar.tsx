'use client';

import { useState, useEffect } from 'react';

/**
 * Calculates the progress bar width based on scroll percentage.
 * Exported for testing purposes.
 * @param scrollPercent - The scroll percentage (0-100)
 * @returns The width percentage for the progress bar
 */
export const calculateProgressWidth = (scrollPercent: number): number => scrollPercent;

/**
 * ReadingProgressBar - A fixed progress bar at the top of the page
 * that shows reading progress through the article.
 * 
 * - Appears after scrolling past the hero (approximately 80% of viewport height)
 * - Width represents the percentage of the article that has been scrolled
 * - Fixed position at top with emerald-500 color and 3px height
 * - High z-index to stay above other content
 */
export function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrollTop = window.scrollY;
      
      // Show after scrolling past hero (approximately 80% of viewport height)
      setIsVisible(scrollTop > windowHeight * 0.8);
      
      // Calculate progress percentage
      const scrollPercent = documentHeight > 0 
        ? (scrollTop / documentHeight) * 100 
        : 0;
      setProgress(calculateProgressWidth(Math.min(100, Math.max(0, scrollPercent))));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Progression de lecture"
      data-testid="reading-progress-bar"
      className="fixed top-0 left-0 h-[3px] bg-emerald-500 z-50 transition-all duration-150"
      style={{ width: `${progress}%` }}
    />
  );
}
