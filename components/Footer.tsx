'use client';

import React from 'react';
import { LegalDocType } from './LegalModal';
import { ShieldCheck, Mail } from 'lucide-react';

interface FooterProps {
  onOpenLegal: (type: LegalDocType) => void;
}

export function Footer({ onOpenLegal }: FooterProps) {
  return (
    <footer className="bg-black/30 backdrop-blur-md text-slate-300 text-xs border-t border-white/10 pb-20 sm:pb-8 pt-12 sm:pt-14">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Disclaimer Notice */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-2 text-stone-300/80">
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-[#E8871E]" />
            <span>Educational &amp; Legal Disclaimer</span>
          </div>
          <p className="leading-relaxed font-sans-body text-[11px] sm:text-xs">
            Educational content only. This product is not individualized financial, investment, tax, insurance or legal advice. Verify important financial information with current official sources and qualified professionals. All people, salaries and case studies are fictional composite examples created to illustrate cashflow principles. All digital product sales are final and non-refundable once delivered.
          </p>
        </div>

        {/* Support email highlight & links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10 text-xs">
          <div className="flex items-center gap-2 text-white">
            <div className="w-6 h-6 rounded bg-[#E8871E] flex items-center justify-center font-serif-title font-bold text-xs text-[#14213D]">
              M
            </div>
            <span className="font-serif-title font-bold text-sm text-white">
              MEDHASTONE
            </span>
            <span className="text-white/40 text-[11px] hidden md:inline">
              • Salary Reset Money Kit
            </span>
          </div>

          {/* Support Email Direct Link */}
          <div className="flex items-center gap-1.5 text-xs text-amber-300">
            <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Support:</span>
            <a href="mailto:medhastone@gmail.com" className="font-semibold underline hover:text-white transition-colors">
              medhastone@gmail.com
            </a>
          </div>

          {/* Legal Navigation */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-white/75 font-medium">
            <button
              onClick={() => onOpenLegal('privacy')}
              type="button"
              className="hover:text-[#E8871E] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span className="text-white/20">•</span>
            <button
              onClick={() => onOpenLegal('terms')}
              type="button"
              className="hover:text-[#E8871E] transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <span className="text-white/20">•</span>
            <button
              onClick={() => onOpenLegal('refund')}
              type="button"
              className="hover:text-[#E8871E] transition-colors cursor-pointer"
            >
              Refund Policy
            </button>
            <span className="text-white/20">•</span>
            <button
              onClick={() => onOpenLegal('contact')}
              type="button"
              className="hover:text-[#E8871E] transition-colors cursor-pointer"
            >
              Contact &amp; Support
            </button>
          </div>
        </div>

        <div className="text-center text-[10px] text-white/40 pt-2 font-mono">
          © {new Date().getFullYear()} Medhastone. All rights reserved. Where Did My Salary Go? &amp; Salary Reset Money Kit are digital publications of Medhastone. Support: medhastone@gmail.com
        </div>
      </div>
    </footer>
  );
}
