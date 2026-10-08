import type { MetadataRoute } from "next";

import { absoluteUrl, isNarrativeIndexable } from "@/lib/seo";
import { getNarratives } from "@/sanity/narratives";

const staticRoutes: MetadataRoute.Sitemap = [
  {
    url: absoluteUrl("/"),
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    url: absoluteUrl("/research"),
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: absoluteUrl("/about"),
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    url: absoluteUrl("/contact"),
    changeFrequency: "yearly",
    priority: 0.4,
  },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const narratives = await getNarratives();
  const narrativeRoutes: MetadataRoute.Sitemap = narratives
    .filter((narrative) => isNarrativeIndexable(narrative.overview))
    .map((narrative) => ({
      url: absoluteUrl(`/narratives/${narrative.slug}`),
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  return [...staticRoutes, ...narrativeRoutes];
}
