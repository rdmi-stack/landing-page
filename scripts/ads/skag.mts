/**
 * Build (and optionally push) a SKAG campaign for a theme. One single-keyword
 * ad group per keyword; each ad pins keyword variants to Headline 1 and points
 * to that keyword's dedicated, intent-matched landing page (high Quality Score).
 *
 *   node scripts/ads/skag.mts <theme>            # preview + write CSV
 *   node scripts/ads/skag.mts <theme> -- --push  # create the campaign (PAUSED) via API
 *
 * <theme> ∈ web-dev | software-dev | app-dev  (default: web-dev)
 */

import fs from "node:fs";
import path from "node:path";
import { type Campaign } from "./build-campaign.mts";
import { SKAG_THEMES, buildSkagCampaignsFor } from "./skag-keywords.mts";
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

const push = process.argv.includes("--push");
const themeKey = process.argv.slice(2).find((a) => !a.startsWith("--")) ?? "web-dev";
const theme = SKAG_THEMES[themeKey];
if (!theme) {
  console.error(`Unknown theme "${themeKey}". Options: ${Object.keys(SKAG_THEMES).join(", ")}`);
  process.exit(1);
}
const CAMPAIGN_NAME = theme.campaignName;
const campaigns: Campaign[] = buildSkagCampaignsFor(themeKey);

console.log(`\nSKAG campaign [${themeKey}] — ${CAMPAIGN_NAME}\n${"─".repeat(60)}`);
for (const c of campaigns) {
  console.log(`  ${c.adGroup}`);
  console.log(`    pinned H1: [${(c.pinnedHeadlines ?? []).join(", ")}]  ·  ${c.keywords.length} kw  ·  ${c.headlines.length} H / ${c.descriptions.length} D`);
  console.log(`    → ${c.finalUrl}`);
}
console.log("─".repeat(60));

// CSV preview (Editor import). >1 account loaded → needs an "Account" column.
const OUT = path.resolve(process.cwd(), "docs/ads");
fs.mkdirSync(OUT, { recursive: true });
const ACCOUNT = process.env.GOOGLE_ADS_CUSTOMER_ID?.replace(/-/g, "") || "9561365956";
fs.writeFileSync(path.join(OUT, `skag-${themeKey}.csv`), toEditorCsv(campaigns, CAMPAIGN_NAME, ACCOUNT));
console.log(`  ${campaigns.length} ad groups → docs/ads/skag-${themeKey}.csv`);

if (push) {
  if (!apiCredentialsPresent()) {
    console.error("\n✘ --push requested but Google Ads API credentials are missing in .env.local.");
    process.exit(1);
  }
  console.log("\nPushing to Google Ads (PAUSED)…");
  await pushToGoogleAds(campaigns, { campaignName: CAMPAIGN_NAME });
}
