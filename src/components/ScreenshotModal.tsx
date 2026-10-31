import React from 'react';
import { SCREENSHOTS } from '../data/mokuData';
import { X, CheckCircle2, Smartphone } from 'lucide-react';

interface ScreenshotModalProps {
  screenshotId: string | null;
  onClose: () => void;
}

export const ScreenshotModal: React.FC<ScreenshotModalProps> = ({ screenshotId, onClose }) => {
  if (!screenshotId) return null;

  const screenshot = SCREENSHOTS.find((s) => s.id === screenshotId) || SCREENSHOTS[0];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${screenshot.title} preview`}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 border border-[#E1E6DD] shadow-2xl relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#EFF2E9] hover:bg-[#E1E6DD] text-[#242C27] flex items-center justify-center transition-colors cursor-pointer z-10"
          aria-label="Close high-resolution modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Screenshot Display */}
          <div className="md:col-span-5 flex justify-center">
            <div className="w-full max-w-[280px] rounded-[36px] p-2 bg-[#242C27] shadow-xl">
              <div className="overflow-hidden rounded-[28px] bg-white aspect-[9/19.5]">
                <img
                  src={screenshot.imagePath}
                  alt={screenshot.title}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </div>

          {/* Screenshot Details */}
          <div className="md:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#476B57]">
              <Smartphone className="w-3.5 h-3.5" />
              <span>{screenshot.category} Screen</span>
              <span aria-hidden="true">·</span>
              <span>Production Build</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-[#242C27]">
              {screenshot.title}
            </h3>

            <p className="text-sm font-medium text-[#727B73]">
              {screenshot.subtitle}
            </p>

            <p className="text-sm text-[#727B73] leading-relaxed">
              {screenshot.description}
            </p>

            <div className="pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#242C27] mb-2">
                Features Visible in This Screen:
              </h4>
              <div className="space-y-2">
                {screenshot.keyHighlights.map((hl, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-[#242C27]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#476B57] shrink-0" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#E1E6DD] flex items-center justify-between text-xs text-[#727B73]">
              <span>Real application screenshot</span>
              <button
                onClick={onClose}
                className="px-4 py-2 font-semibold text-[#294C3A] bg-[#EFF2E9] hover:bg-[#E1E6DD] rounded-lg transition-colors cursor-pointer"
              >
                Close Preview
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
