# Google Ads — Web Development Company Campaign (Launch Guide)

**Landing page:** https://ai.rdmi.in/web-development-company
*(production domain — confirm it resolves and the lean LP renders before posting)*

**Campaign:** RDMI | Web Development | Search | India
**Budget:** ₹3,500/day
**Geo:** All India
**Bidding:** **Maximize Clicks at launch** → switch to **Maximize Conversions after 15–20 conversions** (see §4)

---

## 1. Import the CSV (Google Ads Editor)

1. Download & open **Google Ads Editor**, sign in, download the target account.
2. **Account → Import → From file** → choose `docs/google-ads-web-development-company.csv`.
3. Review the proposed changes (1 campaign, 5 ad groups, ~25 keywords, 5 RSAs).
4. **Do not Post yet** — finish §2–§3 first (geo, negatives, extensions aren't in the CSV; Editor import doesn't carry them reliably).
5. **Post** when §2–§5 are done.

Ad groups created:
| Ad group | Theme | Keywords |
|---|---|---|
| AG1 - Web Development Company | core head terms | web development company/services/agency/firm |
| AG2 - Custom Web Development | custom intent | custom web development/design services |
| AG3 - Web App Development | app/SaaS intent | web application development, web app agency |
| AG4 - E-Commerce Web Dev | store intent | ecommerce/shopify website development |
| AG5 - WordPress and CMS | CMS intent | wordpress/cms development services |

Each ad group has 1 RSA (15 headlines + 4 descriptions) themed to its keywords for Quality Score.

---

## 2. Campaign settings to set manually (in Editor or Web UI)

- **Networks:** Search only. **Uncheck "Search partners"** and **"Display Network"** (Editor defaults Display on for new search campaigns — turn it off).
- **Locations:** India (whole country). **Location options → "Presence: People in your targeted locations"** (NOT "presence or interest" — avoids people merely searching about India from abroad).
- **Languages:** English + Hindi.
- **Ad rotation:** Optimize (default).
- **Ad schedule:** All day to start; tighten after 2 weeks of hour-of-day data.
- **Devices:** All; review mobile vs desktop after first week (web-dev buyers often convert on desktop — may need a mobile bid adjustment later).

---

## 3. Negative keywords (add as a campaign negative list)

Create a shared negative list **"Web Dev — Global Negatives"** and attach to the campaign:

```
free
free website
tutorial
how to
course
classes
training
certification
learn
w3schools
jobs
job
salary
internship
intern
freelance
freelancer
fiverr
upwork
resume
sample
download
template free
wordpress theme free
github
youtube
pdf
wikipedia
what is
meaning
beginner
practice
project for students
college project
```

These strip out students, job seekers, DIY, and freelancer-marketplace traffic — the biggest budget wasters on web-dev terms in India.

---

## 4. Conversion tracking (REQUIRED before switching bid strategy)

Maximize Clicks does **not** need conversion tracking — safe to launch immediately. But you must set up tracking now so data accrues for the switch.

**Conversions to define (Google Ads → Goals → Conversions → New):**
1. **Lead form submit** — the `/web-development-company` lead strip form. Fire on the `/thank-you` page load (the form already routes there). Category: *Submit lead form*. Count: One. Value: assign a proxy value (e.g. ₹1,500) so Max Conversions can optimize.
2. **WhatsApp click** — clicks on the green WhatsApp CTAs / "Talk to Web Developer on WhatsApp". Track as an outbound-click event. Category: *Contact*. Count: One.

**Implementation options:**
- **GA4 + import** (recommended): set up GA4 events `generate_lead` (thank-you page) and `whatsapp_click` (outbound), mark as conversions in GA4, then import into Google Ads. Cleanest, no extra page tags.
- **Google Ads tag direct:** add the gtag conversion snippet to `/thank-you` and an onclick event on WhatsApp anchors.

**Switch trigger:** once the campaign has logged **15–20 conversions** (typically ~7–14 days at ₹3,500/day), change the campaign bid strategy to **Maximize Conversions**. Optionally add a target CPA only after ~30 conversions — don't set tCPA on day one of the switch, let it learn first.

---

## 5. Extensions / assets (add at campaign level — not in CSV)

**Sitelinks (4):**
| Text | Final URL | Description line 1 | Description line 2 |
|---|---|---|---|
| Get a Free Quote | …/web-development-company#lead-form | Senior dev replies in 2 hours | Free 48-hour prototype |
| See Live Websites | …/web-development-company | Real projects, real outcomes | 200+ sites shipped |
| Our Process | …/web-development-company | WhatsApp call → prototype → live | Money-back if we're late |
| Talk on WhatsApp | …/web-development-company | No sales rep, senior dev only | NDA before the call |

**Callout assets:** Free 48-Hr Prototype · Money-Back Guarantee · Source Code Ownership · 2-Hour WhatsApp Reply · Senior Developers Only · NDA Before Call · No Lock-In

**Structured snippet:** Header *Services* → Business Websites, E-Commerce, Web Apps, Landing Pages, WordPress, Redesign

**Call asset:** +91 98185 65561 (call reporting on)

**Lead form asset (optional):** mirrors the LP form — Name, Phone, Email, Budget; headline "Get a website that brings leads"; only if you want in-SERP capture in addition to LP clicks.

---

## 6. Pre-launch checklist

- [ ] CSV imported, Final URL points to the correct (production) domain
- [ ] Display Network + Search partners OFF
- [ ] Geo = India, "presence" targeting
- [ ] Negative list attached
- [ ] Conversion tracking live and firing (test a real form submit + WhatsApp click)
- [ ] Budget ₹3,500/day confirmed; payment method valid
- [ ] Bidding = Maximize Clicks (not Conversions yet)
- [ ] RSAs show "Good"/"Excellent" Ad Strength after import
- [ ] Final URL loads, lean LP renders, form + WhatsApp work on mobile
- [ ] Post in Editor

## 7. First-2-weeks watch list

- Search terms report daily for the first 5 days → add negatives aggressively (web-dev terms attract a lot of irrelevant traffic).
- Pause keywords with >40 clicks and 0 conversions after the tracking switch.
- Check Lighthouse / LP speed under ad load — Quality Score depends on it.
- Once 15–20 conversions logged → switch to Maximize Conversions.
- Reallocate budget toward the ad group(s) with the lowest cost-per-lead.
