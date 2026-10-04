'use client';

import React, { useState } from 'react';
import { 
  Calendar, 
  ArrowDown, 
  HelpCircle, 
  Sparkles, 
  Info, 
  CheckCircle2,
  Lock,
  Eye
} from 'lucide-react';
import { TiltPhysicsCard } from '@/components/ui/PhysicsInteractive';

export function ArjunStorySection() {
  const [isRevealed, setIsRevealed] = useState<boolean>(false);

  const timelineSteps = [
    { label: 'PAYDAY (1st of the month)', amount: '₹30,000', note: 'Salary credited. Confidence is high.', color: 'text-emerald-400 bg-emerald-500/15 border-emerald-400/40' },
    { label: 'Rent Paid', amount: '− ₹8,000', note: 'Essential shelter transfer', color: 'text-slate-200 bg-white/[0.04] border-white/10' },
    { label: 'Family Support', amount: '− ₹3,000', note: 'Remittance to parents', color: 'text-slate-200 bg-white/[0.04] border-white/10' },
    { label: 'Groceries & Essentials', amount: '− ₹4,500', note: 'Monthly rations and supermarket run', color: 'text-slate-200 bg-white/[0.04] border-white/10' },
    { label: 'Travel & Commute', amount: '− ₹2,000', note: 'Metro card & fuel top-ups', color: 'text-slate-200 bg-white/[0.04] border-white/10' },
    { label: 'Smartphone EMI', amount: '− ₹2,500', note: 'No-cost EMI auto-debit', color: 'text-rose-300 bg-rose-500/10 border-rose-400/30' },
  ];

  const microSpends = [
    { name: 'Late night snack order', amount: '₹189' },
    { name: 'Quick cab surge fare', amount: '₹129' },
    { name: 'Chai & evening snacks with team', amount: '₹249' },
    { name: '10-minute convenience delivery', amount: '₹199' },
    { name: 'OTT subscription auto-renewal', amount: '₹499' },
    { name: 'Weekend coffee & bakery split', amount: '₹340' },
  ];

  return (
    <section id="story" className="py-16 sm:py-24 border-b border-white/10 relative text-white scroll-mt-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3.5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-white/10 text-amber-300 border border-amber-400/30 backdrop-blur-md">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>Case Study • The 24th Day Reality</span>
          </div>

          <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            ₹30,000 Felt Like Enough… <br />
            <span className="text-rose-300">Until the 24th.</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-200 font-sans-body leading-relaxed max-w-2xl mx-auto">
            Meet Arjun, a 26-year-old marketing executive. He doesn&apos;t buy designer watches or fly first-class. Here is how his month unfolded:
          </p>
        </div>

        {/* Timeline Visual Card */}
        <TiltPhysicsCard maxAngle={4} enableGlare={false} className="rounded-3xl">
          <div className="p-6 sm:p-9 rounded-3xl bg-[#0F1B33] border border-white/15 shadow-2xl space-y-6">
            
            {/* Timeline Stream */}
            <div className="space-y-3">
              {timelineSteps.map((step, idx) => (
                <div key={idx} className={`p-3.5 sm:p-4 rounded-2xl border ${step.color} flex items-center justify-between gap-3`}>
                  <div>
                    <div className="font-bold text-xs sm:text-sm text-white">{step.label}</div>
                    <div className="text-xs text-slate-300">{step.note}</div>
                  </div>
                  <span className="font-mono font-bold text-sm sm:text-base whitespace-nowrap">{step.amount}</span>
                </div>
              ))}
            </div>

            {/* Micro Spends Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-amber-500/30 space-y-3">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300">
                ↓ Small Repeated Daily Spending (Dozens of unnoticed taps):
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                {microSpends.map((m, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-white/10 border border-white/10 flex items-center justify-between gap-1">
                    <span className="text-slate-200 truncate">{m.name}</span>
                    <span className="font-mono text-amber-300 font-bold shrink-0">{m.amount}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Day 24 Bottom State */}
            <div className="p-4 sm:p-5 rounded-2xl bg-rose-950/60 border border-rose-500/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <div>
                <div className="text-xs font-mono font-bold uppercase text-rose-300">
                  24th of the month • 6 days until next salary
                </div>
                <div className="text-sm sm:text-base text-slate-200 font-medium">
                  Remaining Bank Balance:
                </div>
              </div>
              <div className="font-serif-title text-3xl sm:text-4xl font-black text-rose-300">
                ₹2,840
              </div>
            </div>

            {/* The Question & Reveal Pattern Button */}
            <div className="pt-2 text-center space-y-4">
              <div className="font-serif-title text-xl sm:text-2xl font-bold text-white">
                &ldquo;Nothing looked crazy. So what happened?&rdquo;
              </div>

              {!isRevealed ? (
                <button
                  onClick={() => setIsRevealed(true)}
                  type="button"
                  className="px-6 sm:px-8 py-3.5 rounded-2xl bg-[#E8871E] hover:bg-[#C97112] text-slate-950 font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all cursor-pointer inline-flex items-center gap-2 border border-amber-300/40"
                >
                  <Eye className="w-4 h-4" />
                  <span>REVEAL THE PATTERN</span>
                </button>
              ) : (
                <div className="p-5 sm:p-6 rounded-2xl bg-teal-950/60 border border-teal-400/50 space-y-3 text-center animate-in zoom-in-95 duration-200">
                  <div className="inline-flex items-center gap-1.5 text-teal-300 font-bold text-xs uppercase tracking-wider font-mono">
                    <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                    <span>The Core Realization</span>
                  </div>
                  <div className="font-serif-title text-xl sm:text-2xl font-bold text-white leading-snug">
                    &ldquo;The issue wasn&apos;t one dramatic purchase. <br />
                    <span className="text-amber-300">It was repeated decisions that were easy to overlook.&rdquo;</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 max-w-xl mx-auto font-sans-body leading-relaxed">
                    By installing the 30-Day Salary Reset, Arjun replaced these unassigned micro-drains with a simple 5-bucket partition on Day 1, keeping over ₹4,200 in surplus every month.
                  </p>
                </div>
              )}
            </div>

            {/* Composite Disclaimer */}
            <div className="pt-3 border-t border-white/10 flex items-start gap-2 text-xs text-slate-400 leading-relaxed">
              <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <span>
                <strong>Composite Case Study:</strong> Arjun is a fictional composite persona created to illustrate cashflow mechanics in urban Indian salaried households. Individual figures and experiences will vary.
              </span>
            </div>
          </div>
        </TiltPhysicsCard>
      </div>
    </section>
  );
}
