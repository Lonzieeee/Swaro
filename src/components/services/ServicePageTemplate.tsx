import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import type { IconType } from 'react-icons'
import {
  HiOutlineAcademicCap,
  HiOutlineBuildingLibrary,
  HiOutlineChartBarSquare,
  HiOutlineClipboardDocumentCheck,
  HiOutlineHome,
  HiOutlineHeart,
  HiOutlineMegaphone,
  HiOutlineScale,
  HiOutlineSparkles,
  HiOutlineUser,
  HiOutlineUsers,
  HiOutlineWrenchScrewdriver,
} from 'react-icons/hi2'
import { GiAppleCore } from 'react-icons/gi'
import { MdHealthAndSafety } from 'react-icons/md'
import PageHero, { type PageHeroBreadcrumb } from '../common/PageHero'
import SEOHead from '../seo/SEOHead'
import type { ServicePageContent } from '../../constants/servicePages'
import { pageHeroMedia } from '../../constants/swaroData'
import type { BreadcrumbJsonLdItem } from '../../utils/seo'
import './ServicePageTemplate.css'

type ServicePageTemplateProps = {
  service: ServicePageContent
}

const TRUST_POINTS = ['Professionalism', 'Empowerment', 'Innovation', 'Community Impact'] as const

function defaultOfferSummary(serviceTitle: string, offer: string): string {
  const lower = offer.toLowerCase()
  if (lower.includes('counselling') || lower.includes('mediation') || lower.includes('conflict')) {
    return 'Structured guidance that builds clarity, communication, and sustainable resolution.'
  }
  if (lower.includes('training') || lower.includes('capacity') || lower.includes('leadership')) {
    return 'Practical learning sessions that strengthen skills, confidence, and day-to-day performance.'
  }
  if (lower.includes('curriculum') || lower.includes('education') || lower.includes('career')) {
    return 'Targeted support that improves learning outcomes and helps shape clear growth pathways.'
  }
  if (lower.includes('community') || lower.includes('empowerment') || lower.includes('gender') || lower.includes('youth')) {
    return 'Locally grounded interventions that increase participation, ownership, and long-term impact.'
  }
  if (lower.includes('research') || lower.includes('data') || lower.includes('evaluation') || lower.includes('monitoring')) {
    return 'Evidence-driven analysis and insights to guide stronger strategy and accountable results.'
  }
  if (lower.includes('nutrition') || lower.includes('health') || lower.includes('lifestyle')) {
    return 'Prevention-focused guidance that promotes healthier choices and lasting well-being.'
  }
  if (lower.includes('grant') || lower.includes('resource mobilization') || lower.includes('fundraising')) {
    return 'Focused support to strengthen proposals, positioning, and resource mobilization outcomes.'
  }
  return `Tailored ${serviceTitle.toLowerCase()} support designed for practical delivery and measurable results.`
}

function selectOfferIcon(offer: string): IconType {
  const lower = offer.toLowerCase()
  // Special icons for Health page
  if (lower.includes('nutrition')) {
    return GiAppleCore
  }
  if (lower.includes('awareness')) {
    return MdHealthAndSafety
  }
  if (lower.includes('counselling') || lower.includes('mediation') || lower.includes('conflict')) {
    return HiOutlineScale
  }
  if (lower.includes('training') || lower.includes('capacity') || lower.includes('leadership')) {
    return HiOutlineAcademicCap
  }
  if (lower.includes('research') || lower.includes('data') || lower.includes('evaluation') || lower.includes('monitoring')) {
    return HiOutlineChartBarSquare
  }
  if (lower.includes('health') || lower.includes('lifestyle')) {
    return HiOutlineHeart
  }
  if (lower.includes('community') || lower.includes('gender') || lower.includes('youth') || lower.includes('family')) {
    return HiOutlineUsers
  }
  if (lower.includes('grant') || lower.includes('proposal') || lower.includes('resource mobilization') || lower.includes('fundraising')) {
    return HiOutlineClipboardDocumentCheck
  }
  if (lower.includes('curriculum') || lower.includes('education') || lower.includes('career') || lower.includes('mentorship')) {
    return HiOutlineWrenchScrewdriver
  }
  if (lower.includes('motivation')) {
    return HiOutlineMegaphone
  }
  return HiOutlineSparkles
}

function selectAudienceIcon(audience: string): IconType {
  const lower = audience.toLowerCase()
  if (lower.includes('individual') || lower.includes('client')) return HiOutlineUser
  if (lower.includes('family') || lower.includes('community') || lower.includes('group')) return HiOutlineUsers
  if (lower.includes('school') || lower.includes('university') || lower.includes('learner') || lower.includes('youth')) {
    return HiOutlineAcademicCap
  }
  if (lower.includes('government') || lower.includes('ministry') || lower.includes('agency')) return HiOutlineBuildingLibrary
  if (lower.includes('faith') || lower.includes('church')) return HiOutlineHome
  if (lower.includes('ngo') || lower.includes('organization') || lower.includes('institution')) return HiOutlineClipboardDocumentCheck
  return HiOutlineSparkles
}

function defaultAudienceSummary(audience: string): string {
  return `Tailored support pathways for ${audience.toLowerCase()}, with practical delivery and context-specific guidance.`
}

function outcomesParagraph(outcomes: readonly string[], outcomesStatement?: string): string {
  if (outcomesStatement) return outcomesStatement
  return outcomes.join(' • ')
}

export default function ServicePageTemplate({ service }: ServicePageTemplateProps) {
  const offersSectionRef = useRef<HTMLElement | null>(null)
  const audienceSectionRef = useRef<HTMLElement | null>(null)
  const [offersInView, setOffersInView] = useState(false)
  const [audienceInView, setAudienceInView] = useState(false)

  useEffect(() => {
    const section = offersSectionRef.current
    if (!section || offersInView) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setOffersInView(true)
        observer.disconnect()
      },
      { threshold: 0.2, rootMargin: '0px 0px -8% 0px' }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [offersInView])

  useEffect(() => {
    const section = audienceSectionRef.current
    if (!section || audienceInView) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setAudienceInView(true)
        observer.disconnect()
      },
      { threshold: 0.2, rootMargin: '0px 0px -8% 0px' }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [audienceInView])

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
          <div className="servicePage__overview">
            <div className="servicePage__textCol">
              <div className="servicePage__sectionTag">
                <span className="servicePage__sectionTagDot" aria-hidden />
                Service Overview
              </div>
              <h2 id="service-overview-heading" className="servicePage__heading">
                {service.title}
              </h2>
              <div className="servicePage__divider" aria-hidden />
              {service.overview.map((paragraph) => (
                <p key={paragraph} className="servicePage__body">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="servicePage__imageCol servicePage__imageCol--decorated">
              <span className="servicePage__corner servicePage__corner--topleft" aria-hidden></span>
              <img
                className="servicePage__image"
                src={service.overviewImage ?? service.heroImage}
                alt={service.overviewImageAlt ?? service.heroImageAlt}
                loading="lazy"
                decoding="async"
              />
              <span className="servicePage__corner servicePage__corner--bottomright" aria-hidden></span>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={offersSectionRef}
        className={`servicePageOffersSection${offersInView ? ' isInView' : ''}`}
        aria-labelledby="service-offerings-heading"
      >
        <div className="servicePage__inner">
          <div className="servicePage__sectionTag">
            <span className="servicePage__sectionTagDot" aria-hidden />
            What We Offer
          </div>
          <h3 id="service-offerings-heading" className="servicePage__cardTitle servicePage__cardTitle--section">
            Key Service Offerings
          </h3>
          <p className="servicePageOffers__subtext">
            We deliver practical, context-aware interventions across these core service areas to ensure
            measurable outcomes, stronger capacity and lasting impact.
          </p>
          <div
            className={`servicePageOffers__grid${service.offerings.length <= 2 ? ' servicePageOffers__grid--compact' : ''}`}
            style={{
              gridTemplateColumns:
                service.offerings.length <= 2
                  ? `repeat(${service.offerings.length}, minmax(220px, 320px))`
                  : `repeat(${service.offerings.length}, minmax(220px, 1fr))`,
            }}
          >
            {service.offerings.map((item) => {
              const Icon = selectOfferIcon(item);
              // Use compact card for Health, or for <=2 offerings on other services
              const isCompact = service.slug === 'health' || service.offerings.length <= 2;
              return (
                <article
                  key={item}
                  className={`servicePageOffers__card${isCompact ? ' servicePageOffers__card--compact' : ''}`}
                >
                  <div className="servicePageOffers__iconWrap">
                    <Icon className="servicePageOffers__icon" size={24} aria-hidden />
                  </div>
                  <h4 className="servicePageOffers__title">{item}</h4>
                  <p className="servicePageOffers__body">
                    {service.offeringSummaries?.[item] ?? defaultOfferSummary(service.shortLabel, item)}
                  </p>
                  <div className="servicePageOffers__accent" aria-hidden />
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="servicePageOutcomeQuote" aria-labelledby="service-outcomes-heading">
        <img
          className="servicePageOutcomeQuote__bg"
          src={pageHeroMedia.about}
          alt=""
          loading="lazy"
          decoding="async"
          aria-hidden
        />
        <div className="servicePageOutcomeQuote__overlay" aria-hidden />
        <div className="servicePageOutcomeQuote__inner">
          <h3 id="service-outcomes-heading" className="servicePageOutcomeQuote__heading">
            Expected Outcomes
          </h3>
          <p className="servicePageOutcomeQuote__text">
            "{outcomesParagraph(service.outcomes, service.outcomesStatement)}"
          </p>
        </div>
      </section>

      <section
        ref={audienceSectionRef}
        className={`servicePageAudienceSection${audienceInView ? ' isInView' : ''}`}
        aria-labelledby="service-audience-heading"
      >
        <div className="servicePage__inner">
          <div className="servicePage__sectionTag">
            <span className="servicePage__sectionTagDot" aria-hidden />
            Who This Is For
          </div>
          <h3 id="service-audience-heading" className="servicePage__cardTitle servicePage__cardTitle--section">
            Ideal Audience
          </h3>
          <p className="servicePageAudience__subtext">
            This service is designed for the groups below, with delivery tailored to their context, goals,
            and implementation realities.
          </p>

          <div className="servicePage__grid">
            {service.audience.map((item) => {
              const Icon = selectAudienceIcon(item)
              return (
                <article key={item} className="servicePage__card servicePageAudience__card">
                  <div className="servicePageAudience__iconWrap">
                    <Icon className="servicePageAudience__icon" size={22} aria-hidden />
                  </div>
                  <h4 className="servicePage__cardTitle">{item}</h4>
                  <p className="servicePageAudience__body">
                    {service.audienceSummaries?.[item] ?? defaultAudienceSummary(item)}
                  </p>
                  <div className="servicePageAudience__accent" aria-hidden />
                </article>
              )
            })}
          </div>
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
            <Link to="/about" className="servicePageCta__button servicePageCta__button--secondary">
              Learn more about us
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
