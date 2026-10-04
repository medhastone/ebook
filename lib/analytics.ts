/**
 * Analytics, DataLayer, and Meta Pixel Event Dispatcher
 * Dispatches events to window.dataLayer and Meta Pixel (window.fbq), logs to console, and notifies listeners.
 */

export type AnalyticsEvent = 
  | 'view_calculator'
  | 'calc_complete'
  | 'lead_submit'
  | 'click_buy'
  | 'share_whatsapp'
  | 'preview_page'
  | 'exit_intent_triggered'
  | 'view_nudge'
  | 'show_salary_pattern'
  | 'apply_coupon_success';

export interface AnalyticsPayload {
  event: AnalyticsEvent;
  timestamp: string;
  data?: Record<string, any>;
}

type AnalyticsListener = (payload: AnalyticsPayload) => void;
const listeners: Set<AnalyticsListener> = new Set();

export function trackEvent(event: AnalyticsEvent, data?: Record<string, any>) {
  const payload: AnalyticsPayload = {
    event,
    timestamp: new Date().toISOString(),
    data: data || {},
  };

  if (typeof window !== 'undefined') {
    const w = window as any;

    // 1. DataLayer dispatch for Google Tag Manager / Analytics
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push(payload);

    // 2. Meta Pixel (fbq) conversion tracking
    if (typeof w.fbq === 'function') {
      try {
        switch (event) {
          case 'click_buy':
            w.fbq('track', 'InitiateCheckout', {
              content_name: 'Salary Reset Money Kit',
              value: data?.price || 299,
              currency: 'INR',
              source: data?.source || 'website_cta',
            });
            break;
          case 'lead_submit':
          case 'calc_complete':
            w.fbq('track', 'Lead', {
              content_name: 'Salary Leak Audit',
              value: 299,
              currency: 'INR',
            });
            break;
          case 'preview_page':
            w.fbq('track', 'ViewContent', {
              content_name: 'Ebook Sample Preview',
              content_type: 'product',
            });
            break;
          case 'apply_coupon_success':
            w.fbq('trackCustom', 'ApplyCoupon', {
              coupon: data?.coupon || 'MEDHASTONE',
            });
            break;
          default:
            w.fbq('trackCustom', event, data || {});
            break;
        }
      } catch (err) {
        console.error('Meta Pixel tracking error:', err);
      }
    }
  }

  // 3. Console debug log
  console.log(`%c[Analytics] ${event}`, 'color: #E8871E; font-weight: bold;', payload);

  // 4. Notify internal UI listeners
  listeners.forEach((listener) => {
    try {
      listener(payload);
    } catch (err) {
      console.error('Error in analytics listener', err);
    }
  });
}

export function subscribeAnalytics(listener: AnalyticsListener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
