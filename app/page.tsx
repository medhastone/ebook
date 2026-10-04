'use client';

import React, { useState, useEffect } from 'react';
import { StickyTopBar } from '@/components/StickyTopBar';
import { HeroSection } from '@/components/HeroSection';
import { WhereDidItGoInsights } from '@/components/WhereDidItGoInsights';
import { MoneyCheckQuiz } from '@/components/MoneyCheckQuiz';
import { ArjunStorySection } from '@/components/ArjunStorySection';
import { BeforeAfterSection } from '@/components/BeforeAfterSection';
import { EbookExperienceShowcase } from '@/components/EbookExperienceShowcase';
import { TwelveToolsShowcase } from '@/components/TwelveToolsShowcase';
import { FreeHindiVersionSection } from '@/components/FreeHindiVersionSection';
import { BonusCreatorBundle } from '@/components/BonusCreatorBundle';
import { OfferStack } from '@/components/OfferStack';
import { SavingsRoiCalculator } from '@/components/SavingsRoiCalculator';
import { PricingSection } from '@/components/PricingSection';
import { Testimonials } from '@/components/Testimonials';
import { CreatorBio } from '@/components/CreatorBio';
import { FaqAccordion } from '@/components/FaqAccordion';
import { FinalCta } from '@/components/FinalCta';
import { Footer } from '@/components/Footer';
import { StickyMobileCta } from '@/components/StickyMobileCta';
import { CheckoutModal } from '@/components/CheckoutModal';
import { SamplePagePreviewModal } from '@/components/SamplePagePreviewModal';
import { LegalModal, LegalDocType } from '@/components/LegalModal';
import { AnalyticsToast } from '@/components/AnalyticsToast';
import { LiveBuyerTicker } from '@/components/LiveBuyerTicker';
import { FloatingRightOfferWidget } from '@/components/FloatingRightOfferWidget';
import { trackEvent } from '@/lib/analytics';
import { SUPERPROFILE_PAYMENT_URL, COUPON_CODE } from '@/lib/constants';
import { AmbientPhysicsBackground } from '@/components/ui/PhysicsInteractive';

export default function Home() {
  const REGULAR_PRICE = 399;
  const DISCOUNTED_PRICE = 299;

  // Modals state
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);
  const [activeLegalDoc, setActiveLegalDoc] = useState<LegalDocType>(null);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      try {
        return localStorage.getItem('salary_reset_is_unlocked') === 'true';
      } catch {
        return false;
      }
    }
    return false;
  });

  const handleOpenBuy = () => {
    trackEvent('click_buy', {
      source: 'cta_button',
      price: DISCOUNTED_PRICE,
      coupon: COUPON_CODE,
      destination: SUPERPROFILE_PAYMENT_URL
    });
    window.location.href = SUPERPROFILE_PAYMENT_URL;
  };

  const handleUnlockSuccess = () => {
    setIsUnlocked(true);
    try {
      localStorage.setItem('salary_reset_is_unlocked', 'true');
    } catch (e) {
      console.error(e);
    }
    setIsCheckoutOpen(false);
    setIsPreviewOpen(true);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#070D18] via-[#0E1A33] via-[#14213D] via-[#0C172C] to-[#060B14] text-slate-100 selection:bg-[#E8871E]/30 selection:text-white relative overflow-hidden font-sans">
      {/* Dynamic Ambient Physics Mesh (subtle light accents) */}
      <AmbientPhysicsBackground />

      {/* 1. Sticky Navigation Top Bar with Scroll Progress */}
      <StickyTopBar
        onBuyClick={handleOpenBuy}
        price={DISCOUNTED_PRICE}
        regularPrice={REGULAR_PRICE}
      />

      {/* 2. Hero Section: Curiosity, Exact Headline & Interactive Money Flow */}
      <HeroSection
        onBuyClick={handleOpenBuy}
        onPreviewClick={() => setIsPreviewOpen(true)}
        price={DISCOUNTED_PRICE}
      />

      {/* 3. Interactive "Where Did It Go?" Psychological Leak Insights */}
      <WhereDidItGoInsights />

      {/* 4. Interactive 3-Question 30-Second Money Check */}
      <MoneyCheckQuiz />

      {/* 5. Story Section: Arjun's 24th of the Month Case Timeline */}
      <ArjunStorySection />

      {/* 6. Before -> After Interactive Comparison: Same Salary. Different System. */}
      <BeforeAfterSection />

      {/* 7. Ebook Experience Showcase: 9 Core Modules */}
      <EbookExperienceShowcase onOpenPreview={() => setIsPreviewOpen(true)} />

      {/* 8. 12-Tool Interactive Showcase with Mockup Preview Modals */}
      <TwelveToolsShowcase />

      {/* 9. Hindi Version Reveal: Interactive Bilingual Snippets */}
      <FreeHindiVersionSection />

      {/* 10. 500GB Creator Editor Bonus Curiosity Reveal */}
      <BonusCreatorBundle />

      {/* 11. Complete Value Stack & Comparison (₹6,096 vs ₹299) */}
      <OfferStack onBuyClick={handleOpenBuy} price={DISCOUNTED_PRICE} />

      {/* 12. Interactive Financial ROI Simulator on ₹299 */}
      <SavingsRoiCalculator />

      {/* 13. Master Pricing Section with Interactive MEDHASTONE Coupon Input */}
      <PricingSection onBuyClick={handleOpenBuy} price={DISCOUNTED_PRICE} />

      {/* 14. What Readers Are Saying (Transparent Feedback) */}
      <Testimonials />

      {/* 15. Meet Krchandan (Founder & Creator, Medhastone) */}
      <CreatorBio />

      {/* 16. FAQ Accordion (All 12 Questions) */}
      <FaqAccordion />

      {/* 17. Final Emotional Close: Next Month Can Start Differently */}
      <FinalCta onBuyClick={handleOpenBuy} price={DISCOUNTED_PRICE} />

      {/* 18. Footer with Disclaimer, Legal Modal Triggers & medhastone@gmail.com */}
      <Footer onOpenLegal={(type) => setActiveLegalDoc(type)} />

      {/* Mobile Sticky CTA Bar */}
      <StickyMobileCta onBuyClick={handleOpenBuy} price={DISCOUNTED_PRICE} />

      {/* Live Pan-India Reader Activity Ticker (Rotates every 30 seconds) */}
      <LiveBuyerTicker />

      {/* Floating Right-Side Interactive Offer Badge with Coupon & Animated Button */}
      <FloatingRightOfferWidget price={DISCOUNTED_PRICE} regularPrice={REGULAR_PRICE} />

      {/* Sample Page Preview Modal (Authentic First 6 Pages & Paywall) */}
      <SamplePagePreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        onBuyClick={handleOpenBuy}
        price={DISCOUNTED_PRICE}
        isUnlocked={isUnlocked}
        onUnlock={handleUnlockSuccess}
      />

      {/* Direct Payment Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onPurchaseSuccess={handleUnlockSuccess}
        price={DISCOUNTED_PRICE}
      />

      {/* Legal Modal (Privacy, Terms, Digital Products Non-Refund Policy, Contact) */}
      <LegalModal
        type={activeLegalDoc}
        onClose={() => setActiveLegalDoc(null)}
      />

      {/* Anonymous Activity Analytics Toast */}
      <AnalyticsToast />
    </main>
  );
}
