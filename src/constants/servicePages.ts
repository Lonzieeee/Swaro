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
  /** Optional: image for the overview section (if different from hero) */
  overviewImage?: string
  overviewImageAlt?: string
  metaDescription: string
  overview: string[]
  offerings: string[]
  offeringSummaries?: Partial<Record<string, string>>
  audience: string[]
  audienceSummaries?: Partial<Record<string, string>>
  outcomes: string[]
  outcomesStatement?: string
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
    overviewImage: 'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/Servicecounselling(1).webp',
    overviewImageAlt: 'Counselling and mediation service overview',
    metaDescription:
      'SWARO counselling and mediation services in Kenya: general, pre-marital, marital, youth and family counselling plus conflict resolution support.',
    overview: [
      'Our counselling and mediation services nurture emotional well-being, restore trust, and provide practical tools for resolving conflict. We offer a safe, confidential space for individuals, couples, families, and groups to address stress, grief, relationship strain, or major life changes.',
      'Sessions are tailored to your needs, focusing on empathy, resilience, and clear communication. Mediation helps de-escalate conflict and guide all parties toward respectful, actionable solutions. Our goal is to help you move forward with clarity and confidence.'
    ],
    offerings: [
      'General counselling',
      'Pre-marital and marital counselling',
      'Family and youth counselling',
      'Conflict resolution and mediation',
    ],
    offeringSummaries: {
      'General counselling':
        'One-on-one support that helps clients process stress, grief, transitions, and personal struggles while building practical coping tools for daily life.',
      'Pre-marital and marital counselling':
        'Guided sessions that help couples align expectations, improve communication, manage conflict constructively, and strengthen long-term partnership commitment.',
      'Family and youth counselling':
        'Developmentally informed guidance for families and young people facing behavioral, relational, or life-stage pressures at home, school, and in community settings.',
      'Conflict resolution and mediation':
        'Neutral facilitation that helps parties de-escalate tension, surface core interests, and agree on realistic, respectful, and actionable resolutions.',
    },
    audience: [
      'Individuals and families',
      'Couples preparing for or strengthening marriage',
      'Youth groups and faith-based communities',
      'Institutions requiring civil mediation support',
    ],
    audienceSummaries: {
      'Individuals and families':
        'For people and households seeking a safe, confidential space to work through emotional strain, relationship pressure, or difficult life transitions.',
      'Couples preparing for or strengthening marriage':
        'For partners who want to enter marriage with clarity or restore connection by improving trust, communication, and shared decision-making.',
      'Youth groups and faith-based communities':
        'For youth leaders and community ministries supporting adolescents and members who need structured psychosocial and relational support.',
      'Institutions requiring civil mediation support':
        'For organizations that need impartial mediation processes to manage disputes professionally and maintain healthy working relationships.',
    },
    outcomes: [
      'Improved communication and trust',
      'Reduced conflict and practical mediation agreements',
      'Stronger family and relationship resilience',
      'Better emotional well-being and decision-making',
    ],
    outcomesStatement:
      'Clients and groups leave with stronger communication and trust, reduced conflict through practical mediation agreements, greater resilience in family and relationship dynamics, and healthier emotional well-being that supports clearer day-to-day decision-making.',
  },
  {
    slug: 'training',
    title: 'Training & Capacity Building',
    shortLabel: 'Training',
    path: '/services/training',
    heroImage: 'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/traininghero(1).webp',
    heroImageAlt: 'Facilitator leading a professional capacity building workshop',
    overviewImage: 'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/overviewtraining(1).webp',
    overviewImageAlt: 'Facilitator guiding participants during a practical institutional training session',
    metaDescription:
      'SWARO training and capacity building in Kenya: leadership, management, institutional strengthening and practical development courses.',
    overview: [
      'Our training and capacity-building services are designed to move beyond theory by equipping individuals, teams, and institutions with practical competencies they can apply immediately in their day-to-day roles.',
      'Through carefully structured facilitation, participatory learning methods, and context-specific tools, we help organizations strengthen leadership, improve internal systems, and build a confident workforce that can sustain performance and adapt to change.',
    ],
    offerings: [
      'Human development training',
      'Leadership and management training',
      'Administration and institutional strengthening',
      'Short courses in personal and professional development',
    ],
    offeringSummaries: {
      'Human development training':
        'Builds interpersonal effectiveness, emotional intelligence, and professional discipline so participants can work with greater confidence, responsibility, and collaboration.',
      'Leadership and management training':
        'Develops practical leadership behaviors, strategic thinking, and supervisory skills that help managers align teams, improve accountability, and deliver stronger results.',
      'Administration and institutional strengthening':
        'Improves core organizational systems by refining governance routines, operational workflows, and internal coordination needed for efficient, high-quality service delivery.',
      'Short courses in personal and professional development':
        'Offers focused learning modules that quickly upgrade essential workplace and life skills, enabling participants to respond effectively to evolving personal and professional demands.',
    },
    audience: [
      'Universities and educational institutions',
      'NGOs and development partners',
      'Government and corporate agencies',
      'Community and faith-based organizations',
    ],
    audienceSummaries: {
      'Universities and educational institutions':
        'Ideal for institutions seeking to strengthen teaching teams, administrative staff, and student-facing units through structured capacity development programs.',
      'NGOs and development partners':
        'Designed for program teams that need stronger implementation capability, clearer coordination, and practical leadership skills to improve project outcomes.',
      'Government and corporate agencies':
        'Supports departments and workforces aiming to improve operational efficiency, leadership effectiveness, and service standards in complex institutional settings.',
      'Community and faith-based organizations':
        'Well suited for mission-driven groups that want to empower leaders and volunteers with practical skills for organized, sustainable community impact.',
    },
    outcomes: [
      'Stronger leadership and team effectiveness',
      'Improved institutional systems and service quality',
      'Higher workforce confidence and productivity',
      'Sustainable capacity for long-term impact',
    ],
    outcomesStatement:
      'Participants and institutions gain stronger leadership and team effectiveness, improved systems and service quality, higher workforce confidence and productivity, and sustainable internal capacity that supports long-term organizational impact.',
  },
  {
    slug: 'education',
    title: 'Education & Career Development',
    shortLabel: 'Education',
    path: '/services/education',
    heroImage: 'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/EdHero(1).webp',
    heroImageAlt: 'Mentor guiding learners through educational and career planning',
    overviewImage: 'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/educastionoverview.webp',
    overviewImageAlt: 'Mentor guiding learners through educational and career planning',
    metaDescription:
      'SWARO education and career services in Kenya: curriculum development, mentorship, CV writing and career guidance for learners and professionals.',
    overview: [
      'Our education and career development services help learners, institutions, and professionals translate ambition into clear academic and career progress through practical, structured support.',
      'By combining mentorship, skills coaching, and evidence-based education strategies, we guide participants to make informed choices, strengthen employability, and pursue sustainable growth at every stage of their learning and professional journey.',
    ],
    offerings: [
      'Curriculum development',
      'Career guidance and motivation',
      'CV and resume writing',
      'Educational mentorship',
    ],
    offeringSummaries: {
      'Curriculum development':
        'Designs learner-centered curricula that align content, assessment, and delivery methods so institutions can improve relevance, consistency, and measurable learning outcomes.',
      'Career guidance and motivation':
        'Provides practical direction that helps participants identify strengths, explore realistic pathways, and maintain the confidence needed to pursue purposeful career goals.',
      'CV and resume writing':
        'Equips individuals to present their achievements clearly through professional CVs and resumes that communicate value, readiness, and role-specific fit.',
      'Educational mentorship':
        'Offers personalized mentorship that supports academic planning, performance improvement, and long-term goal setting through consistent guidance and accountability.',
    },
    audience: [
      'Learners and graduates',
      'Schools, colleges, and universities',
      'Professionals transitioning careers',
      'Families supporting youth career decisions',
    ],
    audienceSummaries: {
      'Learners and graduates':
        'For students and recent graduates who need practical support to improve academic outcomes, clarify career direction, and transition confidently into the job market.',
      'Schools, colleges, and universities':
        'For education institutions seeking stronger program design, improved learner support structures, and better alignment between training and workforce expectations.',
      'Professionals transitioning careers':
        'For working professionals planning a career shift who require strategic guidance, skills repositioning, and stronger personal branding for new opportunities.',
      'Families supporting youth career decisions':
        'For parents and guardians who want to provide informed, constructive support as young people make important education and career choices.',
    },
    outcomes: [
      'Improved learning and academic progression',
      'Clear career pathways and stronger employability',
      'Professional, competitive CVs and resumes',
      'Greater confidence in education and career decisions',
    ],
    outcomesStatement:
      'Participants achieve stronger academic progression, gain clarity on career pathways with improved employability, develop professional and competitive CVs and resumes, and make education and career decisions with greater confidence and long-term direction.',
  },
  {
    slug: 'community',
    title: 'Community Empowerment',
    shortLabel: 'Community',
    path: '/services/community',
    heroImage: 'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/Comminityempower.webp',
    heroImageAlt: 'Community group session focused on empowerment and participation',
    overviewImage: 'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/serviceempowerment.webp',
    overviewImageAlt: 'Community group session focused on empowerment and participation',
    metaDescription:
      'SWARO community empowerment programs in Kenya: women, youth and gender initiatives with faith-based and social support for stronger communities.',
    overview: [
      'Our community empowerment services are built to strengthen inclusion, participation, and resilience by helping people and local groups take active roles in shaping their own social and economic progress.',
      'Working closely with community actors, we co-create culturally grounded interventions that build leadership, promote shared responsibility, and deliver practical, long-term change across households and community institutions.',
    ],
    offerings: [
      'Women empowerment programs',
      'Gender empowerment initiatives',
      'Youth empowerment',
      'Church and faith-based counselling',
    ],
    offeringSummaries: {
      'Women empowerment programs':
        'Supports women with practical life, leadership, and economic participation skills that strengthen voice, confidence, and decision-making influence in families and communities.',
      'Gender empowerment initiatives':
        'Advances equitable participation by facilitating dialogue, awareness, and action-oriented strategies that address barriers and promote healthier gender relations.',
      'Youth empowerment':
        'Engages young people through structured development pathways that build identity, responsibility, and practical skills for education, work, and community leadership.',
      'Church and faith-based counselling':
        'Provides values-informed counselling support that helps faith communities address social, relational, and emotional challenges with compassion and practical guidance.',
    },
    audience: [
      'Women and youth groups',
      'Faith-based organizations',
      'Civil society and community leaders',
      'Vulnerable and underserved groups',
    ],
    audienceSummaries: {
      'Women and youth groups':
        'For organized women and youth networks seeking stronger leadership capacity, collective action skills, and practical pathways for social and economic advancement.',
      'Faith-based organizations':
        'For churches and faith communities that want to deliver holistic support programs addressing spiritual, social, and psychosocial needs in their congregations.',
      'Civil society and community leaders':
        'For local leaders and civic actors who need tools to mobilize participation, strengthen collaboration, and drive inclusive community development initiatives.',
      'Vulnerable and underserved groups':
        'For populations facing exclusion or limited access to opportunity, with tailored support designed to restore agency, dignity, and meaningful participation.',
    },
    outcomes: [
      'Increased participation and local leadership',
      'Improved gender inclusion and social cohesion',
      'Youth engagement in productive pathways',
      'Community-owned solutions with sustainable impact',
    ],
    outcomesStatement:
      'Communities experience increased participation and stronger local leadership, improved gender inclusion and social cohesion, greater youth engagement in productive pathways, and locally owned solutions that sustain meaningful impact over time.',
  },
  {
    slug: 'research',
    title: 'Research & Consultancy',
    shortLabel: 'Research',
    path: '/services/research',
    heroImage: 'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/reseacrchhero.webp',
    heroImageAlt: 'Research team reviewing data and program performance indicators',
    overviewImage: 'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/Researhoverview.webp',
    overviewImageAlt: 'Research team reviewing data and program performance indicators',
    metaDescription:
      'SWARO research and consultancy services in Kenya: data collection, M&E, proposal writing and resource mobilization for development impact.',
    overview: [
      'Our research and consultancy services help institutions transform data and field insights into clear, evidence-based decisions that improve policy, programs, and organizational strategy.',
      'From study design and data collection to analysis, reporting, and implementation guidance, we prioritize methodological rigor, practical relevance, and recommendations that can be acted on with confidence.',
    ],
    offerings: [
      'Research and data collection',
      'Monitoring and evaluation',
      'Grant proposal writing',
      'Resource mobilization and fundraising',
    ],
    offeringSummaries: {
      'Research and data collection':
        'Delivers context-sensitive studies and reliable data gathering processes that generate credible evidence for planning, decision-making, and program refinement.',
      'Monitoring and evaluation':
        'Builds robust M&E systems that track progress, measure outcomes, and provide timely learning insights for stronger accountability and adaptive management.',
      'Grant proposal writing':
        'Develops persuasive, well-structured proposals and concept notes that align donor priorities with clear program logic, budgets, and measurable impact pathways.',
      'Resource mobilization and fundraising':
        'Strengthens fundraising readiness through practical strategies, positioning support, and partnership approaches that diversify and sustain resource flows.',
    },
    audience: [
      'NGOs and development partners',
      'Government ministries and agencies',
      'Academic institutions',
      'Organizations seeking funding and impact evidence',
    ],
    audienceSummaries: {
      'NGOs and development partners':
        'For organizations that need credible evidence, stronger proposal quality, and better learning systems to improve program effectiveness and donor confidence.',
      'Government ministries and agencies':
        'For public institutions requiring research-informed planning, transparent performance tracking, and policy guidance grounded in reliable data.',
      'Academic institutions':
        'For universities and research centers seeking technical support in study design, data quality assurance, and translation of findings into practical application.',
      'Organizations seeking funding and impact evidence':
        'For institutions preparing to compete for funding while demonstrating clear results, measurable outcomes, and a compelling case for investment.',
    },
    outcomes: [
      'Reliable evidence for policy and program planning',
      'Clear monitoring frameworks and impact reporting',
      'Higher quality grant proposals and concept notes',
      'Improved fundraising readiness and strategy',
    ],
    outcomesStatement:
      'Clients gain reliable evidence for stronger policy and program planning, clear monitoring frameworks with credible impact reporting, higher quality grant proposals and concept notes, and improved fundraising readiness supported by more strategic resource mobilization.',
  },
  {
    slug: 'health',
    title: 'Health & Lifestyle Development',
    shortLabel: 'Health',
    path: '/services/health',
    heroImage: 'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/healthhero.webp',
    heroImageAlt: 'Health educator delivering community lifestyle and nutrition guidance',
    overviewImage: DEFAULT_SERVICE_HERO,
    overviewImageAlt: 'Health educator delivering community lifestyle and nutrition guidance',
    metaDescription:
      'SWARO health and lifestyle development in Kenya: nutrition education and community health awareness programs for healthier living.',
    overview: [
      'Our health and lifestyle development services promote practical, preventive wellness by helping individuals and communities build healthier habits through accessible nutrition and health education.',
      'By translating evidence-based health knowledge into simple daily actions, we support people to reduce lifestyle-related risks, strengthen community awareness, and improve overall quality of life over time.',
    ],
    offerings: [
      'Nutrition education in lifestyle diseases',
      'Community health awareness programs',
    ],
    offeringSummaries: {
      'Nutrition education in lifestyle diseases':
        'Provides practical nutrition guidance that helps individuals understand lifestyle-related conditions, make informed food choices, and adopt sustainable habits for long-term wellness.',
      'Community health awareness programs':
        'Delivers participatory health education sessions that raise local awareness, encourage preventive behavior, and strengthen collective responsibility for healthier communities.',
    },
    audience: [
      'Families and community groups',
      'Youth and women networks',
      'Faith-based and civil society organizations',
      'Institutions promoting preventive health',
    ],
    audienceSummaries: {
      'Families and community groups':
        'For households and local groups seeking practical health knowledge they can apply in everyday life to improve nutrition, prevention, and shared well-being.',
      'Youth and women networks':
        'For youth and women-led networks that want targeted wellness education and behavior-change support tailored to their specific health realities.',
      'Faith-based and civil society organizations':
        'For mission-driven organizations looking to integrate community-centered health promotion into outreach, care, and social support initiatives.',
      'Institutions promoting preventive health':
        'For schools, workplaces, and other institutions committed to strengthening preventive health culture through structured awareness and education programs.',
    },
    outcomes: [
      'Improved nutrition and lifestyle choices',
      'Better awareness of lifestyle disease prevention',
      'Stronger community health knowledge',
      'Healthier daily practices and long-term well-being',
    ],
    outcomesStatement:
      'Participants and communities gain improved nutrition and lifestyle choices, stronger awareness of lifestyle disease prevention, deeper community health knowledge, and healthier daily practices that support long-term well-being.',
  },
]

export const servicePagesBySlug: Readonly<Record<ServiceSlug, ServicePageContent>> = servicePages.reduce(
  (acc, service) => {
    acc[service.slug] = service
    return acc
  },
  {} as Record<ServiceSlug, ServicePageContent>
)
