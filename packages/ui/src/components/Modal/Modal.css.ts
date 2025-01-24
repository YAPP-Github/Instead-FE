import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';

export const overlay = style({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 0,
});

export const container = style({
  position: 'fixed',
  top: '50%',
  left: '50%',
  backgroundColor: vars.colors.grey,
  borderRadius: '2.4rem',
  padding: `5.2rem ${vars.space[24]} ${vars.space[24]} ${vars.space[24]}`,
  zIndex: 1,
  width: '56rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  transformOrigin: 'center',
});

export const content = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: vars.space[8],
});
