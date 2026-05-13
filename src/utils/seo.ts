import { site } from '../constants/swaroData'

/** One step in a trail; omit `path` on the last item to mean the current page `path` from PageMeta. */
export type BreadcrumbJsonLdItem = {
  name: string
  path?: string
}

export type SchemaPageType = 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage'

/** One row for optional `ItemList` JSON-LD (e.g. partner categories, service lines). */
export type SeoItemListEntry = {
  name: string
  description?: string
}

export type PageMeta = {
  title: string
  /** 140–160 characters ideal for Google snippets */
  description: string
  path?: string
  /** Absolute URL or site-root path for og:image & twitter:image */
  image?: string
  /** Page-specific Open Graph / Twitter image alt (accessibility + some platforms) */
  ogImageAlt?: string
  /** Optional comma-separated keywords */
  keywords?: string
  /** JSON-LD page type; default WebPage */
  schemaPageType?: SchemaPageType
  /** Renders BreadcrumbList + links from WebPage to it */
  breadcrumbs?: readonly BreadcrumbJsonLdItem[]
  /**
   * Optional ItemList (schema.org) merged into JSON-LD `@graph`, linked as `mainEntity` when present.
   * Use for indexable lists such as partnership sectors or service categories.
   */
  itemList?: readonly SeoItemListEntry[]
}

export function absoluteUrl(path = ''): string {
  const base = site.url.replace(/\/$/, '')
  const p = path.startsWith('/') ? path : `/${path}`
  return `${base}${p === '//' ? '/' : p}`
}

export function resolveOgImage(image?: string): string {
  if (!image) return absoluteUrl(site.defaultOgImagePath)
  if (image.startsWith('http://') || image.startsWith('https://')) return image
  return absoluteUrl(image)
}

export function buildTitle(pageTitle: string): string {
  const t = pageTitle.trim()
  if (t === site.homeTitle || t === site.fullName) return site.homeTitle
  return `${t} · ${site.fullName}`
}

/** ~160 chars for meta / Open Graph / Twitter (matches prerender script). */
export function truncateShareDescription(text: string, max = 158): string {
  const t = text.replace(/\s+/g, ' ').trim()
  if (t.length <= max) return t
  const slice = t.slice(0, max - 1)
  const lastSpace = slice.lastIndexOf(' ')
  const cut = lastSpace > 48 ? lastSpace : max - 1
  return `${slice.slice(0, cut).trimEnd()}…`
}
