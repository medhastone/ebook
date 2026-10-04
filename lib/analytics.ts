/**
 * Analytics and DataLayer Event Dispatcher
 * Dispatches events to window.dataLayer, logs to console, and notifies listeners for live feedback.
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

  // 1. DataLayer dispatch for Google Tag Manager / Analytics
  if (typeof window !== 'undefined') {
    const w = window as any;
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push(payload);
  }

  // 2. Console debug log
  console.log(`%c[Analytics] ${event}`, 'color: #E8871E; font-weight: bold;', payload);

  // 3. Notify internal UI listeners (for interactive feedback toast)
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
