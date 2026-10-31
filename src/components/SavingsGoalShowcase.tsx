import React, { useEffect, useState } from 'react';
import { formatINR } from '../utils/kakeibo';
import { getSvgCircleProgress } from '../utils/simulator';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Target, CheckCircle2, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

interface SavingsGoalShowcaseProps {
  onOpenCheckout: () => void;
}

export const SavingsGoalShowcase: React.FC<SavingsGoalShowcaseProps> = ({ onOpenCheckout }) => {
  const { ref, isVisible } = useScrollReveal(0.05);

  // Exact figures required by specification
  const target = 15000;
  const saved = 12500;
  const remaining = 2500;
  const percentage = 83.33;

  // Animated numbers state - default to complete mathematical values
  const [animatedSaved, setAnimatedSaved] = useState(saved);
  const [animatedPercentage, setAnimatedPercentage] = useState(percentage);

  useEffect(() => {
    if (!isVisible) return;

    let startTimestamp: number | null = null;
    const duration = 1000;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);

      setAnimatedSaved(Math.round(saved * ease));
      setAnimatedPercentage(parseFloat((percentage * ease).toFixed(2)));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setAnimatedSaved(saved);
        setAnimatedPercentage(percentage);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isVisible, saved, percentage]);

  const radius = 70;
  const ringProgress = getSvgCircleProgress(saved, target, radius);

  return (
    <section id="savings-goal" ref={ref} className="py-20 md:py-28 bg-[#EFF2E9]/50 border-t border-[#E1E6DD]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-[#E1E6DD] shadow-md">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            
            {/* Left: Animated Circular Progress Ring */}
            <div className="md:col-span-5 flex flex-col items-center justify-center">
              
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 160 160">
                  {/* Track ring */}
                  <circle
                    cx="80"
                    cy="80"
                    r={radius}
                    fill="none"
                    stroke="#EFF2E9"
                    strokeWidth="12"
                  />
                  {/* Animated Progress ring */}
                  <circle
                    cx="80"
                    cy="80"
                    r={radius}
                    fill="none"
                    stroke="#294C3A"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={ringProgress.circumference}
                    strokeDashoffset={isVisible ? ringProgress.offset : ringProgress.circumference}
                    style={{
                      transition: 'stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  />
                </svg>

                {/* Center Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-3xl sm:text-4xl font-display font-extrabold text-[#294C3A] tabular-nums">
                    {animatedPercentage}%
                  </span>
                  <span className="text-[11px] font-semibold text-[#727B73] uppercase tracking-wider mt-0.5">
                    Achieved
                  </span>
                </div>
              </div>

              <div className="mt-4 text-center">
                <span className="text-xs font-semibold text-[#476B57] bg-[#EFF5EE] px-3 py-1 rounded-full border border-[#A8B99E]/50">
                  Paid to Self First
                </span>
              </div>

            </div>

            {/* Right: Quantitative Breakdown & Philosophy */}
            <div className="md:col-span-7 space-y-6">
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#476B57]">
                  <Target className="w-3.5 h-3.5" />
                  <span>The Kakeibo Savings Ritual</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-[#242C27] tracking-tight">
                  Intentional Savings Goal Progress
                </h3>
                <p className="text-sm text-[#727B73] leading-relaxed">
                  In traditional budgeting, you try to save whatever crumbs survive at month-end. In MOKU, your savings goal is committed before daily spending begins.
                </p>
              </div>

              {/* 3 Metric Pillars */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                
                <div className="p-3.5 rounded-2xl bg-[#F8F8F3] border border-[#E1E6DD]">
                  <span className="text-[11px] text-[#727B73] block">Target Goal</span>
                  <span className="text-lg sm:text-xl font-display font-extrabold text-[#242C27] tabular-nums mt-0.5 block">
                    {formatINR(target)}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#EFF5EE] border border-[#A8B99E]/60">
                  <span className="text-[11px] text-[#294C3A] font-medium block">Saved to Date</span>
                  <span className="text-lg sm:text-xl font-display font-extrabold text-[#294C3A] tabular-nums mt-0.5 block">
                    {formatINR(animatedSaved)}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#F8F8F3] border border-[#E1E6DD]">
                  <span className="text-[11px] text-[#727B73] block">Remaining</span>
                  <span className="text-lg sm:text-xl font-display font-extrabold text-[#242C27] tabular-nums mt-0.5 block">
                    {formatINR(remaining)}
                  </span>
                </div>

              </div>

              {/* Bullet points */}
              <div className="space-y-2 pt-1 text-xs text-[#242C27]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#476B57] shrink-0" />
                  <span>Mathematically isolated from your daily spendable pool</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#476B57] shrink-0" />
                  <span>Tracks Mutual Fund SIPs, Emergency FDs, and Gold reserves</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenCheckout}
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-[#294C3A] hover:bg-[#1E372A] rounded-xl transition-all shadow-xs cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Build This Saving Habit with MOKU</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
