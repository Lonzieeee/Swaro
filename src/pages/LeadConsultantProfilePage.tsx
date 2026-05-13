import { Link, Navigate, useParams } from 'react-router-dom'
import { HiChevronLeft } from 'react-icons/hi2'
import SEOHead from '../components/seo/SEOHead'
import { getLeadConsultantProfile } from '../constants/leadConsultantProfiles'
import { truncateShareDescription, type BreadcrumbJsonLdItem } from '../utils/seo'
import './LeadConsultantProfilePage.css'

export default function LeadConsultantProfilePage() {
  const { slug } = useParams<{ slug: string }>()
  const profile = getLeadConsultantProfile(slug)

  if (!profile) {
    return <Navigate to="/about#lead-consultants" replace />
  }

  const path = `/about/${profile.slug}`
  const backHref = '/about#lead-consultants'

  const breadcrumbs: readonly BreadcrumbJsonLdItem[] = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: profile.name },
  ]

  return (
    <>
      <SEOHead
        title={profile.name}
        description={truncateShareDescription(profile.metaDescription)}
        path={path}
        image={profile.image}
        ogImageAlt={profile.imageAlt}
        schemaPageType="AboutPage"
        breadcrumbs={breadcrumbs}
      />

      <div className="consultantProfilePage">
        <article className="consultantProfile" aria-labelledby="consultant-profile-heading">
          <div className="consultantProfile__visual">
            <Link to={backHref} className="consultantProfile__visualBack" aria-label="Back to About">
              <HiChevronLeft className="consultantProfile__visualBackIcon" aria-hidden />
              <span className="consultantProfile__visualBackText">Back</span>
            </Link>
            <img
              className="consultantProfile__visualImg"
              src={profile.image}
              alt={profile.imageAlt}
              width={960}
              height={1200}
              loading="eager"
              decoding="async"
            />
          </div>

          <div className="consultantProfile__content">
            <header className="consultantProfile__contentHeader">
              <h1 id="consultant-profile-heading" className="consultantProfile__name">
                {profile.name}
              </h1>
              <p className="consultantProfile__role">{profile.roleLabel}</p>
            </header>

            <div className="consultantProfile__bodyInner">
              <div className="consultantProfile__columns">
                <div className="consultantProfile__col">
                  {profile.columnLeft.map((paragraph) => (
                    <p key={paragraph} className="consultantProfile__paragraph">
                      {paragraph}
                    </p>
                  ))}
                </div>
                <div className="consultantProfile__col">
                  {profile.columnRight.map((paragraph) => (
                    <p key={paragraph} className="consultantProfile__paragraph">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              <section className="consultantProfile__core" aria-labelledby="consultant-core-heading">
                <h2 id="consultant-core-heading" className="consultantProfile__coreTitle">
                  Core areas
                </h2>
                <ul className="consultantProfile__coreGrid" role="list">
                  {profile.coreAreas.map((area) => (
                    <li key={area} className="consultantProfile__coreCard" role="listitem">
                      <span className="consultantProfile__coreAccent" aria-hidden />
                      <span className="consultantProfile__coreLabel">{area}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </article>
      </div>
    </>
  )
}
