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
  // Education / jobs / freebie seekers
  "free", "free website", "tutorial", "how to", "course", "classes", "training",
  "certification", "learn", "w3schools", "jobs", "job", "salary", "internship",
  "intern", "freelance", "freelancer", "fiverr", "upwork", "resume", "sample",
  "download", "template free", "wordpress theme free", "github", "youtube",
  "pdf", "wikipedia", "what is", "meaning", "beginner", "practice",
  "project for students", "college project",
  // DIY self-serve builders + page-builder plugins (they build it themselves)
  "wix", "squarespace", "godaddy", "weebly", "zyro", "carrd", "framer", "lovable",
  "durable", "hostinger", "blogspot", "blogger", "elementor", "divi", "spectra",
  "builder", "maker", "making", "creating", "no code", "low code", "nocode",
  "create website", "create own website", "make website", "google sites", "google website",
  // Design-only intent (this is a web DEVELOPMENT campaign, not design)
  "web design", "website design", "web designer", "website designer",
  "web designing", "website designing", "logo design", "graphic design",
  // Cheap / DIY price-shoppers + irrelevant platforms/brands
  "diy", "cheap", "cheapest", "how much", "odoo", "websenor", "ease2web", "wix studio", "ai website",
  // Leak terms exposed by live search-term reports (DIY "create/make", AI builders, brands)
  "creation", "tilda", "landingsite", "create a website", "make a website", "web site creation",
  "website ai", "website build", "ai website builder", "low cost", "near me", "how to make",
  "creware", "appinventiv", "praharx", "flikt",
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

/**
 * Sitelink assets (campaign level). link_text ≤25 chars, each description line
 * ≤35 chars. Paths must resolve on DOMAIN (ai.rdmi.in) or Google disapproves.
 */
export const SITELINKS = [
  { text: "Get a Free Quote", path: "/get-quote", desc1: "Senior dev WhatsApps in 2 hrs", desc2: "Free 48-hour prototype" },
  { text: "See Our Work", path: "/case-studies", desc1: "200+ websites delivered", desc2: "Real results, real clients" },
  { text: "How It Works", path: "/how-it-works", desc1: "Discovery to launch in weeks", desc2: "Clear scope, senior delivery" },
  { text: "50+ Products", path: "/products", desc1: "SaaS, apps, AI, e-commerce", desc2: "Built for Indian businesses" },
  { text: "Our Services", path: "/services", desc1: "Web, mobile, AI, enterprise", desc2: "Senior engineers, no juniors" },
  { text: "Contact Us", path: "/contact", desc1: "WhatsApp, call, or email", desc2: "Based in India, ships global" },
];

export const PHONE = "+91 98185 65561";

/** Google Ads asset limits — enforced by the RSA builder. */
export const LIMITS = { headline: 30, description: 90, path: 15 };
