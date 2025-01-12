export * from './colors';
export * from './radius';
export * from './spacing';
export * from './typography';

import { colors } from './colors';
import { radius } from './radius';
import { spacing } from './spacing';
import { typography } from './typography';

export const tokens = {
  colors,
  radius,
  spacing,
  typography,
} as const;

export type TypographyType = typeof typography;
export type ColorsType = typeof colors;
export type RadiusType = typeof radius;
export type SpacingType = typeof spacing;
export type TokensType = typeof tokens;
