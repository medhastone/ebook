'use client';

import React, { useState } from 'react';
import { 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight, 
  Sparkles, 
  RotateCcw,
  Check
} from 'lucide-react';
import { TiltPhysicsCard } from '@/components/ui/PhysicsInteractive';

export function MoneyCheckQuiz() {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const questions = [
    {
      id: 1,
      q: 'Do you know roughly where your salary goes each month?',
      options: ['YES', 'SOMETIMES', 'NOT REALLY'],
    },
    {
      id: 2,
      q: 'Do small UPI purchases add up faster than expected?',
      options: ['YES', 'SOMETIMES', 'NOT SURE'],
    },
    {
      id: 3,
      q: 'Do recurring expenses or EMIs sometimes surprise you?',
      options: ['YES', 'SOMETIMES', 'NOT SURE'],
    },
  ];

  const handleSelectOption = (qId: number, option: string) => {
    const updated = { ...answers, [qId]: option };
    setAnswers(updated);
    if (Object.keys(updated).length === questions.length) {
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setIsCompleted(false);
  };

  return (
    <section id="quick-check" className="py-16 sm:py-24 border-b border-white/10 relative text-white scroll-mt-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10 sm:space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3.5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-white/10 text-amber-300 border border-amber-400/30 backdrop-blur-md">
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span>Interactive Self-Check</span>
          </div>

          <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Before You Buy This Ebook, <br />
            <span className="text-teal-300">Try This 30-Second Check.</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-200 font-sans-body leading-relaxed max-w-xl mx-auto">
            Answer 3 quick questions to discover what kind of cashflow structure suits your current monthly pattern.
          </p>
        </div>

        {/* Quiz Container */}
        <TiltPhysicsCard maxAngle={4} enableGlare={false} className="rounded-3xl">
          <div className="p-6 sm:p-9 rounded-3xl bg-[#0F1B33] border border-white/15 shadow-2xl space-y-7">
            
            {/* 3 Questions */}
            <div className="space-y-6">
              {questions.map((item, idx) => (
                <div 
                  key={item.id} 
                  className="p-5 sm:p-6 rounded-2xl bg-white/[0.04] border border-white/10 space-y-3.5 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                      0{idx + 1}
                    </span>
                    <h3 className="font-serif-title font-bold text-base sm:text-lg text-white leading-snug">
                      {item.q}
                    </h3>
                  </div>

                  <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-1">
                    {item.options.map((opt) => {
                      const isSelected = answers[item.id] === opt;
                      return (
                        <button
                          key={opt}
                          onClick={() => handleSelectOption(item.id, opt)}
                          type="button"
                          className={`py-3 px-2 sm:px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border text-center flex items-center justify-center gap-1.5 ${
                            isSelected
                              ? 'bg-[#E8871E] text-slate-950 border-amber-300 shadow-md scale-102'
                              : 'bg-white/10 text-slate-200 hover:bg-white/15 border-white/10'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                          <span>{opt}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Results Card */}
            {isCompleted ? (
              <div className="p-6 sm:p-8 rounded-2xl bg-emerald-950/60 border border-emerald-400/50 space-y-5 text-center animate-in zoom-in-95 duration-200 shadow-xl">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 flex items-center justify-center mx-auto">
                  <Sparkles className="w-6 h-6 text-emerald-400" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs uppercase font-mono font-bold text-emerald-400 tracking-wider">
                    Assessment Complete
                  </span>
                  <div className="font-serif-title text-2xl sm:text-3xl font-black text-white leading-tight">
                    &ldquo;Your next step isn&apos;t another complicated budget. <br className="hidden sm:inline" />
                    <span className="text-amber-300">It&apos;s visibility.&rdquo;</span>
                  </div>
                  <p className="text-sm sm:text-base text-slate-200 max-w-lg mx-auto font-sans-body leading-relaxed pt-1">
                    When you can see where 50% of your paycheck leaves in the first 5 days, making intentional decisions becomes effortless.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <a
                    href="#pricing"
                    className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#E8871E] to-[#D97706] hover:from-[#C97112] hover:to-[#B45309] text-white font-bold text-sm sm:text-base shadow-md transition-all flex items-center gap-2 cursor-pointer border border-amber-300/30"
                  >
                    <span>SEE THE SALARY RESET SYSTEM</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <button
                    onClick={handleReset}
                    type="button"
                    className="px-4 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 text-xs sm:text-sm font-semibold border border-white/15 flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake Check</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center text-xs text-slate-400 font-mono">
                Select an option for all 3 questions to reveal your clarity recommendation ({Object.keys(answers).length}/3 completed)
              </div>
            )}
          </div>
        </TiltPhysicsCard>
      </div>
    </section>
  );
}
