'use client';

import React from 'react';
import { 
  CheckCircle2, 
  Gift, 
  HardDrive,
  ArrowRight
} from 'lucide-react';
import { SUPERPROFILE_PAYMENT_URL } from '@/lib/constants';
import { trackEvent } from '@/lib/analytics';
import { TiltPhysicsCard } from '@/components/ui/PhysicsInteractive';

export function BonusCreatorBundle() {
  const bundleHighlights = [
    { title: 'Cinematic Video LUTs & Color Grading Packs', count: '1,500+ Presets', desc: 'Transform standard phone footage into cinematic social reels.' },
    { title: 'Sound FX, Whooshes & Ambient Audio Stems', count: '2,000+ Audio FX', desc: 'Crisp sound effects for YouTube, Instagram, and presentations.' },
    { title: 'Motion Graphics, Titles & Transition Overlays', count: '800+ Templates', desc: 'Pre-animated text, lower thirds, and smooth visual cuts.' },
    { title: 'High-Resolution 4K Backgrounds & Textures', count: '5,000+ Assets', desc: 'Abstract, geometric, and gradient textures for video creators.' },
  ];

  return (
    <section className="py-16 sm:py-24 border-b border-white/10 relative text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10 sm:space-y-12">
        
        {/* Curiosity Eyebrow & Intro */}
        <div className="text-center max-w-2xl mx-auto space-y-3.5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-purple-500/20 text-purple-300 border border-purple-400/30 backdrop-blur-md">
            <Gift className="w-4 h-4 text-purple-400" />
            <span>Extra Value Discovery</span>
          </div>

          <p className="font-serif-title text-xl sm:text-2xl text-slate-300 italic">
            &ldquo;You came for a salary reset…&rdquo;
          </p>

          <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            …but there’s <span className="text-purple-300">one more bonus.</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-200 font-sans-body">
            If you create digital content, edit videos, or manage personal brands, we included our complete production archive:
          </p>
        </div>

        {/* 500GB Creator Bundle Card */}
        <TiltPhysicsCard maxAngle={4} enableGlare={false} className="rounded-3xl">
          <div className="p-6 sm:p-9 rounded-3xl bg-[#140D24] border border-purple-500/40 shadow-2xl space-y-6">
            
            {/* Header Badge */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-purple-500/25 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-400/40 flex items-center justify-center font-bold">
                  <HardDrive className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase font-bold text-amber-300 tracking-wider">
                    SPECIAL DIGITAL BONUS
                  </span>
                  <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-white">
                    The 500GB Creator Editor Bundle
                  </h3>
                </div>
              </div>

              <span className="text-xs font-mono font-bold text-purple-300 bg-purple-500/20 border border-purple-400/30 px-3.5 py-1.5 rounded-full">
                Assigned Value: ₹3,999 • Included FREE
              </span>
            </div>

            {/* Inclusions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {bundleHighlights.map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white/[0.04] border border-purple-500/20 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm sm:text-base text-purple-200">{item.title}</span>
                  </div>
                  <div className="text-xs text-amber-300 font-mono font-semibold">{item.count}</div>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Cloud Drive Access Note + Direct CTA */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  High-speed cloud download links with unlimited re-downloads and lifetime access directly in your delivery portal.
                </span>
              </div>

              <a
                href={SUPERPROFILE_PAYMENT_URL}
                onClick={() => {
                  trackEvent('click_buy', { source: 'bonus_bundle_cta', price: 299, destination: SUPERPROFILE_PAYMENT_URL });
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#E8871E] to-[#D97706] hover:from-[#C97112] hover:to-[#B45309] text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5 shrink-0 border border-amber-300/30 cursor-pointer"
              >
                <span>Unlock Kit + 500GB Bundle — ₹299</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </TiltPhysicsCard>
      </div>
    </section>
  );
}
