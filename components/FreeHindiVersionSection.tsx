'use client';

import React, { useState } from 'react';
import { Languages, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { SUPERPROFILE_PAYMENT_URL } from '@/lib/constants';
import { trackEvent } from '@/lib/analytics';
import { TiltPhysicsCard } from '@/components/ui/PhysicsInteractive';

export function FreeHindiVersionSection() {
  const [lang, setLang] = useState<'en' | 'hi'>('hi');

  const englishSnippet = {
    title: 'Chapter 2: The 30-Minute Salary Autopsy',
    quote: 'Your salary didn’t disappear into thin air. It followed a predictable pipeline of frictionless digital triggers and auto-debits that you never assigned a boundary to.',
    takeaways: [
      'Understand your Salary Half-Life (the exact day 50% of your money is gone)',
      'Decouple daily UPI QR scanning from your primary savings account',
      'The 48-Hour Cart Cool-Off technique for instant commerce cravings',
    ],
  };

  const hindiSnippet = {
    title: 'अध्याय 2: वेतन का 30 मिनट का पोस्टमार्टम',
    quote: 'आपका वेतन कहीं गायब नहीं हुआ। यह उन दर्जनों छोटे-छोटे डिजिटल खर्चों और बिना सोचे-समझे किए गए यूपीआई भुगतानों में चला गया, जिन्हें आपने पहली तारीख को कोई काम नहीं सौंपा था।',
    takeaways: [
      'अपने सैलरी हाफ-लाइफ को पहचानें (महीने का वह दिन जब 50% वेतन खर्च हो जाता है)',
      'दैनिक यूपीआई खर्च को अपने मुख्य बचत खाते से पूरी तरह अलग करें',
      'त्वरित ऑनलाइन डिलीवरी ऐप के लिए 48-घंटे का कूल-ऑफ नियम अपनाएं',
    ],
  };

  const current = lang === 'hi' ? hindiSnippet : englishSnippet;

  return (
    <section className="py-16 sm:py-24 border-b border-white/10 relative text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10 sm:space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3.5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-white/10 text-amber-300 border border-amber-400/30 backdrop-blur-md">
            <Languages className="w-4 h-4 text-amber-400" />
            <span>Dual-Language Access Included</span>
          </div>

          <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Read It In The Language <br />
            <span className="text-teal-300">That Feels Natural.</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-200 font-sans-body leading-relaxed max-w-xl mx-auto">
            The complete Hindi edition is included with your purchase at no extra cost.
          </p>

          {/* Interactive Language Toggle */}
          <div className="inline-flex items-center p-1.5 rounded-2xl bg-white/10 border border-white/15 gap-1.5 mt-2">
            <button
              onClick={() => setLang('en')}
              type="button"
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                lang === 'en'
                  ? 'bg-[#E8871E] text-slate-950 shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              [ ENGLISH ]
            </button>
            <button
              onClick={() => setLang('hi')}
              type="button"
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                lang === 'hi'
                  ? 'bg-teal-500 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              [ हिंदी संस्करण ]
            </button>
          </div>
        </div>

        {/* Dynamic Sample Snippet Card */}
        <TiltPhysicsCard maxAngle={4} enableGlare={false} className="rounded-3xl">
          <div className="p-6 sm:p-9 rounded-3xl bg-[#0F1B33] border border-white/15 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">{lang === 'hi' ? '🇮🇳' : '📘'}</span>
                <div>
                  <span className="text-xs font-mono uppercase text-amber-300 font-bold tracking-wider">
                    {lang === 'hi' ? 'हिंदी संस्करण नमूना पृष्ठ' : 'English Edition Sample'}
                  </span>
                  <h3 className="font-serif-title text-lg sm:text-xl font-bold text-white">
                    {current.title}
                  </h3>
                </div>
              </div>

              <span className="text-xs font-mono text-emerald-300 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 font-bold hidden sm:inline">
                Included Free
              </span>
            </div>

            {/* Quote */}
            <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-2">
              <div className="text-xs font-mono uppercase text-teal-300 font-bold">
                {lang === 'hi' ? 'मुख्य विचार:' : 'Core Concept:'}
              </div>
              <p className="font-serif-title text-base sm:text-lg text-slate-100 italic leading-relaxed">
                &ldquo;{current.quote}&rdquo;
              </p>
            </div>

            {/* Takeaways */}
            <div className="space-y-3">
              <div className="text-xs font-mono uppercase text-slate-300 font-bold">
                {lang === 'hi' ? 'इस अध्याय में आप क्या सीखेंगे:' : 'What you learn in this chapter:'}
              </div>
              <div className="space-y-2 text-xs sm:text-sm text-slate-200">
                {current.takeaways.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 text-xs text-slate-400 font-mono border-t border-white/10 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
              <span>
                Both English (PDF/EPUB) and Hindi (&apos;मेरा वेतन कहाँ चला गया?&apos;) editions delivered immediately.
              </span>

              <a
                href={SUPERPROFILE_PAYMENT_URL}
                onClick={() => {
                  trackEvent('click_buy', { source: 'hindi_section_cta', price: 299, destination: SUPERPROFILE_PAYMENT_URL });
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#E8871E] to-[#D97706] hover:from-[#C97112] hover:to-[#B45309] text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5 shrink-0 border border-amber-300/30 cursor-pointer"
              >
                <span>Get Both Editions — ₹299</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </TiltPhysicsCard>
      </div>
    </section>
  );
}
