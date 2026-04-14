import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  HiOutlineAcademicCap,
  HiOutlineChatBubbleLeftRight,
  HiOutlineClipboardDocumentList,
  HiOutlineHeart,
  HiOutlinePresentationChartLine,
  HiOutlineUsers,
} from 'react-icons/hi2'
import './ServicesSnapshot.css'

type ServiceId =
  | 'counselling'
  | 'training'
  | 'education'
  | 'community'
  | 'research'
  | 'health'

const ICON_SIZE = 26

const SERVICE_ICONS: Record<ServiceId, ReactNode> = {
  counselling: (
    <HiOutlineChatBubbleLeftRight className="servicesSnapshot__serviceIcon" size={ICON_SIZE} aria-hidden />
  ),
  training: (
    <HiOutlinePresentationChartLine className="servicesSnapshot__serviceIcon" size={ICON_SIZE} aria-hidden />
  ),
  education: <HiOutlineAcademicCap className="servicesSnapshot__serviceIcon" size={ICON_SIZE} aria-hidden />,
  community: <HiOutlineUsers className="servicesSnapshot__serviceIcon" size={ICON_SIZE} aria-hidden />,
  research: (
    <HiOutlineClipboardDocumentList className="servicesSnapshot__serviceIcon" size={ICON_SIZE} aria-hidden />
  ),
  health: <HiOutlineHeart className="servicesSnapshot__serviceIcon" size={ICON_SIZE} aria-hidden />,
}

const SERVICES: readonly {
  id: ServiceId
  title: string
  description: string
  path: string
}[] = [
  {
    id: 'counselling',
    title: 'Counselling & Mediation',
    description:
      'General, pre-marital, marital, family and youth counselling alongside professional conflict resolution and civil mediation services.',
    path: '/services/counselling',
  },
  {
    id: 'training',
    title: 'Training & Capacity Building',
    description:
      'Human development, leadership, management and administration training alongside short courses in personal and professional development.',
    path: '/services/training',
  },
  {
    id: 'education',
    title: 'Education & Career Development',
    description:
      'Curriculum development, career guidance, CV and resume writing, and educational mentorship to unlock individual potential.',
    path: '/services/education',
  },
  {
    id: 'community',
    title: 'Community Empowerment',
    description:
      'Women, gender and youth empowerment programs alongside church and faith-based counselling for stronger, more resilient communities.',
    path: '/services/community',
  },
  {
    id: 'research',
    title: 'Research & Consultancy',
    description:
      'Applied research, data collection, monitoring and evaluation, grant proposal writing and resource mobilization for sustainable impact.',
    path: '/services/research',
  },
  {
    id: 'health',
    title: 'Health & Lifestyle Development',
    description:
      'Nutrition education in lifestyle diseases and community health awareness programs that promote holistic well-being and quality of life.',
    path: '/services/health',
  },
]

export default function ServicesSnapshot() {
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
      className={`servicesSnapshot${visible ? ' servicesSnapshot--visible' : ''}`}
      aria-label="Our services"
    >
      <div className="servicesSnapshot__header">
        <div className="servicesSnapshot__headerLeft">
          <div className="servicesSnapshot__label">
            What We Offer
            <span className="servicesSnapshot__labelUnderline" aria-hidden />
          </div>
          <h2 className="servicesSnapshot__heading">
            Comprehensive Solutions For{' '}
            <span className="servicesSnapshot__headingAccent">Individuals & Communities</span>
          </h2>
        </div>
      </div>

      <div className="servicesSnapshot__grid">
        {SERVICES.map((service, i) => (
          <article
            key={service.id}
            className="servicesSnapshot__card"
            style={
              {
                transitionDelay: `${0.1 * i + 0.2}s`,
              } as CSSProperties
            }
          >
            <div className="servicesSnapshot__iconWrap">{SERVICE_ICONS[service.id]}</div>
            <h3 className="servicesSnapshot__cardTitle">{service.title}</h3>
            <p className="servicesSnapshot__cardBody">{service.description}</p>
            <Link to={service.path} className="servicesSnapshot__learnMore">
              Learn More
              <svg width={14} height={14} viewBox="0 0 16 16" fill="none" aria-hidden>
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <div className="servicesSnapshot__cardAccent" aria-hidden />
          </article>
        ))}
      </div>
    </section>
  )
}
