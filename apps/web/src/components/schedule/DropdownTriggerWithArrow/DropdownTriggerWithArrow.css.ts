import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';

export const triggerStyle = style({
  padding: `0 ${vars.space[12]} 0 0`,
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  gap: vars.space[12],
});

export const iconStyle = style({
  opacity: 0,
  visibility: 'hidden',
  transition: 'opacity 0.2s ease-in-out, visibility 0.2s ease-in-out',
  selectors: {
    [`${triggerStyle}:hover &`]: {
      opacity: 1,
      visibility: 'visible',
    },
  },
});
