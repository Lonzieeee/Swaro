import { Link, Navigate, useParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
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
      { label: 'Duration', value: '20 weeks' },
      { label: 'Session Length', value: '2 hours per week' },
      { label: 'Location', value: 'Online or Physical Sessions' },
      { label: 'Certificate', value: 'Awarded upon completion' },
      { label: 'Individual Counselling', value: 'Ksh 40,000' },
      { label: 'Group Counselling', value: 'Ksh 35,000' },
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

const debriefBookingSteps = [
  {
    title: '1. Reserve Your Slot',
    description: 'Choose a date and time that fits your schedule and secure your session in just a few steps.',
  },
  {
    title: '2. Connect & Talk',
    description: 'Meet your counsellor in a safe and private space, either through a secure online session link or in person, depending on your preference.',
  },
  {
    title: '3. Begin to Heal',
    description: 'Begin your healing journey with supportive guidance, emotional clarity, and simple, practical steps to help you move forward.',
  },
] as const

export default function CounsellingServicePage() {
  const { slug } = useParams<{ slug: string }>()
  const content = slug ? counsellingServicesBySlug[slug] : undefined
  const heroDescription = content?.pageDescription ?? content?.description
  const introRef = useRef<HTMLElement | null>(null)
  const mosaicRef = useRef<HTMLElement | null>(null)
  const programCardsRef = useRef<HTMLElement | null>(null)
  const bookingRef = useRef<HTMLElement | null>(null)
  const [isIntroVisible, setIsIntroVisible] = useState(false)
  const [isMosaicVisible, setIsMosaicVisible] = useState(false)
  const [isProgramCardsVisible, setIsProgramCardsVisible] = useState(false)
  const [isBookingVisible, setIsBookingVisible] = useState(false)

  useEffect(() => {
    const introEl = introRef.current
    const mosaicEl = mosaicRef.current
    const programCardsEl = programCardsRef.current
    const bookingEl = bookingRef.current
    if (!introEl && !mosaicEl && !programCardsEl && !bookingEl) return

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
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
    if (mosaicEl) observer.observe(mosaicEl)
    if (programCardsEl) observer.observe(programCardsEl)
    if (bookingEl) observer.observe(bookingEl)

    return () => {
      if (introEl) observer.unobserve(introEl)
      if (mosaicEl) observer.unobserve(mosaicEl)
      if (programCardsEl) observer.unobserve(programCardsEl)
      if (bookingEl) observer.unobserve(bookingEl)
      observer.disconnect()
    }
  }, [slug])

  if (!content) {
    return <Navigate to="/" replace />
  }
  const isDebriefService =
    content.id === 'debrief-grief-support' ||
    content.slug === 'debrief-grief-loss-support' ||
    content.slug.includes('debrief')
  const mosaicImages = [content.introSectionImage ?? content.image, content.image, content.introSectionImage ?? content.image]

  return (
    <>
      <SEOHead
        title={content.title}
        description={heroDescription}
        path={`/counselling-services/${slug}`}
        schemaPageType="WebPage"
        image={content.image}
        ogImageAlt={content.imageAlt}
      />
      <section className="counsellingServicePage">
        <div
          className="counsellingServicePage__hero"
          style={{ backgroundImage: `linear-gradient(rgba(15, 19, 18, 0.55), rgba(15, 19, 18, 0.55)), url(${content.image})` }}
          role="img"
          aria-label={content.imageAlt}
        >
          <div className="counsellingServicePage__inner">
            <div className="counsellingServicePage__label">Counselling Service</div>
            <h1 className="counsellingServicePage__heading">{content.title}</h1>
            <p className="counsellingServicePage__summary">{heroDescription}</p>
            <Link to="/contact" className="counsellingServicePage__bookButton">
              Book Session
            </Link>
          </div>
        </div>

        {content.introSectionBody && content.introSectionImage ? (
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
                    const imageSrc = mosaicImages[index] ?? content.image
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

                <Link to="/contact" className="counsellingServicePage__bookingButton">
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
