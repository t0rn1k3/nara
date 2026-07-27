const displayNames = new Intl.DisplayNames(["en"], { type: "region" });

export function getCountryName(iso: string): string {
  return displayNames.of(iso) ?? iso;
}

export function formatCountryStrength(strength: number): string {
  return `${Math.round(strength * 100)}%`;
}
