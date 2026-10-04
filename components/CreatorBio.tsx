'use client';

import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { TiltPhysicsCard } from '@/components/ui/PhysicsInteractive';

export function CreatorBio() {
  const philosophyItems = [
    { title: 'Simple > complicated', desc: 'No convoluted Wall Street terminology or confusing formulas.' },
    { title: 'Practical > theoretical', desc: 'Engineered for real Indian bank accounts, UPI apps, and EMIs.' },
    { title: 'Systems > motivation', desc: 'Automatic rules that execute on salary day even when willpower is zero.' },
    { title: 'Consistency > perfection', desc: 'A sustainable 10-minute monthly habit that compounds over years.' }
  ];

  return (
    <section id="author" className="py-16 sm:py-24 border-b border-white/10 relative text-white scroll-mt-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <TiltPhysicsCard maxAngle={4} className="rounded-3xl">
          <div className="p-7 sm:p-10 rounded-3xl bg-[#0F1B33] border border-white/15 backdrop-blur-md shadow-2xl flex flex-col md:flex-row items-start gap-7 sm:gap-9">
            {/* Creator Avatar / Monogram */}
            <div className="shrink-0 flex flex-col items-center text-center mx-auto md:mx-0">
              <div className="w-28 h-28 rounded-3xl bg-[#E8871E] text-slate-950 flex items-center justify-center font-serif-title font-bold text-4xl shadow-xl border-2 border-amber-300">
                K
              </div>
              <div className="mt-3 text-xs sm:text-sm font-mono font-bold text-amber-300 uppercase tracking-wider">
                Medhastone
              </div>
            </div>

            {/* Bio & Philosophy Copy */}
            <div className="space-y-5 text-left flex-1">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs sm:text-sm font-semibold bg-teal-500/20 text-teal-300 border border-teal-400/40 mb-2.5 backdrop-blur-md">
                  <Sparkles className="w-4 h-4 text-teal-400" />
                  <span>The Author &amp; Creator</span>
                </div>
                <h3 className="font-serif-title text-3xl sm:text-4xl font-bold text-white">
                  Meet Krchandan
                </h3>
                <div className="text-sm sm:text-base font-semibold text-amber-300 mt-0.5">
                  Founder &amp; Creator, Medhastone
                </div>
              </div>

              <div className="space-y-3 text-slate-200 text-base sm:text-lg leading-relaxed font-sans-body">
                <p>
                  &ldquo;I create practical digital products, tools and guides designed to make complicated problems easier to understand and easier to act on.&rdquo;
                </p>
                <p className="text-amber-200/90 font-serif-title text-lg sm:text-xl font-bold pt-1">
                  &ldquo;Salary Reset was created around one simple idea: Before you try to change your money, you need to see what is actually happening to it.&rdquo;
                </p>
              </div>

              {/* Philosophy Grid */}
              <div className="pt-3 border-t border-white/10 space-y-3">
                <div className="text-xs sm:text-sm uppercase font-bold tracking-wider text-slate-300 font-mono">
                  Core Design Philosophy:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {philosophyItems.map((p) => (
                    <div key={p.title} className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 shadow-xs space-y-1">
                      <div className="font-bold text-white text-sm sm:text-base">{p.title}</div>
                      <div className="text-xs sm:text-sm text-slate-200 leading-relaxed">{p.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </TiltPhysicsCard>
      </div>
    </section>
  );
}
