import type { Narrative } from "@/lib/types";

type NarrativeItemProps = {
  narrative: Narrative;
};

export function NarrativeItem({ narrative }: NarrativeItemProps) {
  return (
    <li>
      <span>{narrative.name}</span>
    </li>
  );
}
