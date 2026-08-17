const MAP_HIGHLIGHT = "#F4CE00";

function parseHex(hex: string): [number, number, number] {
  const value = hex.replace("#", "");
  return [
    Number.parseInt(value.slice(0, 2), 16),
    Number.parseInt(value.slice(2, 4), 16),
    Number.parseInt(value.slice(4, 6), 16),
  ];
}

/** Fade from transparent to the highlight by narrative strength (0–1). */
export function narrativeCountryFill(strength: number): string {
  const t = Math.min(1, Math.max(0, strength));
  const [r, g, b] = parseHex(MAP_HIGHLIGHT);

  return `rgba(${r}, ${g}, ${b}, ${t})`;
}

/** Full highlight + glow only for the strongest adopters. */
export const NARRATIVE_GLOW_THRESHOLD = 0.75;
