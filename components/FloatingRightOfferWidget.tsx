'use client';

import React, { useState } from 'react';
import { Tag, ArrowRight, Copy, Check, Sparkles, X, Gift } from 'lucide-react';
import { SUPERPROFILE_PAYMENT_URL, COUPON_CODE } from '@/lib/constants';
import { trackEvent } from '@/lib/analytics';

interface FloatingRightOfferWidgetProps {
  price?: number;
  regularPrice?: number;
}

export function FloatingRightOfferWidget({
  price = 299,
  regularPrice = 399,
}: FloatingRightOfferWidgetProps) {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isDismissed, setIsDismissed] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  const handleCopyCoupon = (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      navigator.clipboard.writeText(COUPON_CODE);
      setIsCopied(true);
      trackEvent('apply_coupon_success', { coupon: COUPON_CODE, source: 'floating_right_widget' });
      setTimeout(() => setIsCopied(false), 2500);
    } catch {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  if (isDismissed) return null;

  // Minimized Floating Pill on Right
  if (isMinimized) {
    return (
      <div className="fixed right-3 top-1/2 -translate-y-1/2 z-30 hidden md:block">
        <button
          onClick={() => setIsMinimized(false)}
          className="px-3 py-3 rounded-l-2xl bg-gradient-to-r from-[#E8871E] to-[#D97706] text-white font-bold text-xs shadow-2xl flex items-center gap-2 border-l border-y border-amber-300/40 hover:scale-105 transition-all cursor-pointer group"
          title="Open Offer"
        >
          <Gift className="w-4 h-4 animate-bounce text-amber-200" />
          <span className="writing-mode-vertical font-mono tracking-wider">OFFER ₹299</span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 hidden md:block max-w-[240px] w-full animate-fade-in pointer-events-none">
      <div className="pointer-events-auto p-4 rounded-2xl bg-[#091325]/95 border-2 border-amber-400/60 shadow-[0_0_30px_rgba(232,135,30,0.25)] backdrop-blur-md relative overflow-hidden text-white transition-all duration-300 hover:border-amber-400 hover:shadow-[0_0_40px_rgba(232,135,30,0.4)]">
        
        {/* Animated Ambient Pulse Background */}
        <div className="absolute -top-12 -right-12 w-28 h-28 rounded-full bg-amber-500/20 blur-xl pointer-events-none animate-pulse" />
        <div className="absolute -bottom-10 -left-10 w-24 h-24 rounded-full bg-teal-500/20 blur-xl pointer-events-none" />

        {/* Action Controls: Minimize & Dismiss */}
        <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-2.5">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-300 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
            <span>Limited Offer</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsMinimized(true)}
              className="text-slate-400 hover:text-white text-[10px] font-mono p-1 rounded hover:bg-white/10 cursor-pointer"
              title="Minimize"
            >
              _
            </button>
            <button
              onClick={() => setIsDismissed(true)}
              className="text-slate-400 hover:text-white p-1 rounded hover:bg-white/10 cursor-pointer"
              title="Close"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Pricing Header */}
        <div className="space-y-1 mb-3">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-amber-300 font-serif-title tracking-tight">
              ₹{price}
            </span>
            <span className="text-xs text-slate-400 line-through font-mono">
              ₹{regularPrice}
            </span>
            <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[10px] font-bold font-mono ml-auto">
              SAVE ₹100
            </span>
          </div>
          <p className="text-[11px] text-slate-300 font-sans-body leading-tight">
            Salary Reset Money Kit + 12 Tools
          </p>
        </div>

        {/* Copy Coupon Box */}
        <div 
          onClick={handleCopyCoupon}
          className="p-2 rounded-xl bg-amber-500/10 border border-amber-400/30 hover:border-amber-400/70 transition-all cursor-pointer group mb-3 flex items-center justify-between gap-2"
          title="Click to copy coupon code"
        >
          <div className="flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <div className="text-[10px]">
              <span className="text-slate-400 block text-[9px] uppercase font-mono">Use Coupon</span>
              <span className="font-mono font-bold text-amber-300 tracking-wider text-xs">
                {COUPON_CODE}
              </span>
            </div>
          </div>

          <button 
            type="button"
            className="px-2 py-1 rounded-lg bg-amber-400/20 text-amber-200 text-[10px] font-mono font-bold flex items-center gap-1 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors"
          >
            {isCopied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400 group-hover:text-slate-950" />
                <span>COPIED</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>COPY</span>
              </>
            )}
          </button>
        </div>

        {/* Animated GET IT NOW CTA Button */}
        <a
          href={SUPERPROFILE_PAYMENT_URL}
          onClick={() => {
            trackEvent('click_buy', { source: 'floating_right_widget', price, coupon: COUPON_CODE });
          }}
          className="relative group/btn w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#E8871E] via-[#F59E0B] to-[#D97706] text-slate-950 font-extrabold text-xs tracking-wider uppercase shadow-xl hover:shadow-[0_0_25px_rgba(232,135,30,0.6)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 overflow-hidden border border-amber-200/50 cursor-pointer text-center"
        >
          {/* Pulsing Light Beam Animation */}
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/btn:animate-shimmer" />

          <span className="relative z-10 font-bold">GET IT NOW • ₹{price}</span>
          <ArrowRight className="w-4 h-4 text-slate-950 group-hover/btn:translate-x-1 transition-transform relative z-10" />
        </a>

        {/* Sub-label */}
        <div className="mt-2 text-[10px] text-center text-slate-400 font-mono">
          Instant PDF + Excel Access
        </div>

      </div>
    </div>
  );
}
