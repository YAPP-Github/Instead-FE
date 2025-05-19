import { vars } from '@repo/theme';
import { style } from '@vanilla-extract/css';

export const skeletonWrapperStyle = style({
  display: 'flex',
  gap: vars.space[10],
  flexWrap: 'wrap',
  width: '100%',
});
