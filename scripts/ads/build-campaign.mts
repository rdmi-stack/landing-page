/**
 * Core transform: a keyword-groups entry + its resolved route → a Campaign object.
 * Output is adapter-agnostic (CSV today, Google Ads API later both consume this).
 *
 * One landing page = one tightly-themed ad group with its target keywords
 * (phrase + exact) and one Responsive Search Ad whose copy is derived from the
 * page's own hero/meta/CTA content, with Google's asset length limits enforced.
 */

import type { KeywordGroup } from "../../src/data/keyword-groups.ts";
import { DOMAIN, MATCH_TYPES, LIMITS } from "./config.mts";
import { resolveUrl } from "./route-map.mts";

export interface Campaign {
  slug: string;
  adGroup: string;
  finalUrl: string;
  path1: string;
  path2: string;
  keywords: { text: string; matchType: string }[];
  headlines: string[]; // ≤15, each ≤30 chars, unique
  descriptions: string[]; // ≤4, each ≤90 chars, unique
  pinnedHeadlines?: string[]; // SKAG: keyword-variant headlines pinned to position 1 (keeps keyword in H1 AND Ad Strength up)
}

/**
 * Strip emoji/control chars, normalise non-ASCII typography to ASCII, collapse
 * whitespace, trim stray edge punctuation. Non-standard Unicode (en/em dashes,
 * smart quotes, ellipsis) in ad text trips Google's "evasive ad content"
 * detector, so ad assets must be ASCII-clean.
 */
function clean(s: string): string {
  return s
    .replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2190}-\u{21FF}\u{2B00}-\u{2BFF}]/gu, "")
    .replace(/[‒-―]/g, "-") // figure/en/em/horizontal dashes → hyphen
    .replace(/[‘’‚‛]/g, "'") // smart single quotes → '
    .replace(/[“”„‟]/g, '"') // smart double quotes → "
    .replace(/…/g, "...") // ellipsis → ...
    .replace(/\s+/g, " ")
    .replace(/^[\s\-•·|]+|[\s\-•·|]+$/g, "")
    .trim();
}

/** Words too weak to end an asset on — trimmed from a truncated tail. */
const DANGLING = new Set([
  "in", "on", "at", "to", "of", "for", "and", "or", "the", "a", "an", "with",
  "by", "is", "are", "that", "your", "you", "we", "&", "via", "from", "into",
]);

function trimDangling(s: string): string {
  const w = s.split(" ");
  while (w.length > 1 && DANGLING.has(w[w.length - 1].toLowerCase())) w.pop();
  return w.join(" ");
}

/** Fit text to max chars on a word boundary (never mid-word), no dangling words. */
function fit(s: string, max: number): string {
  const c = clean(s);
  if (c.length <= max) return c;
  let cut = c.slice(0, max + 1);
  const lastSpace = cut.lastIndexOf(" ");
  if (lastSpace > 0) cut = cut.slice(0, lastSpace);
  cut = cut.replace(/[\s\-–—•·,;:.]+$/g, "").trim();
  return trimDangling(cut);
}

/**
 * First clause of a longer line. Splits only on TRUE clause boundaries —
 * spaced em/en dash, parenthesis, sentence stop, or " · " — never on a plain
 * hyphen (would break "Free 48-Hour", "Money-back", "sub-1s", "AI-first").
 */
function leadClause(s: string): string {
  return clean(s).split(/\s[—–]\s|\s[-]\s|\(|\.\s|\s·\s|,\s/)[0].trim();
}

function dedupePush(arr: string[], val: string, max: number, limit: number) {
  const v = fit(val, max);
  if (!v) return;
  if (v.length < 3) return;
  if (arr.some((x) => x.toLowerCase() === v.toLowerCase())) return;
  if (arr.length < limit) arr.push(v);
}

const HEADLINE_FALLBACK = [
  "Talk to a Senior Developer", "WhatsApp Reply in 2 Hours", "Free 48-Hour Prototype",
  "Money-Back If We're Late", "Senior Indian Developers", "No Sales Rep, No Juniors",
  "Source Code Yours Day One", "200+ Projects Shipped", "Pays For Itself in 90 Days",
  "Built in Weeks, Not Months", "AI Built In From Day One", "NDA Before the First Call",
  "Talk Direct, No Lock-In", "Trusted by 200+ Founders", "Ships Results, Not Excuses",
];

const DESCRIPTION_FALLBACK = [
  "Talk direct to a senior Indian developer in 2 hours. No sales rep. Source code yours.",
  "Free 48-hour prototype before you pay. Money-back if we miss the deadline. 200+ shipped.",
  "Senior engineers only, no juniors. NDA before the first call. Walk away anytime.",
  "Built for Indian businesses. Loads fast, brings leads, pays for itself in 90 days.",
];

function buildHeadlines(d: KeywordGroup): string[] {
  const out: string[] = [];
  const M = LIMITS.headline;
  dedupePush(out, d.primaryKeyword, M, 15);
  dedupePush(out, "Talk to a Senior Developer", M, 15);
  dedupePush(out, "WhatsApp Reply in 2 Hours", M, 15);
  dedupePush(out, "Free 48-Hour Prototype", M, 15);
  dedupePush(out, "Money-Back If We're Late", M, 15);
  for (const tp of d.hero.trustPoints ?? []) dedupePush(out, leadClause(tp), M, 15);
  for (const s of d.stats ?? []) dedupePush(out, `${s.value} ${s.label}`, M, 15);
  dedupePush(out, d.ctaSection?.buttonText ?? "", M, 15);
  dedupePush(out, d.hero.cta1, M, 15);
  for (const fb of HEADLINE_FALLBACK) {
    if (out.length >= 15) break;
    dedupePush(out, fb, M, 15);
  }
  return out.slice(0, 15);
}

function sentences(s: string): string[] {
  return clean(s).split(/(?<=[.!?])\s+/).map((x) => x.trim()).filter(Boolean);
}

function buildDescriptions(d: KeywordGroup): string[] {
  const out: string[] = [];
  const M = LIMITS.description;
  for (const sent of sentences(d.meta?.description ?? "")) dedupePush(out, sent, M, 4);
  for (const sent of sentences(d.hero?.subtitle ?? "")) dedupePush(out, sent, M, 4);
  for (const sent of sentences(d.ctaSection?.subtitle ?? "")) dedupePush(out, sent, M, 4);
  const tp = d.hero.trustPoints ?? [];
  if (tp.length >= 2) dedupePush(out, `${leadClause(tp[0])}. ${leadClause(tp[1])}.`, M, 4);
  for (const fb of DESCRIPTION_FALLBACK) {
    if (out.length >= 4) break;
    dedupePush(out, fb, M, 4);
  }
  return out.slice(0, 4);
}

/** Display-path segment: letters/numbers/hyphen only, ≤15 chars, no mid-word cut. */
function pathSeg(s: string): string {
  const slug = s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  if (slug.length <= LIMITS.path) return slug;
  // Truncate at a hyphen boundary so we never leave a chopped word (e.g. "websi").
  const cut = slug.slice(0, LIMITS.path);
  const lastHyphen = cut.lastIndexOf("-");
  return (lastHyphen > 0 ? cut.slice(0, lastHyphen) : cut).replace(/-+$/g, "");
}

export function buildCampaign(d: KeywordGroup, routePath: string): Campaign {
  const keywords = (d.targetKeywords ?? []).flatMap((kw) =>
    MATCH_TYPES.map((matchType) => ({ text: clean(kw), matchType })),
  );
  return {
    slug: d.slug,
    adGroup: d.adGroupMatch || d.primaryKeyword,
    finalUrl: resolveUrl(DOMAIN, routePath),
    path1: pathSeg(d.slug.split("-").slice(0, 2).join("-")),
    path2: "india",
    keywords,
    headlines: buildHeadlines(d),
    descriptions: buildDescriptions(d),
  };
}

function titleCase(s: string): string {
  return clean(s)
    .split(" ")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1).toLowerCase() : w))
    .join(" ");
}

/**
 * Curated, complete (never truncated) benefit/CTA/trust headlines for the
 * web-dev SKAG ads. All ASCII, all ≤30 chars, all unique — diversity here is
 * what lifts Ad Strength out of "Poor".
 */
const SKAG_BENEFIT_HEADLINES = [
  "Talk to a Senior Developer", "WhatsApp Reply in 2 Hours", "Free 48-Hour Prototype",
  "Money-Back If We're Late", "Senior Indian Developers", "Source Code Yours Day One",
  "No Sales Reps, Just Devs", "Pay Only After Prototype", "Direct WhatsApp, No Lock-In",
  "200+ Projects Shipped", "Built in Weeks, Not Months", "NDA Before First Call",
];

/**
 * Keyword-rich headline variants (complete, never truncated). Gives Google the
 * search term in several headlines — the "more keywords in headlines" fix —
 * without pinning, so the ad keeps full combination flexibility.
 */
function keywordHeadlines(kwTitle: string, max: number): string[] {
  const out: string[] = [];
  const add = (s: string) => {
    if (s.length <= max && !out.some((x) => x.toLowerCase() === s.toLowerCase())) out.push(s);
  };
  if (kwTitle.length <= max) {
    add(kwTitle);
    add(`${kwTitle} India`);
    add(`Top ${kwTitle}`);
    add(`Best ${kwTitle}`);
  } else {
    add(fit(kwTitle, max)); // long keyword: at least the fitted form
  }
  return out;
}

/** Cross-theme descriptions used to fill after the intent-specific ones. */
function sharedDescriptions(): string[] {
  return [
    "Talk direct to a senior Indian developer in 2 hours. No sales rep. Source code yours.",
    "Free 48-hour prototype before you pay. Money-back if we miss the deadline. 200+ shipped.",
    "Senior engineers only, no juniors. NDA before the first call. Walk away anytime.",
  ];
}

/**
 * Intent-specific ad copy per dedicated landing-page slug. Each ad group's copy
 * matches its keyword's intent AND its dedicated page's hero — tightening ad↔
 * keyword↔page relevance (Quality Score) and lifting lead quality. All entries
 * are complete phrases, ASCII-clean and within length limits.
 */
const INTENT_COPY: Record<string, { headlines: string[]; descriptions: string[] }> = {
  "web-development-company": {
    headlines: ["Websites Built to Convert", "Not a Brochure, a Lead Engine", "Ranks, Loads Fast, Converts"],
    descriptions: ["A web development company that builds sites to win enquiries, not just look pretty."],
  },
  "website-development-company": {
    headlines: ["Business Sites That Convert", "More Enquiries, Not Just Looks", "Built to Win You Leads"],
    descriptions: ["A website development company building business sites that turn visitors into leads."],
  },
  "custom-website-development": {
    headlines: ["Built From Scratch", "No Templates, No Page-Builders", "Coded Around Your Business"],
    descriptions: ["Custom website development from scratch - no templates. Coded around your business."],
  },
  "web-development-services": {
    headlines: ["Front-End to Full-Stack", "CMS, E-Commerce, Redesign", "React, Next.js, Node.js"],
    descriptions: ["Full-stack web development services - front-end, back-end, CMS, e-commerce, support."],
  },
  "web-development-agency": {
    headlines: ["Your Dedicated Dev Team", "No Account-Manager Filter", "Talk Direct to Your Engineer"],
    descriptions: ["A web development agency that works like your in-house team. Talk direct, no filter."],
  },
  "ecommerce-development": {
    headlines: ["Online Stores That Convert", "Shopify and Headless Stores", "Built to Lift Add-to-Cart"],
    descriptions: ["E-commerce website development - Shopify or headless stores built to convert more."],
  },
  "custom-software-development": {
    headlines: ["Custom Software, Built to Fit", "Dashboards, Portals, CRMs", "React, Node.js, Python", "Built Around Your Workflow"],
    descriptions: [
      "Custom software development: dashboards, portals, CRMs and SaaS for your workflow.",
      "Senior Indian engineers build your software end to end. Source code yours, no lock-in.",
    ],
  },
  "mobile-app-development": {
    headlines: ["iOS, Android, Flutter Apps", "Apps Built to Scale", "Flutter, React Native, Native", "From MVP to App Store"],
    descriptions: [
      "Mobile app development for iOS and Android - Flutter or native, built to scale.",
      "From MVP to App Store launch. Senior Indian app developers. Source code yours, no lock-in.",
    ],
  },
};

/**
 * Build a single-keyword-ad-group (SKAG) Campaign object for one keyword, using
 * its dedicated landing page (`d`) for intent + final URL. Keyword-variant
 * headlines are PINNED to position 1 (2-4 of them, so the search term always
 * shows in H1 AND Ad Strength stays high), then intent-specific and shared
 * benefit headlines fill the rest. Final URL is the dedicated page (no ?kw=).
 */
export function buildSkagCampaign(d: KeywordGroup, keyword: string, routePath: string): Campaign {
  const kw = clean(keyword);
  const kwTitle = titleCase(kw);
  const M = LIMITS.headline;
  const intent = INTENT_COPY[d.slug] ?? { headlines: [], descriptions: [] };

  // Keyword variants → pinned to H1.
  const pinned: string[] = [];
  for (const h of keywordHeadlines(kwTitle, M)) dedupePush(pinned, h, M, 15);

  const headlines: string[] = [...pinned];
  for (const h of intent.headlines) dedupePush(headlines, h, M, 15);
  for (const h of SKAG_BENEFIT_HEADLINES) dedupePush(headlines, h, M, 15);

  const descriptions: string[] = [];
  for (const dsc of intent.descriptions) dedupePush(descriptions, dsc, LIMITS.description, 4);
  for (const dsc of sharedDescriptions()) dedupePush(descriptions, dsc, LIMITS.description, 4);

  return {
    slug: d.slug,
    adGroup: `SKAG | ${kwTitle}`,
    finalUrl: resolveUrl(DOMAIN, routePath), // dedicated page — message-matched, no ?kw=
    path1: pathSeg(kw.split(" ").slice(0, 2).join("-")),
    path2: "india",
    keywords: MATCH_TYPES.map((matchType) => ({ text: kw, matchType })),
    headlines: headlines.slice(0, 15),
    descriptions: descriptions.slice(0, 4),
    pinnedHeadlines: pinned.filter((h) => headlines.slice(0, 15).includes(h)),
  };
}
