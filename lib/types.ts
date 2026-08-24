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
  countries: string[];
  parties: NarrativeParty[];
  accentColor: string;
  keywords: string[];
  relatedIds: string[];
  sourceCount: number;
};
