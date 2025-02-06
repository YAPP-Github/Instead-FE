import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';

export const contentStyle = style({
  position: 'relative',
  width: '100%',
  padding: `${vars.space[80]} ${vars.space[24]}`,
  margin: '0 auto',
  overflowX: 'auto',
});

export const submitButtonStyle = style({
  fontSize: vars.typography.fontSize[18],
});

export const accordionStyle = style({
  display: 'flex',
  gap: vars.space[64],
  height: 'fit-content',
  minWidth: 'min-content',
  padding: `0 ${vars.space[32]}`,
});

export const accordionTriggerStyle = style({
  height: '8rem',
  padding: `${vars.space[12]} ${vars.space[16]}`,
});

export const accordionItemStyle = style({
  width: '51.2rem',
  flex: '0 0 auto',
});

export const accordionContentStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space[10],
});

export const contentInnerWrapper = style({
  height: '100%',
});

export const buttonWrapperStyle = style({
  display: 'flex',
  justifyContent: 'flex-end',
});
