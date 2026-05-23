import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getKeywordGroup } from "@/data/keyword-groups";
import KeywordLandingPage from "@/components/pages/KeywordLandingPage";

const SLUG = "website-development-company";

export function generateMetadata(): Metadata {
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

export default function WebsiteDevelopmentCompanyPage() {
  const data = getKeywordGroup(SLUG);
  if (!data) notFound();

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
    <main className="min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <KeywordLandingPage data={data} />
    </main>
  );
}
