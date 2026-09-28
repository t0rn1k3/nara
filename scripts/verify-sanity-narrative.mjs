import {createClient} from 'next-sanity'
import {readFileSync} from 'node:fs'
import {resolve} from 'node:path'

try {
  const envPath = resolve(process.cwd(), '.env')
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const name = trimmed.slice(0, eq).trim()
    let val = trimmed.slice(eq + 1).trim()
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1)
    }
    if (!process.env[name]) process.env[name] = val
  }
} catch {
  // optional
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_WRITE_TOKEN

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-08-27',
  token,
  useCdn: false,
})

const SLUG = 'anti-immigration'

const docs = await client.fetch(
  `*[_type == "narrative" && slug.current == $slug]{
    _id,
    name,
    overview,
    "keywordCount": count(keywords),
    "appearanceCount": count(countryAppearances),
    "appearances": countryAppearances[]{heading, "paragraphs": count(paragraphs), "bullets": count(bullets)},
    "gePara2End": countryAppearances[countryIso == "GE"][0].paragraphs[1].text,
  }`,
  {slug: SLUG},
)

const drafts = await client.fetch(
  `*[_id in path("drafts.**") && _type == "narrative" && slug.current == $slug]{ _id, name }`,
  {slug: SLUG},
)

console.log(JSON.stringify({projectId, dataset, published: docs, drafts}, null, 2))
