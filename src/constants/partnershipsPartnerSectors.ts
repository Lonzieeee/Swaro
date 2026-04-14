import type { SeoItemListEntry } from '../utils/seo'

/**
 * Single source of truth for “Who we collaborate with” copy + JSON-LD ItemList.
 * Icons are attached in `WhoWeCollaborate.tsx`.
 */
export const PARTNERSHIP_PARTNER_SECTORS = [
  {
    id: 'ngos',
    title: 'NGOs & International Development Partners',
    description:
      'We collaborate with non-governmental organizations and international development partners to design, deliver and evaluate programs that create lasting impact in communities across Kenya and beyond.',
    tags: ['Program Design', 'Capacity Building', 'M&E'],
  },
  {
    id: 'academic',
    title: 'Academic Institutions',
    description:
      'We partner with universities, colleges and research institutions to conduct applied research, develop curricula and deliver training programs that meet contemporary knowledge and skills needs.',
    tags: ['Research', 'Curriculum', 'Training'],
  },
  {
    id: 'government',
    title: 'Government Ministries',
    description:
      'We work closely with government ministries and public sector agencies to provide evidence-based consultancy, policy research and institutional strengthening programs that drive public good.',
    tags: ['Policy Research', 'Consultancy', 'Institutional Strengthening'],
  },
  {
    id: 'faith',
    title: 'Faith-Based Organizations',
    description:
      'We partner with churches, mosques and faith-based organizations to deliver counselling, community empowerment and human development programs that are sensitive to cultural and spiritual values.',
    tags: ['Counselling', 'Empowerment', 'Community'],
  },
  {
    id: 'corporate',
    title: 'Corporate & Private Sector Institutions',
    description:
      'We collaborate with businesses and private sector institutions to deliver leadership training, human resource development and organizational capacity building that drives performance and growth.',
    tags: ['Leadership', 'HR Development', 'Training'],
  },
  {
    id: 'communities',
    title: 'Communities',
    description:
      'We work directly with local communities — engaging community leaders, groups and individuals to co-design and implement programs that address real needs and build long-term community resilience.',
    tags: ['Community Development', 'Empowerment', 'Resilience'],
  },
] as const

export type PartnershipSectorId = (typeof PARTNERSHIP_PARTNER_SECTORS)[number]['id']

export const partnerSectorsForSeo: readonly SeoItemListEntry[] = PARTNERSHIP_PARTNER_SECTORS.map(
  (p) => ({
    name: p.title,
    description: p.description,
  })
)
