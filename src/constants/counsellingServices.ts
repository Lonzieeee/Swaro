export type CounsellingService = {
  id: string
  slug: string
  title: string
  description: string
  pageDescription?: string
  /** Optional Open Graph / Twitter preview image (falls back to pageImage, then image). */
  shareImage?: string
  pageImage?: string
  introSectionBody?: string
  introSectionImage?: string
  introSectionImageAlt?: string
  image: string
  imageAlt: string
}

export const counsellingServices: readonly CounsellingService[] = [
  {
    id: 'debrief-grief-support',
    slug: 'debrief-grief-loss-support',
    title: 'Debrief (Grief & Loss Support)',
    description:
      'A safe space to process grief, loss, and emotional pain. Helps you move through healing, acceptance, and emotional stability at your own pace.',
    pageDescription:
      "Whether you're grieving a loved one, a relationship, or a life change, you don’t have to go through it alone.",
    pageImage: 'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/debrief.jpg',
    introSectionBody:
      'Debrief is a supportive and guided counselling process designed to help you work through difficult experiences, loss, and emotional overwhelm in a safe and compassionate environment. Rather than rushing you to "move on," it focuses on helping you understand your emotions, make sense of what you have been through, and gradually regain a sense of stability and clarity. Every person experiences grief differently, and there is no right or wrong way to feel-healing takes time, and there is no fixed timeline for it.',
    introSectionImage: 'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/woman-writining-notebook_1_.webp',
    introSectionImageAlt: 'A person writing in a notebook during a counselling reflection exercise',
    image: 'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/debrief.jpg',
    imageAlt: 'Supportive grief and loss counseling session',
  },
  {
    id: 'premarital-counselling',
    slug: 'premarital-counselling',
    title: 'Premarital and Marital Counselling',
    description:
      'Builds strong foundations for marriage through better communication, shared expectations, and emotional understanding.',
    pageDescription:
      'Prepare for marriage with premarital and marital counselling in Kenya: communication, expectations, conflict skills, and emotional connection—in person or online at Swaro Institute.',
    image: 'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/remaritall_1_.webp',
    imageAlt: 'Premarital and marital counselling for couples at Swaro Institute Kenya',
  },
  {
    id: 'resilient-motherhood-program',
    slug: 'resilient-motherhood-program',
    title: 'Resilient Motherhood Program',
    description:
      'A guided motherhood support program designed to help first-time mothers build emotional resilience, caregiving confidence, and wellbeing during pregnancy and early motherhood.',
    pageDescription:
      'Pregnancy and early motherhood bring both joy and change. This program is designed to help first-time mothers build emotional resilience, caregiving confidence, and wellbeing through guided support, practical learning, and meaningful conversations.',
    pageImage: 'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/newborn.jpeg',
    introSectionBody:
      'The Resilient Motherhood Program provides structured and compassionate support for first-time mothers as they navigate pregnancy and early motherhood. Through guided sessions, practical caregiving tools, and reflective conversations, the program helps mothers strengthen emotional wellbeing, build confidence in daily caregiving, and adjust to new responsibilities with clarity and support.',
    introSectionImage: 'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/newmother_compressed.webp',
    introSectionImageAlt: 'First-time mother holding her baby in a calm home setting',
    image: 'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/newmother_compressed.webp',
    imageAlt: 'Mother holding her baby during early motherhood support',
  },
  {
    id: 'prenatal-wellbeing-support',
    slug: 'prenatal-wellbeing-support',
    title: 'Prenatal Wellbeing Support',
    description:
      'Support for expectant mothers navigating the emotional, mental, and lifestyle changes of pregnancy. Helps manage stress, build confidence, and prepare for a healthy and balanced motherhood journey.',
    pageDescription:
      "Pregnancy is a time of change; physically, emotionally, and mentally. You don't have to navigate it alone. We're here to support you every step of the way.",
    pageImage: 'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/pregnant-woman-life-1.webp',
    image: 'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/prenatal-wellbeing-1.webp',
    imageAlt: 'Expectant mother receiving emotional support',
  },
  {
    id: 'family-conflict-resolution',
    slug: 'family-conflict-resolution',
    title: 'Family Conflict Resolution',
    description:
      'Support for families experiencing conflict, misunderstandings, or tension. Helps improve communication, rebuild trust, and create healthier, more supportive family relationships.',
    image: 'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/Counsellingnmeditation(1).webp',
    imageAlt: 'Family in a guided conflict resolution session',
  },
  {
    id: 'youth-counselling',
    slug: 'youth-counselling',
    title: 'Teen & Young Adult Counselling',
    description:
      'Support for teens and young adults navigating emotional challenges, stress, identity, relationships, and personal growth in a safe and understanding space.',
    image: 'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/youthcounselling.jpg',
    imageAlt: 'Teen or young adult in a supportive counselling conversation',
  },
]

export const counsellingServicesBySlug = Object.fromEntries(
  counsellingServices.map((service) => [service.slug, service])
) as Record<string, CounsellingService>
