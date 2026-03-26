import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getKeywordGroup, getAllSlugs } from "@/data/keyword-groups";
import KeywordLandingPage from "@/components/pages/KeywordLandingPage";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = getKeywordGroup(slug);
  if (!data) return {};

  return {
    title: data.meta.title,
    description: data.meta.description,
    keywords: data.targetKeywords.join(", "),
    openGraph: {
      title: data.meta.title,
      description: data.meta.description,
      type: "website",
    },
  };
}

export default async function KWPage({ params }: Props) {
  const { slug } = await params;
  const data = getKeywordGroup(slug);
  if (!data) notFound();

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      <KeywordLandingPage data={data} />
    </main>
  );
}
