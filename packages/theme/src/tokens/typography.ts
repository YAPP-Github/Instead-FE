export const typography = {
  fontSize: {
    14: '1.4rem',
    16: '1.6rem',
    18: '1.8rem',
    20: '2.0rem',
    22: '2.2rem',
    24: '2.4rem',
    28: '2.8rem',
    44: '4.4rem',
  },
  fontWeight: {
    medium: '500',
    semibold: '600',
    bold: '700',
  },
} as const;

export type TypographyType = typeof typography;
