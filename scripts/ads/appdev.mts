/**
 * Single-page Mobile App Development campaign: ONE landing page
 * (/mobile-app-development-company) targeted by ~20 growing, high-intent
 * keywords in 4 themed ad groups, each → the page with keyword-injected H1.
 *
 *   node scripts/ads/appdev.mts            # preview
 *   node scripts/ads/appdev.mts -- --push  # create the campaign (PAUSED)
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

const SLUG = "mobile-app-development";
const CAMPAIGN_NAME = "RDMI | App Dev | India";
const THEMES = [
  { name: "AppDev | Company", h1: "mobile app development company",
    keywords: ["mobile app development company","app development company","mobile app developer","mobile development services","mobile app development companies"] },
  { name: "AppDev | Custom-iOS-Android", h1: "custom mobile app development company",
    keywords: ["custom mobile app development company","ios app development company","android app development company","ios apps development","android app development services"] },
  { name: "AppDev | Flutter-CrossPlatform", h1: "flutter app development company",
    keywords: ["flutter app development company","flutter mobile app development","react native app development company","cross platform app development company","hybrid app development company"] },
  { name: "AppDev | Ecommerce-Fintech", h1: "ecommerce app development company",
    keywords: ["ecommerce app development company","build ecommerce app","fintech app development company","financial app development company","on demand app development company"] },
];

const push = process.argv.includes("--push");
const group = keywordGroups.find((g) => g.slug === SLUG);
if (!group) throw new Error(`No keyword group "${SLUG}"`);
const route = buildRouteMap().get(SLUG);
if (!route) throw new Error(`No route for "${SLUG}"`);

const campaigns: Campaign[] = THEMES.map((t) => {
  const base = buildSkagCampaign(group, t.h1, route);
  return {
    ...base,
    adGroup: t.name,
    finalUrl: `${base.finalUrl.split("?")[0]}?kw=${encodeURIComponent(t.h1)}`,
    keywords: t.keywords.flatMap((kw) => MATCH_TYPES.map((matchType) => ({ text: kw, matchType }))),
  };
});

console.log(`\n${CAMPAIGN_NAME}  ·  one page → ${campaigns[0].finalUrl.split("?")[0]}\n${"─".repeat(60)}`);
let total = 0;
for (const c of campaigns) {
  total += c.keywords.length / 2;
  console.log(`  ${c.adGroup}  (${c.keywords.length / 2} kw)`);
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
