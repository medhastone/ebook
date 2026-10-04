'use client';

import React from 'react';
import { Hourglass, TrendingUp, Clock, Droplets, ArrowUpRight, Zap } from 'lucide-react';

interface MetricItem {
  id: string;
  name: string;
  shortDesc: string;
  nationalAvg: string;
  targetGoal: string;
  icon: any;
  formula: string;
  realWorldExample: string;
  color: string;
  accentBg: string;
}

const originalMetrics: MetricItem[] = [
  {
    id: 'half-life',
    name: 'Salary Half-Life (SHL)',
    shortDesc: 'The number of days until 50% of your paycheck is gone from your bank account.',
    nationalAvg: '4.8 Days (Metros)',
    targetGoal: '18+ Days',
    icon: Hourglass,
    formula: 'Days elapsed until Bank Balance ≤ 50% of Net Salary',
    realWorldExample: 'If your ₹45,000 salary hits on the 1st and your balance drops to ₹22,500 by the 5th evening, your Salary Half-Life is just 5 days.',
    color: '#E8871E',
    accentBg: 'bg-amber-500/10 border-amber-500/20 text-amber-700',
  },
  {
    id: 'raise-capture',
    name: 'Raise Capture Rate (RCR)',
    shortDesc: 'When you get an appraisal or job switch, how much actually builds your net worth?',
    nationalAvg: '8% Captured (92% lost)',
    targetGoal: '70% Minimum',
    icon: TrendingUp,
    formula: '(Increase in Monthly Investments ÷ Increase in Net Monthly Salary) × 100',
    realWorldExample: 'Got a ₹15,000/mo hike? If your investments only increased by ₹1,500 while rent and dining jumped by ₹13,500, your RCR is a dismal 10%.',
    color: '#2E7D5B',
    accentBg: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-700',
  },
  {
    id: 'hourly-life-cost',
    name: 'Hourly Life Cost (HLC)',
    shortDesc: 'Translating consumer spends into literal hours of sitting in boring office meetings.',
    nationalAvg: 'Ignored by 95%',
    targetGoal: '100% Awareness',
    icon: Clock,
    formula: 'Take-home Monthly Salary ÷ 160 Working Hours',
    realWorldExample: 'Earning ₹40,000/mo = ₹250/hr net. A ₹1,200 weekend pub tab costs 4.8 hours of your life energy. Is that drink worth more than half a working day?',
    color: '#3B82F6',
    accentBg: 'bg-blue-500/10 border-blue-500/20 text-blue-700',
  },
  {
    id: 'leak-score',
    name: 'The Salary Leak Score (SLS)',
    shortDesc: 'The percentage of your salary vanishing into frictionless micropayments without joy.',
    nationalAvg: '24% of Net Pay',
    targetGoal: '< 10%',
    icon: Droplets,
    formula: '(Total Unplanned Delivery + Subscriptions + Impulse Carts ÷ Take-Home) × 100',
    realWorldExample: 'A ₹400 Swiggy here, ₹149 Blinkit there, and 3 OTT apps you forgot to cancel add up to ₹9,800/mo. That is ₹1.17 Lakh lost every single year.',
    color: '#14213D',
    accentBg: 'bg-stone-500/10 border-stone-500/20 text-stone-700',
  },
];

export function OriginalMetrics() {
  return (
    <section className="py-14 sm:py-20 bg-[#FBF9F5] border-b border-stone-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#14213D] text-amber-200 mb-3">
            <Zap className="w-3.5 h-3.5 text-[#E8871E]" />
            <span>Proprietary Frameworks</span>
          </div>
          <h2 className="font-serif-title text-2xl sm:text-3xl md:text-4xl font-bold text-[#14213D] tracking-tight">
            The 4 Original Metrics Introduced in This Book
          </h2>
          <p className="mt-2 text-stone-600 text-sm sm:text-base leading-relaxed">
            Generic Western finance books talk about 401(k)s and cutting coupons. These 4 battle-tested metrics were created specifically for young Indian earners navigating UPI, EMIs, and Indian family realities.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {originalMetrics.map((metric) => {
            const Icon = metric.icon;

            return (
              <div
                key={metric.id}
                className="bg-white rounded-2xl border border-stone-300/80 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                      style={{ backgroundColor: metric.color }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-stone-100 text-stone-600">
                        Avg: {metric.nationalAvg}
                      </span>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Target: {metric.targetGoal}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-serif-title text-xl font-bold text-[#14213D]">
                      {metric.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 mt-1 font-sans-body">
                      {metric.shortDesc}
                    </p>
                  </div>

                  {/* Formula banner */}
                  <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200 font-mono text-[11px] text-stone-800">
                    <span className="text-stone-400 font-sans text-[10px] block uppercase font-bold tracking-wider">Formula:</span>
                    {metric.formula}
                  </div>

                  {/* Real World Example */}
                  <div className="p-3 rounded-xl bg-amber-50/50 border border-amber-200/60 text-xs text-amber-950">
                    <strong className="text-[#14213D]">Real Life:</strong> {metric.realWorldExample}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
