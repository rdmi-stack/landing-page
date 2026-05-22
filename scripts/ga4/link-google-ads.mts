/**
 * Link the GA4 property to the Google Ads account via the GA4 Admin API.
 * Once linked, GA4 key events (generate_lead, whatsapp_click) become
 * importable as Google Ads conversions — required for conversion-based bidding.
 *
 *   node scripts/ga4/link-google-ads.mts
 */

import fs from "node:fs";
import path from "node:path";

const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

const PID = process.env.GA4_PROPERTY_ID!;
const ADS_CID = process.env.GOOGLE_ADS_CUSTOMER_ID!.replace(/-/g, "");

async function token(): Promise<string> {
  const r = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_ADS_CLIENT_ID!,
      client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET!,
      refresh_token: process.env.GA4_OAUTH_REFRESH_TOKEN!,
      grant_type: "refresh_token",
    }),
  });
  const j = await r.json();
  if (!j.access_token) throw new Error("token: " + JSON.stringify(j));
  return j.access_token;
}

const t = await token();
const H = { Authorization: `Bearer ${t}`, "Content-Type": "application/json" };
const base = `https://analyticsadmin.googleapis.com/v1alpha/properties/${PID}/googleAdsLinks`;

// Idempotent — check existing links first.
const existing = await (await fetch(base, { headers: H })).json();
if (existing.error) throw new Error(`${existing.error.code}: ${existing.error.message}`);
const already = (existing.googleAdsLinks || []).find((l: { customerId: string }) => l.customerId === ADS_CID);
if (already) {
  console.log(`• already linked: GA4 ${PID} ↔ Ads ${ADS_CID}  (${already.name})`);
  process.exit(0);
}

const res = await fetch(base, {
  method: "POST",
  headers: H,
  body: JSON.stringify({ customerId: ADS_CID, adsPersonalizationEnabled: true }),
});
const json = await res.json();
if (res.ok) {
  console.log(`✓ linked GA4 ${PID} ↔ Google Ads ${ADS_CID}  (${json.name})`);
  console.log("  GA4 key events will surface in Google Ads → Conversions within a few hours.");
} else {
  console.log(`✗ ${res.status}: ${json?.error?.message || JSON.stringify(json)}`);
}
