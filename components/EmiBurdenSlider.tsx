'use client';

import React, { useState } from 'react';
import { CreditCard, CheckCircle2, ShieldAlert, ArrowRight, Info } from 'lucide-react';
import { formatINR } from '@/lib/formatters';
import { TiltPhysicsCard } from '@/components/ui/PhysicsInteractive';

export function EmiBurdenSlider() {
  const [salary, setSalary] = useState<number>(45000);
  const [fixedEmis, setFixedEmis] = useState<number>(12000);
  const [cardPayments, setCardPayments] = useState<number>(4500);

  const totalDebt = fixedEmis + cardPayments;
  const emiRatio = salary > 0 ? Math.min(100, Math.round((totalDebt / salary) * 100)) : 0;

  const getStatus = (ratio: number) => {
    if (ratio <= 20) {
      return {
        zone: 'Safe & Flexible Zone',
        color: 'text-emerald-300 bg-emerald-500/15 border-emerald-400/30',
        barClass: 'bg-emerald-400',
        advice: 'You have healthy breathing room. Total debt is well below the 30% ceiling. Your priority should be building an emergency buffer and boosting SIPs.',
      };
    } else if (ratio <= 35) {
      return {
        zone: 'Caution & Squeeze Zone',
        color: 'text-amber-300 bg-amber-500/15 border-amber-400/30',
        barClass: 'bg-[#E8871E]',
        advice: 'You are near or crossing the 30% Hard Ceiling. Every month, over 10 working days belong entirely to the bank. Freeze new BNPL purchases immediately.',
      };
    } else {
      return {
        zone: 'Danger Zone (Debt Spiral Alert)',
        color: 'text-rose-300 bg-rose-500/15 border-rose-400/30',
        barClass: 'bg-rose-500',
        advice: 'Critical: Over a third of your paycheck is committed before you wake up. A single medical emergency or salary delay will push you into borrowing to pay loans.',
      };
    }
  };

  const status = getStatus(emiRatio);

  return (
    <section className="py-14 sm:py-20 border-b border-white/10 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Tool Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-amber-300 border border-white/15 backdrop-blur-md mb-3">
            <CreditCard className="w-3.5 h-3.5 text-amber-400" />
            <span>Interactive Tool 2 of 3</span>
          </div>
          <h2 className="font-serif-title text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
            The EMI Burden &amp; Debt-to-Income Gauge
          </h2>
          <p className="mt-2 text-slate-300 text-sm sm:text-base leading-relaxed">
            Are your monthly EMIs silently choking your freedom? Check where you sit on the Indian 30% Hard Ceiling Rule.
          </p>
        </div>

        {/* Card Container with TiltPhysicsCard */}
        <TiltPhysicsCard maxAngle={5} enableGlare={false} className="rounded-3xl">
          <div className="bg-[#0F1C36] rounded-3xl border border-white/10 p-6 sm:p-8 shadow-2xl space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <label htmlFor="emi-calc-salary" className="text-xs font-bold text-white">Monthly Take-Home</label>
                  <span className="font-mono text-sm font-bold text-amber-300">{formatINR(salary)}</span>
                </div>
                <input
                  id="emi-calc-salary"
                  type="range"
                  min={20000}
                  max={200000}
                  step={2500}
                  value={salary}
                  onChange={(e) => setSalary(Number(e.target.value))}
                  className="w-full h-2 bg-white/15 rounded-lg appearance-none cursor-pointer accent-[#E8871E]"
                />
              </div>

              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <label htmlFor="emi-calc-fixed" className="text-xs font-bold text-white">Fixed EMIs (Phone/Car/Personal)</label>
                  <span className="font-mono text-sm font-bold text-rose-300">{formatINR(fixedEmis)}</span>
                </div>
                <input
                  id="emi-calc-fixed"
                  type="range"
                  min={0}
                  max={80000}
                  step={1000}
                  value={fixedEmis}
                  onChange={(e) => setFixedEmis(Number(e.target.value))}
                  className="w-full h-2 bg-white/15 rounded-lg appearance-none cursor-pointer accent-rose-400"
                />
              </div>

              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <label htmlFor="emi-calc-card" className="text-xs font-bold text-white">Credit Card Minimum / Revolving</label>
                  <span className="font-mono text-sm font-bold text-rose-300">{formatINR(cardPayments)}</span>
                </div>
                <input
                  id="emi-calc-card"
                  type="range"
                  min={0}
                  max={50000}
                  step={500}
                  value={cardPayments}
                  onChange={(e) => setCardPayments(Number(e.target.value))}
                  className="w-full h-2 bg-white/15 rounded-lg appearance-none cursor-pointer accent-rose-400"
                />
              </div>
            </div>

            {/* Gauge Display */}
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="space-y-1">
                  <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Total Committed Debt:
                  </div>
                  <div className="font-serif-title text-2xl font-bold text-white">
                    {formatINR(totalDebt)} / month
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-[11px] text-slate-400">Debt-to-Income Ratio</div>
                    <div className="font-serif-title text-3xl font-extrabold text-amber-300">
                      {emiRatio}%
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${status.color}`}>
                    {status.zone}
                  </span>
                </div>
              </div>

              {/* Progress Bar with 30% Ceiling Indicator */}
              <div className="relative pt-4">
                <div className="w-full h-3.5 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/10">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${status.barClass}`}
                    style={{ width: `${Math.min(100, emiRatio)}%` }}
                  />
                </div>
                {/* 30% Ceiling Marker */}
                <div className="absolute top-0 left-[30%] -translate-x-1/2 flex flex-col items-center">
                  <span className="text-[10px] font-mono font-bold text-amber-300 bg-black/60 px-1.5 py-0.5 rounded border border-amber-400/30">
                    30% Max Ceiling
                  </span>
                  <div className="w-0.5 h-6 bg-amber-400/80 mt-0.5" />
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed pt-2">
                {status.advice}
              </p>
            </div>
          </div>
        </TiltPhysicsCard>
      </div>
    </section>
  );
}
