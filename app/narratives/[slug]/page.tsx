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
    return { title: "Narrative not found — NARA" };
  }

  return {
    title: `${narrative.name} — NARA`,
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
    <div className="min-h-dvh bg-nara-navy text-nara-off-white">
      <div className="border-b border-nara-grey-200/20">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-8">
          <Link href="/" className="group">
            <span className="font-serif text-2xl text-nara-off-white">NARA</span>
            <span className="mt-0.5 block font-sans text-[10px] font-medium tracking-[0.16em] text-nara-grey-300 uppercase group-hover:text-nara-off-white/80">
              The European Narrative Atlas
            </span>
          </Link>
        </div>
      </div>
      <NarrativeProfile narrative={narrative} />
    </div>
  );
}
