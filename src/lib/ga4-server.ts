/**
 * Server-side GA4 event sender (Measurement Protocol).
 *
 * Fires events to GA4 from the API layer, bypassing the browser entirely — so
 * conversions are recorded even when an ad blocker strips the client-side
 * gtag.js tag (~15-30% of traffic). For Google Ads attribution to stitch the
 * server event to the ad click, the caller passes the GA `client_id` captured
 * from the visitor's `_ga` cookie (see getGAClientId in lib/gtag.ts); without
 * it the event still counts in GA4 but won't tie back to a gclid session.
 *
 * No-ops silently if GA4 env vars are absent, and never throws into the caller.
 */

const MEASUREMENT_ID = process.env.GA4_MEASUREMENT_ID;
const API_SECRET = process.env.GA4_API_SECRET;

export async function sendServerEvent(
  clientId: string,
  name: string,
  params: Record<string, string | number | boolean> = {},
  sessionId = "",
): Promise<void> {
  if (!MEASUREMENT_ID || !API_SECRET) return;
  // Fall back to a random client_id so the event still lands (unattributed).
  const cid = clientId || `${Date.now()}.${Math.floor(Math.random() * 1e9)}`;
  // engagement_time_msec + session_id are required for MP events to register a
  // session and surface in Realtime / standard reports. Critically, session_id
  // MUST be the visitor's REAL GA4 session id (passed from the browser) so the
  // conversion stitches to the gclid session and attributes to Google Ads.
  // A synthetic fallback id keeps the event landing, but unattributed ("(not set)").
  const enrichedParams = {
    engagement_time_msec: 100,
    session_id: sessionId || `${Date.now()}`,
    ...params,
  };
  try {
    await fetch(
      `https://www.google-analytics.com/mp/collect?measurement_id=${MEASUREMENT_ID}&api_secret=${API_SECRET}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ client_id: cid, events: [{ name, params: enrichedParams }] }),
      },
    );
  } catch (e) {
    console.error("[ga4] Measurement Protocol send failed:", e);
  }
}
