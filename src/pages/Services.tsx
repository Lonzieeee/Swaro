import SectionWrapper from '../components/common/SectionWrapper'
import SEOHead from '../components/seo/SEOHead'
import CommunityEmpowerment from '../components/services/CommunityEmpowerment'
import Counselling from '../components/services/Counselling'
import Education from '../components/services/Education'
import HealthLifestyle from '../components/services/HealthLifestyle'
import Research from '../components/services/Research'
import Training from '../components/services/Training'

export default function Services() {
  return (
    <>
      <SEOHead
        title="Services"
        description="Counselling, training, education, community empowerment, research, and health & lifestyle support."
        path="/services"
      />
      <SectionWrapper>
        <h1 style={{ margin: '0 0 0.5rem' }}>Services</h1>
        <p style={{ margin: '0 0 2rem', color: '#5c5c5c', maxWidth: '40rem' }}>
          Explore our main service areas. Content can be expanded in each component and in swaroData.
        </p>
        <div
          style={{
            display: 'grid',
            gap: '1.25rem',
            gridTemplateColumns: 'repeat(auto-fit, minmax(17rem, 1fr))',
          }}
        >
          <Counselling />
          <Training />
          <Education />
          <CommunityEmpowerment />
          <Research />
          <HealthLifestyle />
        </div>
      </SectionWrapper>
    </>
  )
}
