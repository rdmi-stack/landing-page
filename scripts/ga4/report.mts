/**
 * GA4 reporting via the Data API (analytics.readonly). Confirms events are
 * flowing and key events are counting. Realtime (last 30 min) + last 7 days.
 *
 *   npm run ga4:report
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

// 1. Realtime — last 30 minutes
const rt = await (
  await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${PID}:runRealtimeReport`, {
    method: "POST",
    headers: H,
    body: JSON.stringify({ dimensions: [{ name: "eventName" }], metrics: [{ name: "eventCount" }] }),
  })
).json();
if (rt.error) throw new Error(`Data API: ${rt.error.code} ${rt.error.message}`);
console.log("\nGA4 Realtime (last 30 min) — event counts:");
console.log("  " + "─".repeat(40));
for (const row of rt.rows || []) console.log(`  ${row.dimensionValues[0].value.padEnd(28)} ${row.metricValues[0].value}`);
if (!rt.rows?.length) console.log("  (no events in the last 30 min)");

// 2. Last 7 days — events + key events
const rep = await (
  await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${PID}:runReport`, {
    method: "POST",
    headers: H,
    body: JSON.stringify({
      dateRanges: [{ startDate: "7daysAgo", endDate: "today" }],
      dimensions: [{ name: "eventName" }],
      metrics: [{ name: "eventCount" }, { name: "keyEvents" }],
      orderBys: [{ metric: { metricName: "eventCount" }, desc: true }],
    }),
  })
).json();
if (rep.error) throw new Error(`Data API: ${rep.error.code} ${rep.error.message}`);
console.log("\nLast 7 days — events / key events:");
console.log("  " + "─".repeat(48));
console.log(`  ${"event".padEnd(28)} ${"count".padStart(7)} ${"keyEv".padStart(7)}`);
for (const row of rep.rows || []) {
  console.log(`  ${row.dimensionValues[0].value.padEnd(28)} ${row.metricValues[0].value.padStart(7)} ${row.metricValues[1].value.padStart(7)}`);
}
if (!rep.rows?.length) console.log("  (no events in the last 7 days)");
console.log("");
