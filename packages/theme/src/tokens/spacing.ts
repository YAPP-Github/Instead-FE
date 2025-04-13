export const spacing = {
  4: '0.4rem',
  8: '0.8rem',
  10: '1.0rem',
  12: '1.2rem',
  16: '1.6rem',
  20: '2.0rem',
  24: '2.4rem',
  28: '2.8rem',
  32: '3.2rem',
  40: '4.0rem',
  48: '4.8rem',
  64: '6.4rem',
  80: '8.0rem',
  128: '12.8rem',
} as const;

export type SpacingType = typeof spacing;
