"use client";

import { useMemo } from "react";

import { EuropeMapSvg } from "./europe-map-svg";

type NarrativeProfileMapProps = {
  countries: string[];
  narrativeName: string;
};

export function NarrativeProfileMap({
  countries,
  narrativeName,
}: NarrativeProfileMapProps) {
  const highlightedIsos = useMemo(() => new Set(countries), [countries]);

  return (
    <div className="relative aspect-[848/477] w-full overflow-hidden rounded-lg border border-black/15 bg-[var(--map-ocean-deep)]">
      <EuropeMapSvg
        highlightedIsos={highlightedIsos}
        dimInactive
        showCapitals={false}
        ariaLabel={`Map highlighting countries where the ${narrativeName} narrative appears`}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(
              ellipse 90% 80% at 40% 50%,
              transparent 0%,
              transparent 42%,
              rgba(11, 20, 38, 0.22) 72%,
              rgba(11, 20, 38, 0.62) 100%
            )
          `,
        }}
        aria-hidden
      />
    </div>
  );
}
