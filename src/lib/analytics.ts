declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export type AnalyticsEvent = "start_diagnosis" | "complete_diagnosis" | "click_amazon";

export function trackEvent(event: AnalyticsEvent, parameters?: Record<string, unknown>) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", event, parameters);
}
