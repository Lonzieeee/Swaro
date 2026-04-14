import TargetClients from '../components/clients/TargetClients'
import WhyChooseUs from '../components/home/WhyChooseUs'
import SEOHead from '../components/seo/SEOHead'

export default function WhyUs() {
  return (
    <>
      <SEOHead
        title="Why Us"
        description="Why organisations and communities choose to work with SWARO."
        path="/why-us"
      />
      <WhyChooseUs />
      <TargetClients />
    </>
  )
}
