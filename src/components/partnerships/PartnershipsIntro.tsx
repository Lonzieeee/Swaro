import { Link } from 'react-router-dom'
import { partnershipsPageMedia } from '../../constants/swaroData'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import './PartnershipsIntro.css'

const KEY_POINTS = [
  'Partnership-led delivery across sectors we serve',
  'Alliances with NGOs, government, academia and communities',
  'Evidence-based impact — we welcome new collaborators',
] as const

function PartnershipBadgeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"
        stroke="#C9A84C"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="9"
        cy="7"
        r="4"
        stroke="#C9A84C"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
        stroke="#C9A84C"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function PartnershipsIntro() {
  const { ref: sectionRef, isVisible: visible } = useScrollAnimation({
    threshold: 0.25,
    rootMargin: '0px 0px -8% 0px',
  })

  return (
    <section
      ref={sectionRef}
      className={`partnershipsIntro${visible ? ' partnershipsIntro--visible' : ''}`}
      aria-labelledby="partnerships-intro-heading"
    >
      <div className="partnershipsIntro__container">
        <div className="partnershipsIntro__imageCol">
          <div className="partnershipsIntro__goldCornerTL" aria-hidden />
          <div className="partnershipsIntro__goldCornerBR" aria-hidden />

          <img
            className="partnershipsIntro__image"
            src={partnershipsPageMedia.intro}
            alt="SWARO team and partners collaborating"
            decoding="async"
            loading="lazy"
          />

          <div className="partnershipsIntro__badge">
            <div className="partnershipsIntro__badgeIconWrapper">
              <PartnershipBadgeIcon />
            </div>
            <div>
              <p className="partnershipsIntro__badgeValue">6+</p>
              <p className="partnershipsIntro__badgeLabel">Partnership Networks</p>
            </div>
          </div>
        </div>

        <div className="partnershipsIntro__textCol">
          <div className="partnershipsIntro__label">
            <span className="partnershipsIntro__labelDot" aria-hidden />
            Partnerships & Collaboration
          </div>

          <h2 id="partnerships-intro-heading" className="partnershipsIntro__heading">
            Building Bridges For{' '}
            <br className="partnershipsIntro__headingBreak" aria-hidden />
            <span className="partnershipsIntro__headingAccent">Greater Impact</span>
          </h2>

          <div className="partnershipsIntro__divider" aria-hidden />

          <p className="partnershipsIntro__body">
            Lasting change needs more than one organisation. SWARO teams up with allies who care
            about education, research and community empowerment — combining strengths so programmes
            reach further across Kenya and beyond.
          </p>

          <ul className="partnershipsIntro__points">
            {KEY_POINTS.map((point) => (
              <li key={point} className="partnershipsIntro__point">
                <span className="partnershipsIntro__pointDot" aria-hidden />
                <span className="partnershipsIntro__pointText">{point}</span>
              </li>
            ))}
          </ul>

          <Link to="/contact" className="partnershipsIntro__cta">
            Become A Partner
          </Link>
        </div>
      </div>
    </section>
  )
}
