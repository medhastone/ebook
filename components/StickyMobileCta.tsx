'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, Tag } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import { SUPERPROFILE_PAYMENT_URL } from '@/lib/constants';
import { MagneticButton } from '@/components/ui/PhysicsInteractive';

interface StickyMobileCtaProps {
  onBuyClick: () => void;
  price?: number;
}

export function StickyMobileCta({ onBuyClick, price = 299 }: StickyMobileCtaProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled down past hero (approx 350px)
      if (window.scrollY > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#14213D]/95 backdrop-blur-md border-t border-white/15 p-3 px-4 shadow-2xl sm:hidden animate-in slide-in-from-bottom duration-300">
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1.5">
            <span className="font-serif-title text-xl font-bold text-amber-300">
              ₹299
            </span>
            <span className="text-[10px] text-white/50 line-through">₹399</span>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-1 rounded">−₹100</span>
          </div>
          <span className="text-[10px] text-teal-300 font-mono">
            Code: MEDHASTONE
          </span>
        </div>

        <MagneticButton strength={0.3} className="flex-1 max-w-[200px]">
          <a
            href={SUPERPROFILE_PAYMENT_URL}
            onClick={() => {
              trackEvent('click_buy', { source: 'mobile_sticky_cta', price: 299, destination: SUPERPROFILE_PAYMENT_URL });
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#E8871E] to-[#D97706] hover:from-[#C97112] hover:to-[#B45309] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer text-center border border-amber-300/30"
          >
            <span>🔥 GET FOR ₹299</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </MagneticButton>
      </div>
    </div>
  );
}
