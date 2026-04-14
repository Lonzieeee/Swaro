import { Link, Navigate, Route, Routes } from 'react-router-dom'
import PageHero, { type PageHeroBreadcrumb } from '../components/common/PageHero'
import SEOHead from '../components/seo/SEOHead'
import ServicePageTemplate from '../components/services/ServicePageTemplate'
import { servicePages, servicePagesBySlug } from '../constants/servicePages'
import { pageHeroMedia } from '../constants/swaroData'
import type { BreadcrumbJsonLdItem } from '../utils/seo'
import './Services.css'

const SERVICES_BREADCRUMBS: PageHeroBreadcrumb[] = [
  { label: 'Home', path: '/' },
  { label: 'Services' },
]

const SERVICES_SEO_BREADCRUMBS: readonly BreadcrumbJsonLdItem[] = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
]

function ServicesLanding() {
  return (
    <>
      <SEOHead
        title="Services"
        description="Explore SWARO's six core services: counselling, training, education, community empowerment, research, and health & lifestyle development."
        path="/services"
        image={pageHeroMedia.about}
        ogImageAlt="SWARO core services supporting institutions, communities and individuals"
        schemaPageType="CollectionPage"
        breadcrumbs={SERVICES_SEO_BREADCRUMBS}
      />

      <PageHero
        title="Our Services"
        image={pageHeroMedia.about}
        imageAlt="Consultancy team collaborating on tailored service delivery"
        breadcrumbs={SERVICES_BREADCRUMBS}
      />

      <section className="servicesLanding" aria-labelledby="services-landing-heading">
        <div className="servicesLanding__inner">
          <div className="servicesLanding__label">Core Services</div>
          <h1 id="services-landing-heading" className="servicesLanding__heading">
            Choose A Service To Explore In Detail
          </h1>
          <p className="servicesLanding__copy">
            Each service has a dedicated page with overview, offerings, target audience, approach, and
            clear next steps for engagement.
          </p>

          <div className="servicesLanding__grid">
            {servicePages.map((service) => (
              <article key={service.slug} className="servicesLanding__card">
                <h2 className="servicesLanding__cardTitle">{service.title}</h2>
                <p className="servicesLanding__cardCopy">{service.overview[0]}</p>
                <Link to={service.path} className="servicesLanding__link">
                  View Service Page
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default function Services() {
  return (
    <Routes>
      <Route index element={<ServicesLanding />} />
      <Route path="counselling" element={<ServicePageTemplate service={servicePagesBySlug.counselling} />} />
      <Route path="training" element={<ServicePageTemplate service={servicePagesBySlug.training} />} />
      <Route path="education" element={<ServicePageTemplate service={servicePagesBySlug.education} />} />
      <Route path="community" element={<ServicePageTemplate service={servicePagesBySlug.community} />} />
      <Route path="research" element={<ServicePageTemplate service={servicePagesBySlug.research} />} />
      <Route path="health" element={<ServicePageTemplate service={servicePagesBySlug.health} />} />
      <Route path="*" element={<Navigate to="/services" replace />} />
    </Routes>
  )
}
