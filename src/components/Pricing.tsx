import React, { useState } from 'react';
import { Check, ShieldCheck, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface PricingProps {
  onOpenCheckout: () => void;
}

export const Pricing: React.FC<PricingProps> = ({ onOpenCheckout }) => {
  const { ref, isVisible } = useScrollReveal(0.05);
  const [hovered, setHovered] = useState(false);

  const licenseHighlights = [
    'One-time payment of ₹499 — no recurring monthly bills',
    'Lifetime license for defined core budgeting features',
    'Full access to the current MOKU progressive web app',
    'Product updates within the stated license scope',
    'Local-first offline profile with device PIN security',
    '4 Kakeibo spending pillars & Kaizen review audits',
    'Structured CSV/JSON transaction data export',
    'Support via direct founder desk email',
  ];

  return (
    <section id="pricing" ref={ref} className="py-20 md:py-28 bg-[#EFF2E9]/40 border-t border-[#E1E6DD]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div
          className={`max-w-2xl mx-auto text-center space-y-4 mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#476B57]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Honest & Predictable</span>
            <span aria-hidden="true">·</span>
            <span>Indian SaaS Model</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#242C27] tracking-tight text-balance">
            Simple Pricing. No Monthly Subscription.
          </h2>
          <p className="text-base sm:text-lg text-[#727B73] leading-relaxed">
            Most finance apps charge ₹299 every single month. We believe your budgeting tool should never be another monthly subscription leak.
          </p>
        </div>

        {/* Pricing Card with Subtle Emphasis & Hover Interaction */}
        <div className="max-w-xl mx-auto">
          <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={`bg-white rounded-3xl p-8 sm:p-10 border-2 transition-all duration-300 relative overflow-hidden shadow-xl ${
              hovered
                ? 'border-[#294C3A] shadow-2xl -translate-y-1'
                : 'border-[#294C3A]/30'
            }`}
          >
            {/* Top Subtle Aura */}
            <div
              aria-hidden="true"
              className="absolute -top-20 -right-20 w-44 h-44 bg-[#A8B99E]/20 rounded-full blur-2xl pointer-events-none"
            />

            {/* Top Badge */}
            <div className="flex items-center justify-between pb-6 border-b border-[#E1E6DD] relative z-10">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#476B57]">
                  Commercial Release
                </span>
                <h3 className="text-2xl font-display font-extrabold text-[#242C27] mt-0.5">
                  MOKU Lifetime Access
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#EFF5EE] text-[#294C3A] border border-[#A8B99E]/60">
                Single Payment
              </span>
            </div>

            {/* Animated Price Reveal */}
            <div className="py-8 relative z-10">
              <div className="flex items-baseline gap-2">
                <span
                  className={`text-5xl sm:text-6xl font-display font-extrabold text-[#242C27] tabular-nums tracking-tight transition-transform duration-700 ${
                    isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
                  }`}
                >
                  ₹499
                </span>
                <span className="text-sm sm:text-base text-[#727B73] font-medium">
                  one-time payment
                </span>
              </div>
              <p className="text-xs text-[#727B73] mt-2">
                Includes all taxes. Pay once, use forever for defined core features.
              </p>
            </div>

            {/* Feature Checklist with Staggered Delays */}
            <div className="space-y-3 pb-8 border-b border-[#E1E6DD] relative z-10">
              <span className="text-xs font-bold uppercase tracking-wider text-[#242C27] block mb-2">
                What is included in your lifetime license:
              </span>
              {licenseHighlights.map((feat, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-2.5 text-sm text-[#242C27] transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-3'
                  }`}
                  style={{ transitionDelay: `${idx * 60}ms` }}
                >
                  <Check className="w-4 h-4 text-[#476B57] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* Primary Action Button */}
            <div className="pt-8 space-y-4 relative z-10">
              <button
                onClick={onOpenCheckout}
                className="w-full py-4 px-6 text-base font-semibold text-white bg-[#294C3A] hover:bg-[#1E372A] active:scale-[0.99] rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Get MOKU for ₹499</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center justify-center gap-4 text-xs text-[#727B73]">
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#476B57]" />
                  <span>Secure Checkout</span>
                </div>
                <span>·</span>
                <span>Razorpay & Cashfree Ready</span>
                <span>·</span>
                <span>Instant License Key</span>
              </div>
            </div>

            {/* Honest License & Device Clarity Box */}
            <div className="mt-8 p-4 bg-[#F8F8F3] rounded-xl border border-[#E1E6DD] text-xs text-[#727B73] space-y-1.5 leading-relaxed relative z-10">
              <div className="flex items-center gap-1.5 font-semibold text-[#242C27]">
                <AlertCircle className="w-3.5 h-3.5 text-[#476B57]" />
                <span>Transparent License & Terms Summary:</span>
              </div>
              <p>
                <strong>Scope:</strong> Personal lifetime license for all core features (budget planner, 4 pillars, daily logging, review audits, and local storage).
              </p>
              <p>
                <strong>Device Limits:</strong> Active on your personal mobile and browser instances with license key restoration.
              </p>
              <p>
                <strong>Honest Note:</strong> Does not promise unlimited third-party cloud infrastructure. All core features operate self-contained on your device.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
