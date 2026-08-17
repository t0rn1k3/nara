import { geoCentroid, geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";
import type { Feature, Geometry } from "geojson";

import countriesTopology from "../public/data/countries-110m.json";
import { NARA_CAPITALS, type Capital } from "./capitals";
import { numericToAlpha2 } from "./iso-numeric";

/**
 * Framed around the same center as the original 848×477 crop, with the visible
 * area expanded by 25% on each axis so the rendered geography is 20% smaller.
 * This keeps Norway and Portugal inside the frame while retaining the Caspian
 * basin and western Central Asia.
 */
export const NARA_VIEWBOX = {
  width: 1060,
  height: 596.25,
  minX: 49,
  minY: -24.625,
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
  "KZ",
  "TM",
  "IR",
]);

/** Eastern map boundary on the Caspian Sea — [longitude, latitude]. */
export const MAP_EASTERN_BOUNDARY: [number, number] = [50.422816, 42.09603];

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
  country: string;
  x: number;
  y: number;
};

/** Manual nudges for capitals whose projected coords overlap a neighbor. */
const CAPITAL_MARKER_OFFSETS: Partial<
  Record<string, { dx: number; dy: number }>
> = {
  SK: {
    dx: NARA_VIEWBOX.width * 0.02,
    dy: -NARA_VIEWBOX.height * 0.02,
  },
};

const projection = geoMercator()
  .center([14, 48.25])
  .scale(590)
  .translate([425, 310]);

const pathGenerator = geoPath(projection);

/** Stable decimals for SSR/client hydration — sub-pixel at 800×600. */
const PROJECTION_PRECISION = 2;

function roundProjection(value: number): number {
  const factor = 10 ** PROJECTION_PRECISION;
  return Math.round(value * factor) / factor;
}

function roundSvgPath(path: string): string {
  return path.replace(/-?\d*\.?\d+(?:e[-+]?\d+)?/gi, (match) => {
    const value = Number(match);
    if (!Number.isFinite(value)) return match;
    return String(roundProjection(value));
  });
}

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

function shouldIncludeCountry(iso: string | null): boolean {
  return iso !== null && NARA_REGION_COUNTRIES.has(iso);
}

function buildCountryPaths(): CountryPath[] {
  return loadCountryFeatures()
    .map((countryFeature) => {
      const iso = isoFromFeature(countryFeature.id as string | number);
      const geographicCentroid = geoCentroid(countryFeature);

      if (!shouldIncludeCountry(iso)) {
        return null;
      }

      const rawPath = pathGenerator(countryFeature);

      if (!rawPath) {
        return null;
      }

      const d = roundSvgPath(rawPath);
      const projectedCentroid =
        projectCoordinates([
          geographicCentroid[0],
          geographicCentroid[1],
        ]) ?? ([0, 0] as [number, number]);

      return {
        d,
        iso,
        isEuropean: iso ? NARA_REGION_COUNTRIES.has(iso) : false,
        centroid: projectedCentroid,
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

  return [roundProjection(projected[0]), roundProjection(projected[1])];
}

function isWithinViewBox(x: number, y: number): boolean {
  const margin = 24;
  const maxX = NARA_VIEWBOX.minX + NARA_VIEWBOX.width;
  const maxY = NARA_VIEWBOX.minY + NARA_VIEWBOX.height;

  return (
    x >= NARA_VIEWBOX.minX - margin &&
    x <= maxX + margin &&
    y >= NARA_VIEWBOX.minY - margin &&
    y <= maxY + margin
  );
}

function buildCapitalMarkers(capitals: Capital[]): CapitalMarker[] {
  const markers = capitals.flatMap((capital) => {
    const projected = projectCoordinates(capital.coordinates);

    if (!projected) {
      return [];
    }

    const offset = CAPITAL_MARKER_OFFSETS[capital.iso];
    const x = roundProjection(projected[0] + (offset?.dx ?? 0));
    const y = roundProjection(projected[1] + (offset?.dy ?? 0));

    if (!isWithinViewBox(x, y)) {
      return [];
    }

    return [{ iso: capital.iso, name: capital.name, country: capital.country, x, y }];
  });

  return markers;
}

export function getCapitalMarkers(): CapitalMarker[] {
  if (!capitalMarkersCache) {
    capitalMarkersCache = buildCapitalMarkers(NARA_CAPITALS);
  }

  return capitalMarkersCache;
}
