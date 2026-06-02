/**
 * Rules-based auto-optimizer for the Google Ads account.
 *
 *   node scripts/ads/optimize.mts            # DRY-RUN (default) — prints planned changes, mutates nothing
 *   node scripts/ads/optimize.mts --apply    # actually pause waste + add negatives
 *   node scripts/ads/optimize.mts --apply --days=7
 *
 * SAFETY:
 *   - DRY-RUN is the default. Nothing changes unless --apply is passed.
 *   - Only ENABLED campaigns are touched — while everything is PAUSED this is a no-op.
 *   - Conservative thresholds (tune RULES below). Only PAUSES keywords and ADDS
 *     exact-match negatives; never deletes, never raises budgets, never enables spend.
 *
 * RULES (easy to tune — owner expectation: rules live in code):
 *   1. Pause keyword:  clicks ≥ KW_CLICKS  AND  conversions = 0  AND  cost ≥ KW_COST
 *   2. Add negative:   search term clicks ≥ ST_CLICKS  AND  conversions = 0  AND  cost ≥ ST_COST
 *   (de-duped against existing campaign negatives; added EXACT at campaign level)
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

// ── Tunable rules ────────────────────────────────────────────────────
const RULES = {
  KW_CLICKS: 15,        // min clicks before a 0-conversion keyword is pausable
  KW_COST: 3000,        // ₹ — min spend (≈1.5× the ₹2,000 target CPA) before pausing
  ST_CLICKS: 6,         // min clicks before a 0-conversion search term is negated
  ST_COST: 1200,        // ₹ — min spend before negating a search term
};

const args = process.argv.slice(2);
const APPLY = args.includes("--apply");
const days = Number((args.find((a) => a.startsWith("--days=")) || "--days=30").split("=")[1]) || 30;
const RANGE: Record<number, string> = { 7: "LAST_7_DAYS", 14: "LAST_14_DAYS", 30: "LAST_30_DAYS" };
const during = RANGE[days] ?? "LAST_30_DAYS";

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

log(`\nRDMI Ads Optimizer — ${during} — ${APPLY ? "APPLY (live mutations)" : "DRY-RUN (no changes)"}`);
log("=".repeat(74));
log(`Rules: pause kw if ≥${RULES.KW_CLICKS} clicks & 0 conv & ≥₹${RULES.KW_COST};  ` +
    `negate term if ≥${RULES.ST_CLICKS} clicks & 0 conv & ≥₹${RULES.ST_COST}`);

// ── Rule 1: pausable waste keywords ──────────────────────────────────
const kws = await customer.query(`
  SELECT campaign.name, ad_group.name, ad_group_criterion.resource_name,
         ad_group_criterion.keyword.text, metrics.clicks, metrics.cost_micros, metrics.conversions
  FROM keyword_view
  WHERE segments.date DURING ${during} AND ad_group_criterion.status = 'ENABLED'
    AND campaign.status = 'ENABLED'
  ORDER BY metrics.cost_micros DESC
`);
const pausable = kws.filter((r) =>
  n(r.metrics!.conversions) === 0 &&
  n(r.metrics!.clicks) >= RULES.KW_CLICKS &&
  inr(r.metrics!.cost_micros) >= RULES.KW_COST);

log(`\n1) WASTE KEYWORDS TO PAUSE — ${pausable.length} found`);
log("─".repeat(74));
if (!pausable.length) log("  None meet the threshold. Nothing to pause.");
for (const r of pausable) {
  log(`  pause "${r.ad_group_criterion!.keyword!.text}"  (₹${Math.round(inr(r.metrics!.cost_micros))}, ${n(r.metrics!.clicks)} clk, 0 conv)  [${r.campaign!.name}]`);
}

// ── Rule 2: search terms to negate (de-dup vs existing negatives) ─────
const terms = await customer.query(`
  SELECT campaign.id, campaign.name, search_term_view.search_term,
         metrics.clicks, metrics.cost_micros, metrics.conversions
  FROM search_term_view
  WHERE segments.date DURING ${during} AND campaign.status = 'ENABLED'
  ORDER BY metrics.cost_micros DESC
`);
const existingNeg = await customer.query(`
  SELECT campaign.id, campaign_criterion.keyword.text
  FROM campaign_criterion
  WHERE campaign_criterion.negative = TRUE AND campaign_criterion.type = 'KEYWORD'
`);
const negSet = new Set(existingNeg.map((r) => `${r.campaign!.id}|${(r.campaign_criterion!.keyword!.text || "").toLowerCase()}`));

const cid = process.env.GOOGLE_ADS_CUSTOMER_ID!.replace(/-/g, "");
const toNegate = terms.filter((r) =>
  n(r.metrics!.conversions) === 0 &&
  n(r.metrics!.clicks) >= RULES.ST_CLICKS &&
  inr(r.metrics!.cost_micros) >= RULES.ST_COST &&
  !negSet.has(`${r.campaign!.id}|${(r.search_term_view!.search_term || "").toLowerCase()}`));

log(`\n2) SEARCH TERMS TO NEGATE (EXACT, campaign-level) — ${toNegate.length} found`);
log("─".repeat(74));
if (!toNegate.length) log("  None meet the threshold (or already negated). Nothing to add.");
for (const r of toNegate) {
  log(`  negate "${r.search_term_view!.search_term}"  (₹${Math.round(inr(r.metrics!.cost_micros))}, ${n(r.metrics!.clicks)} clk, 0 conv)  [${r.campaign!.name}]`);
}

// ── Apply ────────────────────────────────────────────────────────────
log("\n" + "=".repeat(74));
if (!APPLY) {
  log(`DRY-RUN complete. Would pause ${pausable.length} keyword(s) and add ${toNegate.length} negative(s).`);
  log("Re-run with --apply to execute.\n");
} else {
  let paused = 0, negated = 0;
  if (pausable.length) {
    await customer.adGroupCriteria.update(
      pausable.map((r) => ({
        resource_name: r.ad_group_criterion!.resource_name!,
        status: enums.AdGroupCriterionStatus.PAUSED,
      })),
    );
    paused = pausable.length;
  }
  if (toNegate.length) {
    await customer.campaignCriteria.create(
      toNegate.map((r) => ({
        campaign: `customers/${cid}/campaigns/${r.campaign!.id}`,
        negative: true,
        keyword: { text: r.search_term_view!.search_term!, match_type: enums.KeywordMatchType.EXACT },
      })),
    );
    negated = toNegate.length;
  }
  log(`APPLIED. Paused ${paused} keyword(s), added ${negated} negative(s).\n`);
}

// GitHub Actions job summary (no-op locally)
if (process.env.GITHUB_STEP_SUMMARY) {
  fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, "```\n" + out.join("\n") + "\n```\n");
}
