/**
 * Read-only performance report via the Google Ads API (GAQL).
 * Pulls campaign / keyword / search-term metrics over a lookback window and
 * prints ranked WASTE and WINNER tables — the input a human (or optimize.mts)
 * uses to decide what to pause, negate, or scale.
 *
 *   node scripts/ads/report.mts                 # last 30 days, all enabled campaigns
 *   node scripts/ads/report.mts --days=7        # last 7 days
 *   node scripts/ads/report.mts --days=30 --md  # also write docs/ads/report-<date>.md
 *
 * Read-only — never mutates the account. Safe to run anytime.
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

const args = process.argv.slice(2);
const days = Number((args.find((a) => a.startsWith("--days=")) || "--days=30").split("=")[1]) || 30;
const RANGE: Record<number, string> = { 7: "LAST_7_DAYS", 14: "LAST_14_DAYS", 30: "LAST_30_DAYS" };
const during = RANGE[days] ?? "LAST_30_DAYS";
const writeMd = args.includes("--md");

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

const inr = (micros: unknown) => Number(micros || 0) / 1e6;
const n = (v: unknown) => Number(v || 0);
const out: string[] = [];
const log = (s = "") => { console.log(s); out.push(s); };

log(`\nRDMI Ads Performance Report — ${during} · account ${process.env.GOOGLE_ADS_CUSTOMER_ID}`);
log("=".repeat(78));

// ── 1. Campaign summary ──────────────────────────────────────────────
const camps = await customer.query(`
  SELECT campaign.name, campaign.status, metrics.impressions, metrics.clicks, metrics.cost_micros,
         metrics.conversions, metrics.conversions_value, metrics.ctr, metrics.average_cpc
  FROM campaign
  WHERE segments.date DURING ${during} AND metrics.cost_micros > 0
  ORDER BY metrics.cost_micros DESC
`);
log("\nCAMPAIGNS (any that spent in window)");
log("─".repeat(78));
if (!camps.length) {
  log("  No enabled campaigns with data in this window.");
  log("  (Campaigns may still be PAUSED — enable them to start collecting data.)");
} else {
  log("  cost      clicks  conv   CPA       CTR     campaign");
  let tc = 0, tk = 0, tv = 0;
  for (const r of camps) {
    const cost = inr(r.metrics!.cost_micros), clk = n(r.metrics!.clicks), cv = n(r.metrics!.conversions);
    tc += cost; tk += clk; tv += cv;
    const cpa = cv ? `₹${Math.round(cost / cv)}` : "—";
    const ctr = (n(r.metrics!.ctr) * 100).toFixed(1) + "%";
    const st = r.campaign!.status === enums.CampaignStatus.ENABLED ? "" : " (paused)";
    log(`  ₹${String(Math.round(cost)).padEnd(8)} ${String(clk).padStart(5)}  ${String(cv).padStart(4)}  ${cpa.padEnd(8)}  ${ctr.padStart(5)}   ${r.campaign!.name}${st}`);
  }
  log("─".repeat(78));
  log(`  TOTAL  cost ₹${Math.round(tc)} · clicks ${tk} · conv ${tv} · blended CPA ${tv ? "₹" + Math.round(tc / tv) : "—"}`);
}

// ── 2. Keyword WASTE + WINNERS ───────────────────────────────────────
const kws = await customer.query(`
  SELECT campaign.name, ad_group.name, ad_group_criterion.keyword.text,
         ad_group_criterion.keyword.match_type, metrics.clicks, metrics.cost_micros,
         metrics.conversions, metrics.ctr, ad_group_criterion.quality_info.quality_score
  FROM keyword_view
  WHERE segments.date DURING ${during} AND ad_group_criterion.status = 'ENABLED'
  ORDER BY metrics.cost_micros DESC
`);
const waste = kws.filter((r) => n(r.metrics!.conversions) === 0 && inr(r.metrics!.cost_micros) > 0 && n(r.metrics!.clicks) >= 10);
const winners = kws.filter((r) => n(r.metrics!.conversions) > 0).sort((a, b) => n(b.metrics!.conversions) - n(a.metrics!.conversions));

log("\nKEYWORD WASTE — spend, 0 conversions, ≥10 clicks (negative/pause candidates)");
log("─".repeat(78));
if (!waste.length) log("  None. (No keyword has burned ≥10 clicks with 0 conversions yet.)");
else for (const r of waste.slice(0, 20)) {
  const qs = r.ad_group_criterion!.quality_info?.quality_score;
  log(`  ₹${String(Math.round(inr(r.metrics!.cost_micros))).padEnd(7)} ${String(n(r.metrics!.clicks)).padStart(4)} clk  QS:${qs ?? "—"}  "${r.ad_group_criterion!.keyword!.text}"  [${r.campaign!.name}]`);
}

log("\nKEYWORD WINNERS — converting keywords (scale / raise priority)");
log("─".repeat(78));
if (!winners.length) log("  None yet. (No conversions recorded in this window.)");
else for (const r of winners.slice(0, 15)) {
  const cost = inr(r.metrics!.cost_micros), cv = n(r.metrics!.conversions);
  log(`  ${cv.toFixed(1)} conv  ₹${Math.round(cost)} cost  CPA ₹${Math.round(cost / cv)}  "${r.ad_group_criterion!.keyword!.text}"`);
}

// ── 3. Search-term WASTE ─────────────────────────────────────────────
const terms = await customer.query(`
  SELECT campaign.name, search_term_view.search_term,
         metrics.clicks, metrics.cost_micros, metrics.conversions
  FROM search_term_view
  WHERE segments.date DURING ${during}
  ORDER BY metrics.cost_micros DESC
`);
const stWaste = terms.filter((r) => n(r.metrics!.conversions) === 0 && inr(r.metrics!.cost_micros) > 0 && n(r.metrics!.clicks) >= 5);
log("\nSEARCH-TERM WASTE — spend, 0 conversions, ≥5 clicks (negative candidates)");
log("─".repeat(78));
if (!stWaste.length) log("  None. (No wasteful search term has crossed ≥5 clicks with 0 conversions.)");
else for (const r of stWaste.slice(0, 25)) {
  log(`  ₹${String(Math.round(inr(r.metrics!.cost_micros))).padEnd(7)} ${String(n(r.metrics!.clicks)).padStart(4)} clk  "${r.search_term_view!.search_term}"  [${r.campaign!.name}]`);
}

log("\n" + "=".repeat(78));
log(`Report complete. ${kws.length} keywords, ${terms.length} search terms analysed over ${during}.`);
log("Run `node scripts/ads/optimize.mts --dry-run` to see what the rules engine would change.\n");

if (writeMd) {
  const dir = path.resolve(process.cwd(), "docs/ads");
  fs.mkdirSync(dir, { recursive: true });
  const f = path.join(dir, `report-${new Date().toISOString().slice(0, 10)}.md`);
  fs.writeFileSync(f, "```\n" + out.join("\n") + "\n```\n");
  console.log(`\nWrote ${f}`);
}
