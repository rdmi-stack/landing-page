# agent.md

This is a compact agent handbook for the RDMI landing-page repo. Read `CLAUDE.md`
for the long-form marketing, Google Ads, and historical campaign context, but
use the current source tree as the final authority when docs and code disagree.

## Repo Snapshot

- Brand: RDMI Web Services / RDMI Tech Ventures Pvt. Ltd.
- Stack: Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4.
- Main app root: `src/app`.
- Shared UI/components: `src/components`.
- Keyword landing-page data: `src/data/keyword-groups.ts`.
- Shared keyword page renderer: `src/components/pages/KeywordLandingPage.tsx`.
- Lead intake API: `src/app/api/contact/route.ts`.
- Lead storage helper: `src/data/leads.ts`.
- Mongo helper: `src/lib/mongodb.ts`.
- Admin lead view: `src/components/pages/AdminPage.tsx`.
- Google Ads scripts: `scripts/ads`.
- GA4 scripts: `scripts/ga4`.

## Commands

```bash
npm run dev
npm run build
npm run lint
npx tsc --noEmit
```

`test-forms.spec.ts` expects a local server at `http://localhost:3010` when run
with Playwright.

## Current Routing Truth

The older docs mention `/lp` and dynamic `/kw/<slug>` pages. In the current
checkout, those are not the active implementation. Do not build new work on the
assumption that `src/app/kw/[slug]/page.tsx` or `UTMLandingPage.tsx` exists.

Current active route families:

- Core pages: `/`, `/get-quote`, `/products`, `/services`, `/about`,
  `/how-it-works`, `/case-studies`, `/contact`, `/faq`, `/privacy`, `/terms`,
  `/thank-you`.
- Admin pages: `/admin/login`, `/admin`.
- Dedicated keyword pages:
  - `/web-development-company`
  - `/website-development-company`
  - `/web-development-services`
  - `/web-development-agency`
  - `/custom-website-development`
  - `/custom-software-development-company`
  - `/mobile-app-development-company`
  - `/ecommerce-development-company`
  - `/ai-software-development-company`
  - `/ai-agent-development-company`
  - `/enterprise-software-development-company`
  - `/enterprise-saas-development-company`

`next.config.ts` redirects selected legacy `/kw/...` URLs to dedicated routes.
The tests intentionally assert that removed legacy pages such as `/lp` and
unrouted `/kw/...` URLs do not return 200.

## Landing Page Pattern

Dedicated landing-page route files set a `SLUG`, load the matching group through
`getKeywordGroup(SLUG)`, emit metadata/schema, and render `KeywordLandingPage`.

`KeywordLandingPage` dispatches promoted slugs into the high-conversion
`WebDevelopmentLandingPage` variant. The route inventory for Google Ads is not
hardcoded: `scripts/ads/route-map.mts` scans `src/app/*/page.tsx` for `SLUG`
and optional `ROUTE`, so generated final URLs should match real deployed pages.

When adding a keyword page:

1. Add or update the group in `src/data/keyword-groups.ts`.
2. Add a dedicated `src/app/<route>/page.tsx` with `SLUG`.
3. Add `ROUTE` if the route path differs from the slug.
4. Verify `npm run ads:sync <slug>` generates a non-404 final URL.
5. Update `test-forms.spec.ts` if the route is part of the retained live set.

## Lead Capture Flow

All lead forms should submit to `/api/contact`.

The API:

- Requires `name`, `email`, and `message`.
- Detects `formType` from `[formType:<type>]` markers or legacy message prefixes.
- Normalizes premium landing-page form types such as `web-dev-premium` to
  canonical types such as `web-dev`.
- Sends a server-side GA4 `generate_lead` event through `src/lib/ga4-server.ts`.
- Saves the lead before checking Mailgun.
- Returns `{ success: true, emailSkipped: true }` when Mailgun env vars are
  absent, so local form QA can still pass.
- Sends customer confirmation plus team notification when Mailgun is configured.

Lead storage is Mongo-first:

- `MONGODB_DB_NAME` defaults to `landing_page`.
- `MONGODB_LEADS_COLLECTION` defaults to `landing_page_leads`.
- If Mongo is unavailable or missing, the repo falls back to `data/leads.json`.

## Admin And Security

`/admin` and `/api/leads` are protected by `src/middleware.ts` using the
`admin_token` cookie. Login posts to `/api/auth`; logout uses `DELETE /api/auth`.
Set `ADMIN_PASSWORD` and `JWT_SECRET` in real environments. The defaults are
development conveniences and should not be treated as production secrets.

## Analytics And Ads Automation

Client GA4 is loaded in `src/app/layout.tsx` through `src/lib/gtag.ts`.
Server-side lead conversion tracking is in `src/lib/ga4-server.ts`.

Ads automation is driven by `src/data/keyword-groups.ts` and `scripts/ads`.
Important commands:

```bash
npm run ads:sync
npm run ads:sync <slug>
npm run ads:sync <slug> -- --push
npm run ads:oauth
npm run ads:skag
node scripts/ads/verify.mts
node scripts/ads/list-accounts.mts
node scripts/ga4/create-key-events.mts
```

Campaigns are created paused. Do not enable spend unless the user explicitly
asks for it.

Future ad copy must follow the resolved policy lessons in `CLAUDE.md`: complete
coherent RSA assets, ASCII-safe copy, no exaggerated claims, no naive substring
truncation, no deceptive interstitials on ad destinations, and real trust pages
(`/privacy`, `/terms`, contact details).

## Environment

Never commit secrets. `.env.local` is gitignored.

Common app env vars:

```bash
MAILGUN_API_KEY=
MAILGUN_DOMAIN=hello.rdmi.in
MAILGUN_FROM_EMAIL=info@rdmi.in
MAILGUN_REGION=US
MONGODB_URI=
MONGODB_DB_NAME=landing_page
MONGODB_LEADS_COLLECTION=landing_page_leads
NEXT_PUBLIC_GA_MEASUREMENT_ID=
GA4_MEASUREMENT_ID=
GA4_API_SECRET=
ADMIN_PASSWORD=
JWT_SECRET=
```

Google Ads and GA4 admin scripts also need the OAuth and customer-id variables
documented in `CLAUDE.md`.

## Verification Expectations

For code changes, prefer the smallest relevant verification:

- General TS/UI/API changes: `npm run lint` and `npx tsc --noEmit`.
- Production-sensitive changes: `npm run build`.
- Landing-page or form changes: run the app locally and verify in browser,
  including submit -> `/api/contact` -> `/thank-you`.
- Ads generation changes: run `npm run ads:sync <slug>` and inspect generated
  CSV/Markdown plus final URL mapping.

Current known lint state: `npm run lint` passes with warnings only, mostly
unused variables in UI components.

## Maintenance Rules

- Treat `CLAUDE.md` as long-form history and `agent.md` as the compact current
  operating guide.
- `AGENTS.md` exists but is older and less complete than `CLAUDE.md`; verify
  any claim from it against the current tree before acting.
- Do not reintroduce `/lp` or dynamic `/kw/[slug]` without an explicit user
  request.
- Do not hand-edit generated files under `docs/ads`; edit
  `src/data/keyword-groups.ts` or the ads scripts and regenerate.
- Do not commit `.env.local`, `.ga4-service-account.json`, `data/leads.json`,
  `.next`, `.netlify`, `out`, or `node_modules`.
