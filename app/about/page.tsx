import type { Metadata } from "next";
import Link from "next/link";

import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "About — NARA",
  description:
    "NARA is an independent research initiative focused on political narratives across Europe and its wider neighbourhood.",
};

const paragraphs = [
  "NARA is an independent research initiative focused on political narratives, their development across different political and geographic contexts, and their role in the contemporary information environment.",
  "The European Narrative Atlas is an interactive research platform designed to explore how political narratives appear across countries, political actors and contexts.",
  "The project is based on qualitative research and comparative analysis of political communication and develops a structured approach to identifying and examining recurring narrative patterns across Europe and its wider neighbourhood.",
  "The Atlas is intended as a research and public-facing tool, making complex patterns in political communication easier to explore and understand.",
];

export default function AboutPage() {
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
            About NARA
          </h1>
          <p className="mt-4 font-sans text-base leading-relaxed text-black/70">
            NARA is the overarching research initiative. The European Narrative
            Atlas is its main interactive product.
          </p>
        </header>

        <div className="mt-8 space-y-6">
          {paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 32)}
              className="font-sans text-base leading-relaxed text-black/80"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </article>
    </div>
  );
}
