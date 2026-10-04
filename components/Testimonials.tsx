'use client';

import React from 'react';
import { MessageSquare, ShieldCheck, Sparkles, Heart } from 'lucide-react';
import { TiltPhysicsCard } from '@/components/ui/PhysicsInteractive';

export function Testimonials() {
  return (
    <section id="reviews" className="py-16 sm:py-24 border-b border-white/10 relative text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10 sm:space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3.5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-white/10 text-teal-300 border border-teal-400/30 backdrop-blur-md">
            <MessageSquare className="w-4 h-4 text-teal-400" />
            <span>Community &amp; Feedback</span>
          </div>

          <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            What Readers Are Saying
          </h2>

          <p className="text-base sm:text-lg text-slate-200 font-sans-body leading-relaxed max-w-xl mx-auto">
            Honest feedback from early readers and salaried professionals taking control of their cashflow.
          </p>
        </div>

        {/* Genuine Transparent Reader Box */}
        <TiltPhysicsCard maxAngle={4} enableGlare={false} className="rounded-3xl">
          <div className="p-7 sm:p-10 rounded-3xl bg-[#0F1B33] border border-white/15 shadow-2xl text-center space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-400/40 flex items-center justify-center mx-auto">
              <Heart className="w-7 h-7 text-amber-400" />
            </div>

            <div className="space-y-2 max-w-lg mx-auto">
              <h3 className="font-serif-title text-xl sm:text-2xl font-bold text-white">
                Real Customer Reviews
              </h3>
              <p className="text-sm sm:text-base text-slate-200 font-sans-body leading-relaxed">
                Real customer reviews and reader stories will appear here as readers complete their 30-day Salary Reset journey.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-white/10 max-w-md mx-auto text-xs sm:text-sm text-slate-300 leading-relaxed text-left space-y-2">
              <div className="font-bold text-amber-300 font-mono uppercase text-xs">
                Our Commitment to Authenticity:
              </div>
              <p>
                We do not invent fake star reviews, fabricated personas, or fake urgency counters. We invite every new reader to submit their genuine feedback and breakthroughs to <strong className="text-white">medhastone@gmail.com</strong>.
              </p>
            </div>
          </div>
        </TiltPhysicsCard>
      </div>
    </section>
  );
}
