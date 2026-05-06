import './CounsellingServices.css'
import { Link } from 'react-router-dom'
import { counsellingServices } from '../../constants/counsellingServices'
import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'

export default function CounsellingServices() {
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
      className={`counsellingServices${visible ? ' counsellingServices--visible' : ''}`}
      aria-labelledby="counselling-services-heading"
    >
      <div className="counsellingServices__inner">
        <h2 id="counselling-services-heading" className="counsellingServices__heading">
          Counselling Services
        </h2>

        <div className="counsellingServices__grid" role="list">
          {counsellingServices.map((service, index) => {
            const isClickableService =
              service.slug === 'debrief-grief-loss-support' ||
              service.slug === 'prenatal-wellbeing-support'
            return (
            <article
              key={service.id}
              className="counsellingServices__card"
              role="listitem"
              style={
                {
                  transitionDelay: `${index * 0.1 + 0.12}s`,
                } as CSSProperties
              }
            >
              <div className="counsellingServices__mediaCard">
                <img
                  className="counsellingServices__image"
                  src={service.image}
                  alt={service.imageAlt}
                  loading="lazy"
                />
                <div className="counsellingServices__titleWrap">
                  <h3 className="counsellingServices__title">
                    {isClickableService ? (
                      <Link to={`/counselling-services/${service.slug}`} className="counsellingServices__titleLink">
                        {service.title}
                      </Link>
                    ) : (
                      <span>{service.title}</span>
                    )}
                  </h3>
                </div>
              </div>
              <p className="counsellingServices__description">{service.description}</p>
            </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
