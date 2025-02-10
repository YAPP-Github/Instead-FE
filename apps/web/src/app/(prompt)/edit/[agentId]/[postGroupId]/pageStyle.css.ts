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
