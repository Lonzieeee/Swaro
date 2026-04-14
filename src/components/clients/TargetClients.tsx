import SectionWrapper from '../common/SectionWrapper'

const clients = [
  'Non-profits and community organisations',
  'Schools and learning institutions',
  'Private sector teams',
  'Public sector programmes',
]

export default function TargetClients() {
  return (
    <SectionWrapper>
      <h2 style={{ margin: '0 0 1rem' }}>Who we work with</h2>
      <p style={{ margin: '0 0 1rem', color: '#5c5c5c', maxWidth: '40rem' }}>
        We partner with groups that want practical support and lasting impact.
      </p>
      <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
        {clients.map((c) => (
          <li key={c} style={{ marginBottom: '0.35rem' }}>
            {c}
          </li>
        ))}
      </ul>
    </SectionWrapper>
  )
}
