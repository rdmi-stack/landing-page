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

/** Lead form submitted (the primary conversion). */
export function trackLead(params: GtagParams = {}): void {
  trackEvent("generate_lead", { currency: "INR", value: 1500, ...params });
}

/** WhatsApp CTA clicked (secondary conversion / contact intent). */
export function trackWhatsAppClick(params: GtagParams = {}): void {
  trackEvent("whatsapp_click", params);
}
