import { stats } from '../../constants/swaroData'

export default function StatsBar() {
  return (
    <section style={{ background: '#fff', borderBlock: '1px solid #e5e5e5' }}>
      <div
        style={{
          maxWidth: '72rem',
          margin: '0 auto',
          padding: '2rem 1.25rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(10rem, 1fr))',
          gap: '1.5rem',
          textAlign: 'center',
        }}
      >
        {stats.map((s) => (
          <div key={s.label}>
            <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#2563eb' }}>{s.value}</div>
            <div style={{ fontSize: '0.9rem', color: '#5c5c5c' }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
