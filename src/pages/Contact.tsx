import SEOHead from '../components/seo/SEOHead'
import type { FormEvent } from 'react'
import { pageHeroMedia, site } from '../constants/swaroData'
import { counsellingServices } from '../constants/counsellingServices'
import type { BreadcrumbJsonLdItem } from '../utils/seo'
import { useSearchParams } from 'react-router-dom'
import './Contact.css'

const CONTACT_SEO_BREADCRUMBS: readonly BreadcrumbJsonLdItem[] = [
  { name: 'Home', path: '/' },
  { name: 'Contact / Consultation' },
]

const CONTACT_META_DESCRIPTION =
  'Book a consultation with Swaro Institute in Kenya. Share your goals and context to receive a tailored, evidence-based support plan.'

const CONTACT_KEYWORDS =
  'book consultation Kenya, SWARO contact, counselling consultation, training consultation, research consultancy contact, community development support'

const CONTACT_TIME_SLOTS = [
  'Monday - 8:00-10:00am - Online',
  'Monday - 2:00-4:00pm - Physical',
  'Monday - 7:00-9:00pm - Online',
  'Tuesday - 8:00-10:00am - Online',
  'Tuesday - 2:00-4:00pm - Physical',
  'Tuesday - 7:00-9:00pm - Online',
  'Wednesday - 8:00-10:00am - Online',
  'Wednesday - 2:00-4:00pm - Physical',
  'Wednesday - 7:00-9:00pm - Online',
] as const

export default function Contact() {
  const [searchParams] = useSearchParams()
  const preselectedServiceParam = searchParams.get('service') ?? ''
  const preselectedService =
    counsellingServices.find((service) => service.slug === preselectedServiceParam)?.title ??
    preselectedServiceParam

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    const fullName = String(formData.get('fullName') ?? '').trim()
    const email = String(formData.get('email') ?? '').trim()
    const phone = String(formData.get('phone') ?? '').trim()
    const service = String(formData.get('service') ?? '').trim()
    const serviceFormat = String(formData.get('serviceFormat') ?? '').trim()
    const preferredTimeSlot = String(formData.get('preferredTimeSlot') ?? '').trim()
    const message = String(formData.get('message') ?? '').trim()

    const details = [
      'Hello SWARO, I would like to book a consultation.',
      '',
      `Full Name: ${fullName}`,
      `Email: ${email}`,
      `Phone / WhatsApp: ${phone}`,
      `Counselling Service: ${service}`,
      `Service Format: ${serviceFormat}`,
      `Preferred Time Slot: ${preferredTimeSlot}`,
      `Message: ${message || 'N/A'}`,
    ].join('\n')

    const whatsappNumber = site.phone.replace(/\D/g, '')
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(details)}`
    window.location.href = whatsappUrl
  }

  return (
    <>
      <SEOHead
        title="Book a Consultation"
        description={CONTACT_META_DESCRIPTION}
        path="/contact"
        image={pageHeroMedia.about}
        ogImageAlt="Consultation scheduling form for Swaro Institute"
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

            <form className="contactConsult__form" onSubmit={handleSubmit}>
              <label className="contactConsult__field">
                <span>Full Name *</span>
                <input type="text" name="fullName" autoComplete="name" required placeholder="Your full name" />
              </label>

              <label className="contactConsult__field">
                <span>Email *</span>
                <input type="email" name="email" autoComplete="email" required placeholder="you@example.com" />
              </label>

              <label className="contactConsult__field">
                <span>Phone / WhatsApp *</span>
                <input type="tel" name="phone" autoComplete="tel" required placeholder="+254..." />
              </label>

              <label className="contactConsult__field">
                <span>Counselling Service *</span>
                <select name="service" required defaultValue={preselectedService}>
                  <option value="" disabled>
                    Select counselling service
                  </option>
                  {counsellingServices.map((service) => (
                    <option key={service.id} value={service.title}>
                      {service.title}
                    </option>
                  ))}
                </select>
              </label>

              <label className="contactConsult__field">
                <span>Service Format *</span>
                <select name="serviceFormat" required defaultValue="">
                  <option value="" disabled>
                    Select service format
                  </option>
                  <option>Individual Counselling</option>
                  <option>Group Counselling</option>
                </select>
              </label>

              <label className="contactConsult__field">
                <span>Preferred Time Slot *</span>
                <select name="preferredTimeSlot" required defaultValue="">
                  <option value="" disabled>
                    Select preferred time slot
                  </option>
                  {CONTACT_TIME_SLOTS.map((slot) => (
                    <option key={slot}>{slot}</option>
                  ))}
                </select>
              </label>

              <label className="contactConsult__field contactConsult__field--full">
                <span>Optional Message</span>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Briefly share what you need support with..."
                />
              </label>

              <label className="contactConsult__consent contactConsult__field--full">
                <input type="checkbox" required name="consent" />
                <span>I consent to being contacted by SWARO regarding this consultation request.</span>
              </label>

              <div className="contactConsult__field--full">
                <button type="submit" className="contactConsult__submit">
                  Continue to WhatsApp
                </button>
                <p className="contactConsult__privacy">
                  After submitting, you will be redirected to WhatsApp to confirm your booking details.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
