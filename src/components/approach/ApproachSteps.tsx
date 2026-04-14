import SectionWrapper from '../common/SectionWrapper'

const steps = [
  { n: 1, title: 'Listen', text: 'We start by understanding your context, constraints, and desired outcomes.' },
  { n: 2, title: 'Design', text: 'Together we shape a practical plan that fits your timeline and resources.' },
  { n: 3, title: 'Deliver', text: 'We implement with clarity, feedback loops, and professional standards.' },
  { n: 4, title: 'Review', text: 'We reflect on impact and adjust so improvements stick.' },
]

export default function ApproachSteps() {
  return (
    <SectionWrapper>
      <h2 style={{ margin: '0 0 1.5rem' }}>Our approach</h2>
      <div style={{ display: 'grid', gap: '1.25rem' }}>
        {steps.map((s) => (
          <div
            key={s.n}
            style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              gap: '1rem',
              alignItems: 'start',
              padding: '1.25rem',
              borderRadius: '0.75rem',
              border: '1px solid #e5e5e5',
              background: '#fff',
            }}
          >
            <span
              style={{
                width: '2.25rem',
                height: '2.25rem',
                borderRadius: '50%',
                background: '#2563eb',
                color: '#fff',
                display: 'grid',
                placeItems: 'center',
                fontWeight: 700,
                fontSize: '0.95rem',
              }}
            >
              {s.n}
            </span>
            <div>
              <h3 style={{ margin: '0 0 0.35rem', fontSize: '1.05rem' }}>{s.title}</h3>
              <p style={{ margin: 0, color: '#5c5c5c', fontSize: '0.95rem' }}>{s.text}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
