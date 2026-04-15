import { Link, Navigate, Route, Routes } from 'react-router-dom'
import PageHero, { type PageHeroBreadcrumb } from '../components/common/PageHero'
import SEOHead from '../components/seo/SEOHead'
import ServicePageTemplate from '../components/services/ServicePageTemplate'
import { servicePages, servicePagesBySlug } from '../constants/servicePages'
import { aboutPageMedia, pageHeroMedia } from '../constants/swaroData'
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
          <div className="servicesLanding__overview">
            <div className="servicesLanding__textCol">
              <div className="servicesLanding__label">
                <span className="servicesLanding__labelDot" aria-hidden />
                Services Overview
              </div>
              <h1 id="services-landing-heading" className="servicesLanding__heading">
                Practical, Evidence-Based Support Across Our Core Services
              </h1>
              <div className="servicesLanding__divider" aria-hidden />
              <p className="servicesLanding__copy">
                We support individuals, institutions and communities through six integrated service areas.
                Explore each service to see focus areas, delivery approach, and how we can tailor support
                for your context.
              </p>
            </div>

            <div className="servicesLanding__imageCol">
              <img
                className="servicesLanding__image"
                src={aboutPageMedia.showcase}
                alt="SWARO consultants in collaborative planning and service delivery"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

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
