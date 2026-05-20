# Google Ads API Tool — Design Document

**Tool name:** RDMI Internal Campaign Sync

**Company:** RDMI Tech Ventures Pvt. Ltd.

**Company URL:** https://rdmi.in

**Manager Account (MCC) ID:** 227-653-2362

**API Contact:** info@rdmiwebservices.com

**Document version:** 1.0 — May 2026

**Access level requested:** Basic

---

## 1. Overview

RDMI Internal Campaign Sync is an internal-only command-line tool that programmatically creates and manages Google Ads Search campaigns inside Google Ads accounts that sit under the RDMI manager account (MCC 227-653-2362).

The tool reads our internal keyword and landing-page configuration (a TypeScript module versioned in our private repository) and produces matching campaigns, ad groups, keywords, and Responsive Search Ads via the Google Ads API. All campaigns are created in **PAUSED** state for human review by RDMI's marketing team before being enabled in the Google Ads UI.

The tool is operated only by RDMI employees, runs only against accounts we own, and is not exposed to clients, partners, or the public.

## 2. Business context

RDMI is an Indian software-development agency. We build custom web applications, mobile apps, AI/ML systems, e-commerce platforms, and enterprise software for clients in India, the USA, and the UAE. Google Ads is our primary lead-generation channel.

Each of our service categories has a dedicated landing page on https://ai.rdmi.in — for example:

- `/web-development-company`
- `/mobile-app-development-company`
- `/ai-agent-development-company`
- `/custom-software-development-company`
- `/ai-software-development-company`
- `/ecommerce-development-company`
- `/enterprise-saas-development-company`

We run a small number of Search campaigns that send qualified Indian SMB traffic to these pages. Today the same campaigns are produced as Google Ads Editor CSVs by the same internal tool. This Basic Access request allows the tool to additionally push those campaigns into Google Ads directly via the API, reducing manual import steps for our marketing operations team.

## 3. Architecture

The tool is a Node.js (24.x) command-line script that runs locally on RDMI employee workstations. It has no server, no client, no UI, and no external user surface.

```
src/data/keyword-groups.ts        (source of truth - landing pages + keywords)
        |
        v
scripts/ads/route-map.ts          (scans src/app for SLUG constants)
        |
        v
scripts/ads/build-campaign.ts     (builds a Campaign object per landing page;
                                   enforces headline <=30 / description <=90 limits)
        |
        +--> to-editor-csv.ts  -->  docs/ads/<slug>.csv  (Editor import - already in use)
        |
        +--> to-ads-api.ts     -->  Google Ads API       (this design doc - scope of request)
```

Source code is stored in a private Git repository accessible only to RDMI employees. Credentials are stored in a local `.env.local` file that is git-ignored and never committed.

## 4. Data flow

1. RDMI employee runs `npm run ads:sync <slug> -- --push` on their workstation.
2. The tool reads `src/data/keyword-groups.ts` (landing-page metadata + target keywords).
3. It scans `src/app/*/page.tsx` to derive each landing page's live URL.
4. It constructs an in-memory `Campaign` object for each landing page (ad-group name, keywords with match types, RSA headlines + descriptions, Final URL, path tokens).
5. The tool authenticates with the Google Ads API using a refresh token (OAuth2) and the developer token.
6. For each landing page, the tool creates or updates: a CampaignBudget, a Campaign (PAUSED), an AdGroup, AdGroupCriterion entries (one per keyword, with Phrase and Exact match types), and one ResponsiveSearchAd.
7. The tool exits, printing a per-page summary (operations count, success/failure). The marketing team reviews the campaign in the Google Ads UI and changes Status from PAUSED to ENABLED when ready.

The tool also reads campaign-level performance metrics (impressions, clicks, cost, conversions) via `GoogleAdsService.search` for internal monthly reporting.

## 5. Google Ads API services used

| Service | Operation | Purpose |
|---|---|---|
| `CampaignBudgetService` | `mutate` (CREATE) | Daily budget for the master campaign |
| `CampaignService` | `mutate` (CREATE, UPDATE) | Search campaign in PAUSED status |
| `AdGroupService` | `mutate` (CREATE) | One ad group per landing page |
| `AdGroupCriterionService` | `mutate` (CREATE) | Keywords (phrase + exact match) |
| `AdGroupAdService` | `mutate` (CREATE) | Responsive Search Ad per ad group |
| `CampaignCriterionService` | `mutate` (CREATE) | Campaign-level negative keywords + geo (India), language targeting |
| `GoogleAdsService` | `search` | Read campaign / ad-group / keyword reporting metrics |

We will not call: account-creation endpoints, label management, audience uploads, App Conversion Tracking, Remarketing API, or any cross-account discovery endpoints.

## 6. OAuth2 authentication flow

Standard Google Ads API OAuth2 flow with a long-lived refresh token:

1. RDMI's API contact performs a one-time browser consent against an OAuth2 desktop-app client in our Google Cloud project, granting the `https://www.googleapis.com/auth/adwords` scope.
2. The resulting refresh token is stored in `.env.local` on the operator's workstation. The file is git-ignored. Refresh tokens are never logged, printed, or committed.
3. At runtime, the tool exchanges the refresh token for a short-lived access token directly with Google's OAuth2 token endpoint.
4. Each API request carries: the access token (Bearer), the developer token (`developer-token` header), and `login-customer-id: 227-653-2362` (our MCC), targeting `customer-id` of an account beneath that MCC.

## 7. Safety, scope, and compliance controls

- **PAUSED by default.** Every campaign is created with `Campaign.status = PAUSED`. No campaign serves traffic or spends money until an RDMI employee manually changes the status in the Google Ads UI.
- **Budget caps.** The tool enforces a configurable daily budget (default ₹3,500). Any change to the default budget is a code change reviewed via Git pull-request before deployment.
- **MCC scope only.** The tool only operates on `customer-id` values that sit under the RDMI MCC (227-653-2362). It does not iterate other accounts, list other accounts, or accept arbitrary customer IDs from input.
- **Internal use only.** The tool is run only by RDMI employees. It is not packaged, distributed, served, or made accessible to clients, partners, or third parties.
- **No app conversion or remarketing.** The tool does not call App Conversion Tracking or Remarketing endpoints.
- **No competitor scraping.** The tool does not query SERPs, competitor sites, or any data that is not part of our own Google Ads account.
- **No bulk account creation.** The tool does not create Google Ads accounts. The accounts under our MCC are created manually by our admin.
- **Credentials.** Developer token, OAuth client secret, and refresh token are stored in `.env.local`, never logged, never committed to source control. The `.gitignore` is configured to exclude `.env.local`.

## 8. Error handling and retries

- All API calls are wrapped in `try/catch`.
- Transient errors (`UNAVAILABLE`, `DEADLINE_EXCEEDED`, `RATE_EXCEEDED`, HTTP 5xx) are retried with exponential backoff: 1s, 2s, 4s, then fail.
- Permanent errors (`INVALID_ARGUMENT`, `PERMISSION_DENIED`, `FAILED_PRECONDITION`, `RESOURCE_EXHAUSTED` of the daily-quota kind) are not retried. The error is printed to the console with the offending entity, and the run aborts for that landing page.
- If a campaign is created successfully but a downstream entity (ad group, keyword, ad) fails, the partial campaign remains PAUSED in the account so the operator can either delete or complete it manually. The tool does not perform automatic rollback of created entities.
- A summary is printed at the end of each run: campaigns created, campaigns failed, total operations, total errors.

## 9. Rate-limit management

Estimated operation count per landing page:

| Step | Operations |
|---|---|
| Create CampaignBudget | 1 |
| Create Campaign | 1 |
| Create AdGroup | 1 |
| Create AdGroupCriterion (keywords, ~12 keywords × 2 match types) | ~24 |
| Create AdGroupAd (RSA) | 1 |
| Campaign-level negatives + geo + language | ~5 |
| **Per-page total** | **~33 ops** |

Expected sync frequency: ad-hoc, triggered manually by the marketing operator. Typical usage: under 10 sync runs per day across all landing pages. We have 7 landing pages currently; even a full daily resync = ~230 ops/day. This is well below the **15,000 operations/day Basic Access quota**.

The tool executes requests serially (no concurrent batches) to keep API load predictable.

## 10. Logging and auditing

- Each sync prints to stdout: timestamp, slug, operation counts, success/failure status, and any error messages.
- No personally identifiable information (PII) is logged. Operator workstation, ad copy, and keyword text are logged (this is the same data being written to the API).
- The developer token, OAuth client secret, refresh token, and access token are never logged, even at debug verbosity.
- Logs are stdout-only — they are not transmitted off the operator's workstation.

## 11. Reporting (read-only) use

The tool will additionally read campaign and keyword performance metrics for internal monthly reporting:

- Metrics: impressions, clicks, cost, conversions, average CPC, CTR
- Scope: campaigns under our MCC only
- Frequency: weekly or monthly, ad-hoc
- Distribution: read into a local CSV file on the operator's workstation; used by RDMI marketing to inform copy iteration and negative-keyword pruning
- No external dashboard, no third-party data sharing

## 12. Out of scope

The following are explicitly **not** part of this tool and are not used by it:

- Display Network, YouTube, Discovery, Shopping, Performance Max campaigns
- App Conversion Tracking API
- Remarketing API / audience uploads
- Conversion-action creation (set up manually in the Google Ads UI)
- Automated bidding-strategy changes (we set bid strategy at creation time and do not modify it programmatically)
- Cross-account campaign management
- Account creation
- Label management
- Any client- or third-party-facing API surface

## 13. Future scope

We may, in the future, extend the same internal tool to:

- Pause individual ad groups based on internal performance thresholds (still PAUSED-by-default for new entities; pausing existing entities is a defensive action, not a spend-increasing one).
- Sync new landing pages added to `src/data/keyword-groups.ts` as additional ad groups under the same master campaign.

Any expansion of scope beyond what is described in this document will be evaluated against Google Ads API policy and, if it crosses an access-tier boundary, we will reapply for the appropriate access level rather than silently widen usage.

---

*Contact for questions: info@rdmiwebservices.com — MCC 227-653-2362*
