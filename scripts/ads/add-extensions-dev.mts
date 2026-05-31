/**
 * Add theme-aware campaign assets (sitelinks, callouts, structured snippets) to
 * the Software Dev | India and App Dev | India campaigns. Unlike add-extensions.mts
 * (one global web-dev set), this carries a distinct, on-theme set per campaign so
 * the extensions match the keyword/LP theme. Idempotent: skips a field type already
 * linked to the campaign.
 *
 * Char limits enforced: sitelink text <=25, sitelink desc <=35, callout <=25,
 * snippet value <=25. Sitelink paths must resolve on DOMAIN (ai.rdmi.in).
 *
 *   node scripts/ads/add-extensions-dev.mts
 */
import { GoogleAdsApi, enums } from "google-ads-api";
import fs from "node:fs"; import path from "node:path";
import { DOMAIN } from "./config.mts";

const envPath = path.resolve(process.cwd(), ".env.local");
for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
}

const client = new GoogleAdsApi({ client_id: process.env.GOOGLE_ADS_CLIENT_ID!, client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET!, developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN! });
const cid = process.env.GOOGLE_ADS_CUSTOMER_ID!.replace(/-/g, "");
const customer = client.Customer({ customer_id: cid, login_customer_id: process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID!.replace(/-/g, ""), refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN! });

type Sitelink = { text: string; path: string; desc1: string; desc2: string };
type Themed = {
  campaignNameLike: string;
  sitelinks: Sitelink[];
  callouts: string[];
  snippet: { header: string; values: string[] };
};

const THEMES: Themed[] = [
  {
    campaignNameLike: "Software Dev | India",
    sitelinks: [
      { text: "Get a Free Quote", path: "/get-quote",     desc1: "Senior engineer replies in 2 hrs", desc2: "Free 48-hour build plan" },
      { text: "How It Works",     path: "/how-it-works",   desc1: "Discovery to launch in weeks",     desc2: "Clear scope, senior delivery" },
      { text: "Our Services",     path: "/services",       desc1: "Custom software, SaaS, ERP, CRM",   desc2: "Senior engineers, no juniors" },
      { text: "50+ Products",     path: "/products",       desc1: "SaaS, ERP, CRM, AI software",       desc2: "Built for growing businesses" },
      { text: "Contact Us",       path: "/contact",        desc1: "WhatsApp, call, or email",          desc2: "Based in India, ships global" },
    ],
    callouts: ["Source Code Ownership", "Senior India Engineers", "Free 48-Hr Build Plan", "NDA Before Call", "No Lock-In", "Money-Back Deadline"],
    snippet: { header: "Services", values: ["Custom Software", "SaaS Platforms", "ERP & CRM", "API Integration", "AI Software", "Web Apps"] },
  },
  {
    campaignNameLike: "App Dev | India",
    sitelinks: [
      { text: "Get a Free Quote", path: "/get-quote",     desc1: "Senior app dev replies in 2 hrs",   desc2: "Free 48-hour app build plan" },
      { text: "How It Works",     path: "/how-it-works",   desc1: "Discovery to App Store in weeks",    desc2: "Clear scope, senior delivery" },
      { text: "Our Services",     path: "/services",       desc1: "iOS, Android, Flutter, RN apps",     desc2: "Senior engineers, no juniors" },
      { text: "50+ Products",     path: "/products",       desc1: "Apps, SaaS, AI, e-commerce",         desc2: "Built for growing businesses" },
      { text: "Contact Us",       path: "/contact",        desc1: "WhatsApp, call, or email",           desc2: "Based in India, ships global" },
    ],
    callouts: ["Source Code Ownership", "Senior iOS + Android Devs", "Free 48-Hr App Plan", "App Store + Play Launch", "No Lock-In", "Money-Back Deadline"],
    snippet: { header: "Services", values: ["iOS Apps", "Android Apps", "Flutter Apps", "React Native", "E-Commerce Apps", "Fintech Apps"] },
  },
];

// sanity: enforce Google char limits before any API call
for (const t of THEMES) {
  for (const s of t.sitelinks) {
    if (s.text.length > 25) throw new Error(`sitelink text >25: "${s.text}" (${s.text.length})`);
    if (s.desc1.length > 35) throw new Error(`sitelink desc1 >35: "${s.desc1}" (${s.desc1.length})`);
    if (s.desc2.length > 35) throw new Error(`sitelink desc2 >35: "${s.desc2}" (${s.desc2.length})`);
  }
  for (const c of t.callouts) if (c.length > 25) throw new Error(`callout >25: "${c}" (${c.length})`);
  for (const v of t.snippet.values) if (v.length > 25) throw new Error(`snippet value >25: "${v}" (${v.length})`);
}

for (const t of THEMES) {
  const camps = await customer.query(`SELECT campaign.id, campaign.name FROM campaign WHERE campaign.name LIKE '%${t.campaignNameLike}%' AND campaign.status != 'REMOVED' ORDER BY campaign.id DESC`);
  if (!camps.length) { console.log(`· no campaign matching "${t.campaignNameLike}" — skipped`); continue; }
  const campaignId = camps[0].campaign!.id!;
  const campaign = `customers/${cid}/campaigns/${campaignId}`;
  console.log(`\n${camps[0].campaign!.name}  (id ${campaignId})`);

  // Reconcile: these campaigns were auto-linked with the generic web-dev set at
  // creation. Unlink the existing SITELINK/CALLOUT/STRUCTURED_SNIPPET links for
  // this campaign, then link the theme-aware set. (Unlinks the campaign_asset
  // only; the underlying asset objects remain, unused.)
  const linked = await customer.query(`SELECT campaign.id, campaign_asset.resource_name, campaign_asset.field_type FROM campaign_asset WHERE campaign.id = ${campaignId} AND campaign_asset.status != 'REMOVED'`);
  const existingByType = new Map<number, string[]>();
  for (const r of linked) {
    const ft = r.campaign_asset!.field_type as number;
    if (!existingByType.has(ft)) existingByType.set(ft, []);
    existingByType.get(ft)!.push(r.campaign_asset!.resource_name!);
  }

  async function linkAssets(assets: object[], fieldType: number, label: string) {
    const old = existingByType.get(fieldType) ?? [];
    if (old.length) { await customer.campaignAssets.remove(old); console.log(`  - unlinked ${old.length} old ${label}`); }
    const res = await customer.assets.create(assets);
    const links = res.results!.map((r) => ({ campaign, asset: r.resource_name!, field_type: fieldType }));
    await customer.campaignAssets.create(links);
    console.log(`  ✓ ${label}: ${links.length} linked`);
  }

  await linkAssets(
    t.sitelinks.map((s) => ({ final_urls: [`${DOMAIN}${s.path}`], sitelink_asset: { link_text: s.text, description1: s.desc1, description2: s.desc2 } })),
    enums.AssetFieldType.SITELINK, "Sitelinks",
  );
  await linkAssets(
    t.callouts.map((text) => ({ callout_asset: { callout_text: text } })),
    enums.AssetFieldType.CALLOUT, "Callouts",
  );
  await linkAssets(
    [{ structured_snippet_asset: { header: t.snippet.header, values: t.snippet.values } }],
    enums.AssetFieldType.STRUCTURED_SNIPPET, "Structured snippet",
  );
}
console.log("\n✓ Theme-aware extensions linked. Ad Strength recalculates within a few minutes.");
