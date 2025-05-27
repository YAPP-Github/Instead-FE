import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';

export const titleSectionStyle = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  gap: vars.space[16],
  padding: `${vars.space[24]} ${vars.space[12]}`,
});

export const contentStyle = style({
  width: '100%',
  padding: `0 ${vars.space[12]}`,
});

export const imageWrapperStyle = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  gap: vars.space[10],
});

export const imageStyle = style({
  width: '100%',
  height: 'auto',
  borderRadius: vars.borderRadius[16],
});
