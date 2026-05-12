import { Link, Navigate, useParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { HiCheckCircle, HiOutlineHeart } from 'react-icons/hi2'
import SEOHead from '../components/seo/SEOHead'
import { counsellingServicesBySlug } from '../constants/counsellingServices'
import './CounsellingServicePage.css'

const debriefMosaicContent = [
  {
    type: 'text',
    title: 'Why This Matters',
    body: 'Unprocessed grief can quietly affect your emotions, relationships, and daily functioning. Taking time to process what you have been through helps you regain balance, build emotional resilience, and move forward with greater clarity and stability.',
  },
  { type: 'image' },
  {
    type: 'text',
    title: 'What You May Be Experiencing',
    body: 'You may be feeling deep sadness, confusion, emotional numbness, or being overwhelmed by constant thoughts and memories. At times, it can feel difficult to cope, stay present, or understand your own emotions.',
  },
  { type: 'image' },
  {
    type: 'text',
    title: 'Who This Service Supports',
    body: 'This service is for anyone experiencing loss, emotional pain, or a challenging life transition. If you are finding it hard to process your feelings or move forward, this space offers support and understanding.',
  },
  { type: 'image' },
] as const

const debriefProgramCards = {
  highlights: {
    title: 'Program Highlights',
    rows: [
      { label: 'Duration', value: '20 hrs' },
      { label: 'Session Length', value: '2 hours per week' },
      { label: 'Location', value: 'Online or Physical Sessions' },
      { label: 'Certificate', value: 'Awarded upon completion' },
      { label: 'Individual Counselling', value: 'Ksh 40,000' },
      { label: 'Group Counselling', value: 'Ksh 50,000' },
    ],
  },
  gains: {
    title: "What You'll Gain",
    items: [
      'Emotional healing and a safe space to process your grief with compassion.',
      'Better understanding and acceptance of your emotions and experiences.',
      'Practical ways to cope with emotional overwhelm in daily life.',
      'A sense of stability, grounding, and emotional balance over time.',
      'Gradual restoration of hope, clarity, and inner peace.',
    ],
  },
  support: {
    title: 'How We Help',
    items: [
      'Provide a safe, compassionate, and non-judgmental space to express yourself.',
      'Offer guided conversations to help you process emotions at your own pace.',
      'Help you make sense of your thoughts and experiences in a structured way.',
      'Support emotional healing through active listening and gentle guidance.',
      'Equip you with practical coping strategies for daily emotional balance.',
      'Help you gradually regain clarity, stability, and inner calm.',
    ],
  },
} as const

const prenatalProgramCards = {
  highlights: {
    title: 'Program Highlights',
    rows: [
      { label: 'Duration', value: '20 hrs' },
      { label: 'Session Length', value: '2 hours per week' },
      { label: 'Location', value: 'Online or Physical Sessions' },
      { label: 'Certificate', value: 'Awarded upon completion' },
      { label: 'Individual Counselling', value: 'Ksh 40,000' },
      { label: 'Group Counselling', value: 'Ksh 50,000' },
    ],
  },
  gains: {
    title: "What You'll Gain",
    items: [
      'Greater emotional balance and calm throughout your pregnancy',
      'Increased confidence in preparing for motherhood',
      'Practical ways to manage stress, anxiety, and emotional changes',
      'A stronger sense of connection to yourself and your journey',
      'Improved readiness for the transition into motherhood',
    ],
  },
  support: {
    title: 'How We Help',
    items: [
      'Provide a safe, nurturing space to express your thoughts and emotions',
      'Support you in managing pregnancy-related stress and uncertainty',
      'Help you understand and navigate emotional and lifestyle changes',
      'Offer gentle guidance to build confidence and emotional resilience',
      'Encourage reflection and preparation for motherhood at your own pace',
      'Equip you with simple, practical tools for everyday wellbeing',
    ],
  },
} as const

const debriefBookingSteps: ReadonlyArray<{
  title: string
  description: string
  image?: string
}> = [
  {
    title: '1. Reserve Your Slot',
    description: 'Choose a date and time that fits your schedule and secure your session in just a few steps.',
    image: 'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/bookslot.avif',
  },
  {
    title: '2. Connect & Talk',
    description: 'Meet your counsellor in a safe and private space, either through a secure online session link or in person, depending on your preference.',
    image: 'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/debrief.jpg',
  },
  {
    title: '3. Begin to Heal',
    description: 'Begin your healing journey with supportive guidance, emotional clarity, and simple, practical steps to help you move forward.',
  },
] as const

const prenatalBookingSteps: ReadonlyArray<{
  title: string
  description: string
  image?: string
}> = [
  {
    title: '1. Reserve Your Slot',
    description: 'Choose a date and time that feels right for you and secure your prenatal wellbeing session in a few easy steps.',
    image: 'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/bookslot.avif',
  },
  {
    title: '2. Connect & Reflect',
    description: 'Meet your counsellor in a safe and supportive space to talk through your emotions, concerns, and expectations during pregnancy.',
    image: 'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/whyprenatal.webp',
  },
  {
    title: '3. Prepare with Confidence',
    description: 'Build practical emotional tools, clarity, and calm so you can move through pregnancy and motherhood with greater confidence.',
    image: 'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/prenatal%20nursery-Photoroom.webp',
  },
] as const

const motherhoodBookingSteps: ReadonlyArray<{
  title: string
  description: string
  image?: string
}> = [
  {
    title: '1. Reserve Your Slot',
    description:
      'Choose a suitable date and time, then book your motherhood support session in a few simple steps.',
    image: 'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/bookslot.avif',
  },
  {
    title: '2. Attend Guided Sessions',
    description:
      'Join structured weekly sessions focused on emotional support, newborn care, and practical wellbeing skills for daily motherhood.',
    image: 'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/newmother_compressed.webp',
  },
  {
    title: '3. Grow with Ongoing Support',
    description:
      'Apply practical tools between sessions, strengthen confidence, and continue your motherhood journey with consistent guidance.',
    image: 'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/newborn.jpeg',
  },
] as const

const prenatalIntro = {
  title: 'Why Prenatal Wellbeing Matters',
  intro:
    'Pregnancy is not only a physical journey but also an emotional and mental one. As your body, routine, and relationships change, it is natural to experience a mix of excitement, uncertainty, and emotional shifts. Taking time to care for your wellbeing during this period helps you feel more grounded, supported, and confident as you prepare for motherhood.',
  introMobile:
    'Pregnancy brings physical, emotional, and mental changes. Caring for your wellbeing helps you feel grounded, supported, and more confident for motherhood.',
  leadIn: 'Focusing on your emotional wellbeing during pregnancy can help you:',
  points: [
    'Better manage stress, anxiety, and emotional changes',
    'Feel more confident and prepared for motherhood',
    'Adjust to lifestyle and relationship changes more smoothly',
    'Build a calm, supportive foundation for yourself and your baby',
  ],
  outro:
    'Prioritising your wellbeing during this time allows you to move through your pregnancy with greater ease, clarity, and a stronger sense of emotional readiness for the journey ahead.',
  outroMobile:
    'Prioritising wellbeing helps you move through pregnancy with more calm, clarity, and emotional readiness.',
  image: 'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/whyprenatal.webp',
} as const

const premaritalWhyThisMatters = {
  label: 'WHY THIS MATTERS',
  title: 'Why This Matters',
  intro:
    'Relationships can bring love, companionship, and growth, but they can also come with misunderstandings, emotional distance, stress, and conflict. Without healthy communication and support, small issues can gradually affect trust, connection, and emotional wellbeing. Counselling provides a safe and supportive space for couples to better understand each other, strengthen communication, and navigate challenges together in a healthier way.',
  points: [
    'Improve communication and emotional understanding',
    'Build trust, connection, and healthy conflict resolution skills',
    'Prepare for long-term commitment and shared responsibilities',
    'Strengthen emotional intimacy and relationship stability',
  ],
  image: 'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/couple%20therapy-2e45fd9b-3560-48c0-9c8b-3e79555d6e31.jpg',
  imageAlt: 'Couple receiving premarital counselling support',
} as const

const premaritalRelationshipQuote = {
  text:
    'Every relationship goes through seasons of growth, adjustment, and challenge. Whether you are preparing for marriage, newly married, or working through ongoing difficulties, this counselling space is designed to help couples reconnect, communicate openly, and grow together with greater understanding and support.',
} as const

const premaritalWhoThisIsFor = {
  intro:
    'This counselling service is designed for couples at different stages of their relationship journey who are seeking guidance, healthier communication, emotional support, and stronger connection. Whether you are preparing for marriage, adjusting to married life, navigating conflict, or working through relationship challenges together, this space provides support tailored to your unique relationship needs.',
  items: [
    {
      title: 'Engaged Couples',
      description:
        'Couples preparing for marriage who want to build a strong foundation through healthy communication, shared expectations, and emotional understanding.',
    },
    {
      title: 'Newly Married Couples',
      description:
        'Partners adjusting to married life, shared responsibilities, lifestyle changes, and building deeper connection during the early stages of marriage.',
    },
    {
      title: 'Couples Facing Relationship Challenges',
      description:
        'Couples experiencing conflict, communication difficulties, emotional distance, or recurring misunderstandings within the relationship.',
    },
    {
      title: 'Couples Navigating Life Transitions',
      description:
        'Partners adjusting to major life changes such as parenthood, financial pressure, relocation, career demands, or family-related stress.',
    },
  ],
} as const

const premaritalReasonsSection = {
  title: 'Common Reasons Couples Seek Counselling',
  items: [
    {
      title: 'Communication Challenges',
      body: 'Difficulty expressing feelings, frequent misunderstandings, or feeling unheard within the relationship.',
    },
    {
      title: 'Conflict & Recurring Arguments',
      body: 'Ongoing disagreements, tension, or unresolved issues that affect connection and peace within the relationship.',
    },
    {
      title: 'Emotional Distance',
      body: 'Feeling disconnected, emotionally distant, or struggling to maintain closeness and intimacy.',
    },
    {
      title: 'Premarital Preparation',
      body: 'Preparing for marriage through conversations around expectations, values, finances, and future goals.',
    },
    {
      title: 'Life Transitions & Stress',
      body: 'Navigating major changes such as marriage, parenthood, relocation, financial pressure, or career stress together.',
    },
    {
      title: 'Trust & Relationship Healing',
      body: 'Working through trust issues, emotional hurt, or rebuilding connection after difficult experiences.',
    },
  ],
} as const

const premaritalProgramCards = {
  highlights: {
    title: 'Program Highlights',
    rows: [
      { label: 'Session Format', value: 'Individual Couple Sessions or Group Sessions' },
      { label: 'Location', value: 'Online or Physical Sessions' },
      { label: 'Session Duration', value: '1.5 – 2 Hours' },
      { label: 'Focus Areas', value: 'Communication, emotional wellbeing, trust, and relationship growth' },
      { label: 'Certification', value: 'Available for premarital completion programs' },
    ],
  },
  gains: {
    title: "What You'll Gain",
    items: [
      'Healthier communication and listening skills',
      'Greater emotional understanding and connection',
      'Practical tools for managing conflict and relationship stress',
      'Improved trust, respect, and emotional support',
      'Better preparation for marriage and shared responsibilities',
      'A stronger and healthier relationship foundation',
    ],
  },
  support: {
    title: 'How We Help',
    items: [
      'Create a safe and non-judgmental space for open conversations',
      'Guide couples through healthy communication and conflict resolution',
      'Support emotional healing, trust-building, and relationship growth',
      'Help couples navigate stress, expectations, and life transitions together',
      'Provide practical relationship tools that strengthen long-term connection',
    ],
  },
} as const

const premaritalCTA = {
  image: 'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/premaritalcta.png',
  heading: 'Your Relationship Deserves Care & Support',
  body: 'Taking the step to strengthen your relationship is a sign of commitment, growth, and intentional love. Whether you are preparing for marriage or working through challenges together, support is available to help you build a healthier and more connected relationship.',
  subtitle: 'Available for online or physical sessions in a safe and supportive environment.',
}

const prenatalJourney = {
  title: 'A Space Just for You and Your Journey',
  body: [
    'Pregnancy is a deeply personal experience, and every journey into motherhood is unique. Whether you are a first-time mum navigating new emotions and uncertainties, or preparing to welcome another child while balancing life\'s demands, this space is designed with you in mind.',
    'Through gentle guidance and supportive conversations, you are given the time, care, and understanding needed to reflect, adjust, and prepare for motherhood with confidence and emotional clarity.',
  ],
  subTitle: 'Who This Program Is For',
  leadIn: 'This program is designed for:',
  points: [
    'First-time mothers adjusting to the emotional and physical changes of pregnancy',
    'Expectant mothers experiencing stress, anxiety, or uncertainty',
    'Women seeking emotional support, clarity, and confidence during pregnancy',
    'Partners who wish to be involved and supportive during the journey',
  ],
  leftImage: 'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/prenatal%20nursery-Photoroom.webp',
  rightImage: 'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/whyprenatal.webp',
} as const

const motherhoodSupportSection = {
  first: {
    title: 'Why This Matters',
    body:
      'The transition into motherhood can bring both joy and unexpected emotional, mental, and physical challenges. Many first-time mothers experience feelings of uncertainty, exhaustion, anxiety, or pressure as they adjust to caring for themselves and their baby. Having the right support during this stage helps mothers feel more emotionally prepared, confident, and supported throughout pregnancy and early motherhood.',
    image: 'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/whyitmaters(1).jpg',
    imageAlt: 'Mother holding her baby during early motherhood support',
  },
  second: {
    title: 'This program is designed to help first-time mothers:',
    points: [
      'Build emotional resilience and confidence',
      'Develop practical newborn care skills',
      'Improve maternal health and wellbeing awareness',
      'Strengthen mother-baby bonding',
      'Manage stress and postpartum challenges',
      'Build healthier support systems and daily routines',
    ],
    image: 'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/objectivess.jpeg',
    imageAlt: 'Mother and child bonding in a calm home setting',
  },
} as const

const motherhoodProgramCards = {
  highlights: {
    title: 'Program Highlights',
    intro:
      'This program is designed to provide structured, consistent support throughout your motherhood journey, combining emotional guidance with practical caregiving skills in a safe and supportive environment.',
    rows: [
      { label: 'Duration', value: '20 weeks' },
      { label: 'Session Length', value: '2 hours per week' },
      { label: 'Location', value: 'Online or Physical Sessions' },
      { label: 'Certification', value: 'Awarded upon completion' },
      { label: 'Format', value: 'Individual or Group Counselling Options' },
      { label: 'Focus', value: 'Emotional wellbeing, newborn care, and maternal support' },
    ],
  },
  gains: {
    title: "What You'll Gain",
    intro:
      'This program helps you transition into motherhood with confidence, emotional strength, and practical knowledge, ensuring you feel supported every step of the way.',
    items: [
      'Greater emotional resilience and stability during pregnancy and postpartum',
      "Confidence in newborn care and understanding your baby's needs",
      'Stronger mother-baby bonding and emotional connection',
      'Improved awareness of your physical and mental wellbeing',
      'Practical tools to manage stress, anxiety, and daily motherhood challenges',
      'A more supported, balanced, and positive motherhood experience',
    ],
  },
  support: {
    title: 'How We Help',
    intro:
      'We provide a safe, supportive, and structured space where you can learn, reflect, and grow through your motherhood journey. Our approach is gentle, practical, and focused on your individual needs.',
    items: [
      'Offer guided emotional and psychological support throughout pregnancy and early motherhood',
      'Provide practical training on newborn care and daily routines',
      'Help you understand and manage emotional changes with confidence',
      'Encourage healthy bonding between you and your baby',
      'Support you in building strong personal and family support systems',
      'Create a non-judgmental space where you can openly share and grow',
    ],
  },
} as const

export default function CounsellingServicePage() {
  const { slug } = useParams<{ slug: string }>()
  if (slug === 'career-workplace-support') {
    return <Navigate to="/counselling-services/resilient-motherhood-program" replace />
  }
  const content = slug ? counsellingServicesBySlug[slug] : undefined
  const introRef = useRef<HTMLElement | null>(null)
  const prenatalJourneyRef = useRef<HTMLElement | null>(null)
  const motherhoodSupportRef = useRef<HTMLElement | null>(null)
  const mosaicRef = useRef<HTMLElement | null>(null)
  const programCardsRef = useRef<HTMLElement | null>(null)
  const bookingRef = useRef<HTMLElement | null>(null)
  const relationshipQuoteRef = useRef<HTMLElement | null>(null)
  const premaritalAccordionRef = useRef<HTMLElement | null>(null)
  const premaritalProgramCardsRef = useRef<HTMLElement | null>(null)
  const premaritalCtaRef = useRef<HTMLElement | null>(null)
  const [isIntroVisible, setIsIntroVisible] = useState(false)
  const [isPrenatalJourneyVisible, setIsPrenatalJourneyVisible] = useState(false)
  const [isMotherhoodSupportVisible, setIsMotherhoodSupportVisible] = useState(false)
  const [isMosaicVisible, setIsMosaicVisible] = useState(false)
  const [isProgramCardsVisible, setIsProgramCardsVisible] = useState(false)
  const [isBookingVisible, setIsBookingVisible] = useState(false)
  const [isRelationshipQuoteVisible, setIsRelationshipQuoteVisible] = useState(false)
  const [premaritalAccordionOpen, setPremaritalAccordionOpen] = useState<number | null>(0)

  const [isPremaritalAccordionVisible, setIsPremaritalAccordionVisible] = useState(false)
  const [isPremaritalProgramCardsVisible, setIsPremaritalProgramCardsVisible] = useState(false)
  const [isPremaritalCtaVisible, setIsPremaritalCtaVisible] = useState(false)
  useEffect(() => {
    const introEl = introRef.current
    const prenatalJourneyEl = prenatalJourneyRef.current
    const motherhoodSupportEl = motherhoodSupportRef.current
    const mosaicEl = mosaicRef.current
    const programCardsEl = programCardsRef.current
    const bookingEl = bookingRef.current
    const relationshipQuoteEl = relationshipQuoteRef.current
    const premaritalAccordionEl = premaritalAccordionRef.current
    const premaritalProgramCardsEl = premaritalProgramCardsRef.current
    const premaritalCtaEl = premaritalCtaRef.current
    if (
      !introEl &&
      !prenatalJourneyEl &&
      !motherhoodSupportEl &&
      !mosaicEl &&
      !programCardsEl &&
      !bookingEl &&
      !relationshipQuoteEl &&
      !premaritalAccordionEl &&
      !premaritalProgramCardsEl &&
      !premaritalCtaEl
    )
      return

    const overlapsViewport = (el: HTMLElement) => {
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight || document.documentElement.clientHeight
      return r.bottom > 1 && r.top < vh - 1
    }

    /** IntersectionObserver can miss the first paint (already in view). Sync from layout after observe. */
    const syncRevealFromLayout = () => {
      if (introEl && overlapsViewport(introEl)) setIsIntroVisible(true)
      if (prenatalJourneyEl && overlapsViewport(prenatalJourneyEl)) setIsPrenatalJourneyVisible(true)
      if (motherhoodSupportEl && overlapsViewport(motherhoodSupportEl)) setIsMotherhoodSupportVisible(true)
      if (mosaicEl && overlapsViewport(mosaicEl)) setIsMosaicVisible(true)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === prenatalJourneyEl) {
            setIsPrenatalJourneyVisible(entry.isIntersecting)
            return
          }
          if (entry.target === programCardsEl) {
            setIsProgramCardsVisible(entry.isIntersecting)
            return
          }
          if (entry.target === bookingEl) {
            setIsBookingVisible(entry.isIntersecting)
            return
          }
          if (entry.target === relationshipQuoteEl) {
            setIsRelationshipQuoteVisible(entry.isIntersecting)
            return
          }
          if (entry.target === premaritalAccordionEl) {
            setIsPremaritalAccordionVisible(entry.isIntersecting)
            return
          }
          if (entry.target === premaritalProgramCardsEl) {
            setIsPremaritalProgramCardsVisible(entry.isIntersecting)
            return
          }
          if (entry.target === premaritalCtaEl) {
            setIsPremaritalCtaVisible(entry.isIntersecting)
            return
          }
          if (entry.target === motherhoodSupportEl) {
            setIsMotherhoodSupportVisible(entry.isIntersecting)
            return
          }
          if (!entry.isIntersecting) return
          if (entry.target === introEl) setIsIntroVisible(true)
          if (entry.target === mosaicEl) setIsMosaicVisible(true)
          observer.unobserve(entry.target)
        })
      },
      {
        root: null,
        /* Expand root so sections just under the hero register reliably */
        rootMargin: '180px 0px 32% 0px',
        threshold: [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1],
      },
    )

    if (introEl) observer.observe(introEl)
    if (prenatalJourneyEl) observer.observe(prenatalJourneyEl)
    if (motherhoodSupportEl) observer.observe(motherhoodSupportEl)
    if (mosaicEl) observer.observe(mosaicEl)
    if (programCardsEl) observer.observe(programCardsEl)
    if (bookingEl) observer.observe(bookingEl)
    if (relationshipQuoteEl) observer.observe(relationshipQuoteEl)
    if (premaritalAccordionEl) observer.observe(premaritalAccordionEl)
    if (premaritalProgramCardsEl) observer.observe(premaritalProgramCardsEl)
    if (premaritalCtaEl) observer.observe(premaritalCtaEl)

    requestAnimationFrame(() => {
      requestAnimationFrame(syncRevealFromLayout)
    })

    return () => {
      if (introEl) observer.unobserve(introEl)
      if (prenatalJourneyEl) observer.unobserve(prenatalJourneyEl)
      if (motherhoodSupportEl) observer.unobserve(motherhoodSupportEl)
      if (mosaicEl) observer.unobserve(mosaicEl)
      if (programCardsEl) observer.unobserve(programCardsEl)
      if (bookingEl) observer.unobserve(bookingEl)
      if (relationshipQuoteEl) observer.unobserve(relationshipQuoteEl)
      if (premaritalAccordionEl) observer.unobserve(premaritalAccordionEl)
      if (premaritalProgramCardsEl) observer.unobserve(premaritalProgramCardsEl)
      if (premaritalCtaEl) observer.unobserve(premaritalCtaEl)
      observer.disconnect()
    }
  }, [slug])

  if (!content) {
    return <Navigate to="/" replace />
  }
  const heroDescription = content.pageDescription ?? content.description
  const isDebriefService =
    content.id === 'debrief-grief-support' ||
    content.slug === 'debrief-grief-loss-support' ||
    content.slug.includes('debrief')
  const isPremaritalService =
    content.id === 'premarital-counselling' ||
    content.slug === 'premarital-counselling' ||
    content.title.toLowerCase().includes('premarital')
  const isPrenatalService =
    content.id === 'prenatal-wellbeing-support' ||
    content.slug === 'prenatal-wellbeing-support' ||
    content.slug.includes('prenatal')
  const isMotherhoodService =
    content.id === 'resilient-motherhood-program' ||
    content.slug === 'resilient-motherhood-program' ||
    content.title.toLowerCase().includes('motherhood')
  const pageImage = content.pageImage ?? content.image
  const shareImage = content.shareImage ?? content.pageImage ?? content.image
  const heroBackgroundImage = isPremaritalService ? content.image : pageImage
  const pageTitle = isMotherhoodService ? 'Resilient Motherhood Program' : content.title
  const pageDescription = isMotherhoodService
    ? 'Guided motherhood support for first-time mothers to build emotional resilience, newborn care confidence, and wellbeing during pregnancy and early motherhood.'
    : heroDescription
  const ogImageAlt = isMotherhoodService
    ? 'Resilient Motherhood Program support for first-time mothers'
    : content.imageAlt
  const pageKeywords = isPrenatalService
    ? 'prenatal wellbeing support Kenya, pregnancy counselling Kenya, maternal mental health support, emotional support during pregnancy, pregnancy stress counselling, expectant mothers support'
    : isDebriefService
      ? 'grief counselling Kenya, loss support counselling, bereavement therapy Kenya, emotional healing support, debrief grief and loss, trauma and grief counselling'
      : isMotherhoodService
        ? 'resilient motherhood program Kenya, first-time mothers support, early motherhood counselling, maternal emotional resilience, motherhood confidence support'
        : isPremaritalService
          ? 'premarital counselling Kenya, marital counselling Kenya, couples counselling, marriage preparation, relationship counselling Kenya, Swaro Institute'
      : undefined
  const debriefMosaicImage = 'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/shot.jpg'
  const debriefMosaicImageMiddle = 'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/sliideee.webp'
  const debriefMosaicImageLast = 'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/consoling.jpeg'
  const mosaicImages = isDebriefService
    ? [debriefMosaicImage, debriefMosaicImageMiddle, debriefMosaicImageLast]
    : [content.introSectionImage ?? pageImage, pageImage, content.introSectionImage ?? pageImage]
  

  return (
    <>
      <SEOHead
        title={pageTitle}
        description={pageDescription}
        path={`/counselling-services/${content.slug}`}
        schemaPageType="WebPage"
        image={shareImage}
        ogImageAlt={ogImageAlt}
        keywords={pageKeywords}
      />
      <section className={`counsellingServicePage${isPrenatalService ? ' counsellingServicePage--prenatal' : ''}${isMotherhoodService ? ' counsellingServicePage--motherhood' : ''}`}>
        <div
          className="counsellingServicePage__hero"
          style={{ backgroundImage: `linear-gradient(rgba(15, 19, 18, 0.55), rgba(15, 19, 18, 0.55)), url(${heroBackgroundImage})` }}
          role="img"
          aria-label={content.imageAlt}
        >
          <div className="counsellingServicePage__inner">
            <div className="counsellingServicePage__label">Counselling Service</div>
            <h1 className="counsellingServicePage__heading">{content.title}</h1>
            <p className="counsellingServicePage__summary">
              {isPrenatalService ? (
                <>
                  <span className="counsellingServicePage__summaryDesktop">{heroDescription}</span>
                  <span className="counsellingServicePage__summaryMobile">
                    Pregnancy brings many changes. You do not have to navigate them alone; we are here to support
                    you at every step.
                  </span>
                </>
              ) : isMotherhoodService ? (
                <>
                  <span className="counsellingServicePage__summarySubtitle">Supporting First-Time Mothers</span>
                  <span className="counsellingServicePage__summaryDesktop">{heroDescription}</span>
                  <span className="counsellingServicePage__summaryMobile">
                    Guided support to help first-time mothers build resilience, confidence, and wellbeing.
                  </span>
                </>
              ) : (
                heroDescription
              )}
            </p>
            <Link to={`/book-session?service=${encodeURIComponent(content.slug)}`} className="counsellingServicePage__bookButton">
              Book Session
            </Link>
          </div>
        </div>

        {isPremaritalService ? (
          <section
            ref={introRef}
            className={`counsellingServicePage__intro counsellingServicePage__intro--premarital${isIntroVisible ? ' counsellingServicePage__intro--visible' : ''}`}
            aria-label="Why this matters for premarital counselling"
          >
            <div className="counsellingServicePage__introInner counsellingServicePage__introInner--premarital">
              <img
                className="counsellingServicePage__introImage counsellingServicePage__introImage--premarital"
                src={premaritalWhyThisMatters.image}
                alt={premaritalWhyThisMatters.imageAlt}
                loading="lazy"
              />

              <div className="counsellingServicePage__introText counsellingServicePage__introText--premarital">
                <p className="counsellingServicePage__introEyebrow">{premaritalWhyThisMatters.label}</p>
                <h2 className="counsellingServicePage__introHeading">{premaritalWhyThisMatters.title}</h2>
                <p className="counsellingServicePage__introParagraph">{premaritalWhyThisMatters.intro}</p>
                <ul className="counsellingServicePage__introBenefits" role="list">
                  {premaritalWhyThisMatters.points.map((point) => (
                    <li key={point} className="counsellingServicePage__introBenefitItem">
                      <HiCheckCircle className="counsellingServicePage__introBenefitIcon" aria-hidden />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ) : null}

        {isPremaritalService ? (
          <section
            ref={relationshipQuoteRef}
            className={`counsellingServicePage__relationshipQuote${isRelationshipQuoteVisible ? ' counsellingServicePage__relationshipQuote--visible' : ''}`}
            aria-label="Relationship support quote"
          >
            <div className="counsellingServicePage__relationshipQuoteWave counsellingServicePage__relationshipQuoteWave--top" aria-hidden />
            <div className="counsellingServicePage__relationshipQuoteWave counsellingServicePage__relationshipQuoteWave--bottom" aria-hidden />
            <div className="counsellingServicePage__relationshipQuoteInner">
              <p className="counsellingServicePage__relationshipQuoteText">“{premaritalRelationshipQuote.text}”</p>
            </div>
          </section>
        ) : null}
        {isPremaritalService ? (
          <section
            ref={premaritalAccordionRef}
            className={`counsellingServicePage__whoThisIsFor${isPremaritalAccordionVisible ? ' counsellingServicePage__whoThisIsFor--visible' : ''}`}
            aria-label="Who this service is for"
          >
            <div className="counsellingServicePage__whoThisIsForInner">
              <div className="counsellingServicePage__whoThisIsForText">
                <h2 className="counsellingServicePage__whoThisIsForHeading">Who This Is For</h2>
                <p className="counsellingServicePage__whoThisIsForIntro">{premaritalWhoThisIsFor.intro}</p>
              </div>

              <div className="counsellingServicePage__accordionContainer">
                {premaritalWhoThisIsFor.items.map((item, index) => (
                  <div
                    key={index}
                    className={`counsellingServicePage__accordionItem${premaritalAccordionOpen === index ? ' counsellingServicePage__accordionItem--open' : ''}`}
                  >
                    <button
                      className="counsellingServicePage__accordionButton"
                      onClick={() => setPremaritalAccordionOpen(premaritalAccordionOpen === index ? null : index)}
                      aria-expanded={premaritalAccordionOpen === index}
                    >
                      <span className="counsellingServicePage__accordionIcon">+</span>
                      <span className="counsellingServicePage__accordionTitle">{item.title}</span>
                    </button>
                    {premaritalAccordionOpen === index && (
                      <div className="counsellingServicePage__accordionContent">
                        <p>{item.description}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}
        {isPremaritalService ? (
          <section
            className="counsellingServicePage__premaritalReasons"
            aria-label="Common reasons couples seek counselling"
          >
            <video
              className="counsellingServicePage__premaritalReasonsVideo"
              src="https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/13885768_3840_2160_60fps(1)(2).mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
            <div className="counsellingServicePage__premaritalReasonsOverlay" aria-hidden />
            <div className="counsellingServicePage__premaritalReasonsContent">
              <h2 className="counsellingServicePage__premaritalReasonsHeading">{premaritalReasonsSection.title}</h2>
              <div className="counsellingServicePage__premaritalReasonsGrid">
                {premaritalReasonsSection.items.map((item) => (
                  <article key={item.title} className="counsellingServicePage__premaritalReasonCard">
                    <HiOutlineHeart className="counsellingServicePage__premaritalReasonIcon" aria-hidden />
                    <h3 className="counsellingServicePage__premaritalReasonTitle">{item.title}</h3>
                    <p className="counsellingServicePage__premaritalReasonBody">{item.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : null}
        {isPremaritalService ? (
          <section
            ref={premaritalProgramCardsRef}
            className={`counsellingServicePage__programCards counsellingServicePage__programCards--premarital${isPremaritalProgramCardsVisible ? ' counsellingServicePage__programCards--premarital--visible' : ''}`}
            aria-label="Premarital counselling program details"
          >
            <div className="counsellingServicePage__programCardsGrid">
              {/* Highlights Card */}
              <article className="counsellingServicePage__programCard">
                <h3 className="counsellingServicePage__programCardTitle">{premaritalProgramCards.highlights.title}</h3>
                <ul className="counsellingServicePage__programRows" role="list">
                  {premaritalProgramCards.highlights.rows.map((row) => (
                    <li key={row.label} className="counsellingServicePage__programRow">
                      <strong>{row.label}:</strong> {row.value}
                    </li>
                  ))}
                </ul>
              </article>

              {/* Gains Card */}
              <article className="counsellingServicePage__programCard">
                <h3 className="counsellingServicePage__programCardTitle">{premaritalProgramCards.gains.title}</h3>
                <ul className="counsellingServicePage__programList">
                  {premaritalProgramCards.gains.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>

              {/* Support Card */}
              <article className="counsellingServicePage__programCard">
                <h3 className="counsellingServicePage__programCardTitle">{premaritalProgramCards.support.title}</h3>
                <ul className="counsellingServicePage__programList">
                  {premaritalProgramCards.support.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </div>
          </section>
        ) : null}
        {isPremaritalService ? (
          <section
            ref={premaritalCtaRef}
            className={`counsellingServicePage__premaritalCta${isPremaritalCtaVisible ? ' counsellingServicePage__premaritalCta--visible' : ''}`}
            aria-label="Book premarital counselling"
          >
            <div className="counsellingServicePage__premaritalCtaMedia" aria-hidden>
              <img
                className="counsellingServicePage__premaritalCtaImage"
                src={premaritalCTA.image}
                alt=""
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="counsellingServicePage__premaritalCtaScrim" aria-hidden />
            <div className="counsellingServicePage__premaritalCtaInner">
              <h2 className="counsellingServicePage__premaritalCtaHeading">{premaritalCTA.heading}</h2>
              <p className="counsellingServicePage__premaritalCtaBody">{premaritalCTA.body}</p>
              <p className="counsellingServicePage__premaritalCtaSubtitle">{premaritalCTA.subtitle}</p>
              <Link
                to={`/book-session?service=${encodeURIComponent(content.slug)}`}
                className="counsellingServicePage__premaritalCtaButton"
              >
                Book Now
              </Link>
            </div>
            <div className="counsellingServicePage__premaritalCtaWave" aria-hidden>
              <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="counsellingServicePage__premaritalCtaWaveSvg">
                <path
                  fill="currentColor"
                  d="M0,32 C240,8 480,40 720,24 C960,8 1200,40 1440,16 L1440,48 L0,48 Z"
                />
              </svg>
            </div>
          </section>
        ) : null}
        {isPrenatalService ? (
          <section
            ref={introRef}
            className={`counsellingServicePage__intro${isIntroVisible ? ' counsellingServicePage__intro--visible' : ''}`}
            aria-label="Prenatal wellbeing overview"
          >
            <div className="counsellingServicePage__introInner">
              <img
                className="counsellingServicePage__introImage"
                src={prenatalIntro.image}
                alt="Expectant mother reflecting calmly by a window"
                loading="lazy"
              />

              <div className="counsellingServicePage__introText">
                <h2 className="counsellingServicePage__introHeading">{prenatalIntro.title}</h2>
                <p className="counsellingServicePage__introParagraph counsellingServicePage__introParagraph--desktop">
                  {prenatalIntro.intro}
                </p>
                <p className="counsellingServicePage__introParagraph counsellingServicePage__introParagraph--mobile">
                  {prenatalIntro.introMobile}
                </p>
                <p className="counsellingServicePage__introLead">{prenatalIntro.leadIn}</p>
                <ul className="counsellingServicePage__introBenefits" role="list">
                  {prenatalIntro.points.map((point) => (
                    <li key={point} className="counsellingServicePage__introBenefitItem">
                      <HiCheckCircle className="counsellingServicePage__introBenefitIcon" aria-hidden />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ) : null}

        {isMotherhoodService ? (
          <section
            ref={motherhoodSupportRef}
            className={`counsellingServicePage__motherhoodSupport${isMotherhoodSupportVisible ? ' counsellingServicePage__motherhoodSupport--visible' : ''}`}
            aria-label="Resilient motherhood support overview"
          >
            <div className="counsellingServicePage__motherhoodSupportInner">
              <article className="counsellingServicePage__motherhoodRow">
                <div className="counsellingServicePage__motherhoodTextCard">
                  <h2 className="counsellingServicePage__motherhoodTitle">{motherhoodSupportSection.first.title}</h2>
                  <p className="counsellingServicePage__motherhoodBody">{motherhoodSupportSection.first.body}</p>
                </div>
                <img
                  className="counsellingServicePage__motherhoodImage"
                  src={motherhoodSupportSection.first.image}
                  alt={motherhoodSupportSection.first.imageAlt}
                  loading="lazy"
                />
              </article>

              <article className="counsellingServicePage__motherhoodRow counsellingServicePage__motherhoodRow--reverse">
                <img
                  className="counsellingServicePage__motherhoodImage"
                  src={motherhoodSupportSection.second.image}
                  alt={motherhoodSupportSection.second.imageAlt}
                  loading="lazy"
                />
                <div className="counsellingServicePage__motherhoodTextCard">
                  <h3 className="counsellingServicePage__motherhoodTitle">{motherhoodSupportSection.second.title}</h3>
                  <ul className="counsellingServicePage__motherhoodList" role="list">
                    {motherhoodSupportSection.second.points.map((point) => (
                      <li key={point} className="counsellingServicePage__motherhoodListItem">
                        <HiCheckCircle className="counsellingServicePage__motherhoodListIcon" aria-hidden />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </div>
          </section>
        ) : null}

        {isMotherhoodService ? (
          <section
            ref={programCardsRef}
            className={`counsellingServicePage__programCards counsellingServicePage__programCards--motherhood${isProgramCardsVisible ? ' counsellingServicePage__programCards--visible' : ''}`}
            aria-label="Program cards"
          >
            <div className="counsellingServicePage__programCardsGrid">
              <article className="counsellingServicePage__programCard">
                <h3 className="counsellingServicePage__programCardTitle">{motherhoodProgramCards.highlights.title}</h3>
                <p className="counsellingServicePage__programIntro">{motherhoodProgramCards.highlights.intro}</p>
                <ul className="counsellingServicePage__programRows" role="list">
                  {motherhoodProgramCards.highlights.rows.map((row) => (
                    <li key={row.label} className="counsellingServicePage__programRow">
                      <strong>{row.label}:</strong> {row.value}
                    </li>
                  ))}
                </ul>
              </article>

              <article className="counsellingServicePage__programCard">
                <h3 className="counsellingServicePage__programCardTitle">{motherhoodProgramCards.gains.title}</h3>
                <p className="counsellingServicePage__programIntro">{motherhoodProgramCards.gains.intro}</p>
                <ul className="counsellingServicePage__programList">
                  {motherhoodProgramCards.gains.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>

              <article className="counsellingServicePage__programCard">
                <h3 className="counsellingServicePage__programCardTitle">{motherhoodProgramCards.support.title}</h3>
                <p className="counsellingServicePage__programIntro">{motherhoodProgramCards.support.intro}</p>
                <ul className="counsellingServicePage__programList">
                  {motherhoodProgramCards.support.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </div>
          </section>
        ) : null}

        {isMotherhoodService ? (
          <section
            ref={bookingRef}
            className={`counsellingServicePage__bookingFlow${isBookingVisible ? ' counsellingServicePage__bookingFlow--visible' : ''}`}
            aria-label="How the program works"
          >
            <div className="counsellingServicePage__bookingInner">
              <h3 className="counsellingServicePage__bookingHeading">How It Works</h3>

              <div className="counsellingServicePage__bookingGrid">
                {motherhoodBookingSteps.map((step) => (
                  <article key={step.title} className="counsellingServicePage__bookingCard">
                    <div className="counsellingServicePage__bookingImageWrap">
                      <img
                        className="counsellingServicePage__bookingImage"
                        src={step.image ?? content.image}
                        alt={step.title}
                        loading="lazy"
                      />
                    </div>
                    <h4 className="counsellingServicePage__bookingTitle">{step.title}</h4>
                    <p className="counsellingServicePage__bookingText">{step.description}</p>
                  </article>
                ))}
              </div>

              <div className="counsellingServicePage__bookingActions">
                <Link to={`/book-session?service=${encodeURIComponent(content.slug)}`} className="counsellingServicePage__bookingButton">
                  Book Session
                </Link>
                <a
                  href="https://docs.google.com/document/d/1kQSA2g1ofdej4uYuSxjDpPXZX-YojZp2/edit?usp=sharing&ouid=105813593224161752969&rtpof=true&sd=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="counsellingServicePage__bookingSecondaryButton"
                >
                  Learn More
                </a>
              </div>
            </div>
          </section>
        ) : null}

        {isPrenatalService ? (
          <section
            ref={prenatalJourneyRef}
            className={`counsellingServicePage__prenatalJourney${isPrenatalJourneyVisible ? ' counsellingServicePage__prenatalJourney--visible' : ''}`}
            aria-label="Prenatal support overview"
          >
            <div className="counsellingServicePage__prenatalJourneyFrame">
              <aside className="counsellingServicePage__prenatalJourneySide counsellingServicePage__prenatalJourneySide--left" aria-hidden>
                <img src={prenatalJourney.leftImage} alt="" loading="lazy" />
              </aside>

              <article className="counsellingServicePage__prenatalJourneyContent">
                <h2 className="counsellingServicePage__prenatalJourneyTitle">{prenatalJourney.title}</h2>
                {prenatalJourney.body.map((paragraph) => (
                  <p key={paragraph} className="counsellingServicePage__prenatalJourneyText">
                    {paragraph}
                  </p>
                ))}

                <h3 className="counsellingServicePage__prenatalJourneySubtitle">{prenatalJourney.subTitle}</h3>
                <p className="counsellingServicePage__prenatalJourneyLead">{prenatalJourney.leadIn}</p>
                <ul className="counsellingServicePage__prenatalJourneyList" role="list">
                  {prenatalJourney.points.map((point) => (
                    <li key={point} className="counsellingServicePage__prenatalJourneyListItem">
                      <HiCheckCircle className="counsellingServicePage__prenatalJourneyListIcon" aria-hidden />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>

              <aside className="counsellingServicePage__prenatalJourneySide counsellingServicePage__prenatalJourneySide--right" aria-hidden>
                <img src={prenatalJourney.rightImage} alt="" loading="lazy" />
              </aside>
             </div>
          </section>
        ) : null}

        {isPrenatalService ? (
          <section
            ref={programCardsRef}
            className={`counsellingServicePage__programCards${isProgramCardsVisible ? ' counsellingServicePage__programCards--visible' : ''}`}
            aria-label="Program cards"
          >
            <div className="counsellingServicePage__programCardsGrid">
              <article className="counsellingServicePage__programCard">
                <h3 className="counsellingServicePage__programCardTitle">{prenatalProgramCards.highlights.title}</h3>
                <ul className="counsellingServicePage__programRows" role="list">
                  {prenatalProgramCards.highlights.rows.map((row) => (
                    <li key={row.label} className="counsellingServicePage__programRow">
                      <strong>{row.label}:</strong> {row.value}
                    </li>
                  ))}
                </ul>
              </article>

              <article className="counsellingServicePage__programCard">
                <h3 className="counsellingServicePage__programCardTitle">{prenatalProgramCards.gains.title}</h3>
                <ul className="counsellingServicePage__programList">
                  {prenatalProgramCards.gains.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>

              <article className="counsellingServicePage__programCard">
                <h3 className="counsellingServicePage__programCardTitle">{prenatalProgramCards.support.title}</h3>
                <ul className="counsellingServicePage__programList">
                  {prenatalProgramCards.support.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </div>
          </section>
        ) : null}

        {isPrenatalService ? (
          <section
            ref={bookingRef}
            className={`counsellingServicePage__bookingFlow${isBookingVisible ? ' counsellingServicePage__bookingFlow--visible' : ''}`}
            aria-label="How to book a session"
          >
            <div className="counsellingServicePage__bookingInner">
              <h3 className="counsellingServicePage__bookingHeading">How to Book a Session</h3>

              <div className="counsellingServicePage__bookingGrid">
                {prenatalBookingSteps.map((step) => (
                  <article key={step.title} className="counsellingServicePage__bookingCard">
                    <div className="counsellingServicePage__bookingImageWrap">
                      <img
                        className="counsellingServicePage__bookingImage"
                        src={step.image ?? content.image}
                        alt={step.title}
                        loading="lazy"
                      />
                    </div>
                    <h4 className="counsellingServicePage__bookingTitle">{step.title}</h4>
                    <p className="counsellingServicePage__bookingText">{step.description}</p>
                  </article>
                ))}
              </div>

              <Link to={`/book-session?service=${encodeURIComponent(content.slug)}`} className="counsellingServicePage__bookingButton">
                Book Session
              </Link>
            </div>
          </section>
        ) : null}

        {isDebriefService ? (
          <>
            <section
              ref={mosaicRef}
              className={`counsellingServicePage__mosaic${isMosaicVisible ? ' counsellingServicePage__mosaic--visible' : ''}`}
              aria-label="Grief support highlights"
            >
              <div className="counsellingServicePage__mosaicGrid">
                {debriefMosaicContent.map((item, index) => {
                  if (item.type === 'image') {
                    const imageSrc = mosaicImages[Math.floor(index / 2)] ?? content.image
                    return (
                      <article key={`mosaic-image-${index}`} className="counsellingServicePage__mosaicCell">
                        <img
                          className="counsellingServicePage__mosaicImage"
                          src={imageSrc}
                          alt={content.imageAlt}
                          loading="lazy"
                        />
                      </article>
                    )
                  }

                  return (
                    <article key={item.title} className="counsellingServicePage__mosaicCell counsellingServicePage__mosaicCell--text">
                      <h3 className="counsellingServicePage__mosaicTitle">{item.title}</h3>
                      <p className="counsellingServicePage__mosaicBody">{item.body}</p>
                    </article>
                  )
                })}
              </div>
            </section>

            <section
              ref={programCardsRef}
              className={`counsellingServicePage__programCards${isProgramCardsVisible ? ' counsellingServicePage__programCards--visible' : ''}`}
              aria-label="Program cards"
            >
              <div className="counsellingServicePage__programCardsGrid">
                <article className="counsellingServicePage__programCard">
                  <h3 className="counsellingServicePage__programCardTitle">{debriefProgramCards.highlights.title}</h3>
                  <ul className="counsellingServicePage__programRows" role="list">
                    {debriefProgramCards.highlights.rows.map((row) => (
                      <li key={row.label} className="counsellingServicePage__programRow">
                        <strong>{row.label}:</strong> {row.value}
                      </li>
                    ))}
                  </ul>
                </article>

                <article className="counsellingServicePage__programCard">
                  <h3 className="counsellingServicePage__programCardTitle">{debriefProgramCards.gains.title}</h3>
                  <ul className="counsellingServicePage__programList">
                    {debriefProgramCards.gains.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>

                <article className="counsellingServicePage__programCard">
                  <h3 className="counsellingServicePage__programCardTitle">{debriefProgramCards.support.title}</h3>
                  <ul className="counsellingServicePage__programList">
                    {debriefProgramCards.support.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              </div>
            </section>

            <section
              ref={bookingRef}
              className={`counsellingServicePage__bookingFlow${isBookingVisible ? ' counsellingServicePage__bookingFlow--visible' : ''}`}
              aria-label="How to book a session"
            >
              <div className="counsellingServicePage__bookingInner">
                <h3 className="counsellingServicePage__bookingHeading">How to Book a Session</h3>

                <div className="counsellingServicePage__bookingGrid">
                  {debriefBookingSteps.map((step, index) => {
                    const imageSrc = step.image ?? mosaicImages[index] ?? content.image
                    return (
                      <article key={step.title} className="counsellingServicePage__bookingCard">
                        <div className="counsellingServicePage__bookingImageWrap">
                          <img
                            className="counsellingServicePage__bookingImage"
                            src={imageSrc}
                            alt={step.title}
                            loading="lazy"
                          />
                        </div>
                        <h4 className="counsellingServicePage__bookingTitle">{step.title}</h4>
                        <p className="counsellingServicePage__bookingText">{step.description}</p>
                      </article>
                    )
                  })}
                </div>

                <Link to={`/book-session?service=${encodeURIComponent(content.slug)}`} className="counsellingServicePage__bookingButton">
                  Book Session
                </Link>
              </div>
            </section>
          </>
        ) : null}
      </section>
    </>
  )
}
