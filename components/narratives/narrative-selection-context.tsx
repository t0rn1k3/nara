"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { Narrative } from "@/lib/types";

type NarrativeSelectionContextValue = {
  narratives: Narrative[];
  hoveredId: string | null;
  selectedId: string | null;
  setHoveredId: (id: string | null) => void;
  setSelectedId: (id: string | null) => void;
  clearHover: () => void;
};

const NarrativeSelectionContext =
  createContext<NarrativeSelectionContextValue | null>(null);

type NarrativeSelectionProviderProps = {
  children: ReactNode;
  narratives: Narrative[];
};

export function NarrativeSelectionProvider({
  children,
  narratives,
}: NarrativeSelectionProviderProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const clearHover = useCallback(() => {
    setHoveredId(null);
  }, []);

  const value = useMemo(
    () => ({
      narratives,
      hoveredId,
      selectedId,
      setHoveredId,
      setSelectedId,
      clearHover,
    }),
    [narratives, hoveredId, selectedId, clearHover],
  );

  return (
    <NarrativeSelectionContext.Provider value={value}>
      {children}
    </NarrativeSelectionContext.Provider>
  );
}

export function useNarrativeSelection() {
  const context = useContext(NarrativeSelectionContext);

  if (!context) {
    throw new Error(
      "useNarrativeSelection must be used within NarrativeSelectionProvider",
    );
  }

  return context;
}
