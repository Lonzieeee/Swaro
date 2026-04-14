import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import './AboutSnapshot.css'

const KEY_POINTS = [
  'Evidence-led work across education, research & wellbeing',
  '30+ years of academic and professional leadership',
  'Holistic, ethical support for people and communities',
] as const

const BODY_COPY =
  'We combine education, counselling, research, and community development so individuals and organisations can thrive—evidence-led, compassionate, and focused on lasting impact in Kenya and beyond.'

function packRevealWords(text: string, start: { n: number }) {
  return text
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => ({ w, d: start.n++ }))
}

const REVEAL_START = { n: 0 }
const REVEAL = {
  label: packRevealWords('About Us', REVEAL_START),
  headingLead: packRevealWords('Transforming Lives Through', REVEAL_START),
  headingAccent: packRevealWords('Knowledge & Empowerment', REVEAL_START),
  body: packRevealWords(BODY_COPY, REVEAL_START),
  points: KEY_POINTS.map((p) => packRevealWords(p, REVEAL_START)),
} as const

const MOTION_LINE = 'About SWARO Consulty Services'
const MOTION_LAYERS = 4

const MOTION_CHARS = [...MOTION_LINE]
const MOTION_MID = (MOTION_CHARS.length - 1) / 2
const MOTION_STEP_DEG = 360 / MOTION_CHARS.length

export default function AboutSnapshot() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const ringStyle = (layer: number) =>
    ({
      ['--text']: layer,
      ['--mid']: MOTION_MID,
      ['--step']: `${MOTION_STEP_DEG}deg`,
    }) as CSSProperties

  return (
    <section
      ref={sectionRef}
      className={`aboutSnapshot${visible ? ' aboutSnapshot--visible' : ''}`}
      aria-label="About us"
    >
      <div className="aboutSnapshot__container">
        <div className="aboutSnapshot__visualCol">
          <div className="aboutSnapshot__motionStage">
            <p className="aboutSnapshot__motionReduced" aria-hidden="true">
              {MOTION_LINE}
            </p>

            <div className="aboutSnapshot__motion3d" aria-hidden="true">
              <div className="aboutSnapshot__motionPerspective">
                <div className="aboutSnapshot__motionTexts">
                  {Array.from({ length: MOTION_LAYERS }, (_, layer) => (
                    <div
                      key={layer}
                      className={`aboutSnapshot__motionRing aboutSnapshot__motionRing--${layer}`}
                      style={ringStyle(layer)}
                    >
                      {MOTION_CHARS.map((char, i) => (
                        <span
                          key={`${layer}-${i}-${char}`}
                          className="aboutSnapshot__motionLetter"
                          style={{ '--i': i } as CSSProperties}
                        >
                          {char === ' ' ? '\u00a0' : char}
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="aboutSnapshot__textCol">
          <div className="aboutSnapshot__label">
            <svg
              className="aboutSnapshot__labelIcon"
              width={14}
              height={14}
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
              <circle cx="12" cy="12" r="10" stroke="#C9A84C" strokeWidth="1.5" />
              <path
                d="M12 8v4l3 3"
                stroke="#C9A84C"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            {REVEAL.label.map(({ w, d }, i, arr) => (
              <span
                key={`lb-${d}`}
                className="aboutReveal__word aboutReveal__word--label"
                style={{ ['--d']: d } as CSSProperties}
              >
                {w}
                {i < arr.length - 1 ? ' ' : ''}
              </span>
            ))}
          </div>

          <h2 className="aboutSnapshot__heading">
            {REVEAL.headingLead.map(({ w, d }, i, arr) => (
              <span
                key={`hl-${d}`}
                className="aboutReveal__word aboutReveal__word--heading"
                style={{ ['--d']: d } as CSSProperties}
              >
                {w}
                {i < arr.length - 1 ? ' ' : ''}
              </span>
            ))}{' '}
            <span className="aboutSnapshot__headingAccent">
              {REVEAL.headingAccent.map(({ w, d }, i, arr) => (
                <span
                  key={`ha-${d}`}
                  className="aboutReveal__word aboutReveal__word--accent"
                  style={{ ['--d']: d } as CSSProperties}
                >
                  {w}
                  {i < arr.length - 1 ? ' ' : ''}
                </span>
              ))}
            </span>
          </h2>

          <div
            className="aboutSnapshot__divider aboutSnapshot__divider--reveal"
            style={{ ['--reveal-delay']: `${0.06 + REVEAL_START.n * 0.03}s` } as CSSProperties}
            aria-hidden
          />

          <p className="aboutSnapshot__body">
            {REVEAL.body.map(({ w, d }, i, arr) => (
              <span
                key={`bd-${d}`}
                className="aboutReveal__word aboutReveal__word--body"
                style={{ ['--d']: d } as CSSProperties}
              >
                {w}
                {i < arr.length - 1 ? ' ' : ''}
              </span>
            ))}
          </p>

          <ul className="aboutSnapshot__points">
            {KEY_POINTS.map((point, pi) => (
              <li key={point} className="aboutSnapshot__point">
                <span className="aboutSnapshot__pointDot" aria-hidden />
                <span className="aboutSnapshot__pointText">
                  {REVEAL.points[pi]!.map(({ w, d }, i, arr) => (
                    <span
                      key={`pt-${pi}-${d}`}
                      className="aboutReveal__word aboutReveal__word--point"
                      style={{ ['--d']: d } as CSSProperties}
                    >
                      {w}
                      {i < arr.length - 1 ? ' ' : ''}
                    </span>
                  ))}
                </span>
              </li>
            ))}
          </ul>

          <Link
            to="/about"
            className="aboutSnapshot__btn aboutSnapshot__btn--reveal"
            style={{ ['--btn-delay']: `${0.08 + REVEAL_START.n * 0.034}s` } as CSSProperties}
          >
            Learn More About Us
          </Link>
        </div>
      </div>
    </section>
  )
}
