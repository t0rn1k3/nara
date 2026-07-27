import { narratives } from "@/lib/narratives";

import { NarrativeItem } from "./narrative-item";

export function NarrativeList() {
  return (
    <section
      id="narrative-list"
      aria-labelledby="narrative-list-heading"
      className="px-2 py-4"
    >
      <header className="flex items-baseline justify-between gap-3 px-4 pb-3">
        <h2
          id="narrative-list-heading"
          className="font-mono text-[10px] tracking-[0.16em] text-nara-grey-300 uppercase"
        >
          Political Narratives
        </h2>
        <span className="font-mono text-[10px] tracking-wide text-nara-grey-300 tabular-nums">
          {narratives.length} tracked
        </span>
      </header>
      <ul className="flex flex-col">
        {narratives.map((narrative) => (
          <NarrativeItem key={narrative.id} narrative={narrative} />
        ))}
      </ul>
    </section>
  );
}
