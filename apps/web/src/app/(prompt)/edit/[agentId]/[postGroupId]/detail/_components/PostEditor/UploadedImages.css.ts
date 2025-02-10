import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';

export const container = style({
  display: 'flex',
  gap: vars.space[12],
  width: '100%',
  marginBottom: '2.4rem',
});

export const imageWrapper = style({
  position: 'relative',
  width: '100rem',
  height: '24rem',
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
  top: '1.2rem',
  right: '1.2rem',
  width: '2.4rem',
  height: '2.4rem',
  backgroundColor: 'transparent',
  border: 'transparent',
  cursor: 'pointer',
  ':focus-visible': {
    outline: `0.2rem solid ${vars.colors.primary500}`,
    outlineOffset: '0.2rem',
  },
  ':hover': {
    opacity: 0.8,
  },
});
