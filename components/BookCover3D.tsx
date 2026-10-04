'use client';

import React from 'react';
import { Sparkles, ShieldCheck, Download, BookOpen } from 'lucide-react';

interface BookCover3DProps {
  className?: string;
  onPreviewClick?: () => void;
}

export function BookCover3D({ className = '', onPreviewClick }: BookCover3DProps) {
  return (
    <div className={`relative flex flex-col items-center justify-center group ${className}`}>
      {/* Glow highlight behind book */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-[#E8871E]/20 via-[#2E7D5B]/15 to-transparent rounded-3xl blur-2xl -z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-500" />

      {/* 3D Book Container */}
      <div 
        className="relative w-[240px] sm:w-[270px] md:w-[300px] h-[370px] sm:h-[410px] md:h-[450px] transition-transform duration-500 ease-out transform group-hover:-translate-y-2 group-hover:rotate-1"
        style={{ perspective: '1200px' }}
      >
        {/* Book spine simulation effect on the left */}
        <div 
          className="relative w-full h-full rounded-r-xl rounded-l-md overflow-hidden flex flex-col justify-between p-6 sm:p-7 text-white shadow-2xl border-l-[10px] border-[#0A1120]"
          style={{
            background: 'linear-gradient(135deg, #14213D 0%, #0F172A 70%, #1E293B 100%)',
            boxShadow: '18px 24px 38px -10px rgba(20, 33, 61, 0.45), 5px 8px 16px rgba(0,0,0,0.25), inset 3px 0 8px rgba(255,255,255,0.15)'
          }}
        >
          {/* Subtle paper / linen pattern lines */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          {/* Top header badge */}
          <div className="relative z-10 flex items-center justify-between border-b border-white/15 pb-3">
            <span className="text-[10px] font-bold tracking-widest uppercase text-[#E8871E] flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              The Indian Salary Reset
            </span>
            <span className="text-[9px] px-2 py-0.5 rounded-full bg-white/10 text-white/90 border border-white/10 font-medium">
              2026 EDITION
            </span>
          </div>

          {/* Title and Subtitle */}
          <div className="relative z-10 my-auto text-left py-2">
            <div className="text-[11px] uppercase tracking-wider font-semibold text-emerald-400 mb-1">
              30-Day Practical Cashflow Blueprint
            </div>
            <h3 className="font-serif-title text-2xl sm:text-3xl md:text-[32px] font-bold leading-tight tracking-tight text-white mb-2">
              Where Did <br />
              <span className="text-[#E8871E] underline decoration-[#E8871E]/40 underline-offset-4">
                My Salary Go?
              </span>
            </h3>
            <p className="text-[11px] sm:text-xs text-white/75 leading-relaxed font-sans-body">
              How Indian salaried professionals earning ₹15,000–₹1,00,000 plug silent UPI leaks, tame EMIs, and build savings without quitting weekend life.
            </p>
          </div>

          {/* Book Bottom Badge & Included items */}
          <div className="relative z-10 pt-3 border-t border-white/15 space-y-2">
            <div className="flex items-center justify-between text-[10px] text-white/80">
              <span className="flex items-center gap-1 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2E7D5B]" />
                Zero Jargon • Real Hindi-Eng Examples
              </span>
              <span className="text-[#E8871E] font-bold">72 Pages</span>
            </div>
            
            <div className="bg-white/10 rounded-lg p-2 backdrop-blur-sm border border-white/10 flex items-center justify-between">
              <div className="text-[10px] text-amber-200 font-medium flex items-center gap-1">
                <Download className="w-3 h-3 text-[#E8871E]" />
                <span>Includes 4 Bonuses (UPI Sheet + Notion)</span>
              </div>
            </div>
          </div>

          {/* Spine crease shine */}
          <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-black/40 via-white/10 to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Action preview pill */}
      {onPreviewClick && (
        <button
          onClick={onPreviewClick}
          type="button"
          className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-[#14213D] text-xs font-semibold shadow-md border border-stone-200 hover:border-[#E8871E] hover:text-[#E8871E] transition-all cursor-pointer"
        >
          <BookOpen className="w-3.5 h-3.5 text-[#E8871E]" />
          <span>Click to Preview 6 Sample Pages (Original PDF)</span>
        </button>
      )}

      {/* Reader Trust Tagline */}
      <div className="mt-2 text-center text-xs text-stone-500 font-medium flex items-center gap-1.5">
        <span className="flex text-amber-500">★★★★★</span>
        <span>4.9 / 5 from 42 early beta readers</span>
      </div>
    </div>
  );
}
