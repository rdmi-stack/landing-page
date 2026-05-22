/**
 * Build (and optionally push) a SKAG campaign for the web-dev landing page.
 * One single-keyword ad group per keyword; each ad pins the keyword to
 * Headline 1 and points to /web-development-company?kw=<keyword> so the
 * landing-page H1 mirrors the search term (high Quality Score).
 *
 *   node scripts/ads/skag.mts            # preview + write CSV
 *   node scripts/ads/skag.mts -- --push  # create the SKAG campaign (PAUSED) via API
 */

import fs from "node:fs";
import path from "node:path";
import { keywordGroups } from "../../src/data/keyword-groups.ts";
import { buildRouteMap } from "./route-map.mts";
import { buildSkagCampaign, type Campaign } from "./build-campaign.mts";
import { toEditorCsv } from "./to-editor-csv.mts";
import { apiCredentialsPresent, pushToGoogleAds } from "./to-ads-api.mts";

// Load .env.local for --push.
const ENV = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(ENV)) {
  for (const line of fs.readFileSync(ENV, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

const SLUG = "web-development-company";
const CAMPAIGN_NAME = "RDMI | Web Dev SKAG | India";
const KEYWORDS = [
  "web development company",
  "website development company",
  "custom website development",
  "web development services",
  "web development agency",
  "ecommerce website development company",
];

const push = process.argv.includes("--push");
const group = keywordGroups.find((g) => g.slug === SLUG);
if (!group) throw new Error(`No keyword group "${SLUG}"`);
const routePath = buildRouteMap().get(SLUG);
if (!routePath) throw new Error(`No route for "${SLUG}"`);

const campaigns: Campaign[] = KEYWORDS.map((kw) => buildSkagCampaign(group, kw, routePath));

console.log(`\nSKAG campaign — ${CAMPAIGN_NAME}\n${"─".repeat(60)}`);
for (const c of campaigns) {
  console.log(`  ${c.adGroup}`);
  console.log(`    pinned H1: "${c.pinnedH1}"  ·  ${c.keywords.length} kw  ·  ${c.headlines.length} H / ${c.descriptions.length} D`);
  console.log(`    → ${c.finalUrl}`);
}
console.log("─".repeat(60));

// CSV preview
const OUT = path.resolve(process.cwd(), "docs/ads");
fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, "skag-web-development.csv"), toEditorCsv(campaigns));
console.log(`  ${campaigns.length} ad groups → docs/ads/skag-web-development.csv`);

if (push) {
  if (!apiCredentialsPresent()) {
    console.error("\n✘ --push requested but Google Ads API credentials are missing in .env.local.");
    process.exit(1);
  }
  console.log("\nPushing to Google Ads (PAUSED)…");
  await pushToGoogleAds(campaigns, { campaignName: CAMPAIGN_NAME });
}
