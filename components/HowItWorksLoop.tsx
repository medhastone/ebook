'use client';

import React from 'react';
import { BookOpen, Search, Eye, SlidersHorizontal, BarChart3, Repeat, Sparkles } from 'lucide-react';
import { TiltPhysicsCard } from '@/components/ui/PhysicsInteractive';

export function HowItWorksLoop() {
  const steps = [
    { label: 'READ', sub: 'The field manual & psychology', icon: BookOpen, color: 'border-blue-400/30 bg-blue-500/10 text-blue-300' },
    { label: 'TRACK', sub: 'Last 30 days of UPI & bank logs', icon: Search, color: 'border-teal-400/30 bg-teal-500/10 text-teal-300' },
    { label: 'DISCOVER', sub: 'Hidden recurring money drains', icon: Eye, color: 'border-amber-400/30 bg-amber-500/10 text-amber-300' },
    { label: 'CHANGE', sub: 'Install 5-bucket sweep rules', icon: SlidersHorizontal, color: 'border-purple-400/30 bg-purple-500/10 text-purple-300' },
    { label: 'REVIEW', sub: '10-minute salary-day checkup', icon: BarChart3, color: 'border-emerald-400/30 bg-emerald-500/10 text-emerald-300' },
    { label: 'REPEAT 🔁', sub: 'Compounding cashflow freedom', icon: Repeat, color: 'border-amber-400/50 bg-amber-500/20 text-amber-200' },
  ];

  return (
    <section className="py-14 sm:py-20 border-b border-white/10 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-10">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-amber-300 border border-white/15 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>The Monthly Reset Loop</span>
        </div>

        {/* Title */}
        <div className="space-y-3 max-w-2xl mx-auto">
          <h2 className="font-serif-title text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
            How It Works: The 6-Step Cashflow Loop
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-sans-body">
            A simple, sustainable cycle designed to work with human psychology, not against it.
          </p>
        </div>

        {/* Desktop Loop Row / Mobile Loop Column with Physics Tilt */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 sm:gap-3 items-stretch justify-center">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <TiltPhysicsCard key={step.label} maxAngle={14} className="rounded-2xl h-full">
                <div className={`p-4 rounded-2xl border ${step.color} shadow-lg text-center space-y-2.5 flex flex-col items-center justify-center h-full transition-all`}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/10 text-inherit shadow-xs border border-white/10">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="font-serif-title font-bold text-sm sm:text-base tracking-wider text-white">
                    {step.label}
                  </div>
                  <div className="text-[11px] text-slate-300 leading-tight">
                    {step.sub}
                  </div>
                </div>
              </TiltPhysicsCard>
            );
          })}
        </div>

        {/* Core Philosophy Banner */}
        <TiltPhysicsCard maxAngle={6} className="rounded-2xl max-w-2xl mx-auto">
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0F1C36] border border-white/15 shadow-xl text-center space-y-2">
            <div className="font-serif-title text-xl sm:text-2xl font-bold text-white leading-snug">
              &ldquo;Awareness first. Rules second. Peace forever.&rdquo;
            </div>
            <p className="text-xs sm:text-sm text-slate-300 font-sans-body max-w-md mx-auto">
              Once you see where every rupee actually goes without judgment, making room for savings feels natural and empowering.
            </p>
          </div>
        </TiltPhysicsCard>
      </div>
    </section>
  );
}
