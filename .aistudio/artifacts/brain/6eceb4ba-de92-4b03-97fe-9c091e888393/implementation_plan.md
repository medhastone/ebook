# Implementation Plan: Meta Pixel Integration (Pixel ID: 4497135493888106)

## Problem Statement
The user requested integrating Meta Pixel code with ID `4497135493888106` across the website to track conversion data, pageviews, and checkout intent events for Facebook/Meta advertising campaigns.

---

## Technical Specifications

### 1. `app/layout.tsx`
- Inject Next.js `Script` or inline Meta Pixel initialization code in the root layout `<head>`:
  - Base script loading `https://connect.facebook.net/en_US/fbevents.js`.
  - `fbq('init', '4497135493888106');`
  - `fbq('track', 'PageView');`
- Add `<noscript>` fallback tracking image pixel:
  - `https://www.facebook.com/tr?id=4497135493888106&ev=PageView&noscript=1`

### 2. `lib/analytics.ts`
- Extend `trackEvent` helper function to trigger standard Meta Pixel conversion events:
  - `click_buy` → `fbq('track', 'InitiateCheckout', { value: 299, currency: 'INR' })`
  - `apply_coupon_success` → `fbq('trackCustom', 'ApplyCoupon', { coupon: 'MEDHASTONE' })`
  - `calc_complete` → `fbq('track', 'Lead', { value: 299, currency: 'INR' })`

---

## Verification Plan
1. **Script Verification**: Ensure Meta Pixel initializes without console errors.
2. **Build & Lint Verification**: Run `lint_applet` and `compile_applet`.
