import { Link } from 'react-router-dom'
import PageHero, { type PageHeroBreadcrumb } from '../common/PageHero'
import SEOHead from '../seo/SEOHead'
import type { ServicePageContent } from '../../constants/servicePages'
import type { BreadcrumbJsonLdItem } from '../../utils/seo'
import './ServicePageTemplate.css'

type ServicePageTemplateProps = {
  service: ServicePageContent
}

const TRUST_POINTS = ['Professionalism', 'Empowerment', 'Innovation', 'Community Impact'] as const

const SHARED_METHOD = [
  'Evidence-based solutions',
  'Needs assessment and customization',
  'Interactive training and delivery methodologies',
  'Professional counselling and facilitation frameworks',
  'Monitoring and evaluation for impact',
  'Partnership and collaboration',
] as const

export default function ServicePageTemplate({ service }: ServicePageTemplateProps) {
  const breadcrumbs: PageHeroBreadcrumb[] = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: service.title },
  ]

  const seoBreadcrumbs: readonly BreadcrumbJsonLdItem[] = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: service.title, path: service.path },
  ]

  return (
    <>
      <SEOHead
        title={service.title}
        description={service.metaDescription}
        path={service.path}
        image={service.heroImage}
        ogImageAlt={service.heroImageAlt}
        schemaPageType="WebPage"
        breadcrumbs={seoBreadcrumbs}
      />

      <PageHero
        title={service.title}
        image={service.heroImage}
        imageAlt={service.heroImageAlt}
        breadcrumbs={breadcrumbs}
      />

      <section className="servicePage" aria-labelledby="service-overview-heading">
        <div className="servicePage__inner">
          <div className="servicePage__sectionTag">Service Overview</div>
          <h2 id="service-overview-heading" className="servicePage__heading">
            {service.title}
          </h2>
          {service.overview.map((paragraph) => (
            <p key={paragraph} className="servicePage__body">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="servicePage servicePage--soft" aria-labelledby="service-offerings-heading">
        <div className="servicePage__inner">
          <div className="servicePage__grid">
            <article className="servicePage__card">
              <h3 id="service-offerings-heading" className="servicePage__cardTitle">
                What We Offer
              </h3>
              <ul className="servicePage__list">
                {service.offerings.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="servicePage__card">
              <h3 className="servicePage__cardTitle">Who This Is For</h3>
              <ul className="servicePage__list">
                {service.audience.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="servicePage__card">
              <h3 className="servicePage__cardTitle">Expected Outcomes</h3>
              <ul className="servicePage__list">
                {service.outcomes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="servicePage" aria-labelledby="service-approach-heading">
        <div className="servicePage__inner">
          <h3 id="service-approach-heading" className="servicePage__cardTitle">
            How We Deliver
          </h3>
          <ul className="servicePage__methodList">
            {SHARED_METHOD.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="servicePageCta" aria-labelledby="service-cta-heading">
        <div className="servicePageCta__inner">
          <div className="servicePageCta__label">Ready To Get Started?</div>
          <h3 id="service-cta-heading" className="servicePageCta__title">
            Request {service.shortLabel} <span>Support</span> Today
          </h3>
          <p className="servicePageCta__body">
            Talk to our team and get a tailored plan designed for your institution, community, or
            personal development goals.
          </p>
          <div className="servicePageCta__actions">
            <Link to="/contact" className="servicePageCta__button servicePageCta__button--primary">
              Book a Consultation
            </Link>
            <Link to="/services" className="servicePageCta__button servicePageCta__button--secondary">
              View All Services
            </Link>
          </div>
          <div className="servicePageCta__trust">
            {TRUST_POINTS.map((point) => (
              <span key={point}>{point}</span>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
