import React from 'react';
import { Sparkles, Compass, Target, CheckCircle2, RefreshCw } from 'lucide-react';

interface MokuIntroProps {
  onOpenScreenshot: (id: string) => void;
  onOpenCheckout: () => void;
}

export const MokuIntro: React.FC<MokuIntroProps> = ({ onOpenScreenshot, onOpenCheckout }) => {
  const steps = [
    {
      icon: Compass,
      title: 'Plan monthly income & expenses',
      text: 'Start every month by inputting your expected salary and known fixed obligations in under two minutes.',
    },
    {
      icon: Target,
      title: 'Set savings targets first',
      text: 'Commit to your savings goal upfront. What remains becomes your true guilt-free spendable pool.',
    },
    {
      icon: Sparkles,
      title: 'Allocate into 4 Kakeibo pillars',
      text: 'Categorize spending naturally into Essentials, Wants, Growth, and Unexpected channels.',
    },
    {
      icon: CheckCircle2,
      title: 'Log daily expenses without friction',
      text: 'One-tap denomination chips (+₹50, +₹100, +₹500), smart text notes, and SMS paste assist.',
    },
    {
      icon: RefreshCw,
      title: 'Review behaviour & Kaizen reflection',
      text: 'Reflect calmly at month-end on what brought genuine value versus mindless financial leaks.',
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#F8F8F3]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Showcase using verified Monthly Review screenshot */}
          <div className="lg:col-span-5 order-2 lg:order-1 flex justify-center">
            <div className="relative w-full max-w-[320px]">
              
              {/* Device Frame */}
              <div className="relative rounded-[40px] p-2.5 bg-[#242C27] shadow-xl ring-1 ring-black/10">
                <div className="overflow-hidden rounded-[32px] bg-white aspect-[9/19.5]">
                  <img
                    src="/assets/aistudio/review_61fc0bbe.jpeg"
                    alt="MOKU Kakeibo Monthly Review and Financial Audit screen"
                    className="w-full h-full object-cover object-top cursor-pointer hover:scale-102 transition-transform duration-300"
                    onClick={() => onOpenScreenshot('review')}
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Verified Feature Pill overlay */}
              <div className="absolute -bottom-4 right-2 sm:-right-4 bg-white/95 backdrop-blur-md border border-[#E1E6DD] rounded-xl p-3 shadow-md text-xs">
                <span className="font-semibold text-[#294C3A] block">Monthly Kaizen Audit</span>
                <span className="text-[11px] text-[#727B73]">Daily spending velocity & burn rate</span>
              </div>

            </div>
          </div>

          {/* Right Column: Introduction Copy & Step Breakdown */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#476B57]">
              <span>Mindful Money Companion</span>
              <span aria-hidden="true">·</span>
              <span>Kakeibo Philosophy</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#242C27] tracking-tight text-balance">
              Meet MOKU. Your Mindful Money Companion.
            </h2>

            <p className="text-base sm:text-lg text-[#727B73] leading-relaxed">
              MOKU does not treat your salary like an accounting spreadsheet. It treats your money as energy and intention, inspired by the Japanese household art of Kakeibo.
            </p>

            {/* List of Capabilities */}
            <div className="space-y-4 pt-2">
              {steps.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div key={idx} className="flex items-start gap-3.5 group">
                    <div className="w-8 h-8 rounded-lg bg-[#EFF2E9] flex items-center justify-center shrink-0 mt-0.5 text-[#294C3A] group-hover:bg-[#476B57] group-hover:text-white transition-colors">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-[#242C27] font-display">
                        {item.title}
                      </h3>
                      <p className="text-sm text-[#727B73] leading-relaxed mt-0.5">
                        {item.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4">
              <button
                onClick={onOpenCheckout}
                className="px-6 py-3 text-sm font-semibold text-white bg-[#294C3A] hover:bg-[#1E372A] rounded-xl transition-all shadow-xs cursor-pointer"
              >
                Start Mindful Budgeting — ₹499
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
