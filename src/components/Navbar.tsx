import React, { useState, useEffect } from 'react';
import { PageRoute } from '../types';
import { ArrowUp } from 'lucide-react';

interface NavbarProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute, hash?: string) => void;
  onOpenCheckout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, onNavigate, onOpenCheckout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = windowHeight > 0 ? (totalScroll / windowHeight) * 100 : 0;
      setScrollProgress(progress);

      setShowScrollTop(totalScroll > 350);

      // Simple active section check
      const sections = ['features', 'simulator', 'how-it-works', 'kakeibo', 'pricing', 'faq'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (currentRoute !== 'home') {
      onNavigate('home', hash);
    } else {
      const target = document.getElementById(hash.replace('#', ''));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handlePageClick = (e: React.MouseEvent<HTMLAnchorElement>, route: PageRoute) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(route);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#F8F8F3]/95 backdrop-blur-md border-b border-[#E1E6DD] transition-all duration-200">
        {/* Subtle Reading Progress Bar */}
        <div className="absolute bottom-0 left-0 h-[2px] bg-[#294C3A] transition-all duration-150 ease-out" style={{ width: `${scrollProgress}%` }} />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8 h-18">
            
            {/* Zone 1: Brand Wordmark */}
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('home');
                scrollToTop();
              }}
              className="flex items-center gap-2 group whitespace-nowrap shrink-0"
              aria-label="MOKU Homepage"
            >
              <span className="w-8 h-8 rounded-lg bg-[#294C3A] flex items-center justify-center text-[#F8F8F3] font-display font-bold text-sm tracking-widest shadow-xs group-hover:scale-105 transition-transform">
                木
              </span>
              <span className="text-xl font-display font-extrabold tracking-tight text-[#242C27] group-hover:text-[#294C3A] transition-colors">
                MOKU
              </span>
            </a>

            {/* Zone 2: Single-line Text Nav Links with Active Indicator */}
            <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#727B73]">
              <a
                href="#features"
                onClick={(e) => handleLinkClick(e, '#features')}
                className={`transition-colors whitespace-nowrap shrink-0 relative py-1 ${
                  activeSection === 'features' && currentRoute === 'home'
                    ? 'text-[#294C3A] font-semibold'
                    : 'hover:text-[#242C27]'
                }`}
              >
                Features
                {activeSection === 'features' && currentRoute === 'home' && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#294C3A] rounded-full" />
                )}
              </a>

              <a
                href="#simulator"
                onClick={(e) => handleLinkClick(e, '#simulator')}
                className={`transition-colors whitespace-nowrap shrink-0 relative py-1 ${
                  activeSection === 'simulator' && currentRoute === 'home'
                    ? 'text-[#294C3A] font-semibold'
                    : 'hover:text-[#242C27]'
                }`}
              >
                Simulator
                {activeSection === 'simulator' && currentRoute === 'home' && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#294C3A] rounded-full" />
                )}
              </a>

              <a
                href="#how-it-works"
                onClick={(e) => handleLinkClick(e, '#how-it-works')}
                className={`transition-colors whitespace-nowrap shrink-0 relative py-1 ${
                  activeSection === 'how-it-works' && currentRoute === 'home'
                    ? 'text-[#294C3A] font-semibold'
                    : 'hover:text-[#242C27]'
                }`}
              >
                How It Works
                {activeSection === 'how-it-works' && currentRoute === 'home' && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#294C3A] rounded-full" />
                )}
              </a>

              <a
                href="#kakeibo"
                onClick={(e) => {
                  if (currentRoute === 'home') {
                    handleLinkClick(e, '#kakeibo');
                  } else {
                    handlePageClick(e, 'kakeibo');
                  }
                }}
                className={`transition-colors whitespace-nowrap shrink-0 relative py-1 ${
                  activeSection === 'kakeibo' && currentRoute === 'home'
                    ? 'text-[#294C3A] font-semibold'
                    : 'hover:text-[#242C27]'
                }`}
              >
                Kakeibo Method
                {activeSection === 'kakeibo' && currentRoute === 'home' && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#294C3A] rounded-full" />
                )}
              </a>

              <a
                href="#pricing"
                onClick={(e) => handleLinkClick(e, '#pricing')}
                className={`transition-colors whitespace-nowrap shrink-0 relative py-1 ${
                  activeSection === 'pricing' && currentRoute === 'home'
                    ? 'text-[#294C3A] font-semibold'
                    : 'hover:text-[#242C27]'
                }`}
              >
                Pricing
                {activeSection === 'pricing' && currentRoute === 'home' && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#294C3A] rounded-full" />
                )}
              </a>

              <a
                href="#faq"
                onClick={(e) => handleLinkClick(e, '#faq')}
                className={`transition-colors whitespace-nowrap shrink-0 relative py-1 ${
                  activeSection === 'faq' && currentRoute === 'home'
                    ? 'text-[#294C3A] font-semibold'
                    : 'hover:text-[#242C27]'
                }`}
              >
                FAQ
                {activeSection === 'faq' && currentRoute === 'home' && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#294C3A] rounded-full" />
                )}
              </a>
            </nav>

            {/* Zone 3: 1 Primary Action */}
            <div className="hidden md:flex items-center gap-3 shrink-0">
              <button
                onClick={onOpenCheckout}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-[#294C3A] hover:bg-[#1E372A] active:scale-[0.98] rounded-xl shadow-xs transition-all whitespace-nowrap cursor-pointer hover:shadow-md"
              >
                Get MOKU — ₹499
              </button>
            </div>

            {/* Mobile hamburger menu toggle */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={onOpenCheckout}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-[#294C3A] rounded-lg shadow-xs"
              >
                ₹499
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#242C27] hover:text-[#294C3A] focus:outline-hidden cursor-pointer"
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={mobileMenuOpen}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-[#E1E6DD] bg-[#F8F8F3] px-6 py-5 space-y-4 animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="flex flex-col space-y-3 text-sm font-medium text-[#242C27]">
              <a
                href="#features"
                onClick={(e) => handleLinkClick(e, '#features')}
                className="py-1 hover:text-[#294C3A] transition-colors"
              >
                Features
              </a>
              <a
                href="#simulator"
                onClick={(e) => handleLinkClick(e, '#simulator')}
                className="py-1 hover:text-[#294C3A] transition-colors"
              >
                Simulator Preview
              </a>
              <a
                href="#how-it-works"
                onClick={(e) => handleLinkClick(e, '#how-it-works')}
                className="py-1 hover:text-[#294C3A] transition-colors"
              >
                How It Works
              </a>
              <a
                href="#kakeibo"
                onClick={(e) => handleLinkClick(e, '#kakeibo')}
                className="py-1 hover:text-[#294C3A] transition-colors"
              >
                Kakeibo Method
              </a>
              <a
                href="#pricing"
                onClick={(e) => handleLinkClick(e, '#pricing')}
                className="py-1 hover:text-[#294C3A] transition-colors"
              >
                Pricing (₹499)
              </a>
              <a
                href="#faq"
                onClick={(e) => handleLinkClick(e, '#faq')}
                className="py-1 hover:text-[#294C3A] transition-colors"
              >
                FAQ
              </a>
            </div>

            <div className="pt-3 border-t border-[#E1E6DD]">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCheckout();
                }}
                className="w-full py-3 text-center text-sm font-semibold text-white bg-[#294C3A] rounded-xl shadow-xs"
              >
                Get MOKU Lifetime Access — ₹499
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Floating Scroll-to-Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-[#294C3A] text-white shadow-lg hover:bg-[#1E372A] active:scale-95 transition-all cursor-pointer animate-in fade-in slide-in-from-bottom-3 duration-200"
          aria-label="Scroll to top of page"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </>
  );
};
