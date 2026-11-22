/**
 * Analytics & GA4 Key Event dispatcher for The Local Guide MS.
 * Queues events cleanly into window.gtag / window.dataLayer with zero blocking overhead.
 */
export function trackGuideEvent(eventName, params = {}) {
  if (typeof window === "undefined") return;
  try {
    const payload = {
      page_path: window.location.pathname,
      ...params,
    };
    if (typeof window.trackLocalGuideEvent === "function") {
      window.trackLocalGuideEvent(eventName, payload);
      return;
    }
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, payload);
    } else if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: eventName, ...payload });
    }
  } catch {
    // Non-blocking safeguard
  }
}
