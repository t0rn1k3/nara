"use client";

import { MapPanel } from "@/components/atlas/map-panel";
import { NarrativeAside } from "@/components/narratives/narrative-aside";
import { NarrativeSelectionProvider } from "@/components/narratives/narrative-selection-context";

export function HomeClient() {
  return (
    <NarrativeSelectionProvider>
      <div className="relative h-dvh w-full overflow-hidden bg-nara-navy text-nara-off-white">
        <MapPanel />
        <div className="pointer-events-none absolute inset-0 z-30 flex justify-end p-5 sm:p-6">
          <div className="pointer-events-auto h-full w-full max-w-[min(calc(100%-2.5rem),22rem)] sm:max-w-[min(25vw,22rem)]">
            <NarrativeAside />
          </div>
        </div>
      </div>
    </NarrativeSelectionProvider>
  );
}
