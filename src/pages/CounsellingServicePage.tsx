import { useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import SEOHead from '../components/seo/SEOHead'
import { counsellingServicesBySlug } from '../constants/counsellingServices'
import './CounsellingServicePage.css'

type TabKey = 'overview' | 'notes' | 'quizzes' | 'certificate' | 'reviews'

type WeekItem = {
  week: string
  title: string
  description: string
}

const courseTabs: Array<{ key: TabKey; label: string }> = [
  { key: 'overview', label: 'Overview' },
  { key: 'notes', label: 'Notes' },
  { key: 'quizzes', label: 'Quizzes' },
  { key: 'certificate', label: 'Certificate' },
  { key: 'reviews', label: 'Reviews' },
]

function createWeeklyContent(title: string): WeekItem[] {
  return [
    {
      week: 'Week 1',
      title: `Getting started with ${title}`,
      description:
        'An introduction to the course journey, expectations, and the core issues the program is designed to support in a safe and guided way.',
    },
    {
      week: 'Week 2',
      title: 'Understanding the foundations',
      description:
        'A closer look at the key emotional, relational, and practical foundations that will shape the rest of the learning experience.',
    },
    {
      week: 'Week 3',
      title: 'Practical tools and reflection',
      description:
        'Simple exercises, reflection prompts, and practical tools that help participants apply what they are learning to daily life.',
    },
    {
      week: 'Week 4',
      title: 'Strengthening confidence',
      description:
        'Activities focused on confidence-building, stability, and finding better ways to respond to common challenges and transitions.',
    },
    {
      week: 'Week 5',
      title: 'Consolidation and next steps',
      description:
        'A closing week for reviewing progress, identifying key takeaways, and preparing for the next stage of support or growth.',
    },
  ]
}

function OverviewCard({ title, value }: { title: string; value: string }) {
  return (
    <article className="courseOverviewPage__highlightCard">
      <p className="courseOverviewPage__highlightLabel">{title}</p>
      <p className="courseOverviewPage__highlightValue">{value}</p>
    </article>
  )
}

export default function CounsellingServicePage() {
  const { slug } = useParams<{ slug: string }>()
  const content = slug ? counsellingServicesBySlug[slug] : undefined
<<<<<<< HEAD
  const introRef = useRef<HTMLElement | null>(null)
  const prenatalJourneyRef = useRef<HTMLElement | null>(null)
  const motherhoodSupportRef = useRef<HTMLElement | null>(null)
  const mosaicRef = useRef<HTMLElement | null>(null)
  const programCardsRef = useRef<HTMLElement | null>(null)
  const bookingRef = useRef<HTMLElement | null>(null)
  const relationshipQuoteRef = useRef<HTMLElement | null>(null)
  const premaritalAccordionRef = useRef<HTMLElement | null>(null)
  const premaritalProgramCardsRef = useRef<HTMLElement | null>(null)
  const premaritalCtaRef = useRef<HTMLElement | null>(null)
  const [isIntroVisible, setIsIntroVisible] = useState(false)
  const [isPrenatalJourneyVisible, setIsPrenatalJourneyVisible] = useState(false)
  const [isMotherhoodSupportVisible, setIsMotherhoodSupportVisible] = useState(false)
  const [isMosaicVisible, setIsMosaicVisible] = useState(false)
  const [isProgramCardsVisible, setIsProgramCardsVisible] = useState(false)
  const [isBookingVisible, setIsBookingVisible] = useState(false)
  const [isRelationshipQuoteVisible, setIsRelationshipQuoteVisible] = useState(false)
  const [premaritalAccordionOpen, setPremaritalAccordionOpen] = useState<number | null>(0)

  const [isPremaritalAccordionVisible, setIsPremaritalAccordionVisible] = useState(false)
  const [isPremaritalProgramCardsVisible, setIsPremaritalProgramCardsVisible] = useState(false)
  const [isPremaritalCtaVisible, setIsPremaritalCtaVisible] = useState(false)
  useEffect(() => {
    const introEl = introRef.current
    const prenatalJourneyEl = prenatalJourneyRef.current
    const motherhoodSupportEl = motherhoodSupportRef.current
    const mosaicEl = mosaicRef.current
    const programCardsEl = programCardsRef.current
    const bookingEl = bookingRef.current
    const relationshipQuoteEl = relationshipQuoteRef.current
    const premaritalAccordionEl = premaritalAccordionRef.current
    const premaritalProgramCardsEl = premaritalProgramCardsRef.current
    const premaritalCtaEl = premaritalCtaRef.current
    if (
      !introEl &&
      !prenatalJourneyEl &&
      !motherhoodSupportEl &&
      !mosaicEl &&
      !programCardsEl &&
      !bookingEl &&
      !relationshipQuoteEl &&
      !premaritalAccordionEl &&
      !premaritalProgramCardsEl &&
      !premaritalCtaEl
    )
      return

    const overlapsViewport = (el: HTMLElement) => {
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight || document.documentElement.clientHeight
      return r.bottom > 1 && r.top < vh - 1
    }

    /** IntersectionObserver can miss the first paint (already in view). Sync from layout after observe. */
    const syncRevealFromLayout = () => {
      if (introEl && overlapsViewport(introEl)) setIsIntroVisible(true)
      if (prenatalJourneyEl && overlapsViewport(prenatalJourneyEl)) setIsPrenatalJourneyVisible(true)
      if (motherhoodSupportEl && overlapsViewport(motherhoodSupportEl)) setIsMotherhoodSupportVisible(true)
      if (mosaicEl && overlapsViewport(mosaicEl)) setIsMosaicVisible(true)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === prenatalJourneyEl) {
            setIsPrenatalJourneyVisible(entry.isIntersecting)
            return
          }
          if (entry.target === programCardsEl) {
            setIsProgramCardsVisible(entry.isIntersecting)
            return
          }
          if (entry.target === bookingEl) {
            setIsBookingVisible(entry.isIntersecting)
            return
          }
          if (entry.target === relationshipQuoteEl) {
            setIsRelationshipQuoteVisible(entry.isIntersecting)
            return
          }
          if (entry.target === premaritalAccordionEl) {
            setIsPremaritalAccordionVisible(entry.isIntersecting)
            return
          }
          if (entry.target === premaritalProgramCardsEl) {
            setIsPremaritalProgramCardsVisible(entry.isIntersecting)
            return
          }
          if (entry.target === premaritalCtaEl) {
            setIsPremaritalCtaVisible(entry.isIntersecting)
            return
          }
          if (entry.target === motherhoodSupportEl) {
            setIsMotherhoodSupportVisible(entry.isIntersecting)
            return
          }
          if (!entry.isIntersecting) return
          if (entry.target === introEl) setIsIntroVisible(true)
          if (entry.target === mosaicEl) setIsMosaicVisible(true)
          observer.unobserve(entry.target)
        })
      },
      {
        root: null,
        /* Expand root so sections just under the hero register reliably */
        rootMargin: '180px 0px 32% 0px',
        threshold: [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1],
      },
    )

    if (introEl) observer.observe(introEl)
    if (prenatalJourneyEl) observer.observe(prenatalJourneyEl)
    if (motherhoodSupportEl) observer.observe(motherhoodSupportEl)
    if (mosaicEl) observer.observe(mosaicEl)
    if (programCardsEl) observer.observe(programCardsEl)
    if (bookingEl) observer.observe(bookingEl)
    if (relationshipQuoteEl) observer.observe(relationshipQuoteEl)
    if (premaritalAccordionEl) observer.observe(premaritalAccordionEl)
    if (premaritalProgramCardsEl) observer.observe(premaritalProgramCardsEl)
    if (premaritalCtaEl) observer.observe(premaritalCtaEl)

    requestAnimationFrame(() => {
      requestAnimationFrame(syncRevealFromLayout)
    })

    return () => {
      if (introEl) observer.unobserve(introEl)
      if (prenatalJourneyEl) observer.unobserve(prenatalJourneyEl)
      if (motherhoodSupportEl) observer.unobserve(motherhoodSupportEl)
      if (mosaicEl) observer.unobserve(mosaicEl)
      if (programCardsEl) observer.unobserve(programCardsEl)
      if (bookingEl) observer.unobserve(bookingEl)
      if (relationshipQuoteEl) observer.unobserve(relationshipQuoteEl)
      if (premaritalAccordionEl) observer.unobserve(premaritalAccordionEl)
      if (premaritalProgramCardsEl) observer.unobserve(premaritalProgramCardsEl)
      if (premaritalCtaEl) observer.unobserve(premaritalCtaEl)
      observer.disconnect()
    }
  }, [slug])
=======
  const [activeTab, setActiveTab] = useState<TabKey>('overview')
  const [openWeek, setOpenWeek] = useState<number>(0)

  const weeklyContent = useMemo(() => createWeeklyContent(content?.title ?? 'this program'), [content?.title])
>>>>>>> db3fbed (Featured programs update)

  if (!content) {
    return <Navigate to="/" replace />
  }
<<<<<<< HEAD
  const heroDescription = content.pageDescription ?? content.description
  const isDebriefService =
    content.id === 'debrief-grief-support' ||
    content.slug === 'debrief-grief-loss-support' ||
    content.slug.includes('debrief')
  const isPremaritalService =
    content.id === 'premarital-counselling' ||
    content.slug === 'premarital-counselling' ||
    content.title.toLowerCase().includes('premarital')
  const isPrenatalService =
    content.id === 'prenatal-wellbeing-support' ||
    content.slug === 'prenatal-wellbeing-support' ||
    content.slug.includes('prenatal')
  const isMotherhoodService =
    content.id === 'resilient-motherhood-program' ||
    content.slug === 'resilient-motherhood-program' ||
    content.title.toLowerCase().includes('motherhood')
  const pageImage = content.pageImage ?? content.image
  const shareImage = content.shareImage ?? content.pageImage ?? content.image
  const heroBackgroundImage = isPremaritalService ? content.image : pageImage
  const pageTitle = isMotherhoodService ? 'Resilient Motherhood Program' : content.title
  const pageDescription = isMotherhoodService
    ? 'Guided motherhood support for first-time mothers to build emotional resilience, newborn care confidence, and wellbeing during pregnancy and early motherhood.'
    : heroDescription
  const ogImageAlt = isMotherhoodService
    ? 'Resilient Motherhood Program support for first-time mothers'
    : content.imageAlt
  const pageKeywords = isPrenatalService
    ? 'prenatal wellbeing support Kenya, pregnancy counselling Kenya, maternal mental health support, emotional support during pregnancy, pregnancy stress counselling, expectant mothers support'
    : isDebriefService
      ? 'grief counselling Kenya, loss support counselling, bereavement therapy Kenya, emotional healing support, debrief grief and loss, trauma and grief counselling'
      : isMotherhoodService
        ? 'resilient motherhood program Kenya, first-time mothers support, early motherhood counselling, maternal emotional resilience, motherhood confidence support'
        : isPremaritalService
          ? 'premarital counselling Kenya, marital counselling Kenya, couples counselling, marriage preparation, relationship counselling Kenya, Swaro Institute'
      : undefined
  const debriefMosaicImage = 'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/shot.jpg'
  const debriefMosaicImageMiddle = 'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/sliideee.webp'
  const debriefMosaicImageLast = 'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/consoling.jpeg'
  const mosaicImages = isDebriefService
    ? [debriefMosaicImage, debriefMosaicImageMiddle, debriefMosaicImageLast]
    : [content.introSectionImage ?? pageImage, pageImage, content.introSectionImage ?? pageImage]
  
=======

  const heroDescription =
    content.pageDescription ??
    content.description ??
    'A guided learning experience designed to support growth, reflection, and practical progress.'

  const aboutCourse =
    content.introSectionBody ??
    heroDescription +
      ' This course overview brings together the key information, course structure, and learning highlights in one place.'

  const programHighlights = [
    { title: 'Format', value: 'Weekly guided sessions' },
    { title: 'Access', value: 'Online and physical options' },
    { title: 'Duration', value: 'Structured program pathway' },
    { title: 'Support', value: 'One-on-one or group sessions' },
    { title: 'Certificate', value: 'Awarded upon completion' },
    { title: 'Price', value: 'Paid course' },
  ]
>>>>>>> db3fbed (Featured programs update)

  return (
    <>
      <SEOHead
        title={`${content.title} | Course Overview`}
        description={heroDescription}
        path={`/counselling-services/${content.slug}`}
        schemaPageType="WebPage"
<<<<<<< HEAD
        image={shareImage}
        ogImageAlt={ogImageAlt}
        keywords={pageKeywords}
      />
      <section className={`counsellingServicePage${isPrenatalService ? ' counsellingServicePage--prenatal' : ''}${isMotherhoodService ? ' counsellingServicePage--motherhood' : ''}`}>
        <div
          className="counsellingServicePage__hero"
          style={{ backgroundImage: `linear-gradient(rgba(15, 19, 18, 0.55), rgba(15, 19, 18, 0.55)), url(${heroBackgroundImage})` }}
          role="img"
          aria-label={content.imageAlt}
        >
          <div className="counsellingServicePage__inner">
            <div className="counsellingServicePage__label">Counselling Service</div>
            <h1 className="counsellingServicePage__heading">{content.title}</h1>
            <p className="counsellingServicePage__summary">
              {isPrenatalService ? (
                <>
                  <span className="counsellingServicePage__summaryDesktop">{heroDescription}</span>
                  <span className="counsellingServicePage__summaryMobile">
                    Pregnancy brings many changes. You do not have to navigate them alone; we are here to support
                    you at every step.
                  </span>
                </>
              ) : isMotherhoodService ? (
                <>
                  <span className="counsellingServicePage__summarySubtitle">Supporting First-Time Mothers</span>
                  <span className="counsellingServicePage__summaryDesktop">{heroDescription}</span>
                  <span className="counsellingServicePage__summaryMobile">
                    Guided support to help first-time mothers build resilience, confidence, and wellbeing.
                  </span>
                </>
              ) : (
                heroDescription
              )}
            </p>
            <Link to={`/book-session?service=${encodeURIComponent(content.slug)}`} className="counsellingServicePage__bookButton">
              Book Session
            </Link>
          </div>
        </div>

        {isPremaritalService ? (
          <section
            ref={introRef}
            className={`counsellingServicePage__intro counsellingServicePage__intro--premarital${isIntroVisible ? ' counsellingServicePage__intro--visible' : ''}`}
            aria-label="Why this matters for premarital counselling"
          >
            <div className="counsellingServicePage__introInner counsellingServicePage__introInner--premarital">
              <img
                className="counsellingServicePage__introImage counsellingServicePage__introImage--premarital"
                src={premaritalWhyThisMatters.image}
                alt={premaritalWhyThisMatters.imageAlt}
                loading="lazy"
              />

              <div className="counsellingServicePage__introText counsellingServicePage__introText--premarital">
                <p className="counsellingServicePage__introEyebrow">{premaritalWhyThisMatters.label}</p>
                <h2 className="counsellingServicePage__introHeading">{premaritalWhyThisMatters.title}</h2>
                <p className="counsellingServicePage__introParagraph">{premaritalWhyThisMatters.intro}</p>
                <ul className="counsellingServicePage__introBenefits" role="list">
                  {premaritalWhyThisMatters.points.map((point) => (
                    <li key={point} className="counsellingServicePage__introBenefitItem">
                      <HiCheckCircle className="counsellingServicePage__introBenefitIcon" aria-hidden />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ) : null}

        {isPremaritalService ? (
          <section
            ref={relationshipQuoteRef}
            className={`counsellingServicePage__relationshipQuote${isRelationshipQuoteVisible ? ' counsellingServicePage__relationshipQuote--visible' : ''}`}
            aria-label="Relationship support quote"
          >
            <div className="counsellingServicePage__relationshipQuoteWave counsellingServicePage__relationshipQuoteWave--top" aria-hidden />
            <div className="counsellingServicePage__relationshipQuoteWave counsellingServicePage__relationshipQuoteWave--bottom" aria-hidden />
            <div className="counsellingServicePage__relationshipQuoteInner">
              <p className="counsellingServicePage__relationshipQuoteText">“{premaritalRelationshipQuote.text}”</p>
            </div>
          </section>
        ) : null}
        {isPremaritalService ? (
          <section
            ref={premaritalAccordionRef}
            className={`counsellingServicePage__whoThisIsFor${isPremaritalAccordionVisible ? ' counsellingServicePage__whoThisIsFor--visible' : ''}`}
            aria-label="Who this service is for"
          >
            <div className="counsellingServicePage__whoThisIsForInner">
              <div className="counsellingServicePage__whoThisIsForText">
                <h2 className="counsellingServicePage__whoThisIsForHeading">Who This Is For</h2>
                <p className="counsellingServicePage__whoThisIsForIntro">{premaritalWhoThisIsFor.intro}</p>
              </div>

              <div className="counsellingServicePage__accordionContainer">
                {premaritalWhoThisIsFor.items.map((item, index) => (
                  <div
                    key={index}
                    className={`counsellingServicePage__accordionItem${premaritalAccordionOpen === index ? ' counsellingServicePage__accordionItem--open' : ''}`}
                  >
                    <button
                      className="counsellingServicePage__accordionButton"
                      onClick={() => setPremaritalAccordionOpen(premaritalAccordionOpen === index ? null : index)}
                      aria-expanded={premaritalAccordionOpen === index}
                    >
                      <span className="counsellingServicePage__accordionIcon">+</span>
                      <span className="counsellingServicePage__accordionTitle">{item.title}</span>
                    </button>
                    {premaritalAccordionOpen === index && (
                      <div className="counsellingServicePage__accordionContent">
                        <p>{item.description}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}
        {isPremaritalService ? (
          <section
            className="counsellingServicePage__premaritalReasons"
            aria-label="Common reasons couples seek counselling"
          >
            <video
              className="counsellingServicePage__premaritalReasonsVideo"
              src="https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/13885768_3840_2160_60fps(1)(2).mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
            <div className="counsellingServicePage__premaritalReasonsOverlay" aria-hidden />
            <div className="counsellingServicePage__premaritalReasonsContent">
              <h2 className="counsellingServicePage__premaritalReasonsHeading">{premaritalReasonsSection.title}</h2>
              <div className="counsellingServicePage__premaritalReasonsGrid">
                {premaritalReasonsSection.items.map((item) => (
                  <article key={item.title} className="counsellingServicePage__premaritalReasonCard">
                    <HiOutlineHeart className="counsellingServicePage__premaritalReasonIcon" aria-hidden />
                    <h3 className="counsellingServicePage__premaritalReasonTitle">{item.title}</h3>
                    <p className="counsellingServicePage__premaritalReasonBody">{item.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : null}
        {isPremaritalService ? (
          <section
            ref={premaritalProgramCardsRef}
            className={`counsellingServicePage__programCards counsellingServicePage__programCards--premarital${isPremaritalProgramCardsVisible ? ' counsellingServicePage__programCards--premarital--visible' : ''}`}
            aria-label="Premarital counselling program details"
          >
            <div className="counsellingServicePage__programCardsGrid">
              {/* Highlights Card */}
              <article className="counsellingServicePage__programCard">
                <h3 className="counsellingServicePage__programCardTitle">{premaritalProgramCards.highlights.title}</h3>
                <ul className="counsellingServicePage__programRows" role="list">
                  {premaritalProgramCards.highlights.rows.map((row) => (
                    <li key={row.label} className="counsellingServicePage__programRow">
                      <strong>{row.label}:</strong> {row.value}
                    </li>
                  ))}
                </ul>
              </article>

              {/* Gains Card */}
              <article className="counsellingServicePage__programCard">
                <h3 className="counsellingServicePage__programCardTitle">{premaritalProgramCards.gains.title}</h3>
                <ul className="counsellingServicePage__programList">
                  {premaritalProgramCards.gains.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>

              {/* Support Card */}
              <article className="counsellingServicePage__programCard">
                <h3 className="counsellingServicePage__programCardTitle">{premaritalProgramCards.support.title}</h3>
                <ul className="counsellingServicePage__programList">
                  {premaritalProgramCards.support.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </div>
          </section>
        ) : null}
        {isPremaritalService ? (
          <section
            ref={premaritalCtaRef}
            className={`counsellingServicePage__premaritalCta${isPremaritalCtaVisible ? ' counsellingServicePage__premaritalCta--visible' : ''}`}
            aria-label="Book premarital counselling"
          >
            <div className="counsellingServicePage__premaritalCtaMedia" aria-hidden>
              <img
                className="counsellingServicePage__premaritalCtaImage"
                src={premaritalCTA.image}
                alt=""
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="counsellingServicePage__premaritalCtaScrim" aria-hidden />
            <div className="counsellingServicePage__premaritalCtaInner">
              <h2 className="counsellingServicePage__premaritalCtaHeading">{premaritalCTA.heading}</h2>
              <p className="counsellingServicePage__premaritalCtaBody">{premaritalCTA.body}</p>
              <p className="counsellingServicePage__premaritalCtaSubtitle">{premaritalCTA.subtitle}</p>
              <Link
                to={`/book-session?service=${encodeURIComponent(content.slug)}`}
                className="counsellingServicePage__premaritalCtaButton"
              >
                Book Now
              </Link>
            </div>
            <div className="counsellingServicePage__premaritalCtaWave" aria-hidden>
              <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="counsellingServicePage__premaritalCtaWaveSvg">
                <path
                  fill="currentColor"
                  d="M0,32 C240,8 480,40 720,24 C960,8 1200,40 1440,16 L1440,48 L0,48 Z"
                />
              </svg>
            </div>
          </section>
        ) : null}
        {isPrenatalService ? (
          <section
            ref={introRef}
            className={`counsellingServicePage__intro${isIntroVisible ? ' counsellingServicePage__intro--visible' : ''}`}
            aria-label="Prenatal wellbeing overview"
          >
            <div className="counsellingServicePage__introInner">
              <img
                className="counsellingServicePage__introImage"
                src={prenatalIntro.image}
                alt="Expectant mother reflecting calmly by a window"
                loading="lazy"
              />

              <div className="counsellingServicePage__introText">
                <h2 className="counsellingServicePage__introHeading">{prenatalIntro.title}</h2>
                <p className="counsellingServicePage__introParagraph counsellingServicePage__introParagraph--desktop">
                  {prenatalIntro.intro}
                </p>
                <p className="counsellingServicePage__introParagraph counsellingServicePage__introParagraph--mobile">
                  {prenatalIntro.introMobile}
                </p>
                <p className="counsellingServicePage__introLead">{prenatalIntro.leadIn}</p>
                <ul className="counsellingServicePage__introBenefits" role="list">
                  {prenatalIntro.points.map((point) => (
                    <li key={point} className="counsellingServicePage__introBenefitItem">
                      <HiCheckCircle className="counsellingServicePage__introBenefitIcon" aria-hidden />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ) : null}

        {isMotherhoodService ? (
          <section
            ref={motherhoodSupportRef}
            className={`counsellingServicePage__motherhoodSupport${isMotherhoodSupportVisible ? ' counsellingServicePage__motherhoodSupport--visible' : ''}`}
            aria-label="Resilient motherhood support overview"
          >
            <div className="counsellingServicePage__motherhoodSupportInner">
              <article className="counsellingServicePage__motherhoodRow">
                <div className="counsellingServicePage__motherhoodTextCard">
                  <h2 className="counsellingServicePage__motherhoodTitle">{motherhoodSupportSection.first.title}</h2>
                  <p className="counsellingServicePage__motherhoodBody">{motherhoodSupportSection.first.body}</p>
                </div>
                <img
                  className="counsellingServicePage__motherhoodImage"
                  src={motherhoodSupportSection.first.image}
                  alt={motherhoodSupportSection.first.imageAlt}
                  loading="lazy"
                />
              </article>

              <article className="counsellingServicePage__motherhoodRow counsellingServicePage__motherhoodRow--reverse">
                <img
                  className="counsellingServicePage__motherhoodImage"
                  src={motherhoodSupportSection.second.image}
                  alt={motherhoodSupportSection.second.imageAlt}
                  loading="lazy"
                />
                <div className="counsellingServicePage__motherhoodTextCard">
                  <h3 className="counsellingServicePage__motherhoodTitle">{motherhoodSupportSection.second.title}</h3>
                  <ul className="counsellingServicePage__motherhoodList" role="list">
                    {motherhoodSupportSection.second.points.map((point) => (
                      <li key={point} className="counsellingServicePage__motherhoodListItem">
                        <HiCheckCircle className="counsellingServicePage__motherhoodListIcon" aria-hidden />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </div>
          </section>
        ) : null}

        {isMotherhoodService ? (
          <section
            ref={programCardsRef}
            className={`counsellingServicePage__programCards counsellingServicePage__programCards--motherhood${isProgramCardsVisible ? ' counsellingServicePage__programCards--visible' : ''}`}
            aria-label="Program cards"
          >
            <div className="counsellingServicePage__programCardsGrid">
              <article className="counsellingServicePage__programCard">
                <h3 className="counsellingServicePage__programCardTitle">{motherhoodProgramCards.highlights.title}</h3>
                <p className="counsellingServicePage__programIntro">{motherhoodProgramCards.highlights.intro}</p>
                <ul className="counsellingServicePage__programRows" role="list">
                  {motherhoodProgramCards.highlights.rows.map((row) => (
                    <li key={row.label} className="counsellingServicePage__programRow">
                      <strong>{row.label}:</strong> {row.value}
                    </li>
                  ))}
                </ul>
              </article>

              <article className="counsellingServicePage__programCard">
                <h3 className="counsellingServicePage__programCardTitle">{motherhoodProgramCards.gains.title}</h3>
                <p className="counsellingServicePage__programIntro">{motherhoodProgramCards.gains.intro}</p>
                <ul className="counsellingServicePage__programList">
                  {motherhoodProgramCards.gains.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>

              <article className="counsellingServicePage__programCard">
                <h3 className="counsellingServicePage__programCardTitle">{motherhoodProgramCards.support.title}</h3>
                <p className="counsellingServicePage__programIntro">{motherhoodProgramCards.support.intro}</p>
                <ul className="counsellingServicePage__programList">
                  {motherhoodProgramCards.support.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </div>
          </section>
        ) : null}

        {isMotherhoodService ? (
          <section
            ref={bookingRef}
            className={`counsellingServicePage__bookingFlow${isBookingVisible ? ' counsellingServicePage__bookingFlow--visible' : ''}`}
            aria-label="How the program works"
          >
            <div className="counsellingServicePage__bookingInner">
              <h3 className="counsellingServicePage__bookingHeading">How It Works</h3>

              <div className="counsellingServicePage__bookingGrid">
                {motherhoodBookingSteps.map((step) => (
                  <article key={step.title} className="counsellingServicePage__bookingCard">
                    <div className="counsellingServicePage__bookingImageWrap">
                      <img
                        className="counsellingServicePage__bookingImage"
                        src={step.image ?? content.image}
                        alt={step.title}
                        loading="lazy"
                      />
                    </div>
                    <h4 className="counsellingServicePage__bookingTitle">{step.title}</h4>
                    <p className="counsellingServicePage__bookingText">{step.description}</p>
                  </article>
                ))}
              </div>

              <div className="counsellingServicePage__bookingActions">
                <Link to={`/book-session?service=${encodeURIComponent(content.slug)}`} className="counsellingServicePage__bookingButton">
                  Book Session
=======
        image={content.pageImage ?? content.image}
        ogImageAlt={content.imageAlt}
      />

      <section className="courseOverviewPage">
        <div className="courseOverviewPage__layout">
          <div className="courseOverviewPage__heroShell">
            <div
              className="courseOverviewPage__heroImage"
              style={{ backgroundImage: `linear-gradient(rgba(10, 14, 13, 0.22), rgba(10, 14, 13, 0.42)), url(${content.pageImage ?? content.image})` }}
              role="img"
              aria-label={content.imageAlt}
            >
              <div className="courseOverviewPage__heroOverlay">
                <div className="courseOverviewPage__heroBadge">Paid Course</div>
                <h1 className="courseOverviewPage__heroTitle">{content.title}</h1>
                <p className="courseOverviewPage__heroText">{heroDescription}</p>
                <Link to={`/book-session?service=${encodeURIComponent(content.slug)}`} className="courseOverviewPage__heroButton">
                  Enrol Now
>>>>>>> db3fbed (Featured programs update)
                </Link>
              </div>
            </div>
          </div>

          <aside className="courseOverviewPage__sidebar" aria-label="Course details and weekly content">
            <div className="courseOverviewPage__sidebarCard">
              <div className="courseOverviewPage__sidebarHeader">
                <p className="courseOverviewPage__sidebarKicker">Course overview</p>
                <h2 className="courseOverviewPage__sidebarTitle">{content.title}</h2>
                <p className="courseOverviewPage__sidebarDescription">{heroDescription}</p>
                <button className="courseOverviewPage__tutorButton" type="button" disabled aria-disabled="true">
                  View Tutor Profile
                </button>
              </div>

              <div className="courseOverviewPage__sidebarSection">
                <div className="courseOverviewPage__sidebarSectionHeader">
                  <h3 className="courseOverviewPage__sidebarSectionTitle">Course content</h3>
                  <span className="courseOverviewPage__sidebarSectionMeta">Weekly</span>
                </div>

                <div className="courseOverviewPage__accordion" role="list">
                  {weeklyContent.map((item, index) => {
                    const isOpen = openWeek === index

                    return (
                      <article key={item.week} className={`courseOverviewPage__accordionItem${isOpen ? ' courseOverviewPage__accordionItem--open' : ''}`} role="listitem">
                        <button
                          type="button"
                          className="courseOverviewPage__accordionButton"
                          onClick={() => setOpenWeek(isOpen ? -1 : index)}
                          aria-expanded={isOpen}
                        >
                          <span>
                            <span className="courseOverviewPage__accordionWeek">{item.week}</span>
                            <span className="courseOverviewPage__accordionTitle">{item.title}</span>
                          </span>
                          <span className="courseOverviewPage__accordionChevron" aria-hidden>
                            {isOpen ? '−' : '⌄'}
                          </span>
                        </button>

                        {isOpen ? (
                          <div className="courseOverviewPage__accordionBody">
                            <p>{item.description}</p>
                          </div>
                        ) : null}
                      </article>
                    )
                  })}
                </div>
              </div>
            </div>
          </aside>
        </div>

        <div className="courseOverviewPage__tabsWrap">
          <div className="courseOverviewPage__tabs" role="tablist" aria-label="Course sections">
            {courseTabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.key}
                className={`courseOverviewPage__tab${activeTab === tab.key ? ' courseOverviewPage__tab--active' : ''}`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="courseOverviewPage__panels">
            {activeTab === 'overview' ? (
              <section className="courseOverviewPage__panel" aria-labelledby="overview-panel-title">
                <h2 id="overview-panel-title" className="courseOverviewPage__panelTitle">
                  About this course
                </h2>
                <p className="courseOverviewPage__panelIntro">{aboutCourse}</p>

                <div className="courseOverviewPage__highlightGrid" aria-label="Program highlights">
                  {programHighlights.map((item) => (
                    <OverviewCard key={item.title} title={item.title} value={item.value} />
                  ))}
                </div>
              </section>
            ) : null}

            {activeTab === 'notes' ? (
              <section className="courseOverviewPage__panel" aria-labelledby="notes-panel-title">
                <h2 id="notes-panel-title" className="courseOverviewPage__panelTitle">
                  Notes
                </h2>
                <div className="courseOverviewPage__emptyState">Notes will appear here soon.</div>
              </section>
            ) : null}

            {activeTab === 'quizzes' ? (
              <section className="courseOverviewPage__panel" aria-labelledby="quizzes-panel-title">
                <h2 id="quizzes-panel-title" className="courseOverviewPage__panelTitle">
                  Quizzes
                </h2>
                <div className="courseOverviewPage__emptyState">Quiz content is coming soon.</div>
              </section>
            ) : null}

            {activeTab === 'certificate' ? (
              <section className="courseOverviewPage__panel" aria-labelledby="certificate-panel-title">
                <h2 id="certificate-panel-title" className="courseOverviewPage__panelTitle">
                  Certificate
                </h2>
                <div className="courseOverviewPage__certificateCard">Certificate awarded upon completion.</div>
              </section>
            ) : null}

            {activeTab === 'reviews' ? (
              <section className="courseOverviewPage__panel" aria-labelledby="reviews-panel-title">
                <h2 id="reviews-panel-title" className="courseOverviewPage__panelTitle">
                  Reviews
                </h2>
                <div className="courseOverviewPage__emptyState">Reviews will be added here later.</div>
              </section>
            ) : null}
          </div>
        </div>
      </section>
    </>
  )
}