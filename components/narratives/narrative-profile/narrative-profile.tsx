import Link from "next/link";

import { NarrativeProfileMap } from "@/components/atlas/narrative-profile-map";
import { getCountryName } from "@/lib/countries";
import type { Narrative } from "@/lib/types";

import { NarrativeStructureFlow } from "./narrative-structure-flow";

type NarrativeProfileProps = {
  narrative: Narrative;
  related: Narrative[];
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

function BodyParagraphs({
  paragraphs,
}: {
  paragraphs: Array<{ _key: string; text: string }>;
}) {
  return (
    <div className="max-w-prose space-y-4">
      {paragraphs.map((paragraph) => (
        <p
          key={paragraph._key}
          className="font-sans text-base leading-relaxed text-black/80"
        >
          {paragraph.text}
        </p>
      ))}
    </div>
  );
}

export function NarrativeProfile({
  narrative,
  related,
}: NarrativeProfileProps) {
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

        <h1 className="mt-8 font-serif text-4xl leading-tight tracking-tight text-black capitalize sm:text-5xl">
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
          {narrative.sourceCount > 0 ? (
            <div>
              <dt className="sr-only">Sources</dt>
              <dd>
                {narrative.sourceCount}{" "}
                {narrative.sourceCount === 1 ? "source" : "sources"}
              </dd>
            </div>
          ) : null}
        </dl>
      </header>

      <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)] lg:gap-16">
        <div className="min-w-0 space-y-8">
          <ProfileSection title="Definition">
            <p className="max-w-prose font-sans text-base leading-relaxed text-black/80">
              {narrative.overview}
            </p>
          </ProfileSection>

          {narrative.keywords.length > 0 ? (
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
          ) : null}

          {narrative.countries.length > 0 ? (
            <ProfileSection title="Countries">
              <p className="max-w-prose font-sans text-base leading-relaxed text-black/80">
                {narrative.countries.map(getCountryName).join(" · ")}
              </p>
            </ProfileSection>
          ) : null}

          {narrative.parties.length > 0 ? (
            <ProfileSection title="Political actors">
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
              {narrative.partiesNote ? (
                <p className="mt-4 max-w-prose font-sans text-sm leading-relaxed text-black/75">
                  {narrative.partiesNote}
                </p>
              ) : null}
            </ProfileSection>
          ) : null}

          {narrative.countryAppearances.length > 0 ? (
            <ProfileSection title="How does the narrative appear?">
              <div className="space-y-10">
                {narrative.countryAppearances.map((appearance) => (
                  <div key={appearance._key} className="max-w-prose">
                    <h3 className="font-serif text-xl text-black">
                      {appearance.heading}
                    </h3>
                    <div className="mt-4">
                      <BodyParagraphs paragraphs={appearance.paragraphs} />
                    </div>
                    {appearance.bullets.length > 0 ? (
                      <ul className="mt-4 list-disc space-y-2 pl-5 font-sans text-base leading-relaxed text-black/80">
                        {appearance.bullets.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    ) : null}
                    {appearance.structureSteps.length > 0 ? (
                      <div className="mt-6">
                        <p className="mb-3 font-mono text-[10px] tracking-[0.16em] text-black/55 uppercase">
                          Narrative structure
                        </p>
                        <NarrativeStructureFlow
                          steps={appearance.structureSteps}
                        />
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </ProfileSection>
          ) : null}

          {narrative.comparativePattern.length > 0 ? (
            <ProfileSection title="Comparative pattern">
              {narrative.comparativePatternIntro ? (
                <div className="mb-4 max-w-prose space-y-4">
                  {narrative.comparativePatternIntro
                    .split(/\n\s*\n/)
                    .filter(Boolean)
                    .map((paragraph) => (
                      <p
                        key={paragraph}
                        className="font-sans text-base leading-relaxed text-black/80"
                      >
                        {paragraph}
                      </p>
                    ))}
                </div>
              ) : null}
              <div className="overflow-x-auto border border-black/15">
                <table className="w-full min-w-[520px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-black/15 bg-[var(--nara-aside-bg)]/40">
                      <th className="px-4 py-3 font-mono text-[10px] font-medium tracking-[0.14em] text-black/55 uppercase">
                        Country
                      </th>
                      <th className="px-4 py-3 font-mono text-[10px] font-medium tracking-[0.14em] text-black/55 uppercase">
                        Main articulation
                      </th>
                      <th className="px-4 py-3 font-mono text-[10px] font-medium tracking-[0.14em] text-black/55 uppercase">
                        Primary threat
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/15">
                    {narrative.comparativePattern.map((row) => (
                      <tr key={row._key}>
                        <td className="px-4 py-3 font-sans text-black/85">
                          {row.countryLabel}
                        </td>
                        <td className="px-4 py-3 font-sans text-black/80">
                          {row.mainArticulation}
                        </td>
                        <td className="px-4 py-3 font-sans text-black/80">
                          {row.primaryThreat}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {narrative.comparativePatternOutro ? (
                <p className="mt-4 max-w-prose font-sans text-base leading-relaxed text-black/80">
                  {narrative.comparativePatternOutro}
                </p>
              ) : null}
            </ProfileSection>
          ) : null}

          {narrative.commonElements.length > 0 ||
          narrative.contextSpecificElements.length > 0 ? (
            <ProfileSection title="Narrative characteristics">
              {narrative.commonElements.length > 0 ? (
                <div>
                  <h3 className="font-mono text-[10px] tracking-[0.16em] text-black/55 uppercase">
                    Common elements
                  </h3>
                  <ul className="mt-3 list-disc space-y-2 pl-5 font-sans text-base leading-relaxed text-black/80">
                    {narrative.commonElements.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {narrative.contextSpecificElements.length > 0 ? (
                <div
                  className={
                    narrative.commonElements.length > 0 ? "mt-8" : undefined
                  }
                >
                  <h3 className="font-mono text-[10px] tracking-[0.16em] text-black/55 uppercase">
                    Context-specific elements
                  </h3>
                  <ul className="mt-3 divide-y divide-black/15 border border-black/15">
                    {narrative.contextSpecificElements.map((item) => (
                      <li
                        key={item._key}
                        className="px-4 py-3 font-sans text-sm leading-relaxed text-black/80"
                      >
                        <span className="font-medium text-black">
                          {item.label}:
                        </span>{" "}
                        {item.description}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </ProfileSection>
          ) : null}

          {narrative.relatedTopics.length > 0 ? (
            <ProfileSection title="Related narratives">
              <ul className="divide-y divide-black/15 border border-black/15">
                {narrative.relatedTopics.map((topic) => (
                  <li key={topic._key} className="px-4 py-4">
                    <p className="font-serif text-lg text-black">
                      {topic.title}
                    </p>
                    <p className="mt-2 font-sans text-sm leading-relaxed text-black/75">
                      {topic.description}
                    </p>
                  </li>
                ))}
              </ul>
            </ProfileSection>
          ) : null}

          {narrative.comparativeTakeaway ? (
            <ProfileSection title="Comparative takeaway">
              <p className="max-w-prose font-sans text-base leading-relaxed text-black/80">
                {narrative.comparativeTakeaway}
              </p>
            </ProfileSection>
          ) : null}

          {related.length > 0 ? (
            <ProfileSection title="Linked narratives">
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
