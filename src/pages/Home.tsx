import SEOHead from '../components/seo/SEOHead'
import CTASection from '../components/home/CTASection'
import Hero from '../components/home/Hero'
import AboutSnapshot from '../components/home/AboutSnapshot'
import ServicesSnapshot from '../components/home/ServicesSnapshot'
import WhyChooseUs from '../components/home/WhyChooseUs'
import { site } from '../constants/swaroData'

export default function Home() {
  return (
    <>
      <SEOHead title={site.homeTitle} description={site.homeDescription} path="/" />
      <Hero />
      <AboutSnapshot />
      <ServicesSnapshot />
      <WhyChooseUs />
      <CTASection />
    </>
  )
}
