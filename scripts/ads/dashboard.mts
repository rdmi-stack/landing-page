/**
 * Generate a single-view HTML dashboard of every campaign:
 *   - keywords per ad group (with match type)
 *   - RSA headlines (pinned highlighted) + descriptions
 *   - final URL + LP H1 it produces via ?kw=
 *   - extensions (sitelinks, callouts, structured snippets)
 *   - campaign status, budget, bidding strategy
 *
 *   node scripts/ads/dashboard.mts            # writes docs/ads/dashboard.html
 *   node scripts/ads/dashboard.mts -- --open  # writes + opens in default browser
 */
import { GoogleAdsApi } from "google-ads-api";
import fs from "node:fs"; import path from "node:path"; import { execSync } from "node:child_process";

const envPath = path.resolve(process.cwd(), ".env.local");
for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
}

const client = new GoogleAdsApi({ client_id: process.env.GOOGLE_ADS_CLIENT_ID!, client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET!, developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN! });
const cid = process.env.GOOGLE_ADS_CUSTOMER_ID!.replace(/-/g, "");
const customer = client.Customer({ customer_id: cid, login_customer_id: process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID!.replace(/-/g, ""), refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN! });

const MATCH = { 2: "EXACT", 3: "PHRASE", 4: "BROAD", 1: "UNKNOWN", 0: "?" } as Record<number, string>;
const STATUS = { 2: "ENABLED", 3: "PAUSED", 4: "REMOVED", 1: "UNKNOWN" } as Record<number, string>;
const BID = { 0: "?", 1: "?", 8: "MANUAL_CPC", 9: "MAX CLICKS", 10: "MAX CONV", 11: "TARGET_CPA", 12: "MAX CONV VALUE", 13: "TARGET_ROAS" } as Record<number, string>;
const ASSET_FIELD = { 0: "?", 1: "?", 2: "HEADLINE_1", 3: "HEADLINE_2", 4: "HEADLINE_3", 8: "SITELINK", 9: "CALLOUT", 10: "STRUCTURED_SNIPPET" } as Record<number, string>;

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" } as any)[c]);

type Asset = { kind: "sitelink" | "callout" | "snippet"; text: string; sub?: string };

console.log("Pulling live state (Software Dev + App Dev only)...");

const SCOPE = `campaign.name LIKE '%Dev | India%'`;

// campaigns
const campaigns = await customer.query(`
  SELECT campaign.id, campaign.name, campaign.status,
         campaign.bidding_strategy_type, campaign_budget.amount_micros
  FROM campaign
  WHERE campaign.status != 'REMOVED' AND ${SCOPE}
  ORDER BY campaign.name
`);

// ad groups
const adGroupRows = await customer.query(`
  SELECT campaign.id, campaign.name, ad_group.id, ad_group.name, ad_group.status
  FROM ad_group
  WHERE campaign.status != 'REMOVED' AND ad_group.status != 'REMOVED' AND ${SCOPE}
  ORDER BY ad_group.name
`);

// keywords
const kwRows = await customer.query(`
  SELECT campaign.name, ad_group.id, ad_group_criterion.keyword.text, ad_group_criterion.keyword.match_type,
         ad_group_criterion.status
  FROM ad_group_criterion
  WHERE campaign.status != 'REMOVED' AND ad_group.status != 'REMOVED'
    AND ${SCOPE}
    AND ad_group_criterion.type='KEYWORD'
    AND ad_group_criterion.negative=false
    AND ad_group_criterion.status != 'REMOVED'
`);

// RSAs
const adRows = await customer.query(`
  SELECT campaign.name, ad_group.id, ad_group_ad.ad.final_urls,
         ad_group_ad.ad.responsive_search_ad.headlines,
         ad_group_ad.ad.responsive_search_ad.descriptions,
         ad_group_ad.status, ad_group_ad.policy_summary.approval_status
  FROM ad_group_ad
  WHERE campaign.status != 'REMOVED' AND ad_group.status != 'REMOVED'
    AND ${SCOPE}
    AND ad_group_ad.status != 'REMOVED'
`);

// extensions via campaign_asset (sitelink, callout, structured snippet)
const assetRows = await customer.query(`
  SELECT campaign.id, campaign.name, campaign.status, campaign_asset.field_type, campaign_asset.asset,
         asset.sitelink_asset.link_text, asset.sitelink_asset.description1,
         asset.callout_asset.callout_text,
         asset.structured_snippet_asset.header, asset.structured_snippet_asset.values
  FROM campaign_asset
  WHERE campaign.status != 'REMOVED' AND campaign_asset.status != 'REMOVED' AND ${SCOPE}
`);

// shared negative keyword list count
const negCount = await customer.query(`
  SELECT shared_set.name, shared_set.member_count
  FROM shared_set
  WHERE shared_set.type='NEGATIVE_KEYWORDS' AND shared_set.status='ENABLED'
`);

// negative criteria attached per campaign
const negShare = await customer.query(`
  SELECT campaign.id, campaign.name, campaign.status, shared_set.name, shared_set.member_count
  FROM campaign_shared_set
  WHERE campaign.status != 'REMOVED' AND campaign_shared_set.status = 'ENABLED' AND ${SCOPE}
`);

// shape it
type AG = { id: string; name: string; status: string; kws: { text: string; mt: string }[]; rsas: { headlines: { text: string; pin: string | null }[]; descriptions: string[]; finalUrl: string; status: string; approval: string }[] };
type Campaign = { id: string; name: string; status: string; budget: number; bidding: string; agroups: AG[]; assets: Asset[]; negSets: { name: string; count: number }[] };

const cmap = new Map<string, Campaign>();
for (const c of campaigns) {
  const id = String(c.campaign!.id!);
  cmap.set(id, {
    id, name: c.campaign!.name!,
    status: STATUS[c.campaign!.status as number] ?? String(c.campaign!.status),
    budget: c.campaign_budget?.amount_micros ? Number(c.campaign_budget.amount_micros) / 1_000_000 : 0,
    bidding: BID[c.campaign!.bidding_strategy_type as number] ?? String(c.campaign!.bidding_strategy_type),
    agroups: [], assets: [], negSets: [],
  });
}

const agMap = new Map<string, AG>();
for (const r of adGroupRows) {
  const ag: AG = { id: String(r.ad_group!.id!), name: r.ad_group!.name!, status: STATUS[r.ad_group!.status as number] ?? "?", kws: [], rsas: [] };
  agMap.set(ag.id, ag);
  const c = cmap.get(String(r.campaign!.id!));
  if (c) c.agroups.push(ag);
}
for (const r of kwRows) {
  const ag = agMap.get(String(r.ad_group!.id!));
  if (!ag) continue;
  ag.kws.push({ text: r.ad_group_criterion!.keyword!.text!, mt: MATCH[r.ad_group_criterion!.keyword!.match_type as number] ?? "?" });
}
for (const r of adRows) {
  const ag = agMap.get(String(r.ad_group!.id!));
  if (!ag) continue;
  const rsa = r.ad_group_ad!.ad!.responsive_search_ad!;
  ag.rsas.push({
    headlines: rsa.headlines!.map((h: any) => ({ text: h.text, pin: h.pinned_field ? ASSET_FIELD[h.pinned_field] ?? String(h.pinned_field) : null })),
    descriptions: rsa.descriptions!.map((d: any) => d.text),
    finalUrl: r.ad_group_ad!.ad!.final_urls![0],
    status: STATUS[r.ad_group_ad!.status as number] ?? "?",
    approval: String(r.ad_group_ad!.policy_summary?.approval_status ?? "?"),
  });
}
for (const r of assetRows) {
  const c = cmap.get(String(r.campaign!.id!));
  if (!c) continue;
  const ft = r.campaign_asset!.field_type as number;
  const a = (r as any).asset;
  if (ft === 8 && a?.sitelink_asset) c.assets.push({ kind: "sitelink", text: a.sitelink_asset.link_text!, sub: a.sitelink_asset.description1 });
  else if (ft === 9 && a?.callout_asset) c.assets.push({ kind: "callout", text: a.callout_asset.callout_text! });
  else if (ft === 10 && a?.structured_snippet_asset) c.assets.push({ kind: "snippet", text: a.structured_snippet_asset.header!, sub: (a.structured_snippet_asset.values ?? []).join(", ") });
}
for (const r of negShare) {
  const c = cmap.get(String(r.campaign!.id!));
  if (c) c.negSets.push({ name: (r as any).shared_set!.name!, count: Number((r as any).shared_set!.member_count!) });
}

// sort
for (const c of cmap.values()) c.agroups.sort((a, b) => a.name.localeCompare(b.name));
const sortedCampaigns = [...cmap.values()].sort((a, b) => {
  if (a.status !== b.status) return a.status === "ENABLED" ? -1 : 1;
  return a.name.localeCompare(b.name);
});

// LP H1 preview from ?kw= (matches src/app/.../page.tsx sanitizeKeyword)
function lpH1(finalUrl: string): string | null {
  try {
    const u = new URL(finalUrl);
    const kw = u.searchParams.get("kw");
    if (!kw) return null;
    const cleaned = kw.replace(/[^A-Za-z0-9 &-]/g, " ").replace(/\s+/g, " ").trim().slice(0, 60);
    if (cleaned.length < 3) return null;
    const titled = cleaned.split(" ").map((w) => w ? w[0].toUpperCase() + w.slice(1).toLowerCase() : w).join(" ");
    const path = u.pathname;
    const persona = path.includes("mobile-app") ? "App Developer"
      : path.includes("custom-software") ? "Software Developer"
      : "Developer";
    return `${titled} in India — Talk to a Senior ${persona} in 2 Hours`;
  } catch { return null; }
}

// align check: does the keyword theme show up in the pinned headlines or descriptions?
function alignmentChip(ag: AG): { ok: boolean; reason: string } {
  if (!ag.rsas.length) return { ok: false, reason: "no RSA" };
  const text = (ag.rsas[0].headlines.filter((h) => h.pin).map((h) => h.text).join(" ") + " " + ag.rsas[0].descriptions.join(" ")).toLowerCase();
  const head = (ag.kws[0]?.text ?? "").toLowerCase().split(" ").filter((t) => t.length > 3 && t !== "company" && t !== "services");
  const hits = head.filter((tok) => text.includes(tok)).length;
  if (hits >= Math.min(2, head.length)) return { ok: true, reason: `${hits}/${head.length} theme tokens in pinned+desc` };
  return { ok: false, reason: `only ${hits}/${head.length} theme tokens in pinned+desc` };
}

const CSS = `
  *{box-sizing:border-box}body{font:14px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;background:#0f172a;color:#e2e8f0;margin:0;padding:24px}
  h1{margin:0 0 4px;font-size:22px;color:#fff}.sub{color:#94a3b8;font-size:13px;margin-bottom:24px}
  .grid{display:grid;grid-template-columns:1fr;gap:24px}
  .camp{background:#1e293b;border:1px solid #334155;border-radius:12px;overflow:hidden}
  .camp-h{padding:16px 20px;border-bottom:1px solid #334155;display:flex;align-items:center;gap:12px;flex-wrap:wrap}
  .camp-h h2{margin:0;font-size:16px;color:#fff;flex:1}
  .badge{display:inline-flex;align-items:center;padding:3px 8px;border-radius:6px;font-size:11px;font-weight:600;letter-spacing:.3px}
  .b-enabled{background:#064e3b;color:#6ee7b7}.b-paused{background:#451a03;color:#fbbf24}
  .b-info{background:#1e3a8a;color:#93c5fd}.b-warn{background:#7f1d1d;color:#fca5a5}.b-ok{background:#064e3b;color:#6ee7b7}
  .ag{padding:16px 20px;border-top:1px solid #334155}
  .ag-h{display:flex;align-items:center;gap:8px;margin-bottom:12px;flex-wrap:wrap}
  .ag-h h3{margin:0;font-size:14px;color:#fff}
  .ag-grid{display:grid;grid-template-columns:1fr 1.5fr;gap:16px}
  @media(max-width:900px){.ag-grid{grid-template-columns:1fr}}
  .panel{background:#0f172a;border:1px solid #334155;border-radius:8px;padding:12px}
  .panel h4{margin:0 0 8px;font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.5px;text-transform:uppercase}
  .kw{display:flex;align-items:center;gap:8px;padding:4px 0;font-size:13px;color:#cbd5e1}
  .kw .mt{padding:1px 6px;border-radius:4px;font-size:10px;font-weight:600;letter-spacing:.3px}
  .mt-EXACT{background:#1e3a8a;color:#93c5fd}.mt-PHRASE{background:#581c87;color:#d8b4fe}.mt-BROAD{background:#7f1d1d;color:#fca5a5}
  .h-list{font-size:13px;line-height:1.6}.h-list li{list-style:none;padding:2px 0;color:#cbd5e1}
  .h-pin{color:#fef3c7;font-weight:600}.pin-tag{display:inline-block;padding:1px 5px;border-radius:3px;background:#451a03;color:#fbbf24;font-size:9px;font-weight:700;margin-right:6px;letter-spacing:.3px}
  .d-list li{font-size:12px;color:#94a3b8;padding:3px 0;border-bottom:1px dashed #334155}
  .d-list li:last-child{border:none}
  .url{font-family:ui-monospace,SF Mono,monospace;font-size:11px;color:#7dd3fc;word-break:break-all;padding:6px 8px;background:#0c4a6e1a;border-radius:4px;margin-top:8px}
  .lp{font-size:13px;color:#a7f3d0;padding:6px 8px;background:#064e3b40;border-radius:4px;margin-top:4px;font-style:italic}
  .assets{display:flex;flex-wrap:wrap;gap:6px;padding:12px 20px;border-top:1px solid #334155;background:#0f172a40}
  .asset-chip{padding:4px 10px;background:#1e293b;border:1px solid #334155;border-radius:14px;font-size:11px;color:#cbd5e1}
  .asset-chip .k{color:#64748b;font-weight:600;margin-right:4px}
  .asset-chip .sl{color:#7dd3fc}.asset-chip .co{color:#fbbf24}.asset-chip .sn{color:#d8b4fe}
  .meta-row{display:flex;flex-wrap:wrap;gap:6px;padding:8px 20px;background:#0f172a40;font-size:11px;color:#94a3b8;border-top:1px solid #334155}
  .meta-row span{display:inline-flex;align-items:center;gap:4px}
  .empty{color:#64748b;font-style:italic;font-size:12px;text-align:center;padding:8px}
  .stamp{color:#64748b;font-size:11px;margin-top:24px;text-align:center}
`;

const isoIST = new Date(Date.now() + 5.5 * 3600_000).toISOString().replace(/\.\d+Z$/, "+05:30");

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>RDMI Ads Dashboard</title><style>${CSS}</style></head><body>
<h1>RDMI Google Ads — Alignment Dashboard</h1>
<div class="sub">Customer ${esc(cid)} · ${sortedCampaigns.length} campaigns · ${[...agMap.values()].length} ad groups · pulled ${esc(isoIST)}</div>
<div class="grid">
${sortedCampaigns.map((c) => {
  const totalKw = c.agroups.reduce((s, a) => s + a.kws.length, 0);
  const totalRsa = c.agroups.reduce((s, a) => s + a.rsas.length, 0);
  return `
  <div class="camp">
    <div class="camp-h">
      <h2>${esc(c.name)}</h2>
      <span class="badge ${c.status === "ENABLED" ? "b-enabled" : "b-paused"}">${esc(c.status)}</span>
      <span class="badge b-info">${esc(c.bidding)}</span>
      <span class="badge b-info">₹${c.budget.toFixed(0)}/day</span>
    </div>
    <div class="meta-row">
      <span><strong>${c.agroups.length}</strong> ad groups</span>
      <span>·</span><span><strong>${totalKw}</strong> keywords</span>
      <span>·</span><span><strong>${totalRsa}</strong> RSAs</span>
      <span>·</span><span><strong>${c.assets.filter((a) => a.kind === "sitelink").length}</strong> sitelinks</span>
      <span>·</span><span><strong>${c.assets.filter((a) => a.kind === "callout").length}</strong> callouts</span>
      <span>·</span><span><strong>${c.assets.filter((a) => a.kind === "snippet").length}</strong> snippets</span>
      ${c.negSets.length ? c.negSets.map((n) => `<span>·</span><span><strong>${n.count}</strong> negatives (${esc(n.name)})</span>`).join("") : ""}
    </div>
    ${c.agroups.map((ag) => {
      const align = alignmentChip(ag);
      const rsa = ag.rsas[0];
      const lpHead = rsa ? lpH1(rsa.finalUrl) : null;
      return `
      <div class="ag">
        <div class="ag-h">
          <h3>${esc(ag.name)}</h3>
          <span class="badge ${ag.status === "ENABLED" ? "b-enabled" : "b-paused"}">${esc(ag.status)}</span>
          <span class="badge ${align.ok ? "b-ok" : "b-warn"}">${align.ok ? "✓" : "⚠"} ${esc(align.reason)}</span>
          ${rsa ? `<span class="badge b-info">${esc(String(rsa.approval))}</span>` : ""}
        </div>
        <div class="ag-grid">
          <div class="panel">
            <h4>Keywords (${ag.kws.length})</h4>
            ${ag.kws.length ? ag.kws.map((k) => `<div class="kw"><span class="mt mt-${k.mt}">${k.mt}</span>${esc(k.text)}</div>`).join("") : '<div class="empty">no keywords</div>'}
          </div>
          <div class="panel">
            <h4>RSA — Headlines (${rsa?.headlines.length ?? 0}) · pinned highlighted</h4>
            ${rsa ? `<ul class="h-list" style="margin:0;padding:0">${rsa.headlines.map((h) => h.pin ? `<li class="h-pin"><span class="pin-tag">${esc(h.pin.replace("HEADLINE_", "H"))}</span>${esc(h.text)}</li>` : `<li>${esc(h.text)}</li>`).join("")}</ul>` : '<div class="empty">no RSA</div>'}
            ${rsa ? `<h4 style="margin-top:14px">Descriptions (${rsa.descriptions.length})</h4><ul class="d-list" style="margin:0;padding:0">${rsa.descriptions.map((d) => `<li>${esc(d)}</li>`).join("")}</ul>` : ""}
            ${rsa ? `<div class="url">→ ${esc(rsa.finalUrl)}</div>` : ""}
            ${lpHead ? `<div class="lp">LP H1: "${esc(lpHead)}"</div>` : ""}
          </div>
        </div>
      </div>`;
    }).join("")}
    ${c.assets.length ? `<div class="assets">
      ${c.assets.map((a) => `<span class="asset-chip"><span class="k ${a.kind === "sitelink" ? "sl" : a.kind === "callout" ? "co" : "sn"}">${a.kind.toUpperCase()}</span>${esc(a.text)}${a.sub ? ` <span style="color:#64748b">— ${esc(a.sub)}</span>` : ""}</span>`).join("")}
    </div>` : ""}
  </div>`;
}).join("")}
</div>
<div class="stamp">Run again any time: <code>node scripts/ads/dashboard.mts</code></div>
</body></html>`;

const outPath = path.resolve(process.cwd(), "docs/ads/dashboard.html");
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, html);
console.log(`\n✓ Dashboard written → ${outPath}`);
console.log(`  ${sortedCampaigns.length} campaigns · ${[...agMap.values()].length} ad groups · ${[...agMap.values()].reduce((s, a) => s + a.kws.length, 0)} keywords`);
if (process.argv.includes("--open")) execSync(`open "${outPath}"`);
else console.log(`  open with: open ${path.relative(process.cwd(), outPath)}`);
