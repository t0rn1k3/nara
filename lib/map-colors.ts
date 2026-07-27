const MAP_LAND = "#e8dcc8";
const MAP_HIGHLIGHT = "#c4a265";

function parseHex(hex: string): [number, number, number] {
  const value = hex.replace("#", "");
  return [
    Number.parseInt(value.slice(0, 2), 16),
    Number.parseInt(value.slice(2, 4), 16),
    Number.parseInt(value.slice(4, 6), 16),
  ];
}

function toHex([r, g, b]: [number, number, number]): string {
  return `#${[r, g, b]
    .map((channel) => Math.round(channel).toString(16).padStart(2, "0"))
    .join("")}`;
}

/** Blend land brown toward highlight gold by narrative strength (0–1). */
export function narrativeCountryFill(strength: number): string {
  const t = Math.min(1, Math.max(0, strength));
  const [r1, g1, b1] = parseHex(MAP_LAND);
  const [r2, g2, b2] = parseHex(MAP_HIGHLIGHT);

  return toHex([
    r1 + (r2 - r1) * t,
    g1 + (g2 - g1) * t,
    b1 + (b2 - b1) * t,
  ]);
}

/** Full highlight + glow only for the strongest adopters. */
export const NARRATIVE_GLOW_THRESHOLD = 0.75;
