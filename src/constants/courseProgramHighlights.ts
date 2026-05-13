/** Label/value rows shown under “Program highlights” on the course overview (sourced from former detail pages). */

export type ProgramHighlightRow = {
  title: string
  value: string
}

const DEFAULT_HIGHLIGHTS: readonly ProgramHighlightRow[] = [
  { title: 'Format', value: 'Weekly guided sessions' },
  { title: 'Access', value: 'Online and in-person options' },
  { title: 'Duration', value: 'Structured program pathway' },
  { title: 'Support', value: 'One-on-one or group sessions' },
  { title: 'Certificate', value: 'Awarded upon completion' },
  { title: 'Price', value: 'Paid course' },
]

const DEBRIEF_PRENATAL_ROWS: readonly ProgramHighlightRow[] = [
  { title: 'Duration', value: '20 hrs' },
  { title: 'Session length', value: '2 hours per week' },
  { title: 'Location', value: 'Online or physical sessions' },
  { title: 'Certificate', value: 'Awarded upon completion' },
  { title: 'Individual counselling', value: 'Ksh 40,000' },
  { title: 'Group counselling', value: 'Ksh 50,000' },
]

const PREMARITAL_ROWS: readonly ProgramHighlightRow[] = [
  { title: 'Session format', value: 'Individual couple sessions or group sessions' },
  { title: 'Location', value: 'Online or physical sessions' },
  { title: 'Session duration', value: '1.5 – 2 hours' },
  {
    title: 'Focus areas',
    value: 'Communication, emotional wellbeing, trust, and relationship growth',
  },
  { title: 'Certification', value: 'Available for premarital completion programs' },
]

const MOTHERHOOD_ROWS: readonly ProgramHighlightRow[] = [
  { title: 'Duration', value: '20 weeks' },
  { title: 'Session length', value: '2 hours per week' },
  { title: 'Location', value: 'Online or physical sessions' },
  { title: 'Certification', value: 'Awarded upon completion' },
  { title: 'Format', value: 'Individual or group counselling options' },
  { title: 'Focus', value: 'Emotional wellbeing, newborn care, and maternal support' },
]

const HIGHLIGHTS_BY_SLUG: Record<string, readonly ProgramHighlightRow[]> = {
  'debrief-grief-loss-support': DEBRIEF_PRENATAL_ROWS,
  'prenatal-wellbeing-support': DEBRIEF_PRENATAL_ROWS,
  'premarital-counselling': PREMARITAL_ROWS,
  'resilient-motherhood-program': MOTHERHOOD_ROWS,
}

export function getProgramHighlightsForSlug(slug: string): readonly ProgramHighlightRow[] {
  return HIGHLIGHTS_BY_SLUG[slug] ?? DEFAULT_HIGHLIGHTS
}
