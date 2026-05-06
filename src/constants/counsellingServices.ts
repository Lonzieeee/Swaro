export type CounsellingService = {
  id: string
  slug: string
  title: string
  description: string
  pageDescription?: string
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
    pageImage: 'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/sliideee.webp',
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
    image: 'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/remaritall_1_.webp',
    imageAlt: 'Couple receiving premarital counseling support',
  },
  {
    id: 'career-workplace-support',
    slug: 'career-workplace-support',
    title: 'Career & Workplace Support',
    description:
      'Support for career transitions, job stress, burnout, and finding clarity in your professional journey.',
    image:
      'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/stressed-businesswoman-suffering-from-headache-work-doing-overtime-late-night-1.webp',
    imageAlt: 'Professional experiencing workplace stress',
  },
  {
    id: 'prenatal-wellbeing-support',
    slug: 'prenatal-wellbeing-support',
    title: 'Prenatal Wellbeing Support',
    description:
      'Support for expectant mothers navigating the emotional, mental, and lifestyle changes of pregnancy. Helps manage stress, build confidence, and prepare for a healthy and balanced motherhood journey.',
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
    title: 'Youth Counselling',
    description:
      'Support for young people navigating academic pressure, identity, relationships, and personal growth. Helps build confidence, resilience, and healthy decision-making skills.',
    image: 'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/youthcounselling.jpg',
    imageAlt: 'Youth participant in a counseling conversation',
  },
]

export const counsellingServicesBySlug = Object.fromEntries(
  counsellingServices.map((service) => [service.slug, service])
) as Record<string, CounsellingService>
