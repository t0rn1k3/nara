"use client";

import { EuropeMap } from "./europe-map";

export function MapPanel() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[var(--map-ocean-deep)]">
      <EuropeMap />
      <div
        className="pointer-events-none absolute inset-0 z-[15]"
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
      <p className="pointer-events-none absolute right-4 bottom-3 z-20 font-mono text-[10px] tracking-wide text-[var(--map-capital-label)]/70">
        Natural Earth · 1 : 110 000 000
      </p>
    </div>
  );
}
