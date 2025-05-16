import { vars } from '@repo/theme';
import { style } from '@vanilla-extract/css';

export const skeletonWrapperStyle = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});

export const skeletonItemStyle = style({
  borderBottom: `0.1rem solid ${vars.colors.grey100}`,
});
