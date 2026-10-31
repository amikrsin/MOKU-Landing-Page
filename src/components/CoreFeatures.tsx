import React from 'react';
import {
  LayoutDashboard,
  PieChart,
  PlusCircle,
  BarChart3,
  TrendingUp,
  Shield,
  ArrowRight,
  Lock,
  Download,
  Smartphone,
} from 'lucide-react';
import { KAKEIBO_PILLARS } from '../data/mokuData';

interface CoreFeaturesProps {
  onOpenScreenshot: (id: string) => void;
  onOpenCheckout: () => void;
}

export const CoreFeatures: React.FC<CoreFeaturesProps> = ({ onOpenScreenshot, onOpenCheckout }) => {
  return (
    <section id="features" className="py-20 md:py-28 bg-[#EFF2E9]/40 border-t border-[#E1E6DD]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#476B57]">
            <span>Crafted With Intention</span>
            <span aria-hidden="true">·</span>
            <span>Zero Fluff</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#242C27] tracking-tight text-balance">
            Six Thoughtful Features for Real Financial Peace
          </h2>
          <p className="text-base sm:text-lg text-[#727B73] leading-relaxed">
            Every feature in MOKU exists to answer one question: does this build mindfulness and clarity in your everyday relationship with money?
          </p>
        </div>

        {/* Features Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Feature 1: Mindful Budget Dashboard */}
          <div className="bg-white rounded-2xl p-7 border border-[#E1E6DD] shadow-xs flex flex-col justify-between hover:border-[#A8B99E] transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#EFF2E9] text-[#294C3A] flex items-center justify-center mb-5">
                <LayoutDashboard className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-display font-bold text-[#242C27] mb-2">
                1. Mindful Budget Dashboard
              </h3>
              <p className="text-sm text-[#727B73] leading-relaxed mb-4">
                Instantly see your live <strong>Available-to-Spend</strong> balance, monthly spendable pool, and real-time remaining days indicator.
              </p>
              <ul className="text-xs text-[#242C27] space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#476B57]" />
                  <span>Committed savings goal locked upfront</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#476B57]" />
                  <span>Clear "Spendable Pool" vs total salary inflow</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#476B57]" />
                  <span>Remaining days progress calculation</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => onOpenScreenshot('dashboard')}
              className="text-xs font-semibold text-[#294C3A] hover:text-[#1E372A] inline-flex items-center gap-1.5 cursor-pointer pt-3 border-t border-[#E1E6DD]"
            >
              <span>Inspect Dashboard UI</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Feature 2: 4 Kakeibo Spending Pillars */}
          <div className="bg-white rounded-2xl p-7 border border-[#E1E6DD] shadow-xs flex flex-col justify-between hover:border-[#A8B99E] transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#EFF2E9] text-[#294C3A] flex items-center justify-center mb-5">
                <PieChart className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-display font-bold text-[#242C27] mb-2">
                2. Four Kakeibo Pillars
              </h3>
              <p className="text-sm text-[#727B73] leading-relaxed mb-4">
                Instead of 40 confusing spreadsheet tags, MOKU organizes your daily life into four intuitive Japanese pillars:
              </p>
              <div className="grid grid-cols-2 gap-2 mb-6">
                {KAKEIBO_PILLARS.map((pillar) => (
                  <div key={pillar.id} className="p-2.5 rounded-lg border border-[#E1E6DD] bg-[#F8F8F3]">
                    <span className="text-[11px] font-bold text-[#242C27] block truncate">{pillar.title}</span>
                    <span className="text-[10px] text-[#727B73] block truncate">{pillar.role}</span>
                  </div>
                ))}
              </div>
            </div>
            <a
              href="#kakeibo"
              className="text-xs font-semibold text-[#294C3A] hover:text-[#1E372A] inline-flex items-center gap-1.5 cursor-pointer pt-3 border-t border-[#E1E6DD]"
            >
              <span>Learn Kakeibo Philosophy</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Feature 3: Expense Management */}
          <div className="bg-white rounded-2xl p-7 border border-[#E1E6DD] shadow-xs flex flex-col justify-between hover:border-[#A8B99E] transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#EFF2E9] text-[#294C3A] flex items-center justify-center mb-5">
                <PlusCircle className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-display font-bold text-[#242C27] mb-2">
                3. Quick Expense Logging
              </h3>
              <p className="text-sm text-[#727B73] leading-relaxed mb-4">
                Fast, friction-free transaction capture built for rapid daily entry on Indian payment modes:
              </p>
              <ul className="text-xs text-[#242C27] space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#476B57]" />
                  <span>One-tap quick chips: +₹50, +₹100, +₹500, +₹1k, +₹2k</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#476B57]" />
                  <span>Payment accounts: UPI, Card, Cash, NetBanking</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#476B57]" />
                  <span>Joy reflection tag: <em>Essential</em>, <em>Joyful</em>, or <em>Could Skip</em></span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => onOpenScreenshot('expense')}
              className="text-xs font-semibold text-[#294C3A] hover:text-[#1E372A] inline-flex items-center gap-1.5 cursor-pointer pt-3 border-t border-[#E1E6DD]"
            >
              <span>Inspect Expense Flow</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Feature 4: Monthly Financial Review */}
          <div className="bg-white rounded-2xl p-7 border border-[#E1E6DD] shadow-xs flex flex-col justify-between hover:border-[#A8B99E] transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#EFF2E9] text-[#294C3A] flex items-center justify-center mb-5">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-display font-bold text-[#242C27] mb-2">
                4. Monthly Financial Review
              </h3>
              <p className="text-sm text-[#727B73] leading-relaxed mb-4">
                Conduct a calm, objective end-of-month financial audit with Kaizen continuous improvement:
              </p>
              <ul className="text-xs text-[#242C27] space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#476B57]" />
                  <span>Target savings achieved vs committed goal</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#476B57]" />
                  <span>Daily spending velocity & safe daily burn limit</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#476B57]" />
                  <span>Net surplus or deficit buffer tracking</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => onOpenScreenshot('review')}
              className="text-xs font-semibold text-[#294C3A] hover:text-[#1E372A] inline-flex items-center gap-1.5 cursor-pointer pt-3 border-t border-[#E1E6DD]"
            >
              <span>Inspect Review Audit UI</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Feature 5: Savings and Investment Log */}
          <div className="bg-white rounded-2xl p-7 border border-[#E1E6DD] shadow-xs flex flex-col justify-between hover:border-[#A8B99E] transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#EFF2E9] text-[#294C3A] flex items-center justify-center mb-5">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-display font-bold text-[#242C27] mb-2">
                5. Savings & Investment Log
              </h3>
              <p className="text-sm text-[#727B73] leading-relaxed mb-4">
                Log the wealth you pay to yourself first before spending a single rupee of monthly salary:
              </p>
              <ul className="text-xs text-[#242C27] space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#476B57]" />
                  <span>Mutual funds SIP & index fund tracking</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#476B57]" />
                  <span>Fixed Deposits (FDs) & Emergency Fund cushion</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#476B57]" />
                  <span>Clear distinction between liquid savings & investments</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => onOpenScreenshot('settings')}
              className="text-xs font-semibold text-[#294C3A] hover:text-[#1E372A] inline-flex items-center gap-1.5 cursor-pointer pt-3 border-t border-[#E1E6DD]"
            >
              <span>Inspect Settings UI</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Feature 6: Privacy and Data Management */}
          <div className="bg-white rounded-2xl p-7 border border-[#E1E6DD] shadow-xs flex flex-col justify-between hover:border-[#A8B99E] transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#EFF2E9] text-[#294C3A] flex items-center justify-center mb-5">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-display font-bold text-[#242C27] mb-2">
                6. Honest Offline Privacy
              </h3>
              <p className="text-sm text-[#727B73] leading-relaxed mb-4">
                Your financial ledger belongs strictly to you. No bank scrapers or ad brokers ever see your data:
              </p>
              <ul className="text-xs text-[#242C27] space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-[#476B57]" />
                  <span>Device-level 4-digit PIN security</span>
                </li>
                <li className="flex items-center gap-2">
                  <Smartphone className="w-3.5 h-3.5 text-[#476B57]" />
                  <span>Local-first architecture works 100% offline</span>
                </li>
                <li className="flex items-center gap-2">
                  <Download className="w-3.5 h-3.5 text-[#476B57]" />
                  <span>Full structured data export capability</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => onOpenScreenshot('pin')}
              className="text-xs font-semibold text-[#294C3A] hover:text-[#1E372A] inline-flex items-center gap-1.5 cursor-pointer pt-3 border-t border-[#E1E6DD]"
            >
              <span>Inspect PIN Security UI</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
