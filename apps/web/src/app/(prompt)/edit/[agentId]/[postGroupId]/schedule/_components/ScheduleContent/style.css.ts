import { vars } from '@repo/theme';
import { style } from '@vanilla-extract/css';

export const skeletonWrapperStyle = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  gap: vars.space[16],
});

export const dndSectionStyle = style({
  width: '100rem',
  position: 'relative',
  margin: '0 auto',
});

export const textWrapperStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space[8],
  padding: `${vars.space[24]} 0`,
});

export const titleWrapperStyle = style({
  display: 'flex',
  flexDirection: 'row',
  gap: vars.space[8],
});

export const tableContainer = style({
  position: 'relative',
  width: '100%',
});
