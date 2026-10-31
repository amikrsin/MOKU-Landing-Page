import React, { useState, useMemo } from 'react';
import { calculateKakeiboAllocation, formatINR } from '../utils/kakeibo';
import { ArrowRight, Calculator, Check, Info } from 'lucide-react';

interface KakeiboCalculatorProps {
  onOpenCheckout: () => void;
}

export const KakeiboCalculator: React.FC<KakeiboCalculatorProps> = ({ onOpenCheckout }) => {
  const [salary, setSalary] = useState<number>(75000);
  const [savingsRate, setSavingsRate] = useState<number>(20);

  const presets = [40000, 65000, 85000, 120000, 180000];

  const allocation = useMemo(() => {
    return calculateKakeiboAllocation(salary, savingsRate, 30);
  }, [salary, savingsRate]);

  return (
    <section className="py-20 md:py-28 bg-[#F8F8F3] border-t border-[#E1E6DD]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#476B57]">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Tool</span>
            <span aria-hidden="true">·</span>
            <span>Indian Salary Benchmark</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#242C27] tracking-tight text-balance">
            See Your Salary Through the Kakeibo Lens
          </h2>
          <p className="text-base sm:text-lg text-[#727B73] leading-relaxed">
            Choose your monthly take-home salary and target savings rate. Watch how Kakeibo gives every rupee a purpose before the month even begins.
          </p>
        </div>

        {/* Calculator Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#E1E6DD] shadow-md max-w-4xl mx-auto">
          
          {/* Controls Bar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-8 border-b border-[#E1E6DD]">
            
            {/* Salary Input */}
            <div className="space-y-3">
              <label htmlFor="salary-input" className="block text-sm font-semibold text-[#242C27]">
                Monthly Take-Home Salary (₹)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-[#727B73]">
                  ₹
                </span>
                <input
                  id="salary-input"
                  type="number"
                  min="5000"
                  max="1000000"
                  step="5000"
                  value={salary}
                  onChange={(e) => setSalary(Number(e.target.value) || 0)}
                  className="w-full pl-9 pr-4 py-3 bg-[#F8F8F3] border border-[#E1E6DD] rounded-xl text-lg font-display font-bold text-[#242C27] focus:outline-hidden focus:border-[#294C3A] transition-colors tabular-nums"
                  aria-label="Monthly Take-Home Salary"
                />
              </div>

              {/* Quick Presets */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-xs text-[#727B73] mr-1">Presets:</span>
                {presets.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setSalary(preset)}
                    className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                      salary === preset
                        ? 'bg-[#294C3A] text-white shadow-xs'
                        : 'bg-[#EFF2E9] text-[#242C27] hover:bg-[#E1E6DD]'
                    }`}
                  >
                    {formatINR(preset)}
                  </button>
                ))}
              </div>
            </div>

            {/* Savings Rate Slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label htmlFor="savings-slider" className="text-sm font-semibold text-[#242C27]">
                  Committed Savings Target
                </label>
                <span className="text-sm font-display font-extrabold text-[#294C3A] tabular-nums">
                  {savingsRate}% ({formatINR(allocation.savingsAmount)})
                </span>
              </div>

              <input
                id="savings-slider"
                type="range"
                min="5"
                max="50"
                step="5"
                value={savingsRate}
                onChange={(e) => setSavingsRate(Number(e.target.value))}
                className="w-full h-2 bg-[#EFF2E9] rounded-lg appearance-none cursor-pointer accent-[#294C3A]"
                aria-label="Savings Target Percentage"
              />

              <div className="flex justify-between text-[11px] text-[#727B73]">
                <span>5% (Starter)</span>
                <span>20% (Recommended)</span>
                <span>35% (Aggressive)</span>
                <span>50% (Max)</span>
              </div>

              <p className="text-xs text-[#727B73] flex items-center gap-1.5 pt-1">
                <Info className="w-3.5 h-3.5 text-[#476B57] shrink-0" />
                <span>Kakeibo commits this amount first before allocating daily spending.</span>
              </p>
            </div>

          </div>

          {/* Results Summary Ribbon */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-8 border-b border-[#E1E6DD]">
            <div className="bg-[#EFF2E9]/60 rounded-2xl p-4 border border-[#E1E6DD]">
              <span className="text-xs text-[#727B73] block">1. Inflow Salary</span>
              <span className="text-xl sm:text-2xl font-display font-extrabold text-[#242C27] tabular-nums mt-0.5 block">
                {formatINR(allocation.monthlySalary)}
              </span>
              <span className="text-[11px] text-[#727B73] mt-1 block">Total monthly take-home</span>
            </div>

            <div className="bg-[#EFF5EE] rounded-2xl p-4 border border-[#A8B99E]/50">
              <span className="text-xs text-[#294C3A] font-semibold block">2. Savings Committed First</span>
              <span className="text-xl sm:text-2xl font-display font-extrabold text-[#294C3A] tabular-nums mt-0.5 block">
                {formatINR(allocation.savingsAmount)}
              </span>
              <span className="text-[11px] text-[#294C3A]/80 mt-1 block">Paid to self (SIP + emergency fund)</span>
            </div>

            <div className="bg-[#EFF2E9]/60 rounded-2xl p-4 border border-[#E1E6DD]">
              <span className="text-xs text-[#727B73] block">3. True Spendable Pool</span>
              <span className="text-xl sm:text-2xl font-display font-extrabold text-[#242C27] tabular-nums mt-0.5 block">
                {formatINR(allocation.spendablePool)}
              </span>
              <span className="text-[11px] text-[#727B73] mt-1 block">
                Safe Daily Burn: <strong className="text-[#242C27]">{formatINR(allocation.dailyBurnLimit)}/day</strong>
              </span>
            </div>
          </div>

          {/* 4 Pillars Allocation Grid */}
          <div className="pt-8 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-display font-bold text-[#242C27]">
                Recommended 4-Pillar Allocation of Spendable Pool:
              </h3>
              <span className="text-xs text-[#727B73] hidden sm:inline">100% of Spendable Pool</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Essentials */}
              <div className="p-4 rounded-xl border border-[#E1E6DD] bg-[#F8F8F3] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#294C3A]">Essentials (50%)</span>
                  <span className="text-sm font-display font-extrabold text-[#242C27] tabular-nums">
                    {formatINR(allocation.pillars.essentials.amount)}
                  </span>
                </div>
                <p className="text-[11px] text-[#727B73] leading-snug">
                  Rent, groceries, WiFi, electricity, medicines & transit.
                </p>
                <div className="w-full bg-[#E1E6DD] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#294C3A] h-full w-1/2" />
                </div>
              </div>

              {/* Wants */}
              <div className="p-4 rounded-xl border border-[#E1E6DD] bg-[#F8F8F3] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#B57C2A]">Wants (25%)</span>
                  <span className="text-sm font-display font-extrabold text-[#242C27] tabular-nums">
                    {formatINR(allocation.pillars.wants.amount)}
                  </span>
                </div>
                <p className="text-[11px] text-[#727B73] leading-snug">
                  Dining out, specialty coffee, movies & weekend shopping.
                </p>
                <div className="w-full bg-[#E1E6DD] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#B57C2A] h-full w-1/4" />
                </div>
              </div>

              {/* Growth */}
              <div className="p-4 rounded-xl border border-[#E1E6DD] bg-[#F8F8F3] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#346B84]">Growth (15%)</span>
                  <span className="text-sm font-display font-extrabold text-[#242C27] tabular-nums">
                    {formatINR(allocation.pillars.growth.amount)}
                  </span>
                </div>
                <p className="text-[11px] text-[#727B73] leading-snug">
                  Non-fiction books, certifications, gym/yoga & enrichment.
                </p>
                <div className="w-full bg-[#E1E6DD] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#346B84] h-full w-[15%]" />
                </div>
              </div>

              {/* Unexpected */}
              <div className="p-4 rounded-xl border border-[#E1E6DD] bg-[#F8F8F3] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#8A4A58]">Unexpected (10%)</span>
                  <span className="text-sm font-display font-extrabold text-[#242C27] tabular-nums">
                    {formatINR(allocation.pillars.unexpected.amount)}
                  </span>
                </div>
                <p className="text-[11px] text-[#727B73] leading-snug">
                  Vehicle service, emergency clinic visit & urgent repairs.
                </p>
                <div className="w-full bg-[#E1E6DD] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#8A4A58] h-full w-[10%]" />
                </div>
              </div>

            </div>
          </div>

          {/* Action CTA in Calculator */}
          <div className="mt-8 pt-6 border-t border-[#E1E6DD] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs sm:text-sm text-[#727B73]">
              Ready to manage this monthly plan on your phone with zero subscriptions?
            </p>
            <button
              onClick={onOpenCheckout}
              className="w-full sm:w-auto px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-[#294C3A] hover:bg-[#1E372A] rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              <span>Get MOKU Lifetime Access — ₹499</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
