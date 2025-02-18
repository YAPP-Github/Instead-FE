import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';

export const contentStyle = style({
  display: 'flex',
  padding: `${vars.space[80]} ${vars.space[24]}`,
  margin: '0 auto',
  minWidth: 'min-content',
  width: 'auto',
  justifyContent: 'center',
});

export const submitButtonStyle = style({
  fontSize: vars.typography.fontSize[18],
});

export const accordionStyle = style({
  display: 'flex',
  flexDirection: 'row',
  gap: vars.space[64],
  height: 'fit-content',
  minWidth: 'min-content',
  padding: `0 ${vars.space[32]}`,
  margin: '0 auto',
  width: 'fit-content',
});

export const accordionTriggerStyle = style({
  height: '8rem',
  padding: `${vars.space[12]} ${vars.space[16]}`,
});

export const accordionItemStyle = style({
  width: '51.2rem',
  flex: '0 0 auto',
});

export const contentInnerWrapper = style({
  height: '100%',
});

export const buttonWrapperStyle = style({
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: vars.space[10],
});
