/** Full profile copy for dedicated lead consultant pages (About → Learn more). */

export type LeadConsultantProfile = {
  slug: string
  name: string
  roleLabel: string
  image: string
  imageAlt: string
  metaDescription: string
  /** Left column paragraphs */
  columnLeft: readonly string[]
  /** Right column paragraphs */
  columnRight: readonly string[]
  coreAreas: readonly string[]
}

export const ALICE_ONDIGI_SLUG = 'prof-alice-ondigi'

const aliceProfile: LeadConsultantProfile = {
  slug: ALICE_ONDIGI_SLUG,
  name: 'Prof. Alice Ondigi',
  roleLabel: 'Senior Accreditted counsellor/psychologist by KCPA',
  image: 'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/Proff.jpeg',
  imageAlt: 'Prof. Alice Ondigi, Lead Consultant at Swaro Institute',
  metaDescription:
    'Prof. Alice Ondigi: Professor of Human Development, accredited counsellor (KCPA), certified mediator, and lead consultant in research, M&E, and community empowerment at Swaro Institute Kenya.',
  columnLeft: [
    'Prof. Alice Ondigi is a Professor of Human Development with a Ph.D from Kenyatta University, and MSc and BSc degrees from the University of Minnesota, USA. She is currently with Kenyatta University in the Department of Community Resource Management.',
    'With over 28 years of academic and leadership experience, she has served in senior leadership positions in higher institutions of learning, where she pioneered new academic programmes and international linkages.',
    'She brings more than 26 years of research experience: publishing and disseminating knowledge at national and international forums, building networks across institutions and communities, organising seminars and key forums, mobilising students and staff for outreach, and mentoring people in research, leadership, and community service.',
    'She is expert in research tool development, data collection, analysis, and reporting; has won competitive research grants; and has gathered and shared findings with stakeholders while respecting privacy and ethical practice. She has strong social science skills in working with people at every level.',
  ],
  columnRight: [
    'She is an accredited counsellor (KCPA) and a certified mediator (Serein Mediation Centre). Her expertise spans family and youth counselling, gender empowerment, maternal and reproductive health, nutrition education, research and data-collection training, monitoring and evaluation, and sustainable livelihoods.',
    'Prof. Ondigi has led numerous research consultancies, including for Innovations for Poverty Action (IPA), and has successfully supervised over 30 postgraduate students. Her work is driven by a passion for transforming community well-being through evidence-based, compassionate interventions.',
  ],
  coreAreas: [
    'Social mentorship',
    'Counselling & mediation',
    'Health & nutrition',
    'Community empowerment',
    'Monitoring & evaluation',
    'Research & consultancy',
  ],
}

export const leadConsultantProfilesBySlug: Record<string, LeadConsultantProfile> = {
  [ALICE_ONDIGI_SLUG]: aliceProfile,
}

export function getLeadConsultantProfile(slug: string | undefined): LeadConsultantProfile | undefined {
  if (!slug) return undefined
  return leadConsultantProfilesBySlug[slug]
}
