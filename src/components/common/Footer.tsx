import { Link } from 'react-router-dom'
import { site } from '../../constants/swaroData'
import './Footer.css'

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Our Approach', path: '/approach' },
  { label: 'Partnerships', path: '/partnerships' },
  { label: 'Contact Us', path: '/contact' },
] as const

/** Shown on small screens only; full menus stay on tablet/desktop */
const mobileEssentialLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Contact', path: '/contact' },
] as const

const services = [
  { label: 'Counselling & Mediation', path: '/services/counselling' },
  { label: 'Training & Capacity Building', path: '/services/training' },
  { label: 'Education & Career Development', path: '/services/education' },
  { label: 'Community Empowerment', path: '/services/community' },
  { label: 'Research & Consultancy', path: '/services/research' },
  { label: 'Health & Lifestyle Development', path: '/services/health' },
] as const

const socials = [
  {
    label: 'Facebook',
    href: 'https://facebook.com',
    icon: (
      <svg width={16} height={16} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: 'X (Twitter)',
    href: 'https://twitter.com',
    icon: (
      <svg width={16} height={16} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M4 4l16 16M20 4L4 20"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: (
      <svg width={16} height={16} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx={4} cy={4} r={2} stroke="currentColor" strokeWidth={1.5} />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <svg width={16} height={16} viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect
          x={2}
          y={2}
          width={20}
          height={20}
          rx={5}
          stroke="currentColor"
          strokeWidth={1.5}
        />
        <circle cx={12} cy={12} r={4} stroke="currentColor" strokeWidth={1.5} />
        <circle cx={17.5} cy={6.5} r={0.5} fill="currentColor" />
      </svg>
    ),
  },
] as const

function siteHostname(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url.replace(/^https?:\/\//i, '').split('/')[0] || url
  }
}

function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, '')}`
}

export default function Footer() {
  const year = new Date().getFullYear()
  const host = siteHostname(site.url)

  return (
    <footer className="footer" aria-label="Site footer">
      <div className="footer__body">
        <div className="footer__grid">
          <div className="footer__col">
            <Link to="/" className="footer__logo">
              <span className="footer__logoMain">{site.name}</span>
              <span className="footer__logoSub">Consulty Services</span>
            </Link>
            <p className="footer__tagline">
              &ldquo;Empowering Lives Through Research, Knowledge &amp; Transformation&rdquo;
            </p>
            <p className="footer__brandDesc footer__brandDesc--desktopOnly">
              A leading consultancy dedicated to education, counselling, research and community
              development across Kenya and beyond.
            </p>
            <div className="footer__socials">
              {socials.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="footer__socialLink"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          <nav className="footer__mobileEssentials" aria-label="Essential links">
            <ul className="footer__mobileEssentialsList">
              {mobileEssentialLinks.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="footer__mobileEssentialLink">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer__col footer__col--desktopOnly">
            <h3 className="footer__heading">Quick Links</h3>
            <span className="footer__headingRule" aria-hidden />
            <ul className="footer__linkList">
              {quickLinks.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="footer__link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col footer__col--desktopOnly">
            <h3 className="footer__heading">Our Services</h3>
            <span className="footer__headingRule" aria-hidden />
            <ul className="footer__linkList">
              {services.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="footer__link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h3 className="footer__heading">Contact Us</h3>
            <span className="footer__headingRule" aria-hidden />
            <div className="footer__contactList">
              <div className="footer__contactRow">
                <div className="footer__contactIcon" aria-hidden>
                  <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
                    <path
                      d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx={12}
                      cy={10}
                      r={3}
                      stroke="currentColor"
                      strokeWidth={1.5}
                    />
                  </svg>
                </div>
                <span className="footer__contactText">Kenya</span>
              </div>

              <div className="footer__contactRow">
                <div className="footer__contactIcon" aria-hidden>
                  <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
                    <path
                      d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .93h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.73a16 16 0 006.29 6.29l1.12-1.12a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <a className="footer__contactText footer__contactLink" href={telHref(site.phone)}>
                  {site.phone}
                </a>
              </div>

              <div className="footer__contactRow">
                <div className="footer__contactIcon" aria-hidden>
                  <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
                    <path
                      d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    />
                    <path
                      d="M22 6l-10 7L2 6"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <a
                  className="footer__contactText footer__contactLink"
                  href={`mailto:${site.contactEmail}`}
                >
                  {site.contactEmail}
                </a>
              </div>

              <div className="footer__contactRow">
                <div className="footer__contactIcon" aria-hidden>
                  <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
                    <circle cx={12} cy={12} r={10} stroke="currentColor" strokeWidth={1.5} />
                    <path
                      d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    />
                  </svg>
                </div>
                <a
                  className="footer__contactText footer__contactLink"
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {host}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="footer__bottomInner">
          <p className="footer__copyright">
            © {year} SWARO Consulty Services. All rights reserved.
          </p>
          <p className="footer__credit">Designed with care for communities</p>
        </div>
      </div>
    </footer>
  )
}
