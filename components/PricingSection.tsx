'use client';

import React, { useState } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Tag, 
  ShieldCheck, 
  Sparkles, 
  Info, 
  Zap, 
  CreditCard,
  Mail,
  Check
} from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import { SUPERPROFILE_PAYMENT_URL } from '@/lib/constants';
import { TiltPhysicsCard, MagneticButton } from '@/components/ui/PhysicsInteractive';

interface PricingSectionProps {
  onBuyClick: () => void;
  price?: number;
}

export function PricingSection({ onBuyClick, price = 299 }: PricingSectionProps) {
  const REGULAR_PRICE = 399;
  const DISCOUNT_AMOUNT = 100;
  
  const [couponInput, setCouponInput] = useState<string>('MEDHASTONE');
  const [isApplied, setIsApplied] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const finalPrice = isApplied ? REGULAR_PRICE - DISCOUNT_AMOUNT : REGULAR_PRICE;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.trim().toUpperCase() === 'MEDHASTONE') {
      setIsApplied(true);
      setErrorMessage('');
      trackEvent('apply_coupon_success', { coupon: 'MEDHASTONE' });
    } else {
      setErrorMessage('Invalid code. Use MEDHASTONE for ₹100 off.');
      setIsApplied(false);
    }
  };

  const inclusions = [
    'Where Did My Salary Go? English Ebook (72 Pages, PDF & EPUB)',
    'Complete Hindi Edition — मेरा वेतन कहाँ चला गया?',
    '12 Editable Spreadsheets, Dashboards & Decision Trackers',
    '500GB Creator Editor Digital Bundle (Video, SFX & Motion)',
    'Lifetime Digital Access & Future Updates',
    'Instant Digital Download & Dedicated Support (medhastone@gmail.com)',
  ];

  return (
    <section id="pricing" className="py-16 sm:py-24 border-b border-white/10 scroll-mt-14 relative overflow-hidden text-white">
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3.5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider bg-white/10 text-amber-300 border border-white/15 backdrop-blur-md shadow-xs">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Medhastone Official Offer</span>
          </div>

          <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Reset Your Next Salary Cycle
          </h2>

          <p className="text-slate-200 text-base sm:text-lg font-sans-body leading-relaxed max-w-xl mx-auto">
            Get the complete 72-page manual, the Hindi edition, all 12 editable tools, and the 500GB creator bundle.
          </p>
        </div>

        {/* Master Pricing Card */}
        <div className="max-w-xl mx-auto">
          <TiltPhysicsCard maxAngle={6} className="rounded-3xl">
            <div className="rounded-3xl bg-[#0F1C36] border border-amber-400/50 shadow-2xl overflow-hidden">
              {/* Card Top Header */}
              <div className="bg-[#142344] text-white p-6 sm:p-7 text-center space-y-1.5 border-b border-white/10">
                <span className="text-xs font-mono tracking-widest uppercase text-teal-300 font-bold">
                  ALL-IN-ONE ACCESS PASS
                </span>
                <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-white">
                  Salary Reset Money Kit
                </h3>
                <p className="text-sm text-slate-300">
                  Immediate digital delivery via email and secure web portal
                </p>
              </div>

              {/* Pricing Details Block */}
              <div className="p-6 sm:p-8 space-y-7">
                {/* Interactive Coupon Box */}
                <div className="p-4 rounded-2xl bg-[#0B1528] border border-teal-400/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase font-mono font-bold text-teal-300 flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-teal-400" />
                      <span>Have a coupon code?</span>
                    </span>
                    {isApplied && (
                      <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        <span>Applied: −₹100</span>
                      </span>
                    )}
                  </div>

                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="ENTER COUPON"
                      className="flex-1 px-3.5 py-2 rounded-xl bg-white/10 border border-white/20 text-xs sm:text-sm font-mono uppercase font-bold text-white placeholder:text-slate-400 focus:outline-none focus:border-amber-400"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-600 text-slate-950 text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-sm"
                    >
                      {isApplied ? 'Re-Apply' : 'Apply'}
                    </button>
                  </form>

                  {isApplied ? (
                    <div className="text-xs text-emerald-300 flex items-center gap-1.5 font-medium">
                      <span>🎉 Coupon applied! <strong>YOU SAVE ₹100</strong></span>
                    </div>
                  ) : errorMessage ? (
                    <div className="text-xs text-rose-300">{errorMessage}</div>
                  ) : null}
                </div>

                {/* Price Presentation: ₹399 -> ₹299 */}
                <div className="text-center space-y-2 py-2">
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-lg sm:text-xl text-slate-400 line-through font-mono">
                      ₹{REGULAR_PRICE}
                    </span>
                    <span className="text-xs sm:text-sm text-slate-300 font-medium">Regular Price</span>
                    {isApplied && (
                      <>
                        <span className="text-slate-400">→</span>
                        <span className="text-xs sm:text-sm font-bold text-emerald-300 bg-emerald-500/20 border border-emerald-400/30 px-3 py-0.5 rounded-full">
                          SAVE ₹100 TODAY
                        </span>
                      </>
                    )}
                  </div>

                  {/* The Hero Price: ₹299 */}
                  <div className="font-serif-title text-5xl sm:text-7xl font-black text-amber-300 tracking-tight animate-in zoom-in-95 duration-200">
                    ₹{finalPrice}
                  </div>

                  <div className="text-xs sm:text-sm text-slate-300 font-sans-body">
                    One-time payment • No subscriptions • Lifetime digital access
                  </div>

                  <div className="pt-2">
                    <span className="inline-block text-xs sm:text-sm font-mono text-purple-300 bg-purple-500/20 border border-purple-400/40 px-3.5 py-1 rounded-full font-semibold">
                      Combined Assigned Value: ₹6,096
                    </span>
                  </div>
                </div>

                {/* Inclusions Checklist */}
                <div className="space-y-3 pt-2 border-t border-white/10 text-sm sm:text-base text-slate-100">
                  {inclusions.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Primary CTA Button */}
                <div className="pt-2 space-y-2.5 text-center">
                  <MagneticButton strength={0.4} maxTilt={8} className="w-full">
                    <a
                      href={SUPERPROFILE_PAYMENT_URL}
                      onClick={() => {
                        trackEvent('click_buy', { source: 'pricing_card_primary', price: finalPrice, destination: SUPERPROFILE_PAYMENT_URL });
                      }}
                      className="w-full py-4.5 rounded-2xl bg-gradient-to-r from-[#E8871E] via-[#F4932A] to-[#D97706] hover:from-[#C97112] hover:to-[#B45309] text-white font-bold text-lg sm:text-xl shadow-[0_10px_25px_rgba(232,135,30,0.35)] hover:shadow-[0_15px_35px_rgba(232,135,30,0.5)] transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2.5 group border border-amber-300/30"
                    >
                      <span>🔥 GET IT FOR ₹{finalPrice}</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </MagneticButton>

                  <div className="text-center text-xs sm:text-sm text-slate-300 font-medium pt-1">
                    Use code <strong className="font-mono text-teal-300 font-bold">MEDHASTONE</strong> • Save ₹100
                  </div>
                </div>

                {/* Trust and Payment Security */}
                <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-center gap-3.5 text-xs sm:text-sm text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-teal-400" />
                    <span>100% Secure Checkout</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span>Instant Digital Download</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-slate-300" />
                    <span>UPI / GPay / Cards</span>
                  </div>
                </div>

                {/* Digital Product Delivery Notice */}
                <div className="pt-2 border-t border-white/10 text-xs text-slate-300 leading-relaxed flex items-start gap-2">
                  <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Digital Product Delivery:</strong> All purchases are delivered immediately via secure download links and email. Due to the digital nature of the content and templates, sales are non-refundable once paid. For any access support, contact <strong>medhastone@gmail.com</strong>.
                  </span>
                </div>
              </div>
            </div>
          </TiltPhysicsCard>
        </div>
      </div>
    </section>
  );
}
