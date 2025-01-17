import { style } from '@vanilla-extract/css';
import { tokens } from '@repo/theme';

export const container = style({
  position: 'fixed',
  bottom: 40,
  right: 40,
  padding: `${tokens.spacing[20]} ${tokens.spacing[32]}`,
  borderRadius: 100,
  backgroundColor: tokens.colors.grey700,
  color: tokens.colors.grey0,
});

export const content = style({
  display: 'flex',
  alignItems: 'center',
  gap: tokens.spacing[8],
});

export const message = style({
  fontSize: tokens.typography.fontSize[20],
  fontWeight: tokens.typography.fontWeight.semibold,
  lineHeight: '2.4rem',
});
