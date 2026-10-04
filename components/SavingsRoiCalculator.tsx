'use client';

import React, { useState } from 'react';
import { Calculator, ArrowRight, CheckCircle2, Mail, Zap } from 'lucide-react';
import { formatINR } from '@/lib/formatters';
import { SUPERPROFILE_PAYMENT_URL } from '@/lib/constants';
import { trackEvent } from '@/lib/analytics';
import { TiltPhysicsCard, MagneticButton } from '@/components/ui/PhysicsInteractive';

export function SavingsRoiCalculator() {
  const [monthlySalary, setMonthlySalary] = useState<number>(55000);
  const [estimatedLeakPercent, setEstimatedLeakPercent] = useState<number>(12); // typical 10-15% UPI/EMI leak

  const monthlyLeakAmount = Math.round((monthlySalary * estimatedLeakPercent) / 100);
  const oneYearSavings = monthlyLeakAmount * 12;
  // 3-year compounded at conservative 12% index return if invested monthly
  const monthlyRate = 0.12 / 12;
  const months = 36;
  const futureValue3Years = Math.round(
    monthlyLeakAmount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate)
  );

  const price = 299;
  const roiMultiplier = Math.round(oneYearSavings / price);

  return (
    <section className="py-16 sm:py-24 border-b border-white/10 relative text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3.5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
            <Calculator className="w-4 h-4 text-emerald-400" />
            <span>Interactive Financial Return Simulator</span>
          </div>

          <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            See Your 1-Year Financial ROI on ₹299
          </h2>

          <p className="text-base sm:text-lg text-slate-200 font-sans-body leading-relaxed">
            Plug your salary numbers below to see the math of how stopping small silent leaks compounds into massive wealth.
          </p>
        </div>

        {/* Master Calculator Card */}
        <TiltPhysicsCard maxAngle={4} glowColor="teal" className="rounded-3xl">
          <div className="p-6 sm:p-10 rounded-3xl bg-[#0F1C36] border border-teal-400/40 shadow-2xl space-y-8">
            {/* Sliders Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 pb-8 border-b border-white/10">
              {/* Monthly Salary Slider */}
              <div className="space-y-3.5 p-5 rounded-2xl bg-white/[0.04] border border-white/15">
                <div className="flex items-center justify-between">
                  <label className="text-sm uppercase font-bold text-slate-200 tracking-wider">
                    Monthly Take-Home Salary:
                  </label>
                  <span className="font-serif-title text-2xl font-bold text-amber-300">
                    {formatINR(monthlySalary)}
                  </span>
                </div>
                <input
                  type="range"
                  min={15000}
                  max={150000}
                  step={2500}
                  value={monthlySalary}
                  onChange={(e) => setMonthlySalary(Number(e.target.value))}
                  className="w-full h-2.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#E8871E]"
                />
                <div className="flex justify-between text-xs text-slate-300 font-mono">
                  <span>₹15,000</span>
                  <span>₹75,000</span>
                  <span>₹1,50,000+</span>
                </div>
              </div>

              {/* Estimated Leak Percentage Slider */}
              <div className="space-y-3.5 p-5 rounded-2xl bg-white/[0.04] border border-white/15">
                <div className="flex items-center justify-between">
                  <label className="text-sm uppercase font-bold text-slate-200 tracking-wider">
                    Estimated UPI &amp; Friction Leaks:
                  </label>
                  <span className="font-serif-title text-2xl font-bold text-emerald-300">
                    {estimatedLeakPercent}% ({formatINR(monthlyLeakAmount)}/mo)
                  </span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={30}
                  step={1}
                  value={estimatedLeakPercent}
                  onChange={(e) => setEstimatedLeakPercent(Number(e.target.value))}
                  className="w-full h-2.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#10B981]"
                />
                <div className="flex justify-between text-xs text-slate-300 font-mono">
                  <span>5% (Disciplined)</span>
                  <span>12% (Average Indian Salaried)</span>
                  <span>30% (High Leak)</span>
                </div>
              </div>
            </div>

            {/* Results Display */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-center">
              {/* Box 1: Monthly Leak Recovered */}
              <div className="p-5 rounded-2xl bg-white/[0.05] border border-white/15 space-y-1.5">
                <div className="text-xs sm:text-sm uppercase font-bold text-slate-300 tracking-wider font-mono">
                  Monthly Leak Stopped
                </div>
                <div className="font-serif-title text-3xl sm:text-4xl font-bold text-white">
                  {formatINR(monthlyLeakAmount)}
                </div>
                <div className="text-xs sm:text-sm text-teal-300 font-medium">
                  Every 30 days kept in your account
                </div>
              </div>

              {/* Box 2: 1-Year Cumulative Savings */}
              <div className="p-5 rounded-2xl bg-teal-500/20 border border-teal-400/50 space-y-1.5">
                <div className="text-xs sm:text-sm uppercase font-bold text-teal-300 tracking-wider font-mono">
                  1-Year Cashflow Retained
                </div>
                <div className="font-serif-title text-3xl sm:text-4xl font-extrabold text-teal-200">
                  {formatINR(oneYearSavings)}
                </div>
                <div className="text-xs sm:text-sm text-emerald-300 font-bold">
                  {roiMultiplier}x Return on ₹299
                </div>
              </div>

              {/* Box 3: 3-Year Index Compounded */}
              <div className="p-5 rounded-2xl bg-amber-500/20 border border-amber-400/50 space-y-1.5">
                <div className="text-xs sm:text-sm uppercase font-bold text-amber-300 tracking-wider font-mono">
                  3-Yr Compounded Wealth
                </div>
                <div className="font-serif-title text-3xl sm:text-4xl font-extrabold text-amber-300">
                  {formatINR(futureValue3Years)}
                </div>
                <div className="text-xs sm:text-sm text-slate-200 font-medium">
                  If invested at standard 12% SIP
                </div>
              </div>
            </div>

            {/* Bottom conversion strip */}
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-5 border-t border-white/10">
              <div className="text-center sm:text-left space-y-1">
                <div className="text-sm sm:text-base uppercase font-bold tracking-wider text-amber-300">
                  Summary: Invest ₹299 once, retain {formatINR(oneYearSavings)} every year
                </div>
                <div className="text-slate-200 text-xs sm:text-sm flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <span className="flex items-center gap-1.5 text-teal-300 font-semibold">
                    <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Instant Digital Download &amp; Lifetime Access</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Support: medhastone@gmail.com</span>
                  </span>
                </div>
              </div>

              <MagneticButton strength={0.4} maxTilt={8}>
                <a
                  href={SUPERPROFILE_PAYMENT_URL}
                  onClick={() => {
                    trackEvent('click_buy', { source: 'roi_calculator_cta', price: 299, destination: SUPERPROFILE_PAYMENT_URL });
                  }}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#E8871E] via-[#F4932A] to-[#D97706] hover:from-[#C97112] hover:to-[#B45309] text-white font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all cursor-pointer inline-flex items-center justify-center gap-2 border border-amber-300/30"
                >
                  <span>🔥 Secure Your {roiMultiplier}x ROI for ₹299</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
              </MagneticButton>
            </div>
          </div>
        </TiltPhysicsCard>
      </div>
    </section>
  );
}
