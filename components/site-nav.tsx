"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { isNavItemActive, MAIN_NAV } from "@/lib/navigation";

type SiteNavProps = {
  orientation?: "horizontal" | "vertical";
};

export function SiteNav({ orientation = "horizontal" }: SiteNavProps) {
  const pathname = usePathname();

  return (
    <nav
      className={
        orientation === "vertical"
          ? "flex shrink-0 flex-col items-end gap-1"
          : "flex items-center gap-5 sm:gap-6"
      }
    >
      {MAIN_NAV.map(({ label, href }) => {
        const active = isNavItemActive(href, pathname);

        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`font-mono text-[10px] tracking-[0.16em] uppercase transition-colors ${
              active ? "text-black" : "text-black/55 hover:text-black"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
