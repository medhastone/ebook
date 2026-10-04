'use client';

import React, { useState } from 'react';
import { ArrowRight, AlertCircle, CheckCircle2, Sparkles, SlidersHorizontal } from 'lucide-react';
import { TiltPhysicsCard } from '@/components/ui/PhysicsInteractive';

export function BeforeAfterSection() {
  const [activeTab, setActiveTab] = useState<'both' | 'before' | 'after'>('both');

  return (
    <section className="py-16 sm:py-24 border-b border-white/10 relative text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3.5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-white/10 text-teal-300 border border-teal-400/30 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span>The Core Transformation</span>
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Same Salary. <br />
            <span className="text-amber-300">Different System.</span>
          </h2>
          <p className="text-slate-200 text-base sm:text-lg font-sans-body leading-relaxed max-w-xl mx-auto">
            &ldquo;The goal isn&apos;t to stop spending. The goal is to stop spending blindly.&rdquo;
          </p>

          {/* View Toggle */}
          <div className="inline-flex items-center p-1 rounded-2xl bg-white/10 border border-white/15 gap-1 mt-2">
            <button
              onClick={() => setActiveTab('both')}
              type="button"
              className={`px-4 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'both' ? 'bg-[#E8871E] text-slate-950 shadow-sm' : 'text-slate-300 hover:text-white'
              }`}
            >
              Side-by-Side
            </button>
            <button
              onClick={() => setActiveTab('before')}
              type="button"
              className={`px-4 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'before' ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-300 hover:text-white'
              }`}
            >
              Before Only
            </button>
            <button
              onClick={() => setActiveTab('after')}
              type="button"
              className={`px-4 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'after' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-300 hover:text-white'
              }`}
            >
              After Only
            </button>
          </div>
        </div>

        {/* Comparison Cards */}
        <div className={`grid gap-6 sm:gap-8 ${activeTab === 'both' ? 'grid-cols-1 md:grid-cols-2' : 'max-w-xl mx-auto grid-cols-1'}`}>
          {/* BEFORE CARD */}
          {(activeTab === 'both' || activeTab === 'before') && (
            <TiltPhysicsCard maxAngle={6} className="rounded-3xl h-full">
              <div className="p-7 sm:p-8 rounded-3xl bg-[#1D1322] border border-rose-500/40 shadow-xl space-y-6 h-full flex flex-col justify-between">
                <div className="space-y-5">
                  <div className="flex items-center justify-between border-b border-rose-500/25 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-rose-500/20 text-rose-300 flex items-center justify-center font-bold text-sm border border-rose-400/40">
                        ✕
                      </div>
                      <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-rose-200">
                        BEFORE
                      </h3>
                    </div>
                    <span className="text-xs sm:text-sm font-mono text-rose-300 uppercase font-bold tracking-wider">
                      The Frictionless Drain
                    </span>
                  </div>

                  {/* Sequence */}
                  <div className="p-5 rounded-2xl bg-white/[0.04] border border-rose-500/25 space-y-3.5">
                    <div className="font-serif-title font-bold text-base sm:text-lg text-rose-100 flex flex-wrap items-center gap-2 leading-relaxed">
                      <span>Salary</span>
                      <ArrowRight className="w-4 h-4 text-rose-400" />
                      <span>Spend</span>
                      <ArrowRight className="w-4 h-4 text-rose-400" />
                      <span>Forget</span>
                      <ArrowRight className="w-4 h-4 text-rose-400" />
                      <span>Wonder</span>
                      <ArrowRight className="w-4 h-4 text-rose-400" />
                      <span className="text-rose-300 underline underline-offset-4 font-extrabold">Repeat</span>
                    </div>
                    <p className="text-sm sm:text-base text-slate-200 font-sans-body leading-relaxed">
                      No allocation on day 1. Payments are made impulsively, bank balance slowly drains unnoticed, and by the 25th you are counting days until the next paycheck.
                    </p>
                  </div>

                  {/* Symptoms */}
                  <div className="space-y-3 pt-1 text-sm sm:text-base text-slate-200">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                      <span>No emergency fund cushion for health or career shocks</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                      <span>Subconscious guilt every time a food delivery notification rings</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                      <span>Zero clarity on exact annual insurance and vehicle taxes</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-rose-500/20 text-xs text-rose-300 font-mono">
                  Result: Zero monthly surplus &amp; constant month-end financial anxiety.
                </div>
              </div>
            </TiltPhysicsCard>
          )}

          {/* AFTER CARD */}
          {(activeTab === 'both' || activeTab === 'after') && (
            <TiltPhysicsCard maxAngle={6} className="rounded-3xl h-full">
              <div className="p-7 sm:p-8 rounded-3xl bg-[#0D2220] border border-emerald-500/40 shadow-xl space-y-6 h-full flex flex-col justify-between">
                <div className="space-y-5">
                  <div className="flex items-center justify-between border-b border-emerald-500/25 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-sm border border-emerald-400/40">
                        ✓
                      </div>
                      <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-emerald-200">
                        AFTER
                      </h3>
                    </div>
                    <span className="text-xs sm:text-sm font-mono text-emerald-300 uppercase font-bold tracking-wider">
                      The Intentional Flow
                    </span>
                  </div>

                  {/* Sequence */}
                  <div className="p-5 rounded-2xl bg-white/[0.04] border border-emerald-500/25 space-y-3.5">
                    <div className="font-serif-title font-bold text-base sm:text-lg text-emerald-100 flex flex-wrap items-center gap-2 leading-relaxed">
                      <span>Salary</span>
                      <ArrowRight className="w-4 h-4 text-emerald-400" />
                      <span>Plan</span>
                      <ArrowRight className="w-4 h-4 text-emerald-400" />
                      <span>Allocate</span>
                      <ArrowRight className="w-4 h-4 text-emerald-400" />
                      <span>Track</span>
                      <ArrowRight className="w-4 h-4 text-emerald-400" />
                      <span>Review</span>
                      <ArrowRight className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-300 font-extrabold underline underline-offset-4">Improve</span>
                    </div>
                    <p className="text-sm sm:text-base text-slate-200 font-sans-body leading-relaxed">
                      Day-1 automated partitioning. Spending on coffee, dinners, or hobbies is 100% guilt-free because future money, fixed costs, and emergency funds are already safely separated.
                    </p>
                  </div>

                  {/* Symptoms */}
                  <div className="space-y-3 pt-1 text-sm sm:text-base text-slate-200">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Predictable 15% to 30% monthly surplus automatically building</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Zero anxiety on the 28th because every bucket is funded</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Simple 10-minute checkup ritual once a month on salary day</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-emerald-500/20 text-xs text-emerald-300 font-mono">
                  Result: Complete peace of mind &amp; systematic wealth growth.
                </div>
              </div>
            </TiltPhysicsCard>
          )}
        </div>
      </div>
    </section>
  );
}
