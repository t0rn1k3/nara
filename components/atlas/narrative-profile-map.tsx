"use client";

import { useMemo } from "react";

import type { NarrativeCountry } from "@/lib/types";

import { EuropeMapSvg } from "./europe-map-svg";

type NarrativeProfileMapProps = {
  countries: NarrativeCountry[];
  narrativeName: string;
};

export function NarrativeProfileMap({
  countries,
  narrativeName,
}: NarrativeProfileMapProps) {
  const strengthByIso = useMemo(
    () => new Map(countries.map(({ iso, strength }) => [iso, strength])),
    [countries],
  );

  return (
    <div className="aspect-[848/477] w-full overflow-hidden rounded-lg border border-nara-grey-200/40 bg-nara-navy">
      <EuropeMapSvg
        strengthByIso={strengthByIso}
        dimInactive
        showCapitals={false}
        ariaLabel={`Map highlighting countries where the ${narrativeName} narrative appears`}
      />
    </div>
  );
}
