import { narratives } from "@/lib/narratives";
import { NarrativeItem } from "./narrative-item";

export function NarrativeList() {
  return (
    <section>
      <header>
        <h2>POLITICAL NARRATIVES</h2>
        <span>{narratives.length} tracked</span>
      </header>
      <ul>
        {narratives.map((narrative) => (
          <NarrativeItem key={narrative.id} narrative={narrative} />
        ))}
      </ul>
    </section>
  );
}
