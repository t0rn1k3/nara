export const MAIN_NAV = [
  { label: "Atlas", href: "/" },
  { label: "Research", href: "/research" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export type MainNavItem = (typeof MAIN_NAV)[number];

export function isNavItemActive(href: string, pathname: string): boolean {
  if (href === "/") {
    return pathname === "/" || pathname.startsWith("/narratives/");
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}
