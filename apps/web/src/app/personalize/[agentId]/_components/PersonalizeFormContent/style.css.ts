import { vars } from '@repo/theme';
import { style } from '@vanilla-extract/css';

export const textFieldWrapperStyle = style({
  position: 'relative',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space[8],
});

export const utteranceWrapperStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.6rem',
  width: '100%',
});

export const radioCardsWrapperStyle = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: vars.space[16],
});
