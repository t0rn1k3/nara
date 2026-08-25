import type { Metadata } from "next";
import Link from "next/link";

import { SiteHeader } from "@/components/site-header";
import { CONTACT_EMAIL } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Contact — NA-RA",
  description: "Get in touch with NARA for research, collaboration, or media enquiries.",
};

const enquiryTypes = [
  { label: "Research collaborations", subject: "Research collaboration enquiry" },
  { label: "Media enquiries", subject: "Media enquiry" },
  { label: "General enquiries", subject: "General enquiry" },
] as const;

export default function ContactPage() {
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
            Contact NARA
          </h1>
        </header>

        <div className="mt-8 space-y-6">
          <p className="font-sans text-base leading-relaxed text-black/80">
            For research enquiries, collaboration, media enquiries or other
            questions:
          </p>

          <p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-sans text-base font-medium text-black underline decoration-black/30 underline-offset-4 transition-colors hover:decoration-black"
            >
              {CONTACT_EMAIL}
            </a>
          </p>

          <ul className="space-y-3 pt-2">
            {enquiryTypes.map(({ label, subject }) => (
              <li key={label}>
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`}
                  className="font-sans text-base text-black/80 underline decoration-black/20 underline-offset-4 transition-colors hover:text-black hover:decoration-black/40"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </div>
  );
}
