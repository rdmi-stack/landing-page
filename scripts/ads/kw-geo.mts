/**
 * Country-by-country search-volume comparison via the Google Ads Keyword Planner API.
 * For each keyword, pulls avg monthly searches + competition + top-of-page CPC
 * across a set of countries, so you can see where demand actually lives.
 *
 *   node scripts/ads/kw-geo.mts "web development company" "software development company"
 *
 * NOTE: CPC bids come back in the AD ACCOUNT's currency (INR) regardless of geo,
 * so treat cross-country CPC as a relative signal, not the real local USD/AED rate.
 */

import { GoogleAdsApi, enums } from "google-ads-api";
import fs from "node:fs";
import path from "node:path";

const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

const seeds = process.argv.slice(2).filter((a) => !a.startsWith("-"));
if (!seeds.length) throw new Error('Pass keywords, e.g. node scripts/ads/kw-geo.mts "web development company"');

// geoTargetConstants ids
const GEOS: { name: string; id: string }[] = [
  { name: "USA", id: "2840" },
  { name: "UAE/Dubai", id: "2784" },
  { name: "Australia", id: "2036" },
  { name: "UK", id: "2826" },
  { name: "Canada", id: "2124" },
  { name: "India", id: "2356" },
];
const ENGLISH = "languageConstants/1000";

const client = new GoogleAdsApi({
  client_id: process.env.GOOGLE_ADS_CLIENT_ID!,
  client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET!,
  developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN!,
});
const cid = process.env.GOOGLE_ADS_CUSTOMER_ID!.replace(/-/g, "");
const customer = client.Customer({
  customer_id: cid,
  login_customer_id: process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID!.replace(/-/g, ""),
  refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN!,
});

const COMP_MAP: Record<string, string> = {
  "0": "—", "1": "?", "2": "LOW", "3": "MED", "4": "HIGH",
  UNSPECIFIED: "—", UNKNOWN: "?", LOW: "LOW", MEDIUM: "MED", HIGH: "HIGH",
};
const compLabel = (c: unknown) => COMP_MAP[String(c)] ?? "?";

type Cell = { vol: number; comp: unknown; lo: number; hi: number };
// keyword -> geoName -> cell
const grid = new Map<string, Map<string, Cell>>();
for (const s of seeds) grid.set(s.toLowerCase(), new Map());

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

for (const geo of GEOS) {
  await sleep(5000); // stay under the per-method requests-per-minute quota
  const res = await customer.keywordPlanIdeas.generateKeywordHistoricalMetrics({
    customer_id: cid,
    language: ENGLISH,
    geo_target_constants: [`geoTargetConstants/${geo.id}`],
    keyword_plan_network: enums.KeywordPlanNetwork.GOOGLE_SEARCH,
    include_adult_keywords: false,
    keywords: seeds,
  });
  for (const r of res.results || []) {
    const m = r.keyword_metrics;
    const key = (r.text || "").toLowerCase();
    const bucket = grid.get(key);
    if (!bucket) continue;
    bucket.set(geo.name, {
      vol: Number(m?.avg_monthly_searches || 0),
      comp: m?.competition,
      lo: Number(m?.low_top_of_page_bid_micros || 0) / 1e6,
      hi: Number(m?.high_top_of_page_bid_micros || 0) / 1e6,
    });
  }
}

for (const s of seeds) {
  console.log(`\n══ "${s}"   (Google Search · avg monthly searches · 12-mo)`);
  console.log("   country        vol/mo   comp    CPC (top-of-page, account ₹)");
  console.log("   " + "─".repeat(60));
  const bucket = grid.get(s.toLowerCase())!;
  const ordered = GEOS.map((g) => ({ name: g.name, c: bucket.get(g.name) }))
    .sort((a, b) => (b.c?.vol || 0) - (a.c?.vol || 0));
  for (const { name, c } of ordered) {
    if (!c) {
      console.log(`   ${name.padEnd(13)} ${"—".padStart(8)}`);
      continue;
    }
    const cpc = c.hi ? `₹${c.lo.toFixed(0)}–${c.hi.toFixed(0)}` : "—";
    console.log(
      `   ${name.padEnd(13)} ${c.vol.toLocaleString().padStart(8)}   ${compLabel(c.comp).padEnd(5)}  ${cpc}`,
    );
  }
}
console.log();
