"use client";

import { EuropeMap } from "./europe-map";

export function MapPanel() {
  return (
    <div className="relative h-full w-full bg-[var(--map-ocean)]">
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--nara-off-white) 1px, transparent 1px),
            linear-gradient(to bottom, var(--nara-off-white) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
        aria-hidden
      />
      <EuropeMap />
      <p className="pointer-events-none absolute right-4 bottom-3 z-20 font-mono text-[10px] tracking-wide text-[var(--map-capital-label)]/70">
        Natural Earth · 1 : 110 000 000
      </p>
    </div>
  );
}
