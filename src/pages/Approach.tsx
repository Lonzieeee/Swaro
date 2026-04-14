import { useEffect } from 'react'
import ApproachSection from '../components/approach/ApproachSection'
import ApproachCTA from '../components/approach/ApproachCTA'
import PageHero, { type PageHeroBreadcrumb } from '../components/common/PageHero'
import SEOHead from '../components/seo/SEOHead'
import { pageHeroMedia } from '../constants/swaroData'
import type { BreadcrumbJsonLdItem } from '../utils/seo'

const APPROACH_BREADCRUMBS: PageHeroBreadcrumb[] = [
  { label: 'Home', path: '/' },
  { label: 'Our Approach' },
]

const APPROACH_SEO_BREADCRUMBS: readonly BreadcrumbJsonLdItem[] = [
  { name: 'Home', path: '/' },
  { name: 'Our Approach' },
]

const APPROACH_META_DESCRIPTION =
  'Discover the SWARO approach: evidence-based assessment, tailored design, participatory delivery, and continuous evaluation for measurable impact.'

const APPROACH_KEYWORDS =
  'SWARO approach, evidence-based consultancy, counselling methodology, training methodology, monitoring and evaluation, Kenya development consultancy'

export default function Approach() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [])

  return (
    <>
      <SEOHead
        title="Our Approach"
        description={APPROACH_META_DESCRIPTION}
        path="/approach"
        image={pageHeroMedia.approach}
        ogImageAlt="SWARO team applying a structured, evidence-based consultancy approach"
        keywords={APPROACH_KEYWORDS}
        schemaPageType="CollectionPage"
        breadcrumbs={APPROACH_SEO_BREADCRUMBS}
      />
      <PageHero
        title="Our Approach"
        image={pageHeroMedia.approach}
        imageAlt="Professional team discussing a structured consultancy process"
        breadcrumbs={APPROACH_BREADCRUMBS}
      />
      <ApproachSection />
      <ApproachCTA />
    </>
  )
}
