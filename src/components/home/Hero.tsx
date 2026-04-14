import { Link } from 'react-router-dom'
import './Hero.css'

const TRUST_INITIALS = ['S', 'M', 'A'] as const

export default function Hero() {
  return (
    <section className="hero" aria-label="Hero">
      <div className="hero__bg" aria-hidden />
      <div className="hero__overlay" aria-hidden />

      <div className="hero__container">
        <div className="hero__content">
          <div className="hero__pill">
            <span className="hero__pill-dot" />
            <span className="hero__pill-text">Welcome to SWARO Consulty Services</span>
          </div>

          <h1 className="hero__headline">
            <span className="hero__hide-mobile">
              Empowering Lives Through{' '}
              <span className="hero__headline-accent">Research, Knowledge</span> &amp; Transformation
            </span>
            <span className="hero__hide-desktop">
              Empowering lives through{' '}
              <span className="hero__headline-accent">research</span> &amp; transformation
            </span>
          </h1>

          <p className="hero__subtext hero__hide-mobile">
            A leading consultancy dedicated to education, counselling, research and community development —
            transforming individuals and communities across Kenya and beyond.
          </p>
          <p className="hero__subtext hero__subtext--compact hero__hide-desktop">
            Education, counselling, research &amp; community development across Kenya and beyond.
          </p>

          <div className="hero__buttons">
            <Link to="/contact" className="hero__btn hero__btn--primary" aria-label="Book a consultation">
              <span className="hero__hide-mobile">Book a Consultation</span>
              <span className="hero__hide-desktop">Book consultation</span>
            </Link>
            <Link to="/services" className="hero__btn hero__btn--secondary" aria-label="Explore our services">
              <span className="hero__hide-mobile">Explore Our Services</span>
              <span className="hero__hide-desktop">Our services</span>
            </Link>
          </div>

          <div className="hero__trust">
            <div className="hero__avatars">
              {TRUST_INITIALS.map((letter) => (
                <div key={letter} className="hero__avatar">
                  {letter}
                </div>
              ))}
            </div>
            <p className="hero__trust-text">
              <span className="hero__hide-mobile">
                Trusted by <strong>500+</strong> individuals, families &amp; organizations
              </span>
              <span className="hero__hide-desktop">
                Trusted by <strong>500+</strong> clients
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="hero__scroll" aria-hidden>
        <div className="hero__scroll-line" />
        <span className="hero__scroll-text">scroll</span>
      </div>
    </section>
  )
}
