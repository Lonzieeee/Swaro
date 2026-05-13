import { useEffect, useRef, useState } from 'react'
import { getCourseProgramTriptych } from '../../constants/courseProgramCards'
import '../../pages/CounsellingServiceDetailPage.css'

type Props = {
  slug: string
}

export default function CourseProgramCardsTriptych({ slug }: Props) {
  const data = getCourseProgramTriptych(slug)
  const sectionRef = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!data || !el) return

    const overlapsViewport = (node: HTMLElement) => {
      const r = node.getBoundingClientRect()
      const vh = window.innerHeight || document.documentElement.clientHeight
      return r.bottom > 1 && r.top < vh - 1
    }

    const sync = () => {
      if (overlapsViewport(el)) setVisible(true)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setVisible(true)
        })
      },
      { root: null, rootMargin: '0px 0px -8% 0px', threshold: [0, 0.08, 0.15, 0.25] },
    )

    observer.observe(el)
    requestAnimationFrame(() => {
      requestAnimationFrame(sync)
    })

    return () => {
      observer.disconnect()
    }
  }, [data, slug])

  if (!data) return null

  const themeClass =
    data.variant === 'prenatal'
      ? 'counsellingServicePage--prenatal'
      : data.variant === 'motherhood'
        ? 'counsellingServicePage--motherhood'
        : ''

  const sectionClass =
    data.variant === 'premarital'
      ? `counsellingServicePage__programCards counsellingServicePage__programCards--premarital${visible ? ' counsellingServicePage__programCards--premarital--visible' : ''}`
      : data.variant === 'motherhood'
        ? `counsellingServicePage__programCards counsellingServicePage__programCards--motherhood${visible ? ' counsellingServicePage__programCards--visible' : ''}`
        : `counsellingServicePage__programCards${visible ? ' counsellingServicePage__programCards--visible' : ''}`

  return (
    <div className={`courseProgramCardsTriptych${themeClass ? ` ${themeClass}` : ''}`}>
      <section
        ref={sectionRef}
        className={sectionClass}
        aria-label="Program highlights, outcomes, and support"
      >
        <div className="counsellingServicePage__programCardsGrid">
          <article className="counsellingServicePage__programCard">
            <h3 className="counsellingServicePage__programCardTitle">{data.highlights.title}</h3>
            {data.highlights.intro ? (
              <p className="counsellingServicePage__programIntro">{data.highlights.intro}</p>
            ) : null}
            <ul className="counsellingServicePage__programRows" role="list">
              {data.highlights.rows.map((row) => (
                <li key={row.label} className="counsellingServicePage__programRow">
                  <strong>{row.label}:</strong> {row.value}
                </li>
              ))}
            </ul>
          </article>

          <article className="counsellingServicePage__programCard">
            <h3 className="counsellingServicePage__programCardTitle">{data.gains.title}</h3>
            {data.gains.intro ? <p className="counsellingServicePage__programIntro">{data.gains.intro}</p> : null}
            <ul className="counsellingServicePage__programList">
              {data.gains.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="counsellingServicePage__programCard">
            <h3 className="counsellingServicePage__programCardTitle">{data.support.title}</h3>
            {data.support.intro ? <p className="counsellingServicePage__programIntro">{data.support.intro}</p> : null}
            <ul className="counsellingServicePage__programList">
              {data.support.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>
    </div>
  )
}
