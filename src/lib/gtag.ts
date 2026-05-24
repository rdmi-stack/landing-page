/**
 * Client-side GA4 event helper.
 *
 * Fires events into the gtag.js instance loaded in the root layout. Used for
 * conversion events (generate_lead, whatsapp_click) that are then marked as
 * conversions in GA4 and imported into Google Ads to drive bidding.
 *
 * Safe to call anywhere on the client — no-ops on the server and if gtag
 * hasn't loaded (e.g. blocked by an ad blocker). For guaranteed delivery,
 * server-side Measurement Protocol is layered on top in /api/contact.
 */

// GA4 measurement ID — public token, safe to ship in client HTML.
// Override per-environment with NEXT_PUBLIC_GA_MEASUREMENT_ID.
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-4WWE6FCNBF";

type GtagParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (command: string, eventName: string, params?: GtagParams) => void;
    dataLayer?: unknown[];
  }
}

export function trackEvent(eventName: string, params: GtagParams = {}): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", eventName, params);
}

/**
 * Read the GA4 client_id from the `_ga` cookie so the server can attribute its
 * Measurement Protocol events to the same visitor/session (and thus the gclid).
 * Cookie format: `_ga=GA1.1.<clientId>` where clientId is `1234567890.1234567890`.
 * Returns "" if gtag never ran (e.g. blocked) — server falls back to random id.
 */
export function getGAClientId(): string {
  if (typeof document === "undefined") return "";
  const m = document.cookie.match(/_ga=GA\d\.\d\.(\d+\.\d+)/);
  return m ? m[1] : "";
}

/**
 * Read the GA4 *session_id* from the per-stream `_ga_<STREAM>` cookie so a
 * server-side Measurement Protocol event can be stitched to the SAME session
 * the visitor is in — which carries the gclid and lets GA4 attribute the
 * conversion to Google Ads. Cookie format: `_ga_4WWE6FCNBF=GS1.1.<sessionId>.<...>`.
 * Without this the server invents a fake session and the conversion lands as
 * source "(not set)" — unattributed, never imported into Google Ads.
 */
export function getGASessionId(): string {
  if (typeof document === "undefined") return "";
  const stream = GA_MEASUREMENT_ID.replace(/^G-/, "");
  const m = document.cookie.match(new RegExp(`_ga_${stream}=GS\\d\\.\\d\\.(\\d+)`));
  return m ? m[1] : "";
}

/**
 * WhatsApp CTA clicked (secondary conversion / contact intent).
 * Lead-form conversions are fired server-side from /api/contact (see lib/ga4-server.ts).
 */
export function trackWhatsAppClick(params: GtagParams = {}): void {
  trackEvent("whatsapp_click", params);
}
