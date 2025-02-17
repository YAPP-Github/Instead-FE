import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';

export const container = style({
  position: 'fixed',
  bottom: 40,
  right: 40,
  padding: `${vars.space[20]} ${vars.space[32]}`,
  borderRadius: 100,
  backgroundColor: vars.colors.grey700,
  color: vars.colors.grey,
});

export const content = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space[8],
});

export const message = style({
  fontSize: vars.typography.fontSize[20],
  fontWeight: vars.typography.fontWeight.semibold,
  lineHeight: '2.4rem',
});
