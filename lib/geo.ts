import { geoCentroid, geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";
import type { Feature, Geometry } from "geojson";

import countriesTopology from "../public/data/countries-110m.json";
import { NARA_CAPITALS, type Capital } from "./capitals";
import { numericToAlpha2 } from "./iso-numeric";

export const NARA_VIEWBOX = {
  width: 800,
  height: 600,
  minX: 0,
  minY: 0,
} as const;

export const NARA_REGION_COUNTRIES = new Set<string>([
  "AT",
  "BE",
  "BG",
  "HR",
  "CY",
  "CZ",
  "DK",
  "EE",
  "FI",
  "FR",
  "DE",
  "GR",
  "HU",
  "IE",
  "IT",
  "LV",
  "LT",
  "LU",
  "MT",
  "NL",
  "PL",
  "PT",
  "RO",
  "SK",
  "SI",
  "ES",
  "SE",
  "GB",
  "CH",
  "NO",
  "IS",
  "UA",
  "BY",
  "MD",
  "RS",
  "ME",
  "MK",
  "AL",
  "BA",
  "GE",
  "AM",
  "AZ",
  "TR",
  "RU",
  "US",
  "CA",
]);

/** @deprecated Use NARA_REGION_COUNTRIES — kept for skeleton compatibility */
export const EUROPEAN_COUNTRY_IDS = NARA_REGION_COUNTRIES;

export type CountryPath = {
  d: string;
  iso: string | null;
  isEuropean: boolean;
  centroid: [number, number];
};

export type CapitalMarker = {
  iso: string;
  name: string;
  x: number;
  y: number;
};

const projection = geoMercator()
  .center([25, 52])
  .scale(650)
  .translate([400, 300]);

const pathGenerator = geoPath(projection);

let countryPathsCache: CountryPath[] | null = null;
let centroidsCache: Map<string, [number, number]> | null = null;
let capitalMarkersCache: CapitalMarker[] | null = null;

function loadCountryFeatures(): Feature<Geometry>[] {
  const topology = countriesTopology as unknown as Topology;
  const collection = topology.objects.countries as GeometryCollection;

  return feature(topology, collection).features;
}

export function isoFromFeature(
  featureId: string | number | undefined,
): string | null {
  if (featureId === undefined || featureId === null) {
    return null;
  }

  const numeric =
    typeof featureId === "string" ? parseInt(featureId, 10) : featureId;

  if (Number.isNaN(numeric)) {
    return null;
  }

  return numericToAlpha2(numeric) ?? null;
}

function buildCountryPaths(): CountryPath[] {
  return loadCountryFeatures()
    .map((countryFeature) => {
      const iso = isoFromFeature(countryFeature.id as string | number);
      const d = pathGenerator(countryFeature);

      if (!d) {
        return null;
      }

      const geographicCentroid = geoCentroid(countryFeature);
      const projectedCentroid = projection(geographicCentroid) ?? [0, 0];

      return {
        d,
        iso,
        isEuropean: iso ? NARA_REGION_COUNTRIES.has(iso) : false,
        centroid: [projectedCentroid[0], projectedCentroid[1]] as [
          number,
          number,
        ],
      };
    })
    .filter((entry): entry is CountryPath => entry !== null);
}

export function getCountryPaths(): CountryPath[] {
  if (!countryPathsCache) {
    countryPathsCache = buildCountryPaths();
  }

  return countryPathsCache;
}

export function getCountryCentroids(): Map<string, [number, number]> {
  if (!centroidsCache) {
    centroidsCache = new Map();

    for (const countryPath of getCountryPaths()) {
      if (countryPath.iso) {
        centroidsCache.set(countryPath.iso, countryPath.centroid);
      }
    }
  }

  return centroidsCache;
}

export function projectCoordinates(
  coordinates: [number, number],
): [number, number] | null {
  const projected = projection(coordinates);

  if (!projected) {
    return null;
  }

  return [projected[0], projected[1]];
}

function isWithinViewBox(x: number, y: number): boolean {
  const margin = 24;

  return (
    x >= NARA_VIEWBOX.minX - margin &&
    x <= NARA_VIEWBOX.width + margin &&
    y >= NARA_VIEWBOX.minY - margin &&
    y <= NARA_VIEWBOX.height + margin
  );
}

function buildCapitalMarkers(capitals: Capital[]): CapitalMarker[] {
  return capitals.flatMap((capital) => {
    const projected = projectCoordinates(capital.coordinates);

    if (!projected) {
      return [];
    }

    const [x, y] = projected;

    if (!isWithinViewBox(x, y)) {
      return [];
    }

    return [{ iso: capital.iso, name: capital.name, x, y }];
  });
}

export function getCapitalMarkers(): CapitalMarker[] {
  if (!capitalMarkersCache) {
    capitalMarkersCache = buildCapitalMarkers(NARA_CAPITALS);
  }

  return capitalMarkersCache;
}
