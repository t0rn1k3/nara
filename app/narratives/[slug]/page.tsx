import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { NarrativeProfile } from "@/components/narratives/narrative-profile/narrative-profile";
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
      <div className="border-b border-nara-grey-300/20 bg-[var(--nara-aside-bg)]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-8">
          <Link href="/" className="group">
            <span className="font-serif text-2xl text-black">NA-RA</span>
            <span className="mt-0.5 block font-sans text-[10px] font-medium tracking-[0.16em] text-black/70 uppercase group-hover:text-black">
              The European Narrative Atlas
            </span>
          </Link>
        </div>
      </div>
      <NarrativeProfile narrative={narrative} />
    </div>
  );
}
