/**
 * Create GA4 Key events via the Admin API, authed with user OAuth.
 *
 * Uses the same OAuth client as Google Ads (GOOGLE_ADS_CLIENT_ID/SECRET) plus
 * GA4_OAUTH_REFRESH_TOKEN (run `npm run ga4:oauth` once to mint it). The
 * service-account path is avoided — GA4's UI refuses to grant SA access.
 *
 *   npm run ga4:key-events
 */

import fs from "node:fs";
import path from "node:path";

const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

const PROPERTY_ID = process.env.GA4_PROPERTY_ID || process.argv[2];
const EVENTS = ["generate_lead", "whatsapp_click"];

const { GOOGLE_ADS_CLIENT_ID, GOOGLE_ADS_CLIENT_SECRET, GA4_OAUTH_REFRESH_TOKEN } = process.env;
if (!GOOGLE_ADS_CLIENT_ID || !GOOGLE_ADS_CLIENT_SECRET || !GA4_OAUTH_REFRESH_TOKEN) {
  console.error("✘ Need GOOGLE_ADS_CLIENT_ID/SECRET + GA4_OAUTH_REFRESH_TOKEN. Run `npm run ga4:oauth` first.");
  process.exit(1);
}
if (!PROPERTY_ID) {
  console.error("✘ Set GA4_PROPERTY_ID in .env.local (the numeric property id).");
  process.exit(1);
}

async function getAccessToken(): Promise<string> {
  const r = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: GOOGLE_ADS_CLIENT_ID!,
      client_secret: GOOGLE_ADS_CLIENT_SECRET!,
      refresh_token: GA4_OAUTH_REFRESH_TOKEN!,
      grant_type: "refresh_token",
    }),
  });
  const json = await r.json();
  if (!json.access_token) throw new Error("Token refresh failed: " + JSON.stringify(json));
  return json.access_token;
}

const token = await getAccessToken();
console.log(`✓ authenticated (OAuth) · property ${PROPERTY_ID}\n`);

const base = `https://analyticsadmin.googleapis.com/v1beta/properties/${PROPERTY_ID}/keyEvents`;
const listed = await (await fetch(base, { headers: { Authorization: `Bearer ${token}` } })).json();
if (listed.error) throw new Error(`${listed.error.code}: ${listed.error.message}`);
const existing: string[] = (listed.keyEvents || []).map((k: { eventName: string }) => k.eventName);

for (const ev of EVENTS) {
  if (existing.includes(ev)) {
    console.log(`• ${ev} — already a key event`);
    continue;
  }
  const res = await fetch(base, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ eventName: ev, countingMethod: "ONCE_PER_EVENT" }),
  });
  const json = await res.json();
  if (res.ok) console.log(`✓ created key event: ${ev}`);
  else console.log(`✗ ${ev} → ${res.status}: ${json?.error?.message || JSON.stringify(json)}`);
}
