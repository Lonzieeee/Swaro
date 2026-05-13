import { useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import SEOHead from '../components/seo/SEOHead'
import { counsellingServicesBySlug } from '../constants/counsellingServices'
import './CounsellingServicePage.css'

type TabKey = 'overview' | 'notes' | 'quizzes' | 'certificate' | 'reviews'

type WeekItem = {
  week: string
  title: string
  description: string
}

const courseTabs: Array<{ key: TabKey; label: string }> = [
  { key: 'overview', label: 'Overview' },
  { key: 'notes', label: 'Notes' },
  { key: 'quizzes', label: 'Quizzes' },
  { key: 'certificate', label: 'Certificate' },
  { key: 'reviews', label: 'Reviews' },
]

function createWeeklyContent(title: string): WeekItem[] {
  return [
    {
      week: 'Week 1',
      title: `Getting started with ${title}`,
      description:
        'An introduction to the course journey, expectations, and the core issues the program is designed to support in a safe and guided way.',
    },
    {
      week: 'Week 2',
      title: 'Understanding the foundations',
      description:
        'A closer look at the key emotional, relational, and practical foundations that will shape the rest of the learning experience.',
    },
    {
      week: 'Week 3',
      title: 'Practical tools and reflection',
      description:
        'Simple exercises, reflection prompts, and practical tools that help participants apply what they are learning to daily life.',
    },
    {
      week: 'Week 4',
      title: 'Strengthening confidence',
      description:
        'Activities focused on confidence-building, stability, and finding better ways to respond to common challenges and transitions.',
    },
    {
      week: 'Week 5',
      title: 'Consolidation and next steps',
      description:
        'A closing week for reviewing progress, identifying key takeaways, and preparing for the next stage of support or growth.',
    },
  ]
}

function OverviewCard({ title, value }: { title: string; value: string }) {
  return (
    <article className="courseOverviewPage__highlightCard">
      <p className="courseOverviewPage__highlightLabel">{title}</p>
      <p className="courseOverviewPage__highlightValue">{value}</p>
    </article>
  )
}

export default function CounsellingServicePage() {
  const { slug } = useParams<{ slug: string }>()
  const content = slug ? counsellingServicesBySlug[slug] : undefined
  const [activeTab, setActiveTab] = useState<TabKey>('overview')
  const [openWeek, setOpenWeek] = useState<number>(0)

  const weeklyContent = useMemo(() => createWeeklyContent(content?.title ?? 'this program'), [content?.title])

  if (!content) {
    return <Navigate to="/" replace />
  }

  const heroDescription =
    content.pageDescription ??
    content.description ??
    'A guided learning experience designed to support growth, reflection, and practical progress.'

  const aboutCourse =
    content.introSectionBody ??
    `${heroDescription} This course overview brings together the key information, course structure, and learning highlights in one place.`

  const programHighlights = [
    { title: 'Format', value: 'Weekly guided sessions' },
    { title: 'Access', value: 'Online and physical options' },
    { title: 'Duration', value: 'Structured program pathway' },
    { title: 'Support', value: 'One-on-one or group sessions' },
    { title: 'Certificate', value: 'Awarded upon completion' },
    { title: 'Price', value: 'Paid course' },
  ]

  return (
    <>
      <SEOHead
        title={`${content.title} | Course Overview`}
        description={heroDescription}
        path={`/counselling-services/${content.slug}`}
        schemaPageType="WebPage"
        image={content.pageImage ?? content.image}
        ogImageAlt={content.imageAlt}
      />

      <section className="courseOverviewPage">
        <div className="courseOverviewPage__layout">
          <div className="courseOverviewPage__heroShell">
            <div
              className="courseOverviewPage__heroImage"
              style={{
                backgroundImage: `linear-gradient(rgba(10, 14, 13, 0.22), rgba(10, 14, 13, 0.42)), url(${content.pageImage ?? content.image})`,
              }}
              role="img"
              aria-label={content.imageAlt}
            >
              <div className="courseOverviewPage__heroOverlay">
                <div className="courseOverviewPage__heroBadge">Paid Course</div>
                <h1 className="courseOverviewPage__heroTitle">{content.title}</h1>
                <p className="courseOverviewPage__heroText">{heroDescription}</p>
                <Link to={`/book-session?service=${encodeURIComponent(content.slug)}`} className="courseOverviewPage__heroButton">
                  Enrol Now
                </Link>
              </div>
            </div>
          </div>

          <aside className="courseOverviewPage__sidebar" aria-label="Course details and weekly content">
            <div className="courseOverviewPage__sidebarCard">
              <div className="courseOverviewPage__sidebarHeader">
                <p className="courseOverviewPage__sidebarKicker">Course overview</p>
                <h2 className="courseOverviewPage__sidebarTitle">{content.title}</h2>
                <p className="courseOverviewPage__sidebarDescription">{heroDescription}</p>
                <button className="courseOverviewPage__tutorButton" type="button" disabled aria-disabled="true">
                  View Tutor Profile
                </button>
              </div>

              <div className="courseOverviewPage__sidebarSection">
                <div className="courseOverviewPage__sidebarSectionHeader">
                  <h3 className="courseOverviewPage__sidebarSectionTitle">Course content</h3>
                  <span className="courseOverviewPage__sidebarSectionMeta">Weekly</span>
                </div>

                <div className="courseOverviewPage__accordion" role="list">
                  {weeklyContent.map((item, index) => {
                    const isOpen = openWeek === index

                    return (
                      <article
                        key={item.week}
                        className={`courseOverviewPage__accordionItem${isOpen ? ' courseOverviewPage__accordionItem--open' : ''}`}
                        role="listitem"
                      >
                        <button
                          type="button"
                          className="courseOverviewPage__accordionButton"
                          onClick={() => setOpenWeek(isOpen ? -1 : index)}
                          aria-expanded={isOpen}
                        >
                          <span>
                            <span className="courseOverviewPage__accordionWeek">{item.week}</span>
                            <span className="courseOverviewPage__accordionTitle">{item.title}</span>
                          </span>
                          <span className="courseOverviewPage__accordionChevron" aria-hidden>
                            {isOpen ? '−' : '⌄'}
                          </span>
                        </button>

                        {isOpen ? (
                          <div className="courseOverviewPage__accordionBody">
                            <p>{item.description}</p>
                          </div>
                        ) : null}
                      </article>
                    )
                  })}
                </div>
              </div>
            </div>
          </aside>
        </div>

        <div className="courseOverviewPage__tabsWrap">
          <div className="courseOverviewPage__tabs" role="tablist" aria-label="Course sections">
            {courseTabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.key}
                className={`courseOverviewPage__tab${activeTab === tab.key ? ' courseOverviewPage__tab--active' : ''}`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="courseOverviewPage__panels">
            {activeTab === 'overview' ? (
              <section className="courseOverviewPage__panel" aria-labelledby="overview-panel-title">
                <h2 id="overview-panel-title" className="courseOverviewPage__panelTitle">
                  About this course
                </h2>
                <p className="courseOverviewPage__panelIntro">{aboutCourse}</p>

                <div className="courseOverviewPage__highlightGrid" aria-label="Program highlights">
                  {programHighlights.map((item) => (
                    <OverviewCard key={item.title} title={item.title} value={item.value} />
                  ))}
                </div>
              </section>
            ) : null}

            {activeTab === 'notes' ? (
              <section className="courseOverviewPage__panel" aria-labelledby="notes-panel-title">
                <h2 id="notes-panel-title" className="courseOverviewPage__panelTitle">
                  Notes
                </h2>
                <div className="courseOverviewPage__emptyState">Notes will appear here soon.</div>
              </section>
            ) : null}

            {activeTab === 'quizzes' ? (
              <section className="courseOverviewPage__panel" aria-labelledby="quizzes-panel-title">
                <h2 id="quizzes-panel-title" className="courseOverviewPage__panelTitle">
                  Quizzes
                </h2>
                <div className="courseOverviewPage__emptyState">Quiz content is coming soon.</div>
              </section>
            ) : null}

            {activeTab === 'certificate' ? (
              <section className="courseOverviewPage__panel" aria-labelledby="certificate-panel-title">
                <h2 id="certificate-panel-title" className="courseOverviewPage__panelTitle">
                  Certificate
                </h2>
                <div className="courseOverviewPage__certificateCard">Certificate awarded upon completion.</div>
              </section>
            ) : null}

            {activeTab === 'reviews' ? (
              <section className="courseOverviewPage__panel" aria-labelledby="reviews-panel-title">
                <h2 id="reviews-panel-title" className="courseOverviewPage__panelTitle">
                  Reviews
                </h2>
                <div className="courseOverviewPage__emptyState">Reviews will be added here later.</div>
              </section>
            ) : null}
          </div>
        </div>
      </section>
    </>
  )
}