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

  const highlightedIsos = useMemo(() => {
    if (!hoveredNarrative) return new Set<string>();
    return new Set(hoveredNarrative.countries);
  }, [hoveredNarrative]);

  return (
    <EuropeMapSvg highlightedIsos={highlightedIsos} />
  );
}
