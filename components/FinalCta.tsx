'use client';

import React from 'react';
import { ArrowRight, Sparkles, Tag, Zap, CheckCircle2, Mail, ShieldCheck } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import { SUPERPROFILE_PAYMENT_URL } from '@/lib/constants';
import { TiltPhysicsCard, MagneticButton } from '@/components/ui/PhysicsInteractive';

interface FinalCtaProps {
  onBuyClick: () => void;
  price?: number;
}

export function FinalCta({ onBuyClick, price = 299 }: FinalCtaProps) {
  return (
    <section className="py-16 sm:py-24 border-b border-white/10 text-white relative overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-8 sm:space-y-10">
        
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-white/10 text-amber-300 border border-white/15 shadow-xs backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>The Next Paycheck Shift</span>
        </div>

        {/* Headlines */}
        <div className="space-y-4 max-w-3xl mx-auto">
          <h2 className="font-serif-title text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
            Next Month Can Start Differently.
          </h2>

          <div className="text-base sm:text-xl text-slate-200 font-sans-body max-w-2xl mx-auto leading-relaxed space-y-3 pt-2">
            <p>
              You don&apos;t need a perfect budget. <br />
              You don&apos;t need to stop enjoying your money.
            </p>
            <p className="font-serif-title font-bold text-amber-300 text-xl sm:text-2xl">
              You simply need to see the pattern.
            </p>
            <p className="text-slate-300 text-sm sm:text-base">
              Once you can see it, you can decide what happens next.
            </p>
          </div>
        </div>

        {/* The 5-Step System Loop Flow */}
        <div className="max-w-2xl mx-auto p-4 sm:p-5 rounded-2xl bg-[#0F1B33] border border-white/15 shadow-xl">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-mono font-bold text-teal-300">
            <span>Salary</span>
            <span className="text-slate-500">→</span>
            <span>Plan</span>
            <span className="text-slate-500">→</span>
            <span>Track</span>
            <span className="text-slate-500">→</span>
            <span>Review</span>
            <span className="text-slate-500">→</span>
            <span className="text-amber-300 font-extrabold underline underline-offset-4">Improve</span>
          </div>
        </div>

        {/* Price Math Breakdown Box */}
        <div className="max-w-md mx-auto">
          <TiltPhysicsCard maxAngle={6} className="rounded-2xl">
            <div className="p-6 rounded-2xl bg-[#0F1C36] border border-amber-400/40 space-y-3.5 text-left shadow-xl">
              <div className="flex items-center justify-between text-sm text-slate-300 pb-2.5 border-b border-white/10">
                <span>Regular Price</span>
                <span className="font-mono line-through text-slate-400">₹399</span>
              </div>
              <div className="flex items-center justify-between text-sm text-teal-300 pb-2.5 border-b border-white/10">
                <span className="flex items-center gap-1.5">
                  <Tag className="w-4 h-4 text-teal-400" />
                  <span>Coupon (<strong className="font-mono text-white">MEDHASTONE</strong>)</span>
                </span>
                <span className="font-mono font-bold text-emerald-300">− ₹100</span>
              </div>
              <div className="flex items-center justify-between text-base sm:text-lg font-bold text-white pt-1">
                <span>Final Price:</span>
                <span className="font-serif-title text-3xl text-amber-300 font-black">₹299</span>
              </div>
            </div>
          </TiltPhysicsCard>
        </div>

        {/* Primary CTA */}
        <div className="max-w-md mx-auto space-y-3">
          <MagneticButton strength={0.4} maxTilt={8} className="w-full">
            <a
              href={SUPERPROFILE_PAYMENT_URL}
              onClick={() => {
                trackEvent('click_buy', { source: 'final_cta_button', price: 299, destination: SUPERPROFILE_PAYMENT_URL });
              }}
              className="w-full py-4.5 rounded-2xl bg-gradient-to-r from-[#E8871E] via-[#F4932A] to-[#D97706] hover:from-[#C97112] hover:to-[#B45309] text-white font-bold text-lg sm:text-xl shadow-[0_10px_25px_rgba(232,135,30,0.35)] hover:shadow-[0_15px_35px_rgba(232,135,30,0.5)] transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2.5 group border border-amber-300/30"
            >
              <span>🔥 GET IT FOR ₹299</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </MagneticButton>

          <div className="text-sm text-slate-300 pt-1 font-medium">
            Use code: <strong className="font-mono text-teal-300 font-bold">MEDHASTONE</strong> • Save ₹100
          </div>
        </div>

        {/* Trust Badges */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-5 text-sm text-slate-300">
          <span className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>100% Instant Digital Access</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-teal-400" />
            <span>Support: medhastone@gmail.com</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-purple-400" />
            <span>English + Hindi + 12 Tools</span>
          </span>
        </div>
      </div>
    </section>
  );
}
