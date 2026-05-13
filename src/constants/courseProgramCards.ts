/** Full “three cards” block (highlights + gains + support) for course overview — same copy as former detail pages. */

export type ProgramCardRow = { label: string; value: string }

export type ProgramCardListBlock = {
  title: string
  intro?: string
  items: readonly string[]
}

export type ProgramHighlightsBlock = {
  title: string
  intro?: string
  rows: readonly ProgramCardRow[]
}

export type CourseProgramTriptych = {
  variant: 'default' | 'premarital' | 'motherhood' | 'prenatal'
  highlights: ProgramHighlightsBlock
  gains: ProgramCardListBlock
  support: ProgramCardListBlock
}

const debriefTriptych: CourseProgramTriptych = {
  variant: 'default',
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
}

const prenatalTriptych: CourseProgramTriptych = {
  variant: 'prenatal',
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
}

const premaritalTriptych: CourseProgramTriptych = {
  variant: 'premarital',
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
}

const motherhoodTriptych: CourseProgramTriptych = {
  variant: 'motherhood',
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
}

const TRIPTYCH_BY_SLUG: Record<string, CourseProgramTriptych> = {
  'debrief-grief-loss-support': debriefTriptych,
  'prenatal-wellbeing-support': prenatalTriptych,
  'premarital-counselling': premaritalTriptych,
  'resilient-motherhood-program': motherhoodTriptych,
}

export function getCourseProgramTriptych(slug: string): CourseProgramTriptych | undefined {
  return TRIPTYCH_BY_SLUG[slug]
}
