const displayNames = new Intl.DisplayNames(["en"], { type: "region" });

export function getCountryName(iso: string): string {
  return displayNames.of(iso) ?? iso;
}