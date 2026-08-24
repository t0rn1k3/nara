import type { Narrative, NarrativeParty } from "./types";

function pp(name: string, iso: string): NarrativeParty {
  return { name, iso };
}

export const narratives: Narrative[] = [
  {
    id: "anti-eu",
    slug: "anti-eu",
    name: "Anti-EU narratives",
    category: "Nationalism",
    overview:
      "",
    countries: ["RU", "DE", "HU", "GE"],
    parties: [
      pp("Russia", "RU"),
      pp("Fidesz", "HU"),
      pp("Alternative for Germany (AfD)", "DE"),
      pp("Georgian Dream", "GE"),
    ],
    accentColor: "#9B6B6B",
    keywords: [],
    relatedIds: [],
    sourceCount: 7,
  },
  {
    id: "anti-systemic",
    slug: "anti-systemic",
    name: "Anti-Systemic narratives",
    category: "Nationalism",
    overview:
      "",
    countries: ["RU", "DE", "HU", "GE"],
    parties: [
      pp("Russia", "RU"),
      pp("Fidesz", "HU"),
      pp("Alternative for Germany (AfD)", "DE"),
      pp("Georgian Dream", "GE"),
    ],
    accentColor: "#9B6B6B",
    keywords: [],
    relatedIds: [],
    sourceCount: 7,
  },
  {
    id: "protest",
    slug: "protest",
    name: "Protest narratives",
    category: "Nationalism",
    overview:
      "",
    countries: ["RU", "DE", "HU", "GE"],
    parties: [
      pp("Russia", "RU"),
      pp("Fidesz", "HU"),
      pp("Alternative for Germany (AfD)", "DE"),
      pp("Georgian Dream", "GE"),
    ],
    accentColor: "#9B6B6B",
    keywords: [],
    relatedIds: [],
    sourceCount: 7,
  },
  {
    id: "pro-russian",
    slug: "pro-russian",
    name: "Pro-Russian narratives",
    category: "Nationalism",
    overview:
      "",
    countries: ["RU", "DE", "HU", "GE"],
    parties: [
      pp("Russia", "RU"),
      pp("Fidesz", "HU"),
      pp("Alternative for Germany (AfD)", "DE"),
      pp("Georgian Dream", "GE"),
    ],
    accentColor: "#9B6B6B",
    keywords: [],
    relatedIds: [],
    sourceCount: 7,
  },
  {
    id: "nationalist",
    slug: "nationalist",
    name: "Nationalist narratives",
    category: "Nationalism",
    overview:
      "",
    countries: ["RU", "DE", "HU", "GE"],
    parties: [
      pp("Russia", "RU"),
      pp("Fidesz", "HU"),
      pp("Alternative for Germany (AfD)", "DE"),
      pp("Georgian Dream", "GE"),
    ],
    accentColor: "#9B6B6B",
    keywords: [],
    relatedIds: [],
    sourceCount: 7,
  },
  {
    id: "anti-immigration",
    slug: "anti-immigration",
    name: "Anti-Immigration and Anti-Islamic narratives",
    category: "Nationalism",
    overview:
      "",
    countries: ["RU", "DE", "HU", "GE"],
    parties: [
      pp("Russia", "RU"),
      pp("Fidesz", "HU"),
      pp("Alternative for Germany (AfD)", "DE"),
      pp("Georgian Dream", "GE"),
    ],
    accentColor: "#9B6B6B",
    keywords: [],
    relatedIds: [],
    sourceCount: 7,
  },
  {
    id: "traditional",
    slug: "traditional",
    name: "Traditionalal narratives",
    category: "Nationalism",
    overview:
      "",
    countries: ["RU", "DE", "HU", "GE"],
    parties: [
      pp("Russia", "RU"),
      pp("Fidesz", "HU"),
      pp("Alternative for Germany (AfD)", "DE"),
      pp("Georgian Dream", "GE"),
    ],
    accentColor: "#9B6B6B",
    keywords: [],
    relatedIds: [],
    sourceCount: 7,
  },
  {
    id: "victim",
    slug: "victim",
    name: "Victim narratives",
    category: "Nationalism",
    overview:
      "",
    countries: ["RU", "DE", "HU", "GE"],
    parties: [
      pp("Russia", "RU"),
      pp("Fidesz", "HU"),
      pp("Alternative for Germany (AfD)", "DE"),
      pp("Georgian Dream", "GE"),
    ],
    accentColor: "#9B6B6B",
    keywords: [],
    relatedIds: [],
    sourceCount: 7,
  },
  {
    id: "about-ukraine",
    slug: "about-ukraine",
    name: "Narratives about war in Ukraine",
    category: "Nationalism",
    overview:
      "",
    countries: ["RU", "DE", "HU", "GE"],
    parties: [
      pp("Russia", "RU"),
      pp("Fidesz", "HU"),
      pp("Alternative for Germany (AfD)", "DE"),
      pp("Georgian Dream", "GE"),
    ],
    accentColor: "#9B6B6B",
    keywords: [],
    relatedIds: [],
    sourceCount: 7,
  },
  {
    id: "weak-west",
    slug: "weak-west",
    name: "Narratives of a weak and decadent West",
    category: "Nationalism",
    overview:
      "",
    countries: ["RU", "DE", "HU", "GE"],
    parties: [
      pp("Russia", "RU"),
      pp("Fidesz", "HU"),
      pp("Alternative for Germany (AfD)", "DE"),
      pp("Georgian Dream", "GE"),
    ],
    accentColor: "#9B6B6B",
    keywords: [],
    relatedIds: [],
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
