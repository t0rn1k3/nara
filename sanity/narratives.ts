import type {
  NARRATIVES_QUERY_RESULT,
  NARRATIVE_BY_SLUG_QUERY_RESULT,
} from '@/sanity.types'
import type {Narrative} from '@/lib/types'

import {client} from './client'
import {NARRATIVES_QUERY, NARRATIVE_BY_SLUG_QUERY} from './queries'

const fetchOptions = {next: {revalidate: 30}}

type NarrativeProjection = NARRATIVES_QUERY_RESULT[number]
type NarrativeDetail = NonNullable<NARRATIVE_BY_SLUG_QUERY_RESULT>
type RelatedNarrativeProjection = NarrativeDetail['related'][number]

function toNarrative(
  value: NarrativeProjection | NarrativeDetail | RelatedNarrativeProjection,
): Narrative {
  return {
    id: value.id ?? value._id,
    slug: value.slug ?? value._id,
    name: value.name ?? 'Untitled narrative',
    overview: value.overview,
    countries: value.countries,
    parties: value.parties.flatMap((party) =>
      party.name && party.iso ? [{name: party.name, iso: party.iso}] : [],
    ),
    accentColor: value.accentColor,
    keywords: value.keywords,
    relatedIds: value.relatedIds.flatMap((id) => (id ? [id] : [])),
    sourceCount: value.sourceCount ?? 0,
  }
}

export async function getNarratives(): Promise<Narrative[]> {
  const result = await client.fetch(NARRATIVES_QUERY, {}, fetchOptions)
  return result.map(toNarrative)
}

export async function getNarrativeBySlug(
  slug: string,
): Promise<{narrative: Narrative; related: Narrative[]} | null> {
  const result = await client.fetch(NARRATIVE_BY_SLUG_QUERY, {slug}, fetchOptions)

  if (!result) return null

  return {
    narrative: toNarrative(result),
    related: result.related.map(toNarrative),
  }
}
