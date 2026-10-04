'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  Download, 
  Sparkles, 
  CheckCircle2, 
  Lock, 
  Unlock, 
  ArrowRight,
  ShieldCheck,
  ExternalLink,
  Info
} from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import { SUPERPROFILE_PAYMENT_URL } from '@/lib/constants';
import { MagneticButton } from '@/components/ui/PhysicsInteractive';

interface SamplePagePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBuyClick: () => void;
  price?: number;
  isUnlocked?: boolean;
  onUnlock?: () => void;
}

export function SamplePagePreviewModal({
  isOpen,
  onClose,
  onBuyClick,
  price = 399,
  isUnlocked = false,
  onUnlock,
}: SamplePagePreviewModalProps) {
  const DEFAULT_PDF_URL = '/Where_Did_My_Salary_Go.pdf';
  // 0..5 are pages 1..6. Index 6 is the Locked paywall screen (Pages 7 to 72)
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setCurrentPageIndex((prev) => Math.min(prev + 1, 6));
      } else if (e.key === 'ArrowLeft') {
        setCurrentPageIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isLockedPage = currentPageIndex === 6 && !isUnlocked;

  const handleNext = () => {
    setCurrentPageIndex((prev) => Math.min(prev + 1, 6));
  };

  const handlePrev = () => {
    setCurrentPageIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-[#FBF9F5] rounded-2xl sm:rounded-3xl shadow-2xl border border-stone-300 overflow-hidden my-auto flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="bg-[#14213D] text-white px-4 sm:px-6 py-4 flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#E8871E] flex items-center justify-center text-[#14213D] font-bold shadow-xs">
              <BookOpen className="w-5 h-5 text-[#14213D]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif-title text-base sm:text-lg font-bold text-white tracking-tight">
                  Where Did My Salary Go?
                </span>
                {isUnlocked ? (
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-bold flex items-center gap-1">
                    <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Full 72 Pages Unlocked</span>
                  </span>
                ) : (
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#E8871E]/20 text-amber-300 border border-[#E8871E]/30 font-medium">
                    6-Page Free Preview
                  </span>
                )}
              </div>
              <div className="text-xs text-white/70 hidden sm:block">
                Original 72-Page Field Manual &amp; Workbook
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Open Original PDF in New Tab */}
            <a
              href={DEFAULT_PDF_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#E8871E] hover:bg-[#C97112] text-white text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer"
              title="Open Where_Did_My_Salary_Go.pdf in new browser tab"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="hidden sm:inline">Open PDF in New Tab</span>
              <span className="sm:hidden">Open PDF</span>
            </a>

            {/* Close */}
            <button
              onClick={onClose}
              type="button"
              className="p-2 rounded-xl hover:bg-white/10 text-white/80 hover:text-white transition-all cursor-pointer"
              title="Close Preview (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Toolbar (Pills & Progress) */}
        <div className="bg-stone-100 px-3 sm:px-6 py-3 border-b border-stone-200 flex flex-wrap items-center justify-between gap-2.5 shrink-0">
          {/* Page Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto py-1 text-xs sm:text-sm">
            {[
              { num: 1, label: 'Cover' },
              { num: 2, label: 'Notice' },
              { num: 3, label: 'TOC I & II' },
              { num: 4, label: 'TOC III–VII' },
              { num: 5, label: 'Before You Begin' },
              { num: 6, label: 'Intro: ₹30k Table' }
            ].map((p, idx) => (
              <button
                key={p.num}
                onClick={() => setCurrentPageIndex(idx)}
                type="button"
                className={`px-3 sm:px-3.5 py-1.5 rounded-xl font-medium transition-all cursor-pointer whitespace-nowrap ${
                  currentPageIndex === idx
                    ? 'bg-[#14213D] text-white shadow-xs font-bold'
                    : 'bg-white text-stone-700 hover:text-stone-950 border border-stone-300'
                }`}
              >
                Page {p.num}: {p.label}
              </button>
            ))}

            {/* Page 7+ Paywall / Full Unlock tab */}
            <button
              onClick={() => setCurrentPageIndex(6)}
              type="button"
              className={`px-3 sm:px-3.5 py-1.5 rounded-xl font-medium transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                currentPageIndex === 6
                  ? 'bg-[#E8871E] text-white shadow-xs font-bold'
                  : isUnlocked
                  ? 'bg-emerald-50 text-emerald-900 border border-emerald-300 font-semibold'
                  : 'bg-amber-50 text-amber-950 border border-amber-300 font-semibold'
              }`}
            >
              {isUnlocked ? (
                <>
                  <Unlock className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Pages 7–72 (Unlocked)</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-amber-800" />
                  <span>Pages 7–72 (Locked)</span>
                </>
              )}
            </button>
          </div>

          {/* Prev/Next Controls */}
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs sm:text-sm text-stone-600 font-mono hidden sm:inline mr-2">
              {currentPageIndex < 6 ? `Page ${currentPageIndex + 1} of 6 Preview` : isUnlocked ? 'Full 72-Page Edition' : 'Locked Paywall'}
            </span>

            <button
              onClick={handlePrev}
              disabled={currentPageIndex === 0}
              type="button"
              className="p-2 rounded-xl bg-white border border-stone-300 text-stone-700 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              title="Previous Page (ArrowLeft)"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              disabled={currentPageIndex === 6}
              type="button"
              className="p-2 rounded-xl bg-white border border-stone-300 text-stone-700 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              title="Next Page (ArrowRight)"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Reading Canvas */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-7 md:p-9 bg-white text-[#14213D] relative min-h-[440px]">
          {isLockedPage ? (
            /* Page 7+ Locked Paywall Card */
            <div className="max-w-2xl mx-auto py-6 text-center space-y-6 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-3xl bg-amber-100 border border-amber-200 text-[#E8871E] flex items-center justify-center mx-auto shadow-md">
                <Lock className="w-8 h-8 text-[#E8871E]" />
              </div>

              <div className="space-y-2.5">
                <span className="text-xs uppercase font-bold tracking-widest px-3.5 py-1.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
                  Preview Ended at Page 6 • 66 Pages Locked (Pages 7 to 72)
                </span>
                <h3 className="font-serif-title text-2xl sm:text-3xl md:text-4xl font-bold text-[#14213D]">
                  Unlock the Complete 72-Page Field Guide &amp; 4-Part Toolkit
                </h3>
                <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-sans-body max-w-xl mx-auto">
                  You have experienced the authentic first 6 pages. The remaining 66 pages contain the core step-by-step systems, case studies, formulas, and real-life scripts.
                </p>
              </div>

              {/* Locked Chapters List */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#FBF9F5] border border-stone-300 text-left space-y-3.5 text-sm text-stone-800">
                <div className="font-bold text-stone-900 text-base border-b border-stone-200 pb-2.5">
                  What You Unlock Immediately Across Pages 7 to 72:
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2.5">
                    <Lock className="w-4 h-4 text-stone-400 mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-stone-900 text-sm">Part I: Why Your Salary Disappears (pp. 9–22)</strong>
                      <div className="text-xs text-stone-600">Chapters 1–6 • The 30-Min Autopsy, ₹100 Problem &amp; UPI Illusion</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Lock className="w-4 h-4 text-stone-400 mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-stone-900 text-sm">Part II: Repair Your Cash Flow (pp. 23–33)</strong>
                      <div className="text-xs text-stone-600">Chapters 7–11 • 5-Bucket Banking, Salary-Day Rule &amp; EMI Freeze</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Lock className="w-4 h-4 text-stone-400 mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-stone-900 text-sm">Part III: Build Financial Safety (pp. 34–38)</strong>
                      <div className="text-xs text-stone-600">Chapters 12–15 • Safety Buffers Level by Level &amp; Insurance Protection</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Lock className="w-4 h-4 text-stone-400 mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-stone-900 text-sm">Part IV: Start Building Wealth (pp. 39–49)</strong>
                      <div className="text-xs text-stone-600">Chapters 16–21 • Goals Before Products, Compounding &amp; Avoiding Scams</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Lock className="w-4 h-4 text-stone-400 mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-stone-900 text-sm">Part V: Lessons From Wealthy People (pp. 50–53)</strong>
                      <div className="text-xs text-stone-600">Chapters 22–27 • Warren Buffett, Bill Gates &amp; What NOT to Copy</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Lock className="w-4 h-4 text-stone-400 mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-stone-900 text-sm">Part VI: Case Studies &amp; 30-Day Reset (pp. 54–62)</strong>
                      <div className="text-xs text-stone-600">Chapters 28–34 • ₹20k, ₹30k, ₹50k, ₹1L Real Salary Blueprints</div>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-200 flex items-center gap-2 text-emerald-900 font-semibold text-xs sm:text-sm">
                  <Sparkles className="w-4 h-4 text-[#E8871E] shrink-0" />
                  <span>Part VII Bonus Material (pp. 63–75): 12 Real-Life Fixes, Scripts for Loan Demands, and All 4 Spreadsheets</span>
                </div>
              </div>

              {/* Buy CTA */}
              <div className="space-y-2.5 pt-2">
                <MagneticButton strength={0.4} maxTilt={8} className="w-full">
                  <a
                    href={SUPERPROFILE_PAYMENT_URL}
                    onClick={() => {
                      trackEvent('click_buy', { source: 'preview_locked_screen', price: 299, destination: SUPERPROFILE_PAYMENT_URL });
                    }}
                    className="w-full py-4.5 rounded-xl bg-gradient-to-r from-[#E8871E] via-[#F4932A] to-[#D97706] hover:from-[#C97112] hover:to-[#B45309] text-white font-bold text-base sm:text-lg shadow-[0_10px_25px_rgba(232,135,30,0.35)] hover:shadow-[0_15px_35px_rgba(232,135,30,0.5)] transition-all transform hover:-translate-y-0.5 cursor-pointer inline-flex items-center justify-center gap-2 border border-amber-300/30"
                  >
                    <span>Unlock Full 72 Pages &amp; Kit — ₹299</span>
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </MagneticButton>
                <div className="text-xs text-stone-500">
                  Instant digital unlock in this reader + direct 1-click download of Where_Did_My_Salary_Go.pdf.
                </div>
              </div>
            </div>
          ) : isUnlocked && currentPageIndex === 6 ? (
            /* Unlocked State View for Page 7 */
            <div className="max-w-2xl mx-auto space-y-6 text-center py-6 animate-in fade-in duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#2E7D5B] flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-1.5">
                <span className="text-xs uppercase tracking-wider font-bold text-emerald-700 bg-emerald-100 px-3.5 py-1 rounded-full">
                  Full 72-Page Edition Unlocked &amp; Verified
                </span>
                <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#14213D]">
                  All 72 Pages &amp; Toolkits Unlocked
                </h3>
                <p className="text-sm sm:text-base text-stone-600 font-sans-body">
                  Thank you for investing in your financial reset. You now have unrestricted lifetime access to the complete 72-page ebook and all templates.
                </p>
              </div>

              {/* Download Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-left">
                <div className="p-4 rounded-xl bg-[#FBF9F5] border border-stone-300 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-[#14213D]">1. Original PDF Ebook</div>
                    <div className="text-xs text-stone-500">72 Pages • Complete Field Manual</div>
                  </div>
                  <a
                    href="/Where_Did_My_Salary_Go.pdf"
                    download="Where_Did_My_Salary_Go.pdf"
                    className="px-3.5 py-2 rounded-lg bg-[#14213D] text-white text-xs sm:text-sm font-bold hover:bg-[#0B132B] inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PDF</span>
                  </a>
                </div>

                <div className="p-4 rounded-xl bg-[#FBF9F5] border border-stone-300 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-[#14213D]">2. EPUB &amp; Kindle</div>
                    <div className="text-xs text-stone-500">For phone &amp; e-readers</div>
                  </div>
                  <button
                    onClick={() => alert('Downloading EPUB edition')}
                    className="px-3.5 py-2 rounded-lg bg-[#14213D] text-white text-xs sm:text-sm font-bold hover:bg-[#0B132B] inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>EPUB</span>
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-[#FBF9F5] border border-stone-300 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-[#14213D]">3. 30-Day UPI Audit Sheet</div>
                    <div className="text-xs text-stone-500">Google Sheets &amp; Excel</div>
                  </div>
                  <button
                    onClick={() => alert('Opening Google Sheets UPI Audit Template')}
                    className="px-3.5 py-2 rounded-lg bg-[#2E7D5B] text-white text-xs sm:text-sm font-bold hover:bg-[#225C43] inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Sheet</span>
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-[#FBF9F5] border border-stone-300 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-[#14213D]">4. Notion Cashflow Hub</div>
                    <div className="text-xs text-stone-500">Duplicate into Notion</div>
                  </div>
                  <button
                    onClick={() => alert('Opening Notion Template Link')}
                    className="px-3.5 py-2 rounded-lg bg-[#E8871E] text-white text-xs sm:text-sm font-bold hover:bg-[#C97112] inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Notion</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* ============================================================== */
            /* AUTHENTIC 6-PAGE BOOK READER (VERBATIM FROM ORIGINAL 72-PAGE PDF) */
            /* ============================================================== */
            <div className="max-w-2xl mx-auto space-y-7 animate-in fade-in duration-150">
              
              {/* PAGE 1: AUTHENTIC BOOK COVER */}
              {currentPageIndex === 0 && (
                <div className="rounded-2xl bg-[#14213D] text-white p-6 sm:p-10 shadow-xl border border-stone-800 text-center space-y-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#E8871E]/10 rounded-full blur-3xl pointer-events-none" />
                  
                  <div className="text-xs font-mono tracking-widest uppercase text-amber-400 font-bold border-b border-white/10 pb-3">
                    THE INDIAN SALARY MONEY RESET
                  </div>

                  <div className="py-6 space-y-3.5">
                    <h2 className="font-serif-title text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                      WHERE DID MY SALARY GO?
                    </h2>
                    <div className="w-20 h-1.5 bg-[#E8871E] mx-auto rounded-full" />
                    <p className="text-base sm:text-lg text-stone-200 max-w-md mx-auto leading-relaxed pt-2">
                      A practical guide to stopping the leaks, building a safety buffer, and taking control of your money.
                    </p>
                  </div>

                  <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm text-stone-300 gap-2 font-mono">
                    <span>COMPLETE 72-PAGE FIELD MANUAL</span>
                    <span className="text-emerald-400 font-semibold">PAGE 1 OF 6 FREE PREVIEW</span>
                  </div>
                </div>
              )}

              {/* PAGE 2: TITLE & NOTICE / DISCLAIMER */}
              {currentPageIndex === 1 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-stone-200 pb-3 text-xs text-stone-500 font-mono">
                    <span className="uppercase tracking-wider">PRELIMINARY • PAGE 2</span>
                    <span>WHERE DID MY SALARY GO? (72-PAGE EDITION)</span>
                  </div>

                  <div className="text-center py-4 space-y-1.5">
                    <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#14213D]">
                      Where Did My Salary Go?
                    </h3>
                    <p className="text-sm sm:text-base text-stone-600 italic">
                      The Indian Salary Money Reset • Practical Field Manual
                    </p>
                  </div>

                  <div className="p-5 sm:p-6 rounded-2xl bg-[#FBF9F5] border border-stone-300 text-stone-900 space-y-3.5 text-sm sm:text-base leading-relaxed">
                    <div className="font-bold text-[#14213D] uppercase tracking-wider text-xs sm:text-sm flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-[#E8871E]" />
                      <span>Legal Notice &amp; Disclaimer (Page 2 of Original PDF)</span>
                    </div>
                    <p>
                      <strong>Educational Use Only:</strong> This book is for educational and informational purposes only. It is not financial, investment, legal or tax advice. Consult qualified, registered professionals before making important financial decisions.
                    </p>
                    <p>
                      <strong>Composite Case Studies:</strong> All people, salaries and case studies in this book are fictional composite examples created to teach a method. All rupee figures are illustrations, not targets or promises. Nothing here guarantees any return, saving or outcome.
                    </p>
                    <p>
                      <strong>Copyright &amp; Sourcing:</strong> All rights reserved. Wherever the book cites a statistic or a public statement, the Research and Sources appendix explains what it means, and what it does not mean.
                    </p>
                  </div>

                  <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-sm sm:text-base flex items-start gap-2.5">
                    <Info className="w-5 h-5 text-[#E8871E] shrink-0 mt-0.5" />
                    <span>This edition is specifically formatted for salaried professionals in India managing UPI, EMIs, household responsibilities, and tax considerations.</span>
                  </div>
                </div>
              )}

              {/* PAGE 3: TABLE OF CONTENTS (PARTS I & II) */}
              {currentPageIndex === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-stone-200 pb-3 text-xs text-stone-500 font-mono">
                    <span className="uppercase tracking-wider">TABLE OF CONTENTS • PART 1</span>
                    <span>PAGES 1 TO 33 OUTLINE</span>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-xs uppercase font-bold tracking-widest text-[#E8871E] bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-md inline-block">
                      Original PDF Page 3
                    </span>
                    <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#14213D]">
                      Contents • Table of Contents (Part 1)
                    </h3>
                  </div>

                  <div className="space-y-4 text-sm sm:text-base">
                    {/* Preliminaries */}
                    <div className="p-4 bg-stone-50 rounded-xl border border-stone-300 flex items-center justify-between font-medium">
                      <span>How to Use This Book &amp; The Colour-Coded Boxes</span>
                      <span className="font-mono text-stone-600">Page 4</span>
                    </div>

                    <div className="p-4 bg-stone-50 rounded-xl border border-stone-300 flex items-center justify-between font-medium">
                      <span>Salary Credited. Salary Gone. (Introduction)</span>
                      <span className="font-mono text-stone-600">Page 5</span>
                    </div>

                    {/* Part I */}
                    <div className="p-5 bg-white rounded-2xl border border-stone-300 space-y-3">
                      <div className="font-bold text-base text-[#14213D] border-b border-stone-200 pb-2 flex justify-between">
                        <span>Part I: Why Your Salary Disappears</span>
                        <span className="font-mono text-sm text-stone-500">pp. 9–22</span>
                      </div>
                      <div className="space-y-2 text-stone-800 pt-1">
                        <div className="flex justify-between"><span>1. Your Salary Didn&apos;t Disappear</span><span className="font-mono text-stone-500">p. 10</span></div>
                        <div className="flex justify-between"><span>2. The 30-Minute Salary Autopsy</span><span className="font-mono text-stone-500">p. 12</span></div>
                        <div className="flex justify-between"><span>3. The ₹100 Problem</span><span className="font-mono text-stone-500">p. 15</span></div>
                        <div className="flex justify-between"><span>4. The UPI Illusion</span><span className="font-mono text-stone-500">p. 17</span></div>
                        <div className="flex justify-between"><span>5. The Lifestyle Inflation Trap</span><span className="font-mono text-stone-500">p. 19</span></div>
                        <div className="flex justify-between"><span>6. Myth vs Evidence</span><span className="font-mono text-stone-500">p. 21</span></div>
                      </div>
                    </div>

                    {/* Part II */}
                    <div className="p-5 bg-white rounded-2xl border border-stone-300 space-y-3">
                      <div className="font-bold text-base text-[#14213D] border-b border-stone-200 pb-2 flex justify-between">
                        <span>Part II: Repair Your Cash Flow</span>
                        <span className="font-mono text-sm text-stone-500">pp. 23–33</span>
                      </div>
                      <div className="space-y-2 text-stone-800 pt-1">
                        <div className="flex justify-between"><span>7. The Flexible 5-Bucket System</span><span className="font-mono text-stone-500">p. 23</span></div>
                        <div className="flex justify-between"><span>8. The Salary-Day Rule</span><span className="font-mono text-stone-500">p. 25</span></div>
                        <div className="flex justify-between"><span>9. Bills and Subscriptions</span><span className="font-mono text-stone-500">p. 27</span></div>
                        <div className="flex justify-between"><span>10. EMI: The Silent Salary Eater</span><span className="font-mono text-stone-500">p. 28</span></div>
                        <div className="flex justify-between"><span>11. Family Money Is Still Money</span><span className="font-mono text-stone-500">p. 31</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* PAGE 4: TABLE OF CONTENTS (PARTS III TO VII) */}
              {currentPageIndex === 3 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-stone-200 pb-3 text-xs text-stone-500 font-mono">
                    <span className="uppercase tracking-wider">TABLE OF CONTENTS • PART 2</span>
                    <span>PAGES 34 TO 72 OUTLINE</span>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-xs uppercase font-bold tracking-widest text-[#E8871E] bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-md inline-block">
                      Original PDF Page 4
                    </span>
                    <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#14213D]">
                      Contents • Table of Contents (Part 2)
                    </h3>
                  </div>

                  <div className="space-y-4 text-sm sm:text-base">
                    {/* Part III & IV */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="p-4 bg-white rounded-2xl border border-stone-300 space-y-2">
                        <div className="font-bold text-sm text-[#14213D] border-b border-stone-200 pb-1.5">
                          Part III: Financial Safety (pp. 34–38)
                        </div>
                        <div className="space-y-1.5 text-stone-800 text-sm">
                          <div>12. Safety Buffer Level by Level</div>
                          <div>13. Insurance and Protection</div>
                          <div>14. Irregular Expenses</div>
                          <div>15. Financial Stress &amp; Decisions</div>
                        </div>
                      </div>

                      <div className="p-4 bg-white rounded-2xl border border-stone-300 space-y-2">
                        <div className="font-bold text-sm text-[#14213D] border-b border-stone-200 pb-1.5">
                          Part IV: Building Wealth (pp. 39–49)
                        </div>
                        <div className="space-y-1.5 text-stone-800 text-sm">
                          <div>16. Goals Before Products</div>
                          <div>17. Saving vs Investing</div>
                          <div>18. Compounding Made Visible</div>
                          <div>19. Inflation: The Slow Leak</div>
                          <div>20. Avoiding Scams &amp; Bad Advice</div>
                        </div>
                      </div>
                    </div>

                    {/* Part V & VI */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="p-4 bg-white rounded-2xl border border-stone-300 space-y-2">
                        <div className="font-bold text-sm text-[#14213D] border-b border-stone-200 pb-1.5">
                          Part V: Wealthy Lessons (pp. 50–53)
                        </div>
                        <div className="space-y-1.5 text-stone-800 text-sm">
                          <div>22. What We Actually Learn</div>
                          <div>23. Warren Buffett: Long Term</div>
                          <div>24. Bill Gates: Allocate Intentionally</div>
                          <div>25. Elon Musk: Consumption vs Wealth</div>
                          <div>27. What NOT to Copy</div>
                        </div>
                      </div>

                      <div className="p-4 bg-white rounded-2xl border border-stone-300 space-y-2">
                        <div className="font-bold text-sm text-[#14213D] border-b border-stone-200 pb-1.5">
                          Part VI: Real Case Studies (pp. 54–62)
                        </div>
                        <div className="space-y-1.5 text-stone-800 text-sm">
                          <div>28. Case Study: ₹20,000 Salary</div>
                          <div>29. Case Study: ₹30,000 Salary</div>
                          <div>30. Case Study: ₹50,000 Salary</div>
                          <div>31. Case Study: ₹1,00,000 Salary</div>
                          <div>34. The 30-Day Salary Reset</div>
                        </div>
                      </div>
                    </div>

                    {/* Part VII Playbooks */}
                    <div className="p-4 sm:p-5 bg-[#FBF9F5] rounded-2xl border border-stone-300 space-y-2">
                      <div className="font-bold text-sm sm:text-base text-[#14213D] border-b border-stone-200 pb-1.5 flex justify-between">
                        <span>Part VII: Playbooks and Bonus Material</span>
                        <span className="font-mono text-sm text-stone-500">pp. 63–75</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-stone-800 text-sm pt-1">
                        <div>• Twelve Real-Life Money Problems &amp; Fixes (p. 63)</div>
                        <div>• Scripts for Awkward Money Moments (p. 65)</div>
                        <div>• What Self-Made Millionaires Actually Do (p. 66)</div>
                        <div>• The Creator Kit &amp; 30-Day Content Plan (p. 68)</div>
                        <div>• The One-Page Cheat Sheet (p. 71)</div>
                        <div>• Now Every Rupee Has a Job (p. 72)</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* PAGE 5: BEFORE YOU BEGIN: HOW TO USE THIS BOOK */}
              {currentPageIndex === 4 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-stone-200 pb-3 text-xs text-stone-500 font-mono">
                    <span className="uppercase tracking-wider">PRELIMINARY • PAGE 4 OF ORIGINAL PDF</span>
                    <span>BEFORE YOU BEGIN</span>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-xs uppercase font-bold tracking-widest text-[#E8871E] bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-md inline-block">
                      Original PDF Page 5
                    </span>
                    <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#14213D]">
                      BEFORE YOU BEGIN: How to Use This Book
                    </h3>
                  </div>

                  {/* Core Statement Banner */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-[#14213D] text-white text-center space-y-1.5">
                    <div className="font-serif-title text-xl sm:text-2xl font-bold text-amber-400">
                      &ldquo;You do not need to read this book. You need to do it.&rdquo;
                    </div>
                    <p className="text-sm text-stone-300">
                      Most money books are read once and forgotten. This one is built like a field manual plus workbook.
                    </p>
                  </div>

                  <div className="text-sm sm:text-base text-stone-900 space-y-4 leading-relaxed">
                    <p>
                      Almost every chapter ends with something to do: a number to find, a list to make, a transfer to set up. If you only read, nothing changes. If you do the exercises, even imperfectly, you will finish with a complete personal money map.
                    </p>

                    <div className="p-4 sm:p-5 rounded-2xl bg-stone-100 border border-stone-300 space-y-2.5">
                      <div className="font-bold text-xs sm:text-sm uppercase text-[#14213D]">
                        Keep three things beside you:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-sm">
                        <div className="p-3 bg-white rounded-xl border border-stone-200 font-semibold text-stone-800">
                          1. Last month&apos;s bank statement
                        </div>
                        <div className="p-3 bg-white rounded-xl border border-stone-200 font-semibold text-stone-800">
                          2. Your UPI / credit-card history
                        </div>
                        <div className="p-3 bg-white rounded-xl border border-stone-200 font-semibold text-stone-800">
                          3. A pen or a spreadsheet
                        </div>
                      </div>
                    </div>

                    {/* Colour-Coded Boxes */}
                    <div className="space-y-2.5 pt-2">
                      <div className="font-bold text-xs sm:text-sm uppercase text-[#14213D]">
                        The Colour-Coded Boxes in This Manual:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                        <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-950">
                          <strong className="block text-xs uppercase tracking-wider text-blue-800 font-bold">BEHAVIOUR</strong>
                          Research-backed ideas from behavioural economics &amp; psychology.
                        </div>
                        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-950">
                          <strong className="block text-xs uppercase tracking-wider text-amber-800 font-bold">INDIA DATA</strong>
                          Figures from RBI, SEBI, NPCI, MoSPI with contextual analysis.
                        </div>
                        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950">
                          <strong className="block text-xs uppercase tracking-wider text-emerald-800 font-bold">WEALTH LESSON</strong>
                          Documented public habits of self-made figures used as examples.
                        </div>
                        <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200 text-purple-950">
                          <strong className="block text-xs uppercase tracking-wider text-purple-800 font-bold">TRY THIS &amp; KEY IDEA</strong>
                          Small micro-actions to execute before turning the page.
                        </div>
                      </div>
                    </div>

                    {/* A promise and a refusal */}
                    <div className="p-5 rounded-2xl bg-[#FBF9F5] border border-stone-300 space-y-2.5 text-sm sm:text-base">
                      <div className="font-bold text-stone-900 uppercase text-xs sm:text-sm">A Promise, and a Refusal:</div>
                      <p>
                        <strong>The Promise:</strong> By Day 30 you will know where your salary goes, where it should go, and you will have a system that keeps working when your motivation does not.
                      </p>
                      <p>
                        <strong>The Refusal:</strong> This book will not promise you will &quot;become rich&quot;, will not name a &quot;best mutual fund&quot; or &quot;top stock&quot;, and will not sell you billionaire secrets. Money is personal, and anyone who promises guaranteed results is selling something.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* PAGE 6: INTRODUCTION: SALARY CREDITED. SALARY GONE. */}
              {currentPageIndex === 5 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-stone-200 pb-3 text-xs text-stone-500 font-mono">
                    <span className="uppercase tracking-wider">INTRODUCTION • PAGE 5 OF ORIGINAL PDF</span>
                    <span>WHERE DID MY SALARY GO?</span>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-xs uppercase font-bold tracking-widest text-[#E8871E] bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-md inline-block">
                      Original PDF Page 6
                    </span>
                    <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#14213D]">
                      INTRODUCTION: Salary Credited. Salary Gone.
                    </h3>
                    <p className="text-sm sm:text-base text-stone-600 italic">
                      The most common money question in India is not &quot;where should I invest?&quot; It is much simpler.
                    </p>
                  </div>

                  <div className="text-sm sm:text-base text-stone-900 space-y-4 leading-relaxed">
                    <p>
                      Here is a month that will feel familiar to millions of salaried people across India:
                    </p>

                    {/* Verbatim ₹30,000 Salary Leak Table from PDF */}
                    <div className="rounded-2xl overflow-hidden border border-stone-300 bg-white shadow-xs">
                      <div className="bg-[#14213D] text-white px-5 py-3 flex justify-between items-center text-sm sm:text-base font-bold">
                        <span>Salary Credited to Bank Account:</span>
                        <span className="text-amber-400 text-base sm:text-lg">₹30,000</span>
                      </div>
                      
                      <div className="divide-y divide-stone-200 text-sm sm:text-base">
                        <div className="grid grid-cols-2 px-5 py-2.5 bg-stone-100 font-bold text-stone-800">
                          <span>Where it went</span>
                          <span className="text-right">Amount</span>
                        </div>
                        <div className="grid grid-cols-2 px-5 py-2"><span>Rent</span><span className="text-right font-mono font-semibold">₹8,000</span></div>
                        <div className="grid grid-cols-2 px-5 py-2"><span>Groceries</span><span className="text-right font-mono font-semibold">₹4,500</span></div>
                        <div className="grid grid-cols-2 px-5 py-2"><span>Travel to work</span><span className="text-right font-mono font-semibold">₹2,000</span></div>
                        <div className="grid grid-cols-2 px-5 py-2"><span>Family support</span><span className="text-right font-mono font-semibold">₹3,000</span></div>
                        <div className="grid grid-cols-2 px-5 py-2"><span>EMI</span><span className="text-right font-mono font-semibold">₹2,500</span></div>
                        <div className="grid grid-cols-2 px-5 py-2"><span>Food delivery</span><span className="text-right font-mono font-semibold">₹1,800</span></div>
                        <div className="grid grid-cols-2 px-5 py-2"><span>Subscriptions</span><span className="text-right font-mono font-semibold">₹700</span></div>
                        <div className="grid grid-cols-2 px-5 py-2"><span>Shopping</span><span className="text-right font-mono font-semibold">₹1,500</span></div>
                        <div className="grid grid-cols-2 px-5 py-2"><span>Miscellaneous</span><span className="text-right font-mono font-semibold">₹1,200</span></div>
                        <div className="grid grid-cols-2 px-5 py-2"><span>Small UPI payments, cabs, &quot;quick&quot; purchases</span><span className="text-right font-mono font-semibold">₹2,300</span></div>
                        <div className="grid grid-cols-2 px-5 py-2"><span>Outings and gifts</span><span className="text-right font-mono font-semibold">₹2,500</span></div>
                        <div className="grid grid-cols-2 px-5 py-3 bg-amber-50 font-bold text-[#14213D] border-t-2 border-stone-300">
                          <span>TOTAL SPENT</span>
                          <span className="text-right font-mono text-rose-700 font-black">₹30,000</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 sm:p-5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950 font-medium text-sm sm:text-base leading-relaxed">
                      &ldquo;And somehow, by the 24th, the account is empty again. Which expense made you poor? Usually, none of them. There is rarely one ₹10,000 mistake. The real culprit is a system of small, recurring, emotional and unavoidable payments, all happening at once, none of which was ever given a job to do.&rdquo;
                    </div>

                    <p>
                      That is what this book is about. We will not start with definitions of mutual funds, assets and liabilities. We will start with the question that actually hurts: <em>where did my salary go?</em>
                    </p>

                    {/* Next step teaser */}
                    <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                      <span className="text-xs sm:text-sm text-stone-500">Page 6 of 6 Free Preview Finished</span>
                      <button
                        onClick={() => setCurrentPageIndex(6)}
                        type="button"
                        className="text-xs sm:text-sm font-bold text-[#E8871E] hover:underline inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>View Locked Chapters 1 to 34 &rarr;</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}
        </div>

        {/* Modal Bottom Sticky Purchase / Action Bar */}
        <div className="bg-[#F8F5EE] p-4 px-4 sm:px-6 border-t border-stone-300 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs sm:text-sm text-stone-700 text-center sm:text-left flex items-center gap-2">
            <span className="font-serif-title font-bold text-stone-900 text-sm sm:text-base">
              {isUnlocked ? 'Lifetime Access Active' : `Get All 72 Pages + 4 Bonuses for ₹${price}`}
            </span>
            <span className="hidden md:inline text-stone-400">•</span>
            <span className="hidden md:inline text-stone-600">Instant digital PDF download &amp; lifetime access</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {!isUnlocked ? (
              <MagneticButton strength={0.3} maxTilt={6}>
                <a
                  href={SUPERPROFILE_PAYMENT_URL}
                  onClick={() => {
                    trackEvent('click_buy', { source: 'sample_preview_bottom_bar', price: 299, destination: SUPERPROFILE_PAYMENT_URL });
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#E8871E] to-[#D97706] hover:from-[#C97112] hover:to-[#B45309] text-white font-bold text-sm sm:text-base shadow-md transition-all cursor-pointer text-center inline-flex items-center justify-center gap-2 border border-amber-300/30"
                >
                  <span>Unlock Full 72 Pages &amp; Kit (₹299)</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </MagneticButton>
            ) : (
              <a
                href="/Where_Did_My_Salary_Go.pdf"
                download="Where_Did_My_Salary_Go.pdf"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#2E7D5B] hover:bg-[#225C43] text-white font-bold text-sm sm:text-base shadow-md transition-all cursor-pointer text-center inline-flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Original PDF</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
