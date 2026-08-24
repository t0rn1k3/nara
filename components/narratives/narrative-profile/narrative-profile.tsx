import Link from "next/link";

import { NarrativeProfileMap } from "@/components/atlas/narrative-profile-map";
import { formatCountryStrength, getCountryName } from "@/lib/countries";
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
  const sortedCountries = [...narrative.countries].sort(
    (a, b) => b.strength - a.strength,
  );

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
        <h1 className="mt-3 font-serif text-4xl leading-tight tracking-tight text-black sm:text-5xl">
          {narrative.name}
        </h1>
        <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] text-black/55">
          <div>
            <dt className="sr-only">Date range</dt>
            <dd>
              {narrative.yearFrom}–{narrative.yearTo}
            </dd>
          </div>
          <div>
            <dt className="sr-only">Sources tracked</dt>
            <dd>{narrative.sourceCount} sources tracked</dd>
          </div>
          <div>
            <dt className="sr-only">Countries</dt>
            <dd>{narrative.countries.length} countries</dd>
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

          <ProfileSection title="Countries">
            <ul className="grid gap-2 sm:grid-cols-2">
              {sortedCountries.map(({ iso, strength }) => (
                <li
                  key={iso}
                  className="flex items-baseline justify-between gap-4 border border-black/15 px-4 py-3"
                >
                  <span className="font-sans text-sm text-black">
                    {getCountryName(iso)}
                  </span>
                  <span className="shrink-0 font-mono text-[10px] text-black/55">
                    {formatCountryStrength(strength)}
                  </span>
                </li>
              ))}
            </ul>
          </ProfileSection>

          <ProfileSection title="Timeline">
            <ol className="relative space-y-0 border-l border-black/20 pl-6">
              {narrative.timeline.map((entry) => (
                <li key={`${entry.year}-${entry.label}`} className="relative pb-6 last:pb-0">
                  <span
                    className="absolute top-1 -left-[calc(0.375rem+1px)] h-2 w-2 rounded-full"
                    style={{ backgroundColor: narrative.accentColor }}
                    aria-hidden
                  />
                  <time
                    dateTime={String(entry.year)}
                    className="font-mono text-[11px] text-black/55"
                  >
                    {entry.year}
                  </time>
                  <p className="mt-1 font-sans text-sm leading-relaxed text-black/80">
                    {entry.label}
                  </p>
                </li>
              ))}
            </ol>
          </ProfileSection>

          <ProfileSection title="Main Actors">
            <ul className="space-y-2">
              {narrative.actors.map((actor) => (
                <li
                  key={actor}
                  className="flex gap-3 font-sans text-sm leading-relaxed text-black/80"
                >
                  <span
                    className="mt-2 h-1 w-1 shrink-0 rounded-full bg-black/40"
                    aria-hidden
                  />
                  {actor}
                </li>
              ))}
            </ul>
          </ProfileSection>

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

          {related.length > 0 ? (
            <ProfileSection title="Related Narratives">
              <ul className="divide-y divide-black/15 border border-black/15">
                {related.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={`/narratives/${item.slug}`}
                      className="group flex items-baseline justify-between gap-4 px-4 py-4 transition-colors hover:bg-[var(--nara-aside-bg)]/25"
                    >
                      <span className="font-serif text-lg text-black group-hover:underline">
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

          <ProfileSection title="Sources">
            <p className="font-sans text-sm leading-relaxed text-black/70">
              NA-RA tracks{" "}
              <span className="font-mono text-black">
                {narrative.sourceCount}
              </span>{" "}
              primary sources for this narrative across state media, parliamentary
              records, and independent monitoring. Full bibliography access is
              planned for a future release.
            </p>
          </ProfileSection>
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
