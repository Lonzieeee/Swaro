import { useCallback, useEffect, useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import './Hero.css'

const TRUST_INITIALS = ['S', 'M', 'A'] as const

const AUTO_ADVANCE_MS = 7500

const INTRO_BG =
  'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/hero%20bg(1).png'

type IntroSlide = {
  kind: 'intro'
  id: string
  image: string
}

type ServiceSlide = {
  kind: 'service'
  id: string
  pill: string
  image: string
  headline: string
  headlineMobile: string
  subtext: string
  subtextMobile: string
  to: string
}

type HeroSlideDef = IntroSlide | ServiceSlide

const HERO_SLIDES: readonly HeroSlideDef[] = [
  {
    kind: 'intro',
    id: 'home',
    image: INTRO_BG,
  },
  {
    kind: 'service',
    id: 'prenatal',
    pill: 'Prenatal wellbeing',
    image:
      'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/pregnanthero-76349fed-987c-4c9b-a5f0-c558d25e5360.jpg',
    headline: 'Prenatal wellbeing support',
    headlineMobile: 'Prenatal wellbeing',
    subtext:
      'Support for expectant mothers through emotional change—stress, confidence, and a steadier path into motherhood.',
    subtextMobile:
      'Emotional support for expectant mothers—stress, confidence, and preparing for motherhood.',
    to: '/counselling-services/prenatal-wellbeing-support',
  },
  {
    kind: 'service',
    id: 'marital',
    pill: 'Couples & marriage',
    image:
      'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/manandwoman.jpg',
    headline: 'Premarital & marital counselling',
    headlineMobile: 'Couples & marriage',
    subtext:
      'Build communication, shared expectations, and connection—before and during marriage—in person or online.',
    subtextMobile:
      'Stronger communication and expectations for couples—in person or online.',
    to: '/counselling-services/premarital-counselling',
  },
]

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [autoPaused, setAutoPaused] = useState(false)

  const slideCount = HERO_SLIDES.length
  const trackPercent = 100 / slideCount

  useEffect(() => {
    if (autoPaused) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) return

    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % slideCount)
    }, AUTO_ADVANCE_MS)
    return () => window.clearInterval(id)
  }, [autoPaused, slideCount])

  const pauseAuto = useCallback(() => setAutoPaused(true), [])
  const resumeAuto = useCallback(() => setAutoPaused(false), [])

  return (
    <section
      className="hero"
      aria-roledescription="carousel"
      aria-label="Swaro Institute home hero"
      onMouseEnter={pauseAuto}
      onMouseLeave={resumeAuto}
      onFocusCapture={() => setAutoPaused(true)}
      onBlurCapture={(e) => {
        const next = e.relatedTarget
        if (next instanceof Node && e.currentTarget.contains(next)) return
        setAutoPaused(false)
      }}
    >
      <div className="hero__viewport">
        <div
          className="hero__track"
          style={
            {
              width: `${slideCount * 100}%`,
              transform: `translateX(-${activeIndex * trackPercent}%)`,
              '--hero-slide-count': slideCount,
            } as CSSProperties
          }
        >
          {HERO_SLIDES.map((slide) => (
            <div
              key={slide.id}
              className={`hero__panel${slide.kind === 'intro' ? ' hero__panel--intro' : ''}`}
            >
              <div
                className="hero__panel-bg"
                style={{
                  // Quoted url() is required when the path contains "(" or ")" (e.g. hero bg(1).png)
                  backgroundImage: `url("${slide.image}")`,
                }}
                aria-hidden
              />
              <div className="hero__panel-overlay" aria-hidden />

              <div className="hero__container">
                <div className="hero__content">
                  {slide.kind === 'intro' ? (
                    <div className="hero__copy-block">
                      <div className="hero__pill">
                        <span className="hero__pill-dot" />
                        <span className="hero__pill-text">Welcome to Swaro Institute</span>
                      </div>

                      <h1 className="hero__headline">
                        <span className="hero__hide-mobile">
                          Empowering Lives Through{' '}
                          <span className="hero__headline-accent">Research, Knowledge</span> &amp;
                          Transformation
                        </span>
                        <span className="hero__hide-desktop">
                          Empowering lives through{' '}
                          <span className="hero__headline-accent">research</span> &amp; transformation
                        </span>
                      </h1>

                      <p className="hero__subtext hero__hide-mobile">
                        A leading consultancy dedicated to education, counselling, research and community
                        development — transforming individuals and communities across Kenya and beyond.
                      </p>
                      <p className="hero__subtext hero__subtext--compact hero__hide-desktop">
                        Education, counselling, research &amp; community development across Kenya and beyond.
                      </p>

                      <div className="hero__buttons">
                        <Link
                          to="/contact"
                          className="hero__btn hero__btn--primary"
                          aria-label="Book a consultation"
                        >
                          <span className="hero__hide-mobile">Book a Consultation</span>
                          <span className="hero__hide-desktop">Book consultation</span>
                        </Link>
                        <Link
                          to="/partnerships"
                          className="hero__btn hero__btn--secondary"
                          aria-label="Partnerships"
                        >
                          <span className="hero__hide-mobile">Partnerships</span>
                          <span className="hero__hide-desktop">Partnerships</span>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="hero__copy-block">
                      <div className="hero__pill">
                        <span className="hero__pill-dot" />
                        <span className="hero__pill-text">{slide.pill}</span>
                      </div>

                      <h1 className="hero__headline">
                        <span className="hero__hide-mobile">{slide.headline}</span>
                        <span className="hero__hide-desktop">{slide.headlineMobile}</span>
                      </h1>

                      <p className="hero__subtext hero__hide-mobile">{slide.subtext}</p>
                      <p className="hero__subtext hero__subtext--compact hero__hide-desktop">
                        {slide.subtextMobile}
                      </p>

                      <div className="hero__buttons">
                        <Link
                          to={slide.to}
                          className="hero__btn hero__btn--primary"
                          aria-label={`Learn more about ${slide.headline}`}
                        >
                          Learn more
                        </Link>
                        <Link
                          to="/contact"
                          className="hero__btn hero__btn--secondary"
                          aria-label="Book a consultation"
                        >
                          <span className="hero__hide-mobile">Book a Consultation</span>
                          <span className="hero__hide-desktop">Book consultation</span>
                        </Link>
                      </div>
                    </div>
                  )}

                  <div className="hero__trust">
                    <div className="hero__avatars">
                      {TRUST_INITIALS.map((letter) => (
                        <div key={letter} className="hero__avatar">
                          {letter}
                        </div>
                      ))}
                    </div>
                    <p className="hero__trust-text">
                      <span className="hero__hide-mobile">
                        Trusted by <strong>500+</strong> individuals, families &amp; organizations
                      </span>
                      <span className="hero__hide-desktop">
                        Trusted by <strong>500+</strong> clients
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="hero__scroll" aria-hidden>
        <div className="hero__scroll-line" />
        <span className="hero__scroll-text">scroll</span>
      </div>
    </section>
  )
}
