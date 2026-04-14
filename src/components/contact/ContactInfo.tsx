import { site } from '../../constants/swaroData'

export default function ContactInfo() {
  return (
    <div style={{ maxWidth: '24rem' }}>
      <h2 style={{ margin: '0 0 0.75rem' }}>Contact</h2>
      <p style={{ margin: '0 0 1rem', color: '#5c5c5c' }}>
        Reach out for enquiries, collaborations, or to discuss how we can support your organisation.
      </p>
      <dl style={{ margin: 0, display: 'grid', gap: '0.75rem' }}>
        <div>
          <dt style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Email
          </dt>
          <dd style={{ margin: '0.25rem 0 0' }}>
            <a href={`mailto:${site.contactEmail}`} style={{ color: '#2563eb' }}>
              {site.contactEmail}
            </a>
          </dd>
        </div>
        <div>
          <dt style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Phone
          </dt>
          <dd style={{ margin: '0.25rem 0 0' }}>{site.phone}</dd>
        </div>
      </dl>
    </div>
  )
}
