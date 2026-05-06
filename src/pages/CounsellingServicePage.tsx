import { Link, Navigate, useParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { HiCheckCircle } from 'react-icons/hi2'
import SEOHead from '../components/seo/SEOHead'
import { counsellingServicesBySlug } from '../constants/counsellingServices'
import './CounsellingServicePage.css'

const debriefMosaicContent = [
  {
    type: 'text',
    title: 'Why This Matters',
    body: 'Unprocessed grief can quietly affect your emotions, relationships, and daily functioning. Taking time to process what you have been through helps you regain balance, build emotional resilience, and move forward with greater clarity and stability.',
  },
  { type: 'image' },
  {
    type: 'text',
    title: 'What You May Be Experiencing',
    body: 'You may be feeling deep sadness, confusion, emotional numbness, or being overwhelmed by constant thoughts and memories. At times, it can feel difficult to cope, stay present, or understand your own emotions.',
  },
  { type: 'image' },
  {
    type: 'text',
    title: 'Who This Service Supports',
    body: 'This service is for anyone experiencing loss, emotional pain, or a challenging life transition. If you are finding it hard to process your feelings or move forward, this space offers support and understanding.',
  },
  { type: 'image' },
] as const

const debriefProgramCards = {
  highlights: {
    title: 'Program Highlights',
    rows: [
      { label: 'Duration', value: '20 hrs' },
      { label: 'Session Length', value: '2 hours per week' },
      { label: 'Location', value: 'Online or Physical Sessions' },
      { label: 'Certificate', value: 'Awarded upon completion' },
      { label: 'Individual Counselling', value: 'Ksh 40,000' },
      { label: 'Group Counselling', value: 'Ksh 50,000' },
    ],
  },
  gains: {
    title: "What You'll Gain",
    items: [
      'Emotional healing and a safe space to process your grief with compassion.',
      'Better understanding and acceptance of your emotions and experiences.',
      'Practical ways to cope with emotional overwhelm in daily life.',
      'A sense of stability, grounding, and emotional balance over time.',
      'Gradual restoration of hope, clarity, and inner peace.',
    ],
  },
  support: {
    title: 'How We Help',
    items: [
      'Provide a safe, compassionate, and non-judgmental space to express yourself.',
      'Offer guided conversations to help you process emotions at your own pace.',
      'Help you make sense of your thoughts and experiences in a structured way.',
      'Support emotional healing through active listening and gentle guidance.',
      'Equip you with practical coping strategies for daily emotional balance.',
      'Help you gradually regain clarity, stability, and inner calm.',
    ],
  },
} as const

const prenatalProgramCards = {
  highlights: {
    title: 'Program Highlights',
    rows: [
      { label: 'Duration', value: '20 hrs' },
      { label: 'Session Length', value: '2 hours per week' },
      { label: 'Location', value: 'Online or Physical Sessions' },
      { label: 'Certificate', value: 'Awarded upon completion' },
      { label: 'Individual Counselling', value: 'Ksh 40,000' },
      { label: 'Group Counselling', value: 'Ksh 50,000' },
    ],
  },
  gains: {
    title: "What You'll Gain",
    items: [
      'Greater emotional balance and calm throughout your pregnancy',
      'Increased confidence in preparing for motherhood',
      'Practical ways to manage stress, anxiety, and emotional changes',
      'A stronger sense of connection to yourself and your journey',
      'Improved readiness for the transition into motherhood',
    ],
  },
  support: {
    title: 'How We Help',
    items: [
      'Provide a safe, nurturing space to express your thoughts and emotions',
      'Support you in managing pregnancy-related stress and uncertainty',
      'Help you understand and navigate emotional and lifestyle changes',
      'Offer gentle guidance to build confidence and emotional resilience',
      'Encourage reflection and preparation for motherhood at your own pace',
      'Equip you with simple, practical tools for everyday wellbeing',
    ],
  },
} as const

const debriefBookingSteps: ReadonlyArray<{
  title: string
  description: string
  image?: string
}> = [
  {
    title: '1. Reserve Your Slot',
    description: 'Choose a date and time that fits your schedule and secure your session in just a few steps.',
    image: 'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/bookslot.avif',
  },
  {
    title: '2. Connect & Talk',
    description: 'Meet your counsellor in a safe and private space, either through a secure online session link or in person, depending on your preference.',
    image: 'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/debrief.jpg',
  },
  {
    title: '3. Begin to Heal',
    description: 'Begin your healing journey with supportive guidance, emotional clarity, and simple, practical steps to help you move forward.',
  },
] as const

const prenatalBookingSteps: ReadonlyArray<{
  title: string
  description: string
  image?: string
}> = [
  {
    title: '1. Reserve Your Slot',
    description: 'Choose a date and time that feels right for you and secure your prenatal wellbeing session in a few easy steps.',
    image: 'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/bookslot.avif',
  },
  {
    title: '2. Connect & Reflect',
    description: 'Meet your counsellor in a safe and supportive space to talk through your emotions, concerns, and expectations during pregnancy.',
    image: 'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/whyprenatal.webp',
  },
  {
    title: '3. Prepare with Confidence',
    description: 'Build practical emotional tools, clarity, and calm so you can move through pregnancy and motherhood with greater confidence.',
    image: 'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/prenatal%20nursery-Photoroom.webp',
  },
] as const

const prenatalIntro = {
  title: 'Why Prenatal Wellbeing Matters',
  intro:
    'Pregnancy is not only a physical journey but also an emotional and mental one. As your body, routine, and relationships change, it is natural to experience a mix of excitement, uncertainty, and emotional shifts. Taking time to care for your wellbeing during this period helps you feel more grounded, supported, and confident as you prepare for motherhood.',
  introMobile:
    'Pregnancy brings physical, emotional, and mental changes. Caring for your wellbeing helps you feel grounded, supported, and more confident for motherhood.',
  leadIn: 'Focusing on your emotional wellbeing during pregnancy can help you:',
  points: [
    'Better manage stress, anxiety, and emotional changes',
    'Feel more confident and prepared for motherhood',
    'Adjust to lifestyle and relationship changes more smoothly',
    'Build a calm, supportive foundation for yourself and your baby',
  ],
  outro:
    'Prioritising your wellbeing during this time allows you to move through your pregnancy with greater ease, clarity, and a stronger sense of emotional readiness for the journey ahead.',
  outroMobile:
    'Prioritising wellbeing helps you move through pregnancy with more calm, clarity, and emotional readiness.',
  image: 'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/whyprenatal.webp',
} as const

const prenatalJourney = {
  title: 'A Space Just for You and Your Journey',
  body: [
    'Pregnancy is a deeply personal experience, and every journey into motherhood is unique. Whether you are a first-time mum navigating new emotions and uncertainties, or preparing to welcome another child while balancing life\'s demands, this space is designed with you in mind.',
    'Through gentle guidance and supportive conversations, you are given the time, care, and understanding needed to reflect, adjust, and prepare for motherhood with confidence and emotional clarity.',
  ],
  subTitle: 'Who This Program Is For',
  leadIn: 'This program is designed for:',
  points: [
    'First-time mothers adjusting to the emotional and physical changes of pregnancy',
    'Expectant mothers experiencing stress, anxiety, or uncertainty',
    'Women seeking emotional support, clarity, and confidence during pregnancy',
    'Partners who wish to be involved and supportive during the journey',
  ],
  leftImage: 'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/prenatal%20nursery-Photoroom.webp',
  rightImage: 'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/whyprenatal.webp',
} as const

export default function CounsellingServicePage() {
  const { slug } = useParams<{ slug: string }>()
  const content = slug ? counsellingServicesBySlug[slug] : undefined
  const introRef = useRef<HTMLElement | null>(null)
  const prenatalJourneyRef = useRef<HTMLElement | null>(null)
  const mosaicRef = useRef<HTMLElement | null>(null)
  const programCardsRef = useRef<HTMLElement | null>(null)
  const bookingRef = useRef<HTMLElement | null>(null)
  const [isIntroVisible, setIsIntroVisible] = useState(false)
  const [isPrenatalJourneyVisible, setIsPrenatalJourneyVisible] = useState(false)
  const [isMosaicVisible, setIsMosaicVisible] = useState(false)
  const [isProgramCardsVisible, setIsProgramCardsVisible] = useState(false)
  const [isBookingVisible, setIsBookingVisible] = useState(false)

  useEffect(() => {
    const introEl = introRef.current
    const prenatalJourneyEl = prenatalJourneyRef.current
    const mosaicEl = mosaicRef.current
    const programCardsEl = programCardsRef.current
    const bookingEl = bookingRef.current
    if (!introEl && !prenatalJourneyEl && !mosaicEl && !programCardsEl && !bookingEl) return

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === prenatalJourneyEl) {
          setIsPrenatalJourneyVisible(entry.isIntersecting)
          return
        }
        if (!entry.isIntersecting) return
        if (entry.target === introEl) setIsIntroVisible(true)
        if (entry.target === mosaicEl) setIsMosaicVisible(true)
        if (entry.target === programCardsEl) setIsProgramCardsVisible(true)
        if (entry.target === bookingEl) setIsBookingVisible(true)
        observer.unobserve(entry.target)
      })
    }, {
      threshold: 0.22,
    })

    if (introEl) observer.observe(introEl)
    if (prenatalJourneyEl) observer.observe(prenatalJourneyEl)
    if (mosaicEl) observer.observe(mosaicEl)
    if (programCardsEl) observer.observe(programCardsEl)
    if (bookingEl) observer.observe(bookingEl)

    return () => {
      if (introEl) observer.unobserve(introEl)
      if (prenatalJourneyEl) observer.unobserve(prenatalJourneyEl)
      if (mosaicEl) observer.unobserve(mosaicEl)
      if (programCardsEl) observer.unobserve(programCardsEl)
      if (bookingEl) observer.unobserve(bookingEl)
      observer.disconnect()
    }
  }, [slug])

  if (!content) {
    return <Navigate to="/" replace />
  }
  const heroDescription = content.pageDescription ?? content.description
  const isDebriefService =
    content.id === 'debrief-grief-support' ||
    content.slug === 'debrief-grief-loss-support' ||
    content.slug.includes('debrief')
  const isPrenatalService =
    content.id === 'prenatal-wellbeing-support' ||
    content.slug === 'prenatal-wellbeing-support' ||
    content.slug.includes('prenatal')
  const pageImage = content.pageImage ?? content.image
  const pageKeywords = isPrenatalService
    ? 'prenatal wellbeing support Kenya, pregnancy counselling Kenya, maternal mental health support, emotional support during pregnancy, pregnancy stress counselling, expectant mothers support'
    : undefined
  const debriefMosaicImage = 'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/shot.jpg'
  const debriefMosaicImageMiddle = 'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/sliideee.webp'
  const debriefMosaicImageLast = 'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/consoling.jpeg'
  const mosaicImages = isDebriefService
    ? [debriefMosaicImage, debriefMosaicImageMiddle, debriefMosaicImageLast]
    : [content.introSectionImage ?? pageImage, pageImage, content.introSectionImage ?? pageImage]
  

  return (
    <>
      <SEOHead
        title={content.title}
        description={heroDescription}
        path={`/counselling-services/${content.slug}`}
        schemaPageType="WebPage"
        image={pageImage}
        ogImageAlt={content.imageAlt}
        keywords={pageKeywords}
      />
      <section className={`counsellingServicePage${isPrenatalService ? ' counsellingServicePage--prenatal' : ''}`}>
        <div
          className="counsellingServicePage__hero"
          style={{ backgroundImage: `linear-gradient(rgba(15, 19, 18, 0.55), rgba(15, 19, 18, 0.55)), url(${pageImage})` }}
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
              ) : (
                heroDescription
              )}
            </p>
            <Link to={`/book-session?service=${encodeURIComponent(content.slug)}`} className="counsellingServicePage__bookButton">
              Book Session
            </Link>
          </div>
        </div>

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
            <div className="counsellingServicePage__introFooter">
              <p className="counsellingServicePage__introParagraph counsellingServicePage__introParagraph--desktop">
                {prenatalIntro.outro}
              </p>
              <p className="counsellingServicePage__introParagraph counsellingServicePage__introParagraph--mobile">
                {prenatalIntro.outroMobile}
              </p>
            </div>
          </section>
        ) : content.introSectionBody && content.introSectionImage ? (
          <section
            ref={introRef}
            className={`counsellingServicePage__intro${isIntroVisible ? ' counsellingServicePage__intro--visible' : ''}`}
            aria-label="Service overview"
          >
            <div className="counsellingServicePage__introInner">
              <div className="counsellingServicePage__introText">{content.introSectionBody}</div>
              <img
                className="counsellingServicePage__introImage"
                src={content.introSectionImage}
                alt={content.introSectionImageAlt ?? `${content.title} supporting image`}
                loading="lazy"
              />
            </div>
          </section>
        ) : null}

        {isPrenatalService ? (
          <section
            ref={prenatalJourneyRef}
            className={`counsellingServicePage__prenatalJourney${isPrenatalJourneyVisible ? ' counsellingServicePage__prenatalJourney--visible' : ''}`}
            aria-label="Prenatal support overview"
          >
            <div className="counsellingServicePage__prenatalJourneyFrame">
              <aside className="counsellingServicePage__prenatalJourneySide counsellingServicePage__prenatalJourneySide--left" aria-hidden>
                <img src={prenatalJourney.leftImage} alt="" loading="lazy" />
              </aside>

              <article className="counsellingServicePage__prenatalJourneyContent">
                <h2 className="counsellingServicePage__prenatalJourneyTitle">{prenatalJourney.title}</h2>
                {prenatalJourney.body.map((paragraph) => (
                  <p key={paragraph} className="counsellingServicePage__prenatalJourneyText">
                    {paragraph}
                  </p>
                ))}

                <h3 className="counsellingServicePage__prenatalJourneySubtitle">{prenatalJourney.subTitle}</h3>
                <p className="counsellingServicePage__prenatalJourneyLead">{prenatalJourney.leadIn}</p>
                <ul className="counsellingServicePage__prenatalJourneyList" role="list">
                  {prenatalJourney.points.map((point) => (
                    <li key={point} className="counsellingServicePage__prenatalJourneyListItem">
                      <HiCheckCircle className="counsellingServicePage__prenatalJourneyListIcon" aria-hidden />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>

              <aside className="counsellingServicePage__prenatalJourneySide counsellingServicePage__prenatalJourneySide--right" aria-hidden>
                <img src={prenatalJourney.rightImage} alt="" loading="lazy" />
              </aside>
             </div>
          </section>
        ) : null}

        {isPrenatalService ? (
          <section
            ref={programCardsRef}
            className={`counsellingServicePage__programCards${isProgramCardsVisible ? ' counsellingServicePage__programCards--visible' : ''}`}
            aria-label="Program cards"
          >
            <div className="counsellingServicePage__programCardsGrid">
              <article className="counsellingServicePage__programCard">
                <h3 className="counsellingServicePage__programCardTitle">{prenatalProgramCards.highlights.title}</h3>
                <ul className="counsellingServicePage__programRows" role="list">
                  {prenatalProgramCards.highlights.rows.map((row) => (
                    <li key={row.label} className="counsellingServicePage__programRow">
                      <strong>{row.label}:</strong> {row.value}
                    </li>
                  ))}
                </ul>
              </article>

              <article className="counsellingServicePage__programCard">
                <h3 className="counsellingServicePage__programCardTitle">{prenatalProgramCards.gains.title}</h3>
                <ul className="counsellingServicePage__programList">
                  {prenatalProgramCards.gains.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>

              <article className="counsellingServicePage__programCard">
                <h3 className="counsellingServicePage__programCardTitle">{prenatalProgramCards.support.title}</h3>
                <ul className="counsellingServicePage__programList">
                  {prenatalProgramCards.support.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </div>
          </section>
        ) : null}

        {isPrenatalService ? (
          <section
            ref={bookingRef}
            className={`counsellingServicePage__bookingFlow${isBookingVisible ? ' counsellingServicePage__bookingFlow--visible' : ''}`}
            aria-label="How to book a session"
          >
            <div className="counsellingServicePage__bookingInner">
              <h3 className="counsellingServicePage__bookingHeading">How to Book a Session</h3>

              <div className="counsellingServicePage__bookingGrid">
                {prenatalBookingSteps.map((step) => (
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

              <Link to={`/book-session?service=${encodeURIComponent(content.slug)}`} className="counsellingServicePage__bookingButton">
                Book Session
              </Link>
            </div>
          </section>
        ) : null}

        {isDebriefService ? (
          <>
            <section
              ref={mosaicRef}
              className={`counsellingServicePage__mosaic${isMosaicVisible ? ' counsellingServicePage__mosaic--visible' : ''}`}
              aria-label="Grief support highlights"
            >
              <div className="counsellingServicePage__mosaicGrid">
                {debriefMosaicContent.map((item, index) => {
                  if (item.type === 'image') {
                    const imageSrc = mosaicImages[Math.floor(index / 2)] ?? content.image
                    return (
                      <article key={`mosaic-image-${index}`} className="counsellingServicePage__mosaicCell">
                        <img
                          className="counsellingServicePage__mosaicImage"
                          src={imageSrc}
                          alt={content.imageAlt}
                          loading="lazy"
                        />
                      </article>
                    )
                  }

                  return (
                    <article key={item.title} className="counsellingServicePage__mosaicCell counsellingServicePage__mosaicCell--text">
                      <h3 className="counsellingServicePage__mosaicTitle">{item.title}</h3>
                      <p className="counsellingServicePage__mosaicBody">{item.body}</p>
                    </article>
                  )
                })}
              </div>
            </section>

            <section
              ref={programCardsRef}
              className={`counsellingServicePage__programCards${isProgramCardsVisible ? ' counsellingServicePage__programCards--visible' : ''}`}
              aria-label="Program cards"
            >
              <div className="counsellingServicePage__programCardsGrid">
                <article className="counsellingServicePage__programCard">
                  <h3 className="counsellingServicePage__programCardTitle">{debriefProgramCards.highlights.title}</h3>
                  <ul className="counsellingServicePage__programRows" role="list">
                    {debriefProgramCards.highlights.rows.map((row) => (
                      <li key={row.label} className="counsellingServicePage__programRow">
                        <strong>{row.label}:</strong> {row.value}
                      </li>
                    ))}
                  </ul>
                </article>

                <article className="counsellingServicePage__programCard">
                  <h3 className="counsellingServicePage__programCardTitle">{debriefProgramCards.gains.title}</h3>
                  <ul className="counsellingServicePage__programList">
                    {debriefProgramCards.gains.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>

                <article className="counsellingServicePage__programCard">
                  <h3 className="counsellingServicePage__programCardTitle">{debriefProgramCards.support.title}</h3>
                  <ul className="counsellingServicePage__programList">
                    {debriefProgramCards.support.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              </div>
            </section>

            <section
              ref={bookingRef}
              className={`counsellingServicePage__bookingFlow${isBookingVisible ? ' counsellingServicePage__bookingFlow--visible' : ''}`}
              aria-label="How to book a session"
            >
              <div className="counsellingServicePage__bookingInner">
                <h3 className="counsellingServicePage__bookingHeading">How to Book a Session</h3>

                <div className="counsellingServicePage__bookingGrid">
                  {debriefBookingSteps.map((step, index) => {
                    const imageSrc = step.image ?? mosaicImages[index] ?? content.image
                    return (
                      <article key={step.title} className="counsellingServicePage__bookingCard">
                        <div className="counsellingServicePage__bookingImageWrap">
                          <img
                            className="counsellingServicePage__bookingImage"
                            src={imageSrc}
                            alt={step.title}
                            loading="lazy"
                          />
                        </div>
                        <h4 className="counsellingServicePage__bookingTitle">{step.title}</h4>
                        <p className="counsellingServicePage__bookingText">{step.description}</p>
                      </article>
                    )
                  })}
                </div>

                <Link to={`/book-session?service=${encodeURIComponent(content.slug)}`} className="counsellingServicePage__bookingButton">
                  Book Session
                </Link>
              </div>
            </section>
          </>
        ) : null}
      </section>
    </>
  )
}
