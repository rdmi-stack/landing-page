/**
 * Keyword research via the Google Ads Keyword Planner API.
 * Pulls real India search volume + competition + top-of-page CPC for keywords
 * relevant to a landing page (seeded from its target keywords + URL), and
 * surfaces new keyword ideas ranked by volume.
 *
 *   node scripts/ads/keyword-research.mts [slug]   (default: web-development-company)
 */

import { GoogleAdsApi, enums } from "google-ads-api";
import fs from "node:fs";
import path from "node:path";
import { keywordGroups } from "../../src/data/keyword-groups.ts";
import { buildRouteMap } from "./route-map.mts";
import { DOMAIN } from "./config.mts";

const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

const slug = process.argv[2] || "web-development-company";
const group = keywordGroups.find((g) => g.slug === slug);
if (!group) throw new Error(`No keyword group for slug "${slug}"`);
const routePath = buildRouteMap().get(slug);
const url = routePath ? `${DOMAIN}${routePath}` : undefined;
const seeds = (group.targetKeywords || []).slice(0, 20);
const owned = new Set(group.targetKeywords.map((k) => k.toLowerCase()));

const INDIA = "geoTargetConstants/2356";
const ENGLISH = "languageConstants/1000";

const client = new GoogleAdsApi({
  client_id: process.env.GOOGLE_ADS_CLIENT_ID!,
  client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET!,
  developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN!,
});
const customer = client.Customer({
  customer_id: process.env.GOOGLE_ADS_CUSTOMER_ID!.replace(/-/g, ""),
  login_customer_id: process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID!.replace(/-/g, ""),
  refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN!,
});

const COMP_MAP: Record<string, string> = {
  "0": "—", "1": "?", "2": "LOW", "3": "MED", "4": "HIGH",
  UNSPECIFIED: "—", UNKNOWN: "?", LOW: "LOW", MEDIUM: "MED", HIGH: "HIGH",
};
const compLabel = (c: unknown) => COMP_MAP[String(c)] ?? "?";

const ideas = await customer.keywordPlanIdeas.generateKeywordIdeas({
  customer_id: process.env.GOOGLE_ADS_CUSTOMER_ID!.replace(/-/g, ""),
  language: ENGLISH,
  geo_target_constants: [INDIA],
  keyword_plan_network: enums.KeywordPlanNetwork.GOOGLE_SEARCH,
  include_adult_keywords: false,
  ...(url
    ? { keyword_and_url_seed: { url, keywords: seeds } }
    : { keyword_seed: { keywords: seeds } }),
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
  .sort((a, b) => b.vol - a.vol);

console.log(`\nKeyword research — "${group.primaryKeyword}"  (India · Google Search)\n`);
console.log("  vol/mo   comp   CPC (top-of-page, ₹)   keyword");
console.log("  " + "─".repeat(74));
for (const r of rows.slice(0, 45)) {
  const own = owned.has(r.text.toLowerCase()) ? "✓" : " ";
  const cpc = r.hi ? `₹${r.lo.toFixed(0)}–${r.hi.toFixed(0)}` : "—";
  console.log(
    `${own} ${String(r.vol).padStart(7)}  ${compLabel(r.comp).padEnd(5)} ${cpc.padStart(14)}      ${r.text}`,
  );
}
console.log("  " + "─".repeat(74));
console.log(`  ${rows.length} ideas · ✓ = already targeted in your campaign · top 45 shown\n`);
