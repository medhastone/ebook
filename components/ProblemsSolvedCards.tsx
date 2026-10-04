'use client';

import React from 'react';
import { 
  Building, 
  Users, 
  CreditCard, 
  ShoppingBag, 
  Plane, 
  TrendingUp, 
  ShieldCheck
} from 'lucide-react';

interface ProblemCard {
  id: number;
  icon: any;
  title: string;
  situation: string;
  trap: string;
  bookSolution: string;
  chapterRef: string;
  badgeColor: string;
}

const problemCards: ProblemCard[] = [
  {
    id: 1,
    icon: Building,
    title: 'Salary delayed by 5 days and rent is due on the 1st',
    situation: 'HR emails: "Due to banking holidays, salaries will be credited on the 6th." Meanwhile, landlord calls at 8:00 AM on the 2nd.',
    trap: 'Borrowing from an instant loan app or paying a late rent penalty that spikes blood pressure.',
    bookSolution: 'The 30-Day Buffer Cushion decouples your living expenses from HR payout dates forever.',
    chapterRef: 'Solved in Chapter 2',
    badgeColor: 'bg-rose-100 text-rose-800 font-bold',
  },
  {
    id: 2,
    icon: Users,
    title: 'Family or close friend asks for an urgent ₹20,000 loan',
    situation: '"Bhai thodi problem hai, agle hafte pakka de dunga." Saying yes kills your savings; saying no causes months of guilt.',
    trap: 'Giving the money, never getting it back, and ruining the relationship forever.',
    bookSolution: 'Verbatim Hindi & English scripts for polite, respectful "Tough Love" boundaries that keep both money and love intact.',
    chapterRef: 'Solved in Chapter 5',
    badgeColor: 'bg-amber-100 text-amber-800 font-bold',
  },
  {
    id: 3,
    icon: CreditCard,
    title: 'The Minimum Credit Card Payment Trap',
    situation: 'Outstanding bill is ₹46,000. App highlights: "Minimum Amount Due: ₹2,300". You pay ₹2,300 feeling relieved.',
    trap: 'At 42% APR + GST, you are paying over ₹14,000 a year purely in bank finance charges without reducing debt.',
    bookSolution: 'The Indian EMI Snowball + Card Freeze protocol to kill compounding interest in 90 days.',
    chapterRef: 'Solved in Chapter 3',
    badgeColor: 'bg-red-100 text-red-800 font-bold',
  },
  {
    id: 4,
    icon: ShoppingBag,
    title: 'Swiggy & Blinkit micro-transactions adding up to ₹9,000',
    situation: 'You don&apos;t buy designer clothes or gold, yet your bank statement has 68 transactions of ₹89, ₹149, and ₹340.',
    trap: 'Frictionless UPI PIN payments bypass pain sensors in the brain, bleeding 20% of your salary invisibly.',
    bookSolution: 'The 48-Hour Cool-Off Cart and the Secondary Debit Wallet technique (cuts food leaks by 60%).',
    chapterRef: 'Solved in Chapter 1',
    badgeColor: 'bg-orange-100 text-orange-800 font-bold',
  },
  {
    id: 5,
    icon: Plane,
    title: 'Destination wedding or Goa trip peer pressure',
    situation: '"Bhai sab chal rahe hain, tu kanjoosi mat kar!" You spend ₹35,000 on flights, suits, and parties just to fit in.',
    trap: 'Putting trip expenses on a 6-month EMI that reminds you of a 3-day weekend for half a year.',
    bookSolution: 'The Dedicated "Enjoy Bucket" and social sinking fund so you attend celebrations 100% guilt-free.',
    chapterRef: 'Solved in Chapter 6',
    badgeColor: 'bg-blue-100 text-blue-800 font-bold',
  },
  {
    id: 6,
    icon: TrendingUp,
    title: 'Wanting to start SIPs but account always hits zero by the 25th',
    situation: 'Every month you promise: "Whatever is left on the 30th, I will invest in mutual funds." Nothing is ever left.',
    trap: 'Trying to save what remains after spending, which human psychology guarantees will be zero.',
    bookSolution: 'The 15-Minute Salary Day Auto-Sweep that invests your future wealth at 00:05 AM before you can touch it.',
    chapterRef: 'Solved in Chapter 4',
    badgeColor: 'bg-emerald-100 text-emerald-800 font-bold',
  },
];

export function ProblemsSolvedCards() {
  return (
    <section className="py-16 sm:py-24 bg-[#F4EFE6] border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-[#14213D] text-amber-200 mb-4 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-[#E8871E]" />
            <span>Relatable Indian Realities</span>
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl font-bold text-[#14213D] tracking-tight leading-tight">
            6 Real-Life Money Emergencies Solved Inside
          </h2>
          <p className="mt-4 text-stone-700 text-base sm:text-lg leading-relaxed">
            No abstract economic lectures. Here is how the book handles the exact high-stress financial situations you face every single month.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problemCards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.id}
                className="bg-white rounded-3xl border border-stone-300 p-6 sm:p-7 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-2xl bg-[#14213D] text-white flex items-center justify-center shadow-xs">
                      <Icon className="w-5 h-5 text-[#E8871E]" />
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${card.badgeColor}`}>
                      {card.chapterRef}
                    </span>
                  </div>

                  <h3 className="font-serif-title text-lg sm:text-xl font-bold text-[#14213D] leading-snug">
                    {card.title}
                  </h3>

                  <div className="text-sm sm:text-base text-stone-700 space-y-2.5 pt-1 leading-relaxed">
                    <p>
                      <strong className="text-stone-900">The Situation:</strong> {card.situation}
                    </p>
                    <p className="text-rose-700 font-medium">
                      <strong>The Costly Mistake:</strong> {card.trap}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-stone-100 bg-emerald-50/70 -mx-6 -mb-6 sm:-mx-7 sm:-mb-7 p-5 rounded-b-3xl">
                  <div className="text-xs sm:text-sm text-emerald-950 leading-relaxed font-medium">
                    <strong className="text-[#2E7D5B] text-sm sm:text-base font-bold block mb-1">The 30-Day Fix:</strong> {card.bookSolution}
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
