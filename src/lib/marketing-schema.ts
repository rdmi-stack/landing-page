export const COLLECTIONS = {
  campaigns: "landing_page_campaigns",
  adGroups: "landing_page_ad_groups",
  keywords: "landing_page_keywords",
  landingPages: "landing_page_pages",
  leads: process.env.MONGODB_LEADS_COLLECTION || "landing_page_leads",
  auditLogs: "landing_page_audit_logs",
} as const;

export interface CampaignDocument {
  id: string;
  name: string;
  channel: "google-search";
  status: "draft" | "active" | "paused" | "archived";
  objective: "leads" | "traffic" | "qualified-leads";
  geoTargets: string[];
  budgetDaily: number;
  negativeKeywords: string[];
  createdAt: string;
  updatedAt: string;
}

export interface AdGroupDocument {
  id: string;
  campaignId: string;
  name: string;
  status: "draft" | "active" | "paused" | "archived";
  keywordTheme: string;
  landingPagePath: string;
  landingPageUrl: string;
  headlineAssets: string[];
  descriptionAssets: string[];
  createdAt: string;
  updatedAt: string;
}

export interface KeywordDocument {
  id: string;
  campaignId: string;
  adGroupId: string;
  keyword: string;
  matchType: "exact" | "phrase" | "broad";
  status: "active" | "paused" | "negative";
  landingPagePath: string;
  landingPageUrl: string;
  qualityScore?: number;
  clicks?: number;
  impressions?: number;
  conversions?: number;
  cost?: number;
  cpc?: number;
  createdAt: string;
  updatedAt: string;
}

export interface LandingPageDocument {
  id: string;
  slug: string;
  path: string;
  url: string;
  pageType: "homepage" | "keyword-page" | "utm-page";
  primaryKeyword: string;
  secondaryKeywords: string[];
  campaignIds: string[];
  adGroupIds: string[];
  status: "draft" | "live" | "paused" | "archived";
  metaTitle: string;
  metaDescription: string;
  h1: string;
  ctaText: string;
  createdAt: string;
  updatedAt: string;
}

export interface LeadDocument {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  budget: string;
  message: string;
  formType: string;
  source: string;
  campaign?: string;
  adGroup?: string;
  keyword?: string;
  landingPagePath?: string;
  landingPageUrl?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  gclid?: string;
  leadScore?: number;
  leadStatus?: "new" | "contacted" | "qualified" | "proposal-sent" | "won" | "lost";
  timestamp: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuditLogDocument {
  id: string;
  entityType: "campaign" | "ad-group" | "keyword" | "landing-page" | "lead";
  entityId: string;
  action: string;
  actor: string;
  metadata?: Record<string, string | number | boolean | null>;
  createdAt: string;
}
