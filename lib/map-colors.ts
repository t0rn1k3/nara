const MAP_HIGHLIGHT = "#F4CE00";
const MAP_HIGHLIGHT_ALPHA = 0.8;

function parseHex(hex: string): [number, number, number] {
  const value = hex.replace("#", "");
  return [
    Number.parseInt(value.slice(0, 2), 16),
    Number.parseInt(value.slice(2, 4), 16),
    Number.parseInt(value.slice(4, 6), 16),
  ];
}

/** Uniform fill for every country where a narrative is present. */
export const NARRATIVE_COUNTRY_FILL = (() => {
  const [r, g, b] = parseHex(MAP_HIGHLIGHT);

  return `rgba(${r}, ${g}, ${b}, ${MAP_HIGHLIGHT_ALPHA})`;
})();
