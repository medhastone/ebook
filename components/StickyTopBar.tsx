'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, Tag } from 'lucide-react';
import { SUPERPROFILE_PAYMENT_URL } from '@/lib/constants';
import { trackEvent } from '@/lib/analytics';
import { MagneticButton } from '@/components/ui/PhysicsInteractive';

interface StickyTopBarProps {
  onBuyClick: () => void;
  price?: number;
  regularPrice?: number;
}

export function StickyTopBar({ onBuyClick, price = 299, regularPrice = 399 }: StickyTopBarProps) {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = height > 0 ? Math.min(100, Math.max(0, (scrollY / height) * 100)) : 0;
      setScrollProgress(progress);
      setIsScrolled(scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Scroll Progress Indicator */}
      <div className="w-full h-1 bg-white/10 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-amber-400 via-teal-400 to-emerald-400 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className={`w-full transition-all duration-300 ${isScrolled ? 'bg-[#070E1C]/95 backdrop-blur-md border-b border-white/15 shadow-2xl py-3' : 'bg-[#070E1C]/70 backdrop-blur-sm border-b border-white/10 py-3.5'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          
          {/* Brand Logo & Clean Title */}
          <a href="#" className="flex items-center gap-2.5 group cursor-pointer">
            <div className="w-8 h-8 rounded-xl bg-[#E8871E] flex items-center justify-center font-serif-title font-bold text-slate-950 text-base shadow-md border border-amber-300/40 group-hover:scale-105 transition-transform">
              M
            </div>
            <span className="font-serif-title font-black text-white text-base sm:text-lg tracking-wider group-hover:text-amber-300 transition-colors">
              MEDHASTONE
            </span>
          </a>

          {/* Clean One-Word Navigation Menu */}
          <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm text-slate-200 font-semibold tracking-wide">
            <a href="#hero-pattern" className="hover:text-amber-300 transition-colors py-1">Pattern</a>
            <a href="#where-did-it-go" className="hover:text-amber-300 transition-colors py-1">Leaks</a>
            <a href="#quick-check" className="hover:text-amber-300 transition-colors py-1">Check</a>
            <a href="#story" className="hover:text-amber-300 transition-colors py-1">Story</a>
            <a href="#tools" className="hover:text-amber-300 transition-colors py-1">Tools</a>
            <a href="#pricing" className="text-amber-300 font-bold hover:text-amber-200 transition-colors py-1">Offer</a>
            <a href="#faq" className="hover:text-amber-300 transition-colors py-1">FAQ</a>
          </nav>

          {/* Action CTA */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-lg bg-teal-500/15 border border-teal-400/30 text-teal-300 text-xs font-mono font-bold">
              <Tag className="w-3.5 h-3.5 text-teal-400" />
              <span>MEDHASTONE = ₹299</span>
            </div>

            <MagneticButton strength={0.25}>
              <a
                href={SUPERPROFILE_PAYMENT_URL}
                onClick={() => {
                  trackEvent('click_buy', { source: 'sticky_top_bar', price: 299, destination: SUPERPROFILE_PAYMENT_URL });
                }}
                className="px-4 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-[#E8871E] to-[#D97706] hover:from-[#C97112] hover:to-[#B45309] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 cursor-pointer border border-amber-300/30"
              >
                <span>Get Kit • ₹299</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </MagneticButton>
          </div>

        </div>
      </div>
    </header>
  );
}
