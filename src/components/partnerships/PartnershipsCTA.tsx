import { Link } from 'react-router-dom'
import { partnershipsPageMedia } from '../../constants/swaroData'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import './PartnershipsCTA.css'

const CTA_LEDE =
  "Share your goals and we'll explore how SWARO can collaborate with your organisation."

export default function PartnershipsCTA() {
  const { ref: sectionRef, isVisible: visible } = useScrollAnimation({
    threshold: 0.2,
    rootMargin: '0px 0px -6% 0px',
  })

  return (
    <section
      ref={sectionRef}
      className={`partnershipsCta${visible ? ' partnershipsCta--visible' : ''}`}
      aria-labelledby="partnerships-cta-heading"
    >
      <div className="partnershipsCta__dots partnershipsCta__dots--top" aria-hidden />
      <div className="partnershipsCta__dots partnershipsCta__dots--bottom" aria-hidden />

      <div className="partnershipsCta__wrapper">
        <div className="partnershipsCta__inner">
          <div className="partnershipsCta__left">
            <div className="partnershipsCta__label">
              <span className="partnershipsCta__labelDot" aria-hidden />
              Let&apos;s Work Together
            </div>

            <h2 id="partnerships-cta-heading" className="partnershipsCta__heading">
              Ready To <span className="partnershipsCta__headingAccent">Become</span> A Partner?
            </h2>

            <p className="partnershipsCta__lede">{CTA_LEDE}</p>

            <div className="partnershipsCta__buttons">
              <Link to="/contact" className="partnershipsCta__btnPrimary">
                Get In Touch
              </Link>
            </div>
          </div>

          <div className="partnershipsCta__right">
            <div className="partnershipsCta__imageWrap">
              <img
                className="partnershipsCta__image"
                src={partnershipsPageMedia.ctaBanner}
                alt="SWARO representative — partner with us for community impact"
                decoding="async"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
