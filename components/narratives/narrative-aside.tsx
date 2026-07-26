import { AsideFooter } from "./aside-footer";
import { AsideMasthead } from "./aside-masthead";
import { NarrativeList } from "./narrative-list";

export function NarrativeAside() {
  return (
    <aside className="flex h-full flex-col">
      <AsideMasthead />
      <NarrativeList />
      <AsideFooter />
    </aside>
  );
}
