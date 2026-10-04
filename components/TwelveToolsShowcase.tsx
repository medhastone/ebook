'use client';

import React, { useState } from 'react';
import { 
  BarChart3, 
  Smartphone, 
  CreditCard, 
  LifeBuoy, 
  Coins, 
  RefreshCw, 
  Target, 
  CalendarDays, 
  FileText, 
  Sparkles, 
  Briefcase, 
  AlertTriangle,
  Eye,
  X,
  CheckCircle2,
  FileSpreadsheet,
  ArrowRight
} from 'lucide-react';
import { SUPERPROFILE_PAYMENT_URL } from '@/lib/constants';
import { trackEvent } from '@/lib/analytics';
import { TiltPhysicsCard } from '@/components/ui/PhysicsInteractive';

interface ToolItem {
  id: number;
  emoji: string;
  name: string;
  benefit: string;
  format: string;
  mockupDescription: string;
  fields: string[];
}

export function TwelveToolsShowcase() {
  const [previewTool, setPreviewTool] = useState<ToolItem | null>(null);

  const tools: ToolItem[] = [
    {
      id: 1,
      emoji: '📊',
      name: 'Salary Reset Dashboard',
      benefit: 'A centralized 1-page financial command center for your entire monthly income flow.',
      format: 'Google Sheets & Excel',
      mockupDescription: 'Visual dashboard tracking In-Hand Salary, Fixed Costs, 5-Bucket Split, and Real-Time Surplus.',
      fields: ['Net Take-Home Salary Input', '5-Bucket Automatic Allocator', 'Monthly Surplus Meter', 'Year-to-Date Compounding Tracker'],
    },
    {
      id: 2,
      emoji: '📲',
      name: 'UPI Money Leak Tracker',
      benefit: 'Log and expose every small ₹50–₹300 digital transaction before it turns into ₹5,000.',
      format: 'Google Sheets & Notion',
      mockupDescription: 'Micro-payment audit sheet categorized by QR scans, food delivery apps, and convenience surges.',
      fields: ['Transaction Date & Merchant', 'UPI App Channel (GPay/PhonePe)', 'Impulse vs Planned Tag', 'Monthly Leak Accumulator'],
    },
    {
      id: 3,
      emoji: '💳',
      name: 'Debt & EMI Inventory',
      benefit: 'Track every credit card, phone EMI, and personal loan in one place with the 30% ceiling rule.',
      format: 'Google Sheets & Excel',
      mockupDescription: 'EMI Snowball payoff planner with interest rate comparisons and payoff countdown dates.',
      fields: ['Principal Balance & APR', 'Monthly EMI Amount', 'Total EMI to Income Ratio', 'Payoff Snowball Priority'],
    },
    {
      id: 4,
      emoji: '🛟',
      name: 'Emergency Fund Planner',
      benefit: 'Step-by-step calculator for your starter cushion (₹25,000) up to a full 6-month safety runway.',
      format: 'Google Sheets & Excel',
      mockupDescription: 'Tiered runway progress bar mapping true survival living expenses vs current liquid savings.',
      fields: ['Bare-Bones Monthly Survival Cost', 'Tier 1 Buffer (₹25k)', 'Tier 2 Buffer (3 Months)', 'Tier 3 Buffer (6 Months)'],
    },
    {
      id: 5,
      emoji: '💰',
      name: 'Salary Allocation Templates',
      benefit: 'Customizable 50:15:10:15:10 split templates tailored for ₹20k, ₹30k, ₹50k, and ₹1L+ salaries.',
      format: 'Google Sheets, Excel & Notion',
      mockupDescription: 'Dynamic split spreadsheets that recalculate every rupee into bank-transfer buckets on Day 1.',
      fields: ['Live Bucket (Needs)', 'Pay Bucket (EMIs)', 'Protect Bucket (Safety)', 'Build Bucket (Wealth)', 'Enjoy Bucket (Guilt-free)'],
    },
    {
      id: 6,
      emoji: '🔄',
      name: 'Subscription Audit Sheet',
      benefit: 'Identify dormant OTT, music, cloud storage, and gym memberships draining cash in the background.',
      format: 'Google Sheets & Notion',
      mockupDescription: 'Auto-debit audit matrix calculating annual cumulative costs for every active subscription.',
      fields: ['Service Name & Platform', 'Monthly/Annual Cost', 'Auto-Renewal Date', 'Keep / Cancel / Share Status'],
    },
    {
      id: 7,
      emoji: '🎯',
      name: 'Financial Goals Planner',
      benefit: 'Structure short-term sinking funds (trips, gadgets) without disrupting long-term wealth compounding.',
      format: 'Google Sheets & Excel',
      mockupDescription: 'Multi-goal savings tracker with target dates and required monthly SIP contributions.',
      fields: ['Goal Name & Target Date', 'Target Rupee Amount', 'Current Saved Balance', 'Monthly Required Contribution'],
    },
    {
      id: 8,
      emoji: '📅',
      name: '30-Day Salary Reset Challenge',
      benefit: 'Day-by-day micro-action checklists to overhaul your money habits in 4 easy weeks.',
      format: 'Printable PDF & Notion',
      mockupDescription: 'Interactive 30-day checkbox calendar with 1 bite-sized task per day to avoid burnout.',
      fields: ['Week 1: The Leak Autopsy', 'Week 2: Bank Account Partitioning', 'Week 3: Debt & EMI Containment', 'Week 4: The Automated Surplus Engine'],
    },
    {
      id: 9,
      emoji: '📝',
      name: 'Money Reset Cheat Sheet',
      benefit: 'A quick 1-page visual summary of all core formulas, ratios, and salary-day rules.',
      format: 'Printable PDF & Digital PNG',
      mockupDescription: 'High-density reference card containing all key ratios (30% EMI ceiling, 50% Raise capture, etc.).',
      fields: ['5-Bucket Rule Cheat Sheet', 'Emergency Runway Formulas', '48-Hour Cart Cool-Off Script', 'Salary Day Transfer Checklist'],
    },
    {
      id: 10,
      emoji: '🃏',
      name: '30 Money Decision Cards',
      benefit: 'Quick mental prompts to pull out before making any impulse purchase over ₹1,000.',
      format: 'Digital Card Deck & Notion',
      mockupDescription: 'Behavioural friction cards designed to pause impulse dopamine loops in 10 seconds.',
      fields: ['Card 01: The Work-Hour Equivalence Test', 'Card 02: The 48-Hour Cart Test', 'Card 03: The "Would I Buy at Full Price?" Test', '27 More Practical Prompts'],
    },
    {
      id: 11,
      emoji: '💼',
      name: 'Salary Raise Playbook',
      benefit: 'Step-by-step strategy to capture 50%+ of your next appraisal before lifestyle creep eats it.',
      format: 'Interactive Guide & Template',
      mockupDescription: 'Raise Allocation Calculator to lock in higher monthly SIPs the exact day a promotion lands.',
      fields: ['Appraisal Percentage Calculator', 'The 50% Wealth Capture Formula', 'Lifestyle Upgrade Allowance', 'Long-term Compounding Difference'],
    },
    {
      id: 12,
      emoji: '🚨',
      name: 'Financial Red Flags Guide',
      benefit: 'Learn how to identify bad financial products, fake get-rich schemes, and predatory loans in 60 seconds.',
      format: 'PDF Guide & Checklist',
      mockupDescription: 'Anti-scam diagnostic checklist to audit any financial product pitch or loan offer.',
      fields: ['ULIP & Endowment Trap Identifier', 'PayLater & Instant Loan APR Revealer', 'Options & Crypto Hype Filter', 'Certified Professional Checklist'],
    },
  ];

  return (
    <section id="tools" className="py-16 sm:py-24 border-b border-white/10 relative text-white scroll-mt-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12 sm:space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3.5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-white/10 text-teal-300 border border-teal-400/30 backdrop-blur-md">
            <FileSpreadsheet className="w-4 h-4 text-teal-400" />
            <span>Plug-and-Play Toolkit</span>
          </div>

          <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            12 Editable Money Tools &amp; Dashboards
          </h2>

          <p className="text-base sm:text-lg text-slate-200 font-sans-body leading-relaxed max-w-2xl mx-auto">
            Ready-to-use Google Sheets, Microsoft Excel, Notion, and printable templates included in the Salary Reset Money Kit.
          </p>
        </div>

        {/* 12 Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {tools.map((tool) => (
            <TiltPhysicsCard key={tool.id} maxAngle={6} className="rounded-3xl h-full">
              <div className="p-6 rounded-3xl bg-[#0F1B33] border border-white/15 shadow-xl hover:border-teal-400/70 transition-all flex flex-col justify-between group h-full space-y-4">
                
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{tool.emoji}</span>
                    <span className="text-[11px] font-mono text-teal-300 font-bold px-2.5 py-1 rounded-lg bg-white/10 border border-white/10">
                      Tool 0{tool.id}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-serif-title font-bold text-lg sm:text-xl text-white group-hover:text-amber-300 transition-colors">
                      {tool.name}
                    </h3>
                    <span className="text-xs font-mono text-slate-400 block">
                      Format: {tool.format}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans-body">
                    {tool.benefit}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <button
                    onClick={() => setPreviewTool(tool)}
                    type="button"
                    className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-[#E8871E] hover:text-slate-950 text-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-white/15"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Preview Tool Mockup</span>
                  </button>
                </div>
              </div>
            </TiltPhysicsCard>
          ))}
        </div>

        {/* Section Primary CTA */}
        <div className="pt-4 text-center">
          <a
            href={SUPERPROFILE_PAYMENT_URL}
            onClick={() => {
              trackEvent('click_buy', { source: 'tools_showcase_section', price: 299, destination: SUPERPROFILE_PAYMENT_URL });
            }}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#E8871E] via-[#F59E0B] to-[#D97706] hover:from-[#C97112] hover:to-[#B45309] text-white font-bold text-base sm:text-lg shadow-xl hover:shadow-[0_0_30px_rgba(232,135,30,0.5)] transition-all border border-amber-300/40 cursor-pointer"
          >
            <span>Unlock All 12 Editable Tools — ₹299</span>
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>

        {/* Tool Preview Modal */}
        {previewTool && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-150">
            <div 
              className="relative w-full max-w-xl bg-[#0F1B33] text-white rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8 space-y-6 my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{previewTool.emoji}</span>
                  <div>
                    <span className="text-xs uppercase font-mono text-teal-300 font-bold tracking-wider">
                      Interactive Tool Mockup • {previewTool.format}
                    </span>
                    <h3 className="font-serif-title text-xl sm:text-2xl font-bold text-white">
                      {previewTool.name}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => setPreviewTool(null)}
                  type="button"
                  className="p-1.5 rounded-xl hover:bg-white/10 text-white/70 hover:text-white transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mockup Preview Body */}
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-2">
                  <div className="text-xs uppercase font-mono font-bold text-amber-300">
                    What this template contains:
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {previewTool.mockupDescription}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="text-xs uppercase font-mono font-bold text-slate-300">
                    Key Interactive Columns &amp; Formulas:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {previewTool.fields.map((f, i) => (
                      <div key={i} className="p-2.5 rounded-xl bg-white/10 border border-white/10 flex items-center gap-2 text-slate-100">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                        <span className="truncate">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-400/30 text-xs text-amber-200">
                  ⚠️ <strong>Preview Notice:</strong> This is a visual overview of the template included in the Salary Reset Money Kit. Complete unlocked editable templates (Google Sheets, Excel &amp; Notion) are provided upon instant checkout.
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between gap-3 border-t border-white/10">
                <button
                  onClick={() => setPreviewTool(null)}
                  type="button"
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-300 text-xs font-semibold cursor-pointer"
                >
                  Close Preview
                </button>

                <a
                  href={SUPERPROFILE_PAYMENT_URL}
                  onClick={() => {
                    trackEvent('click_buy', { source: 'tools_modal', price: 299, destination: SUPERPROFILE_PAYMENT_URL });
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#E8871E] hover:bg-[#C97112] text-slate-950 text-xs sm:text-sm font-bold transition-all shadow-md inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Get All 12 Tools — ₹299</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
