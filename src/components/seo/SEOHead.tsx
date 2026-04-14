import { useEffect } from 'react'
import { site } from '../../constants/swaroData'
import type { BreadcrumbJsonLdItem, PageMeta } from '../../utils/seo'
import { absoluteUrl, buildTitle, resolveOgImage } from '../../utils/seo'

type Props = PageMeta

const JSON_LD_ID = 'swaro-jsonld'

function itemListJsonLd(
  items: readonly { name: string; description?: string }[],
  itemListId: string,
  listName: string
): Record<string, unknown> | null {
  if (!items.length) return null
  return {
    '@type': 'ItemList',
    '@id': itemListId,
    name: listName,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Thing',
        name: item.name,
        ...(item.description ? { description: item.description } : {}),
      },
    })),
  }
}

function breadcrumbListJsonLd(
  items: readonly BreadcrumbJsonLdItem[],
  currentPath: string,
  breadcrumbId: string
): Record<string, unknown> | null {
  if (!items.length) return null
  const normalizedPath = currentPath.startsWith('/') ? currentPath : `/${currentPath}`
  const itemListElement = items.map((item, index) => {
    const isLast = index === items.length - 1
    const path = item.path ?? (isLast ? normalizedPath : '/')
    const p = path.startsWith('/') ? path : `/${path}`
    return {
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(p === '//' ? '/' : p),
    }
  })
  return {
    '@type': 'BreadcrumbList',
    '@id': breadcrumbId,
    itemListElement,
  }
}

export default function SEOHead({
  title,
  description,
  path = '',
  image,
  ogImageAlt,
  keywords,
  schemaPageType = 'WebPage',
  breadcrumbs,
  itemList,
}: Props) {
  const fullTitle = buildTitle(title)
  const url = absoluteUrl(path)
  const ogImage = resolveOgImage(image)
  const imageAlt = ogImageAlt?.trim() || `${site.fullName} — ${title.trim()}`
  const orgId = `${site.url.replace(/\/$/, '')}/#organization`
  const websiteId = `${site.url.replace(/\/$/, '')}/#website`
  const webpageId = `${url}#webpage`
  const breadcrumbId = `${url}#breadcrumb`
  const itemListId = `${url}#itemlist`

  useEffect(() => {
    document.title = fullTitle
    document.documentElement.lang = 'en-KE'

    const setMeta = (name: string, content: string, attr: 'name' | 'property' = 'name') => {
      let el = document.querySelector(`meta[${attr}="${name}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, name)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    const removeMeta = (name: string, attr: 'name' | 'property' = 'name') => {
      document.querySelector(`meta[${attr}="${name}"]`)?.remove()
    }

    const setLink = (rel: string, href: string, hreflang?: string) => {
      const selector = hreflang
        ? `link[rel="${rel}"][hreflang="${hreflang}"]`
        : `link[rel="${rel}"]:not([hreflang])`
      let el = document.querySelector(selector) as HTMLLinkElement | null
      if (!el) {
        el = document.createElement('link')
        el.rel = rel
        if (hreflang) el.hreflang = hreflang
        document.head.appendChild(el)
      }
      el.href = href
    }

    setMeta('description', description)
    if (keywords?.trim()) {
      setMeta('keywords', keywords.trim())
    } else {
      removeMeta('keywords')
    }

    setMeta('robots', 'index, follow')
    setMeta('googlebot', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1')
    setMeta('theme-color', '#0d2b1d')
    setMeta('author', site.fullName)

    setMeta('og:title', fullTitle, 'property')
    setMeta('og:description', description, 'property')
    setMeta('og:url', url, 'property')
    setMeta('og:image', ogImage, 'property')
    setMeta('og:image:alt', imageAlt, 'property')
    setMeta('og:type', 'website', 'property')
    setMeta('og:site_name', site.fullName, 'property')
    setMeta('og:locale', 'en_KE', 'property')

    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', fullTitle)
    setMeta('twitter:description', description)
    setMeta('twitter:image', ogImage)
    setMeta('twitter:image:alt', imageAlt)

    setLink('canonical', url)
    setLink('alternate', url, 'en-KE')
    setLink('alternate', url, 'x-default')

    const breadcrumbNode = breadcrumbs?.length
      ? breadcrumbListJsonLd(breadcrumbs, path || '/', breadcrumbId)
      : null

    const itemListNode = itemList?.length
      ? itemListJsonLd(itemList, itemListId, `Who we collaborate with — ${title.trim()}`)
      : null

    const keywordArray = keywords
      ?.split(',')
      .map((k) => k.trim())
      .filter(Boolean)

    const primaryImage =
      ogImage && ogImage.length > 0
        ? {
            '@type': 'ImageObject',
            url: ogImage,
            caption: imageAlt,
          }
        : undefined

    const webpageNode: Record<string, unknown> = {
      '@type': schemaPageType,
      '@id': webpageId,
      url,
      name: title.trim(),
      headline: fullTitle,
      description,
      inLanguage: 'en-KE',
      isPartOf: { '@id': websiteId },
      about: { '@id': orgId },
      ...(primaryImage ? { primaryImageOfPage: primaryImage } : {}),
      ...(breadcrumbNode ? { breadcrumb: { '@id': breadcrumbId } } : {}),
      ...(itemListNode ? { mainEntity: { '@id': itemListId } } : {}),
      ...(keywordArray?.length ? { keywords: keywordArray.join(', ') } : {}),
    }

    const graph: Record<string, unknown>[] = [
      {
        '@type': 'Organization',
        '@id': orgId,
        name: site.fullName,
        alternateName: site.name,
        url: site.url,
        logo: {
          '@type': 'ImageObject',
          url: absoluteUrl(site.defaultOgImagePath),
        },
        description: site.organizationDescription,
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'KE',
        },
        ...(site.sameAs.filter(Boolean).length
          ? { sameAs: [...site.sameAs].filter(Boolean) }
          : {}),
        contactPoint: [
          {
            '@type': 'ContactPoint',
            contactType: 'customer service',
            email: site.contactEmail,
            telephone: site.phone,
            areaServed: 'KE',
            availableLanguage: ['English'],
          },
        ],
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: site.url,
        name: site.fullName,
        description: site.homeDescription,
        inLanguage: 'en-KE',
        publisher: { '@id': orgId },
      },
      webpageNode,
    ]

    if (breadcrumbNode) graph.push(breadcrumbNode)
    if (itemListNode) graph.push(itemListNode)

    const jsonLd = {
      '@context': 'https://schema.org',
      '@graph': graph,
    }

    let script = document.getElementById(JSON_LD_ID) as HTMLScriptElement | null
    if (!script) {
      script = document.createElement('script')
      script.id = JSON_LD_ID
      script.type = 'application/ld+json'
      document.head.appendChild(script)
    }
    script.textContent = JSON.stringify(jsonLd)

    return () => {
      script?.remove()
      removeMeta('keywords')
    }
  }, [
    fullTitle,
    description,
    url,
    ogImage,
    imageAlt,
    orgId,
    websiteId,
    webpageId,
    breadcrumbId,
    title,
    schemaPageType,
    keywords,
    path,
    breadcrumbs,
    itemList,
    itemListId,
  ])

  return null
}
