'use client';

import React, { useState, useEffect } from 'react';
import { AlertCircle, Calendar, Play, RotateCcw, Bell } from 'lucide-react';
import { formatINR } from '@/lib/formatters';
import { TiltPhysicsCard, MagneticButton } from '@/components/ui/PhysicsInteractive';

interface DayEvent {
  day: number;
  label: string;
  expense: number;
  description: string;
  category: string;
  emotion: string;
  notification: string;
}

const timelineData: Record<number, DayEvent[]> = {
  30000: [
    {
      day: 1,
      label: 'Salary Day (1st)',
      expense: 0,
      description: 'Monthly salary credited to HDFC / ICICI bank account.',
      category: 'Credit',
      emotion: '😎 "I am rich! Chalo party karte hain!"',
      notification: 'HDFC: ₹30,000.00 credited to A/c XX4892. Avail Bal: ₹30,140.',
    },
    {
      day: 2,
      label: 'Day 2 (2nd)',
      expense: 11500,
      description: 'Rent transfer to landlord + society maintenance.',
      category: 'Fixed Essential',
      emotion: '😐 "Thik hai, rent toh dena hi tha."',
      notification: 'UPI: ₹11,500 paid to Rakesh Landlord. Bal: ₹18,640.',
    },
    {
      day: 3,
      label: 'Day 3 (3rd)',
      expense: 5800,
      description: 'OnePlus phone No-Cost EMI + Credit Card minimum balance auto-debit.',
      category: 'Debt / EMI',
      emotion: '😟 "Arey yaar, EMI auto-debit hit ho gaya."',
      notification: 'Auto-Debit: ₹5,800 debited for Consumer Loan. Bal: ₹12,840.',
    },
    {
      day: 4,
      label: 'Day 4 (4th)',
      expense: 2600,
      description: 'Blinkit, Zepto, monthly milk basket & daily essentials.',
      category: 'Quick Commerce',
      emotion: '🛒 "Bas thoda ration aur shampoo manga liya."',
      notification: 'UPI: ₹2,600 paid via Blinkit & Zepto. Bal: ₹10,240.',
    },
    {
      day: 5,
      label: 'Day 5 (5th)',
      expense: 2740,
      description: 'Friday team dinner + Swiggy order + Uber ride home.',
      category: 'Weekend Impulse',
      emotion: '💸 "Wait... why is my balance only ₹7,500 already?!"',
      notification: 'UPI: ₹2,740 debited. Avail Bal: ₹7,500.',
    },
    {
      day: 15,
      label: 'Day 15 (Mid-Month)',
      expense: 4200,
      description: 'Fuel, casual tea/snacks, OTT auto-renewals, Amazon delivery.',
      category: 'Micro Leaks',
      emotion: '😰 "Where did ₹4,000 go? Only ₹3,300 left for next 15 days."',
      notification: 'Low balance warning: ₹3,300 available.',
    },
    {
      day: 28,
      label: 'Day 28 (The Stretch)',
      expense: 2900,
      description: 'Credit card used for weekend groceries. Debt cycle continues.',
      category: 'Credit Card Stretch',
      emotion: '🛑 "Trapped in the credit card revolving loop again."',
      notification: 'Credit Card: ₹2,900 charged at Supermarket.',
    },
  ],
  50000: [
    {
      day: 1,
      label: 'Salary Day (1st)',
      expense: 0,
      description: '₹50,000 credited to bank account.',
      category: 'Credit',
      emotion: '😎 "Good paycheck! Let us upgrade living standards."',
      notification: 'Bank: ₹50,000.00 credited. Avail Bal: ₹50,420.',
    },
    {
      day: 2,
      label: 'Day 2 (2nd)',
      expense: 19500,
      description: '2BHK rent in Bangalore/Pune/NCR + maintenance fee.',
      category: 'Fixed Housing',
      emotion: '😐 "Major expense sorted. Still ₹30,000+ left."',
      notification: 'UPI: ₹19,500 paid to Housing Owner. Bal: ₹30,920.',
    },
    {
      day: 3,
      label: 'Day 3 (3rd)',
      expense: 12200,
      description: 'Car EMI + iPhone 15 No-Cost EMI + Personal Loan.',
      category: 'EMIs & Loans',
      emotion: '😟 "EMIs eat up 25% of my salary every 3rd day."',
      notification: 'Auto-Debit: ₹12,200 debited for EMIs. Bal: ₹18,720.',
    },
    {
      day: 4,
      label: 'Day 4 (4th)',
      expense: 4300,
      description: 'Nature Basket, Instamart, Zepto quick-groceries.',
      category: 'Quick Commerce',
      emotion: '🛒 "Convenience fees and ₹500 instant carts add up fast."',
      notification: 'UPI: ₹4,300 paid across 6 quick-commerce apps.',
    },
    {
      day: 5,
      label: 'Day 5 (5th)',
      expense: 4150,
      description: 'Saturday craft beer cafe + weekend brunch with friends.',
      category: 'Weekend Lifestyle',
      emotion: '💸 "Only ₹10,000 left and 25 days still to go?!"',
      notification: 'UPI: ₹4,150 debited at Microbrewery & Dining.',
    },
    {
      day: 15,
      label: 'Day 15 (Mid-Month)',
      expense: 6500,
      description: 'Gym trainer subscription, Zara shirt on sale, fuel top-up.',
      category: 'Lifestyle Leaks',
      emotion: '😰 "Account dropped below ₹3,500. Salary vanish syndrome."',
      notification: 'Account Alert: Balance is ₹3,350.',
    },
    {
      day: 28,
      label: 'Day 28 (Credit Card Trap)',
      expense: 5200,
      description: 'Electricity bill & flight ticket booked on credit card.',
      category: 'Credit Roll',
      emotion: '🛑 "Borrowing from next month to survive this month."',
      notification: 'Credit Card Limit: 78% utilized.',
    },
  ],
};

export function SalaryShrinkProblem() {
  const [selectedSalary, setSelectedSalary] = useState<number>(30000);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(4); // Default to Day 5 shock
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const steps = timelineData[selectedSalary] || timelineData[30000];
  const currentStep = steps[currentStepIndex] || steps[0];

  // Calculate remaining balance dynamically
  const spentSoFar = steps
    .slice(0, currentStepIndex + 1)
    .reduce((acc, curr) => acc + curr.expense, 0);
  const remainingBalance = Math.max(0, selectedSalary - spentSoFar);
  const percentGone = Math.min(100, Math.round((spentSoFar / selectedSalary) * 100));

  // Auto-play simulation effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1600);
    }
    return () => clearInterval(timer);
  }, [isPlaying, steps.length]);

  return (
    <section className="py-16 sm:py-24 border-b border-white/10 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-rose-500/20 text-rose-300 border border-rose-400/40 mb-4 backdrop-blur-md">
            <AlertCircle className="w-4 h-4" />
            <span>The Silent Cashflow Killer</span>
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            The 5-Day Vanishing Act:{' '}
            <span className="text-amber-400">Where Your Paycheck Actually Goes</span>
          </h2>
          <p className="mt-4 text-slate-200 text-base sm:text-lg leading-relaxed">
            You work 30 hard days for your salary. But watch what happens to a{' '}
            <span className="font-semibold text-white">{formatINR(selectedSalary)}</span> paycheck before the first week of the month even ends.
          </p>

          {/* Salary Selector Toggle */}
          <div className="mt-6 inline-flex items-center p-1.5 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md text-sm font-semibold">
            <MagneticButton strength={0.2} maxTilt={4}>
              <button
                onClick={() => {
                  setSelectedSalary(30000);
                  setCurrentStepIndex(4);
                }}
                type="button"
                className={`px-4 sm:px-5 py-2 rounded-lg transition-all cursor-pointer ${
                  selectedSalary === 30000
                    ? 'bg-[#E8871E] text-white shadow-md font-bold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                ₹30,000 Profile (Junior/Mid)
              </button>
            </MagneticButton>
            <MagneticButton strength={0.2} maxTilt={4}>
              <button
                onClick={() => {
                  setSelectedSalary(50000);
                  setCurrentStepIndex(4);
                }}
                type="button"
                className={`px-4 sm:px-5 py-2 rounded-lg transition-all cursor-pointer ${
                  selectedSalary === 50000
                    ? 'bg-[#E8871E] text-white shadow-md font-bold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                ₹50,000 Profile (Mid/Senior)
              </button>
            </MagneticButton>
          </div>
        </div>

        {/* Interactive Shrink Simulation Box */}
        <TiltPhysicsCard maxAngle={4} enableGlare={false} className="rounded-3xl">
          <div className="bg-[#0F1B33] border border-white/15 shadow-2xl rounded-3xl p-6 sm:p-9 space-y-7">
            {/* Top Status Banner with Punchy Caption */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm uppercase tracking-wider font-bold text-amber-400">
                    {currentStep.label}
                  </span>
                  <span className="text-sm text-slate-500">•</span>
                  <span className="text-xs sm:text-sm font-medium text-slate-300">
                    Step {currentStepIndex + 1} of {steps.length}
                  </span>
                </div>
                <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-white mt-1">
                  {currentStepIndex >= 4 ? (
                    <span className="text-rose-400 font-bold">
                      &ldquo;Half gone by day 5.&rdquo;
                    </span>
                  ) : (
                    <span>Salary Depletion in Progress</span>
                  )}
                </h3>
              </div>

              {/* Quick Playback controls */}
              <div className="flex items-center gap-2.5">
                <MagneticButton strength={0.25} maxTilt={6}>
                  <button
                    onClick={() => {
                      if (currentStepIndex >= steps.length - 1) {
                        setCurrentStepIndex(0);
                      }
                      setIsPlaying(!isPlaying);
                    }}
                    type="button"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/15 border border-white/20 text-white text-xs sm:text-sm font-semibold hover:border-amber-400/50 shadow-xs transition-all cursor-pointer backdrop-blur-md"
                  >
                    {isPlaying ? (
                      <span>Pause</span>
                    ) : (
                      <>
                        <Play className="w-4 h-4 text-amber-400 fill-current" />
                        <span>Watch Day-by-Day Drain</span>
                      </>
                    )}
                  </button>
                </MagneticButton>

                <MagneticButton strength={0.2} maxTilt={6}>
                  <button
                    onClick={() => {
                      setCurrentStepIndex(0);
                      setIsPlaying(false);
                    }}
                    type="button"
                    title="Reset simulation"
                    className="p-2.5 rounded-xl bg-white/15 border border-white/20 text-slate-200 hover:text-white transition-all cursor-pointer backdrop-blur-md"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </MagneticButton>
              </div>
            </div>

            {/* Balance Bar & Metrics */}
            <div className="py-2">
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2.5">
                <span className="text-sm sm:text-base font-semibold text-slate-200">
                  Bank Balance Remaining:
                </span>
                <div className="flex items-baseline gap-2.5">
                  <span className={`font-serif-title text-3xl sm:text-4xl md:text-5xl font-bold ${
                    remainingBalance <= selectedSalary * 0.25 ? 'text-rose-400' : 'text-amber-300'
                  }`}>
                    {formatINR(remainingBalance)}
                  </span>
                  <span className="text-sm text-slate-300 font-medium">
                    ({percentGone}% drained)
                  </span>
                </div>
              </div>

              {/* Dynamic Progress Meter */}
              <div className="w-full h-5 bg-white/10 rounded-full overflow-hidden p-0.5 relative border border-white/15">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    percentGone > 65
                      ? 'bg-gradient-to-r from-[#E8871E] to-rose-500'
                      : percentGone > 35
                      ? 'bg-gradient-to-r from-emerald-500 to-[#E8871E]'
                      : 'bg-emerald-500'
                  }`}
                  style={{ width: `${Math.max(4, 100 - percentGone)}%` }}
                />
              </div>

              {/* Caption callout at Day 5 */}
              {currentStepIndex === 4 && (
                <div className="mt-4 p-3.5 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-between text-sm text-amber-100 font-medium backdrop-blur-md">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400 animate-ping" />
                    <span>
                      <strong className="text-amber-300">Reality Check:</strong> Over 75% of your income vanished in the first 120 hours of the month.
                    </span>
                  </div>
                  <span className="hidden sm:inline-block font-bold text-rose-300">
                    Half gone by day 5.
                  </span>
                </div>
              )}
            </div>

            {/* Interactive Steps Scrubber */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
              {steps.map((st, idx) => {
                const isSelected = idx === currentStepIndex;
                const isPast = idx <= currentStepIndex;
                return (
                  <button
                    key={st.day}
                    onClick={() => {
                      setCurrentStepIndex(idx);
                      setIsPlaying(false);
                    }}
                    type="button"
                    className={`p-3.5 rounded-xl text-left transition-all border cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-br from-[#E8871E] to-[#C97112] text-white border-amber-400 shadow-lg transform -translate-y-1'
                        : isPast
                        ? 'bg-white/10 border-white/20 text-slate-100 hover:border-amber-400/50'
                        : 'bg-white/[0.03] border-dashed border-white/10 text-slate-400'
                    }`}
                  >
                    <div className="text-xs uppercase font-bold tracking-wider opacity-85">
                      Day {st.day}
                    </div>
                    <div className="text-sm font-semibold truncate mt-1">
                      {st.category}
                    </div>
                    <div className={`text-xs sm:text-sm font-semibold mt-1.5 ${isSelected ? 'text-amber-100' : 'text-slate-300'}`}>
                      {st.expense > 0 ? `-${formatINR(st.expense)}` : '+Salary'}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bank SMS Card Mockup */}
            <div className="bg-white/[0.07] rounded-2xl border border-white/15 p-5 sm:p-6 shadow-lg backdrop-blur-md">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5 text-sm font-bold text-white">
                  <div className="w-8 h-8 rounded-full bg-amber-500/25 text-amber-300 flex items-center justify-center border border-amber-400/40">
                    <Bell className="w-4 h-4" />
                  </div>
                  <div>
                    <span>Bank SMS Alert</span>
                    <div className="text-xs text-slate-300 font-normal">Real-time debits from your salary</div>
                  </div>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-white/15 text-slate-200 font-medium border border-white/10">
                  {currentStep.label}
                </span>
              </div>

              <div className="mt-3.5 p-3.5 rounded-xl bg-black/40 border border-white/15 font-mono text-xs sm:text-sm text-amber-300 font-medium">
                {currentStep.notification}
              </div>

              <div className="mt-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm text-slate-200">
                <span className="italic font-medium text-amber-200">{currentStep.emotion}</span>
                <span className="text-xs sm:text-sm text-slate-300">{currentStep.description}</span>
              </div>
            </div>

            {/* Bottom realization takeaway */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#E8871E]/20 border border-amber-400/40 text-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 backdrop-blur-md">
              <div className="text-sm sm:text-base leading-relaxed">
                <strong className="text-amber-300">Why does this happen?</strong> You are trying to budget with willpower instead of an automated 5-bucket system. In Chapter 2, we rebuild your Salary Day 1-5 so your balance stays healthy until the 30th.
              </div>
            </div>
          </div>
        </TiltPhysicsCard>
      </div>
    </section>
  );
}
