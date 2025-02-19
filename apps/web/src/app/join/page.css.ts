import { vars } from '@repo/theme';
import { style } from '@vanilla-extract/css';

export const wrapper = style({
  width: '100vw',
  height: '100vh',
  display: 'flex',
});

export const image = style({
  width: '60%',
  height: '100%',
  objectFit: 'cover',
});

export const content = style({
  minWidth: '60rem',
  width: '40%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: vars.colors.grey,
});

export const logo = style({ width: '15rem', height: '4.027rem' });

export const text = style({
  fontSize: '4.4rem',
  fontWeight: '600',
  lineHeight: '130%',
  textAlign: 'center',
});

export const textAlignCenter = style({
  textAlign: 'center',
});
