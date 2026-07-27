"use client";

import { useMemo } from "react";

import {
  getCapitalMarkers,
  getCountryPaths,
  NARA_VIEWBOX,
} from "@/lib/geo";
import { narrativeCountryFill, NARRATIVE_GLOW_THRESHOLD } from "@/lib/map-colors";
import { narratives } from "@/lib/narratives";

import { useNarrativeSelection } from "@/components/narratives/narrative-selection-context";

const MAP_PATH_TRANSITION =
  "fill 400ms ease, opacity 400ms ease, filter 400ms ease";

export function EuropeMap() {
  const paths = getCountryPaths();
  const capitals = getCapitalMarkers();
  const { hoveredId } = useNarrativeSelection();

  const hoveredNarrative = useMemo(
    () => narratives.find((narrative) => narrative.id === hoveredId) ?? null,
    [hoveredId],
  );

  const strengthByIso = useMemo(() => {
    if (!hoveredNarrative) return new Map<string, number>();
    return new Map(
      hoveredNarrative.countries.map(({ iso, strength }) => [iso, strength]),
    );
  }, [hoveredNarrative]);

  return (
    <svg
      viewBox={`0 0 ${NARA_VIEWBOX.width} ${NARA_VIEWBOX.height}`}
      className="h-full w-full"
      role="img"
      aria-label="Political map of Europe showing narrative prevalence"
    >
      <defs>
        <linearGradient id="map-ocean-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--map-ocean)" />
          <stop offset="100%" stopColor="var(--map-ocean-deep)" />
        </linearGradient>
        <filter id="map-soft-shadow" x="-2%" y="-2%" width="104%" height="104%">
          <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodOpacity="0.12" />
        </filter>
        <filter id="map-country-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="2" floodOpacity="0.35" />
        </filter>
      </defs>

      <rect
        width={NARA_VIEWBOX.width}
        height={NARA_VIEWBOX.height}
        fill="url(#map-ocean-gradient)"
      />

      <g id="country-regions" filter="url(#map-soft-shadow)">
        {paths.map((path) => {
          const strength = path.iso ? strengthByIso.get(path.iso) : undefined;
          const isActive = strength !== undefined;
          const isDimmed =
            Boolean(hoveredId) && Boolean(path.iso) && !isActive;

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
