import { useMemo, useState } from 'react'
import type { IconType } from 'react-icons'
import { HiChatBubbleLeftRight, HiClipboardDocumentList, HiDocumentText, HiLockClosed } from 'react-icons/hi2'
import { Link, Navigate, useParams } from 'react-router-dom'
import SEOHead from '../components/seo/SEOHead'
import CourseProgramCardsTriptych from '../components/courseOverview/CourseProgramCardsTriptych'
import { getCourseProgramTriptych } from '../constants/courseProgramCards'
import { getProgramHighlightsForSlug } from '../constants/courseProgramHighlights'
import { counsellingServicesBySlug } from '../constants/counsellingServices'
import { ALICE_ONDIGI_SLUG } from '../constants/leadConsultantProfiles'
import type { BreadcrumbJsonLdItem } from '../utils/seo'
import './CounsellingServicePage.css'

type TabKey = 'overview' | 'notes' | 'quizzes' | 'certificate' | 'reviews'

type WeekItem = {
  week: string
  title: string
  description: string
}

function createWeeklyContent(courseTitle: string): WeekItem[] {
  return [
    {
      week: 'Week 1',
      title: `Getting started with ${courseTitle}`,
      description:
        'An introduction to the course journey, expectations, and the core themes the program is designed to support in a safe and guided way.',
    },
    {
      week: 'Week 2',
      title: 'Understanding the foundations',
      description:
        'A closer look at the emotional, relational, and practical foundations that will shape the rest of the learning experience.',
    },
    {
      week: 'Week 3',
      title: 'Practical tools and reflection',
      description:
        'Guided exercises, reflection prompts, and practical tools to help you apply what you are learning to everyday life.',
    },
    {
      week: 'Week 4',
      title: 'Strengthening confidence',
      description:
        'Activities focused on stability, confidence, and responding to common challenges and transitions with greater clarity.',
    },
    {
      week: 'Week 5',
      title: 'Consolidation and next steps',
      description:
        'Review progress, capture key takeaways, and plan meaningful next steps for continued support or growth.',
    },
  ]
}

const weeklyProgramBySlug: Record<string, WeekItem[]> = {
  'debrief-grief-loss-support': [
    {
      week: 'Week 1',
      title: 'Making sense of grief',
      description:
        'How grief shows up in the body and mind, common myths, and how to pace yourself without pressure to “move on” too quickly.',
    },
    {
      week: 'Week 2',
      title: 'Naming emotions safely',
      description:
        'Language for difficult feelings, grounding practices, and simple ways to stay connected to support when waves feel intense.',
    },
    {
      week: 'Week 3',
      title: 'Meaning after loss',
      description:
        'Exploring identity shifts, rituals that help, and gentle ways to honour what changed while rebuilding daily stability.',
    },
    {
      week: 'Week 4',
      title: 'Boundaries and relationships',
      description:
        'Communicating needs to family and friends, handling unhelpful comments, and protecting your energy during healing.',
    },
    {
      week: 'Week 5',
      title: 'Carrying hope forward',
      description:
        'Consolidating insights, identifying trusted next steps, and creating a realistic plan for ongoing care and check-ins.',
    },
  ],
  'premarital-counselling': [
    {
      week: 'Week 1',
      title: 'Relationship strengths and stressors',
      description:
        'Mapping what already works well, where tension shows up, and how you each approach conflict and repair.',
    },
    {
      week: 'Week 2',
      title: 'Communication that connects',
      description:
        'Listening skills, clear requests, and everyday habits that keep conversations warm even when topics are hard.',
    },
    {
      week: 'Week 3',
      title: 'Money, roles, and expectations',
      description:
        'Aligning on finances, household roles, extended family, and the unspoken expectations that often surprise couples later.',
    },
    {
      week: 'Week 4',
      title: 'Intimacy and boundaries',
      description:
        'Emotional and physical closeness, pacing, consent, and healthy boundaries that protect trust over the long term.',
    },
    {
      week: 'Week 5',
      title: 'Your shared roadmap',
      description:
        'Summarising agreements, naming early warning signs, and building a simple plan for check-ins after the wedding.',
    },
  ],
  'resilient-motherhood-program': [
    {
      week: 'Week 1',
      title: 'Settling into a new rhythm',
      description:
        'Sleep realities, feeding questions, and gentle ways to lower pressure while you find a routine that fits your baby.',
    },
    {
      week: 'Week 2',
      title: 'Emotional ups and downs',
      description:
        'Common mood shifts, when to seek extra help, and coping tools for overwhelm, guilt, or feeling “not like yourself”.',
    },
    {
      week: 'Week 3',
      title: 'Confidence in daily care',
      description:
        'Soothing techniques, reading baby cues, and practical tips that build steadiness during crying, growth spurts, and changes.',
    },
    {
      week: 'Week 4',
      title: 'Support systems and boundaries',
      description:
        'Asking for help without shame, navigating visitors and advice, and protecting time for rest and recovery.',
    },
    {
      week: 'Week 5',
      title: 'You, beyond survival mode',
      description:
        'Small steps toward identity and wellbeing, celebrating wins, and planning sustainable support for the months ahead.',
    },
  ],
  'prenatal-wellbeing-support': [
    {
      week: 'Week 1',
      title: 'Whole-person wellbeing in pregnancy',
      description:
        'Balancing medical guidance with emotional care, stress signals, and simple habits that support you week by week.',
    },
    {
      week: 'Week 2',
      title: 'Anxiety, mood, and sleep',
      description:
        'Tools for racing thoughts, worry loops, and better rest—plus when to reach out for professional support early.',
    },
    {
      week: 'Week 3',
      title: 'Body image and identity shifts',
      description:
        'Gentle reframes for changing bodies, staying connected to yourself, and reducing comparison or perfection pressure.',
    },
    {
      week: 'Week 4',
      title: 'Partners, family, and planning',
      description:
        'Conversations that reduce conflict, birth-plan clarity without fear-spirals, and boundaries around unsolicited opinions.',
    },
    {
      week: 'Week 5',
      title: 'Preparing for postpartum',
      description:
        'Emotional readiness, support networks, and a realistic checklist for the first weeks after baby arrives.',
    },
  ],
  'family-conflict-resolution': [
    {
      week: 'Week 1',
      title: 'Mapping the conflict pattern',
      description:
        'What triggers escalation, common roles family members fall into, and shared goals for a calmer home environment.',
    },
    {
      week: 'Week 2',
      title: 'Listening without defending',
      description:
        'Skills for hearing hurt underneath anger, slowing reactions, and creating space for each person to feel understood.',
    },
    {
      week: 'Week 3',
      title: 'Fair fighting and repair',
      description:
        'Ground rules for hard topics, timeouts that actually help, and meaningful apologies that rebuild trust.',
    },
    {
      week: 'Week 4',
      title: 'Roles, rules, and boundaries',
      description:
        'Clarifying expectations, chores, parenting styles, and boundaries with extended family or outside stressors.',
    },
    {
      week: 'Week 5',
      title: 'Agreements and follow-through',
      description:
        'Writing simple family agreements, planning check-ins, and noticing early signs before old cycles return.',
    },
  ],
  'youth-counselling': [
    {
      week: 'Week 1',
      title: 'A space that fits you',
      description:
        'How sessions work, confidentiality basics, and choosing what you want to focus on at your own pace.',
    },
    {
      week: 'Week 2',
      title: 'Stress, school, and pressure',
      description:
        'Managing deadlines, social stress, and expectations—without feeling like you have to figure it all out alone.',
    },
    {
      week: 'Week 3',
      title: 'Moods and big emotions',
      description:
        'Naming feelings, grounding skills, and understanding when sadness or worry might need extra support.',
    },
    {
      week: 'Week 4',
      title: 'Friends, family, and identity',
      description:
        'Navigating changing friendships, family tension, and questions about who you are and who you want to become.',
    },
    {
      week: 'Week 5',
      title: 'Skills for moving forward',
      description:
        'Building confidence, healthy boundaries, and a toolkit you can use after the structured weeks end.',
    },
  ],
}

function getWeeklyProgram(slug: string, courseTitle: string): WeekItem[] {
  return weeklyProgramBySlug[slug] ?? createWeeklyContent(courseTitle)
}

const courseTabs: Array<{ key: TabKey; label: string }> = [
  { key: 'overview', label: 'Overview' },
  { key: 'notes', label: 'Notes' },
  { key: 'quizzes', label: 'Quizzes' },
  { key: 'certificate', label: 'Certificate' },
  { key: 'reviews', label: 'Reviews' },
]

function OverviewCard({ title, value }: { title: string; value: string }) {
  return (
    <article className="courseOverviewPage__highlightCard">
      <p className="courseOverviewPage__highlightLabel">{title}</p>
      <p className="courseOverviewPage__highlightValue">{value}</p>
    </article>
  )
}

function truncateForShare(text: string, max = 158): string {
  const t = text.replace(/\s+/g, ' ').trim()
  if (t.length <= max) return t
  const slice = t.slice(0, max - 1)
  const lastSpace = slice.lastIndexOf(' ')
  const cut = lastSpace > 48 ? lastSpace : max - 1
  return `${slice.slice(0, cut).trimEnd()}…`
}

function LockedCoursePanel({
  headingId,
  title,
  description,
  icon: Icon,
}: {
  headingId: string
  title: string
  description: string
  icon: IconType
}) {
  return (
    <section className="courseOverviewPage__panel courseOverviewPage__panel--locked" aria-labelledby={headingId}>
      <div className="courseOverviewPage__lockedInner">
        <div className="courseOverviewPage__lockedIconStack" aria-hidden>
          <Icon className="courseOverviewPage__lockedFeatureIcon" />
          <HiLockClosed className="courseOverviewPage__lockedPadlock" />
        </div>
        <h2 id={headingId} className="courseOverviewPage__lockedTitle">
          {title}
        </h2>
        <p className="courseOverviewPage__lockedBody">{description}</p>
      </div>
    </section>
  )
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`courseOverviewPage__chevronSvg${open ? ' courseOverviewPage__chevronSvg--open' : ''}`}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function CounsellingServicePage() {
  const { slug } = useParams<{ slug: string }>()
  const content = slug ? counsellingServicesBySlug[slug] : undefined
  const [activeTab, setActiveTab] = useState<TabKey>('overview')
  const [openWeek, setOpenWeek] = useState<number | null>(0)

  const weeklyContent = useMemo(() => (content ? getWeeklyProgram(content.slug, content.title) : []), [content])

  if (!content) {
    return <Navigate to="/" replace />
  }

  const heroDetailedDescription = content.description

  const rawBrief = (content.pageDescription ?? heroDetailedDescription).trim()
  const sidebarBrief = rawBrief.length > 220 ? `${rawBrief.slice(0, 217).trimEnd()}…` : rawBrief

  const aboutCourse =
    content.introSectionBody ??
    `${content.pageDescription ?? heroDetailedDescription} This overview brings together structure, highlights, and how the program typically unfolds week by week.`

  const programTriptych = useMemo(() => getCourseProgramTriptych(content.slug), [content.slug])
  const programHighlights = useMemo(() => getProgramHighlightsForSlug(content.slug), [content.slug])

  const enrolHref = `/book-session?service=${encodeURIComponent(content.slug)}`
  const learnMoreHref = `/counselling-services/${content.slug}`
  const tutorProfileHref = `/about/${ALICE_ONDIGI_SLUG}`
  const seoPath = `/course-overview/${content.slug}`

  const shareDescription = useMemo(
    () => truncateForShare(content.pageDescription ?? heroDetailedDescription),
    [content.pageDescription, heroDetailedDescription],
  )

  const overviewSeoBreadcrumbs = useMemo(
    (): readonly BreadcrumbJsonLdItem[] => [
      { name: 'Home', path: '/' },
      { name: 'Featured programs', path: '/#featured-programs' },
      { name: `${content.title} | Course overview` },
    ],
    [content.title],
  )

  const imageUrl = content.pageImage ?? content.image

  const activeSectionLabel = courseTabs.find((tab) => tab.key === activeTab)?.label ?? 'Overview'

  return (
    <>
      <SEOHead
        title={`${content.title} | Course Overview`}
        description={shareDescription}
        path={seoPath}
        schemaPageType="WebPage"
        image={content.shareImage ?? content.pageImage ?? content.image}
        ogImageAlt={content.imageAlt}
        breadcrumbs={overviewSeoBreadcrumbs}
      />

      <section className="courseOverviewPage">
        <div className="courseOverviewPage__topGrid">
          <div className="courseOverviewPage__mainColumn">
            <div className="courseOverviewPage__heroShell">
              <div
                className="courseOverviewPage__heroImage"
                style={{ backgroundImage: `url(${imageUrl})` }}
                role="img"
                aria-label={content.imageAlt}
              >
                <div className="courseOverviewPage__heroScrim" aria-hidden />
                <div className="courseOverviewPage__heroOverlay">
                  <nav className="courseOverviewPage__breadcrumbs" aria-label="Breadcrumb">
                    <ol className="courseOverviewPage__crumbs">
                      <li>
                        <Link to="/" className="courseOverviewPage__crumbLink">
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link to="/#featured-programs" className="courseOverviewPage__crumbLink" title="Featured programs on the home page">
                          Programs
                        </Link>
                      </li>
                      <li>
                        <Link to={learnMoreHref} className="courseOverviewPage__crumbLink" title="Counselling service details">
                          Learn more
                        </Link>
                      </li>
                      <li className="courseOverviewPage__crumbCurrent" aria-current="page">
                        {activeSectionLabel}
                      </li>
                    </ol>
                  </nav>
                  <div className="courseOverviewPage__heroMain">
                    <div className="courseOverviewPage__heroBadge">Paid course</div>
                    <h1 className="courseOverviewPage__heroTitle">{content.title}</h1>
                    <p className="courseOverviewPage__heroText">{heroDetailedDescription}</p>
                    <Link to={enrolHref} className="courseOverviewPage__heroButton">
                      Enrol now
                    </Link>
                  </div>
                </div>
              </div>
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

                    <h3 className="courseOverviewPage__panelSubheading">Program highlights</h3>
                    {programTriptych ? (
                      <CourseProgramCardsTriptych slug={content.slug} />
                    ) : (
                      <div className="courseOverviewPage__highlightGrid" aria-label="Program highlights">
                        {programHighlights.map((item) => (
                          <OverviewCard key={`${item.title}-${item.value}`} title={item.title} value={item.value} />
                        ))}
                      </div>
                    )}

                    <div className="courseOverviewPage__panelFooterCta">
                      <Link to={enrolHref} className="courseOverviewPage__panelEnrolButton">
                        Enrol now
                      </Link>
                    </div>
                  </section>
                ) : null}

                {activeTab === 'notes' ? (
                  <LockedCoursePanel
                    headingId="course-overview-notes-heading"
                    title="Course notes"
                    description="Session notes, worksheets, and key takeaways unlock after you enrol. Enrol to access this material in your learner space."
                    icon={HiDocumentText}
                  />
                ) : null}

                {activeTab === 'quizzes' ? (
                  <LockedCoursePanel
                    headingId="course-overview-quizzes-heading"
                    title="Quizzes"
                    description="Short knowledge checks will appear here once the course is live for enrolled participants."
                    icon={HiClipboardDocumentList}
                  />
                ) : null}

                {activeTab === 'certificate' ? (
                  <section className="courseOverviewPage__panel" aria-labelledby="certificate-panel-title">
                    <h2 id="certificate-panel-title" className="courseOverviewPage__visuallyHidden">
                      Certificate
                    </h2>
                    <p className="courseOverviewPage__certificateMessage">Certificate awarded upon completion.</p>
                  </section>
                ) : null}

                {activeTab === 'reviews' ? (
                  <LockedCoursePanel
                    headingId="course-overview-reviews-heading"
                    title="Reviews"
                    description="Ratings and reviews from participants will show here after the first enrolled cohort completes the program."
                    icon={HiChatBubbleLeftRight}
                  />
                ) : null}
              </div>
            </div>
          </div>

          <aside className="courseOverviewPage__sidebar" aria-label="Course summary and weekly content">
            <div className="courseOverviewPage__sidebarCard">
              <div className="courseOverviewPage__sidebarHeader">
                <h2 className="courseOverviewPage__sidebarTitle">{content.title}</h2>
                <p className="courseOverviewPage__sidebarDescription">{sidebarBrief}</p>
                <Link to={tutorProfileHref} className="courseOverviewPage__tutorButton">
                  View Counsellor Profile
                </Link>
              </div>

              <div className="courseOverviewPage__sidebarSection">
                <div className="courseOverviewPage__sidebarSectionHeader">
                  <h3 className="courseOverviewPage__sidebarSectionTitle">Course content</h3>
                  <span className="courseOverviewPage__sidebarSectionMeta">Weekly</span>
                </div>

                <div className="courseOverviewPage__accordion" role="list">
                  {weeklyContent.map((item, index) => {
                    const isOpen = openWeek === index
                    const panelId = `course-week-panel-${content.slug}-${index}`
                    const buttonId = `course-week-trigger-${content.slug}-${index}`

                    return (
                      <article
                        key={item.week}
                        className={`courseOverviewPage__accordionItem${isOpen ? ' courseOverviewPage__accordionItem--open' : ''}`}
                        role="listitem"
                      >
                        <button
                          id={buttonId}
                          type="button"
                          className="courseOverviewPage__accordionButton"
                          onClick={() => setOpenWeek(isOpen ? null : index)}
                          aria-expanded={isOpen}
                          aria-controls={panelId}
                        >
                          <span className="courseOverviewPage__accordionButtonText">
                            <span className="courseOverviewPage__accordionWeek">{item.week}</span>
                            <span className="courseOverviewPage__accordionTitle">{item.title}</span>
                          </span>
                          <ChevronIcon open={isOpen} />
                        </button>

                        <div
                          id={panelId}
                          role="region"
                          aria-labelledby={buttonId}
                          hidden={!isOpen}
                          className={isOpen ? 'courseOverviewPage__accordionBody' : undefined}
                        >
                          {isOpen ? <p>{item.description}</p> : null}
                        </div>
                      </article>
                    )
                  })}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
