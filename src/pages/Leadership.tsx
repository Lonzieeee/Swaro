import AreasOfExpertise from '../components/leadership/AreasOfExpertise'
import LeadConsultants from '../components/leadership/LeadConsultants'
import SEOHead from '../components/seo/SEOHead'

export default function Leadership() {
  return (
    <>
      <SEOHead
        title="Leadership"
        description="Lead consultants and areas of expertise at SWARO."
        path="/leadership"
      />
      <LeadConsultants />
      <AreasOfExpertise />
    </>
  )
}
