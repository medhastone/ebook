'use client';

import React, { useState, useEffect } from 'react';
import { Clock, Sparkles, Tag, ArrowRight } from 'lucide-react';
import { SUPERPROFILE_PAYMENT_URL } from '@/lib/constants';
import { trackEvent } from '@/lib/analytics';
import { MagneticButton } from '@/components/ui/PhysicsInteractive';

export function UrgencyTimerBanner() {
  // 4 hours 35 minutes dynamic countdown timer
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 4,
    minutes: 35,
    seconds: 18,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        }
        if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        }
        if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 4, minutes: 30, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="w-full bg-[#0B1528] border-b border-amber-400/30 py-2.5 px-4 text-white text-xs sm:text-sm">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        {/* Left message with blinking live indicator */}
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400"></span>
          </span>
          <span className="font-medium text-slate-200">
            <strong className="text-amber-300 font-bold">Salary Day Reset Cohort:</strong> Use coupon code{' '}
            <span className="font-mono font-bold bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded border border-amber-400/40">
              MEDHASTONE
            </span>{' '}
            to get ₹100 OFF (Pay ₹299)
          </span>
        </div>

        {/* Right timer + quick CTA */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-1.5 font-mono font-bold text-xs bg-black/40 px-2.5 py-1 rounded-lg border border-white/15">
            <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="text-amber-300">{formatNumber(timeLeft.hours)}h</span>
            <span className="text-slate-500">:</span>
            <span className="text-amber-300">{formatNumber(timeLeft.minutes)}m</span>
            <span className="text-slate-500">:</span>
            <span className="text-amber-300">{formatNumber(timeLeft.seconds)}s</span>
          </div>

          <MagneticButton strength={0.3}>
            <a
              href={SUPERPROFILE_PAYMENT_URL}
              onClick={() => {
                trackEvent('click_buy', { source: 'top_urgency_timer_bar', price: 299, destination: SUPERPROFILE_PAYMENT_URL });
              }}
              className="px-3 py-1 rounded-lg bg-gradient-to-r from-[#E8871E] to-[#D97706] hover:from-[#C97112] hover:to-[#B45309] text-white font-bold text-xs shadow-xs inline-flex items-center gap-1 transition-all border border-amber-300/30"
            >
              <span>Claim ₹299 Deal</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </MagneticButton>
        </div>
      </div>
    </div>
  );
}
