import { vars } from '@repo/theme';
import { style } from '@vanilla-extract/css';

export const cta = style({
  width: '100%',
  marginTop: '4rem',
});

export const buttonStyle = style({
  width: '100%',
  borderRadius: '1.2rem',
  color: vars.colors.grey,
  backgroundColor: vars.colors.grey950,
  fontSize: vars.typography.fontSize[20],
  fontWeight: vars.typography.fontWeight.semibold,
  height: '7.2rem',
});
