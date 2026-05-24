/**
 * Keyword idea discovery via the Google Ads Keyword Planner API, geo-flexible.
 * Seeds a theme, returns related keywords ranked by volume with competition + CPC.
 *
 *   node scripts/ads/kw-ideas.mts --geo=USA "ai agent development" "ai automation agency"
 *
 * --geo accepts: USA UAE Australia UK Canada India Singapore Germany (default USA)
 * CPC bids are in the AD ACCOUNT currency (INR) regardless of geo.
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

const GEO_IDS: Record<string, string> = {
  USA: "2840", UAE: "2784", AUSTRALIA: "2036", UK: "2826",
  CANADA: "2124", INDIA: "2356", SINGAPORE: "2702", GERMANY: "2276",
};

const args = process.argv.slice(2);
const geoArg = (args.find((a) => a.startsWith("--geo=")) || "--geo=USA").split("=")[1].toUpperCase();
const geoId = GEO_IDS[geoArg];
if (!geoId) throw new Error(`Unknown geo "${geoArg}". Options: ${Object.keys(GEO_IDS).join(", ")}`);
const seeds = args.filter((a) => !a.startsWith("-"));
if (!seeds.length) throw new Error('Pass seed keywords after --geo=, e.g. "ai agent development"');

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

const ideas = await customer.keywordPlanIdeas.generateKeywordIdeas({
  customer_id: cid,
  language: ENGLISH,
  geo_target_constants: [`geoTargetConstants/${geoId}`],
  keyword_plan_network: enums.KeywordPlanNetwork.GOOGLE_SEARCH,
  include_adult_keywords: false,
  keyword_seed: { keywords: seeds },
});

type Row = { text: string; vol: number; comp: unknown; lo: number; hi: number };
const rows: Row[] = ideas
  .map((r) => {
    const m = r.keyword_idea_metrics;
    return {
      text: r.text!,
      vol: Number(m?.avg_monthly_searches || 0),
      comp: m?.competition,
      lo: Number(m?.low_top_of_page_bid_micros || 0) / 1e6,
      hi: Number(m?.high_top_of_page_bid_micros || 0) / 1e6,
    };
  })
  .filter((r) => r.vol > 0)
  .sort((a, b) => b.vol - a.vol);

console.log(`\nAI/automation keyword ideas — ${geoArg} · Google Search · seeds: ${seeds.join(", ")}\n`);
console.log("  vol/mo   comp    CPC (top-of-page, account ₹)   keyword");
console.log("  " + "─".repeat(76));
for (const r of rows.slice(0, 45)) {
  const cpc = r.hi ? `₹${r.lo.toFixed(0)}–${r.hi.toFixed(0)}` : "—";
  console.log(`  ${String(r.vol).padStart(7)}  ${compLabel(r.comp).padEnd(5)} ${cpc.padStart(16)}      ${r.text}`);
}
console.log("  " + "─".repeat(76));
console.log(`  ${rows.length} ideas with volume · top 45 shown\n`);
