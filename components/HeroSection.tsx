'use client';

import React, { useState } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Home, 
  Smartphone, 
  RefreshCw, 
  CreditCard, 
  Coffee, 
  PiggyBank, 
  Info,
  BookOpen
} from 'lucide-react';
import { formatINR } from '@/lib/formatters';
import { SUPERPROFILE_PAYMENT_URL } from '@/lib/constants';
import { trackEvent } from '@/lib/analytics';
import { TiltPhysicsCard, MagneticButton } from '@/components/ui/PhysicsInteractive';

interface HeroSectionProps {
  onBuyClick: () => void;
  onPreviewClick: () => void;
  price?: number;
}

export function HeroSection({ onBuyClick, onPreviewClick, price = 299 }: HeroSectionProps) {
  const [inputSalary, setInputSalary] = useState<number>(30000);
  const [activeSalary, setActiveSalary] = useState<number>(30000);
  const [isPatternRevealed, setIsPatternRevealed] = useState<boolean>(true);

  // Proportional illustrative allocations (for educational pattern illustration only)
  const essentials = Math.round(activeSalary * 0.48); // rent, food, commute
  const upiConvenience = Math.round(activeSalary * 0.16); // quick food, cabs, tea
  const subscriptions = Math.round(activeSalary * 0.05); // OTT, storage, gym
  const emis = Math.round(activeSalary * 0.15); // phone, bike, card
  const lifestyle = Math.round(activeSalary * 0.11); // weekend outings, dinners
  const remainingSavings = Math.max(0, activeSalary - (essentials + upiConvenience + subscriptions + emis + lifestyle));

  const handleShowPattern = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveSalary(inputSalary);
    setIsPatternRevealed(true);
    trackEvent('show_salary_pattern', { salary: inputSalary });
  };

  return (
    <section className="relative pt-8 pb-16 sm:pt-14 sm:pb-24 border-b border-white/10 overflow-hidden text-white">
      {/* Background radial highlights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-gradient-to-b from-teal-500/10 via-amber-500/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 space-y-10 sm:space-y-14">
        
        {/* Editorial Pill Eyebrow */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-white/10 text-amber-300 border border-amber-400/30 backdrop-blur-md shadow-xs">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Medhastone • The Indian Salary Reset Money Kit</span>
          </div>

          {/* Exact Requested Headline */}
          <h1 className="font-serif-title text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.15]">
            You Don’t Need Another Budget. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-teal-200 to-emerald-300">
              You Need to See What Your Money Is Actually Doing.
            </span>
          </h1>

          {/* Exact Requested Subheadline */}
          <p className="text-base sm:text-xl text-slate-200 font-sans-body leading-relaxed max-w-2xl mx-auto pt-1">
            Your salary may not be disappearing because of one big purchase. It may be disappearing through dozens of small decisions you barely notice.
          </p>

          {/* Quick CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <MagneticButton strength={0.35} maxTilt={6}>
              <a
                href={SUPERPROFILE_PAYMENT_URL}
                onClick={() => {
                  trackEvent('click_buy', { source: 'hero_primary_cta', price: 299, destination: SUPERPROFILE_PAYMENT_URL });
                }}
                className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-[#E8871E] via-[#F4932A] to-[#D97706] hover:from-[#C97112] hover:to-[#B45309] text-white font-bold text-base sm:text-lg shadow-[0_10px_25px_rgba(232,135,30,0.35)] transition-all flex items-center gap-2 border border-amber-300/40 cursor-pointer"
              >
                <span>🔥 Get The Salary Reset Kit — ₹299</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </MagneticButton>

            <button
              onClick={onPreviewClick}
              type="button"
              className="px-5 py-3.5 sm:py-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm sm:text-base border border-white/20 transition-all flex items-center gap-2 cursor-pointer backdrop-blur-md"
            >
              <BookOpen className="w-4 h-4 text-teal-400" />
              <span>Free 6-Page Preview</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE SALARY INPUT & ILLUSTRATIVE MONEY FLOW VISUALIZATION */}
        {/* ========================================================================= */}
        <div id="hero-pattern" className="max-w-3xl mx-auto scroll-mt-20">
          <TiltPhysicsCard maxAngle={4} enableGlare={false} className="rounded-3xl">
            <div className="p-6 sm:p-9 rounded-3xl bg-[#0B1528]/90 border border-white/15 shadow-2xl backdrop-blur-md space-y-6">
              
              {/* Interactive Input Form */}
              <form onSubmit={handleShowPattern} className="space-y-4">
                <div className="text-center space-y-1">
                  <label htmlFor="hero-salary-input" className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-300 block font-mono">
                    What happens to your salary every month?
                  </label>
                  <p className="text-xs text-slate-300">
                    Enter your monthly take-home salary to reveal the illustrative cascade:
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 max-w-lg mx-auto">
                  <div className="relative w-full flex-1">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-serif-title font-bold text-amber-300 text-lg">
                      ₹
                    </span>
                    <input
                      id="hero-salary-input"
                      type="number"
                      min={10000}
                      max={500000}
                      step={1000}
                      value={inputSalary}
                      onChange={(e) => setInputSalary(Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-mono font-bold text-base sm:text-lg focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                      placeholder="30000"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold text-sm sm:text-base tracking-tight transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 shrink-0"
                  >
                    <span>SHOW ME THE PATTERN</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>

              {/* Dynamic Insight Banner */}
              <div className="p-4 rounded-2xl bg-amber-500/15 border border-amber-400/30 text-center space-y-1">
                <div className="text-sm sm:text-base font-bold text-amber-200 font-serif-title">
                  &ldquo;Your salary isn&apos;t the problem. Not seeing the pattern may be.&rdquo;
                </div>
                <div className="text-xs text-slate-300">
                  Notice how a ₹{formatINR(activeSalary)} paycheck quietly splits across frictionless channels before savings can happen.
                </div>
              </div>

              {/* Visual Illustrative Flow Cascade */}
              {isPatternRevealed && (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 uppercase border-b border-white/10 pb-2">
                    <span>Illustrative Paycheck Cascade</span>
                    <span>Composite Monthly Split</span>
                  </div>

                  {/* Flow Stages */}
                  <div className="space-y-2.5 text-xs sm:text-sm">
                    {/* 1. Payday */}
                    <div className="p-3.5 rounded-xl bg-white/10 border border-white/15 flex items-center justify-between font-bold">
                      <div className="flex items-center gap-2.5 text-white">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                        <span>1. Salary Credited (Day 1)</span>
                      </div>
                      <span className="font-mono text-amber-300 text-sm sm:text-base">
                        {formatINR(activeSalary)}
                      </span>
                    </div>

                    {/* Flow arrow with rupee particles */}
                    <div className="flex justify-center -my-1 text-slate-500 text-xs font-mono">
                      ↓ <span className="text-[10px] text-amber-400/80 ml-1">₹ ₹ ₹</span>
                    </div>

                    {/* 2. Essentials */}
                    <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-slate-200">
                        <Home className="w-4 h-4 text-teal-400 shrink-0" />
                        <span>Essentials (Rent, groceries, commute)</span>
                      </div>
                      <span className="font-mono font-semibold text-slate-200">− {formatINR(essentials)}</span>
                    </div>

                    <div className="flex justify-center -my-1 text-slate-500 text-xs font-mono">
                      ↓ <span className="text-[10px] text-amber-400/80 ml-1">₹ ₹</span>
                    </div>

                    {/* 3. UPI / Convenience */}
                    <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-slate-200">
                        <Smartphone className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>UPI &amp; Convenience (Quick food, cabs, tea)</span>
                      </div>
                      <span className="font-mono font-semibold text-amber-300">− {formatINR(upiConvenience)}</span>
                    </div>

                    <div className="flex justify-center -my-1 text-slate-500 text-xs font-mono">
                      ↓ <span className="text-[10px] text-amber-400/80 ml-1">₹</span>
                    </div>

                    {/* 4. Subscriptions */}
                    <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-slate-200">
                        <RefreshCw className="w-4 h-4 text-purple-400 shrink-0" />
                        <span>Subscriptions (OTT, cloud storage, apps)</span>
                      </div>
                      <span className="font-mono font-semibold text-purple-300">− {formatINR(subscriptions)}</span>
                    </div>

                    <div className="flex justify-center -my-1 text-slate-500 text-xs font-mono">
                      ↓
                    </div>

                    {/* 5. EMIs */}
                    <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-slate-200">
                        <CreditCard className="w-4 h-4 text-rose-400 shrink-0" />
                        <span>EMIs &amp; PayLater (Gadgets, loans)</span>
                      </div>
                      <span className="font-mono font-semibold text-rose-300">− {formatINR(emis)}</span>
                    </div>

                    <div className="flex justify-center -my-1 text-slate-500 text-xs font-mono">
                      ↓
                    </div>

                    {/* 6. Lifestyle */}
                    <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-slate-200">
                        <Coffee className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span>Lifestyle &amp; Social Spends</span>
                      </div>
                      <span className="font-mono font-semibold text-cyan-300">− {formatINR(lifestyle)}</span>
                    </div>

                    <div className="flex justify-center -my-1 text-slate-500 text-xs font-mono">
                      ↓
                    </div>

                    {/* 7. What is left on Day 25 */}
                    <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-between font-bold">
                      <div className="flex items-center gap-2 text-emerald-200">
                        <PiggyBank className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>What is Left for Savings (Day 25)</span>
                      </div>
                      <span className="font-mono text-base font-extrabold text-emerald-300">
                        {formatINR(remainingSavings)}
                      </span>
                    </div>
                  </div>

                  {/* Crucial Illustrative Notice */}
                  <div className="pt-3 flex items-start gap-2 text-xs text-slate-300/90 leading-relaxed border-t border-white/10">
                    <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>Important Notice:</strong> This flow is an illustrative composite example demonstrating typical Indian salaried cashflow dynamics. It is not a prediction or individual diagnosis of your personal bank statement.
                    </span>
                  </div>
                </div>
              )}
            </div>
          </TiltPhysicsCard>
        </div>
      </div>
    </section>
  );
}
