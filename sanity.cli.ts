import {defineCliConfig} from 'sanity/cli'

import {dataset, projectId} from './sanity/env'

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  studioHost: 'na-ra',
  deployment: {
    appId: 'yyjjsre2mkwctqu0kb2g3f8a',
  },
  typegen: {
    path: './sanity/**/*.{ts,tsx,js,jsx}',
    schema: './schema.json',
    generates: './sanity.types.ts',
    overloadClientMethods: true,
  },
})
