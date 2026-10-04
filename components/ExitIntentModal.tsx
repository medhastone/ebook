'use client';

import React, { useState } from 'react';
import { X, FileSpreadsheet, Send, CheckCircle2, Download, Sparkles } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import { MagneticButton } from '@/components/ui/PhysicsInteractive';

interface ExitIntentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ExitIntentModal({ isOpen, onClose }: ExitIntentModalProps) {
  const [contactType, setContactType] = useState<'whatsapp' | 'email'>('whatsapp');
  const [contactValue, setContactValue] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactValue.trim()) return;

    trackEvent('lead_submit', {
      source: 'exit_intent_modal',
      type: contactType,
      contact: contactValue,
    });
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-[#0E1A33] text-white rounded-3xl shadow-2xl border border-white/20 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-white/10 text-white p-6 pb-7 text-center relative border-b border-white/10">
          <button
            onClick={onClose}
            type="button"
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-14 h-14 rounded-2xl bg-[#E8871E] text-white flex items-center justify-center mx-auto mb-3.5 shadow-lg">
            <FileSpreadsheet className="w-7 h-7" />
          </div>

          <div className="inline-flex items-center gap-1.5 text-xs uppercase font-bold tracking-widest text-amber-300 bg-white/10 px-3 py-1 rounded-full mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Free Reader Toolkit
          </div>

          <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-white leading-tight">
            Wait! Don&apos;t leave your money leaks unchecked.
          </h3>
          <p className="text-sm text-slate-200 mt-1.5 font-sans-body">
            Get the Free 30-Day UPI Leak Audit Sheet (Excel &amp; Notion) before you go.
          </p>
        </div>

        {/* Content & Form */}
        <div className="p-6 sm:p-7">
          {!submitted ? (
            <div className="space-y-4">
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed text-center">
                This exact spreadsheet helped our beta readers plug an average of <strong className="text-amber-300">₹5,400 in hidden Swiggy, Blinkit, and auto-debit leaks</strong> in their first 3 weeks.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center justify-center gap-5 text-sm font-semibold text-slate-100">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={contactType === 'whatsapp'}
                      onChange={() => setContactType('whatsapp')}
                      className="accent-[#E8871E]"
                    />
                    <span>Send to WhatsApp</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={contactType === 'email'}
                      onChange={() => setContactType('email')}
                      className="accent-[#E8871E]"
                    />
                    <span>Send to Email</span>
                  </label>
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    type={contactType === 'whatsapp' ? 'tel' : 'email'}
                    required
                    placeholder={contactType === 'whatsapp' ? '+91 98765 43210' : 'name@example.com'}
                    value={contactValue}
                    onChange={(e) => setContactValue(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-xl border border-white/25 text-sm bg-white/10 text-white placeholder:text-slate-400 focus:outline-none focus:border-amber-400"
                  />
                  <MagneticButton strength={0.3}>
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-[#E8871E] to-[#D97706] hover:from-[#C97112] hover:to-[#B45309] text-white text-sm font-bold transition-all shadow-md cursor-pointer shrink-0 inline-flex items-center justify-center gap-2 border border-amber-300/30"
                    >
                      <Send className="w-4 h-4" />
                      <span>Get Free Sheet</span>
                    </button>
                  </MagneticButton>
                </div>
                <div className="text-xs text-slate-400 text-center">
                  100% Free • Zero Spam • No sales phone calls ever
                </div>
              </form>

              <div className="pt-2 text-center">
                <button
                  onClick={onClose}
                  type="button"
                  className="text-xs sm:text-sm text-slate-400 hover:text-slate-200 transition-colors cursor-pointer underline"
                >
                  No thanks, I will manage my salary leaks myself
                </button>
              </div>
            </div>
          ) : (
            <div className="py-4 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center mx-auto border border-emerald-400/30">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-serif-title text-2xl font-bold text-white">
                  Audit Sheet Dispatched!
                </h4>
                <p className="text-sm text-slate-200 mt-1">
                  We sent the download link to your {contactType === 'whatsapp' ? 'WhatsApp' : 'inbox'}.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.05] border border-white/10 text-sm text-slate-200">
                You can also download the starter Excel template directly right now:
              </div>

              <div className="flex justify-center gap-2">
                <button
                  onClick={onClose}
                  type="button"
                  className="px-6 py-3 rounded-xl bg-[#2E7D5B] text-white text-sm font-bold hover:bg-[#225C43] transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Starter Template</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
