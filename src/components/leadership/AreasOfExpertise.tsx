import SectionWrapper from '../common/SectionWrapper'

const areas = ['Mental health & wellbeing', 'Organisational learning', 'Community development', 'Research & evaluation']

export default function AreasOfExpertise() {
  return (
    <SectionWrapper>
      <h2 style={{ margin: '0 0 1rem' }}>Areas of expertise</h2>
      <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#333' }}>
        {areas.map((a) => (
          <li key={a} style={{ marginBottom: '0.35rem' }}>
            {a}
          </li>
        ))}
      </ul>
    </SectionWrapper>
  )
}
