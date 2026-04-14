import SEOHead from '../components/seo/SEOHead'
import { pageHeroMedia } from '../constants/swaroData'
import type { BreadcrumbJsonLdItem } from '../utils/seo'
import './Contact.css'

const CONTACT_SEO_BREADCRUMBS: readonly BreadcrumbJsonLdItem[] = [
  { name: 'Home', path: '/' },
  { name: 'Contact / Consultation' },
]

const CONTACT_META_DESCRIPTION =
  'Book a consultation with SWARO Consulty Services in Kenya. Share your goals and context to receive a tailored, evidence-based support plan.'

const CONTACT_KEYWORDS =
  'book consultation Kenya, SWARO contact, counselling consultation, training consultation, research consultancy contact, community development support'

export default function Contact() {
  return (
    <>
      <SEOHead
        title="Book a Consultation"
        description={CONTACT_META_DESCRIPTION}
        path="/contact"
        image={pageHeroMedia.about}
        ogImageAlt="Consultation scheduling form for SWARO Consulty Services"
        keywords={CONTACT_KEYWORDS}
        schemaPageType="ContactPage"
        breadcrumbs={CONTACT_SEO_BREADCRUMBS}
      />

      <section className="contactConsult">
        <div className="contactConsult__hero" aria-hidden>
          <img
            src={pageHeroMedia.about}
            alt=""
            className="contactConsult__bg"
            decoding="async"
          />
          <div className="contactConsult__overlay" />
        </div>

        <div className="contactConsult__inner">
          <div className="contactConsult__panel">
            <h1 className="contactConsult__title">Schedule a Consultation</h1>
            <p className="contactConsult__intro">
              To help our team prepare well, please share a few details before we connect.
            </p>

            <form className="contactConsult__form" onSubmit={(e) => e.preventDefault()}>
              <label className="contactConsult__field">
                <span>Full Name *</span>
                <input type="text" name="fullName" autoComplete="name" required placeholder="Your full name" />
              </label>

              <label className="contactConsult__field">
                <span>Email *</span>
                <input type="email" name="email" autoComplete="email" required placeholder="you@example.com" />
              </label>

              <label className="contactConsult__field">
                <span>Phone / WhatsApp</span>
                <input type="tel" name="phone" autoComplete="tel" placeholder="+254..." />
              </label>

              <label className="contactConsult__field">
                <span>Organization</span>
                <input type="text" name="organization" autoComplete="organization" placeholder="Organization name" />
              </label>

              <label className="contactConsult__field">
                <span>Service Needed *</span>
                <select name="service" required defaultValue="">
                  <option value="" disabled>
                    Select a service
                  </option>
                  <option>Counselling & Mediation</option>
                  <option>Training & Capacity Building</option>
                  <option>Education & Career Development</option>
                  <option>Community Empowerment</option>
                  <option>Research & Consultancy</option>
                  <option>Health & Lifestyle Development</option>
                </select>
              </label>

              <label className="contactConsult__field">
                <span>Consultation Type *</span>
                <select name="consultationType" required defaultValue="">
                  <option value="" disabled>
                    Select consultation type
                  </option>
                  <option>Virtual</option>
                  <option>In-person</option>
                  <option>Either</option>
                </select>
              </label>

              <label className="contactConsult__field">
                <span>Preferred Contact Method *</span>
                <select name="contactMethod" required defaultValue="">
                  <option value="" disabled>
                    Select contact method
                  </option>
                  <option>Email</option>
                  <option>Phone</option>
                  <option>WhatsApp</option>
                </select>
              </label>

              <label className="contactConsult__field">
                <span>Preferred Date/Time Window</span>
                <input
                  type="text"
                  name="timeWindow"
                  placeholder="e.g. Weekdays, 10am–1pm"
                />
              </label>

              <label className="contactConsult__field contactConsult__field--full">
                <span>Message / Goals *</span>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="Tell us your goals, needs, and any key context..."
                />
              </label>

              <label className="contactConsult__consent contactConsult__field--full">
                <input type="checkbox" required name="consent" />
                <span>I consent to being contacted by SWARO regarding this consultation request.</span>
              </label>

              <div className="contactConsult__field--full">
                <button type="submit" className="contactConsult__submit">
                  Request Consultation
                </button>
                <p className="contactConsult__privacy">
                  Your information is handled confidentially and used only to respond to your request.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
