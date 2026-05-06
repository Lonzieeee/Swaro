import type { FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import SEOHead from '../components/seo/SEOHead'
import { pageHeroMedia } from '../constants/swaroData'
import { counsellingServices } from '../constants/counsellingServices'
import type { BreadcrumbJsonLdItem } from '../utils/seo'
import './Contact.css'

const BOOKING_BREADCRUMBS: readonly BreadcrumbJsonLdItem[] = [
  { name: 'Home', path: '/' },
  { name: 'Book Session' },
]

export default function CounsellingBooking() {
  const [searchParams] = useSearchParams()
  const today = new Date().toISOString().split('T')[0]
  const preselectedServiceParam = searchParams.get('service') ?? ''
  const preselectedService =
    counsellingServices.find((service) => service.slug === preselectedServiceParam)?.title ??
    preselectedServiceParam

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const fullName = String(formData.get('fullName') ?? '').trim()
    const email = String(formData.get('email') ?? '').trim()
    const phone = String(formData.get('phone') ?? '').trim()
    const preferredStartDate = String(formData.get('preferredStartDate') ?? '').trim()
    const service = String(formData.get('service') ?? '').trim()
    const serviceFormat = String(formData.get('serviceFormat') ?? '').trim()
    const preferredMode = String(formData.get('preferredMode') ?? '').trim()
    const message = String(formData.get('message') ?? '').trim()

    const details = [
      'Hello SWARO, I would like to book a counselling session.',
      '',
      `Full Name: ${fullName}`,
      `Email: ${email}`,
      `Phone / WhatsApp: ${phone}`,
      `Counselling Service: ${service}`,
      `Service Format: ${serviceFormat}`,
      `Preferred Mode: ${preferredMode}`,
      `Preferred Start Date: ${preferredStartDate}`,
      `Message: ${message || 'N/A'}`,
    ].join('\n')

    const whatsappNumber = '254711966258'
    window.location.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(details)}`
  }

  return (
    <>
      <SEOHead
        title="Book a Counselling Session"
        description="Complete your booking details and continue to WhatsApp to confirm your counselling session."
        path="/book-session"
        image={pageHeroMedia.about}
        ogImageAlt="Book a counselling session form"
        schemaPageType="ContactPage"
        breadcrumbs={BOOKING_BREADCRUMBS}
      />

      <section className="contactConsult">
        <div className="contactConsult__hero" aria-hidden>
          <img src={pageHeroMedia.about} alt="" className="contactConsult__bg" decoding="async" />
          <div className="contactConsult__overlay" />
        </div>

        <div className="contactConsult__inner">
          <div className="contactConsult__panel">
            <h1 className="contactConsult__title">Book a Counselling Session</h1>
            <p className="contactConsult__intro">Share your details below, then confirm instantly on WhatsApp.</p>

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
                <span>Preferred Start Date *</span>
                <input type="date" name="preferredStartDate" min={today} required />
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
                <span>Preferred Mode *</span>
                <select name="preferredMode" required defaultValue="">
                  <option value="" disabled>
                    Select preferred mode
                  </option>
                  <option>Online</option>
                  <option>In-person</option>
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
