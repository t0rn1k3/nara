import type { Metadata } from "next";
import Link from "next/link";

import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Research — NARA",
  description:
    "NARA examines how political narratives emerge, circulate and evolve across Europe and its wider neighbourhood.",
};

const sections = [
  {
    title: "Research focus",
    paragraphs: [
      "NARA examines how political narratives form, spread and evolve across different political systems, media environments and geographic contexts.",
      "Our research combines fieldwork, consultations with political experts, narrative analysis and systematic content analysis. These approaches are used alongside comparative research to identify and examine recurring political narratives across countries, political actors and issue areas.",
    ],
  },
  {
    title: "The European Narrative Atlas",
    paragraphs: [
      "The European Narrative Atlas is NARA's main interactive research product — a platform for exploring political narrative patterns identified through the research programme.",
      "It translates structured research findings into an accessible, map-based interface, allowing researchers, journalists and the public to explore how narratives appear across countries, political actors and issue areas.",
      "The Atlas provides an overview of where specific narratives have been identified in the analysed material and allows users to explore the actors, countries and evidence associated with them.",
      "It also helps reveal narrative patterns that may not be immediately recognised as part of a broader political narrative, including narratives that appear across different countries or political contexts.",
      "This makes it possible to identify narratives that may appear to be locally developed or associated with a domestic political actor, while also examining whether similar narratives have emerged earlier or been promoted in other political contexts.",
      "The Atlas therefore helps trace how political narratives travel across borders, are adopted or adapted by new actors, and take on new local forms.",
    ],
  },
  {
    title: "Methodology",
    paragraphs: [
      "Our methodology combines several complementary research approaches, including fieldwork, consultations with political experts, narrative analysis and systematic content analysis.",
      "Fieldwork and consultations with political experts provide contextual knowledge and help identify relevant political narratives and understand their development within specific national and political contexts.",
      "Narrative analysis is used to examine how recurring stories, frames, themes and claims are constructed, connected and communicated.",
      "Content analysis is used to systematically examine political communication and identify recurring patterns across the analysed material.",
      "These approaches are combined with cross-country comparison to examine how narratives emerge, develop and circulate across different political and geographic contexts.",
    ],
  },
  {
    title: "Sources & evidence",
    paragraphs: [
      "The research draws on publicly available political communication and other relevant primary and secondary material, including speeches, statements, party materials, interviews, campaign communication and media coverage.",
      "Narrative entries are supported by documented examples and source material. Sources are included to allow users to examine the evidence behind individual observations and to distinguish documented examples from broader analytical interpretation.",
    ],
  },
  {
    title: "Scope & limitations",
    paragraphs: [
      "The European Narrative Atlas is a research-based mapping tool rather than an exhaustive database of all political communication.",
      "Its entries reflect the material analysed within the scope of the research programme and may therefore not capture every instance in which a narrative appears.",
      "The Atlas focuses on identifying and comparing recurring narrative patterns. It does not assess the truthfulness, legitimacy or political value of the positions associated with them.",
    ],
  },
] as const;

export default function ResearchPage() {
  return (
    <div className="min-h-dvh bg-[var(--map-ocean-deep)] text-black/80">
      <SiteHeader />
      <article className="mx-auto max-w-3xl px-6 py-10 sm:px-8 lg:py-14">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.16em] text-black/55 uppercase transition-colors hover:text-black"
        >
          <span aria-hidden>←</span>
          Back to Atlas
        </Link>

        <header className="mt-8 border-b border-black/15 pb-8">
          <h1 className="font-serif text-4xl leading-tight tracking-tight text-black sm:text-5xl">
            Research
          </h1>
          <p className="mt-4 font-sans text-base leading-relaxed text-black/70">
            NARA is an independent research initiative examining how political
            narratives emerge, circulate and evolve across Europe and its wider
            neighbourhood. The European Narrative Atlas is its main interactive
            research product.
          </p>
        </header>

        <div className="mt-10 space-y-10">
          {sections.map(({ title, paragraphs }) => (
            <section key={title}>
              <h2 className="font-mono text-[10px] font-medium tracking-[0.2em] text-black/55 uppercase">
                {title}
              </h2>
              <div className="mt-4 space-y-4">
                {paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="font-sans text-base leading-relaxed text-black/80"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>
    </div>
  );
}
