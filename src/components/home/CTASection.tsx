import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './CTASection.css'

const CTA_IMAGE_URL =
  'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/bw%20cta(1).webp'

const CLIENTS = [
  {
    number: '01',
    title: 'Universities & Educational Institutions',
    description:
      'Partnering with academic institutions to deliver curriculum development, training and educational mentorship programs.',
  },
  {
    number: '02',
    title: 'NGOs & Development Partners',
    description:
      'Supporting non-governmental organizations with research, monitoring, evaluation and capacity building initiatives.',
  },
  {
    number: '03',
    title: 'Government & Corporate Agencies',
    description:
      'Providing evidence-based consultancy, policy research and institutional strengthening to public and private sector bodies.',
  },
  {
    number: '04',
    title: 'Civil Society & Faith-Based Organizations',
    description:
      'Offering counselling, mediation and community empowerment programs to civil society and faith-based communities.',
  },
  {
    number: '05',
    title: 'Youth & Women Groups',
    description:
      'Delivering targeted empowerment, mentorship and skills development programs for youth and women across Kenya.',
  },
  {
    number: '06',
    title: 'Individuals, Families & Vulnerable Groups',
    description:
      'Providing personal counselling, career guidance and livelihood support to individuals, families and those most in need.',
  },
] as const

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.08 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`ctaSection${visible ? ' ctaSection--visible' : ''}`}
      aria-label="Work With Us"
    >
      <div className="ctaSection__media" aria-hidden>
        <img
          className="ctaSection__img"
          src={CTA_IMAGE_URL}
          alt=""
          loading="lazy"
          decoding="async"
        />
        <div className="ctaSection__overlay" />
      </div>

      <div className="ctaSection__inner">
        <header className="ctaSection__header">
          <h2 className="ctaSection__megaTitle">
            <span className="ctaSection__megaLine">Transforming Lives</span>
            <span className="ctaSection__megaLine">
              <span className="ctaSection__megaAccent">Across Every</span> Sector
            </span>
          </h2>
          <p className="ctaSection__subtitle">Let&apos;s Work Together</p>
          <p className="ctaSection__lede">
            Whether you are an individual, family, institution or community — SWARO Consulty Services has a tailored,
            evidence-based solution designed to empower, develop and transform you.
          </p>
        </header>

        <ul className="ctaSection__clientsList">
          {CLIENTS.map((client) => (
            <li key={client.number} className="ctaSection__clientItem">
              <span className="ctaSection__clientNumber">{client.number}</span>
              <div className="ctaSection__clientBody">
                <div className="ctaSection__titleRow">
                  <span className="ctaSection__clientTitle">{client.title}</span>
                  <span className="ctaSection__dottedLine" />
                  <svg
                    className="ctaSection__clientArrow"
                    width={18}
                    height={18}
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className="ctaSection__clientDesc">{client.description}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="ctaSection__btns">
          <Link to="/contact" className="ctaSection__ctaBtn">
            Book a Consultation
          </Link>
          <Link to="/about" className="ctaSection__secondaryBtn">
            Learn More About Us
          </Link>
        </div>
      </div>
    </section>
  )
}
