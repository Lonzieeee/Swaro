import { useRef, useEffect, useLayoutEffect, useState } from 'react'
import './Objectives.css'

const objectives = [
  {
    number: '01',
    title: 'Quality Education & Training',
    description:
      'Deliver quality education and training programs that meet contemporary knowledge and skills needs for individuals, institutions and communities.',
    descriptionShort: 'Education and training aligned with today’s skills needs for people, schools and communities.',
  },
  {
    number: '02',
    title: 'Applied Research',
    description:
      'Conduct applied research to inform policy, practice and community interventions that drive meaningful and measurable change.',
    descriptionShort: 'Research that shapes policy, practice and community programs with measurable impact.',
  },
  {
    number: '03',
    title: 'Counselling & Mentorship',
    description:
      'Provide counselling, mediation and mentorship to support personal and professional development across all stages of life.',
    descriptionShort: 'Counselling, mediation and mentorship for growth at every life stage.',
  },
  {
    number: '04',
    title: 'Health & Well-being',
    description:
      'Promote nutrition, health and well-being through evidence-based programs that empower individuals to live healthier, fuller lives.',
    descriptionShort: 'Evidence-based health and nutrition programs for healthier, fuller lives.',
  },
  {
    number: '05',
    title: 'Livelihood Opportunities',
    description:
      'Enhance livelihood opportunities through skills development, entrepreneurship and empowerment initiatives that build economic self-reliance.',
    descriptionShort: 'Skills, entrepreneurship and empowerment for economic self-reliance.',
  },
  {
    number: '06',
    title: 'Sustainable Practices',
    description:
      'Advocate for sustainable practices and community resilience in all sectors served, promoting lasting positive change for generations to come.',
    descriptionShort: 'Sustainability and resilience for lasting, positive change across sectors.',
  },
]

export default function Objectives() {
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
        if (entry?.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -12% 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const sectionClass = [
    'objectives',
    visible ? 'objectives--visible' : '',
    motionless ? 'objectives--motionless' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <section ref={sectionRef} id="objectives" className={sectionClass} aria-labelledby="objectives-heading">
      <div className="objectives__inner">
        <header className="objectives__header">
          <div className="objectives__headerLabel">
            <div className="objectives__label">
              <span className="objectives__labelText objectives__labelText--full">What We Set Out To Do</span>
              <span className="objectives__labelText objectives__labelText--short">Our focus</span>
              <span className="objectives__labelUnderline" aria-hidden />
            </div>
          </div>
          <h2 id="objectives-heading" className="objectives__heading">
            Our <span className="objectives__headingAccent">Objectives</span>
          </h2>
          <p className="objectives__subtext objectives__subtext--full">
            Six clear objectives that drive everything we do at SWARO Consulty Services — from the programs we
            design to the communities we serve.
          </p>
          <p className="objectives__subtext objectives__subtext--short">
            Six objectives guiding our programs and the communities we serve.
          </p>
        </header>

        <div className="objectives__ruleWrap" aria-hidden>
          <div className="objectives__rule" />
        </div>

        <div className="objectives__grid" role="list">
          {objectives.map((obj) => (
            <article key={obj.number} className="objectives__card" role="listitem">
              <span className="objectives__number">{obj.number}</span>
              <h3 className="objectives__cardTitle">{obj.title}</h3>
              <div className="objectives__cardDivider" aria-hidden />
              <p className="objectives__cardBody objectives__cardBody--full">{obj.description}</p>
              <p className="objectives__cardBody objectives__cardBody--short">{obj.descriptionShort}</p>
              <div className="objectives__accentLine" aria-hidden />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
