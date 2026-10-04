'use client';

import React from 'react';
import { Check, X, ShieldAlert, Award } from 'lucide-react';

const forList = [
  'Salaried professionals (₹15,000–₹1,00,000) whose bank balance drops to near zero before the 25th.',
  'Anyone carrying 1 to 3 EMIs (gadgets, bike, personal loan, BNPL) who feels debt is eating their youth.',
  'Young professionals in metros tired of ₹8,000+ vanishing into Swiggy, Blinkit, and weekend surge prices.',
  'First-jobbers and junior engineers who never got taught practical money management in school or college.',
  'Working couples who want a peaceful, transparent system without awkward fights about who paid for groceries.',
  'People who want to start mutual fund SIPs but genuinely cannot find ₹2,500 surplus at the end of the month.',
];

const notForList = [
  'People looking for "multibagger stock recommendations", penny stock tips, or options trading signals.',
  'Crypto traders and anyone searching for a "get-rich-in-30-days" scheme. (This is discipline, not magic).',
  'High-Net-Worth Individuals (HNIs) looking for offshore family trusts or complex corporate tax avoidance.',
  'People unwilling to dedicate even 15 minutes on salary day to run their automated banking protocol.',
  'Anyone looking for theoretical macro-economic textbooks without actionable, copy-paste Indian steps.',
];

export function WhoItsFor() {
  return (
    <section className="py-16 sm:py-24 bg-white border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-[#14213D] text-amber-200 mb-4 shadow-xs">
            <Award className="w-4 h-4 text-[#E8871E]" />
            <span>Honest Anti-Hype Filter</span>
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl font-bold text-[#14213D] tracking-tight leading-tight">
            Is This Book Right For You?
          </h2>
          <p className="mt-4 text-stone-700 text-base sm:text-lg leading-relaxed">
            We respect your time and hard-earned money. If this book isn&apos;t a perfect fit for your situation, we would rather you don&apos;t buy it.
          </p>
        </div>

        {/* 2-Column Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Who It Is For */}
          <div className="bg-[#EBF7F1]/70 rounded-3xl border border-[#2E7D5B]/30 p-7 sm:p-8 shadow-xs space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#2E7D5B] text-white flex items-center justify-center font-bold text-sm">
                ✓
              </div>
              <h3 className="font-serif-title text-xl sm:text-2xl font-bold text-[#14213D]">
                This Book IS For You If:
              </h3>
            </div>

            <ul className="space-y-4">
              {forList.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-stone-800 leading-relaxed font-normal">
                  <Check className="w-5 h-5 text-[#2E7D5B] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Who It Is NOT For */}
          <div className="bg-rose-50/70 rounded-3xl border border-rose-200 p-7 sm:p-8 shadow-xs space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-rose-600 text-white flex items-center justify-center font-bold text-sm">
                ✕
              </div>
              <h3 className="font-serif-title text-xl sm:text-2xl font-bold text-[#14213D]">
                This Book is NOT For You If:
              </h3>
            </div>

            <ul className="space-y-4">
              {notForList.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-stone-800 leading-relaxed font-normal">
                  <X className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Honest Disclosure Banner */}
        <div className="mt-10 p-5 sm:p-6 rounded-2xl bg-stone-100 border border-stone-300 flex items-start gap-3.5 text-sm text-stone-800 leading-relaxed">
          <ShieldAlert className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="text-stone-900 block font-bold text-base">
              Crucial Disclosure: Zero Stock Tips &amp; No Investment Advice
            </strong>
            <p>
              This guide is strictly educational cashflow engineering. It does not recommend specific stocks, crypto, or day-trading setups. We focus 100% on fixing the pipeline between your employer&apos;s payroll and your bank account.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
