import { BrandLink } from "@/components/brand-link";
import { SiteNav } from "@/components/site-nav";

export function AsideMasthead() {
  return (
    <header className="shrink-0 border-b border-nara-grey-300/20 px-6 pt-6 pb-5">
      <div className="flex items-start justify-between gap-4">
        <div className="mt-3">
          <h1 className="sr-only">NARA — The European Narrative Atlas</h1>
          <BrandLink tagline="The European Narrative Atlas" size="large" />
        </div>
        <SiteNav orientation="vertical" />
      </div>
    </header>
  );
}
