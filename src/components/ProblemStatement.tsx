import React from 'react';
import { PROBLEM_CARDS } from '../data/mokuData';

export const ProblemStatement: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-[#EFF2E9]/60 border-y border-[#E1E6DD]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#476B57]">
            <span>The Modern Indian Salary Trap</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#242C27] tracking-tight text-balance">
            Where Does Your Salary Go Every Month?
          </h2>
          <p className="text-base sm:text-lg text-[#727B73] leading-relaxed">
            Most expense trackers force you to record transactions after they happen. But recording an empty bank account is an autopsy, not financial control.
          </p>
        </div>

        {/* 4 Problem Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {PROBLEM_CARDS.map((card) => (
            <div
              key={card.number}
              className="bg-white rounded-2xl p-7 lg:p-8 border border-[#E1E6DD] shadow-xs flex flex-col justify-between hover:border-[#A8B99E] transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-display font-bold text-2xl text-[#A8B99E] group-hover:text-[#476B57] transition-colors">
                    {card.number}
                  </span>
                  <span className="text-xs font-mono text-[#727B73]">Habit Blindspot</span>
                </div>
                <h3 className="text-xl font-display font-bold text-[#242C27] mb-3 group-hover:text-[#294C3A] transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm sm:text-base text-[#727B73] leading-relaxed mb-6">
                  {card.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E1E6DD] flex items-start gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#476B57] shrink-0 mt-0.5">
                  MOKU Insight:
                </span>
                <p className="text-xs font-medium text-[#242C27] leading-normal">
                  {card.insight}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Section Climax Statement */}
        <div className="mt-16 text-center max-w-xl mx-auto">
          <div className="p-6 bg-white rounded-2xl border border-[#E1E6DD] shadow-xs">
            <p className="text-xl sm:text-2xl font-display font-extrabold text-[#294C3A]">
              "Your money needs a plan, not just a record."
            </p>
            <p className="text-xs text-[#727B73] mt-2">
              Move from passive transaction logs to proactive Japanese Kakeibo budgeting.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
