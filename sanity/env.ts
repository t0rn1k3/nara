// Next.js inlines NEXT_PUBLIC_*. `sanity deploy` only inlines SANITY_STUDIO_*.
export const projectId = (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  process.env.SANITY_STUDIO_PROJECT_ID)!

export const dataset = (process.env.NEXT_PUBLIC_SANITY_DATASET ||
  process.env.SANITY_STUDIO_DATASET)!

export const apiVersion = '2026-08-27'
