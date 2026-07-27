"use client";

import { useCallback, useRef } from "react";

import { AsideFooter } from "./aside-footer";
import { AsideMasthead } from "./aside-masthead";
import { NarrativeList } from "./narrative-list";

export function NarrativeAside() {
  const listRef = useRef<HTMLDivElement>(null);

  const scrollToList = useCallback(() => {
    listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <aside className="flex h-full max-h-full flex-col overflow-hidden rounded-xl border border-nara-grey-300/25 bg-nara-off-white/95 text-nara-navy shadow-[0_8px_32px_rgba(11,20,38,0.12)] backdrop-blur-sm">
      <AsideMasthead />
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <div ref={listRef}>
          <NarrativeList />
        </div>
      </div>
      <AsideFooter onExplore={scrollToList} />
    </aside>
  );
}
