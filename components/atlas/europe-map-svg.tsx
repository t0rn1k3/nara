import {
  getCapitalMarkers,
  getCountryPaths,
  NARA_VIEWBOX,
} from "@/lib/geo";
import { narrativeCountryFill, NARRATIVE_GLOW_THRESHOLD } from "@/lib/map-colors";

const MAP_PATH_TRANSITION =
  "fill 400ms ease, opacity 400ms ease, filter 400ms ease";

type EuropeMapSvgProps = {
  strengthByIso: Map<string, number>;
  dimInactive?: boolean;
  showCapitals?: boolean;
  className?: string;
  ariaLabel?: string;
};

export function EuropeMapSvg({
  strengthByIso,
  dimInactive = false,
  showCapitals = true,
  className = "h-full w-full",
  ariaLabel = "Political map of Europe and the Caspian region showing narrative prevalence",
}: EuropeMapSvgProps) {
  const paths = getCountryPaths();
  const capitals = getCapitalMarkers();
  const hasHighlight = strengthByIso.size > 0;

  return (
    <svg
      viewBox={`${NARA_VIEWBOX.minX} ${NARA_VIEWBOX.minY} ${NARA_VIEWBOX.width} ${NARA_VIEWBOX.height}`}
      preserveAspectRatio="xMidYMid slice"
      className={className}
      overflow="hidden"
      role="img"
      aria-label={ariaLabel}
    >
      <defs>
        <linearGradient id="map-ocean-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--map-ocean)" />
          <stop offset="100%" stopColor="var(--map-ocean-deep)" />
        </linearGradient>
        <filter id="map-soft-shadow" x="-8%" y="-8%" width="116%" height="116%">
          <feDropShadow
            dx="0"
            dy="1.5"
            stdDeviation="1.25"
            floodColor="#0b1426"
            floodOpacity="0.16"
          />
          <feDropShadow
            dx="0"
            dy="3.5"
            stdDeviation="3.5"
            floodColor="#0b1426"
            floodOpacity="0.12"
          />
        </filter>
        <filter id="map-country-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="2" floodOpacity="0.35" />
        </filter>
      </defs>

      <rect
        x={NARA_VIEWBOX.minX}
        y={NARA_VIEWBOX.minY}
        width={NARA_VIEWBOX.width}
        height={NARA_VIEWBOX.height}
        fill="url(#map-ocean-gradient)"
      />

      <g id="country-regions" filter="url(#map-soft-shadow)">
        {paths.map((path) => {
          const strength = path.iso ? strengthByIso.get(path.iso) : undefined;
          const isActive = strength !== undefined;
          const isDimmed =
            dimInactive && hasHighlight && Boolean(path.iso) && !isActive;

          const defaultFill = path.isEuropean
            ? "var(--map-land)"
            : "var(--map-land-muted)";

          const fill = isActive
            ? narrativeCountryFill(strength)
            : defaultFill;
          const showGlow = isActive && strength >= NARRATIVE_GLOW_THRESHOLD;

          return (
            <path
              key={path.iso ?? path.d.slice(0, 32)}
              d={path.d}
              data-iso={path.iso ?? undefined}
              data-region={path.isEuropean ? "nara" : "other"}
              data-strength={isActive ? strength : undefined}
              className="map-country-path"
              fill={fill}
              fillOpacity={isActive && showGlow ? 0.85 : 1}
              stroke="var(--map-border)"
              strokeWidth={0.5}
              strokeLinejoin="round"
              opacity={isDimmed ? 0.4 : 1}
              filter={showGlow ? "url(#map-country-glow)" : undefined}
              style={{ transition: MAP_PATH_TRANSITION }}
            />
          );
        })}
      </g>

      {showCapitals ? (
        <g id="capital-cities">
          {capitals.map((capital) => (
            <g key={capital.iso} transform={`translate(${capital.x}, ${capital.y})`}>
              <circle
                r={2.5}
                fill="var(--map-capital)"
                stroke="#ffffff"
                strokeWidth={1.15}
              />
              <text
                x={5}
                y={3}
                fill="var(--map-capital-label)"
                fontSize={6}
                fontFamily="var(--font-sans)"
                fontWeight={500}
              >
                {capital.country}
              </text>
            </g>
          ))}
        </g>
      ) : null}

      <g id="narrative-flows" aria-hidden />
    </svg>
  );
}
