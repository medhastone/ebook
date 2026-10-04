'use client';

import React, { useState } from 'react';
import { 
  BookOpen, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  CheckCircle2, 
  Eye, 
  ArrowRight
} from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import { SUPERPROFILE_PAYMENT_URL } from '@/lib/constants';
import { TiltPhysicsCard, MagneticButton } from '@/components/ui/PhysicsInteractive';

interface Chapter {
  id: number;
  number: string;
  title: string;
  subtitle: string;
  readTime: string;
  highlights: string[];
  takeaway: string;
}

const chapters: Chapter[] = [
  {
    id: 1,
    number: 'Module 01',
    title: 'The Salary Autopsy: Where Did It Actually Go?',
    subtitle: 'The psychology of frictionless UPI, Quick Commerce, and why willpower always loses.',
    readTime: '18 min read',
    highlights: [
      'The silent ₹49-₹299 micropayment flood on Blinkit, Zepto & Swiggy',
      'The 48-Hour UPI Cool-Off Rule (saves ₹4,000+ in week 1)',
      'How to audit 90 days of bank statements in under 20 minutes',
      'Why budgeting apps that ask you to type every expense always fail',
    ],
    takeaway: 'Identify your 3 biggest invisible money leaks without shame or self-blame.',
  },
  {
    id: 2,
    number: 'Module 02',
    title: 'The Salary Half-Life: Fixing Days 1 to 5',
    subtitle: 'Why 50% of your paycheck is gone in 120 hours and how to stop the Day-5 panic.',
    readTime: '22 min read',
    highlights: [
      'The Salary Half-Life metric: measuring financial anxiety numerically',
      'Automated Day-1 money sweeping architecture',
      'Setting up your secondary UPI spending card buffer',
      'Fixed bill grouping: aligning due dates to eliminate mid-month surprises',
    ],
    takeaway: 'Protect at least 40% of your income past Day 15 with automated safeguards.',
  },
  {
    id: 3,
    number: 'Module 03',
    title: 'The EMI Trap & The Indian Snowball Method',
    subtitle: 'Breaking free from No-Cost EMIs, credit card minimum balance traps, and BNPL debt.',
    readTime: '25 min read',
    highlights: [
      'The true math behind "No-Cost" EMIs (processing fees + GST + lost discounts)',
      'The 30% Hard Ceiling rule for personal, consumer, and vehicle debt',
      'The Indian EMI Snowball: step-by-step debt elimination order',
      'How to negotiate interest rate reductions with major Indian lenders',
    ],
    takeaway: 'Stop working 10 days every month just to service depreciating consumer debt.',
  },
  {
    id: 4,
    number: 'Module 04',
    title: 'The 5-Bucket Money Flow Architecture',
    subtitle: 'Live, Pay, Protect, Build, Enjoy — the automated partitioning system.',
    readTime: '20 min read',
    highlights: [
      'Why 50-30-20 fails in Indian metros and what actually works (50-15-10-15-10)',
      'Separating your primary salary account from daily UPI temptation',
      'How to automate guilt-free discretionary fun money every month',
      'The Emergency Buffer: where to park 3 to 6 months of living expenses safely',
    ],
    takeaway: 'Eliminate willpower from your financial life with a permanent automated pipeline.',
  },
  {
    id: 5,
    number: 'Module 05',
    title: 'Spending Psychology & Friction Engineering',
    subtitle: 'Why humans spend when tired, dopamine triggers in apps, and behavioral boundaries.',
    readTime: '19 min read',
    highlights: [
      'The 10 PM Willpower Drop: why late-night cart additions are dangerous',
      'How delivery apps engineer urgency (countdown timers, free delivery minimums)',
      'The "Pause 48 Hours" decision matrix for all non-essential purchases above ₹1,500',
      'Scripts to handle peer pressure, office party splits, and family loan demands',
    ],
    takeaway: 'Outsmart consumer algorithms by installing deliberate friction before checkout.',
  },
  {
    id: 6,
    number: 'Module 06',
    title: 'The Real Indian Salary Case Studies',
    subtitle: 'Detailed financial autopsies of real profiles earning ₹25k, ₹50k, ₹85k, and ₹1.5L.',
    readTime: '24 min read',
    highlights: [
      'Case Study 1: The ₹30k Bangalore fresher trapped in Swiggy & Zepto loops',
      'Case Study 2: The ₹65k Pune IT professional servicing 3 consumer EMIs',
      'Case Study 3: The ₹1.2L Gurgaon couple balancing rent, car loan, and social pressure',
      'Exact before-and-after cashflow spreadsheets for every profile level',
    ],
    takeaway: 'See your exact situation mirrored with numbers and follow a proven turnaround blueprint.',
  },
  {
    id: 7,
    number: 'Module 07',
    title: 'The 30-Day Salary Reset Protocol',
    subtitle: 'Your daily, weekly, and monthly checklist to make financial calm permanent.',
    readTime: '15 min read',
    highlights: [
      'Week 1: The statement audit and leak plug',
      'Week 2: The 5-bucket bank account setup and automation rules',
      'Week 3: The EMI audit and cancellation of dormant subscriptions',
      'Week 4: The 10-minute salary day ritual to execute every month forever',
    ],
    takeaway: 'A complete operating system for your money that takes under 15 minutes a month to maintain.',
  },
];

interface WhatIsInsideAccordionProps {
  onPreviewClick: () => void;
  onBuyClick: () => void;
  price?: number;
}

export function WhatIsInsideAccordion({
  onPreviewClick,
  onBuyClick,
  price = 299,
}: WhatIsInsideAccordionProps) {
  const [expandedId, setExpandedId] = useState<number | null>(1);

  const toggleChapter = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="py-16 sm:py-24 border-b border-white/10 relative text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-white/10 text-amber-300 border border-white/15 backdrop-blur-md mb-4">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>Complete Curriculum Breakdown</span>
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            What&apos;s Inside The 30-Day Reset
          </h2>
          <p className="mt-4 text-slate-200 text-base sm:text-lg leading-relaxed">
            7 structured modules, 72 actionable pages, zero filler. Built specifically for the Indian financial reality — UPI, EMIs, family dynamics, and taxes.
          </p>

          {/* Preview Sample Pages Trigger Banner */}
          <div className="mt-8 max-w-2xl mx-auto">
            <TiltPhysicsCard maxAngle={4} className="rounded-2xl">
              <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.08] border border-white/20 backdrop-blur-md shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-[#E8871E] flex items-center justify-center text-white shrink-0 shadow-md">
                    <Eye className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm sm:text-base font-bold text-white">
                      Curious what the writing and diagrams look like?
                    </div>
                    <div className="text-xs sm:text-sm text-slate-300 mt-0.5">
                      Read the first 6 pages from the original PDF ebook right now before deciding.
                    </div>
                  </div>
                </div>

                <MagneticButton strength={0.3}>
                  <button
                    onClick={() => {
                      trackEvent('preview_page', { source: 'curriculum_banner' });
                      onPreviewClick();
                    }}
                    type="button"
                    className="px-5 py-3 rounded-xl bg-white/15 hover:bg-white/25 text-white text-sm font-bold transition-all shadow-md cursor-pointer inline-flex items-center gap-2 shrink-0 border border-white/25"
                  >
                    <span>Preview 6 Free Pages</span>
                    <ArrowRight className="w-4 h-4 text-amber-400" />
                  </button>
                </MagneticButton>
              </div>
            </TiltPhysicsCard>
          </div>
        </div>

        {/* Chapter Accordion */}
        <div className="space-y-4 max-w-3xl mx-auto">
          {chapters.map((chap) => {
            const isExpanded = expandedId === chap.id;

            return (
              <div
                key={chap.id}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isExpanded
                    ? 'border-amber-400/50 bg-white/[0.09] shadow-xl'
                    : 'border-white/10 bg-white/[0.04] hover:border-white/20'
                } backdrop-blur-md`}
              >
                <button
                  onClick={() => toggleChapter(chap.id)}
                  type="button"
                  className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-0.5 rounded bg-white/10 text-amber-300 border border-white/15 font-mono">
                        {chap.number}
                      </span>
                      <span className="text-xs sm:text-sm text-slate-300 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-300" />
                        {chap.readTime}
                      </span>
                    </div>
                    <h3 className="font-serif-title text-lg sm:text-xl font-bold text-white leading-snug">
                      {chap.title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-200 font-sans-body">
                      {chap.subtitle}
                    </p>
                  </div>

                  <div className="p-1 rounded-lg text-slate-300 hover:text-white shrink-0 mt-1">
                    {isExpanded ? (
                      <ChevronUp className="w-6 h-6 text-amber-400" />
                    ) : (
                      <ChevronDown className="w-6 h-6" />
                    )}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 border-t border-white/10 space-y-4 text-sm sm:text-base">
                    <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-300">
                      Key Frameworks in This Module:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {chap.highlights.map((hl, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-slate-100">
                          <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-1" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-between gap-2 mt-3">
                      <div className="text-sm text-slate-200">
                        <strong className="text-white">Core Outcome:</strong> {chap.takeaway}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA in curriculum */}
        <div className="mt-12 text-center">
          <MagneticButton strength={0.4} maxTilt={8}>
            <a
              href={SUPERPROFILE_PAYMENT_URL}
              onClick={() => {
                trackEvent('click_buy', { source: 'curriculum_footer', price: 299, destination: SUPERPROFILE_PAYMENT_URL });
              }}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-[#E8871E] via-[#F4932A] to-[#D97706] hover:from-[#C97112] hover:to-[#B45309] text-white font-bold text-base sm:text-lg shadow-[0_10px_25px_rgba(232,135,30,0.35)] hover:shadow-[0_15px_35px_rgba(232,135,30,0.5)] transition-all cursor-pointer border border-amber-300/30"
            >
              <span>Get All 7 Modules + 4 Bonuses for ₹299</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
