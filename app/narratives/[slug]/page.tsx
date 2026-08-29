import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { NarrativeProfile } from "@/components/narratives/narrative-profile/narrative-profile";
import { SiteHeader } from "@/components/site-header";
import {
  getNarrativeBySlug,
  getNarratives,
} from "@/sanity/narratives";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const narratives = await getNarratives();
  return narratives.map((narrative) => ({ slug: narrative.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = await getNarrativeBySlug(slug);

  if (!result) {
    return { title: "Narrative not found — NA-RA" };
  }

  return {
    title: `${result.narrative.name} — NA-RA`,
    description: result.narrative.overview,
  };
}

export default async function NarrativePage({ params }: PageProps) {
  const { slug } = await params;
  const result = await getNarrativeBySlug(slug);

  if (!result) {
    notFound();
  }

  return (
    <div className="min-h-dvh bg-[var(--map-ocean-deep)] text-black/80">
      <SiteHeader />
      <NarrativeProfile
        narrative={result.narrative}
        related={result.related}
      />
    </div>
  );
}
