export type NarrativeParty = {
  name: string;
  iso: string;
};

export type NarrativeParagraph = {
  _key: string;
  text: string;
};

export type NarrativeCountryAppearance = {
  _key: string;
  heading: string;
  countryIso?: string;
  paragraphs: NarrativeParagraph[];
  bullets: string[];
  structureSteps: string[];
};

export type ComparativePatternRow = {
  _key: string;
  countryLabel: string;
  mainArticulation: string;
  primaryThreat: string;
};

export type ContextSpecificElement = {
  _key: string;
  label: string;
  description: string;
};

export type RelatedTopic = {
  _key: string;
  title: string;
  description: string;
};

export type Narrative = {
  id: string;
  slug: string;
  name: string;
  overview: string;
  countries: string[];
  parties: NarrativeParty[];
  partiesNote: string;
  accentColor: string;
  keywords: string[];
  relatedIds: string[];
  sourceCount: number;
  countryAppearances: NarrativeCountryAppearance[];
  comparativePatternIntro: string;
  comparativePatternOutro: string;
  comparativePattern: ComparativePatternRow[];
  commonElements: string[];
  contextSpecificElements: ContextSpecificElement[];
  relatedTopics: RelatedTopic[];
  comparativeTakeaway: string;
};
