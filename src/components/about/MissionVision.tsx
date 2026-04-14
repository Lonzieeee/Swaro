import { useRef, useEffect, useState } from 'react'
import './MissionVision.css'

export default function MissionVision() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.08, rootMargin: '0px 0px -12% 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`missionVision${visible ? ' missionVision--visible' : ''}`}
      aria-labelledby="mission-vision-heading"
    >
      <div className="missionVision__inner">
        <div className="missionVision__top">
          <div className="missionVision__headingWrap">
            <h2 id="mission-vision-heading" className="missionVision__heading">
              <span className="missionVision__headingAccent">Empowering lives through </span>
              research, knowledge &amp; transformation.
            </h2>
          </div>

          <div className="missionVision__intro">
            <p className="missionVision__introText">
              SWARO Consulty Services believes that sustainable development starts with empowered
              individuals. By integrating education, mentorship, counselling, research and practical
              interventions, we nurture knowledgeable, healthy and resilient communities. We view each
              client as a partner in the journey toward personal growth, societal well-being and
              economic self-reliance.
            </p>
          </div>
        </div>

        <div className="missionVision__ruleWrap" aria-hidden>
          <div className="missionVision__rule" />
        </div>

        <div className="missionVision__columns">
          <article className="missionVision__card" aria-labelledby="mission-title">
            <div className="missionVision__cardHead">
              <span className="missionVision__cardAccent" aria-hidden />
              <h3 id="mission-title" className="missionVision__cardTitle">
                Mission
              </h3>
            </div>
            <p className="missionVision__cardBody">
              To empower individuals and communities through holistic education, evidence-based
              research, effective counselling, mentorship and practical livelihood programs that
              enhance well-being, nutrition and sustainable development.
            </p>
          </article>

          <article className="missionVision__card" aria-labelledby="vision-title">
            <div className="missionVision__cardHead">
              <span className="missionVision__cardAccent" aria-hidden />
              <h3 id="vision-title" className="missionVision__cardTitle">
                Vision
              </h3>
            </div>
            <p className="missionVision__cardBody">
              To be a leading consultancy recognized for transforming lives and communities by
              providing innovative solutions in education, personal development and socio-economic
              empowerment.
            </p>
          </article>

          <article className="missionVision__card" aria-labelledby="philosophy-title">
            <div className="missionVision__cardHead">
              <span className="missionVision__cardAccent" aria-hidden />
              <h3 id="philosophy-title" className="missionVision__cardTitle">
                Philosophy
              </h3>
            </div>
            <p className="missionVision__cardBody">
              We believe sustainable development starts with empowered individuals. Every client is a
              partner in a shared journey toward personal growth, societal well-being and economic
              self-reliance.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}
