import type { Narrative, NarrativeParty } from "./types";

function pp(name: string, iso: string): NarrativeParty {
  return { name, iso };
}

export const narratives: Narrative[] = [
  {
    id: "foreign-agent",
    slug: "foreign-agent",
    name: "Foreign Agent",
    category: "State Control",
    overview:
      "A legal and rhetorical frame used to discredit independent media, NGOs, and civil society by labelling them as instruments of foreign influence. Originating in post-Soviet legislation, the narrative has diffused across Central Europe and the Caucasus as governments tighten information controls.",
    countries: ["RU", "BY", "HU", "GE", "KZ", "AZ", "TR"],
    parties: [
      pp("United Russia", "RU"),
      pp("Belaya Rus", "BY"),
      pp("Fidesz", "HU"),
      pp("Georgian Dream", "GE"),
      pp("Amanat", "KZ"),
      pp("New Azerbaijan Party", "AZ"),
      pp("Justice and Development Party (AKP)", "TR"),
    ],
    accentColor: "#9B6B6B",
    keywords: [
      "foreign influence",
      "NGO",
      "media registration",
      "national security",
      "sovereignty",
    ],
    relatedIds: ["liberal-dictatorship", "anti-west", "sovereignty"],
    sourceCount: 7,
  },
];

export function getNarrativeBySlug(slug: string): Narrative | undefined {
  return narratives.find((narrative) => narrative.slug === slug);
}

export function getRelatedNarratives(id: string): Narrative[] {
  const narrative = narratives.find((entry) => entry.id === id);
  if (!narrative) return [];

  return narrative.relatedIds
    .map((relatedId) => narratives.find((entry) => entry.id === relatedId))
    .filter((entry): entry is Narrative => entry !== undefined);
}
