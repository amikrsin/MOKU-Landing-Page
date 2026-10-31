import React from 'react';
import { PageRoute } from '../types';
import { APP_CONFIG } from '../data/mokuData';

interface FooterProps {
  onNavigate: (route: PageRoute, hash?: string) => void;
  onOpenCheckout: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenCheckout }) => {
  const currentYear = 2026;

  const handleLink = (e: React.MouseEvent, route: PageRoute, hash?: string) => {
    e.preventDefault();
    onNavigate(route, hash);
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#242C27] text-[#EFF2E9] border-t border-[#294C3A]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          
          {/* Brand Column (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-[#476B57] flex items-center justify-center text-[#F8F8F3] font-display font-bold text-sm tracking-widest">
                木
              </span>
              <span className="text-xl font-display font-extrabold tracking-tight text-white">
                MOKU
              </span>
            </div>
            
            <p className="text-sm font-medium text-[#A8B99E]">
              {APP_CONFIG.tagline}
            </p>

            <p className="text-xs text-[#EFF2E9]/70 leading-relaxed max-w-sm">
              MOKU is a mindful budgeting companion designed for young Indian professionals, newly married couples, and intentional savers inspired by the Japanese Kakeibo philosophy.
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenCheckout}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#476B57] hover:bg-[#395646] rounded-lg transition-colors cursor-pointer"
              >
                Get Lifetime License — ₹499
              </button>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#A8B99E]">
              Product
            </h4>
            <ul className="space-y-2 text-xs text-[#EFF2E9]/80">
              <li>
                <a
                  href="#features"
                  onClick={(e) => handleLink(e, 'home', '#features')}
                  className="hover:text-white transition-colors"
                >
                  Features & Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  onClick={(e) => handleLink(e, 'home', '#how-it-works')}
                  className="hover:text-white transition-colors"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#screenshots"
                  onClick={(e) => handleLink(e, 'home', '#screenshots')}
                  className="hover:text-white transition-colors"
                >
                  Product Screenshots
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  onClick={(e) => handleLink(e, 'home', '#pricing')}
                  className="hover:text-white transition-colors"
                >
                  Lifetime Pricing (₹499)
                </a>
              </li>
              <li>
                <a
                  href="https://moku.ami-kr-sin.workers.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1 text-[#A8B99E]"
                >
                  <span>Launch Live App</span>
                  <span className="text-[10px]">↗</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Philosophy & Guide */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#A8B99E]">
              Kakeibo Method
            </h4>
            <ul className="space-y-2 text-xs text-[#EFF2E9]/80">
              <li>
                <a
                  href="/kakeibo"
                  onClick={(e) => handleLink(e, 'kakeibo')}
                  className="hover:text-white transition-colors"
                >
                  What is Kakeibo?
                </a>
              </li>
              <li>
                <a
                  href="#kakeibo"
                  onClick={(e) => handleLink(e, 'home', '#kakeibo')}
                  className="hover:text-white transition-colors"
                >
                  The Four Spending Pillars
                </a>
              </li>
              <li>
                <a
                  href="#kakeibo"
                  onClick={(e) => handleLink(e, 'home', '#kakeibo')}
                  className="hover:text-white transition-colors"
                >
                  Four Reflection Questions
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  onClick={(e) => handleLink(e, 'home', '#faq')}
                  className="hover:text-white transition-colors"
                >
                  FAQ & Clarifications
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Trust */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#A8B99E]">
              Legal & Support
            </h4>
            <ul className="space-y-2 text-xs text-[#EFF2E9]/80">
              <li>
                <a
                  href="/privacy-policy"
                  onClick={(e) => handleLink(e, 'privacy-policy')}
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  onClick={(e) => handleLink(e, 'terms')}
                  className="hover:text-white transition-colors"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="/refund-policy"
                  onClick={(e) => handleLink(e, 'refund-policy')}
                  className="hover:text-white transition-colors"
                >
                  Refund Policy
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  onClick={(e) => handleLink(e, 'contact')}
                  className="hover:text-white transition-colors"
                >
                  Contact & Support
                </a>
              </li>
              <li>
                <a
                  href="mailto:ami.kr.sin@gmail.com"
                  className="hover:text-white transition-colors text-[#A8B99E]"
                >
                  ami.kr.sin@gmail.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#EFF2E9]/60">
          <p>© {currentYear} MOKU (moku.in). All rights reserved.</p>
          <p className="text-center sm:text-right">
            Inspired by traditional Japanese Kakeibo. Built with care for Indian mindful financial living.
          </p>
        </div>

      </div>
    </footer>
  );
};
