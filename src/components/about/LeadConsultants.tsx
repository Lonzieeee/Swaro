import { useRef, useEffect, useLayoutEffect, useState } from 'react'
import './LeadConsultants.css'

type Consultant = {
  id: string
  name: string
  title: string
  bio: string
  image: string | null
  initials: string
}

const consultants: readonly Consultant[] = [
  {
    id: 'consultant-1',
    name: 'Consultant Name',
    title: 'Lead Consultant & Founder',
    bio: 'A seasoned professional with over 30 years of experience in human development, education and community empowerment.',
    image: null,
    initials: 'CN',
  },
  {
    id: 'consultant-2',
    name: 'Consultant Name',
    title: 'Senior Consultant — Health & Nutrition',
    bio: 'An experienced specialist in nutrition, maternal health and lifestyle development with a deep commitment to holistic well-being.',
    image: null,
    initials: 'CN',
  },
  {
    id: 'consultant-3',
    name: 'Consultant Name',
    title: 'Senior Consultant — Counselling & Mediation',
    bio: 'A skilled counsellor and mediator with extensive experience in family counselling, dispute resolution and mentorship.',
    image: null,
    initials: 'CN',
  },
  {
    id: 'consultant-4',
    name: 'Consultant Name',
    title: 'Senior Consultant — Education & Training',
    bio: 'Focused on curriculum design, capacity building and learning outcomes for institutions and community programs.',
    image: null,
    initials: 'CN',
  },
  {
    id: 'consultant-5',
    name: 'Consultant Name',
    title: 'Senior Consultant — Research & Evaluation',
    bio: 'Delivers applied research, monitoring and evaluation, and data-informed recommendations for partners.',
    image: null,
    initials: 'CN',
  },
  {
    id: 'consultant-6',
    name: 'Consultant Name',
    title: 'Consultant — Community Programs',
    bio: 'Supports grassroots initiatives in livelihoods, gender and youth engagement alongside local leadership.',
    image: null,
    initials: 'CN',
  },
  {
    id: 'consultant-7',
    name: 'Consultant Name',
    title: 'Consultant — Program Design',
    bio: 'Shapes program logic, stakeholder engagement and delivery models for sustainable community impact.',
    image: null,
    initials: 'CN',
  },
  {
    id: 'consultant-8',
    name: 'Consultant Name',
    title: 'Consultant — Partnerships',
    bio: 'Builds relationships with institutions, donors and civil society to align missions and resources.',
    image: null,
    initials: 'CN',
  },
  {
    id: 'consultant-9',
    name: 'Consultant Name',
    title: 'Consultant — Field Operations',
    bio: 'Coordinates on-the-ground activities, quality assurance and reporting across regional teams.',
    image: null,
    initials: 'CN',
  },
]

function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg className={className} width={22} height={22} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M15 18l-6-6 6-6"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} width={22} height={22} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 18l6-6-6-6"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function PlaceholderAvatar() {
  return (
    <svg width={40} height={40} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"
        stroke="rgba(201,168,76,0.4)"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx={12}
        cy={7}
        r={4}
        stroke="rgba(201,168,76,0.4)"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function LeadConsultants() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const [motionless, setMotionless] = useState(false)
  const [pageSize, setPageSize] = useState(3)
  const [pageIndex, setPageIndex] = useState(0)

  const pageCount = Math.max(1, Math.ceil(consultants.length / pageSize))
  const safePage = Math.min(pageIndex, pageCount - 1)
  const start = safePage * pageSize
  const visibleConsultants = consultants.slice(start, start + pageSize)

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setMotionless(true)
      setVisible(true)
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const read = () => {
      const w = window.innerWidth
      if (w < 640) setPageSize(1)
      else if (w < 1024) setPageSize(2)
      else setPageSize(3)
    }
    read()
    window.addEventListener('resize', read)
    return () => window.removeEventListener('resize', read)
  }, [])

  useEffect(() => {
    const pc = Math.max(1, Math.ceil(consultants.length / pageSize))
    setPageIndex((i) => Math.min(i, pc - 1))
  }, [pageSize])

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
        /* Animate only once the section sits in the main viewport band (not a sliver at the edge). */
        rootMargin: '-10% 0px -14% 0px',
        threshold: 0,
      }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const goPrev = () => setPageIndex((i) => Math.max(0, i - 1))
  const goNext = () => setPageIndex((i) => Math.min(pageCount - 1, i + 1))

  const sectionClass = [
    'leadConsultants',
    visible ? 'leadConsultants--visible' : '',
    motionless ? 'leadConsultants--motionless' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const showNav = pageCount > 1

  return (
    <section
      ref={sectionRef}
      id="lead-consultants"
      className={sectionClass}
      aria-labelledby="lead-consultants-heading"
    >
      <div className="leadConsultants__inner">
        <header className="leadConsultants__header">
          <div className="leadConsultants__label">
            The People Behind SWARO
            <span className="leadConsultants__labelUnderline" aria-hidden />
          </div>
          <h2 id="lead-consultants-heading" className="leadConsultants__heading">
            Our Lead <span className="leadConsultants__headingAccent">Consultants</span>
          </h2>
          <p className="leadConsultants__subtext">
            Our team of experienced consultants brings together decades of expertise across education, health,
            research, counselling and community development.
          </p>
        </header>

        <div
          className="leadConsultants__carousel"
          role="region"
          aria-roledescription="carousel"
          aria-label="Lead consultants"
        >
          <div
            className={
              showNav
                ? 'leadConsultants__carouselRow'
                : 'leadConsultants__carouselRow leadConsultants__carouselRow--single'
            }
          >
            {showNav && (
              <button
                type="button"
                className="leadConsultants__nav leadConsultants__nav--prev"
                onClick={goPrev}
                disabled={safePage <= 0}
                aria-label="Previous consultants"
              >
                <ChevronLeft className="leadConsultants__navIcon" />
              </button>
            )}

            <div
              className="leadConsultants__stage"
              aria-live={motionless ? 'off' : 'polite'}
            >
              <ul
                className="leadConsultants__grid"
                style={{
                  gridTemplateColumns: `repeat(${visibleConsultants.length}, minmax(0, 1fr))`,
                }}
                role="list"
                key={`${safePage}-${pageSize}`}
              >
                {visibleConsultants.map((c) => (
                  <li key={c.id} className="leadConsultants__card" role="listitem">
                    <div className="leadConsultants__topBar" aria-hidden />

                    <div className="leadConsultants__photoWrap">
                      {c.image ? (
                        <img
                          className="leadConsultants__photo"
                          src={c.image}
                          alt={c.name}
                          width={168}
                          height={168}
                        />
                      ) : (
                        <div className="leadConsultants__photoPlaceholder">
                          <span className="leadConsultants__initials" aria-hidden>
                            {c.initials}
                          </span>
                          <span className="leadConsultants__photoIcon">
                            <PlaceholderAvatar />
                          </span>
                        </div>
                      )}
                      <div className="leadConsultants__photoRing" aria-hidden />
                    </div>

                    <div className="leadConsultants__nameBlock">
                      <h3 className="leadConsultants__name">{c.name}</h3>
                      <p className="leadConsultants__title">{c.title}</p>
                    </div>

                    <div className="leadConsultants__divider" aria-hidden />

                    <p className="leadConsultants__bio">{c.bio}</p>
                  </li>
                ))}
              </ul>
            </div>

            {showNav && (
              <button
                type="button"
                className="leadConsultants__nav leadConsultants__nav--next"
                onClick={goNext}
                disabled={safePage >= pageCount - 1}
                aria-label="Next consultants"
              >
                <ChevronRight className="leadConsultants__navIcon" />
              </button>
            )}

            {showNav && (
              <p className="leadConsultants__carouselMeta" aria-live="polite">
                Page {safePage + 1} of {pageCount}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
