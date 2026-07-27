import { AsideFooter } from "./aside-footer";
import { AsideMasthead } from "./aside-masthead";
import { NarrativeList } from "./narrative-list";

export function NarrativeAside() {
  return (
    <aside className="flex h-full max-h-full flex-col overflow-hidden rounded-xl border border-nara-grey-300/25 bg-nara-off-white/95 text-nara-navy shadow-[0_8px_32px_rgba(11,20,38,0.18)] backdrop-blur-md">
      <AsideMasthead />
      <div className="min-h-0 flex-1 overflow-y-auto">
        <NarrativeList />
      </div>
      <AsideFooter />
    </aside>
  );
}
