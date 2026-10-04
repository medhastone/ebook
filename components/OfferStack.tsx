'use client';

import React from 'react';
import { 
  BookOpen, 
  Languages, 
  FileSpreadsheet, 
  HardDrive, 
  Sparkles, 
  CheckCircle2, 
  Tag,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { SUPERPROFILE_PAYMENT_URL } from '@/lib/constants';
import { trackEvent } from '@/lib/analytics';
import { TiltPhysicsCard } from '@/components/ui/PhysicsInteractive';

interface OfferStackProps {
  onBuyClick: () => void;
  price?: number;
}

export function OfferStack({ onBuyClick, price = 299 }: OfferStackProps) {
  const stackItems = [
    {
      emoji: '📘',
      title: 'English Ebook Edition',
      subtitle: 'Where Did My Salary Go? (72 Pages, PDF & EPUB)',
      value: '₹999',
      color: 'border-blue-400/40 bg-blue-500/10 text-blue-300',
    },
    {
      emoji: '🇮🇳',
      title: 'Complete Hindi Edition',
      subtitle: 'मेरा वेतन कहाँ चला गया? (72 Pages, PDF)',
      value: '₹599',
      color: 'border-teal-400/40 bg-teal-500/10 text-teal-300',
    },
    {
      emoji: '📊',
      title: '12 Editable Money Tools',
      subtitle: 'Google Sheets, Excel & Notion Dashboards',
      value: '₹499',
      color: 'border-amber-400/40 bg-amber-500/10 text-amber-300',
    },
    {
      emoji: '💻',
      title: '500GB Creator Editor Bundle',
      subtitle: 'Video LUTs, Sound FX & Motion Assets',
      value: '₹3,999',
      color: 'border-purple-400/40 bg-purple-500/10 text-purple-300',
    },
  ];

  return (
    <section id="offer-stack" className="py-16 sm:py-24 border-b border-white/10 relative text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3.5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-white/10 text-amber-300 border border-amber-400/30 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Complete Bundle Breakdown</span>
          </div>

          <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Look at Everything Inside.
          </h2>

          <p className="text-base sm:text-lg text-slate-200 font-sans-body leading-relaxed max-w-xl mx-auto">
            A comprehensive, multi-part kit engineered to give you complete visibility over every rupee.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {stackItems.map((item, idx) => (
            <TiltPhysicsCard key={idx} maxAngle={6} className="rounded-3xl h-full">
              <div className="p-6 rounded-3xl bg-[#0F1B33] border border-white/15 shadow-xl hover:border-amber-400/50 transition-all flex items-center justify-between gap-4 h-full">
                <div className="flex items-center gap-3.5">
                  <span className="text-3xl">{item.emoji}</span>
                  <div>
                    <h3 className="font-serif-title font-bold text-base sm:text-lg text-white">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-snug">
                      {item.subtitle}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">
                    Assigned Value
                  </span>
                  <span className="font-mono font-bold text-sm sm:text-base text-amber-300">
                    {item.value}
                  </span>
                </div>
              </div>
            </TiltPhysicsCard>
          ))}
        </div>

        {/* Value vs Price Visual Comparison Box */}
        <TiltPhysicsCard maxAngle={4} enableGlare={false} className="rounded-3xl">
          <div className="p-6 sm:p-9 rounded-3xl bg-[#091326] border border-teal-400/40 shadow-2xl space-y-6">
            <div className="text-center space-y-1">
              <span className="text-xs uppercase font-mono font-bold text-teal-300 tracking-wider">
                Value vs Purchase Price Comparison
              </span>
              <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-white">
                Combined Assigned Value: <span className="text-amber-300">₹6,096</span>
              </h3>
            </div>

            {/* Comparison Math Columns */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                <div className="text-[11px] font-mono text-slate-400 uppercase">Combined Value</div>
                <div className="font-serif-title text-xl sm:text-2xl font-bold text-slate-200">₹6,096</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                <div className="text-[11px] font-mono text-slate-400 uppercase">Regular Price</div>
                <div className="font-serif-title text-xl sm:text-2xl font-bold text-slate-200">₹399</div>
              </div>

              <div className="p-4 rounded-2xl bg-teal-500/15 border border-teal-400/30 space-y-1">
                <div className="text-[11px] font-mono text-teal-300 uppercase">Coupon Code</div>
                <div className="font-serif-title text-xl sm:text-2xl font-bold text-emerald-300">− ₹100</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#E8871E]/20 border border-amber-400/50 space-y-1">
                <div className="text-[11px] font-mono text-amber-300 uppercase">Final Price</div>
                <div className="font-serif-title text-2xl sm:text-3xl font-black text-amber-300">₹299</div>
              </div>
            </div>

            {/* Difference Highlight Banner */}
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-xs sm:text-sm text-slate-200">
              <div className="space-y-0.5">
                <strong className="text-white block font-bold">
                  ₹5,797 difference between assigned bundle value and final purchase price.
                </strong>
                <span className="text-slate-400 text-xs">
                  One-time payment • Lifetime digital access • Instant download portal
                </span>
              </div>

              <a
                href={SUPERPROFILE_PAYMENT_URL}
                onClick={() => {
                  trackEvent('click_buy', { source: 'offer_stack_cta', price: 299, destination: SUPERPROFILE_PAYMENT_URL });
                }}
                className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold text-xs sm:text-sm tracking-tight transition-all shrink-0 flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <span>CLAIM FOR ₹299</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </TiltPhysicsCard>
      </div>
    </section>
  );
}
