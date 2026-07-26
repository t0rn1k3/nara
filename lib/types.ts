export type NarrativeTimelineEntry = {
  year: number;
  label: string;
};

export type Narrative = {
  id: string;
  slug: string;
  name: string;
  category: string;
  overview: string;
  countries: string[];
  accentColor: string;
  timeline: NarrativeTimelineEntry[];
  actors: string[];
  keywords: string[];
  relatedIds: string[];
  yearFrom: number;
  yearTo: number;
  sourceCount: number;
};
