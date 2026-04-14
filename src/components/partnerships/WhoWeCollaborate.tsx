import type { CSSProperties } from 'react'
import type { IconType } from 'react-icons'
import {
  HiOutlineAcademicCap,
  HiOutlineBriefcase,
  HiOutlineBuildingLibrary,
  HiOutlineGlobeAmericas,
  HiOutlineHome,
  HiOutlineUserGroup,
} from 'react-icons/hi2'
import { PARTNERSHIP_PARTNER_SECTORS, type PartnershipSectorId } from '../../constants/partnershipsPartnerSectors'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import './WhoWeCollaborate.css'

const ICON_SIZE = 26

const ICON_BY_ID: Record<PartnershipSectorId, IconType> = {
  ngos: HiOutlineGlobeAmericas,
  academic: HiOutlineAcademicCap,
  government: HiOutlineBuildingLibrary,
  faith: HiOutlineHome,
  corporate: HiOutlineBriefcase,
  communities: HiOutlineUserGroup,
}

type Partner = {
  readonly id: PartnershipSectorId
  readonly title: string
  readonly description: string
  readonly tags: readonly string[]
  readonly Icon: IconType
}

const PARTNERS: readonly Partner[] = PARTNERSHIP_PARTNER_SECTORS.map((p) => ({
  id: p.id,
  title: p.title,
  description: p.description,
  tags: p.tags,
  Icon: ICON_BY_ID[p.id],
}))

export default function WhoWeCollaborate() {
  const { ref: sectionRef, isVisible: visible } = useScrollAnimation({
    threshold: 0.12,
    rootMargin: '0px 0px -8% 0px',
  })

  return (
    <section
      ref={sectionRef}
      className={`whoWeCollaborate${visible ? ' whoWeCollaborate--visible' : ''}`}
      aria-labelledby="who-we-collaborate-heading"
    >
      <div className="whoWeCollaborate__header">
        <div className="whoWeCollaborate__headerLeft">
          <div className="whoWeCollaborate__label">
            Our Partners
            <span className="whoWeCollaborate__labelUnderline" aria-hidden />
          </div>
          <h2 id="who-we-collaborate-heading" className="whoWeCollaborate__heading">
            Who We <span className="whoWeCollaborate__headingAccent">Collaborate With</span>
          </h2>
          <p className="whoWeCollaborate__subtext">
            We build meaningful partnerships across six key sectors — each collaboration grounded in a shared
            commitment to education, research, human development and lasting community impact.
          </p>
        </div>
      </div>

      <div className="whoWeCollaborate__grid">
        {PARTNERS.map((partner, i) => {
          const { Icon } = partner
          return (
            <article
              key={partner.id}
              className="whoWeCollaborate__card"
              style={
                {
                  transitionDelay: `${0.1 * i + 0.2}s`,
                } as CSSProperties
              }
            >
              <div className="whoWeCollaborate__iconWrap">
                <Icon className="whoWeCollaborate__icon" size={ICON_SIZE} aria-hidden />
              </div>
              <h3 className="whoWeCollaborate__cardTitle">{partner.title}</h3>
              <p className="whoWeCollaborate__cardBody">{partner.description}</p>
              <div className="whoWeCollaborate__tags">
                {partner.tags.map((tag) => (
                  <span key={tag} className="whoWeCollaborate__tag">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="whoWeCollaborate__cardAccent" aria-hidden />
            </article>
          )
        })}
      </div>
    </section>
  )
}
