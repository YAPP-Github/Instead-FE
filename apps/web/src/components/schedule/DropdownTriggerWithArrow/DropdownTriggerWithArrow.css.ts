import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';

export const container = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space[4],
  cursor: 'pointer',
});

export const triggerStyle = style({
  padding: `0 ${vars.space[12]}`,
});

export const iconStyle = style({
  opacity: 0,
  visibility: 'hidden',
  transition: 'opacity 0.2s ease-in-out, visibility 0.2s ease-in-out',
  selectors: {
    [`${container}:hover &`]: {
      opacity: 1,
      visibility: 'visible',
    },
  },
});
