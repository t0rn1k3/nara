import { BrandLink } from "@/components/brand-link";
import { SiteNav } from "@/components/site-nav";

export function SiteHeader() {
  return (
    <div className="border-b border-nara-grey-300/20 bg-[var(--nara-aside-bg)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-8">
        <BrandLink tagline="Research Initiative" />
        <SiteNav />
      </div>
    </div>
  );
}
