import { vars } from '@repo/theme';
import { style } from '@vanilla-extract/css';

export const labelStyle = style({
  display: 'flex',
  alignItems: 'center',
  fontSize: vars.typography.fontSize[20],
  fontWeight: vars.typography.fontWeight.semibold,
});

export const requiredStyle = style({
  gap: vars.space[4],
});

export const optionalStyle = style({
  gap: vars.space[8],
});
