import type {
  NARRATIVES_QUERY_RESULT,
  NARRATIVE_BY_SLUG_QUERY_RESULT,
} from '@/sanity.types'
import type {Narrative} from '@/lib/types'
import {
  antiImmigrationDetailSeed,
  antiImmigrationListSeed,
} from '@/lib/narratives/anti-immigration-detail'

import {client} from './client'
import {NARRATIVES_QUERY, NARRATIVE_BY_SLUG_QUERY} from './queries'

const fetchOptions = {next: {revalidate: 30}}

type NarrativeProjection = NARRATIVES_QUERY_RESULT[number]
type NarrativeDetail = NonNullable<NARRATIVE_BY_SLUG_QUERY_RESULT>
type RelatedNarrativeProjection = NarrativeDetail['related'][number]

type NarrativeDetailFields = Pick<
  Narrative,
  | 'sources'
  | 'partiesNote'
  | 'countryAppearances'
  | 'comparativePatternIntro'
  | 'comparativePatternOutro'
  | 'comparativePattern'
  | 'commonElements'
  | 'contextSpecificElements'
  | 'relatedTopics'
  | 'comparativeTakeaway'
>

const emptyDetailFields: NarrativeDetailFields = {
  sources: [],
  partiesNote: '',
  countryAppearances: [],
  comparativePatternIntro: '',
  comparativePatternOutro: '',
  comparativePattern: [],
  commonElements: [],
  contextSpecificElements: [],
  relatedTopics: [],
  comparativeTakeaway: '',
}

function mapSources(
  value: NarrativeDetail['sources'] | undefined,
): Narrative['sources'] {
  if (!value?.length) return []

  return value.flatMap((source) => {
    if (!source._id || !source.title || !source.url) return []

    return [
      {
        id: source._id,
        title: source.title,
        url: source.url,
        publisher: source.publisher ?? '',
        publishedAt: source.publishedAt ?? '',
      },
    ]
  })
}

function mapCountryAppearances(
  value: NarrativeDetail['countryAppearances'] | undefined,
): Narrative['countryAppearances'] {
  if (!value?.length) return []

  return value.flatMap((item) => {
    if (!item._key || !item.heading) return []

    return [
      {
        _key: item._key,
        heading: item.heading,
        countryIso: item.countryIso ?? undefined,
        paragraphs: (item.paragraphs ?? []).flatMap((paragraph) =>
          paragraph._key && paragraph.text
            ? [{_key: paragraph._key, text: paragraph.text}]
            : [],
        ),
        bullets: item.bullets?.filter(Boolean) ?? [],
        structureSteps: item.structureSteps?.filter(Boolean) ?? [],
      },
    ]
  })
}

function mapComparativePattern(
  value: NarrativeDetail['comparativePattern'] | undefined,
): Narrative['comparativePattern'] {
  if (!value?.length) return []

  return value.flatMap((row) => {
    if (!row._key || !row.countryLabel) return []

    return [
      {
        _key: row._key,
        countryLabel: row.countryLabel,
        mainArticulation: row.mainArticulation ?? '',
        primaryThreat: row.primaryThreat ?? '',
      },
    ]
  })
}

function mapContextSpecificElements(
  value: NarrativeDetail['contextSpecificElements'] | undefined,
): Narrative['contextSpecificElements'] {
  if (!value?.length) return []

  return value.flatMap((item) => {
    if (!item._key || !item.label) return []

    return [
      {
        _key: item._key,
        label: item.label,
        description: item.description ?? '',
      },
    ]
  })
}

function mapRelatedTopics(
  value: NarrativeDetail['relatedTopics'] | undefined,
): Narrative['relatedTopics'] {
  if (!value?.length) return []

  return value.flatMap((item) => {
    if (!item._key || !item.title) return []

    return [
      {
        _key: item._key,
        title: item.title,
        description: item.description ?? '',
      },
    ]
  })
}

function detailFieldsFrom(value: NarrativeDetail): NarrativeDetailFields {
  return {
    sources: mapSources(value.sources),
    partiesNote: value.partiesNote ?? '',
    countryAppearances: mapCountryAppearances(value.countryAppearances),
    comparativePatternIntro: value.comparativePatternIntro ?? '',
    comparativePatternOutro: value.comparativePatternOutro ?? '',
    comparativePattern: mapComparativePattern(value.comparativePattern),
    commonElements: value.commonElements?.filter(Boolean) ?? [],
    contextSpecificElements: mapContextSpecificElements(
      value.contextSpecificElements,
    ),
    relatedTopics: mapRelatedTopics(value.relatedTopics),
    comparativeTakeaway: value.comparativeTakeaway ?? '',
  }
}

function withDetailSeed(
  slug: string | null | undefined,
  detail: NarrativeDetailFields,
): {detail: NarrativeDetailFields; usedFallbackSeed: boolean} {
  if (slug !== 'anti-immigration' || detail.countryAppearances.length > 0) {
    return {detail, usedFallbackSeed: false}
  }

  return {
    detail: {...detail, ...antiImmigrationDetailSeed},
    usedFallbackSeed: true,
  }
}

function toNarrative(
  value: NarrativeProjection | NarrativeDetail | RelatedNarrativeProjection,
  detail: NarrativeDetailFields = emptyDetailFields,
  options?: {applyAntiImmigrationSeed?: boolean},
): Narrative {
  const slug = value.slug ?? value._id
  const useAntiImmigrationSeed =
    options?.applyAntiImmigrationSeed &&
    slug === 'anti-immigration' &&
    detail.countryAppearances.length > 0

  return {
    id: value.id ?? value._id,
    slug,
    name: value.name ?? 'Untitled narrative',
    overview: value.overview,
    countries: useAntiImmigrationSeed
      ? [...antiImmigrationListSeed.countries]
      : value.countries,
    parties: useAntiImmigrationSeed
      ? [...antiImmigrationListSeed.parties]
      : value.parties.flatMap((party) =>
          party.name && party.iso ? [{name: party.name, iso: party.iso}] : [],
        ),
    accentColor: value.accentColor,
    keywords: value.keywords?.map((keyword) => keyword.trim()).filter(Boolean) ?? [],
    relatedIds: value.relatedIds.flatMap((id) => (id ? [id] : [])),
    sourceCount: value.sourceCount ?? 0,
    ...detail,
  }
}

const PRIORITY_LIST_SLUG = 'anti-immigration'

function withPriorityNarrativeFirst(narratives: Narrative[]): Narrative[] {
  const index = narratives.findIndex((n) => n.slug === PRIORITY_LIST_SLUG)
  if (index <= 0) return narratives
  const reordered = [...narratives]
  const [priority] = reordered.splice(index, 1)
  reordered.unshift(priority)
  return reordered
}

export async function getNarratives(): Promise<Narrative[]> {
  const result = await client.fetch(NARRATIVES_QUERY, {}, fetchOptions)
  return withPriorityNarrativeFirst(
    result.map((item: NarrativeProjection) => toNarrative(item)),
  )
}

export async function getNarrativeBySlug(
  slug: string,
): Promise<{narrative: Narrative; related: Narrative[]} | null> {
  const result = await client.fetch(NARRATIVE_BY_SLUG_QUERY, {slug}, fetchOptions)

  if (!result) return null

  const {detail, usedFallbackSeed} = withDetailSeed(
    result.slug,
    detailFieldsFrom(result),
  )

  return {
    narrative: toNarrative(result, detail, {
      applyAntiImmigrationSeed: usedFallbackSeed,
    }),
    related: result.related.map((item: RelatedNarrativeProjection) =>
      toNarrative(item),
    ),
  }
}
