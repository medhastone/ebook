'use client';

import React from 'react';
import { Sparkles, ShoppingBag, Coffee, Smartphone, Zap, AlertCircle, Flame } from 'lucide-react';
import { TiltPhysicsCard } from '@/components/ui/PhysicsInteractive';

export function CuriosityHookSection() {
  const micropayments = [
    { label: '₹149 Quick Delivery', note: 'Zepto/Blinkit midnight snacking & convenience surcharges', icon: Coffee, color: 'border-amber-400/40 bg-[#16233B]' },
    { label: '₹299 Unused OTT Subscription', note: 'Gym apps, OTTs & memberships auto-debiting quietly', icon: Smartphone, color: 'border-teal-400/40 bg-[#122438]' },
    { label: '₹1,299 "No-Cost" EMI', note: 'Gadget installments that silently eat 35%+ of take-home pay', icon: ShoppingBag, color: 'border-purple-400/40 bg-[#1E1B38]' },
    { label: '₹450 Weekend Cab Surge', note: 'Daily commute convenience adds up to ₹6,000+ per month', icon: Zap, color: 'border-yellow-400/40 bg-[#1A2235]' },
    { label: '₹799 Weekend Dining Out', note: 'Café meetups & impulse weekend treat orders', icon: Flame, color: 'border-rose-400/40 bg-[#251A28]' },
    { label: '₹199 Late Fee Surcharges', note: 'Credit card interest & missed bill payment penalties', icon: AlertCircle, color: 'border-red-400/40 bg-[#261720]' },
  ];

  return (
    <section className="py-14 sm:py-20 border-b border-white/10 relative text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-8">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-amber-300 border border-white/15">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>The Core Insight</span>
        </div>

        {/* Curiosity Hook Headline */}
        <div className="space-y-4 max-w-3xl mx-auto">
          <h2 className="font-serif-title text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-snug">
            &ldquo;Your salary may not be disappearing because of one big purchase.{' '}
            <span className="text-amber-400 block mt-1 bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
              It may be disappearing through dozens of small decisions you barely notice.&rdquo;
            </span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto font-sans-body">
            You don&apos;t wake up and decide to blow half your monthly pay. Instead, modern frictionless commerce slowly chips it away.
          </p>
        </div>

        {/* Interactive Physics Example Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 pt-2 text-left">
          {micropayments.map((item) => {
            const Icon = item.icon;
            return (
              <TiltPhysicsCard key={item.label} maxAngle={8} className="rounded-2xl">
                <div 
                  className={`p-4 rounded-2xl border ${item.color} shadow-lg transition-all h-full flex flex-col justify-between`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="font-serif-title font-bold text-sm sm:text-base text-white">
                      {item.label}
                    </span>
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-300 font-sans-body">
                    {item.note}
                  </div>
                </div>
              </TiltPhysicsCard>
            );
          })}
        </div>

        {/* Takeaway Insight */}
        <TiltPhysicsCard maxAngle={4} className="rounded-2xl">
          <div className="p-5 rounded-2xl bg-[#0F1B33] border border-white/15 text-left flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs sm:text-sm">
              <strong className="text-white block font-serif-title text-sm sm:text-base">
                The Pattern That Fixes Everything
              </strong>
              <p className="text-slate-300 leading-relaxed font-sans-body">
                The goal isn&apos;t to live like a monk or stop drinking coffee. It is to give your money structure before the month starts — so you can enjoy your life without the 3 AM dread of an empty bank account.
              </p>
            </div>
          </div>
        </TiltPhysicsCard>
      </div>
    </section>
  );
}
