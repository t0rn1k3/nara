import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { NarrativeProfile } from "@/components/narratives/narrative-profile/narrative-profile";
import { SiteHeader } from "@/components/site-header";
import { getNarrativeBySlug, narratives } from "@/lib/narratives";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return narratives.map((narrative) => ({ slug: narrative.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const narrative = getNarrativeBySlug(slug);

  if (!narrative) {
    return { title: "Narrative not found — NA-RA" };
  }

  return {
    title: `${narrative.name} — NA-RA`,
    description: narrative.overview,
  };
}

export default async function NarrativePage({ params }: PageProps) {
  const { slug } = await params;
  const narrative = getNarrativeBySlug(slug);

  if (!narrative) {
    notFound();
  }

  return (
    <div className="min-h-dvh bg-[var(--map-ocean-deep)] text-black/80">
      <SiteHeader />
      <NarrativeProfile narrative={narrative} />
    </div>
  );
}
