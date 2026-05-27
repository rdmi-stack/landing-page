/**
 * Single-page Software Development campaign: ONE landing page
 * (/custom-software-development-company) targeted by ~21 high-intent keywords,
 * grouped into 4 tight themed ad groups (good Quality Score), each pointing to
 * the page with a keyword-injected H1 (?kw=).
 *
 *   node scripts/ads/softdev.mts            # preview
 *   node scripts/ads/softdev.mts -- --push  # create the campaign (PAUSED) via API
 */

import fs from "node:fs";
import path from "node:path";
import { keywordGroups } from "../../src/data/keyword-groups.ts";
import { buildRouteMap } from "./route-map.mts";
import { buildSkagCampaign, type Campaign } from "./build-campaign.mts";
import { MATCH_TYPES } from "./config.mts";
import { apiCredentialsPresent, pushToGoogleAds } from "./to-ads-api.mts";

const ENV = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(ENV)) for (const line of fs.readFileSync(ENV, "utf8").split("\n")) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
}

const SLUG = "custom-software-development";
const CAMPAIGN_NAME = "RDMI | Software Dev | India";
const THEMES = [
  { name: "SoftDev | Company", h1: "software development company",
    keywords: ["software development company","software development services","software development agency","software development firms","software development company in india"] },
  { name: "SoftDev | Custom", h1: "custom software development company",
    keywords: ["custom software development","custom software development company","custom software development services","custom software development agency","custom software development companies","bespoke software development services"] },
  { name: "SoftDev | Hire-Outsource", h1: "hire software developers",
    keywords: ["hire software developers","hire dedicated developers","software development outsourcing","offshore software development company","offshore software development"] },
  { name: "SoftDev | Enterprise-SaaS", h1: "enterprise software development company",
    keywords: ["enterprise software development company","saas development company","saas product development","erp software development company","crm development company"] },
];

const push = process.argv.includes("--push");
const group = keywordGroups.find((g) => g.slug === SLUG);
if (!group) throw new Error(`No keyword group "${SLUG}"`);
const route = buildRouteMap().get(SLUG);
if (!route) throw new Error(`No route for "${SLUG}"`);

// Reuse the SKAG builder for copy (keyword-variant H1 + intent + benefits, ?kw= URL),
// then override the ad-group name + widen to the theme's full keyword list.
const campaigns: Campaign[] = THEMES.map((t) => {
  const base = buildSkagCampaign(group, t.h1, route);
  return {
    ...base,
    adGroup: t.name,
    finalUrl: `${base.finalUrl.split("?")[0]}?kw=${encodeURIComponent(t.h1)}`, // keyword-injected H1
    keywords: t.keywords.flatMap((kw) => MATCH_TYPES.map((matchType) => ({ text: kw, matchType }))),
  };
});

console.log(`\n${CAMPAIGN_NAME}  ·  one page → ${campaigns[0].finalUrl.split("?")[0]}\n${"─".repeat(60)}`);
let total = 0;
for (const c of campaigns) {
  total += c.keywords.length / 2;
  console.log(`  ${c.adGroup}  (${c.keywords.length / 2} kw, ${c.headlines.length}H/${c.descriptions.length}D)`);
  console.log(`    → ${c.finalUrl}`);
  console.log(`    kw: ${[...new Set(c.keywords.map((k) => k.text))].join(", ")}`);
}
console.log("─".repeat(60));
console.log(`  ${campaigns.length} ad groups · ${total} keywords · 1 landing page`);

if (push) {
  if (!apiCredentialsPresent()) { console.error("\n✘ Ads API creds missing."); process.exit(1); }
  console.log("\nPushing to Google Ads (PAUSED)…");
  await pushToGoogleAds(campaigns, { campaignName: CAMPAIGN_NAME });
}
