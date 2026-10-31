import React from 'react';
import { HOW_IT_WORKS_STEPS } from '../data/mokuData';
import { ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onOpenCheckout: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenCheckout }) => {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-[#F8F8F3] border-t border-[#E1E6DD]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#476B57]">
            <span>Four-Step Monthly Ritual</span>
            <span aria-hidden="true">·</span>
            <span>Simple & Sustainable</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#242C27] tracking-tight text-balance">
            How MOKU Works in 4 Mindful Steps
          </h2>
          <p className="text-base sm:text-lg text-[#727B73] leading-relaxed">
            Budgeting shouldn't be an exhausting daily chore. MOKU turns monthly finances into a calm, five-minute ritual.
          </p>
        </div>

        {/* 4-Step Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {HOW_IT_WORKS_STEPS.map((step, idx) => (
            <div
              key={step.step}
              className="bg-white rounded-2xl p-6 lg:p-7 border border-[#E1E6DD] shadow-xs flex flex-col justify-between relative hover:border-[#A8B99E] transition-all"
            >
              <div>
                {/* Step badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="w-9 h-9 rounded-xl bg-[#EFF2E9] text-[#294C3A] font-display font-extrabold text-sm flex items-center justify-center">
                    {step.step}
                  </span>
                  <span className="text-[11px] font-mono text-[#727B73]">Phase {idx + 1}</span>
                </div>

                <h3 className="text-lg font-display font-bold text-[#242C27] mb-1">
                  {step.title}
                </h3>
                <p className="text-xs font-medium text-[#476B57] mb-3">
                  {step.subtitle}
                </p>
                <p className="text-sm text-[#727B73] leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="pt-5 mt-6 border-t border-[#E1E6DD] text-[11px] text-[#727B73] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#476B57]" />
                <span>
                  {idx === 0 && 'Takes < 2 minutes on day 1'}
                  {idx === 1 && 'Locked before daily spending'}
                  {idx === 2 && '30 seconds quick logging'}
                  {idx === 3 && '5 minutes on month-end'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-14 p-6 sm:p-8 bg-[#EFF2E9] rounded-2xl border border-[#E1E6DD] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-display font-bold text-[#242C27]">
              No complicated spreadsheets. No bank account sync friction.
            </h4>
            <p className="text-xs sm:text-sm text-[#727B73]">
              Experience intentional money management with genuine peace of mind.
            </p>
          </div>
          <button
            onClick={onOpenCheckout}
            className="px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-[#294C3A] hover:bg-[#1E372A] rounded-xl shadow-xs transition-all whitespace-nowrap cursor-pointer flex items-center gap-2"
          >
            <span>Get MOKU for ₹499</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
