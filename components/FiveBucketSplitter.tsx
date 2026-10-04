'use client';

import React, { useState } from 'react';
import { PieChart, RotateCcw, ShieldCheck, Heart, TrendingUp, Home, CreditCard } from 'lucide-react';
import { formatINR } from '@/lib/formatters';
import { TiltPhysicsCard, MagneticButton } from '@/components/ui/PhysicsInteractive';

interface BucketItem {
  id: string;
  name: string;
  category: string;
  defaultPercent: number;
  color: string;
  textColor: string;
  icon: any;
  description: string;
}

const defaultBuckets: BucketItem[] = [
  {
    id: 'live',
    name: '1. Live',
    category: 'Essential Living',
    defaultPercent: 50,
    color: '#0D9488',
    textColor: 'text-teal-300',
    icon: Home,
    description: 'Rent, society maintenance, groceries, wifi, electricity & commute.',
  },
  {
    id: 'pay',
    name: '2. Pay',
    category: 'Debt & EMIs',
    defaultPercent: 15,
    color: '#E8871E',
    textColor: 'text-amber-400',
    icon: CreditCard,
    description: 'Phone/vehicle EMIs, personal loans, credit card balances.',
  },
  {
    id: 'protect',
    name: '3. Protect',
    category: 'Safety Net',
    defaultPercent: 10,
    color: '#10B981',
    textColor: 'text-emerald-400',
    icon: ShieldCheck,
    description: 'Emergency buffer fund, standalone health & pure term insurance.',
  },
  {
    id: 'build',
    name: '4. Build',
    category: 'Future Wealth',
    defaultPercent: 15,
    color: '#3B82F6',
    textColor: 'text-blue-400',
    icon: TrendingUp,
    description: 'Index mutual funds (Nifty 50), EPF/PPF, gold, long-term SIPs.',
  },
  {
    id: 'enjoy',
    name: '5. Enjoy',
    category: 'Guilt-Free Life',
    defaultPercent: 10,
    color: '#A855F7',
    textColor: 'text-purple-400',
    icon: Heart,
    description: 'Dining out, coffee, weekend trips, gaming, movies & guilt-free treats.',
  },
];

export function FiveBucketSplitter() {
  const [salary, setSalary] = useState<number>(50000);
  const [percentages, setPercentages] = useState<Record<string, number>>({
    live: 50,
    pay: 15,
    protect: 10,
    build: 15,
    enjoy: 10,
  });

  const handleSliderChange = (id: string, value: number) => {
    setPercentages((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const resetToRecommended = () => {
    setPercentages({
      live: 50,
      pay: 15,
      protect: 10,
      build: 15,
      enjoy: 10,
    });
  };

  const totalPercentage = Object.values(percentages).reduce((a, b) => a + b, 0);

  // SVG Donut calculation
  const radius = 60;
  const circumference = 2 * Math.PI * radius;

  const segments = defaultBuckets.map((b, idx) => {
    const pct = percentages[b.id] || 0;
    const accumulated = defaultBuckets
      .slice(0, idx)
      .reduce((sum, item) => sum + (percentages[item.id] || 0), 0);
    const strokeDasharray = `${(pct / 100) * circumference} ${circumference}`;
    const strokeDashoffset = -((accumulated / 100) * circumference);
    return {
      ...b,
      strokeDasharray,
      strokeDashoffset,
    };
  });

  return (
    <section className="py-16 sm:py-24 border-b border-white/10 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Tool Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-white/10 text-amber-300 border border-white/15 backdrop-blur-md mb-4">
            <PieChart className="w-4 h-4 text-amber-400" />
            <span>Interactive Tool 3 of 3</span>
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            The 5-Bucket Salary Splitter
          </h2>
          <p className="mt-4 text-slate-200 text-base sm:text-lg leading-relaxed">
            Stop putting all your money into one single bank account. Enter your salary to see how the automated 5-bucket system allocates every single rupee.
          </p>
        </div>

        {/* Card */}
        <TiltPhysicsCard maxAngle={4} enableGlare={false} className="rounded-3xl">
          <div className="bg-[#0F1B33] rounded-3xl border border-white/15 p-6 sm:p-9 shadow-2xl space-y-7">
            {/* Top salary input & quick reset */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-5 pb-6 border-b border-white/10">
              <div className="flex-1 max-w-md space-y-1.5">
                <label className="text-sm font-bold text-slate-200 uppercase tracking-wider block">
                  Enter Your Take-Home Salary:
                </label>
                <div className="flex items-center gap-3">
                  <span className="font-serif-title text-2xl sm:text-3xl font-bold text-amber-300">
                    {formatINR(salary)}
                  </span>
                  <input
                    type="range"
                    min={15000}
                    max={150000}
                    step={2500}
                    value={salary}
                    onChange={(e) => setSalary(Number(e.target.value))}
                    className="flex-1 h-2.5 bg-white/20 rounded-lg appearance-none cursor-pointer ml-3 accent-[#E8871E]"
                  />
                </div>
              </div>

              <MagneticButton strength={0.25}>
                <button
                  onClick={resetToRecommended}
                  type="button"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-slate-100 text-xs sm:text-sm font-semibold transition-all cursor-pointer border border-white/20"
                >
                  <RotateCcw className="w-4 h-4 text-amber-400" />
                  <span>Reset to Recommended 50:15:10:15:10</span>
                </button>
              </MagneticButton>
            </div>

            {/* Interactive Donut & Sliders Layout */}
            <div className="pt-2 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left: Donut Chart Visualization (5 cols) */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center p-4">
                <div className="relative w-60 h-60 sm:w-68 sm:h-68 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 160 160">
                    <circle
                      cx="80"
                      cy="80"
                      r={radius}
                      stroke="rgba(255,255,255,0.08)"
                      strokeWidth="20"
                      fill="transparent"
                    />
                    {segments.map((seg) => (
                      <circle
                        key={seg.id}
                        cx="80"
                        cy="80"
                        r={radius}
                        stroke={seg.color}
                        strokeWidth="20"
                        strokeDasharray={seg.strokeDasharray}
                        strokeDashoffset={seg.strokeDashoffset}
                        fill="transparent"
                        className="transition-all duration-300"
                      />
                    ))}
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                    <span className="text-xs text-slate-300 uppercase font-bold tracking-wider">
                      Allocated
                    </span>
                    <span className={`font-serif-title text-4xl font-black ${
                      totalPercentage === 100 ? 'text-emerald-400' : 'text-amber-400'
                    }`}>
                      {totalPercentage}%
                    </span>
                    <span className="text-xs text-slate-300 font-mono font-medium">
                      {totalPercentage === 100 ? 'Balanced' : `${totalPercentage - 100}% off`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: 5 Buckets Controls (7 cols) */}
              <div className="lg:col-span-7 space-y-4">
                {defaultBuckets.map((b) => {
                  const Icon = b.icon;
                  const pct = percentages[b.id] || 0;
                  const amount = Math.round((salary * pct) / 100);

                  return (
                    <div
                      key={b.id}
                      className="p-4 sm:p-5 rounded-2xl bg-white/[0.05] border border-white/15 transition-all space-y-2.5 hover:border-white/25 shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-8 h-8 rounded-xl flex items-center justify-center text-white shrink-0"
                            style={{ backgroundColor: b.color }}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="font-bold text-sm sm:text-base text-white">
                              {b.name}
                            </span>
                            <span className="text-xs text-slate-300 ml-2 font-medium">
                              ({b.category})
                            </span>
                          </div>
                        </div>

                        <div className="flex items-baseline gap-2.5">
                          <span className="font-serif-title font-bold text-base sm:text-lg text-amber-300">
                            {formatINR(amount)}
                          </span>
                          <span className="font-mono text-sm font-bold text-slate-200 min-w-[38px] text-right">
                            {pct}%
                          </span>
                        </div>
                      </div>

                      <input
                        type="range"
                        min={0}
                        max={80}
                        step={1}
                        value={pct}
                        onChange={(e) => handleSliderChange(b.id, Number(e.target.value))}
                        className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
                        style={{ accentColor: b.color }}
                      />

                      <div className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans-body">
                        {b.description}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </TiltPhysicsCard>
      </div>
    </section>
  );
}
