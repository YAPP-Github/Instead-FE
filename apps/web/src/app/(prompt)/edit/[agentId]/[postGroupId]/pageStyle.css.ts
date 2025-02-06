import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';

export const mainStyle = style({
  maxWidth: '100%',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  paddingTop: '8rem',
  overflowY: 'auto',
  background:
    'linear-gradient(174deg, rgba(255, 255, 255, 0.55) -11.84%, rgba(243, 244, 249, 0.55) 29.91%, rgba(231, 232, 251, 0.55) 100%), #FFF',
});

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
