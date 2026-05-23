/**
 * Adapter: Campaign[] → Google Ads Editor import CSV.
 * Header matches the proven hand-built import. One campaign-settings row, then
 * per ad group: keyword rows (phrase + exact) followed by one RSA row.
 * Negatives + extensions are intentionally NOT in the CSV (Editor import is
 * unreliable for those) — the companion .md lists them as manual steps.
 */

import {
  CAMPAIGN_NAME, CAMPAIGN_TYPE, CAMPAIGN_STATUS, DAILY_BUDGET, BUDGET_TYPE,
  BID_STRATEGY, NETWORKS, LANGUAGES,
} from "./config.mts";
import type { Campaign } from "./build-campaign.mts";

const HEADER = [
  "Campaign", "Campaign Type", "Status", "Budget", "Budget Type", "Bid Strategy Type",
  "Networks", "Languages", "Ad Group", "Max CPC", "Keyword", "Match Type", "Ad Type",
  ...Array.from({ length: 15 }, (_, i) => `Headline ${i + 1}`),
  ...Array.from({ length: 4 }, (_, i) => `Description ${i + 1}`),
  "Path 1", "Path 2", "Final URL",
];

const cell = (v: string | number = "") => {
  const s = String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

const TOTAL_COLS = HEADER.length;
function row(map: Record<string, string | number>): string {
  return HEADER.map((h) => cell(map[h] ?? "")).join(",");
}
void TOTAL_COLS;

/** Render one or more campaigns (ad groups) into a single Editor-importable CSV. */
export function toEditorCsv(campaigns: Campaign[], campaignName: string = CAMPAIGN_NAME): string {
  const campaignCols = {
    Campaign: campaignName,
    "Campaign Type": CAMPAIGN_TYPE,
    Status: CAMPAIGN_STATUS,
    Budget: DAILY_BUDGET,
    "Budget Type": BUDGET_TYPE,
    "Bid Strategy Type": BID_STRATEGY,
    Networks: NETWORKS,
    Languages: LANGUAGES,
  };
  const lines = [HEADER.join(",")];
  // Single campaign-settings row.
  lines.push(row({ ...campaignCols }));
  for (const c of campaigns) {
    for (const kw of c.keywords) {
      lines.push(row({ ...campaignCols, "Ad Group": c.adGroup, Keyword: kw.text, "Match Type": kw.matchType }));
    }
    const rsa: Record<string, string | number> = {
      ...campaignCols,
      "Ad Group": c.adGroup,
      "Ad Type": "Responsive search ad",
      "Path 1": c.path1,
      "Path 2": c.path2,
      "Final URL": c.finalUrl,
    };
    c.headlines.forEach((h, i) => (rsa[`Headline ${i + 1}`] = h));
    c.descriptions.forEach((d, i) => (rsa[`Description ${i + 1}`] = d));
    lines.push(row(rsa));
  }
  return lines.join("\n") + "\n";
}
