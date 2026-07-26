import { MapPanel } from "@/components/atlas/map-panel";
import { NarrativeAside } from "@/components/narratives/narrative-aside";

export default function Home() {
  return (
    <div className="flex h-dvh flex-col overflow-hidden lg:flex-row">
      <div className="h-[50vh] w-full lg:h-full lg:w-[70%]">
        <MapPanel />
      </div>
      <div className="h-[50vh] w-full border-t lg:h-full lg:w-[30%] lg:border-t-0 lg:border-l">
        <NarrativeAside />
      </div>
    </div>
  );
}
