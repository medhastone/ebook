'use client';

import React, { useState } from 'react';
import { 
  BookOpen, 
  ArrowRight, 
  Sparkles, 
  Search, 
  Smartphone, 
  TrendingDown, 
  PieChart, 
  CreditCard, 
  ShieldAlert, 
  Target, 
  Flame, 
  CalendarCheck,
  Eye
} from 'lucide-react';
import { TiltPhysicsCard } from '@/components/ui/PhysicsInteractive';

interface ChapterModule {
  id: number;
  title: string;
  icon: any;
  pages: string;
  keyIdea: string;
  actionableStep: string;
  color: string;
}

interface EbookExperienceShowcaseProps {
  onOpenPreview: () => void;
}

export function EbookExperienceShowcase({ onOpenPreview }: EbookExperienceShowcaseProps) {
  const [selectedModule, setSelectedModule] = useState<number>(1);

  const modules: ChapterModule[] = [
    {
      id: 1,
      title: 'Salary Autopsy',
      icon: Search,
      pages: 'Chapter 2 • pp. 12–14',
      keyIdea: 'Diagnose your exact Salary Half-Life and determine which day 50% of your paycheck leaves your account.',
      actionableStep: '30-minute bank statement scan protocol to map your true fixed outflow vs invisible micro-drains.',
      color: 'border-teal-400/40 bg-teal-500/10 text-teal-300',
    },
    {
      id: 2,
      title: 'UPI & Digital Audit',
      icon: Smartphone,
      pages: 'Chapter 4 • pp. 17–18',
      keyIdea: 'Fast payment removes the sensory pain of spending. Decouple your daily QR scans from your main salary account.',
      actionableStep: 'Install the secondary digital wallet buffer to restrict daily contactless micro-splurges.',
      color: 'border-amber-400/40 bg-amber-500/10 text-amber-300',
    },
    {
      id: 3,
      title: 'Money Leak Finder',
      icon: TrendingDown,
      pages: 'Chapter 3 • pp. 15–16',
      keyIdea: 'The ₹100 problem: small ₹89 to ₹350 quick-commerce carts quietly drain ₹45,000+ a year.',
      actionableStep: 'Apply the 48-Hour Cart Cool-Off rule and auto-debit purge checklist.',
      color: 'border-rose-400/40 bg-rose-500/10 text-rose-300',
    },
    {
      id: 4,
      title: '5-Bucket Architecture',
      icon: PieChart,
      pages: 'Chapter 7 • pp. 23–24',
      keyIdea: 'Partition income automatically on salary day: Live (50%), Pay (15%), Protect (10%), Build (15%), Enjoy (10%).',
      actionableStep: 'Automate standing orders so every rupee is assigned a job before you wake up on Day 1.',
      color: 'border-blue-400/40 bg-blue-500/10 text-blue-300',
    },
    {
      id: 5,
      title: 'Debt & EMI Review',
      icon: CreditCard,
      pages: 'Chapter 10 • pp. 28–30',
      keyIdea: 'The 30% Hard Ceiling rule. Never let total EMIs consume more than 30% of your take-home pay.',
      actionableStep: 'Execute the Indian EMI Snowball to kill high-interest card finance charges in 90 days.',
      color: 'border-red-400/40 bg-red-500/10 text-rose-300',
    },
    {
      id: 6,
      title: 'Emergency Fund Cushion',
      icon: ShieldAlert,
      pages: 'Chapter 12 • pp. 34–35',
      keyIdea: 'Safety buffers level by level: Start with a ₹25,000 starter cushion, progressing to a true 6-month runway.',
      actionableStep: 'Lock your emergency fund in a separate liquid bank account with no UPI or debit card linked.',
      color: 'border-emerald-400/40 bg-emerald-500/10 text-emerald-300',
    },
    {
      id: 7,
      title: 'Financial Goals Engine',
      icon: Target,
      pages: 'Chapter 16 • pp. 39–41',
      keyIdea: 'Goals before financial products. Never buy insurance disguised as investment (ULIPs/endowment plans).',
      actionableStep: 'Separate short-term sinking funds (travel/gadgets) from long-term index compounding.',
      color: 'border-cyan-400/40 bg-cyan-500/10 text-cyan-300',
    },
    {
      id: 8,
      title: 'Lifestyle Inflation Guard',
      icon: Flame,
      pages: 'Chapter 5 • pp. 19–20',
      keyIdea: 'The Raise Capture Rate: Whenever your salary increases by ₹10,000, immediately divert 50% into SIPs.',
      actionableStep: 'Prevent lifestyle creep from absorbing pay increments so wealth compounds permanently.',
      color: 'border-purple-400/40 bg-purple-500/10 text-purple-300',
    },
    {
      id: 9,
      title: '10-Min Monthly Review',
      icon: CalendarCheck,
      pages: 'Chapter 34 • pp. 60–62',
      keyIdea: 'Consistency over perfection. A quick 10-minute checkup ritual once a month on salary day.',
      actionableStep: 'Log key balances in the 1-Page Monthly Dashboard to verify progress and celebrate discipline.',
      color: 'border-teal-400/40 bg-teal-500/10 text-teal-300',
    },
  ];

  const activeModule = modules.find((m) => m.id === selectedModule) || modules[0];
  const ActiveIcon = activeModule.icon;

  return (
    <section id="ebook-experience" className="py-16 sm:py-24 border-b border-white/10 relative text-white scroll-mt-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12 sm:space-y-14">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3.5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-white/10 text-amber-300 border border-amber-400/30 backdrop-blur-md">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>The 72-Page Field Manual</span>
          </div>

          <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            THIS IS NOT JUST AN EBOOK
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-mono font-bold text-teal-300 pt-1">
            <span>Read</span>
            <span className="text-slate-500">→</span>
            <span>Track</span>
            <span className="text-slate-500">→</span>
            <span>Find</span>
            <span className="text-slate-500">→</span>
            <span>Change</span>
            <span className="text-slate-500">→</span>
            <span>Review</span>
            <span className="text-slate-500">→</span>
            <span className="text-amber-300 font-extrabold">Repeat</span>
          </div>

          <p className="text-base sm:text-lg text-slate-200 font-sans-body leading-relaxed max-w-2xl mx-auto pt-2">
            Explore the 9 core modules designed to replace chaotic guesswork with permanent cashflow clarity.
          </p>
        </div>

        {/* 9 Modules Horizontal Tab Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-2">
          {modules.map((m) => {
            const isSelected = m.id === selectedModule;
            const Icon = m.icon;
            return (
              <button
                key={m.id}
                onClick={() => setSelectedModule(m.id)}
                type="button"
                className={`p-3 rounded-2xl text-left transition-all cursor-pointer flex flex-col justify-between gap-2 border ${
                  isSelected
                    ? 'bg-[#E8871E] text-slate-950 border-amber-300 shadow-md scale-105'
                    : 'bg-[#0F1C36] text-slate-200 hover:bg-white/10 border-white/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Icon className="w-4 h-4" />
                  <span className="text-[10px] font-mono font-bold">0{m.id}</span>
                </div>
                <div className="font-serif-title font-bold text-xs leading-snug truncate">
                  {m.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Module Deep-Dive Card */}
        <div className="max-w-3xl mx-auto">
          <TiltPhysicsCard maxAngle={4} enableGlare={false} className="rounded-3xl">
            <div className={`p-6 sm:p-9 rounded-3xl bg-[#0F1B33] border ${activeModule.color.split(' ')[0]} shadow-2xl space-y-6`}>
              
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${activeModule.color} shadow-sm`}>
                    <ActiveIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-white">
                      {activeModule.title}
                    </h3>
                    <span className="text-xs font-mono text-amber-300 font-semibold">
                      {activeModule.pages}
                    </span>
                  </div>
                </div>

                <button
                  onClick={onOpenPreview}
                  type="button"
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-teal-400" />
                  <span>Read Sample Pages</span>
                </button>
              </div>

              <div className="space-y-4 text-sm sm:text-base leading-relaxed font-sans-body">
                <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1.5">
                  <div className="text-xs font-mono font-bold uppercase text-teal-300">
                    Core Conceptual Principle:
                  </div>
                  <p className="text-slate-100 font-medium">
                    {activeModule.keyIdea}
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-400/30 space-y-1.5">
                  <div className="text-xs font-mono font-bold uppercase text-amber-300">
                    What You Execute on Salary Day:
                  </div>
                  <p className="text-amber-100">
                    {activeModule.actionableStep}
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 text-xs text-slate-300">
                <span>Included in the full 72-page English + Hindi edition kit</span>
                <a
                  href="#pricing"
                  className="text-amber-300 font-bold hover:underline inline-flex items-center gap-1"
                >
                  <span>Get complete access for ₹299 &rarr;</span>
                </a>
              </div>
            </div>
          </TiltPhysicsCard>
        </div>
      </div>
    </section>
  );
}
