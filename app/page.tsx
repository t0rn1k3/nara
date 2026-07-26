import { MapPanel } from "@/components/atlas/map-panel";
import { NarrativeAside } from "@/components/narratives/narrative-aside";

export default function Home() {
  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-nara-navy text-nara-off-white lg:flex-row">
      <div className="h-[50vh] w-full lg:h-full lg:w-[75%]">
        <MapPanel />
      </div>
      <div className="h-[50vh] w-full border-t border-nara-grey-200 lg:h-full lg:w-[25%] lg:border-t-0 lg:border-l">
        <NarrativeAside />
      </div>
    </div>
  );
}
