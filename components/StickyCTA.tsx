"use client"

import { useState, useEffect } from "react"
import { FileText } from "lucide-react"

interface StickyCTAProps {
  targetId: string;
  className?: string;
}

export default function StickyCTA({ targetId, className = '' }: StickyCTAProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Apparaît après scroll de 100vh
      const scrollThreshold = window.innerHeight;
      setIsVisible(window.scrollY > scrollThreshold);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className={`
        fixed bottom-0 left-0 right-0 z-50
        md:hidden
        transition-transform duration-300 ease-out
        ${isVisible ? 'translate-y-0' : 'translate-y-full'}
        ${className}
      `}
    >
      <div className="bg-white/95 backdrop-blur-sm border-t border-neutral-200 px-4 py-3 shadow-lg shadow-neutral-900/10">
        <button
          onClick={handleClick}
          className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-semibold py-3.5 px-6 rounded-xl transition-all shadow-lg shadow-green-600/20 hover:shadow-xl hover:shadow-green-600/30 flex items-center justify-center gap-2"
        >
          <FileText className="w-5 h-5" />
          Estimer mon prix
        </button>
      </div>
    </div>
  );
}
