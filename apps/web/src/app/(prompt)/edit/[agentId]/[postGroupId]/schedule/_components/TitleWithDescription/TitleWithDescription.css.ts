import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';

export const textWrapperStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space[8],
  padding: `${vars.space[24]} 0`,
});
