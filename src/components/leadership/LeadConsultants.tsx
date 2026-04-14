import SectionWrapper from '../common/SectionWrapper'

const people = [
  { name: 'Lead consultant', role: 'Clinical & programme lead', bio: 'Brief biography and credentials go here.' },
  { name: 'Associate consultant', role: 'Training & partnerships', bio: 'Brief biography and credentials go here.' },
]

export default function LeadConsultants() {
  return (
    <SectionWrapper>
      <h2 style={{ margin: '0 0 1.5rem' }}>Lead consultants</h2>
      <div style={{ display: 'grid', gap: '1.25rem', gridTemplateColumns: 'repeat(auto-fit, minmax(16rem, 1fr))' }}>
        {people.map((p) => (
          <article
            key={p.name}
            style={{ padding: '1.25rem', border: '1px solid #e5e5e5', borderRadius: '0.75rem', background: '#fff' }}
          >
            <h3 style={{ margin: '0 0 0.25rem', fontSize: '1.05rem' }}>{p.name}</h3>
            <div style={{ fontSize: '0.85rem', color: '#2563eb', fontWeight: 600, marginBottom: '0.5rem' }}>{p.role}</div>
            <p style={{ margin: 0, color: '#5c5c5c', fontSize: '0.95rem' }}>{p.bio}</p>
          </article>
        ))}
      </div>
    </SectionWrapper>
  )
}
