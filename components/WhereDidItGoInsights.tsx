'use client';

import React, { useState } from 'react';
import { 
  Utensils, 
  Smartphone, 
  RefreshCw, 
  Car, 
  ShoppingBag, 
  CreditCard, 
  PartyPopper, 
  Brain, 
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { TiltPhysicsCard } from '@/components/ui/PhysicsInteractive';

interface PatternInsight {
  id: string;
  emoji: string;
  name: string;
  icon: any;
  insight: string;
  takeaway: string;
  color: string;
  borderColor: string;
  tag: string;
}

export function WhereDidItGoInsights() {
  const [selectedId, setSelectedId] = useState<string>('upi');

  const patterns: PatternInsight[] = [
    {
      id: 'food',
      emoji: '🍔',
      name: 'Food & Delivery',
      icon: Utensils,
      insight: 'Late-evening convenience orders bypass the brain’s spending friction when mental energy is depleted after a long workday.',
      takeaway: 'Most food delivery leaks are not hunger decisions; they are tired-brain decisions.',
      color: 'bg-amber-500/15 text-amber-300',
      borderColor: 'border-amber-400/40',
      tag: 'Emotional & Energy Leak',
    },
    {
      id: 'upi',
      emoji: '📲',
      name: 'UPI Quick Scans',
      icon: Smartphone,
      insight: 'Fast payment can make the decision feel smaller than the spending.',
      takeaway: 'Scanning a QR code takes 3 seconds. The psychological pain of parting with cash is reduced to near zero.',
      color: 'bg-teal-500/15 text-teal-300',
      borderColor: 'border-teal-400/40',
      tag: 'Frictionless Tap Illusion',
    },
    {
      id: 'subscriptions',
      emoji: '🔄',
      name: 'Subscriptions',
      icon: RefreshCw,
      insight: 'Recurring payments are easy to forget because you don\'t make the decision every month.',
      takeaway: 'Auto-debits run silently in the background long after you have stopped using the service.',
      color: 'bg-purple-500/15 text-purple-300',
      borderColor: 'border-purple-400/40',
      tag: 'Passive Auto-Debit',
    },
    {
      id: 'convenience',
      emoji: '🚕',
      name: 'Convenience Apps',
      icon: Car,
      insight: '10-minute grocery apps and peak-hour cab surges create small ₹90–₹250 transactions that feel negligible on day 1.',
      takeaway: 'Over 30 days, 25 convenience taps add up to ₹4,500+ without buying anything memorable.',
      color: 'bg-blue-500/15 text-blue-300',
      borderColor: 'border-blue-400/40',
      tag: 'Micro-Transaction Creep',
    },
    {
      id: 'shopping',
      emoji: '🛍️',
      name: 'Online Shopping',
      icon: ShoppingBag,
      insight: 'Flash sales, festival discounts, and recommendation algorithms create artificial urgency for items you never planned to buy.',
      takeaway: 'Buying something on sale that you don’t strictly need is still 100% money spent.',
      color: 'bg-rose-500/15 text-rose-300',
      borderColor: 'border-rose-400/40',
      tag: 'Trigger-Based Impulses',
    },
    {
      id: 'emis',
      emoji: '💳',
      name: 'EMIs & BNPL',
      icon: CreditCard,
      insight: 'Breaking large purchases into "only ₹1,299/mo" disguises the multi-year claim on your future paychecks.',
      takeaway: 'When 4 different EMIs stack up, 25% to 40% of next month’s salary is spent before you even wake up on salary day.',
      color: 'bg-red-500/15 text-rose-300',
      borderColor: 'border-rose-400/40',
      tag: 'Future Income Trap',
    },
    {
      id: 'lifestyle',
      emoji: '🎉',
      name: 'Lifestyle & Social',
      icon: PartyPopper,
      insight: 'When income rises, spending can quietly rise with it.',
      takeaway: 'Upgrading restaurants, weekend trips, and peer habits happens automatically unless an intentional barrier is built.',
      color: 'bg-emerald-500/15 text-emerald-300',
      borderColor: 'border-emerald-400/40',
      tag: 'Lifestyle Inflation',
    },
  ];

  const activePattern = patterns.find((p) => p.id === selectedId) || patterns[1];

  return (
    <section id="where-did-it-go" className="py-16 sm:py-24 border-b border-white/10 relative text-white scroll-mt-14">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3.5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-white/10 text-teal-300 border border-teal-400/30 backdrop-blur-md">
            <Brain className="w-4 h-4 text-teal-400" />
            <span>Interactive Psychology Insights</span>
          </div>

          <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Where Did It Go? <br />
            <span className="text-amber-300">Click a Category to See Why</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-200 font-sans-body leading-relaxed">
            Money leaks are rarely about mathematical failure. They are subtle behavioural patterns built into modern digital interfaces.
          </p>
        </div>

        {/* 7 Interactive Pattern Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5">
          {patterns.map((item) => {
            const isSelected = item.id === selectedId;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                type="button"
                className={`px-4 sm:px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-[#E8871E] text-slate-950 border-amber-300 shadow-[0_8px_20px_rgba(232,135,30,0.35)] scale-105'
                    : 'bg-[#0F1C36] text-slate-200 hover:text-white hover:bg-white/10 border-white/15'
                }`}
              >
                <span>{item.emoji}</span>
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Insight Reveal Box */}
        <div className="max-w-3xl mx-auto">
          <TiltPhysicsCard maxAngle={4} enableGlare={false} className="rounded-3xl">
            <div className={`p-6 sm:p-9 rounded-3xl bg-[#0F1B33] border ${activePattern.borderColor} shadow-2xl space-y-6 transition-all duration-200`}>
              
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{activePattern.emoji}</span>
                  <div>
                    <h3 className="font-serif-title text-xl sm:text-2xl font-bold text-white">
                      {activePattern.name}
                    </h3>
                    <span className="text-xs font-mono text-amber-300 font-semibold">
                      {activePattern.tag}
                    </span>
                  </div>
                </div>

                <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-slate-300 font-medium hidden sm:inline">
                  Click to inspect other leaks ↑
                </span>
              </div>

              {/* Exact Insight Quote */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.04] border border-white/10 space-y-3">
                <div className="text-xs uppercase font-bold tracking-wider text-teal-300 flex items-center gap-1.5 font-mono">
                  <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                  <span>The Psychological Insight</span>
                </div>
                <div className="font-serif-title text-lg sm:text-xl font-bold text-slate-100 leading-snug">
                  &ldquo;{activePattern.insight}&rdquo;
                </div>
              </div>

              {/* Takeaway & Curiosity Hook */}
              <div className="space-y-3 text-sm sm:text-base text-slate-200 leading-relaxed font-sans-body">
                <p>
                  <strong className="text-white">Why it happens:</strong> {activePattern.takeaway}
                </p>
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-400/30 text-amber-200 font-medium text-xs sm:text-sm flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span><strong>Recognize this pattern in your own routine?</strong> The book provides copy-paste friction rules to stop it on Day 1.</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 italic pt-1 border-t border-white/10">
                *Behavioural note: These insights describe common digital payment tendencies documented in behavioural research, not universal claims for every individual.
              </div>
            </div>
          </TiltPhysicsCard>
        </div>
      </div>
    </section>
  );
}
