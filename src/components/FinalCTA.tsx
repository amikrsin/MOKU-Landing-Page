import React from 'react';
import { ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface FinalCTAProps {
  onOpenCheckout: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenCheckout }) => {
  return (
    <section className="py-20 md:py-28 bg-[#294C3A] text-white relative overflow-hidden">
      {/* Background Zen Circles */}
      <div
        aria-hidden="true"
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full border border-white/10 pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full border border-white/5 pointer-events-none"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
        
        {/* Kicker */}
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#A8B99E]">
          <span>Mindful Budgeting Starts Today</span>
        </div>

        {/* Headline */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-balance">
          Start Making More Intentional Money Decisions.
        </h2>

        {/* Supporting Text */}
        <p className="text-base sm:text-xl text-[#F8F8F3]/80 leading-relaxed max-w-2xl mx-auto">
          Take the first step towards mindful spending and intentional savings — with MOKU.
        </p>

        {/* Action Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenCheckout}
            className="w-full sm:w-auto px-8 py-4 text-base font-bold text-[#242C27] bg-[#F8F8F3] hover:bg-white active:scale-[0.98] rounded-xl shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer group"
          >
            <span>Get MOKU Lifetime Access — ₹499</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#294C3A]" />
          </button>
        </div>

        {/* Trust row */}
        <div className="pt-6 border-t border-white/15 flex flex-wrap items-center justify-center gap-4 text-xs text-[#A8B99E]">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#A8B99E]" />
            <span>One-time payment</span>
          </div>
          <span>·</span>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#A8B99E]" />
            <span>No recurring subscription</span>
          </div>
          <span>·</span>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#A8B99E]" />
            <span>Secure Razorpay checkout</span>
          </div>
        </div>

      </div>
    </section>
  );
};
