import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './ApproachCTA.css'

const trustPoints = ['Evidence-based', 'Tailored solutions', 'Ethical delivery'] as const

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export default function ApproachCTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(prefersReducedMotion)
  const [motionless] = useState(prefersReducedMotion)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        if (entry.intersectionRatio < 0.2) return
        setVisible(true)
        observer.unobserve(el)
      },
      { threshold: [0, 0.2, 0.4, 0.6] }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const sectionClass = [
    'approachCta',
    visible ? 'approachCta--visible' : '',
    motionless ? 'approachCta--motionless' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <section ref={sectionRef} className={sectionClass} aria-labelledby="approach-cta-heading">
      <div className="approachCta__dots approachCta__dots--top" aria-hidden />
      <div className="approachCta__dots approachCta__dots--bottom" aria-hidden />

      <div className="approachCta__inner">
        <div className="approachCta__label">
          <span className="approachCta__labelDot" aria-hidden />
          Ready To Get Started?
          <span className="approachCta__labelDot" aria-hidden />
        </div>

        <h2 id="approach-cta-heading" className="approachCta__heading">
          Let Us Design The <span className="approachCta__headingAccent">Right Solution</span> For You
        </h2>

        <div className="approachCta__divider" aria-hidden />

        <p className="approachCta__subtext">
          Tell us your goals and context. We will craft a tailored, evidence-based plan with clear actions,
          measurable outcomes, and ethical delivery.
        </p>

        <div className="approachCta__buttons">
          <Link to="/contact" className="approachCta__button approachCta__button--primary">
            Book a Consultation
          </Link>

          <Link to="/services" className="approachCta__button approachCta__button--secondary">
            Explore Our Services
          </Link>
        </div>

        <div className="approachCta__trustRow">
          {trustPoints.map((point) => (
            <div key={point} className="approachCta__trustItem">
              <span className="approachCta__trustDot" aria-hidden />
              <span className="approachCta__trustText">{point}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
