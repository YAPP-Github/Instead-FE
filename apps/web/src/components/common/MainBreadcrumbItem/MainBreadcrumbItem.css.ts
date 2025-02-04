import { vars } from '@repo/theme';
import { style } from '@vanilla-extract/css';

export const insteadTextWrapperStyle = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space[8],
});
