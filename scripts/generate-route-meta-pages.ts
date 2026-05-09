import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { counsellingServices } from '../src/constants/counsellingServices'
import { servicePages } from '../src/constants/servicePages'
import { pageHeroMedia, partnershipsPageMedia, site } from '../src/constants/swaroData'

type RouteMeta = {
  routePath: string
  title: string
  description: string
  image: string
  imageAlt: string
}

const SITE_URL = 'https://swaroinstitute.com'
const SHARE_IMAGE_VERSION = '20260506'
const DIST_DIR = path.resolve(process.cwd(), 'dist')
const DIST_INDEX = path.join(DIST_DIR, 'index.html')

function absoluteUrl(routePath: string): string {
  const normalized = routePath.startsWith('/') ? routePath : `/${routePath}`
  return `${SITE_URL}${normalized}`
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function replaceTag(html: string, pattern: RegExp, replacement: string): string {
  return html.replace(pattern, replacement)
}

function setMetaByName(html: string, name: string, content: string): string {
  const escaped = escapeRegExp(name)
  const pattern = new RegExp(`<meta\\s+name="${escaped}"\\s+content="[^"]*"\\s*\\/?>`, 'i')
  const replacement = `<meta name="${name}" content="${content}" />`
  if (pattern.test(html)) {
    return replaceTag(html, pattern, replacement)
  }
  return html.replace('</head>', `    ${replacement}\n  </head>`)
}

function setMetaByProperty(html: string, property: string, content: string): string {
  const escaped = escapeRegExp(property)
  const pattern = new RegExp(`<meta\\s+property="${escaped}"\\s+content="[^"]*"\\s*\\/?>`, 'i')
  const replacement = `<meta property="${property}" content="${content}" />`
  if (pattern.test(html)) {
    return replaceTag(html, pattern, replacement)
  }
  return html.replace('</head>', `    ${replacement}\n  </head>`)
}

function setLinkRel(html: string, rel: string, href: string): string {
  const escapedRel = escapeRegExp(rel)
  const pattern = new RegExp(`<link\\s+rel="${escapedRel}"\\s+href="[^"]*"\\s*\\/?>`, 'i')
  return replaceTag(html, pattern, `<link rel="${rel}" href="${href}" />`)
}

function setAlternateHref(html: string, hreflang: string, href: string): string {
  const escaped = escapeRegExp(hreflang)
  const pattern = new RegExp(`<link\\s+rel="alternate"\\s+hreflang="${escaped}"\\s+href="[^"]*"\\s*\\/?>`, 'i')
  return replaceTag(html, pattern, `<link rel="alternate" hreflang="${hreflang}" href="${href}" />`)
}

function appendVersion(url: string): string {
  const separator = url.includes('?') ? '&' : '?'
  return `${url}${separator}v=${SHARE_IMAGE_VERSION}`
}

function detectImageType(url: string): string {
  const clean = url.split('?')[0].toLowerCase()
  if (clean.endsWith('.png')) return 'image/png'
  if (clean.endsWith('.jpg') || clean.endsWith('.jpeg')) return 'image/jpeg'
  if (clean.endsWith('.gif')) return 'image/gif'
  if (clean.endsWith('.webp')) return 'image/webp'
  return 'image/*'
}

function buildRouteHtml(templateHtml: string, meta: RouteMeta): string {
  const pageUrl = absoluteUrl(meta.routePath)
  const shareImage = appendVersion(meta.image)
  const shareImageType = detectImageType(meta.image)
  let html = templateHtml

  html = replaceTag(html, /<title>.*?<\/title>/i, `<title>${meta.title} · Swaro Institute</title>`)
  html = setMetaByName(html, 'description', meta.description)
  html = setLinkRel(html, 'canonical', pageUrl)
  html = setAlternateHref(html, 'en-KE', pageUrl)
  html = setAlternateHref(html, 'x-default', pageUrl)

  html = setMetaByProperty(html, 'og:url', pageUrl)
  html = setMetaByProperty(html, 'og:title', `${meta.title} · Swaro Institute`)
  html = setMetaByProperty(html, 'og:description', meta.description)
  html = setMetaByProperty(html, 'og:image', shareImage)
  html = setMetaByProperty(html, 'og:image:secure_url', shareImage)
  html = setMetaByProperty(html, 'og:image:type', shareImageType)
  html = setMetaByProperty(html, 'og:image:width', '1200')
  html = setMetaByProperty(html, 'og:image:height', '630')
  html = setMetaByProperty(html, 'og:image:alt', meta.imageAlt)

  html = setMetaByName(html, 'twitter:title', `${meta.title} · Swaro Institute`)
  html = setMetaByName(html, 'twitter:description', meta.description)
  html = setMetaByName(html, 'twitter:image', shareImage)
  html = setMetaByName(html, 'twitter:image:alt', meta.imageAlt)

  return html
}

async function writeRouteHtml(routePath: string, html: string): Promise<void> {
  const routeDir = path.join(DIST_DIR, routePath.replace(/^\//, ''))
  await mkdir(routeDir, { recursive: true })
  await writeFile(path.join(routeDir, 'index.html'), html, 'utf8')
}

async function main(): Promise<void> {
  const templateHtml = await readFile(DIST_INDEX, 'utf8')

  const corePages: RouteMeta[] = [
    {
      routePath: '/',
      title: site.fullName,
      description: site.homeDescription,
      image: site.defaultOgImagePath,
      imageAlt: `${site.fullName} — counselling, training and community empowerment in Kenya`,
    },
    {
      routePath: '/about',
      title: 'About Swaro Institute',
      description:
        'About Swaro Institute Kenya: mission, vision, values and objectives. Counselling, training, research and community programmes led by consultants.',
      image: pageHeroMedia.about,
      imageAlt: 'Swaro Institute — professional team and consultancy workspace in Kenya',
    },
    {
      routePath: '/services',
      title: 'Services',
      description:
        "Explore Swaro Institute's six core services: counselling, training, education, community empowerment, research, and health & lifestyle development.",
      image: pageHeroMedia.about,
      imageAlt: 'Swaro Institute core services for institutions, communities and individuals',
    },
    {
      routePath: '/approach',
      title: 'Our Approach',
      description:
        'Discover the Swaro Institute approach: evidence-based assessment, tailored design, participatory delivery, and continuous evaluation for measurable impact.',
      image: pageHeroMedia.approach,
      imageAlt: 'Swaro Institute team applying a structured, evidence-based approach',
    },
    {
      routePath: '/partnerships',
      title: 'Partnerships',
      description:
        'Swaro Institute partners across Kenya with NGOs, government, universities, faith groups and businesses for research, training, M&E and community impact.',
      image: partnershipsPageMedia.intro,
      imageAlt: 'Swaro Institute and partners collaborating in Kenya',
    },
    {
      routePath: '/why-us',
      title: 'Why Us',
      description: 'Why organisations and communities choose to work with Swaro Institute.',
      image: pageHeroMedia.about,
      imageAlt: 'Why clients choose Swaro Institute',
    },
    {
      routePath: '/contact',
      title: 'Book a Consultation',
      description:
        'Book a consultation with Swaro Institute in Kenya. Share your goals and context to receive a tailored, evidence-based support plan.',
      image: pageHeroMedia.about,
      imageAlt: 'Consultation scheduling form for Swaro Institute',
    },
    {
      routePath: '/book-session',
      title: 'Book a Counselling Session',
      description: 'Complete your booking details and continue to WhatsApp to confirm your counselling session.',
      image: pageHeroMedia.about,
      imageAlt: 'Book a counselling session form',
    },
  ]

  const serviceDetailPages: RouteMeta[] = servicePages.map((service) => ({
    routePath: service.path,
    title: service.title,
    description: service.metaDescription,
    image: service.heroImage,
    imageAlt: service.heroImageAlt,
  }))

  const counsellingDetailPages: RouteMeta[] = counsellingServices.map((service) => ({
    routePath: `/counselling-services/${service.slug}`,
    title: service.title,
    description: service.pageDescription ?? service.description,
    image: service.pageImage ?? service.image,
    imageAlt: service.imageAlt,
  }))

  const routeMeta: RouteMeta[] = [...corePages, ...serviceDetailPages, ...counsellingDetailPages]

  await Promise.all(
    routeMeta.map(async (meta) => {
      const html = buildRouteHtml(templateHtml, meta)
      await writeRouteHtml(meta.routePath, html)
    }),
  )

  console.log(`Generated route-specific meta pages: ${routeMeta.length}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
