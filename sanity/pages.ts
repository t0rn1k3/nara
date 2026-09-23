import {client} from './client'
import {ABOUT_PAGE_QUERY, CONTACT_PAGE_QUERY} from './queries'

export type AboutPageContent = {
  heading: string
  introduction: string
  body: Array<{_key: string; text: string}>
}

export type ContactPageContent = {
  heading: string
  subheading: string
  bodyText: string
  email: string
  location: string
}

function parseContactIntroduction(introduction: string) {
  const parts = introduction
    .split(/\n\n+/)
    .map((part) => part.trim())
    .filter(Boolean)

  return {
    subheading: parts[0] ?? '',
    bodyText: parts[1] ?? '',
    location: parts[2] ?? '',
  }
}

const defaultAboutPage: AboutPageContent = {
  heading: 'About NARA',
  introduction:
    'NARA is the overarching research initiative. The European Narrative Atlas is its main interactive product.',
  body: [
    {
      _key: 'initiative',
      text: 'NARA is an independent research initiative focused on political narratives, their development across different political and geographic contexts, and their role in the contemporary information environment.',
    },
    {
      _key: 'atlas',
      text: 'The European Narrative Atlas is an interactive research platform designed to explore how political narratives appear across countries, political actors and contexts.',
    },
    {
      _key: 'research',
      text: 'The project is based on qualitative research and comparative analysis of political communication and develops a structured approach to identifying and examining recurring narrative patterns across Europe and its wider neighbourhood.',
    },
    {
      _key: 'purpose',
      text: 'The Atlas is intended as a research and public-facing tool, making complex patterns in political communication easier to explore and understand.',
    },
  ],
}

const defaultContactIntroduction = [
  'Get in touch with NARA',
  'For research enquiries, collaboration proposals, media enquiries or questions about the European Narrative Atlas, please contact us at:',
  'Based in Prague, Czechia',
].join('\n\n')

const defaultContactPage: ContactPageContent = {
  heading: 'CONTACT NARA',
  ...parseContactIntroduction(defaultContactIntroduction),
  email: 'theatlasnara@gmail.com',
}

const fetchOptions = {next: {revalidate: 30}}

export async function getAboutPage(): Promise<AboutPageContent> {
  const page = await client.fetch<Partial<AboutPageContent> | null>(
    ABOUT_PAGE_QUERY,
    {},
    fetchOptions,
  )
  const body = page?.body?.filter((paragraph) => paragraph._key && paragraph.text)

  return {
    heading: page?.heading || defaultAboutPage.heading,
    introduction: page?.introduction || defaultAboutPage.introduction,
    body: body?.length ? body : defaultAboutPage.body,
  }
}

export async function getContactPage(): Promise<ContactPageContent> {
  const page = await client.fetch<{heading?: string; introduction?: string; email?: string} | null>(
    CONTACT_PAGE_QUERY,
    {},
    fetchOptions,
  )
  const introduction = page?.introduction || defaultContactIntroduction
  const parsedIntroduction = parseContactIntroduction(introduction)

  return {
    heading: page?.heading || defaultContactPage.heading,
    subheading: parsedIntroduction.subheading || defaultContactPage.subheading,
    bodyText: parsedIntroduction.bodyText || defaultContactPage.bodyText,
    email: page?.email || defaultContactPage.email,
    location: parsedIntroduction.location || defaultContactPage.location,
  }
}
