import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

import {dataset, projectId} from './sanity/env'
import {schemaTypes} from './sanity/schemaTypes'

const dev = process.env.NODE_ENV === 'development'

/** Next.js serves the studio at /studio; hosted Sanity (na-ra.sanity.studio, sanity.io dashboard) serves at /. */
function getStudioBasePath(): string {
  if (typeof window === 'undefined') {
    return '/studio'
  }

  const {hostname, pathname} = window.location

  if (hostname.endsWith('.sanity.studio') || hostname.endsWith('sanity.io')) {
    return '/'
  }

  if (pathname === '/studio' || pathname.startsWith('/studio/')) {
    return '/studio'
  }

  return '/'
}

const basePath = getStudioBasePath()

export default defineConfig({
  name: 'nara',
  title: 'NA-RA — Narrative Atlas',
  projectId,
  dataset,
  basePath,
  plugins: [structureTool(), ...(dev ? [visionTool()] : [])],
  schema: {
    types: schemaTypes,
  },
})
