"use client";

import { AsideMasthead } from "./aside-masthead";
import { NarrativeList } from "./narrative-list";

export function NarrativeAside() {
  return (
    <aside className="flex h-full max-h-full flex-col overflow-hidden rounded-xl border border-nara-grey-300/25 bg-[var(--nara-aside-bg)] text-black/80 shadow-[0_8px_32px_rgba(11,20,38,0.12)] backdrop-blur-sm">
      <AsideMasthead />
      <div className="aside-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <NarrativeList />
      </div>
    </aside>
  );
}
