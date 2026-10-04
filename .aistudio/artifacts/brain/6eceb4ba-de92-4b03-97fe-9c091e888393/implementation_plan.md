# Implementation Plan: Comprehensive Audit of All CTA Payment Links

## Problem Statement
The user requested a thorough review to ensure **every buy/purchase CTA button** across the entire website links directly to the payment page URL (`SUPERPROFILE_PAYMENT_URL`).

---

## Audit Checklist & Verification Targets

1. **`StickyTopBar.tsx`**: Header CTA button (`Get Kit • ₹299`).
2. **`HeroSection.tsx`**: Main Hero CTA button (`Get Kit for ₹299`) + guarantee link.
3. **`TwelveToolsShowcase.tsx`**: Tool unlock CTA buttons.
4. **`FreeHindiVersionSection.tsx`**: Hindi + English bundle unlock CTA.
5. **`BonusCreatorBundle.tsx`**: Creator 500GB bundle unlock CTA.
6. **`OfferStack.tsx`**: Full value stack CTA button (`Unlock Everything for ₹299`).
7. **`SavingsRoiCalculator.tsx`**: Financial ROI simulator CTA button.
8. **`PricingSection.tsx`**: Master pricing card CTA button (`Unlock Salary Reset Kit • ₹299`).
9. **`FinalCta.tsx`**: Bottom emotional closing CTA button.
10. **`StickyMobileCta.tsx`**: Mobile bottom sticky bar CTA button.
11. **`FloatingRightOfferWidget.tsx`**: Floating right offer badge CTA (`GET IT NOW • ₹299`).
12. **`SamplePagePreviewModal.tsx`**: Ebook preview paywall CTA button.
13. **`CheckoutModal.tsx`**: Modal checkout button (`Proceed to Secure Payment`).

---

## Proposed Changes
- Inspect every listed file.
- Ensure all buy buttons either navigate directly to `SUPERPROFILE_PAYMENT_URL` (`https://superprofile.bio/vp/6895315b706c9e`) or trigger `onBuyClick` which executes `window.location.href = SUPERPROFILE_PAYMENT_URL`.

---

## Verification Plan
1. **Source Code Inspection**: Verify all 13 components reference `SUPERPROFILE_PAYMENT_URL` or `onBuyClick`.
2. **Build & Lint Verification**: Run `lint_applet` and `compile_applet`.
