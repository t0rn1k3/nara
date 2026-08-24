/** 0–1 scale: 1 = central originator, lower = peripheral adoption */
export type NarrativeCountry = {
  iso: string;
  strength: number;
};

export type NarrativeParty = {
  name: string;
  iso: string;
};

export type Narrative = {
  id: string;
  slug: string;
  name: string;
  category: string;
  overview: string;
  countries: NarrativeCountry[];
  parties: NarrativeParty[];
  accentColor: string;
  keywords: string[];
  relatedIds: string[];
  sourceCount: number;
};
