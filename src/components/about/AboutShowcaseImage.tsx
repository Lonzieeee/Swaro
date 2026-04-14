import { aboutPageMedia } from '../../constants/swaroData'
import './AboutShowcaseImage.css'

export default function AboutShowcaseImage() {
  return (
    <section className="aboutShowcase" aria-label="SWARO in context">
      <div className="aboutShowcase__inner">
        <div className="aboutShowcase__frame">
          <img
            className="aboutShowcase__img"
            src={aboutPageMedia.showcase}
            alt="Modern home at dusk with warm interior light, garden and sunset sky"
            width={1600}
            height={900}
            loading="lazy"
            decoding="async"
          />
          <div className="aboutShowcase__overlay" aria-hidden />
        </div>
      </div>
    </section>
  )
}
