import React, { useState } from 'react';
import {
  SimulatorState,
  INITIAL_SIMULATOR_STATE,
  KakeiboCategory,
  addSimulatorExpense,
  calculateCategoryPercentages,
  getSvgCircleProgress,
} from '../utils/simulator';
import { formatINR } from '../utils/kakeibo';
import { useScrollReveal } from '../hooks/useScrollReveal';
import {
  Sparkles,
  ArrowRight,
  RotateCcw,
  Check,
  CreditCard,
  Smartphone,
  Plus,
  HelpCircle,
  TrendingDown,
} from 'lucide-react';

interface InteractiveSimulatorProps {
  onOpenCheckout: () => void;
}

export const InteractiveSimulator: React.FC<InteractiveSimulatorProps> = ({ onOpenCheckout }) => {
  const { ref, isVisible } = useScrollReveal();
  const [state, setState] = useState<SimulatorState>(INITIAL_SIMULATOR_STATE);
  const [expenseAmount, setExpenseAmount] = useState<string>('350');
  const [expenseTitle, setExpenseTitle] = useState<string>('Lunch with colleagues');
  const [selectedCategory, setSelectedCategory] = useState<KakeiboCategory>('wants');
  const [paymentMode, setPaymentMode] = useState<'UPI' | 'Card' | 'Cash'>('UPI');
  const [lastAddedAlert, setLastAddedAlert] = useState<string | null>(null);

  const percentages = calculateCategoryPercentages(state.categorySpending);

  // SVG Progress Ring calculations for Available Pool
  const radius = 54;
  const poolProgress = getSvgCircleProgress(
    state.currentAvailableToSpend,
    state.initialSpendablePool,
    radius
  );

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(expenseAmount);
    if (!amountNum || amountNum <= 0) return;

    const updated = addSimulatorExpense(
      state,
      amountNum,
      selectedCategory,
      expenseTitle || 'Quick expense',
      paymentMode
    );
    setState(updated);

    // Show temporary feedback flash
    setLastAddedAlert(`Logged ${formatINR(amountNum)} under ${selectedCategory.toUpperCase()}`);
    setTimeout(() => setLastAddedAlert(null), 3000);

    // Reset title field but keep a friendly default
    setExpenseTitle('');
  };

  const handleReset = () => {
    setState(INITIAL_SIMULATOR_STATE);
    setExpenseAmount('350');
    setExpenseTitle('Lunch with colleagues');
    setSelectedCategory('wants');
    setLastAddedAlert('Simulator restored to default illustrative values');
    setTimeout(() => setLastAddedAlert(null), 2500);
  };

  const categoriesConfig: Array<{
    id: KakeiboCategory;
    name: string;
    sub: string;
    color: string;
    bg: string;
  }> = [
    {
      id: 'essentials',
      name: 'Essentials',
      sub: 'Needs',
      color: '#54745A',
      bg: '#EFF5EE',
    },
    {
      id: 'wants',
      name: 'Wants',
      sub: 'Enjoyment',
      color: '#B38B60',
      bg: '#FBF5EE',
    },
    {
      id: 'growth',
      name: 'Growth',
      sub: 'Learning',
      color: '#66899B',
      bg: '#EEF6F9',
    },
    {
      id: 'unexpected',
      name: 'Unexpected',
      sub: 'Unplanned',
      color: '#8C7B99',
      bg: '#FAF0F5',
    },
  ];

  return (
    <section id="simulator" ref={ref} className="py-20 md:py-28 bg-[#F8F8F3] border-t border-[#E1E6DD]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div
          className={`max-w-2xl mx-auto text-center space-y-4 mb-14 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#476B57]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Try It Yourself</span>
            <span aria-hidden="true">·</span>
            <span>Interactive Product Simulation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#242C27] tracking-tight text-balance">
            Experience Mindful Money in Real Time
          </h2>
          <p className="text-base sm:text-lg text-[#727B73] leading-relaxed">
            Add a mock expense below and observe how MOKU instantly rebalances your spendable pool, logs payment modes, and protects your committed savings.
          </p>
          <div className="inline-block px-3 py-1 text-[11px] font-medium text-[#727B73] bg-[#EFF2E9] rounded-full border border-[#E1E6DD]">
            Demo Environment · No bank account connection required
          </div>
        </div>

        {/* 2-Column Simulation Workbench */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          
          {/* Left Column: Interactive Input Controls */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-[#E1E6DD] shadow-sm space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-[#E1E6DD]">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-[#EFF2E9] text-[#294C3A] flex items-center justify-center font-bold text-sm">
                  +
                </span>
                <div>
                  <h3 className="text-base font-display font-bold text-[#242C27]">
                    Log An Expense
                  </h3>
                  <span className="text-[11px] text-[#727B73]">Kakeibo Quick Entry</span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="text-xs font-medium text-[#727B73] hover:text-[#242C27] flex items-center gap-1 transition-colors cursor-pointer"
                title="Reset simulation data"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Demo</span>
              </button>
            </div>

            <form onSubmit={handleAddExpense} className="space-y-5">
              
              {/* Amount input & denomination chips */}
              <div className="space-y-2">
                <label htmlFor="sim-amount" className="block text-xs font-semibold text-[#242C27]">
                  Amount (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-lg font-bold text-[#727B73]">
                    ₹
                  </span>
                  <input
                    id="sim-amount"
                    type="number"
                    min="1"
                    max="50000"
                    required
                    value={expenseAmount}
                    onChange={(e) => setExpenseAmount(e.target.value)}
                    className="w-full pl-8 pr-4 py-2.5 bg-[#F8F8F3] border border-[#E1E6DD] rounded-xl text-lg font-display font-bold text-[#242C27] focus:outline-hidden focus:border-[#294C3A] transition-colors tabular-nums"
                  />
                </div>

                {/* Quick denomination chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {[50, 150, 350, 750, 1500, 2500].map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => setExpenseAmount(chip.toString())}
                      className="px-2.5 py-1 text-xs font-medium bg-[#EFF2E9] hover:bg-[#E1E6DD] text-[#242C27] rounded-lg transition-colors cursor-pointer"
                    >
                      +{formatINR(chip)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Four Kakeibo Pillars Selector */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-[#242C27]">
                  Assign Kakeibo Pillar
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {categoriesConfig.map((cat) => {
                    const isSelected = selectedCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'border-2 shadow-xs'
                            : 'border-[#E1E6DD] bg-[#F8F8F3] hover:border-[#A8B99E]'
                        }`}
                        style={{
                          borderColor: isSelected ? cat.color : undefined,
                          backgroundColor: isSelected ? cat.bg : undefined,
                        }}
                      >
                        <div>
                          <span
                            className="text-xs font-bold block"
                            style={{ color: cat.color }}
                          >
                            {cat.name}
                          </span>
                          <span className="text-[10px] text-[#727B73]">{cat.sub}</span>
                        </div>
                        {isSelected && (
                          <span
                            className="w-4 h-4 rounded-full flex items-center justify-center text-white text-[10px]"
                            style={{ backgroundColor: cat.color }}
                          >
                            <Check className="w-3 h-3 stroke-[3]" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Memo / Description */}
              <div className="space-y-1.5">
                <label htmlFor="sim-title" className="block text-xs font-semibold text-[#242C27]">
                  Description / Merchant (Optional)
                </label>
                <input
                  id="sim-title"
                  type="text"
                  placeholder="e.g. Swiggy lunch, Metro recharge, Books..."
                  value={expenseTitle}
                  onChange={(e) => setExpenseTitle(e.target.value)}
                  className="w-full px-3.5 py-2 bg-[#F8F8F3] border border-[#E1E6DD] rounded-xl text-xs text-[#242C27] focus:outline-hidden focus:border-[#294C3A]"
                />
              </div>

              {/* Payment Mode */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#242C27]">
                  Payment Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['UPI', 'Card', 'Cash'] as const).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setPaymentMode(mode)}
                      className={`py-2 text-xs font-semibold rounded-lg border transition-colors cursor-pointer text-center ${
                        paymentMode === mode
                          ? 'border-[#294C3A] bg-[#294C3A] text-white'
                          : 'border-[#E1E6DD] text-[#727B73] hover:text-[#242C27] bg-[#F8F8F3]'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3.5 text-sm font-semibold text-white bg-[#294C3A] hover:bg-[#1E372A] active:scale-[0.98] rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Expense to Ledger</span>
              </button>
            </form>

            {/* Notification alert banner */}
            {lastAddedAlert && (
              <div className="p-3 bg-[#EFF5EE] border border-[#A8B99E]/60 rounded-xl text-xs text-[#294C3A] font-medium flex items-center gap-2 animate-in fade-in duration-200">
                <Check className="w-4 h-4 shrink-0 text-[#476B57]" />
                <span>{lastAddedAlert}</span>
              </div>
            )}

          </div>

          {/* Right Column: Simulated Live Smartphone Dashboard */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-[#E1E6DD] shadow-sm space-y-6">
            
            {/* Top Bar of Mockup */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E1E6DD]">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-[#476B57]" />
                <span className="text-xs font-bold text-[#242C27]">MOKU Dashboard Simulation</span>
              </div>
              <span className="text-[11px] font-mono text-[#727B73] bg-[#EFF2E9] px-2 py-0.5 rounded-md">
                October 2026
              </span>
            </div>

            {/* Top Financial Stat Cards */}
            <div className="grid grid-cols-2 gap-3">
              
              {/* Available to Spend Card */}
              <div className="p-4 rounded-2xl bg-[#294C3A] text-white space-y-1 relative overflow-hidden">
                <span className="text-[10px] uppercase font-semibold text-[#A8B99E] tracking-wider block">
                  Available to Spend
                </span>
                <span className="text-2xl font-display font-extrabold tabular-nums block">
                  {formatINR(state.currentAvailableToSpend)}
                </span>
                <span className="text-[10px] text-white/70 block">
                  Out of {formatINR(state.initialSpendablePool)} monthly pool
                </span>
              </div>

              {/* Committed Savings Card */}
              <div className="p-4 rounded-2xl bg-[#EFF5EE] border border-[#A8B99E]/40 text-[#294C3A] space-y-1">
                <span className="text-[10px] uppercase font-semibold text-[#476B57] tracking-wider block">
                  Committed Savings
                </span>
                <span className="text-2xl font-display font-extrabold tabular-nums block">
                  {formatINR(state.savingsCommitted)}
                </span>
                <span className="text-[10px] text-[#727B73] block">
                  Paid to self first · Protected
                </span>
              </div>

            </div>

            {/* Live Category Allocation Visualizer */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#242C27]">
                  Current Spending by 4 Pillars
                </span>
                <span className="text-xs font-medium text-[#727B73] tabular-nums">
                  Total Spent: {formatINR(percentages.total)}
                </span>
              </div>

              {/* Dynamic Segmented Progress Bar */}
              <div className="w-full h-3 bg-[#E1E6DD] rounded-full overflow-hidden flex transition-all duration-500">
                <div
                  style={{ width: `${percentages.essentials}%`, backgroundColor: '#54745A' }}
                  className="h-full transition-all duration-500"
                  title={`Essentials: ${percentages.essentials}%`}
                />
                <div
                  style={{ width: `${percentages.wants}%`, backgroundColor: '#B38B60' }}
                  className="h-full transition-all duration-500"
                  title={`Wants: ${percentages.wants}%`}
                />
                <div
                  style={{ width: `${percentages.growth}%`, backgroundColor: '#66899B' }}
                  className="h-full transition-all duration-500"
                  title={`Growth: ${percentages.growth}%`}
                />
                <div
                  style={{ width: `${percentages.unexpected}%`, backgroundColor: '#8C7B99' }}
                  className="h-full transition-all duration-500"
                  title={`Unexpected: ${percentages.unexpected}%`}
                />
              </div>

              {/* 4 Pillars Legend & Live Sums */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
                {categoriesConfig.map((c) => (
                  <div key={c.id} className="p-2 rounded-xl bg-[#F8F8F3] border border-[#E1E6DD]">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: c.color }}
                      />
                      <span className="font-semibold text-[#242C27] truncate">{c.name}</span>
                    </div>
                    <span className="text-[11px] font-display font-bold text-[#727B73] mt-0.5 block tabular-nums">
                      {formatINR(state.categorySpending[c.id])}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Transaction Ledger Stream */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-[#242C27] block">
                Recent Logged Transactions (Live Feed)
              </span>
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {state.transactions.map((tx) => {
                  const catMatch = categoriesConfig.find((c) => c.id === tx.category);
                  return (
                    <div
                      key={tx.id}
                      className="p-2.5 rounded-xl border border-[#E1E6DD] bg-[#F8F8F3] flex items-center justify-between text-xs transition-all hover:bg-white"
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: catMatch?.color || '#54745A' }}
                        />
                        <div>
                          <span className="font-semibold text-[#242C27] block truncate max-w-[150px]">
                            {tx.title}
                          </span>
                          <span className="text-[10px] text-[#727B73]">
                            {tx.paymentMode} · {catMatch?.name} · {tx.timestamp}
                          </span>
                        </div>
                      </div>
                      <span className="font-display font-bold text-[#294C3A] tabular-nums">
                        -{formatINR(tx.amount)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CTA bottom */}
            <div className="pt-2 border-t border-[#E1E6DD] flex items-center justify-between">
              <span className="text-[11px] text-[#727B73]">Like how this feels?</span>
              <button
                onClick={onOpenCheckout}
                className="text-xs font-semibold text-[#294C3A] hover:text-[#1E372A] flex items-center gap-1 cursor-pointer"
              >
                <span>Get Full MOKU for ₹499</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
