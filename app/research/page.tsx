import type { Metadata } from "next";
import Link from "next/link";

import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Research — NARA",
  description:
    "NARA's research programme on political narratives across Europe and its wider neighbourhood.",
};

const sections = [
  {
    title: "Research focus",
    paragraphs: [
      "NARA examines how political narratives form, spread and evolve across different political systems, media environments and geographic contexts.",
      "Our work combines qualitative analysis of political communication with comparative methods, tracing recurring narrative patterns as they move between countries, actors and issue areas.",
    ],
  },
  {
    title: "The European Narrative Atlas",
    paragraphs: [
      "The Atlas is NARA's main interactive research product — a platform for exploring narrative patterns identified through this research programme.",
      "It translates structured qualitative findings into an accessible, map-based interface, allowing researchers, journalists and the public to navigate how narratives appear across Europe and its wider neighbourhood.",
    ],
  },
  {
    title: "Methodology",
    paragraphs: [
      "Research is based on systematic qualitative coding of political texts, speeches and media coverage, combined with expert assessment and cross-country comparison.",
      "Narrative patterns are identified through iterative analysis, validated against multiple sources and contexts before being mapped in the Atlas.",
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
            NARA is an independent research initiative. The European Narrative
            Atlas is its main interactive product.
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
