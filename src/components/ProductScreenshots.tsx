import React, { useState } from 'react';
import { SCREENSHOTS } from '../data/mokuData';
import { AppScreenshot } from '../types';
import { Smartphone, ZoomIn, CheckCircle2 } from 'lucide-react';

interface ProductScreenshotsProps {
  onOpenScreenshot: (id: string) => void;
}

export const ProductScreenshots: React.FC<ProductScreenshotsProps> = ({ onOpenScreenshot }) => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  const activeScreenshot: AppScreenshot =
    SCREENSHOTS.find((s) => s.id === activeTab) || SCREENSHOTS[0];

  return (
    <section id="screenshots" className="py-20 md:py-28 bg-[#F8F8F3] border-t border-[#E1E6DD]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#476B57]">
            <Smartphone className="w-3.5 h-3.5" />
            <span>Actual Product Interface</span>
            <span aria-hidden="true">·</span>
            <span>Unretouched</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#242C27] tracking-tight text-balance">
            Designed for Quiet Everyday Focus
          </h2>
          <p className="text-base sm:text-lg text-[#727B73] leading-relaxed">
            Explore the real MOKU interface below. No noisy popups, no stock market tickers, and no predatory ads.
          </p>
        </div>

        {/* Tab switcher for desktop and mobile */}
        <div className="flex items-center justify-center mb-12 overflow-x-auto pb-2 scrollbar-none">
          <div className="inline-flex p-1.5 bg-[#EFF2E9] rounded-2xl border border-[#E1E6DD] gap-1">
            {SCREENSHOTS.map((screen) => (
              <button
                key={screen.id}
                onClick={() => setActiveTab(screen.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  activeTab === screen.id
                    ? 'bg-[#294C3A] text-white shadow-xs'
                    : 'text-[#727B73] hover:text-[#242C27]'
                }`}
              >
                {screen.title}
              </button>
            ))}
          </div>
        </div>

        {/* Spotlight Showcase (Interactive 2-column view of active screenshot) */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E1E6DD] shadow-md mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Smartphone Screen */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[280px] sm:max-w-[310px]">
                
                {/* Physical Frame */}
                <div className="relative rounded-[40px] p-2.5 bg-[#242C27] shadow-xl ring-1 ring-black/10">
                  <div className="overflow-hidden rounded-[32px] bg-white aspect-[9/19.5]">
                    <img
                      src={activeScreenshot.imagePath}
                      alt={activeScreenshot.title}
                      className="w-full h-full object-cover object-top cursor-pointer hover:scale-102 transition-transform duration-300"
                      onClick={() => onOpenScreenshot(activeScreenshot.id)}
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Inspect button overlay */}
                <button
                  onClick={() => onOpenScreenshot(activeScreenshot.id)}
                  className="absolute bottom-4 right-4 px-3 py-1.5 text-xs font-semibold bg-black/80 hover:bg-black text-white rounded-full flex items-center gap-1.5 shadow-md cursor-pointer transition-all"
                  aria-label={`Zoom in on ${activeScreenshot.title}`}
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>Inspect High-Res</span>
                </button>
              </div>
            </div>

            {/* Right: Screen Details & Key Highlights */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#476B57]">
                  Screen {SCREENSHOTS.findIndex((s) => s.id === activeTab) + 1} of {SCREENSHOTS.length} · {activeScreenshot.category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-[#242C27]">
                  {activeScreenshot.title}
                </h3>
                <p className="text-sm font-medium text-[#727B73]">
                  {activeScreenshot.subtitle}
                </p>
              </div>

              <p className="text-base text-[#727B73] leading-relaxed">
                {activeScreenshot.description}
              </p>

              {/* Key Screen Highlights */}
              <div className="pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#242C27] mb-3">
                  Verified In-App Functionality:
                </h4>
                <div className="space-y-2.5">
                  {activeScreenshot.keyHighlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-sm text-[#242C27]">
                      <CheckCircle2 className="w-4 h-4 text-[#476B57] shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#E1E6DD] flex items-center gap-4 text-xs text-[#727B73]">
                <span>Status: Production screenshot</span>
                <span aria-hidden="true">·</span>
                <span>Currency: INR (₹) native</span>
                <span aria-hidden="true">·</span>
                <span>Mode: Offline-ready</span>
              </div>

            </div>

          </div>
        </div>

        {/* Multi-Column Gallery Strip of All 5 Screens */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-display font-bold text-[#242C27]">
              Complete Applet Flow at a Glance
            </h3>
            <span className="text-xs text-[#727B73]">Tap any screen to switch</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {SCREENSHOTS.map((screen) => (
              <div
                key={screen.id}
                onClick={() => setActiveTab(screen.id)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer group flex flex-col items-center ${
                  activeTab === screen.id
                    ? 'border-[#294C3A] bg-[#EFF2E9]/70 ring-2 ring-[#294C3A]/20'
                    : 'border-[#E1E6DD] bg-white hover:border-[#A8B99E]'
                }`}
              >
                <div className="w-full aspect-[9/16] rounded-xl overflow-hidden bg-neutral-100 mb-2.5 border border-[#E1E6DD]">
                  <img
                    src={screen.imagePath}
                    alt={screen.title}
                    className="w-full h-full object-cover object-top group-hover:scale-103 transition-transform duration-200"
                    loading="lazy"
                  />
                </div>
                <span className="text-xs font-bold text-[#242C27] text-center line-clamp-1">
                  {screen.title}
                </span>
                <span className="text-[10px] text-[#727B73] text-center line-clamp-1 mt-0.5">
                  {screen.category}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
