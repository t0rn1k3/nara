import {defineQuery} from 'next-sanity'

export const ABOUT_PAGE_QUERY = defineQuery(`
  *[_id == "aboutPage"][0] {
    heading,
    introduction,
    "body": coalesce(body[]{_key, text}, [])
  }
`)

export const CONTACT_PAGE_QUERY = defineQuery(`
  *[_id == "contactPage"][0] {
    heading,
    introduction,
    email,
    "enquiryLinks": coalesce(enquiryLinks[]{_key, label, subject}, [])
  }
`)

const narrativeListFields = `
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
`

const narrativeDetailFields = `
    "partiesNote": coalesce(partiesNote, ""),
    "comparativePatternIntro": coalesce(comparativePatternIntro, ""),
    "comparativePatternOutro": coalesce(comparativePatternOutro, ""),
    "countryAppearances": coalesce(countryAppearances[]{
      _key,
      heading,
      countryIso,
      "paragraphs": coalesce(paragraphs[]{_key, text}, []),
      "bullets": coalesce(bullets, []),
      "structureSteps": coalesce(structureSteps, [])
    }, []),
    "comparativePattern": coalesce(comparativePattern[]{
      _key,
      countryLabel,
      mainArticulation,
      primaryThreat
    }, []),
    "commonElements": coalesce(commonElements, []),
    "contextSpecificElements": coalesce(contextSpecificElements[]{
      _key,
      label,
      description
    }, []),
    "relatedTopics": coalesce(relatedTopics[]{
      _key,
      title,
      description
    }, []),
    "comparativeTakeaway": coalesce(comparativeTakeaway, "")
`

export const NARRATIVES_QUERY = defineQuery(`
  *[_type == "narrative" && defined(slug.current)]
  | order(name asc) {
    ${narrativeListFields}
  }
`)

export const NARRATIVE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "narrative" && slug.current == $slug][0] {
    ${narrativeListFields},
    ${narrativeDetailFields},
    "related": coalesce(relatedNarratives[]->{
      ${narrativeListFields}
    }, [])
  }
`)
