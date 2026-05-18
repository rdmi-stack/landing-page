/**
 * Shared Google Ads campaign configuration.
 * Single source of truth for budget, geo, negatives, brand — change here, every
 * generated campaign updates on the next `npm run ads:sync`.
 */

export const DOMAIN = "https://ai.rdmi.in";

/** One master campaign; each landing page becomes one ad group inside it. */
export const CAMPAIGN_NAME = "RDMI | Search | India";
export const CAMPAIGN_TYPE = "Search";

/** Created PAUSED — nothing spends until reviewed + enabled in the Google Ads UI. */
export const CAMPAIGN_STATUS = "Paused";

export const DAILY_BUDGET = 3500; // INR/day, shared across all ad groups
export const BUDGET_TYPE = "Daily";

/** Launch on Maximize Clicks; switch to Maximize Conversions after 15–20 conversions. */
export const BID_STRATEGY = "Maximize clicks";

export const NETWORKS = "Google search"; // Search only — turn OFF Display + Search partners in UI
export const LANGUAGES = "English;Hindi";

/** Match types generated for every target keyword. */
export const MATCH_TYPES = ["Phrase", "Exact"] as const;

/** Shared negative keyword list — strips students, jobseekers, DIY, freelancer traffic. */
export const NEGATIVES = [
  "free", "free website", "tutorial", "how to", "course", "classes", "training",
  "certification", "learn", "w3schools", "jobs", "job", "salary", "internship",
  "intern", "freelance", "freelancer", "fiverr", "upwork", "resume", "sample",
  "download", "template free", "wordpress theme free", "github", "youtube",
  "pdf", "wikipedia", "what is", "meaning", "beginner", "practice",
  "project for students", "college project",
];

/** Callout assets (campaign level — added manually, not via CSV). */
export const CALLOUTS = [
  "Free 48-Hr Prototype", "Money-Back Guarantee", "Source Code Ownership",
  "2-Hour WhatsApp Reply", "Senior Developers Only", "NDA Before Call", "No Lock-In",
];

export const STRUCTURED_SNIPPET = {
  header: "Services",
  values: ["Business Websites", "E-Commerce", "Web Apps", "Landing Pages", "WordPress", "Redesign"],
};

export const PHONE = "+91 98185 65561";

/** Google Ads asset limits — enforced by the RSA builder. */
export const LIMITS = { headline: 30, description: 90, path: 15 };
