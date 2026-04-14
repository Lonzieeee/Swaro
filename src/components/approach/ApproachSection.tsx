import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import './ApproachSection.css'

type ApproachStep = {
  number: string
  title: string
  description: string
}

const leftSteps: readonly ApproachStep[] = [
  {
    number: '01',
    title: 'Evidence-Based Solutions',
    description:
      'Every intervention is grounded in rigorous research, data and proven methodologies to ensure real, measurable and lasting impact.',
  },
  {
    number: '02',
    title: 'Needs Assessment & Customization',
    description:
      "We conduct thorough needs assessments to design tailored solutions that directly address each client's unique context and goals.",
  },
  {
    number: '03',
    title: 'Interactive Training Methodologies',
    description:
      'Participatory, engaging and practical training approaches that maximize learning, retention and real-world application of skills.',
  },
]

const rightSteps: readonly ApproachStep[] = [
  {
    number: '04',
    title: 'Professional Counselling Frameworks',
    description:
      'Structured, ethical and evidence-based counselling frameworks that ensure safe, effective and transformative support for every client.',
  },
  {
    number: '05',
    title: 'Monitoring & Evaluation for Impact',
    description:
      'Continuous monitoring and evaluation systems that measure progress, ensure accountability and demonstrate lasting impact.',
  },
  {
    number: '06',
    title: 'Partnership & Collaboration',
    description:
      'Building strategic partnerships with organizations, communities and institutions to amplify reach and deepen sustainable impact.',
  },
]

const allSteps: readonly ApproachStep[] = [...leftSteps, ...rightSteps]

export default function ApproachSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const [motionless, setMotionless] = useState(false)

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setMotionless(true)
      setVisible(true)
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = sectionRef.current
    if (!el) return

    const revealIfInView = () => {
      const rect = el.getBoundingClientRect()
      const visiblePx = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0)
      const ratio = visiblePx / Math.max(rect.height, 1)
      if (ratio >= 0.55) setVisible(true)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        /* Trigger only when the section is substantially in view. */
        if (entry.intersectionRatio < 0.55) return
        setVisible(true)
        observer.unobserve(el)
      },
      {
        threshold: [0, 0.25, 0.45, 0.55, 0.7, 1],
      }
    )

    revealIfInView()
    observer.observe(el)
    window.addEventListener('scroll', revealIfInView, { passive: true })
    window.addEventListener('resize', revealIfInView)
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', revealIfInView)
      window.removeEventListener('resize', revealIfInView)
    }
  }, [])

  const sectionClass = [
    'approachSection',
    visible ? 'approachSection--visible' : '',
    motionless ? 'approachSection--motionless' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <section
      ref={sectionRef}
      id="about-approach"
      className={sectionClass}
      aria-labelledby="about-approach-heading"
    >
      <div className="approachSection__inner">
        <header className="approachSection__header">
          <div className="approachSection__label">
            How We Work
            <span className="approachSection__labelLine" aria-hidden />
          </div>
          <h2 id="about-approach-heading" className="approachSection__heading">
            Our <span className="approachSection__headingAccent">Research-Based</span> Approach
          </h2>
          <p className="approachSection__subtext">
            SWARO Consulty Services applies a rigorous, participatory and evidence-based approach to every
            engagement, ensuring real, measurable and lasting impact for every client we serve.
          </p>
        </header>

        <div className="approachSection__layout">
          <div className="approachSection__cardsCol">
            {leftSteps.map((step, index) => (
              <article key={step.number} className="approachSection__card" style={{ transitionDelay: `${0.12 * index + 0.2}s` }}>
                <span className="approachSection__number">{step.number}</span>
                <h3 className="approachSection__cardTitle">{step.title}</h3>
                <div className="approachSection__divider" aria-hidden />
                <p className="approachSection__cardBody">{step.description}</p>
                <span className="approachSection__accent" aria-hidden />
              </article>
            ))}
          </div>

          <div className="approachSection__circuit" aria-hidden>
            <svg viewBox="0 0 300 500" xmlns="http://www.w3.org/2000/svg" className="approachSection__svg">
              <defs>
                <linearGradient id="approachChipGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.96)" />
                  <stop offset="100%" stopColor="rgba(239,246,242,0.92)" />
                </linearGradient>
                <linearGradient id="approachChipTextGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1B4332" />
                  <stop offset="100%" stopColor="#3D6A57" />
                </linearGradient>
                <linearGradient id="approachPinGradient" x1="1" y1="0" x2="0" y2="0">
                  <stop offset="0%" stopColor="#D2B573" />
                  <stop offset="50%" stopColor="#B59246" />
                  <stop offset="100%" stopColor="#907332" />
                </linearGradient>
              </defs>

              <path d="M0 83 H80 V210 H108" className="trace-bg-swaro" />
              <path d="M0 83 H80 V210 H108" className="trace-flow-swaro swaro-gold" />
              <path d="M0 250 H60 V230 H108" className="trace-bg-swaro" />
              <path d="M0 250 H60 V230 H108" className="trace-flow-swaro swaro-teal" />
              <path d="M0 417 H80 V270 H108" className="trace-bg-swaro" />
              <path d="M0 417 H80 V270 H108" className="trace-flow-swaro swaro-plum" />

              <path d="M300 83 H220 V210 H192" className="trace-bg-swaro" />
              <path d="M300 83 H220 V210 H192" className="trace-flow-swaro swaro-grn2" />
              <path d="M300 250 H240 V230 H192" className="trace-bg-swaro" />
              <path d="M300 250 H240 V230 H192" className="trace-flow-swaro swaro-coral" />
              <path d="M300 417 H220 V270 H192" className="trace-bg-swaro" />
              <path d="M300 417 H220 V270 H192" className="trace-flow-swaro swaro-gold2" />

              <circle cx="0" cy="83" r="5" fill="#C9A84C" opacity="0.55" />
              <circle cx="0" cy="250" r="5" fill="#2CA58D" opacity="0.5" />
              <circle cx="0" cy="417" r="5" fill="#6C63FF" opacity="0.45" />
              <circle cx="300" cy="83" r="5" fill="#52B788" opacity="0.55" />
              <circle cx="300" cy="250" r="5" fill="#E76F51" opacity="0.55" />
              <circle cx="300" cy="417" r="5" fill="#C9A84C" opacity="0.55" />

              <rect x="106" y="180" width="4" height="10" fill="url(#approachPinGradient)" rx="1.5" />
              <rect x="106" y="200" width="4" height="10" fill="url(#approachPinGradient)" rx="1.5" />
              <rect x="106" y="220" width="4" height="10" fill="url(#approachPinGradient)" rx="1.5" />
              <rect x="106" y="240" width="4" height="10" fill="url(#approachPinGradient)" rx="1.5" />
              <rect x="106" y="260" width="4" height="10" fill="url(#approachPinGradient)" rx="1.5" />

              <rect
                x="110"
                y="168"
                width="80"
                height="164"
                rx="14"
                fill="url(#approachChipGradient)"
                stroke="rgba(201,168,76,0.95)"
                strokeWidth="1.4"
                className="approachSection__chipBody"
              />

              <rect x="190" y="180" width="4" height="10" fill="url(#approachPinGradient)" rx="1.5" />
              <rect x="190" y="200" width="4" height="10" fill="url(#approachPinGradient)" rx="1.5" />
              <rect x="190" y="220" width="4" height="10" fill="url(#approachPinGradient)" rx="1.5" />
              <rect x="190" y="240" width="4" height="10" fill="url(#approachPinGradient)" rx="1.5" />
              <rect x="190" y="260" width="4" height="10" fill="url(#approachPinGradient)" rx="1.5" />

              <text x="150" y="232" fontFamily="DM Serif Display, serif" fontSize="14" fill="#C9A84C" textAnchor="middle" fontStyle="italic">
                SWARO
              </text>
              <text
                x="150"
                y="249"
                fontFamily="DM Sans, sans-serif"
                fontSize="8.2"
                fontWeight="600"
                fill="#1B4332"
                textAnchor="middle"
                letterSpacing="1.15"
                style={{ textShadow: '0 1px 0 rgba(255,255,255,0.55)' }}
              >
                APPROACH
              </text>
              <text
                x="150"
                y="265"
                fontFamily="DM Sans, sans-serif"
                fontSize="7.2"
                fontWeight="500"
                fill="#8A6B2B"
                textAnchor="middle"
                letterSpacing="0.4"
                style={{ textShadow: '0 1px 0 rgba(255,255,255,0.4)' }}
              >
                METHODOLOGY
              </text>

              <rect
                x="104"
                y="166"
                width="96"
                height="168"
                rx="16"
                fill="none"
                stroke="rgba(201,168,76,0.16)"
                strokeWidth="6"
                className="approachSection__chipHalo"
              />
            </svg>
          </div>

          <div className="approachSection__cardsCol">
            {rightSteps.map((step, index) => (
              <article
                key={step.number}
                className="approachSection__card approachSection__card--right"
                style={{ transitionDelay: `${0.12 * index + 0.2}s` }}
              >
                <span className="approachSection__number">{step.number}</span>
                <h3 className="approachSection__cardTitle">{step.title}</h3>
                <div className="approachSection__divider" aria-hidden />
                <p className="approachSection__cardBody">{step.description}</p>
                <span className="approachSection__accent" aria-hidden />
              </article>
            ))}
          </div>
        </div>

        <div className="approachSection__mobileList">
          {allSteps.map((step, index) => (
            <article key={step.number} className="approachSection__card" style={{ transitionDelay: `${0.08 * index + 0.15}s` }}>
              <span className="approachSection__number">{step.number}</span>
              <h3 className="approachSection__cardTitle">{step.title}</h3>
              <div className="approachSection__divider" aria-hidden />
              <p className="approachSection__cardBody">{step.description}</p>
              <span className="approachSection__accent" aria-hidden />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
