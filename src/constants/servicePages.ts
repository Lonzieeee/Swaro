export type ServiceSlug =
  | 'counselling'
  | 'training'
  | 'education'
  | 'community'
  | 'research'
  | 'health'

export type ServicePageContent = {
  slug: ServiceSlug
  title: string
  shortLabel: string
  path: `/services/${ServiceSlug}`
  heroImage: string
  heroImageAlt: string
  metaDescription: string
  overview: string[]
  offerings: string[]
  audience: string[]
  outcomes: string[]
}

const DEFAULT_SERVICE_HERO =
  'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/ABouthero(1).webp'

export const servicePages: readonly ServicePageContent[] = [
  {
    slug: 'counselling',
    title: 'Counselling & Mediation',
    shortLabel: 'Counselling',
    path: '/services/counselling',
    heroImage: 'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/Counsellingnmeditation(1).webp',
    heroImageAlt: 'Professional counsellor supporting clients in a safe discussion space',
    metaDescription:
      'SWARO counselling and mediation services in Kenya: general, pre-marital, marital, youth and family counselling plus conflict resolution support.',
    overview: [
      'Our counselling and mediation services support emotional well-being, healthier relationships, and practical conflict resolution.',
      'We provide confidential, structured guidance for individuals, couples, families, and groups seeking clarity, healing, and sustainable peace.',
    ],
    offerings: [
      'General counselling',
      'Pre-marital and marital counselling',
      'Family and youth counselling',
      'Conflict resolution and mediation',
    ],
    audience: [
      'Individuals and families',
      'Couples preparing for or strengthening marriage',
      'Youth groups and faith-based communities',
      'Institutions requiring civil mediation support',
    ],
    outcomes: [
      'Improved communication and trust',
      'Reduced conflict and practical mediation agreements',
      'Stronger family and relationship resilience',
      'Better emotional well-being and decision-making',
    ],
  },
  {
    slug: 'training',
    title: 'Training & Capacity Building',
    shortLabel: 'Training',
    path: '/services/training',
    heroImage: DEFAULT_SERVICE_HERO,
    heroImageAlt: 'Facilitator leading a professional capacity building workshop',
    metaDescription:
      'SWARO training and capacity building in Kenya: leadership, management, institutional strengthening and practical development courses.',
    overview: [
      'Our training programs equip people and institutions with practical knowledge, leadership capability, and organizational strength.',
      'Every program is tailored to context so participants gain skills they can immediately apply for measurable performance improvement.',
    ],
    offerings: [
      'Human development training',
      'Leadership and management training',
      'Administration and institutional strengthening',
      'Short courses in personal and professional development',
    ],
    audience: [
      'Universities and educational institutions',
      'NGOs and development partners',
      'Government and corporate agencies',
      'Community and faith-based organizations',
    ],
    outcomes: [
      'Stronger leadership and team effectiveness',
      'Improved institutional systems and service quality',
      'Higher workforce confidence and productivity',
      'Sustainable capacity for long-term impact',
    ],
  },
  {
    slug: 'education',
    title: 'Education & Career Development',
    shortLabel: 'Education',
    path: '/services/education',
    heroImage: DEFAULT_SERVICE_HERO,
    heroImageAlt: 'Mentor guiding learners through educational and career planning',
    metaDescription:
      'SWARO education and career services in Kenya: curriculum development, mentorship, CV writing and career guidance for learners and professionals.',
    overview: [
      'We support learners, institutions, and professionals with practical tools for academic growth and career direction.',
      'Our approach combines mentorship, motivation, and evidence-based education practices to improve outcomes at every stage.',
    ],
    offerings: [
      'Curriculum development',
      'Career guidance and motivation',
      'CV and resume writing',
      'Educational mentorship',
    ],
    audience: [
      'Learners and graduates',
      'Schools, colleges, and universities',
      'Professionals transitioning careers',
      'Families supporting youth career decisions',
    ],
    outcomes: [
      'Improved learning and academic progression',
      'Clear career pathways and stronger employability',
      'Professional, competitive CVs and resumes',
      'Greater confidence in education and career decisions',
    ],
  },
  {
    slug: 'community',
    title: 'Community Empowerment',
    shortLabel: 'Community',
    path: '/services/community',
    heroImage: DEFAULT_SERVICE_HERO,
    heroImageAlt: 'Community group session focused on empowerment and participation',
    metaDescription:
      'SWARO community empowerment programs in Kenya: women, youth and gender initiatives with faith-based and social support for stronger communities.',
    overview: [
      'Our community empowerment programs strengthen social inclusion, participation, and resilience at household and community levels.',
      'We work alongside local groups to design culturally relevant initiatives that deliver lasting social and economic transformation.',
    ],
    offerings: [
      'Women empowerment programs',
      'Gender empowerment initiatives',
      'Youth empowerment',
      'Church and faith-based counselling',
    ],
    audience: [
      'Women and youth groups',
      'Faith-based organizations',
      'Civil society and community leaders',
      'Vulnerable and underserved groups',
    ],
    outcomes: [
      'Increased participation and local leadership',
      'Improved gender inclusion and social cohesion',
      'Youth engagement in productive pathways',
      'Community-owned solutions with sustainable impact',
    ],
  },
  {
    slug: 'research',
    title: 'Research & Consultancy',
    shortLabel: 'Research',
    path: '/services/research',
    heroImage: DEFAULT_SERVICE_HERO,
    heroImageAlt: 'Research team reviewing data and program performance indicators',
    metaDescription:
      'SWARO research and consultancy services in Kenya: data collection, M&E, proposal writing and resource mobilization for development impact.',
    overview: [
      'We provide research and consultancy services that convert data into actionable decisions for programs, institutions, and policy.',
      'From study design to reporting, we prioritize rigor, clarity, and practical recommendations that improve results.',
    ],
    offerings: [
      'Research and data collection',
      'Monitoring and evaluation',
      'Grant proposal writing',
      'Resource mobilization and fundraising',
    ],
    audience: [
      'NGOs and development partners',
      'Government ministries and agencies',
      'Academic institutions',
      'Organizations seeking funding and impact evidence',
    ],
    outcomes: [
      'Reliable evidence for policy and program planning',
      'Clear monitoring frameworks and impact reporting',
      'Higher quality grant proposals and concept notes',
      'Improved fundraising readiness and strategy',
    ],
  },
  {
    slug: 'health',
    title: 'Health & Lifestyle Development',
    shortLabel: 'Health',
    path: '/services/health',
    heroImage: DEFAULT_SERVICE_HERO,
    heroImageAlt: 'Health educator delivering community lifestyle and nutrition guidance',
    metaDescription:
      'SWARO health and lifestyle development in Kenya: nutrition education and community health awareness programs for healthier living.',
    overview: [
      'Our health and lifestyle programs promote practical, preventive wellness through nutrition education and local health awareness.',
      'We translate evidence into everyday actions that help communities manage lifestyle risks and improve quality of life.',
    ],
    offerings: [
      'Nutrition education in lifestyle diseases',
      'Community health awareness programs',
    ],
    audience: [
      'Families and community groups',
      'Youth and women networks',
      'Faith-based and civil society organizations',
      'Institutions promoting preventive health',
    ],
    outcomes: [
      'Improved nutrition and lifestyle choices',
      'Better awareness of lifestyle disease prevention',
      'Stronger community health knowledge',
      'Healthier daily practices and long-term well-being',
    ],
  },
]

export const servicePagesBySlug: Readonly<Record<ServiceSlug, ServicePageContent>> = servicePages.reduce(
  (acc, service) => {
    acc[service.slug] = service
    return acc
  },
  {} as Record<ServiceSlug, ServicePageContent>
)
