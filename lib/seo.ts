import type { Metadata } from "next";

export const SITE_NAME = "NARA";
export const SITE_URL = new URL("https://na-ra.org");
export const DEFAULT_TITLE = "NARA — The European Narrative Atlas";
export const DEFAULT_DESCRIPTION =
  "Independent geopolitical research platform mapping political narratives across Europe.";

const SOCIAL_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "NARA — The European Narrative Atlas",
};

export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE_URL).toString();
}

export function isNarrativeIndexable(overview: string): boolean {
  return overview.trim().length >= 120;
}

export function toSearchDescription(value: string, maxLength = 160): string {
  const normalized = value.replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLength) return normalized;

  const clipped = normalized.slice(0, maxLength - 1);
  const lastSpace = clipped.lastIndexOf(" ");
  const boundary = lastSpace > maxLength * 0.7 ? lastSpace : clipped.length;

  return `${clipped.slice(0, boundary).replace(/[.,;:!?-]+$/, "")}…`;
}

export function createPageMetadata({
  title,
  description,
  path,
  indexable = true,
}: {
  title: string;
  description: string;
  path: string;
  indexable?: boolean;
}): Metadata {
  const socialTitle = path === "/" ? title : `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    robots: indexable
      ? {
          index: true,
          follow: true,
        }
      : {
          index: false,
          follow: true,
          googleBot: {
            index: false,
            follow: true,
          },
        },
    openGraph: {
      type: "website",
      locale: "en_GB",
      url: path,
      siteName: SITE_NAME,
      title: socialTitle,
      description,
      images: [SOCIAL_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [SOCIAL_IMAGE.url],
    },
  };
}

export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
