import React, { useState } from 'react';
import { formatINR } from '../utils/kakeibo';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { BarChart3, TrendingUp, Check, ArrowRight, Sparkles, RefreshCw } from 'lucide-react';

interface MonthlyReviewShowcaseProps {
  onOpenCheckout: () => void;
}

export const MonthlyReviewShowcase: React.FC<MonthlyReviewShowcaseProps> = ({ onOpenCheckout }) => {
  const { ref, isVisible } = useScrollReveal(0.05);
  const [activeTab, setActiveTab] = useState<'audit' | 'kaizen'>('audit');

  // Realistic illustrative review data
  const monthlyData = {
    totalInflow: 75000,
    savingsTarget: 18000,
    actualSavings: 18000,
    monthlyBudgetPool: 57000,
    actualSpent: 52400,
    netSurplus: 4600,
    dailyBurnAverage: 1690,
    safeDailyLimit: 1900,
    pillars: [
      { name: 'Essentials', planned: 28500, actual: 27800, color: '#54745A', pct: 53 },
      { name: 'Wants', planned: 14250, actual: 13900, color: '#B38B60', pct: 26 },
      { name: 'Growth', planned: 8550, actual: 6800, color: '#66899B', pct: 13 },
      { name: 'Unexpected', planned: 5700, actual: 3900, color: '#8C7B99', pct: 8 },
    ],
  };

  return (
    <section id="monthly-review" ref={ref} className="py-20 md:py-28 bg-[#F8F8F3] border-t border-[#E1E6DD]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div
          className={`max-w-2xl mx-auto text-center space-y-4 mb-14 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#476B57]">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Monthly Financial Audit</span>
            <span aria-hidden="true">·</span>
            <span>Kaizen Reflection</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#242C27] tracking-tight text-balance">
            Continuous Monthly Improvement
          </h2>
          <p className="text-base sm:text-lg text-[#727B73] leading-relaxed">
            At month-end, MOKU generates a quiet audit of your inflow, committed savings, velocity burn rate, and net surplus buffer.
          </p>
        </div>

        {/* Interactive Review Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-[#E1E6DD] shadow-md space-y-8">
          
          {/* Top Audit Banner */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-[#E1E6DD] gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#476B57]">
                Kakeibo Financial Audit
              </span>
              <h3 className="text-2xl font-display font-extrabold text-[#242C27]">
                Month-End Reconciliation
              </h3>
            </div>
            
            {/* Tab Toggles */}
            <div className="inline-flex p-1 bg-[#EFF2E9] rounded-xl border border-[#E1E6DD]">
              <button
                type="button"
                onClick={() => setActiveTab('audit')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'audit'
                    ? 'bg-[#294C3A] text-white shadow-xs'
                    : 'text-[#727B73] hover:text-[#242C27]'
                }`}
              >
                Numbers & Ratios
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('kaizen')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'kaizen'
                    ? 'bg-[#294C3A] text-white shadow-xs'
                    : 'text-[#727B73] hover:text-[#242C27]'
                }`}
              >
                Kaizen Reflection
              </button>
            </div>
          </div>

          {activeTab === 'audit' ? (
            <div className="space-y-8">
              
              {/* 4 Quadrants Inflow / Savings / Spent / Surplus */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                
                <div className="p-4 rounded-2xl bg-[#F8F8F3] border border-[#E1E6DD] space-y-1">
                  <span className="text-[11px] text-[#727B73] block">1. Total Inflow</span>
                  <span className="text-xl font-display font-extrabold text-[#242C27] tabular-nums block">
                    {formatINR(monthlyData.totalInflow)}
                  </span>
                  <span className="text-[10px] text-[#727B73]">Salary + Carryover</span>
                </div>

                <div className="p-4 rounded-2xl bg-[#EFF5EE] border border-[#A8B99E]/60 space-y-1">
                  <span className="text-[11px] text-[#294C3A] font-semibold block">2. Savings Target</span>
                  <span className="text-xl font-display font-extrabold text-[#294C3A] tabular-nums block">
                    {formatINR(monthlyData.actualSavings)}
                  </span>
                  <span className="text-[10px] text-[#294C3A]">100% achieved (Paid first)</span>
                </div>

                <div className="p-4 rounded-2xl bg-[#F8F8F3] border border-[#E1E6DD] space-y-1">
                  <span className="text-[11px] text-[#727B73] block">3. Actual Spent</span>
                  <span className="text-xl font-display font-extrabold text-[#242C27] tabular-nums block">
                    {formatINR(monthlyData.actualSpent)}
                  </span>
                  <span className="text-[10px] text-[#727B73]">of {formatINR(monthlyData.monthlyBudgetPool)} pool</span>
                </div>

                <div className="p-4 rounded-2xl bg-[#EFF5EE] border border-[#A8B99E]/60 space-y-1">
                  <span className="text-[11px] text-[#294C3A] font-semibold block">4. Net Surplus</span>
                  <span className="text-xl font-display font-extrabold text-[#294C3A] tabular-nums block">
                    +{formatINR(monthlyData.netSurplus)}
                  </span>
                  <span className="text-[10px] text-[#294C3A]">Safe carryover buffer</span>
                </div>

              </div>

              {/* 4 Pillars Planned vs Actual Horizontal Bars */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#242C27] uppercase tracking-wider">
                    Pillars: Planned vs Actual Spending
                  </span>
                  <span className="text-xs text-[#727B73]">Controlled allocation</span>
                </div>

                <div className="space-y-3">
                  {monthlyData.pillars.map((pillar) => {
                    const pctOfPlanned = Math.round((pillar.actual / pillar.planned) * 100);
                    return (
                      <div key={pillar.name} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-[#242C27] flex items-center gap-1.5">
                            <span
                              className="w-2.5 h-2.5 rounded-full"
                              style={{ backgroundColor: pillar.color }}
                            />
                            {pillar.name} ({pillar.pct}%)
                          </span>
                          <span className="text-[#727B73] tabular-nums">
                            {formatINR(pillar.actual)} / {formatINR(pillar.planned)}
                          </span>
                        </div>

                        <div className="w-full bg-[#E1E6DD] h-2.5 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-1000 ease-out"
                            style={{
                              width: isVisible ? `${Math.min(100, pctOfPlanned)}%` : '0%',
                              backgroundColor: pillar.color,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          ) : (
            /* Kaizen Reflection View */
            <div className="space-y-4 py-2">
              <div className="p-4 rounded-2xl bg-[#F8F8F3] border border-[#E1E6DD] space-y-2">
                <span className="text-xs font-bold text-[#294C3A] block">
                  Question 4: "How can I improve next month?"
                </span>
                <p className="text-xs sm:text-sm text-[#727B73] leading-relaxed">
                  "Notice that weekend coffee runs added up to ₹2,400. Let's redirect ₹1,000 to the Growth pillar for the upcoming UX certification next month."
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl border border-[#E1E6DD] bg-white">
                  <span className="font-bold text-[#242C27] block mb-1">What went well:</span>
                  <p className="text-[#727B73]">Committed ₹18,000 savings upfront into Index SIP without hesitation.</p>
                </div>
                <div className="p-3.5 rounded-xl border border-[#E1E6DD] bg-white">
                  <span className="font-bold text-[#242C27] block mb-1">Next month focus:</span>
                  <p className="text-[#727B73]">Cut impulsive quick-commerce midnight orders by keeping groceries planned.</p>
                </div>
              </div>
            </div>
          )}

          {/* Action Row */}
          <div className="pt-4 border-t border-[#E1E6DD] flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-[#727B73]">
              Review your finances every month in under 5 calm minutes.
            </span>
            <button
              onClick={onOpenCheckout}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-[#294C3A] hover:bg-[#1E372A] rounded-xl transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <span>Get MOKU Lifetime — ₹499</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
