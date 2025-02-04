import { vars } from '@repo/theme';
import { style } from '@vanilla-extract/css';

export const uploader = style({
  position: 'relative',
  width: '100%',
  height: '9.6rem',
  cursor: 'pointer',
  backgroundColor: vars.colors.grey25,
  borderRadius: vars.borderRadius[16],
  padding: vars.space[16],
  transition: 'all 0.2s ease',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: vars.space[24],
});

export const input = style({
  display: 'none',
});
