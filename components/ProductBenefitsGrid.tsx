'use client';

import React from 'react';
import { 
  Search, 
  Smartphone, 
  FileSpreadsheet, 
  CreditCard, 
  RefreshCcw, 
  Home, 
  Brain, 
  TrendingUp, 
  Target, 
  Coins,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { TiltPhysicsCard } from '@/components/ui/PhysicsInteractive';

export function ProductBenefitsGrid() {
  const benefits = [
    {
      icon: Search,
      title: 'Find hidden money leaks',
      desc: 'Pinpoint invisible micro-drains and quick-commerce splurges before they add up to ₹40,000+ a year.',
      color: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
    },
    {
      icon: Smartphone,
      title: 'Audit UPI/digital spending',
      desc: 'Decouple impulsive 1-click QR scans from your primary salary account with a simple secondary buffer.',
      color: 'bg-teal-500/20 text-teal-300 border-teal-400/40',
    },
    {
      icon: FileSpreadsheet,
      title: 'Perform a salary autopsy',
      desc: 'Diagnose your exact Salary Half-Life and discover where 50% of your paycheck vanished in the first 5 days.',
      color: 'bg-blue-500/20 text-blue-300 border-blue-400/40',
    },
    {
      icon: CreditCard,
      title: 'Understand EMI & debt burden',
      desc: 'Apply the 30% Hard Ceiling rule and Indian EMI Snowball to stop working 10 days a month for banks.',
      color: 'bg-rose-500/20 text-rose-300 border-rose-400/40',
    },
    {
      icon: RefreshCcw,
      title: 'Review recurring expenses',
      desc: 'Eliminate dormant OTT subscriptions, fitness memberships, and app auto-debits that slip under the radar.',
      color: 'bg-purple-500/20 text-purple-300 border-purple-400/40',
    },
    {
      icon: Home,
      title: 'Separate needs, wants & future money',
      desc: 'Partition your income automatically on salary day so fixed rent, daily living, and fun never collide.',
      color: 'bg-indigo-500/20 text-indigo-300 border-indigo-400/40',
    },
    {
      icon: Brain,
      title: 'Understand spending psychology',
      desc: 'Learn why human willpower drops after 10 PM and how dopamine loops trick you into frictionless buying.',
      color: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40',
    },
    {
      icon: TrendingUp,
      title: 'Build a repeatable surplus system',
      desc: 'Move from "whatever is left at the end of the month" to an automated savings protocol that executes on Day 1.',
      color: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
    },
    {
      icon: Target,
      title: 'Set realistic financial boundaries',
      desc: 'Politely and firmly handle social peer pressure, family loan demands, and lifestyle creep without guilt.',
      color: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40',
    },
    {
      icon: Coins,
      title: 'Create an emergency runway',
      desc: 'Calculate your true 6-month survival runway so unforeseen medical or career shocks never derail your life.',
      color: 'bg-teal-500/20 text-teal-300 border-teal-400/40',
    },
  ];

  return (
    <section className="py-16 sm:py-24 border-b border-white/10 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3.5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-white/10 text-teal-300 border border-teal-400/30 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span>Practical Outcomes • Real Control</span>
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            10 Things You Will Accomplish With The Kit
          </h2>
          <p className="text-slate-200 text-base sm:text-lg leading-relaxed">
            No vague lectures on frugality. Only actionable systems built for modern Indian salaried professionals.
          </p>
        </div>

        {/* 10-Item Spacious Grid (2-cols on mobile/tablet, 3-cols on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {benefits.map((item, index) => {
            const Icon = item.icon;
            return (
              <TiltPhysicsCard key={item.title} maxAngle={8} className="rounded-3xl h-full">
                <div
                  className="p-6 sm:p-7 rounded-3xl bg-[#0F1B33] border border-white/15 shadow-xl hover:border-teal-400/80 transition-all duration-200 flex flex-col justify-between group h-full"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${item.color} shadow-xs group-hover:scale-105 transition-transform`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-mono text-amber-300 font-bold px-3 py-1 rounded-lg bg-white/10 border border-white/10">
                        Module 0{index + 1}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="font-serif-title font-bold text-lg sm:text-xl text-white leading-snug">
                        {item.title}
                      </h3>
                    </div>

                    <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans-body">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-white/10 flex items-center gap-2 text-xs sm:text-sm font-semibold text-teal-300">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>Actionable Step-by-Step System</span>
                  </div>
                </div>
              </TiltPhysicsCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
