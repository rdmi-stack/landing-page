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

/** Display-path segment: letters/numbers/hyphen only, ≤15 chars. */
function pathSeg(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, LIMITS.path);
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
