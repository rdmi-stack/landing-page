/**
 * Capture Google click IDs (gclid / gbraid / wbraid) + UTM params from the
 * landing URL and persist them in a 90-day cookie, so they survive until the
 * visitor submits the lead form. The gclid is what lets us upload an offline
 * conversion back to Google Ads when the lead later qualifies (OCI).
 *
 * Call captureAttribution() on mount of any ad landing page; read it at submit
 * time with getAttribution().
 */

const KEYS = [
  "gclid", "gbraid", "wbraid",
  "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content",
] as const;

const COOKIE = "rdmi_attr";
const MAX_AGE = 60 * 60 * 24 * 90; // 90 days — Google's OCI click window

export type Attribution = Partial<Record<(typeof KEYS)[number], string>>;

/** Read click-id + UTM params off the URL and store them (merges, never clobbers an existing gclid with nothing). */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  const p = new URLSearchParams(window.location.search);
  const fresh: Attribution = {};
  for (const k of KEYS) {
    const v = p.get(k);
    if (v) fresh[k] = v.slice(0, 512);
  }
  if (Object.keys(fresh).length === 0) return; // nothing new on this URL
  const merged = { ...getAttribution(), ...fresh };
  document.cookie = `${COOKIE}=${encodeURIComponent(JSON.stringify(merged))};path=/;max-age=${MAX_AGE};SameSite=Lax`;
}

/** The stored click-id + UTM data (or {} if none). */
export function getAttribution(): Attribution {
  if (typeof document === "undefined") return {};
  const m = document.cookie.match(new RegExp(`(?:^|;\\s*)${COOKIE}=([^;]+)`));
  if (!m) return {};
  try {
    return JSON.parse(decodeURIComponent(m[1])) as Attribution;
  } catch {
    return {};
  }
}
