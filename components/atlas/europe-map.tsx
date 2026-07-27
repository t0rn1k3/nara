"use client";

import { useMemo } from "react";

import { narratives } from "@/lib/narratives";

import { useNarrativeSelection } from "@/components/narratives/narrative-selection-context";

import { EuropeMapSvg } from "./europe-map-svg";

export function EuropeMap() {
  const { hoveredId } = useNarrativeSelection();

  const hoveredNarrative = useMemo(
    () => narratives.find((narrative) => narrative.id === hoveredId) ?? null,
    [hoveredId],
  );

  const strengthByIso = useMemo(() => {
    if (!hoveredNarrative) return new Map<string, number>();
    return new Map(
      hoveredNarrative.countries.map(({ iso, strength }) => [iso, strength]),
    );
  }, [hoveredNarrative]);

  return (
    <EuropeMapSvg
      strengthByIso={strengthByIso}
      dimInactive={Boolean(hoveredId)}
    />
  );
}
