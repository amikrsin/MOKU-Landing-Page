import React, { useState, useEffect } from 'react';
import { PageRoute } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProblemStatement } from './components/ProblemStatement';
import { MokuIntro } from './components/MokuIntro';
import { CoreFeatures } from './components/CoreFeatures';
import { InteractiveSimulator } from './components/InteractiveSimulator';
import { SavingsGoalShowcase } from './components/SavingsGoalShowcase';
import { KakeiboCalculator } from './components/KakeiboCalculator';
import { HowItWorks } from './components/HowItWorks';
import { KakeiboDeepDive } from './components/KakeiboDeepDive';
import { MonthlyReviewShowcase } from './components/MonthlyReviewShowcase';
import { ProductScreenshots } from './components/ProductScreenshots';
import { Pricing } from './components/Pricing';
import { FAQSection } from './components/FAQSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { CheckoutModal } from './components/CheckoutModal';
import { ScreenshotModal } from './components/ScreenshotModal';
import { LegalPages } from './components/LegalPages';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>('home');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedScreenshotId, setSelectedScreenshotId] = useState<string | null>(null);

  // Sync initial path or hash with state
  useEffect(() => {
    const handleLocation = () => {
      const path = window.location.pathname.replace(/^\//, '');
      const validRoutes: PageRoute[] = [
        'privacy-policy',
        'terms',
        'refund-policy',
        'contact',
        'kakeibo',
        'payment-status',
      ];
      if (validRoutes.includes(path as PageRoute)) {
        setCurrentRoute(path as PageRoute);
      } else {
        setCurrentRoute('home');
      }
    };

    handleLocation();
    window.addEventListener('popstate', handleLocation);
    return () => window.removeEventListener('popstate', handleLocation);
  }, []);

  const navigateTo = (route: PageRoute, hash?: string) => {
    setCurrentRoute(route);
    if (route === 'home') {
      window.history.pushState({}, '', hash ? `/${hash}` : '/');
      if (hash) {
        setTimeout(() => {
          const el = document.getElementById(hash.replace('#', ''));
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      window.history.pushState({}, '', `/${route}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToFeatures = () => {
    if (currentRoute !== 'home') {
      navigateTo('home', '#features');
    } else {
      const el = document.getElementById('features');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F8F3] text-[#242C27] font-sans selection:bg-[#476B57]/20 selection:text-[#294C3A]">
      {/* Top Bar Navigation */}
      <Navbar
        currentRoute={currentRoute}
        onNavigate={navigateTo}
        onOpenCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {currentRoute === 'home' ? (
          <>
            <Hero
              onOpenCheckout={() => setIsCheckoutOpen(true)}
              onExploreFeatures={scrollToFeatures}
              onOpenScreenshot={(id) => setSelectedScreenshotId(id)}
            />
            <ProblemStatement />
            <MokuIntro
              onOpenScreenshot={(id) => setSelectedScreenshotId(id)}
              onOpenCheckout={() => setIsCheckoutOpen(true)}
            />
            <CoreFeatures
              onOpenScreenshot={(id) => setSelectedScreenshotId(id)}
              onOpenCheckout={() => setIsCheckoutOpen(true)}
            />
            {/* Interactive Product Simulation Workbench */}
            <InteractiveSimulator onOpenCheckout={() => setIsCheckoutOpen(true)} />
            {/* Animated Savings Goal Component */}
            <SavingsGoalShowcase onOpenCheckout={() => setIsCheckoutOpen(true)} />
            {/* Salary Kakeibo Distribution Calculator */}
            <KakeiboCalculator onOpenCheckout={() => setIsCheckoutOpen(true)} />
            <HowItWorks onOpenCheckout={() => setIsCheckoutOpen(true)} />
            {/* Four Kakeibo Pillars Animated Deep Dive */}
            <KakeiboDeepDive />
            {/* Animated Monthly Review & Kaizen Reconciliation */}
            <MonthlyReviewShowcase onOpenCheckout={() => setIsCheckoutOpen(true)} />
            <ProductScreenshots onOpenScreenshot={(id) => setSelectedScreenshotId(id)} />
            <Pricing onOpenCheckout={() => setIsCheckoutOpen(true)} />
            <FAQSection />
            <FinalCTA onOpenCheckout={() => setIsCheckoutOpen(true)} />
          </>
        ) : (
          <LegalPages
            currentRoute={currentRoute}
            onNavigateHome={() => navigateTo('home')}
            onOpenCheckout={() => setIsCheckoutOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={navigateTo}
        onOpenCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Interactive Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

      {/* Screenshot High-Res Inspection Modal */}
      <ScreenshotModal
        screenshotId={selectedScreenshotId}
        onClose={() => setSelectedScreenshotId(null)}
      />
    </div>
  );
}
