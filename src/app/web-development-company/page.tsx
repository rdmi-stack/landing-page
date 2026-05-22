import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getKeywordGroup } from "@/data/keyword-groups";
import KeywordLandingPage from "@/components/pages/KeywordLandingPage";

const SLUG = "web-development-company";

export async function generateMetadata(): Promise<Metadata> {
  const data = getKeywordGroup(SLUG);
  if (!data) return {};

  const url = `https://ai.rdmi.in/${SLUG}`;

  return {
    title: data.meta.title,
    description: data.meta.description,
    keywords: data.targetKeywords.join(", "),
    alternates: { canonical: url },
    openGraph: {
      title: data.meta.title,
      description: data.meta.description,
      url,
      siteName: "RDMI",
      type: "website",
      images: [{ url: data.images.hero, width: 1600, height: 1067, alt: data.primaryKeyword }],
    },
    twitter: {
      card: "summary_large_image",
      title: data.meta.title,
      description: data.meta.description,
      images: [data.images.hero],
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  };
}

// Sanitize a ?kw= value into a clean, Title-Cased keyword for ad message-match.
// Allow only letters/digits/space/&/- ; collapse spaces; cap length; Title Case.
function sanitizeKeyword(raw?: string): string | undefined {
  if (!raw) return undefined;
  const cleaned = raw
    .replace(/[^A-Za-z0-9 &-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 60);
  if (cleaned.length < 3) return undefined;
  return cleaned
    .split(" ")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1).toLowerCase() : w))
    .join(" ");
}

export default async function WebDevelopmentCompanyPage({
  searchParams,
}: {
  searchParams: Promise<{ kw?: string }>;
}) {
  const data = getKeywordGroup(SLUG);
  if (!data) notFound();

  const kw = sanitizeKeyword((await searchParams).kw);
  const headlineOverride = kw ? `${kw} in India — Talk to a Senior Web Developer in 2 Hours` : undefined;

  const url = `https://ai.rdmi.in/${SLUG}`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: data.primaryKeyword,
    description: data.meta.description,
    provider: {
      "@type": "Organization",
      name: "RDMI Tech Ventures Pvt. Ltd.",
      url: "https://ai.rdmi.in",
      logo: "https://ai.rdmi.in/icon.svg",
      email: "info@rdmi.in",
      telephone: "+91-9818565561",
      address: { "@type": "PostalAddress", addressCountry: "IN" },
    },
    areaServed: ["IN", "US", "GB", "AE"],
    url,
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "200" },
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <KeywordLandingPage data={data} headlineOverride={headlineOverride} keywordLabel={kw} />
    </main>
  );
}
