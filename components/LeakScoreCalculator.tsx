'use client';

import React, { useState, useEffect, useId } from 'react';
import { 
  Calculator, 
  Send, 
  CheckCircle2, 
  Share2, 
  Copy, 
  Download, 
  FileSpreadsheet, 
  Check 
} from 'lucide-react';
import { formatINR } from '@/lib/formatters';
import { trackEvent } from '@/lib/analytics';
import { TiltPhysicsCard, MagneticButton } from '@/components/ui/PhysicsInteractive';

export function LeakScoreCalculator() {
  const [salary, setSalary] = useState<number>(40000);
  const [foodDelivery, setFoodDelivery] = useState<number>(4500);
  const [subscriptions, setSubscriptions] = useState<number>(1200);
  const [quickCommerce, setQuickCommerce] = useState<number>(3200);
  const [unplannedSocial, setUnplannedSocial] = useState<number>(2500);

  // Capture state
  const [contactType, setContactType] = useState<'whatsapp' | 'email'>('whatsapp');
  const [contactValue, setContactValue] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Generate unique IDs for accessibility
  const salaryId = useId();
  const foodDeliveryId = useId();
  const subscriptionsId = useId();
  const quickCommerceId = useId();
  const unplannedSocialId = useId();

  // Math
  const totalMonthlyLeak = foodDelivery + subscriptions + quickCommerce + unplannedSocial;
  const leakScore = salary > 0 ? Math.min(100, Math.round((totalMonthlyLeak / salary) * 100)) : 0;
  const annualLeakage = totalMonthlyLeak * 12;

  useEffect(() => {
    trackEvent('view_calculator', { tool: 'leak_score_calculator' });
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      trackEvent('calc_complete', {
        tool: 'leak_score',
        salary,
        totalMonthlyLeak,
        leakScore,
        annualLeakage,
      });
    }, 1200);
    return () => clearTimeout(handler);
  }, [salary, totalMonthlyLeak, leakScore, annualLeakage]);

  const getDiagnosis = (score: number) => {
    if (score <= 12) {
      return {
        level: 'Controlled & Healthy (Low Risk)',
        color: 'text-emerald-300 bg-emerald-500/20 border-emerald-400/40',
        barColor: 'bg-emerald-400',
        message: 'Your discretionary leaks are well contained. You have strong baseline control over impulse spends.',
      };
    } else if (score <= 25) {
      return {
        level: 'Moderate Silent Leakage (Warning)',
        color: 'text-amber-300 bg-amber-500/20 border-amber-400/40',
        barColor: 'bg-amber-400',
        message: 'You are losing 15% to 25% of your sweat to frictionless UPI taps. A quick 30-day reset will unlock surplus.',
      };
    } else {
      return {
        level: 'Severe Cashflow Hemorrhage (Critical)',
        color: 'text-rose-300 bg-rose-500/20 border-rose-400/40',
        barColor: 'bg-rose-500',
        message: 'Your salary is being eaten alive by auto-debits and quick commerce before you can invest. You need the reset urgently.',
      };
    }
  };

  const diagnosis = getDiagnosis(leakScore);

  const handleSubmitLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactValue.trim()) return;
    trackEvent('lead_submit', {
      type: contactType,
      contact: contactValue,
      salary,
      leakScore,
      annualLeakage,
    });
    setIsSubmitted(true);
  };

  const handleWhatsAppShare = () => {
    trackEvent('share_whatsapp', { leakScore, annualLeakage });
    const shareText = encodeURIComponent(
      `I just calculated my Salary Leak Score on "Where Did My Salary Go?". My Leak Score is ${leakScore}% (losing ${formatINR(annualLeakage)}/year to silent UPI micropayments!). Check where your paycheck is disappearing here: https://salaryreset.in`
    );
    window.open(`https://api.whatsapp.com/send?text=${shareText}`, '_blank');
  };

  const handleCopyCard = () => {
    const textToCopy = `My Salary Leak Score is ${leakScore}% (${formatINR(annualLeakage)} lost annually to silent UPI spends). Checked on "Where Did My Salary Go?": https://salaryreset.in`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <section id="leak-calculator" className="py-16 sm:py-24 border-b border-white/10 scroll-mt-14 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Tool Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-white/10 text-amber-300 border border-white/15 backdrop-blur-md mb-4">
            <Calculator className="w-4 h-4 text-amber-400" />
            <span>Interactive Tool 1 of 3</span>
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Free Salary Leak Score Calculator
          </h2>
          <p className="mt-4 text-slate-200 text-base sm:text-lg leading-relaxed">
            Move the sliders below to reveal how much of your monthly income vanishes into invisible micropayments, convenience apps, and auto-debits.
          </p>
        </div>

        {/* 2-Column Calculator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Left Column: Sliders & Inputs (7 cols) */}
          <div className="lg:col-span-7">
            <TiltPhysicsCard maxAngle={6} enableGlare={false} className="rounded-3xl">
              <div className="bg-[#0F1B33] rounded-3xl border border-white/15 p-6 sm:p-8 shadow-2xl space-y-7">
                <div className="space-y-3.5">
                  <div className="flex justify-between items-baseline">
                    <label htmlFor={salaryId} className="text-sm sm:text-base font-bold text-white">
                      1. Your Monthly In-Hand Salary
                    </label>
                    <span className="font-serif-title text-2xl font-bold text-amber-300">
                      {formatINR(salary)}
                    </span>
                  </div>
                  <input
                    id={salaryId}
                    type="range"
                    min={15000}
                    max={250000}
                    step={2500}
                    value={salary}
                    onChange={(e) => setSalary(Number(e.target.value))}
                    className="w-full h-2.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#E8871E]"
                  />
                  <div className="flex justify-between text-xs text-slate-300 font-mono">
                    <span>₹15,000</span>
                    <span>₹1,00,000</span>
                    <span>₹2,50,000</span>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-5 space-y-5">
                  <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-300">
                    Discretionary &amp; Silent Leaks (Monthly)
                  </div>

                  {/* Food Delivery */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-baseline">
                      <label htmlFor={foodDeliveryId} className="text-sm font-semibold text-slate-100">
                        Swiggy, Zomato &amp; Eating Out
                      </label>
                      <span className="font-mono text-base font-bold text-white">
                        {formatINR(foodDelivery)}
                      </span>
                    </div>
                    <input
                      id={foodDeliveryId}
                      type="range"
                      min={0}
                      max={25000}
                      step={500}
                      value={foodDelivery}
                      onChange={(e) => setFoodDelivery(Number(e.target.value))}
                      className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-amber-400"
                    />
                    <div className="text-xs text-slate-300">Late night cravings, office lunches &amp; weekend dining</div>
                  </div>

                  {/* Subscriptions */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-baseline">
                      <label htmlFor={subscriptionsId} className="text-sm font-semibold text-slate-100">
                        OTT, Cloud Storage &amp; App Subscriptions
                      </label>
                      <span className="font-mono text-base font-bold text-white">
                        {formatINR(subscriptions)}
                      </span>
                    </div>
                    <input
                      id={subscriptionsId}
                      type="range"
                      min={0}
                      max={8000}
                      step={200}
                      value={subscriptions}
                      onChange={(e) => setSubscriptions(Number(e.target.value))}
                      className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-purple-400"
                    />
                    <div className="text-xs text-slate-300">Netflix, Prime, Spotify, iCloud, YouTube Premium auto-debits</div>
                  </div>

                  {/* Quick Commerce */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-baseline">
                      <label htmlFor={quickCommerceId} className="text-sm font-semibold text-slate-100">
                        Quick Commerce (Blinkit, Zepto, Instamart)
                      </label>
                      <span className="font-mono text-base font-bold text-white">
                        {formatINR(quickCommerce)}
                      </span>
                    </div>
                    <input
                      id={quickCommerceId}
                      type="range"
                      min={0}
                      max={15000}
                      step={400}
                      value={quickCommerce}
                      onChange={(e) => setQuickCommerce(Number(e.target.value))}
                      className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-teal-400"
                    />
                    <div className="text-xs text-slate-300">10-minute convenience orders, snack carts &amp; surges</div>
                  </div>

                  {/* Unplanned Social */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-baseline">
                      <label htmlFor={unplannedSocialId} className="text-sm font-semibold text-slate-100">
                        Unplanned Weekend &amp; Social Spends
                      </label>
                      <span className="font-mono text-base font-bold text-white">
                        {formatINR(unplannedSocial)}
                      </span>
                    </div>
                    <input
                      id={unplannedSocialId}
                      type="range"
                      min={0}
                      max={20000}
                      step={500}
                      value={unplannedSocial}
                      onChange={(e) => setUnplannedSocial(Number(e.target.value))}
                      className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-rose-400"
                    />
                    <div className="text-xs text-slate-300">&quot;Chalo weekend pe chalte hain&quot; outings and impulsive splits</div>
                  </div>
                </div>
              </div>
            </TiltPhysicsCard>
          </div>

          {/* Right Column: Scorecard, Diagnosis & Lead Capture (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Scorecard Box */}
            <TiltPhysicsCard maxAngle={8} className="rounded-3xl">
              <div className="bg-[#132244] text-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-white/20 space-y-4">
                <div className="flex items-center justify-between text-xs sm:text-sm text-amber-300 font-semibold uppercase tracking-wider">
                  <span>Your Salary Leak Score</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    leakScore > 25 ? 'bg-rose-500/25 text-rose-300 border border-rose-400/40' : 'bg-emerald-500/25 text-emerald-300 border border-emerald-400/40'
                  }`}>
                    {diagnosis.level}
                  </span>
                </div>

                {/* Big Score Number */}
                <div className="flex items-baseline gap-4 my-3">
                  <span className="font-serif-title text-6xl sm:text-7xl font-extrabold text-[#E8871E] tracking-tight">
                    {leakScore}%
                  </span>
                  <div className="text-sm text-slate-200 leading-snug">
                    of your monthly paycheck <br />
                    is leaking into the void
                  </div>
                </div>

                {/* Meter */}
                <div className="w-full h-3.5 bg-white/10 rounded-full overflow-hidden my-3 border border-white/15">
                  <div
                    className={`h-full ${diagnosis.barColor} transition-all duration-300`}
                    style={{ width: `${Math.min(100, leakScore)}%` }}
                  />
                </div>

                {/* Financial impact */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                  <div>
                    <div className="text-xs text-slate-300">Monthly Leakage:</div>
                    <div className="text-xl font-bold text-white mt-1">
                      {formatINR(totalMonthlyLeak)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-amber-400 font-semibold">Annual Loss:</div>
                    <div className="text-xl font-bold text-amber-300 mt-1">
                      {formatINR(annualLeakage)} / yr
                    </div>
                  </div>
                </div>

                {/* One line diagnosis message */}
                <div className="mt-4 p-4 rounded-2xl bg-white/10 text-sm text-slate-100 leading-relaxed font-medium border border-white/15">
                  {diagnosis.message}
                </div>

                {/* Share buttons */}
                <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-3">
                  <MagneticButton strength={0.3} className="flex-1">
                    <button
                      onClick={handleWhatsAppShare}
                      type="button"
                      className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#2E7D5B] hover:bg-[#225C43] text-white text-sm font-bold transition-all cursor-pointer shadow-md"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>Share on WhatsApp</span>
                    </button>
                  </MagneticButton>

                  <MagneticButton strength={0.2}>
                    <button
                      onClick={handleCopyCard}
                      type="button"
                      title="Copy Leak Card"
                      className="inline-flex items-center justify-center p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer border border-white/20"
                    >
                      {copiedLink ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </MagneticButton>
                </div>
              </div>
            </TiltPhysicsCard>

            {/* Lead Capture Card */}
            <TiltPhysicsCard maxAngle={6} className="rounded-3xl">
              <div className="bg-white/[0.05] rounded-3xl border border-white/15 p-6 shadow-lg backdrop-blur-md space-y-3.5">
                <div className="flex items-center gap-2.5 text-sm font-bold text-white">
                  <FileSpreadsheet className="w-5 h-5 text-teal-400" />
                  <span>Get Your Full Leak Breakdown &amp; Free UPI Audit Sheet</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  We will send your personalized scorecard along with our plug-and-play Excel &amp; Notion tracker to plug these leaks in 48 hours.
                </p>

                {!isSubmitted ? (
                  <form onSubmit={handleSubmitLead} className="space-y-3.5">
                    <div className="flex items-center gap-3 text-sm font-medium text-slate-200">
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="contact_type"
                          checked={contactType === 'whatsapp'}
                          onChange={() => setContactType('whatsapp')}
                          className="accent-[#E8871E]"
                        />
                        <span>WhatsApp</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer ml-3">
                        <input
                          type="radio"
                          name="contact_type"
                          checked={contactType === 'email'}
                          onChange={() => setContactType('email')}
                          className="accent-[#E8871E]"
                        />
                        <span>Email</span>
                      </label>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2.5">
                      <input
                        type={contactType === 'whatsapp' ? 'tel' : 'email'}
                        required
                        placeholder={contactType === 'whatsapp' ? '+91 98765 43210' : 'you@company.com'}
                        value={contactValue}
                        onChange={(e) => setContactValue(e.target.value)}
                        className="flex-1 px-4 py-2.5 rounded-xl bg-white/10 border border-white/25 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-amber-400"
                      />
                      <MagneticButton strength={0.3}>
                        <button
                          type="submit"
                          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#E8871E] hover:bg-[#C97112] text-white text-sm font-bold transition-all cursor-pointer inline-flex items-center justify-center gap-1.5 shrink-0 shadow-md"
                        >
                          <Send className="w-4 h-4" />
                          <span>Send Sheet</span>
                        </button>
                      </MagneticButton>
                    </div>
                    <div className="text-xs text-slate-400">Zero spam. No calls. Unsubscribe anytime.</div>
                  </form>
                ) : (
                  <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-sm space-y-2.5 text-emerald-200">
                    <div className="flex items-center gap-2 text-emerald-300 font-bold text-base">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      <span>Sent! Check your {contactType === 'whatsapp' ? 'WhatsApp' : 'Inbox'}.</span>
                    </div>
                    <p className="text-slate-200 text-xs">
                      You can also download the starter sheet immediately:
                    </p>
                    <div className="flex gap-2 pt-1">
                      <a
                        href="#offer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2E7D5B] text-white text-xs sm:text-sm font-bold"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download Starter Excel</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </TiltPhysicsCard>
          </div>
        </div>
      </div>
    </section>
  );
}
