declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export type AnalyticsEvent = "診断開始" | "診断完了" | "Amazonリンククリック";

export function trackEvent(event: AnalyticsEvent, parameters?: Record<string, unknown>) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", event, parameters);
}
