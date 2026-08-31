import {client} from './client'
import {ABOUT_PAGE_QUERY, CONTACT_PAGE_QUERY} from './queries'

export type AboutPageContent = {
  heading: string
  introduction: string
  body: Array<{_key: string; text: string}>
}

export type ContactPageContent = {
  heading: string
  introduction: string
  email: string
  enquiryLinks: Array<{_key: string; label: string; subject: string}>
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

const defaultContactPage: ContactPageContent = {
  heading: 'Contact NARA',
  introduction: 'For research enquiries, collaboration, media enquiries or other questions:',
  email: 'contact@example.com',
  enquiryLinks: [
    {_key: 'research', label: 'Research collaborations', subject: 'Research collaboration enquiry'},
    {_key: 'media', label: 'Media enquiries', subject: 'Media enquiry'},
    {_key: 'general', label: 'General enquiries', subject: 'General enquiry'},
  ],
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
  const page = await client.fetch<Partial<ContactPageContent> | null>(
    CONTACT_PAGE_QUERY,
    {},
    fetchOptions,
  )
  const enquiryLinks = page?.enquiryLinks?.filter(
    (link) => link._key && link.label && link.subject,
  )

  return {
    heading: page?.heading || defaultContactPage.heading,
    introduction: page?.introduction || defaultContactPage.introduction,
    email: page?.email || defaultContactPage.email,
    enquiryLinks: enquiryLinks?.length ? enquiryLinks : defaultContactPage.enquiryLinks,
  }
}
