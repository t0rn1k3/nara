"use client";

import Link from "next/link";

import type { Narrative } from "@/lib/types";

import { useNarrativeSelection } from "./narrative-selection-context";

type NarrativeItemProps = {
  narrative: Narrative;
};

export function NarrativeItem({ narrative }: NarrativeItemProps) {
  const { hoveredId, setHoveredId, clearHover, setSelectedId } =
    useNarrativeSelection();
  const isHovered = hoveredId === narrative.id;

  return (
    <li>
      <Link
        href={`/narratives/${narrative.slug}`}
        onMouseEnter={() => setHoveredId(narrative.id)}
        onMouseLeave={clearHover}
        onFocus={() => setHoveredId(narrative.id)}
        onBlur={clearHover}
        onClick={() => setSelectedId(narrative.id)}
        aria-current={isHovered ? "true" : undefined}
      >
        <span>{narrative.name}</span>
      </Link>
    </li>
  );
}
