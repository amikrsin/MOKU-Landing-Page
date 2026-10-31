import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Smartphone, Sparkles, TrendingUp, Check } from 'lucide-react';
import { formatINR } from '../utils/kakeibo';

interface HeroProps {
  onOpenCheckout: () => void;
  onExploreFeatures: () => void;
  onOpenScreenshot: (id: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenCheckout,
  onExploreFeatures,
  onOpenScreenshot,
}) => {
  // Staggered headline words
  const headlineWords = ['Your', 'Salary', 'Deserves', 'a', 'Better', 'Plan.'];

  // Parallax tilt on desktop
  const mockupRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [animatedSpend, setAnimatedSpend] = useState(0);

  // Animate count-up for Available-to-Spend
  useEffect(() => {
    const targetSpend = 42800;
    const duration = 1400;
    const steps = 35;
    const stepTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const ease = 1 - Math.pow(1 - progress, 3);
      setAnimatedSpend(Math.round(targetSpend * ease));
      if (step >= steps) {
        clearInterval(timer);
        setAnimatedSpend(targetSpend);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Check if device supports hover / not mobile
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      // Gentle subtle rotation: max 6 degrees
      const rotateX = -(y / (rect.height / 2)) * 5;
      const rotateY = (x / (rect.width / 2)) * 6;
      setTilt({ rotateX, rotateY });
    }
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32 bg-[#F8F8F3]">
      {/* Background Soft Zen Auras */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-1/4 w-[650px] h-[650px] bg-[#EFF2E9] rounded-full blur-3xl opacity-70 -z-10 pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-[#A8B99E]/20 rounded-full blur-2xl opacity-40 -z-10 pointer-events-none"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-16 items-center">
          
          {/* Left Column: Animated Headline, Value Prop & CTAs */}
          <div className="lg:col-span-7 space-y-6 max-w-xl relative z-10">
            
            {/* Mindful Kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#476B57]">
              <span>Kakeibo Mindful Finance</span>
              <span aria-hidden="true" className="text-[#A8B99E]">·</span>
              <span>Adapted for India</span>
            </div>

            {/* Headline with Staggered Word Entrance */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-[#242C27] tracking-tight leading-[1.08] flex flex-wrap gap-x-3 gap-y-1 max-w-lg">
              {headlineWords.map((word, idx) => (
                <span
                  key={idx}
                  className="inline-block transition-all duration-700 ease-out"
                  style={{
                    animation: `word-fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.08}s backwards`,
                  }}
                >
                  {word}
                </span>
              ))}
            </h1>

            {/* Supporting Text */}
            <p className="text-lg sm:text-xl text-[#727B73] font-normal leading-relaxed max-w-xl">
              Take control of your monthly spending, build intentional savings habits and understand where your money goes — with MOKU.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onOpenCheckout}
                className="px-7 py-4 text-base font-semibold text-white bg-[#294C3A] hover:bg-[#1E372A] active:scale-[0.98] rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Get Lifetime Access — ₹499</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreFeatures}
                className="px-6 py-4 text-base font-medium text-[#242C27] bg-[#EFF2E9] hover:bg-[#E1E6DD] rounded-xl transition-colors text-center cursor-pointer border border-[#E1E6DD]"
              >
                Explore Features
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-6 border-t border-[#E1E6DD]/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-[#727B73]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#476B57] shrink-0" />
                <span>One-time payment</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#476B57] shrink-0" />
                <span>Zero recurring fees</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#476B57] shrink-0" />
                <span>Local offline privacy</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#476B57] shrink-0" />
                <span>4 Kakeibo pillars</span>
              </div>
            </div>

          </div>

          {/* Right Column: Animated Smartphone Mockup with 4 Floating UI Cards */}
          <div
            className="lg:col-span-5 flex justify-center lg:justify-end"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div
              ref={mockupRef}
              className="relative w-full max-w-[320px] sm:max-w-[340px] transition-transform duration-300 ease-out"
              style={{
                transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
              }}
            >
              
              {/* Smartphone Frame with subtle gentle floating animation */}
              <div className="relative mx-auto rounded-[44px] p-3 bg-[#242C27] shadow-2xl ring-1 ring-black/10 animate-float-gentle">
                
                {/* Physical speaker & camera bar */}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-4 bg-[#1A1F1C] rounded-full z-20 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-[#294C3A]/60 mr-2" />
                  <div className="w-8 h-1 rounded-full bg-neutral-800" />
                </div>

                {/* Inner Screen */}
                <div className="relative overflow-hidden rounded-[34px] bg-white border border-neutral-900 aspect-[9/19.5]">
                  <img
                    src="/assets/aistudio/home_c26a6a11.jpeg"
                    alt="MOKU mindful budgeting application dashboard running on smartphone"
                    className="w-full h-full object-cover object-top cursor-pointer hover:scale-102 transition-transform duration-300"
                    onClick={() => onOpenScreenshot('dashboard')}
                    loading="eager"
                  />

                  {/* Tap to inspect button */}
                  <button
                    onClick={() => onOpenScreenshot('dashboard')}
                    className="absolute bottom-3 right-3 px-2.5 py-1 text-[11px] font-medium bg-black/75 hover:bg-black text-white backdrop-blur-md rounded-full shadow-md flex items-center gap-1 transition-all cursor-pointer"
                    aria-label="View full dashboard screenshot in detail"
                  >
                    <span>Inspect</span>
                    <Smartphone className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* FLOATING CARD 1: Monthly Savings (Top Left) */}
              <div
                className="absolute -top-5 -left-4 sm:-left-6 lg:left-0 xl:-left-6 bg-white/95 backdrop-blur-md border border-[#E1E6DD] rounded-2xl p-3 shadow-xl max-w-[190px] hidden sm:block animate-float-delayed z-20"
              >
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#476B57] uppercase">
                  <Check className="w-3.5 h-3.5" />
                  <span>Committed to Self</span>
                </div>
                <p className="text-base font-display font-extrabold text-[#294C3A] mt-0.5 tabular-nums">
                  ₹15,000 / month
                </p>
                <p className="text-[9px] text-[#727B73]">Paid before any daily spending</p>
              </div>

              {/* FLOATING CARD 2: Animated Available to Spend (Top Right) */}
              <div
                className="absolute top-10 -right-6 sm:-right-8 lg:-right-4 xl:-right-8 bg-white/95 backdrop-blur-md border border-[#E1E6DD] rounded-2xl p-3 shadow-xl max-w-[200px] hidden sm:block animate-float-gentle z-20"
              >
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-bold text-[#242C27] uppercase">Available Pool</span>
                  <span className="text-[9px] bg-[#EFF5EE] text-[#294C3A] font-semibold px-1.5 py-0.5 rounded">Live</span>
                </div>
                <p className="text-base font-display font-extrabold text-[#294C3A] mt-0.5 tabular-nums">
                  {formatINR(animatedSpend)}
                </p>
                <div className="w-full bg-[#E1E6DD] h-1.5 rounded-full overflow-hidden mt-1">
                  <div className="bg-[#476B57] h-full w-[72%] transition-all duration-1000" />
                </div>
                <p className="text-[9px] text-[#727B73] mt-1">Safe burn: ₹1,600 / day</p>
              </div>

              {/* FLOATING CARD 3: Expense Notification (Bottom Left) */}
              <div
                className="absolute bottom-16 -left-6 sm:-left-8 lg:-left-2 xl:-left-8 bg-white/95 backdrop-blur-md border border-[#E1E6DD] rounded-2xl p-3 shadow-xl max-w-[190px] hidden sm:block animate-float-gentle z-20"
              >
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-bold text-[#242C27]">Quick UPI</span>
                  <span className="text-[#B38B60] font-semibold">Wants</span>
                </div>
                <p className="text-xs font-semibold text-[#242C27] mt-0.5">
                  -₹180 · Chai & Snack
                </p>
                <div className="flex items-center gap-1 text-[9px] text-[#476B57] mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#476B57]" />
                  <span>Logged in 4 seconds</span>
                </div>
              </div>

              {/* FLOATING CARD 4: Savings Goal Progress (Bottom Right) */}
              <div
                className="absolute -bottom-5 -right-4 sm:-right-6 bg-white/95 backdrop-blur-md border border-[#E1E6DD] rounded-2xl p-3 shadow-xl max-w-[190px] hidden sm:block animate-float-delayed z-20"
              >
                <div className="flex items-center justify-between text-[10px] mb-1">
                  <span className="font-bold text-[#294C3A]">Savings Goal</span>
                  <span className="font-bold text-[#294C3A] tabular-nums">83.3%</span>
                </div>
                <div className="w-full bg-[#E1E6DD] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#294C3A] h-full w-[83.3%]" />
                </div>
                <p className="text-[9px] text-[#727B73] mt-1.5">₹12,500 of ₹15,000 saved</p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
