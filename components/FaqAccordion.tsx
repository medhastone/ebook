'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      q: '1. What do I receive?',
      a: 'You get complete lifetime access to the 72-page core English ebook ("Where Did My Salary Go?"), the complete Hindi edition ("मेरा वेतन कहाँ चला गया?"), all 12 editable tools & spreadsheets (Google Sheets, Excel, Notion), and the bonus 500GB Creator Editor Bundle.'
    },
    {
      q: '2. How does the ₹100 coupon work?',
      a: 'The regular price of the kit is ₹399. When you enter coupon code MEDHASTONE at checkout, you instantly receive ₹100 off, bringing your final payable amount to ₹299.'
    },
    {
      q: '3. What is the coupon code?',
      a: 'The coupon code is MEDHASTONE. It applies ₹100 off the regular ₹399 price directly at checkout.'
    },
    {
      q: '4. Is the Hindi ebook included?',
      a: 'Yes, absolutely! The full Hindi edition ("मेरा वेतन कहाँ चला गया?") is included at no extra cost alongside the English edition in your delivery portal.'
    },
    {
      q: '5. Are the 12 tools editable?',
      a: 'Yes. All 12 money tools are fully customizable. You can use them directly in Google Sheets, Microsoft Excel, Apple Numbers, or duplicate them into your Notion workspace.'
    },
    {
      q: '6. Can I use the workbook every month?',
      a: 'Yes. The Salary Reset system is built for a recurring 10-minute checkup on salary day. You can duplicate the monthly sheet and reuse it for every paycheck indefinitely.'
    },
    {
      q: '7. Is this suitable for a ₹20K/₹30K salary?',
      a: 'Yes. The frameworks are specifically structured for real Indian salary tiers between ₹15,000 and ₹1,00,000+. It works regardless of your starting income because it focuses on cashflow control and leak plugging rather than arbitrary percentages.'
    },
    {
      q: '8. Is this investment advice?',
      a: 'No. This product is for educational and self-organization purposes only. It is not individualized financial, investment, tax, insurance, or legal advice. Always consult certified professionals for personal decisions.'
    },
    {
      q: '9. Does this guarantee savings?',
      a: 'No. No honest book or tool can legally guarantee specific savings or wealth outcomes. What this kit gives you is an actionable, proven system to diagnose leaks, partition your accounts, and reduce waste.'
    },
    {
      q: '10. What is the 500GB Creator Editor Bundle?',
      a: 'The 500GB Creator Editor Bundle is a special digital bonus containing video LUTs, sound FX, motion graphics templates, and 4K creator assets, included at no additional charge with lifetime cloud access.'
    },
    {
      q: '11. Is this a physical product?',
      a: 'No. This is a 100% digital kit. You receive instant digital access immediately after payment, with no waiting for postal courier or shipping delays.'
    },
    {
      q: '12. How will I receive my files?',
      a: 'Immediately after checkout, you are redirected to a secure download page and an instant email is dispatched containing download links for all PDF, EPUB, Google Sheets, Notion dashboard, and creator assets. For any support, write to medhastone@gmail.com.'
    }
  ];

  return (
    <section id="faq" className="py-16 sm:py-24 border-b border-white/10 scroll-mt-14 relative text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center space-y-3.5 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-white/10 text-amber-300 border border-white/15 backdrop-blur-md">
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span>Frequently Asked Questions</span>
          </div>

          <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Frequently Asked Questions
          </h2>

          <p className="text-base sm:text-lg text-slate-200 font-sans-body leading-relaxed max-w-2xl mx-auto">
            Clear, honest answers about the kit, the MEDHASTONE coupon code, and digital delivery.
          </p>
        </div>

        {/* 12 FAQs Accordion List */}
        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={faq.q}
                className="border border-white/15 rounded-2xl overflow-hidden transition-all bg-[#0F1B33] shadow-md"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  type="button"
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.04] transition-colors"
                >
                  <span className="font-serif-title font-bold text-base sm:text-lg text-white">
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-slate-300 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-amber-400' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-1 text-sm sm:text-base text-slate-200 font-sans-body leading-relaxed border-t border-white/10 bg-white/[0.02]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
