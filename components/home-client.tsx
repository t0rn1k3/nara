"use client";

import { MapPanel } from "@/components/atlas/map-panel";
import { NarrativeAside } from "@/components/narratives/narrative-aside";
import { NarrativeSelectionProvider } from "@/components/narratives/narrative-selection-context";
import type { Narrative } from "@/lib/types";

export function HomeClient({ narratives }: { narratives: Narrative[] }) {
  return (
    <NarrativeSelectionProvider narratives={narratives}>
      <div className="flex min-h-dvh w-full flex-col bg-[var(--map-ocean-deep)] text-black/80">
        <section
          className="shrink-0 px-5 py-3 sm:px-6 sm:py-4"
          aria-labelledby="atlas-introduction-heading"
        >
          <h2 id="atlas-introduction-heading" className="sr-only">
            Explore political narratives across Europe
          </h2>
          <p className="max-w-5xl font-sans text-sm leading-relaxed text-black/70 sm:text-base">
            The European Narrative Atlas is NARA&apos;s interactive research
            platform for exploring how political narratives appear across
            European countries, political actors and issue areas. Select a
            narrative to view where it has been identified in NARA&apos;s
            research.
          </p>
        </section>
        <div className="relative min-h-0 flex-1 overflow-hidden">
          <MapPanel />
          <div className="pointer-events-none absolute inset-0 z-30 flex justify-end p-5 sm:p-6">
            <div className="pointer-events-auto h-full w-full max-w-[min(calc(100%-2.5rem),22rem)] sm:max-w-[min(25vw,22rem)]">
              <NarrativeAside />
            </div>
          </div>
        </div>
        <aside
          className="shrink-0 border-t border-black/15 px-5 py-4 sm:px-6 sm:py-5"
          aria-label="Atlas coverage note"
        >
          <p className="font-mono text-[10px] font-medium tracking-[0.16em] text-black/55 uppercase">
            Coverage note
          </p>
          <p className="mt-2 font-sans text-sm leading-relaxed text-black/80 sm:text-base">
            The Atlas currently covers a limited number of countries where
            NARA&apos;s research has been conducted. Countries not currently
            represented have not necessarily been assessed, and the absence of
            a narrative from a country should not be interpreted as evidence
            that the narrative is not present there. Coverage will expand as
            additional countries are researched and added to the Atlas.
          </p>
        </aside>
      </div>
    </NarrativeSelectionProvider>
  );
}
