/**
 * Historical monthly search-volume trend via the Google Ads Keyword Planner API.
 * Uses generateKeywordHistoricalMetrics, which returns the trailing ~48 months
 * of monthly_search_volumes per keyword.
 *
 *   node scripts/ads/kw-trend.mts "web development" "app development" "software development"
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
const geoArg = (args.find((a) => a.startsWith("--geo=")) || "--geo=INDIA").split("=")[1].toUpperCase();
const geoId = GEO_IDS[geoArg];
if (!geoId) throw new Error(`Unknown geo "${geoArg}". Options: ${Object.keys(GEO_IDS).join(", ")}`);
const seeds = args.filter((a) => !a.startsWith("-"));
if (!seeds.length) throw new Error('Pass keywords, e.g. node scripts/ads/kw-trend.mts "web development"');

const INDIA = `geoTargetConstants/${geoId}`;
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

const MONTHS = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const monthEnum: Record<string, number> = {
  JANUARY: 1, FEBRUARY: 2, MARCH: 3, APRIL: 4, MAY: 5, JUNE: 6,
  JULY: 7, AUGUST: 8, SEPTEMBER: 9, OCTOBER: 10, NOVEMBER: 11, DECEMBER: 12,
};
const monthNum = (m: unknown) =>
  typeof m === "number" ? m : (monthEnum[String(m)] ?? (Number(m) || 0));

const res = await customer.keywordPlanIdeas.generateKeywordHistoricalMetrics({
  customer_id: process.env.GOOGLE_ADS_CUSTOMER_ID!.replace(/-/g, ""),
  language: ENGLISH,
  geo_target_constants: [INDIA],
  keyword_plan_network: enums.KeywordPlanNetwork.GOOGLE_SEARCH,
  include_adult_keywords: false,
  keywords: seeds,
});

for (const r of res.results || []) {
  const m = r.keyword_metrics;
  const vols = (m?.monthly_search_volumes || [])
    .map((v) => ({
      y: Number(v.year),
      mo: monthNum(v.month),
      n: Number(v.monthly_searches || 0),
    }))
    .filter((v) => v.y && v.mo)
    .sort((a, b) => a.y * 12 + a.mo - (b.y * 12 + b.mo));

  console.log(`\n══ "${r.text}"  (${geoArg} · Google Search)`);
  console.log(`   12-mo avg reported: ${Number(m?.avg_monthly_searches || 0).toLocaleString()}/mo\n`);
  if (!vols.length) {
    console.log("   (no monthly history returned)\n");
    continue;
  }
  const max = Math.max(...vols.map((v) => v.n));
  for (const v of vols) {
    const bar = "█".repeat(Math.round((v.n / max) * 40));
    console.log(`   ${MONTHS[v.mo]} ${v.y}  ${String(v.n).padStart(7)}  ${bar}`);
  }
  const first = vols[0], last = vols[vols.length - 1];
  const pct = first.n ? (((last.n - first.n) / first.n) * 100).toFixed(1) : "—";
  console.log(
    `\n   ${MONTHS[first.mo]} ${first.y} → ${MONTHS[last.mo]} ${last.y}: ` +
      `${first.n.toLocaleString()} → ${last.n.toLocaleString()}  (${pct}% change over window)\n`,
  );
}
