import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { NarrativeProfile } from "@/components/narratives/narrative-profile/narrative-profile";
import { SiteHeader } from "@/components/site-header";
import {
  absoluteUrl,
  createPageMetadata,
  isNarrativeIndexable,
  serializeJsonLd,
  SITE_NAME,
  SITE_URL,
  toSearchDescription,
} from "@/lib/seo";
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
    return createPageMetadata({
      title: "Narrative not found",
      description: "The requested NARA narrative profile could not be found.",
      path: `/narratives/${slug}`,
      indexable: false,
    });
  }

  const { narrative } = result;
  const indexable = isNarrativeIndexable(narrative.overview);
  const description = toSearchDescription(
    narrative.overview ||
      `Explore NARA's research profile of ${narrative.name} across Europe.`,
  );

  return createPageMetadata({
    title: narrative.name,
    description,
    path: `/narratives/${narrative.slug}`,
    indexable,
  });
}

export default async function NarrativePage({ params }: PageProps) {
  const { slug } = await params;
  const result = await getNarrativeBySlug(slug);

  if (!result) {
    notFound();
  }

  const { narrative } = result;
  const indexable = isNarrativeIndexable(narrative.overview);
  const narrativeJsonLd = indexable
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: narrative.name,
        description: toSearchDescription(narrative.overview),
        url: absoluteUrl(`/narratives/${narrative.slug}`),
        mainEntityOfPage: absoluteUrl(`/narratives/${narrative.slug}`),
        publisher: {
          "@type": "Organization",
          "@id": `${SITE_URL}#organization`,
          name: SITE_NAME,
          url: SITE_URL.toString(),
        },
        inLanguage: "en",
        keywords: narrative.keywords,
        citation: narrative.sources.map((source) => source.url),
      }
    : null;

  return (
    <div className="min-h-dvh bg-[var(--map-ocean-deep)] text-black/80">
      {narrativeJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(narrativeJsonLd),
          }}
        />
      ) : null}
      <SiteHeader />
      <NarrativeProfile
        narrative={narrative}
        related={result.related}
      />
    </div>
  );
}
