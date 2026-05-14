export const site = {
  name: 'SWARO',
  /** Full legal / marketing name — used in titles and schema */
  fullName: 'Swaro Institute',
  tagline: 'Counselling, training, and community empowerment',

  homeTitle: 'Swaro Institute | Kenya consultancy & development',
 
  homeDescription:
    'Swaro Institute: evidence-based counselling, training, research and community development in Kenya. Support for individuals, schools and partners—book a consultation.',
 
  organizationDescription:
    'Kenya consultancy delivering counselling, mediation, training, research, education and community empowerment for individuals, institutions and development partners.',
  url: 'https://swaroinstitute.com',
 
  sameAs: [] as readonly string[],
  
  defaultOgImagePath: 'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/sliideee.webp',
  
  brandLogoUrl: 'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/swarologoo.png',
  contactEmail: 'info@swaroinstitute.com',
  phone: '+254 714 882190',
} as const

export const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/approach', label: 'Approach' },
  { to: '/leadership', label: 'Leadership' },
  { to: '/why-us', label: 'Why Us' },
  { to: '/partnerships', label: 'Partnerships' },
  { to: '/contact', label: 'Contact' },
] as const

/** Hero imagery for inner pages */
export const pageHeroMedia = {
  about:
    'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/ABouthero(1).webp',
  approach:
    'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/ABouthero(1).webp',
} as const


export const aboutPageMedia = {
  showcase:
    'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/image%20abt(1).webp',
} as const

/** Partnerships page feature imagery */
export const partnershipsPageMedia = {
  intro: 'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/Partnerships.jpg',
  ctaBanner:
    'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/bANNER%20GIRL(1)-Photoroom.png',
} as const

export const hero = {
  title: 'Welcome to SWARO',
  subtitle: 'Holistic support for individuals, teams, and communities.',
} as const

export const stats = [
  { value: '10+', label: 'Years experience' },
  { value: '500+', label: 'People supported' },
  { value: '50+', label: 'Partner organisations' },
] as const
