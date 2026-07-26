import {
  getCapitalMarkers,
  getCountryPaths,
  NARA_VIEWBOX,
} from "@/lib/geo";

export function EuropeMap() {
  const paths = getCountryPaths();
  const capitals = getCapitalMarkers();

  return (
    <svg
      viewBox={`0 0 ${NARA_VIEWBOX.width} ${NARA_VIEWBOX.height}`}
      className="h-full w-full"
      role="img"
      aria-label="Political map of Europe with capital cities"
    >
      <defs>
        <linearGradient id="map-ocean-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--map-ocean)" />
          <stop offset="100%" stopColor="var(--map-ocean-deep)" />
        </linearGradient>
        <filter id="map-soft-shadow" x="-2%" y="-2%" width="104%" height="104%">
          <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodOpacity="0.12" />
        </filter>
      </defs>

      <rect
        width={NARA_VIEWBOX.width}
        height={NARA_VIEWBOX.height}
        fill="url(#map-ocean-gradient)"
      />

      <g id="country-regions" filter="url(#map-soft-shadow)">
        {paths.map((path) => (
          <path
            key={path.iso ?? path.d.slice(0, 32)}
            d={path.d}
            data-iso={path.iso ?? undefined}
            data-region={path.isEuropean ? "nara" : "other"}
            fill={path.isEuropean ? "var(--map-land)" : "var(--map-land-muted)"}
            stroke="var(--map-border)"
            strokeWidth={0.5}
            strokeLinejoin="round"
          />
        ))}
      </g>

      <g id="capital-cities">
        {capitals.map((capital) => (
          <g key={capital.iso} transform={`translate(${capital.x}, ${capital.y})`}>
            <circle
              r={3.5}
              fill="var(--map-capital)"
              stroke="#ffffff"
              strokeWidth={1.25}
            />
            <text
              x={5}
              y={3}
              fill="var(--map-capital-label)"
              fontSize={8}
              fontFamily="var(--font-sans)"
              fontWeight={500}
              style={{ paintOrder: "stroke", stroke: "#ffffff", strokeWidth: 2 }}
            >
              {capital.name}
            </text>
          </g>
        ))}
      </g>

      <g id="narrative-flows" aria-hidden />
    </svg>
  );
}
