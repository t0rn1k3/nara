import Link from "next/link";

export function SiteHeader() {
  return (
    <div className="border-b border-nara-grey-300/20 bg-[var(--nara-aside-bg)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-8">
        <Link href="/" className="group">
          <span className="font-serif text-2xl text-black">NA-RA</span>
          <span className="mt-0.5 block font-sans text-[10px] font-medium tracking-[0.16em] text-black/70 uppercase group-hover:text-black">
            The European Narrative Atlas
          </span>
        </Link>
      </div>
    </div>
  );
}
