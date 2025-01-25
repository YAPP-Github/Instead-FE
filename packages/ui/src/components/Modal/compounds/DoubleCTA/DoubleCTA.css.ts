import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';

export const doubleCta = style({
  width: '100%',
  display: 'flex',
  gap: vars.space[12],
  marginTop: '4rem',
});

export const ctaButtonStyle = style({
  width: '100%',
  borderRadius: '1.2rem',
  color: vars.colors.grey,
  fontSize: vars.typography.fontSize[20],
  fontWeight: vars.typography.fontWeight.semibold,
  height: '7.2rem',
});

export const secondaryButtonStyle = style({
  width: '100%',
  borderRadius: '1.2rem',
  color: vars.colors.grey1000,
  backgroundColor: vars.colors.grey50,
  fontSize: vars.typography.fontSize[20],
  fontWeight: vars.typography.fontWeight.semibold,
  height: '7.2rem',
});
