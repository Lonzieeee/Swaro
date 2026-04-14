import { useEffect } from 'react'
import PageHero, { type PageHeroBreadcrumb } from '../components/common/PageHero'
import PartnershipsCTA from '../components/partnerships/PartnershipsCTA'
import PartnershipsIntro from '../components/partnerships/PartnershipsIntro'
import WhoWeCollaborate from '../components/partnerships/WhoWeCollaborate'
import SEOHead from '../components/seo/SEOHead'
import { partnerSectorsForSeo } from '../constants/partnershipsPartnerSectors'
import { pageHeroMedia, partnershipsPageMedia } from '../constants/swaroData'
import type { BreadcrumbJsonLdItem } from '../utils/seo'

const PARTNERSHIPS_BREADCRUMBS: PageHeroBreadcrumb[] = [
  { label: 'Home', path: '/' },
  { label: 'Partnerships & Collaborations' },
]

const PARTNERSHIPS_SEO_BREADCRUMBS: readonly BreadcrumbJsonLdItem[] = [
  { name: 'Home', path: '/' },
  { name: 'Partnerships & Collaborations' },
]

/** ~155 characters — primary keywords + intent for Kenya / institutional partners */
const PARTNERSHIPS_META_DESCRIPTION =
  'SWARO partners across Kenya with NGOs, government, universities, faith groups and businesses—alliances for research, training, M&E and community impact. See who we collaborate with.'

const PARTNERSHIPS_KEYWORDS =
  'SWARO partnerships, Kenya consultancy partners, NGO collaboration Kenya, government consultancy Kenya, university partnerships Kenya, international development partners Kenya, faith-based organisation programmes, corporate training Kenya, community development partners, institutional partnerships, monitoring and evaluation Kenya, capacity building Kenya'

export default function Partnerships() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [])

  return (
    <>
      <SEOHead
        title="Partnerships & Collaborations"
        description={PARTNERSHIPS_META_DESCRIPTION}
        path="/partnerships"
        image={partnershipsPageMedia.intro}
        ogImageAlt="SWARO team and partners collaborating — partnerships and institutional collaboration in Kenya"
        keywords={PARTNERSHIPS_KEYWORDS}
        schemaPageType="CollectionPage"
        breadcrumbs={PARTNERSHIPS_SEO_BREADCRUMBS}
        itemList={partnerSectorsForSeo}
      />
      <PageHero
        title="Partnerships & Collaborations"
        image={pageHeroMedia.about}
        imageAlt="Professional consultancy setting representing collaboration with partner organisations"
        breadcrumbs={PARTNERSHIPS_BREADCRUMBS}
      />
      <PartnershipsIntro />
      <WhoWeCollaborate />
      <PartnershipsCTA />
    </>
  )
}
