import AboutShowcaseImage from '../components/about/AboutShowcaseImage'
import CoreValues from '../components/about/CoreValues'
import LeadConsultants from '../components/about/LeadConsultants'
import MissionVision from '../components/about/MissionVision'
import Objectives from '../components/about/Objectives'
import PageHero, { type PageHeroBreadcrumb } from '../components/common/PageHero'
import SEOHead from '../components/seo/SEOHead'
import { pageHeroMedia } from '../constants/swaroData'
import type { BreadcrumbJsonLdItem } from '../utils/seo'

const ABOUT_BREADCRUMBS: PageHeroBreadcrumb[] = [
  { label: 'Home', path: '/' },
  { label: 'About Us' },
]

const ABOUT_SEO_BREADCRUMBS: readonly BreadcrumbJsonLdItem[] = [
  { name: 'Home', path: '/' },
  { name: 'About Us' },
]

/** ~153 characters — fits typical Google snippet width */
const ABOUT_META_DESCRIPTION =
  'About SWARO Consulty Services Kenya: mission, vision, values and objectives. Counselling, training, research and community programmes led by consultants.'

const ABOUT_KEYWORDS =
  'SWARO Consulty Services, about SWARO, Kenya consultancy, counselling Kenya, training Kenya, community development, mission and vision, core values, organizational objectives, research consultancy'

export default function About() {
  return (
    <>
      <SEOHead
        title="About Us"
        description={ABOUT_META_DESCRIPTION}
        path="/about"
        image={pageHeroMedia.about}
        ogImageAlt="SWARO Consulty Services — professional team and modern consultancy workspace in Kenya"
        keywords={ABOUT_KEYWORDS}
        schemaPageType="AboutPage"
        breadcrumbs={ABOUT_SEO_BREADCRUMBS}
      />
      <PageHero
        title="About Us"
        image={pageHeroMedia.about}
        imageAlt="Modern professional office with city view, standing desk and ergonomic workspace"
        breadcrumbs={ABOUT_BREADCRUMBS}
      />
      <MissionVision />
      <AboutShowcaseImage />
      <CoreValues />
      <Objectives />
      <LeadConsultants />
    </>
  )
}
