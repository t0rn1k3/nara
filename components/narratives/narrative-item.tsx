"use client";

import Link from "next/link";

import type { Narrative } from "@/lib/types";

import { useNarrativeSelection } from "./narrative-selection-context";

type NarrativeItemProps = {
  narrative: Narrative;
};

const MAX_NAME_LENGTH = 35;

function truncateName(name: string): string {
  if (name.length <= MAX_NAME_LENGTH) return name;
  return `${name.slice(0, MAX_NAME_LENGTH)}...`;
}

export function NarrativeItem({ narrative }: NarrativeItemProps) {
  const { hoveredId, setHoveredId, clearHover, setSelectedId } =
    useNarrativeSelection();
  const isActive = hoveredId === narrative.id;
  const isTruncated = narrative.name.length > MAX_NAME_LENGTH;

  return (
    <li>
      <Link
        href={`/narratives/${narrative.slug}`}
        onMouseEnter={() => setHoveredId(narrative.id)}
        onMouseLeave={clearHover}
        onFocus={() => setHoveredId(narrative.id)}
        onBlur={clearHover}
        onClick={() => setSelectedId(narrative.id)}
        aria-current={isActive ? "true" : undefined}
        aria-label={isTruncated ? narrative.name : undefined}
        className={`narrative-item relative block border-l-2 px-6 py-6 transition-[background-color,border-color] duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-black/30 ${
          isActive ? "" : "border-transparent"
        }`}
        style={{
          borderLeftColor: isActive ? narrative.accentColor : undefined,
          ["--item-accent" as string]: narrative.accentColor,
        }}
      >
        <span className="narrative-item-name font-serif text-[0.9rem] leading-snug text-black capitalize">
          {truncateName(narrative.name)}
          {isTruncated ? (
            <span role="tooltip" className="narrative-item-tooltip">
              {narrative.name}
            </span>
          ) : null}
        </span>
      </Link>
    </li>
  );
}
