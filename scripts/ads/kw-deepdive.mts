/**
 * Full deep-dive on a few keywords via the Google Ads Keyword Planner API:
 *   1. GLOBAL total (no geo) — 12-mo month-wise volumes, avg, CPC, H1→H2 growth
 *   2. TOP COUNTRIES — per-country volume + CPC, ranked
 *
 *   node scripts/ads/kw-deepdive.mts "ai automation agency" "digital marketing services"
 *
 * CPC bids are in the AD ACCOUNT currency (INR) regardless of geo — relative signal.
 * Volumes cap at trailing ~12 months (Planner limit); recent months under-report.
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
const KEYWORDS = seeds.length ? seeds : ["ai automation agency", "digital marketing services"];

// Broad global country set (geoTargetConstant ids)
const COUNTRIES: { name: string; id: string }[] = [
  { name: "USA", id: "2840" }, { name: "India", id: "2356" }, { name: "UK", id: "2826" },
  { name: "Canada", id: "2124" }, { name: "Australia", id: "2036" }, { name: "UAE", id: "2784" },
  { name: "Germany", id: "2276" }, { name: "Singapore", id: "2702" }, { name: "Philippines", id: "2608" },
  { name: "Pakistan", id: "2586" }, { name: "Indonesia", id: "2360" }, { name: "Nigeria", id: "2566" },
  { name: "S.Africa", id: "2710" }, { name: "Saudi", id: "2682" }, { name: "Netherlands", id: "2528" },
  { name: "France", id: "2250" }, { name: "Ireland", id: "2372" }, { name: "Malaysia", id: "2458" },
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

const MONTHS = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const monthEnum: Record<string, number> = {
  JANUARY: 1, FEBRUARY: 2, MARCH: 3, APRIL: 4, MAY: 5, JUNE: 6,
  JULY: 7, AUGUST: 8, SEPTEMBER: 9, OCTOBER: 10, NOVEMBER: 11, DECEMBER: 12,
};
const monthNum = (m: unknown) =>
  typeof m === "number" ? m : (monthEnum[String(m)] ?? (Number(m) || 0));
const avg = (a: number[]) => (a.length ? a.reduce((x, y) => x + y, 0) / a.length : 0);
const COMP_MAP: Record<string, string> = {
  "0": "—", "1": "?", "2": "LOW", "3": "MED", "4": "HIGH",
  UNSPECIFIED: "—", UNKNOWN: "?", LOW: "LOW", MEDIUM: "MED", HIGH: "HIGH",
};
const compLabel = (c: unknown) => COMP_MAP[String(c)] ?? "?";
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

type Metrics = ReturnType<typeof parseRow>;
function parseRow(r: any) {
  const m = r.keyword_metrics;
  const vols = (m?.monthly_search_volumes || [])
    .map((v: any) => ({ y: Number(v.year), mo: monthNum(v.month), n: Number(v.monthly_searches || 0) }))
    .filter((v: any) => v.y && v.mo)
    .sort((a: any, b: any) => a.y * 12 + a.mo - (b.y * 12 + b.mo));
  const half = Math.floor(vols.length / 2);
  const h1 = avg(vols.slice(0, half).map((v: any) => v.n));
  const h2 = avg(vols.slice(vols.length - half).map((v: any) => v.n));
  return {
    text: r.text as string,
    avg12: Number(m?.avg_monthly_searches || 0),
    comp: m?.competition,
    lo: Number(m?.low_top_of_page_bid_micros || 0) / 1e6,
    hi: Number(m?.high_top_of_page_bid_micros || 0) / 1e6,
    vols, h1, h2,
    growth: h1 ? (h2 - h1) / h1 : 0,
  };
}

async function fetchMetrics(geoIds: string[]) {
  const res = await customer.keywordPlanIdeas.generateKeywordHistoricalMetrics({
    customer_id: cid,
    language: ENGLISH,
    ...(geoIds.length ? { geo_target_constants: geoIds.map((g) => `geoTargetConstants/${g}`) } : {}),
    keyword_plan_network: enums.KeywordPlanNetwork.GOOGLE_SEARCH,
    include_adult_keywords: false,
    keywords: KEYWORDS,
  });
  const map = new Map<string, Metrics>();
  for (const r of res.results || []) map.set((r.text || "").toLowerCase(), parseRow(r));
  return map;
}

// ---------- 1. GLOBAL ----------
console.log(`\n${"=".repeat(78)}\n GLOBAL (worldwide, all geos) · Google Search · trailing 12 mo\n${"=".repeat(78)}`);
const global = await fetchMetrics([]);
for (const kw of KEYWORDS) {
  const g = global.get(kw.toLowerCase());
  if (!g) { console.log(`\n"${kw}": no data`); continue; }
  const cpc = g.hi ? `₹${g.lo.toFixed(0)}–${g.hi.toFixed(0)}` : "—";
  console.log(`\n■ "${g.text}"   global avg ${g.avg12.toLocaleString()}/mo · comp ${compLabel(g.comp)} · CPC ${cpc}`);
  console.log(`  H1→H2 growth: ${Math.round(g.h1).toLocaleString()} → ${Math.round(g.h2).toLocaleString()}  (${(g.growth * 100).toFixed(0)}%)\n`);
  const max = Math.max(...g.vols.map((v) => v.n), 1);
  for (const v of g.vols) {
    const bar = "█".repeat(Math.round((v.n / max) * 38));
    console.log(`  ${MONTHS[v.mo]} ${String(v.y).slice(2)}  ${String(v.n).padStart(8)}  ${bar}`);
  }
}
await sleep(5000);

// ---------- 2. TOP COUNTRIES ----------
const byKw = new Map<string, { name: string; m: Metrics }[]>();
for (const kw of KEYWORDS) byKw.set(kw.toLowerCase(), []);
for (const c of COUNTRIES) {
  const map = await fetchMetrics([c.id]);
  for (const kw of KEYWORDS) {
    const m = map.get(kw.toLowerCase());
    if (m) byKw.get(kw.toLowerCase())!.push({ name: c.name, m });
  }
  await sleep(5000);
}

console.log(`\n\n${"=".repeat(78)}\n TOP COUNTRIES (by avg monthly searches)\n${"=".repeat(78)}`);
for (const kw of KEYWORDS) {
  console.log(`\n■ "${kw}"`);
  console.log("   country        vol/mo   comp    CPC (account ₹)   12-mo growth");
  console.log("   " + "─".repeat(66));
  const rows = byKw.get(kw.toLowerCase())!.sort((a, b) => b.m.avg12 - a.m.avg12);
  for (const { name, m } of rows) {
    if (!m.avg12) continue;
    const cpc = m.hi ? `₹${m.lo.toFixed(0)}–${m.hi.toFixed(0)}` : "—";
    const gr = `${m.growth > 0 ? "+" : ""}${(m.growth * 100).toFixed(0)}%`;
    const arrow = m.growth > 0.15 ? "▲" : m.growth < -0.15 ? "▼" : "·";
    console.log(
      `   ${name.padEnd(13)} ${m.avg12.toLocaleString().padStart(7)}   ${compLabel(m.comp).padEnd(5)}  ${cpc.padEnd(16)} ${arrow} ${gr}`,
    );
  }
}
console.log();
