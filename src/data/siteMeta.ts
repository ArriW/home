import type { HtmlTagDescriptor } from "vite";
import { profile } from "./profile";

export interface SiteMeta {
  readonly canonicalUrl: string;
  readonly themeColor: string;
  readonly title: string;
  readonly description: string;
  readonly ogImagePath: string;
}

export const siteMeta: SiteMeta = {
  canonicalUrl: "https://arriw.netlify.app",
  themeColor: "#09090b",
  title: `${profile.siteTitle} — ${profile.name}`,
  description:
    "Personal site for Arrington Walters — process engineer, statistician, gamer, baker, explorer.",
  ogImagePath: profile.photoUrl,
};

export function buildHeadTags(): HtmlTagDescriptor[] {
  const ogImageUrl = `${siteMeta.canonicalUrl}${siteMeta.ogImagePath}`;
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: siteMeta.canonicalUrl,
    image: ogImageUrl,
    sameAs: profile.social.map((s) => s.url),
  };

  return [
    { tag: "title", children: siteMeta.title, injectTo: "head" },
    {
      tag: "meta",
      attrs: { name: "description", content: siteMeta.description },
      injectTo: "head",
    },
    {
      tag: "meta",
      attrs: { name: "theme-color", content: siteMeta.themeColor },
      injectTo: "head",
    },
    {
      tag: "link",
      attrs: { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      injectTo: "head",
    },
    {
      tag: "meta",
      attrs: { property: "og:type", content: "website" },
      injectTo: "head",
    },
    {
      tag: "meta",
      attrs: { property: "og:url", content: `${siteMeta.canonicalUrl}/` },
      injectTo: "head",
    },
    {
      tag: "meta",
      attrs: { property: "og:title", content: siteMeta.title },
      injectTo: "head",
    },
    {
      tag: "meta",
      attrs: { property: "og:description", content: siteMeta.description },
      injectTo: "head",
    },
    {
      tag: "meta",
      attrs: { property: "og:image", content: ogImageUrl },
      injectTo: "head",
    },
    {
      tag: "meta",
      attrs: { name: "twitter:card", content: "summary_large_image" },
      injectTo: "head",
    },
    {
      tag: "meta",
      attrs: { name: "twitter:title", content: siteMeta.title },
      injectTo: "head",
    },
    {
      tag: "meta",
      attrs: { name: "twitter:description", content: siteMeta.description },
      injectTo: "head",
    },
    {
      tag: "meta",
      attrs: { name: "twitter:image", content: ogImageUrl },
      injectTo: "head",
    },
    {
      tag: "script",
      attrs: { type: "application/ld+json" },
      children: JSON.stringify(personSchema),
      injectTo: "head",
    },
  ];
}
