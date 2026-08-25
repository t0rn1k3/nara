import Link from "next/link";

export function AsideMasthead() {
  return (
    <header className="shrink-0 border-b border-nara-grey-300/20 px-6 pt-6 pb-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="mt-3 font-serif text-[2.75rem] leading-none font-normal tracking-tight text-black">
            NA-RA
          </h1>
          <p className="mt-2 font-sans text-[13px] font-medium tracking-[0.18em] uppercase">
            The European Narrative Atlas
          </p>
        </div>
        <nav className="mt-3 flex shrink-0 flex-col items-end gap-1">
          <Link
            href="/about"
            className="font-mono text-[10px] tracking-[0.16em] text-black/55 uppercase transition-colors hover:text-black"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="font-mono text-[10px] tracking-[0.16em] text-black/55 uppercase transition-colors hover:text-black"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
