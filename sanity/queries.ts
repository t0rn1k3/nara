import {defineQuery} from 'next-sanity'

export const NARRATIVES_QUERY = defineQuery(`
  *[_type == "narrative" && defined(slug.current)]
  | order(name asc) {
    _id,
    "id": slug.current,
    "slug": slug.current,
    name,
    "overview": coalesce(overview, ""),
    "countries": coalesce(countries, []),
    "parties": coalesce(parties[]{_key, name, iso}, []),
    "accentColor": coalesce(accentColor, "#9B6B6B"),
    "keywords": coalesce(keywords, []),
    "relatedIds": coalesce(relatedNarratives[]->slug.current, []),
    "sourceCount": count(sources)
  }
`)

export const NARRATIVE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "narrative" && slug.current == $slug][0] {
    _id,
    "id": slug.current,
    "slug": slug.current,
    name,
    "overview": coalesce(overview, ""),
    "countries": coalesce(countries, []),
    "parties": coalesce(parties[]{_key, name, iso}, []),
    "accentColor": coalesce(accentColor, "#9B6B6B"),
    "keywords": coalesce(keywords, []),
    "relatedIds": coalesce(relatedNarratives[]->slug.current, []),
    "sourceCount": count(sources),
    "related": coalesce(relatedNarratives[]->{
      _id,
      "id": slug.current,
      "slug": slug.current,
      name,
      "overview": coalesce(overview, ""),
      "countries": coalesce(countries, []),
      "parties": coalesce(parties[]{_key, name, iso}, []),
      "accentColor": coalesce(accentColor, "#9B6B6B"),
      "keywords": coalesce(keywords, []),
      "relatedIds": coalesce(relatedNarratives[]->slug.current, []),
      "sourceCount": count(sources)
    }, [])
  }
`)
