"use client";

import { useMemo } from "react";

import { useNarrativeSelection } from "@/components/narratives/narrative-selection-context";

import { EuropeMapSvg } from "./europe-map-svg";

export function EuropeMap() {
  const { hoveredId, narratives } = useNarrativeSelection();

  const hoveredNarrative = useMemo(
    () => narratives.find((narrative) => narrative.id === hoveredId) ?? null,
    [hoveredId, narratives],
  );

  const highlightedIsos = useMemo(() => {
    if (!hoveredNarrative) return new Set<string>();
    return new Set(hoveredNarrative.countries);
  }, [hoveredNarrative]);

  return (
    <EuropeMapSvg highlightedIsos={highlightedIsos} />
  );
}
