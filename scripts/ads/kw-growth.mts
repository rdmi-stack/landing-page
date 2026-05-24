/**
 * Growth ranking across service categories via the Google Ads Keyword Planner API.
 * Pulls the trailing-12-mo monthly volumes for a basket of service keywords, then
 * ranks by growth = (last-6-mo avg) / (first-6-mo avg). Surfaces what's rising fast.
 *
 *   node scripts/ads/kw-growth.mts --geo=USA
 *   node scripts/ads/kw-growth.mts --geo=USA "extra keyword" "another"
 *
 * --geo: USA UAE Australia UK Canada India Singapore Germany (default USA)
 * Half-vs-half is more robust to bucketing/endpoint noise than first-vs-last month,
 * but H1 (older) and H2 (recent) span different seasons — read as a directional signal.
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

// Basket of commercial service keywords across categories. Extra args are appended.
const BASKET = [
  // — AI / Agents / GenAI —
  "ai automation agency", "ai agent development", "ai consulting services",
  "generative ai development", "ai chatbot development", "llm development",
  "rag development", "ai voice agent", "conversational ai development",
  "ai integration services", "machine learning development", "ai saas development",
  "computer vision development",
  // — Automation —
  "workflow automation services", "business process automation",
  "robotic process automation", "intelligent automation",
  // — Legacy dev —
  "web development company", "software development company",
  "mobile app development company", "ecommerce development",
  "wordpress development", "shopify development", "saas development company",
  "custom software development company",
  // — Adjacent / infra / marketing —
  "seo services", "digital marketing services", "data engineering services",
  "cloud migration services", "devops services", "cybersecurity services",
  "blockchain development", "web3 development",
];
const seeds = [...new Set([...BASKET, ...args.filter((a) => !a.startsWith("-"))])];

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

const monthEnum: Record<string, number> = {
  JANUARY: 1, FEBRUARY: 2, MARCH: 3, APRIL: 4, MAY: 5, JUNE: 6,
  JULY: 7, AUGUST: 8, SEPTEMBER: 9, OCTOBER: 10, NOVEMBER: 11, DECEMBER: 12,
};
const monthNum = (m: unknown) =>
  typeof m === "number" ? m : (monthEnum[String(m)] ?? (Number(m) || 0));
const avg = (a: number[]) => (a.length ? a.reduce((x, y) => x + y, 0) / a.length : 0);

// Historical metrics caps the keyword list per call; chunk to be safe.
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const chunk = <T>(a: T[], n: number) => Array.from({ length: Math.ceil(a.length / n) }, (_, i) => a.slice(i * n, i * n + n));

type Row = { text: string; avg12: number; h1: number; h2: number; growth: number };
const out: Row[] = [];

for (const group of chunk(seeds, 18)) {
  const res = await customer.keywordPlanIdeas.generateKeywordHistoricalMetrics({
    customer_id: cid,
    language: ENGLISH,
    geo_target_constants: [`geoTargetConstants/${geoId}`],
    keyword_plan_network: enums.KeywordPlanNetwork.GOOGLE_SEARCH,
    include_adult_keywords: false,
    keywords: group,
  });
  for (const r of res.results || []) {
    const m = r.keyword_metrics;
    const vols = (m?.monthly_search_volumes || [])
      .map((v) => ({ y: Number(v.year), mo: monthNum(v.month), n: Number(v.monthly_searches || 0) }))
      .filter((v) => v.y && v.mo)
      .sort((a, b) => a.y * 12 + a.mo - (b.y * 12 + b.mo));
    if (vols.length < 6) continue;
    const half = Math.floor(vols.length / 2);
    const h1 = avg(vols.slice(0, half).map((v) => v.n));
    const h2 = avg(vols.slice(vols.length - half).map((v) => v.n));
    out.push({
      text: r.text!,
      avg12: Number(m?.avg_monthly_searches || 0),
      h1, h2,
      growth: h1 ? (h2 - h1) / h1 : 0,
    });
  }
  await sleep(5000);
}

out.sort((a, b) => b.growth - a.growth);

console.log(`\nService-keyword growth ranking — ${geoArg} · Google Search · trailing 12 mo`);
console.log(`(growth = last-6-mo avg vs first-6-mo avg)\n`);
console.log("  growth    12-mo avg   first6 → last6     keyword");
console.log("  " + "─".repeat(72));
for (const r of out) {
  const g = (r.growth * 100).toFixed(0);
  const arrow = r.growth > 0.15 ? "▲" : r.growth < -0.15 ? "▼" : "·";
  const gStr = `${r.growth > 0 ? "+" : ""}${g}%`;
  console.log(
    `  ${arrow} ${gStr.padStart(6)}  ${r.avg12.toLocaleString().padStart(8)}   ` +
      `${Math.round(r.h1).toLocaleString().padStart(6)} → ${Math.round(r.h2).toLocaleString().padStart(6)}    ${r.text}`,
  );
}
console.log("  " + "─".repeat(72));
console.log(`  ${out.length} keywords ranked · ▲ rising >15% · ▼ falling >15%\n`);
