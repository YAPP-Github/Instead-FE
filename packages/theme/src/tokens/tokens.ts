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

export type TokensType = typeof tokens;
