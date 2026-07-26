import { EuropeMap } from "./europe-map";

export function MapPanel() {
  return (
    <div className="relative h-full w-full bg-[var(--map-ocean)]">
      <EuropeMap />
      <p className="pointer-events-none absolute right-4 bottom-3 font-mono text-[10px] tracking-wide text-[var(--map-capital-label)]/70">
        Natural Earth · 1 : 110 000 000
      </p>
    </div>
  );
}
