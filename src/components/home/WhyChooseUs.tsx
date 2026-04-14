import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  HiOutlineDocumentMagnifyingGlass,
  HiOutlineGlobeAlt,
  HiOutlineScale,
  HiOutlineTrophy,
} from 'react-icons/hi2'
import './WhyChooseUs.css'

type ReasonId = 'experience' | 'research' | 'impact' | 'ethics'

const ICON_SIZE = 28

const REASON_ICONS: Record<ReasonId, ReactNode> = {
  experience: <HiOutlineTrophy className="whyChooseUs__reasonIcon" size={ICON_SIZE} aria-hidden />,
  research: (
    <HiOutlineDocumentMagnifyingGlass className="whyChooseUs__reasonIcon" size={ICON_SIZE} aria-hidden />
  ),
  impact: <HiOutlineGlobeAlt className="whyChooseUs__reasonIcon" size={ICON_SIZE} aria-hidden />,
  ethics: <HiOutlineScale className="whyChooseUs__reasonIcon" size={ICON_SIZE} aria-hidden />,
}

const REASONS: readonly {
  id: ReasonId
  title: string
  description: string
}[] = [
  {
    id: 'experience',
    title: '30+ Years of Experience',
    description: 'Deep expertise and proven results from decades of academic and professional leadership.',
  },
  {
    id: 'research',
    title: 'Research-Driven Solutions',
    description: 'Evidence-based methods with practical application and measurable client impact.',
  },
  {
    id: 'impact',
    title: 'Sustainable Community Impact',
    description: 'Lasting change: resilient communities, livelihoods, and holistic well-being.',
  },
  {
    id: 'ethics',
    title: 'Professional & Ethical Delivery',
    description: 'Integrity, transparency, and trust in every engagement.',
  },
]

export default function WhyChooseUs() {
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
      { threshold: 0.15 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`whyChooseUs${visible ? ' whyChooseUs--visible' : ''}`}
      aria-label="Why choose us"
    >
      <header className="whyChooseUs__header">
        <div className="whyChooseUs__label">
          Why Choose Us
          <span className="whyChooseUs__labelUnderline" aria-hidden />
        </div>
        <h2 className="whyChooseUs__heading">
          The <span className="whyChooseUs__headingAccent">SWARO</span> Difference
        </h2>
        <p className="whyChooseUs__subtext">
          We bring together decades of expertise, rigorous research and genuine compassion to deliver
          solutions that truly transform lives and communities.
        </p>
      </header>

      <div className="whyChooseUs__grid">
        {REASONS.map((reason, i) => (
          <article
            key={reason.id}
            className={`whyChooseUs__card${i % 2 === 0 ? ' whyChooseUs__card--enterLeft' : ' whyChooseUs__card--enterRight'}`}
            style={{ ['--stagger']: `${0.12 * i + 0.15}s` } as CSSProperties}
          >
            <div className="whyChooseUs__hexWrap">
              <svg className="whyChooseUs__hexSvg" width={80} height={80} viewBox="0 0 80 80" fill="none" aria-hidden>
                <path
                  d="M40 4L72 22V58L40 76L8 58V22L40 4Z"
                  stroke="#C9A84C"
                  strokeWidth="1.5"
                  fill="rgba(201,168,76,0.06)"
                />
              </svg>
              <div className="whyChooseUs__hexIcon">{REASON_ICONS[reason.id]}</div>
            </div>
            <h3 className="whyChooseUs__cardTitle">{reason.title}</h3>
            <p className="whyChooseUs__cardBody">{reason.description}</p>
            <div className="whyChooseUs__accentLine" aria-hidden />
          </article>
        ))}
      </div>

      <footer className="whyChooseUs__bottom">
        <blockquote className="whyChooseUs__quote">
          <span className="whyChooseUs__quoteMark" aria-hidden>
            &ldquo;
          </span>
          We view each client as a partner in the journey toward personal growth, societal well-being
          and economic self-reliance.
          <span className="whyChooseUs__quoteMark" aria-hidden>
            &rdquo;
          </span>
        </blockquote>
        <p className="whyChooseUs__quoteSource">— SWARO Consulty Services Philosophy</p>
        <Link to="/approach" className="whyChooseUs__cta">
          Our Approach
        </Link>
      </footer>
    </section>
  )
}
