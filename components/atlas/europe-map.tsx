import { getCountryPaths } from "@/lib/geo";

export function EuropeMap() {
  const paths = getCountryPaths();

  return (
    <svg viewBox="0 0 800 600" className="h-full w-full" aria-hidden>
      {paths.map((path, index) => (
        <path key={index} d={path.d} />
      ))}
    </svg>
  );
}
