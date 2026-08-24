import Link from "next/link";

import { NarrativeProfileMap } from "@/components/atlas/narrative-profile-map";
import { getCountryName } from "@/lib/countries";
import { getRelatedNarratives } from "@/lib/narratives";
import type { Narrative } from "@/lib/types";

type NarrativeProfileProps = {
  narrative: Narrative;
};

function ProfileSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-black/15 pt-8">
      <h2 className="font-mono text-[10px] font-medium tracking-[0.2em] text-black/55 uppercase">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export function NarrativeProfile({ narrative }: NarrativeProfileProps) {
  const related = getRelatedNarratives(narrative.id);

  return (
    <article className="mx-auto max-w-6xl px-6 py-10 sm:px-8 lg:py-14">
      <header className="max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.16em] text-black/55 uppercase transition-colors hover:text-black"
        >
          <span aria-hidden>←</span>
          Back to Atlas
        </Link>

        <p
          className="mt-8 font-mono text-[10px] tracking-[0.18em] uppercase"
          style={{
            color: `color-mix(in srgb, ${narrative.accentColor} 75%, black)`,
          }}
        >
          {narrative.category}
        </p>
        <h1 className="mt-3 font-serif text-4xl leading-tight tracking-tight text-black uppercase sm:text-5xl">
          {narrative.name}
        </h1>
        <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] text-black/55">
          <div>
            <dt className="sr-only">Countries</dt>
            <dd>{narrative.countries.length} countries</dd>
          </div>
          <div>
            <dt className="sr-only">Political parties</dt>
            <dd>{narrative.parties.length} political parties</dd>
          </div>
        </dl>
      </header>

      <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)] lg:gap-16">
        <div className="min-w-0 space-y-8">
          <ProfileSection title="Overview">
            <p className="max-w-prose font-sans text-base leading-relaxed text-black/80">
              {narrative.overview}
            </p>
          </ProfileSection>

          <ProfileSection title="Political Parties">
            <ul className="grid gap-2 sm:grid-cols-2">
              {narrative.parties.map((party) => (
                <li
                  key={`${party.iso}-${party.name}`}
                  className="flex items-baseline justify-between gap-4 border border-black/15 px-4 py-3"
                >
                  <span className="font-sans text-sm text-black">
                    {party.name}
                  </span>
                  <span className="shrink-0 font-mono text-[10px] text-black/55">
                    {getCountryName(party.iso)}
                  </span>
                </li>
              ))}
            </ul>
          </ProfileSection>

          <div className="hidden">
            <ProfileSection title="Keywords">
              <ul className="flex flex-wrap gap-2">
                {narrative.keywords.map((keyword) => (
                  <li key={keyword}>
                    <span className="inline-block border border-black/20 px-3 py-1.5 font-mono text-[10px] tracking-wide text-black/70">
                      {keyword}
                    </span>
                  </li>
                ))}
              </ul>
            </ProfileSection>
          </div>

          {related.length > 0 ? (
            <ProfileSection title="Related Narratives">
              <ul className="divide-y divide-black/15 border border-black/15">
                {related.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={`/narratives/${item.slug}`}
                      className="group flex items-baseline justify-between gap-4 px-4 py-4 transition-colors hover:bg-[var(--nara-aside-bg)]/25"
                    >
                      <span className="font-serif text-lg text-black uppercase group-hover:underline">
                        {item.name}
                      </span>
                      <span className="shrink-0 font-mono text-[10px] text-black/55">
                        {item.category}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </ProfileSection>
          ) : null}
        </div>

        <aside className="lg:sticky lg:top-10 lg:self-start">
          <div className="rounded-xl border border-nara-grey-300/25 bg-[var(--nara-aside-bg)] p-5 text-black/80 shadow-[0_8px_32px_rgba(11,20,38,0.12)]">
            <p className="mb-3 font-mono text-[10px] tracking-[0.18em] text-black/70 uppercase">
              Geographic prevalence
            </p>
            <NarrativeProfileMap
              countries={narrative.countries}
              narrativeName={narrative.name}
            />
            <p className="mt-3 font-mono text-[10px] leading-relaxed text-black/70">
              Highlighted countries are those where the narrative has been
              observed.
            </p>
          </div>
        </aside>
      </div>
    </article>
  );
}
