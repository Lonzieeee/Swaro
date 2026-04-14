import { useRef, useEffect, useLayoutEffect, useState } from 'react'
import './CoreValues.css'

const values = [
  {
    name: 'Integrity',
    description:
      'Upholding honesty, transparency and ethical practices in all engagements with clients, partners and communities.',
  },
  {
    name: 'Excellence',
    description:
      'Striving for the highest standards in education, research and service delivery across every program we deliver.',
  },
  {
    name: 'Empowerment',
    description:
      'Enabling individuals and communities to realize their full potential through knowledge, skills and practical support.',
  },
  {
    name: 'Innovation',
    description:
      'Applying creative, evidence-based solutions to modern challenges in education, health and community development.',
  },
  {
    name: 'Compassion',
    description:
      'Fostering genuine care, empathy and support for holistic well-being in every client relationship we build.',
  },
  {
    name: 'Collaboration',
    description:
      'Building meaningful partnerships and networks with organizations, communities and institutions for greater impact.',
  },
  {
    name: 'Sustainability',
    description:
      'Promoting lasting positive change in health, livelihoods and communities across all sectors we serve.',
  },
  {
    name: 'Professionalism',
    description:
      'Delivering every service with the highest level of competence, accountability and ethical conduct at all times.',
  },
]

export default function CoreValues() {
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

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        setVisible(true)
        observer.unobserve(el)
      },
      {
        /* Wait until the section overlaps the central viewport — avoids animating while only the top edge is visible. */
        rootMargin: '-10% 0px -14% 0px',
        threshold: 0,
      }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const sectionClass = [
    'coreValues',
    visible ? 'coreValues--visible' : '',
    motionless ? 'coreValues--motionless' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <section ref={sectionRef} id="core-values" className={sectionClass} aria-labelledby="core-values-heading">
      <div className="coreValues__inner">
        <div className="coreValues__header">
          <div className="coreValues__headerLeft">
            <h2 id="core-values-heading" className="coreValues__heading">
              Our values guide <span className="coreValues__headingAccent">everything we do</span>
            </h2>
          </div>
          <div className="coreValues__headerRight">
            <p className="coreValues__intro">
              At SWARO Consulty Services, our core values are not just words — they are the foundation of
              every program we design, every relationship we build and every community we serve. They guide
              our decisions, shape our culture and define who we are as an organization.
            </p>
          </div>
        </div>

        <div className="coreValues__ruleWrap" aria-hidden>
          <div className="coreValues__rule" />
        </div>

        <ul className="coreValues__grid" data-row="1" role="list">
          {values.slice(0, 4).map((value) => (
            <li key={value.name} className="coreValues__card">
              <h3 className="coreValues__name">{value.name}</h3>
              <div className="coreValues__bar" aria-hidden />
              <p className="coreValues__desc">{value.description}</p>
            </li>
          ))}
        </ul>

        <div className="coreValues__ruleWrap" aria-hidden>
          <div className="coreValues__rule" />
        </div>

        <ul className="coreValues__grid" data-row="2" role="list">
          {values.slice(4).map((value) => (
            <li key={value.name} className="coreValues__card">
              <h3 className="coreValues__name">{value.name}</h3>
              <div className="coreValues__bar" aria-hidden />
              <p className="coreValues__desc">{value.description}</p>
            </li>
          ))}
        </ul>

        <div className="coreValues__ruleWrap" aria-hidden>
          <div className="coreValues__rule" />
        </div>
      </div>
    </section>
  )
}
