/**
 * Single source of truth for SKAG themes: which keyword maps to which dedicated
 * landing page, grouped by theme (web-dev, software-dev, app-dev, ...). Shared
 * by skag.mts (create/push) and update-rsas.mts (refresh).
 *
 * Each theme = one Google Ads campaign; each keyword = one single-keyword ad
 * group whose ad copy is intent-matched to its dedicated page (see INTENT_COPY
 * in build-campaign.mts) with keyword variants pinned to H1.
 */

import { keywordGroups } from "../../src/data/keyword-groups.ts";
import { buildRouteMap } from "./route-map.mts";
import { buildSkagCampaign, type Campaign } from "./build-campaign.mts";

export interface SkagTheme {
  campaignName: string;
  /** keyword (lowercase) → dedicated landing-page slug */
  keywordToSlug: Record<string, string>;
}

export const SKAG_THEMES: Record<string, SkagTheme> = {
  "web-dev": {
    campaignName: "RDMI | Web Dev SKAG | CSV Import 23May",
    keywordToSlug: {
      "web development company": "web-development-company",
      "website development company": "website-development-company",
      "custom website development": "custom-website-development",
      "web development services": "web-development-services",
      "web development agency": "web-development-agency",
      "ecommerce website development company": "ecommerce-development",
    },
  },
  "software-dev": {
    campaignName: "RDMI | Software Dev SKAG | India",
    keywordToSlug: {
      "software development company": "custom-software-development",
      "software development services": "custom-software-development",
      "custom software development company": "custom-software-development",
      "offshore software development company": "custom-software-development",
    },
  },
  "app-dev": {
    campaignName: "RDMI | App Dev SKAG | India",
    keywordToSlug: {
      "mobile app development company": "mobile-app-development",
      "app development company": "mobile-app-development",
      "android app development company": "mobile-app-development",
      "flutter app development company": "mobile-app-development",
    },
  },
  "ai-receptionist": {
    campaignName: "RDMI | AI Receptionist SKAG | Global",
    keywordToSlug: {
      "ai receptionist": "ai-receptionist",
      "ai voice agent": "ai-receptionist",
      "ai phone answering service": "ai-receptionist",
      "virtual receptionist software": "ai-receptionist",
      "ai answering service": "ai-receptionist",
    },
  },
  "ai-automation": {
    campaignName: "RDMI | AI Automation SKAG | Global",
    keywordToSlug: {
      "ai automation agency": "ai-automation-agency",
      "ai automation services": "ai-automation-agency",
      "ai workflow automation": "ai-automation-agency",
      "workflow automation services": "ai-automation-agency",
      "business process automation": "ai-automation-agency",
    },
  },
};

/** Merged keyword→slug across all themes (for ad-group name resolution). */
const ALL_KEYWORD_TO_SLUG: Record<string, string> = Object.assign(
  {},
  ...Object.values(SKAG_THEMES).map((t) => t.keywordToSlug),
);

function campaignFor(keyword: string): Campaign {
  const slug = ALL_KEYWORD_TO_SLUG[keyword];
  if (!slug) throw new Error(`No dedicated page mapped for keyword "${keyword}"`);
  const group = keywordGroups.find((g) => g.slug === slug);
  if (!group) throw new Error(`No keyword group "${slug}"`);
  const route = buildRouteMap().get(slug);
  if (!route) throw new Error(`No route for slug "${slug}"`);
  return buildSkagCampaign(group, keyword, route);
}

/** All SKAG ad-group Campaign objects for one theme, each pointed at its page. */
export function buildSkagCampaignsFor(themeKey: string): Campaign[] {
  const theme = SKAG_THEMES[themeKey];
  if (!theme) throw new Error(`Unknown SKAG theme "${themeKey}". Options: ${Object.keys(SKAG_THEMES).join(", ")}`);
  return Object.keys(theme.keywordToSlug).map(campaignFor);
}

/** Resolve the Campaign for an existing ad group like "SKAG | Web Development Company". */
export function campaignForAdGroup(adGroupName: string): Campaign | null {
  const kw = adGroupName.replace(/^SKAG \| /, "").toLowerCase();
  if (!ALL_KEYWORD_TO_SLUG[kw]) return null;
  return campaignFor(kw);
}
