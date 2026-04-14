import { Link } from 'react-router-dom'
import './PageHero.css'

export type PageHeroBreadcrumb = {
  label: string
  path?: string
}

type PageHeroProps = {
  title: string
  image: string
  /** Short description of the photo for screen readers (optional if decorative). */
  imageAlt?: string
  breadcrumbs: PageHeroBreadcrumb[]
}

export default function PageHero({ title, image, imageAlt = '', breadcrumbs }: PageHeroProps) {
  return (
    <section className="pageHero" aria-label={`${title} page header`}>
      <div className="pageHero__media">
        <img
          className="pageHero__img"
          src={image}
          alt={imageAlt}
          decoding="async"
          fetchPriority="high"
        />
        <div className="pageHero__overlay" aria-hidden />
      </div>

      <div className="pageHero__goldBar" aria-hidden />

      <div className="pageHero__inner">
        <nav aria-label="Breadcrumb">
          <ol className="pageHero__crumbs">
            {breadcrumbs.map((crumb, i) => {
              const key = `${crumb.label}-${crumb.path ?? 'here'}-${i}`
              return (
                <li key={key} className="pageHero__crumb">
                  {crumb.path ? (
                    <Link to={crumb.path} className="pageHero__crumbLink">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="pageHero__crumbCurrent" aria-current="page">
                      {crumb.label}
                    </span>
                  )}
                </li>
              )
            })}
          </ol>
        </nav>

        <h1 className="pageHero__title">{title}</h1>
      </div>
    </section>
  )
}
