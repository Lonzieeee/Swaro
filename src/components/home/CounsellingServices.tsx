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
          Featured <span className="counsellingServices__headingAccent">Programs</span>
        </h2>

        <div className="counsellingServices__grid" role="list">
          {counsellingServices.map((service, index) => {
            return (
              <article
                key={service.id}
                className="counsellingServices__card"
                role="listitem"
                style={{
                  transitionDelay: `${index * 0.1 + 0.12}s`,
                } as CSSProperties}
              >
                <div className="counsellingServices__mediaCard">
                  <img
                    className="counsellingServices__image"
                    src={service.image}
                    alt={service.imageAlt}
                    loading="lazy"
                  />
                </div>

                <div className="counsellingServices__content">
                  <div className="counsellingServices__meta">
                    <span className="counsellingServices__tag">Paid</span>
                  </div>

                  <h3 className="counsellingServices__title">
                    <Link to={`/counselling-services/${service.slug}`} className="counsellingServices__titleLink">
                      {service.title}
                    </Link>
                  </h3>

                  <p className="counsellingServices__description">{service.description}</p>

                  <div className="counsellingServices__footer">
                    <div className="counsellingServices__actions">
                      <Link to={`/course-overview/${service.slug}`} className="counsellingServices__overview">
                        Overview
                      </Link>

                      <Link to={`/counselling-services/${service.slug}`} className="counsellingServices__learn">
                        Learn more
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
