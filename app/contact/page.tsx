import type { Metadata } from "next";
import Link from "next/link";

import { SiteHeader } from "@/components/site-header";
import { getContactPage } from "@/sanity/pages";

export const metadata: Metadata = {
  title: "Contact — NARA",
  description:
    "Get in touch with NARA for research, collaboration, media enquiries, or questions about the European Narrative Atlas.",
};

export default async function ContactPage() {
  const page = await getContactPage();

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
            {page.heading}
          </h1>
          <p className="mt-4 font-sans text-base leading-relaxed text-black/70">
            {page.subheading}
          </p>
        </header>

        <div className="mt-8 space-y-6">
          <p className="font-sans text-base leading-relaxed text-black/80">
            {page.bodyText}
          </p>

          <p>
            <a
              href={`mailto:${page.email}`}
              className="font-sans text-base font-medium text-black underline decoration-black/30 underline-offset-4 transition-colors hover:decoration-black"
            >
              {page.email}
            </a>
          </p>

          {page.location ? (
            <p className="font-sans text-base leading-relaxed text-black/70">
              {page.location}
            </p>
          ) : null}
        </div>
      </article>
    </div>
  );
}
