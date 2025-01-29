import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';

export const container = style({
  display: 'flex',
  gap: vars.space[12],
  width: '100%',
});

export const imageWrapper = style({
  position: 'relative',
  width: '6.4rem',
  height: '6.4rem',
});

export const image = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: vars.borderRadius[12],
  cursor: 'pointer',
});

export const removeButton = style({
  position: 'absolute',
  top: '-1rem',
  right: '-1rem',
  width: '2.4rem',
  height: '2.4rem',
  backgroundColor: 'transparent',
  border: 'transparent',
  cursor: 'pointer',
});
