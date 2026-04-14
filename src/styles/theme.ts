// src/styles/theme.ts

export const colors = {
  primary: {
    900: "#0D2B1D",
    800: "#1B4332",
    700: "#2D6A4F",
    600: "#40916C",
    500: "#52B788",
  },

  gold: {
    900: "#7A5C1E",
    800: "#A67C2E",
    700: "#C9A84C",
    600: "#D4B96A",
    500: "#E8D5A3",
  },

  cream: {
    900: "#E8E0D0",
    800: "#F0EAD6",
    700: "#F9F5EC",
    600: "#FDFAF4",
    500: "#FFFFFF",
  },

  neutral: {
    900: "#1A1A1A",
    800: "#2C2C2C",
    700: "#4A4A4A",
    600: "#6B6B6B",
    500: "#9A9A9A",
    400: "#C4C4C4",
    300: "#E0E0E0",
    200: "#F5F5F5",
  },

  semantic: {
    success: "#2D6A4F",
    error: "#C0392B",
    warning: "#C9A84C",
    info: "#1B4332",
  },
} as const;

export const typography = {
  fontFamily: {
    heading: "'DM Serif Display', Georgia, serif",
    body: "'DM Sans', system-ui, sans-serif",
  },

  fontSize: {
    xs:   "0.75rem",     // 12px
    sm:   "0.875rem",    // 14px
    base: "1rem",        // 16px
    lg:   "1.125rem",    // 18px
    xl:   "1.25rem",     // 20px
    "2xl":"1.5rem",      // 24px
    "3xl":"1.875rem",    // 30px
    "4xl":"2.25rem",     // 36px
    "5xl":"3rem",        // 48px
    "6xl":"3.75rem",     // 60px
  },

  fontWeight: {
    light:    300,
    regular:  400,
    medium:   500,
    semibold: 600,
  },

  lineHeight: {
    tight:   "1.2",
    normal:  "1.6",
    relaxed: "1.8",
  },

  letterSpacing: {
    tight:  "-0.02em",
    normal: "0em",
    wide:   "0.05em",
    wider:  "0.1em",    // great for uppercase labels
  },
} as const;

export const spacing = {
  xs:    "0.5rem",    // 8px
  sm:    "1rem",      // 16px
  md:    "1.5rem",    // 24px
  lg:    "2rem",      // 32px
  xl:    "3rem",      // 48px
  "2xl": "4rem",      // 64px
  "3xl": "6rem",      // 96px
  "4xl": "8rem",      // 128px
} as const;

export const borderRadius = {
  sm:   "4px",
  md:   "8px",
  lg:   "12px",
  xl:   "16px",
  full: "9999px",
} as const;

export const shadows = {
  sm:   "0 1px 4px rgba(27, 67, 50, 0.08)",
  md:   "0 4px 12px rgba(27, 67, 50, 0.12)",
  lg:   "0 8px 24px rgba(27, 67, 50, 0.16)",
  gold: "0 4px 12px rgba(201, 168, 76, 0.25)",
} as const;

export const breakpoints = {
  sm:    "640px",
  md:    "768px",
  lg:    "1024px",
  xl:    "1280px",
  "2xl": "1536px",
} as const;

export const transitions = {
  fast:   "all 0.15s ease",
  normal: "all 0.3s ease",
  slow:   "all 0.5s ease",
} as const;

export const componentTokens = {
  navbar: {
    background:  colors.primary[800],
    text:        colors.cream[700],
    hoverText:   colors.gold[700],
    height:      "72px",
  },

  hero: {
    background:      colors.primary[800],
    headingColor:    colors.cream[700],
    subheadingColor: colors.gold[700],
    bodyColor:       colors.cream[900],
  },

  button: {
    primary: {
      background: colors.gold[700],
      text:       colors.primary[800],
      hover:      colors.gold[600],
    },
    secondary: {
      background: "transparent",
      text:       colors.cream[700],
      border:     colors.cream[700],
      hover:      colors.cream[700],
      hoverText:  colors.primary[800],
    },
  },

  section: {
    lightBackground:     colors.cream[700],
    darkBackground:      colors.primary[800],
    alternateBackground: colors.primary[900],
  },

  card: {
    background:  colors.cream[500],
    border:      colors.neutral[300],
    hoverShadow: shadows.md,
    accentColor: colors.gold[700],
  },

  footer: {
    background: colors.primary[900],
    text:       colors.cream[900],
    linkHover:  colors.gold[700],
  },
} as const;

export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  breakpoints,
  transitions,
  componentTokens,
} as const;

export default theme;